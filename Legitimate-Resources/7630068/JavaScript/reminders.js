
class Reminder {
    constructor(contentType, baseUrl=undefined) {
        this.contentType = contentType
        this.reminderModal = $('#reminder_modal')[0]
        this.baseUrl = baseUrl ? baseUrl : document.querySelector('#reminder_modal .api-v4-form').dataset.apiUrl
        this.resolveReminderUrl = '/api/v4/reminders/resolve/'
        this.reminderBtns = document.getElementsByClassName('reminder-btn')
        this.reminderForm = document.getElementById('reminder_form')
        this.reminderFormAddTaskWrapper = document.querySelector('#reminder_form > .form-actions.add-reminder')
        this.reminderFormChangeTaskWrapper = document.querySelector('#reminder_form > .form-actions.change-reminder')
        this.reminderTableBody = document.querySelector('.reminder-table tbody')
        this.reminderTemplateSelect = document.getElementById('reminder_template_select')
        this.activeProjectId = undefined
        this.activeEdit = undefined
        this.selectedReminder = undefined
        this.detailViewIsActive = false
        this.reminders = {}
        this.csrfToken = Socialfunders.Utils.getCookie("csrftoken")
        this.fetchHeaders = {"X-CSRFToken": this.csrfToken, 'Accept': 'application/json', 'Content-Type': 'application/json'}
        this.labelForStatus = {1: 'label-default', 2: 'label-success'}
        this.addReminderBoundFunction = undefined
        this.openModalBoundFunction = undefined
        this.changeReminderBoundFunction = undefined
        this.cancelChangeBoundFunction = undefined
        this.init()
    }

    init() {
        this.openModalBoundFunction = this.openModal.bind(this)
        this.addReminderBoundFunction = this.addReminder.bind(this)
        this.changeReminderBoundFunction = this.changeReminder.bind(this)
        this.cancelChangeBoundFunction = this.cancelChange.bind(this)
        this.addListeners(this.reminderBtns, this.openModalBoundFunction, undefined, false)
        this.addListeners(this.reminderFormAddTaskWrapper.querySelector('.submit-add-reminder'),this.addReminderBoundFunction, undefined, false)
        this.addListeners(this.reminderFormChangeTaskWrapper.querySelector('.submit-change-reminder'), this.changeReminderBoundFunction, undefined, false)
        this.addListeners(this.reminderFormChangeTaskWrapper.querySelector('.cancel-edit'), this.cancelChangeBoundFunction, undefined, false)

        this.reminderTemplateSelect.addEventListener('change', this.handleTemplateSelectChange.bind(this))
        this.modalHideObserver = new MutationObserver(this.handleModalClose.bind(this))
        this.modalHideObserver.observe(this.reminderModal, {attributes: true, attributeFilter: ['class'],
                                                                    childList: false, characterData: false})
    }

    reInit() {
        this.removeListeners(this.reminderBtns, this.openModalBoundFunction)
        this.removeListeners(this.reminderForm.querySelector('.submit-add-reminder'), this.addReminderBoundFunction)
        this.removeListeners(this.reminderFormChangeTaskWrapper.querySelector('.submit-change-reminder'), this.changeReminderBoundFunction)
        this.removeListeners(this.reminderFormChangeTaskWrapper.querySelector('.cancel-edit'), this.cancelChangeBoundFunction)
        this.reminderBtns = document.getElementsByClassName('reminder-btn')
        this.reminderForm = document.getElementById('reminder_form')
        this.init()
    }

    handleModalClose(mutationsList, observer) {
        for (let i=0; i < mutationsList.length; i++) {
             if (!mutationsList[i].target.classList.contains('in')) {
                 this.resetModal()
             }
        }
    }

    handleTemplateSelectChange(ev) {
        if (ev.target) {
            let selectedOption = ev.target.options[ev.target.selectedIndex]
            let titleEl = this.reminderModal.querySelector('#id_title')
            let descriptionEl = this.reminderModal.querySelector('#id_description')
            if (!selectedOption.value) {
                titleEl.value = ''
                descriptionEl.value = ''
            } else {
                titleEl.value = selectedOption.dataset.title
                descriptionEl.value = selectedOption.dataset.description
            }
        }
    }

    fetchData() {
        let fetchUrl = `${this.baseUrl}?target_type=${this.contentType}&target_id=${this.activeProjectId}`
        return fetch(fetchUrl).then((res) => res.json())
    }

    addReminder() {
        $('.submit-add-reminder').addClass('disabled')
        $('.reminder-spinner').removeClass('hidden')
        let formJson = this.formToJson()
        formJson.targetType = this.contentType
        formJson.targetId = this.activeProjectId
        fetch(this.baseUrl, {
            method: 'POST',
            headers: this.fetchHeaders,
            body: JSON.stringify(formJson)
        }).then((res) => {
            $('.submit-add-reminder').removeClass('disabled')
            $('.reminder-spinner').addClass('hidden')
            if (res.status >= 400) {
                this.handleFormErrors(res)
                throw Error(res.url+": "+res.statusText)
            }
            return res.json();
        }).then(this.initNewReminder.bind(this))
    }

    changeReminder() {
        $('.submit-change-reminder').addClass('disabled')
        $('.reminder-spinner').removeClass('hidden')
        let formJson = this.formToJson()
        formJson.slug = this.activeEdit.slug
        fetch(this.baseUrl+this.activeEdit.slug+'/', {
            method: 'PATCH',
            headers: this.fetchHeaders,
            body: JSON.stringify(formJson)
        }).then((res) => {
            $('.submit-change-reminder').removeClass('disabled')
            $('.reminder-spinner').addClass('hidden')
            if (res.status >= 400) {
                this.handleFormErrors(res)
                throw Error(res.url+": "+res.statusText)
            }
            return res.json();})
        .then(this.updateReminderHTML.bind(this))
    }

    initNewReminder(reminder) {
        this.appendTable(reminder)
        this.removeFormErrors()
        this.reminders[reminder.slug] = reminder
        this.addListeners(this.reminderTableBody.querySelectorAll('.details'), this.viewReminder, reminder.slug)
        this.addListeners(this.reminderTableBody.querySelectorAll('.change'), this.toggleChangeReminder, reminder.slug)
        this.addListeners(this.reminderTableBody.querySelectorAll('.resolve'), this.resolveReminder, reminder.slug)
        this.resetModal()
    }

    updateReminderHTML(reminder) {
        this.removeFormErrors()
        let reminderEl = document.getElementById(`row_${reminder.slug}`)
        if (reminderEl) {
            reminderEl.querySelector('.reminder-title').textContent = this.truncateString(reminder.title, 26)
            reminderEl.querySelector('.reminder-status').innerHTML = this.renderStatusLabel(reminder.status, reminder.status_display)
            reminderEl.querySelector('.reminder-scheduled').textContent = moment(Date.parse(reminder.scheduled_for)).format('DD.MM.YYYY')
            this.reminders[reminder.slug] = reminder
        }
    }

    viewReminder(e) {
        const target = e.currentTarget
        if (this.detailViewIsActive && target.dataset.slug === this.selectedReminder.slug) {
            this.detailViewIsActive = false
        } else {
            this.detailViewIsActive = true
            this.selectedReminder = this.reminders[target.dataset.slug]
            let reminderDetails = document.querySelector('.reminder-form-row .reminder-details')
            reminderDetails.innerHTML = `${this.renderStatusLabel(this.selectedReminder.status, this.selectedReminder.status_display)}
                                        <h3>${this.selectedReminder.title}</h3>
                                        <hr/>
                                        <h4>${gettext('Description')}</h4>
                                        <p style="margin-bottom: 26px">${this.selectedReminder.description}</p>
                                        <h4>${gettext('Due date')}</h4>
                                        <p style="margin-bottom: 26px">${moment(Date.parse(this.selectedReminder.scheduled_for)).format('DD.MM.YYYY')}</p>
                                        <h4>${gettext('Assignee')}</h4>
                                        <ul style="padding-left: 22px; padding-bottom: 24px;">
                                            ${this.renderUsers(this.selectedReminder.users)}
                                        </ul>

                                        <div class="form-actions text-right">
                                            <a class="btn form-btn close-details" href="#">${gettext('close')}</a>
                                        </div>`
            reminderDetails.querySelector('.close-details').addEventListener('click', () => {
                this.detailViewIsActive = false
                this.toggleReminderForm(!this.detailViewIsActive)
                this.toggleReminderDetails(this.detailViewIsActive)
            })
        }
        this.toggleReminderForm(!this.detailViewIsActive)
        this.toggleReminderDetails(this.detailViewIsActive)
    }

    toggleReminderForm(show) {
        this.reminderForm.style.height = show ? '100%' : '0px'
        this.reminderForm.style.display = show ? 'block' : 'none'
    }

    toggleReminderDetails(show) {
        let reminderDetails = document.querySelector('.reminder-form-row .reminder-details')
        reminderDetails.style.height = show ? '100%' : '0px'
        reminderDetails.style.display = show ? 'block' : 'none'
    }

    renderUsers(users) {
        let usersHTML = []
        for (let i=0; i < users.length; i++) {
            usersHTML.push(`<li>${users[i].full_name_w_username}</li>`)
        }
        return usersHTML.join('')
    }

    toggleChangeReminder(e) {
        const target = e.currentTarget
        let activeRow = document.getElementById(`row_${target.dataset.slug}`)
        activeRow.classList.add('active')
        if (this.activeEdit) {
            document.getElementById(`row_${this.activeEdit.slug}`).classList.remove('active')
        }
        this.activeEdit = this.reminders[target.dataset.slug]
        this.reminderFormAddTaskWrapper.style.display = 'none'
        this.reminderFormChangeTaskWrapper.style.display = ''
        this.setDisabledInputs(true)
        this.fillForm(target.dataset.slug)
        this.detailViewIsActive = false
        this.toggleReminderForm(!this.detailViewIsActive)
        this.toggleReminderDetails(this.detailViewIsActive)
    }

    cancelChange() {
        document.getElementById(`row_${this.activeEdit.slug}`).classList.remove('active')
        this.activeEdit = undefined
        this.setDisabledInputs(false)
        this.reminderFormAddTaskWrapper.style.display = ''
        this.reminderFormChangeTaskWrapper.style.display = 'none'
        this.resetModal()
    }

    resolveReminder(e) {
        const reminder = this.reminders[e.currentTarget.dataset.slug]
        const reminderResolveBtn = this.reminderModal.querySelector(`#row_${reminder.slug} .resolve`)
        reminderResolveBtn.innerHTML = this.renderResolveIcon(0)
        fetch(this.resolveReminderUrl+reminder.slug+'/',
            {method: 'POST', headers: this.fetchHeaders,
                body: JSON.stringify({resolve: reminder.status === 1})}
        ).then((res) => res.json()
        ).then((resJson) => {
            let reminderStatus = this.reminderModal.querySelector(`#row_${reminder.slug} .reminder-status`)
            reminderStatus.innerHTML = this.renderStatusLabel(resJson.status, resJson.status_display)
            reminderResolveBtn.innerHTML = this.renderResolveIcon(resJson.status)
            this.reminders[reminder.slug] = resJson
        })
    }

    deleteReminder(e) {
        const reminder = this.reminders[e.currentTarget.dataset.slug]
        const deleteBtn = document.getElementById('reminder_delete_modal').querySelector('.reminder-delete-modal-btn')
        deleteBtn.setAttribute('disabled', 'true')
        fetch(this.baseUrl+reminder.slug+'/',
            {method: 'DELETE', headers: this.fetchHeaders,
                body: JSON.stringify({})}
        ).then((res) => {
                if (res.ok) {
                    this.reminderModal.querySelector(`#row_${reminder.slug}`).remove()
                    $(document.getElementById('reminder_delete_modal')).modal('hide')
                } else {
                    Socialfunders.Utils.showErrorNotification('', gettext("An error occurred!"))
                }
            }
        )
    }

    onShowDeleteModal(e) {
        const reminder = this.reminders[e.currentTarget.dataset.slug]
        const deleteModal = document.getElementById('reminder_delete_modal')
        deleteModal.querySelector('.delete-reminder-title').innerHTML = reminder.title
        deleteModal.querySelector('.delete-reminder-user').innerHTML = reminder.users.map(user => user.full_name_w_username).join(', ')
        const deleteBtn = deleteModal.querySelector('.reminder-delete-modal-btn')
        deleteBtn.setAttribute('data-slug', reminder.slug)
        deleteBtn.removeAttribute('disabled')
    }
    getViewButton(reminder){
        return `<a class="btn btn-default btn-sm rounded-20 details" href="#" data-slug="${reminder.slug}"><span class="fa fa-eye"></span></a>`
    }
    getEditButton(reminder){
        console.log(reminder)
        if (!reminder.can_edit) return ''
        return `<a class="btn btn-default btn-sm rounded-20 change" href="#" data-slug="${reminder.slug}"><span class="fa fa-edit"></span></a>`
    }
    getResolveButton(reminder){
        if (!reminder.can_resolve) return ''
        return `<a class="btn btn-default btn-sm rounded-20 resolve" href="#" data-slug="${reminder.slug}">${this.renderResolveIcon(reminder.status)}</a>`
    }
    getDeleteButton(reminder){
        if (!reminder.can_delete) return ''
        return `<a class="btn btn-default btn-sm rounded-20 delete" data-toggle="modal" data-target="#reminder_delete_modal" data-slug="${reminder.slug}"><span class="fa fa-trash"></span></a>`
    }
    appendTable(reminder) {
        let placeHolderRow = document.getElementById('reminder_placeholder_row')
        if (placeHolderRow) {
            placeHolderRow.parentNode.removeChild(placeHolderRow)
        }
        let tableRowHTML = `<tr id="row_${reminder.slug}">
                                <td class="reminder-title">${this.truncateString(reminder.title, 26)}</td>
                                <td class="reminder-status">${this.renderStatusLabel(reminder.status, reminder.status_display)}</td>
                                <td class="reminder-scheduled">${moment(Date.parse(reminder.scheduled_for)).format('DD.MM.YYYY')}</td>
                                <td class="reminder-assignees">${reminder.users.map(user => user.full_name_w_username).join(', ')}</td>
                                <td class="reminder-created-by">${reminder.created_by.full_name_w_username}</td>
                                <td class="reminder-actions">
                                    ${this.getViewButton(reminder)}
                                    ${this.getEditButton(reminder)}
                                    ${this.getResolveButton(reminder)}
                                    ${this.getDeleteButton(reminder)}
                                </td>
                            </tr>`
        this.reminderTableBody.insertAdjacentHTML('beforeend', tableRowHTML)
    }

    renderStatusLabel(statusCode, statusDisplay) {
        return `<span class="label ${this.labelForStatus[statusCode]}">${statusDisplay}</span>`
    }

    renderResolveIcon(statusCode) {
        if (statusCode === 0) {
            return '<span class="fa fa-spinner fa-spin"></span>'
        }
        return `<span class="fa fa-${statusCode === 1 ? 'check' : 'times'}"></span>`
    }

    openModal(e) {
        this.activeProjectId = e.currentTarget.dataset.id
        this.reminderModal.querySelector('tbody').innerHTML = `<tr id="reminder_placeholder_row">
                                                                <td colspan="6">${gettext('No Tasks set yet.')}</td>
                                                               </tr>`
        let modalTitle = ''
        if (this.contentType === 'project') {
            modalTitle = `${gettext("Tasks for project")}: ${e.currentTarget.dataset.title}`
        } else if (this.contentType === 'organization') {
            modalTitle = `${gettext("Tasks for organization")}: ${e.currentTarget.dataset.title}`
        }
        this.reminderModal.querySelector('h3.modal-title').textContent = modalTitle
        this.fetchData().then(this.fillModal.bind(this))
        $(this.reminderModal).modal()
    }

    fillModal(data) {
        if (data.results && data.results.length) {
            this.reminderTableBody.innerHTML = ''
            for (let i=0; i < data.results.length; i++) {
                const result = data.results[i]
                this.appendTable(result)
                this.reminders[result.slug] = result
            }
            this.addListeners(this.reminderTableBody.querySelectorAll('.details'), this.viewReminder)
            this.addListeners(this.reminderTableBody.querySelectorAll('.change'), this.toggleChangeReminder)
            this.addListeners(this.reminderTableBody.querySelectorAll('.resolve'), this.resolveReminder)
            this.addListeners(this.reminderTableBody.querySelectorAll('.delete'), this.onShowDeleteModal)
            this.addListeners(document.getElementById('reminder_delete_modal').querySelectorAll('.reminder-delete-modal-btn'), this.deleteReminder)
        }
    }

    resetModal() {
        this.toggleReminderForm(true)
        this.toggleReminderDetails(false)
        this.detailViewIsActive = false
        this.reminderForm.reset()
        this.resetCheckboxes()
        this.setDisabledInputs(false)
        let customSelectOptions = this.reminderForm.querySelectorAll('.custom-select.custom-select-before > select > option')
        for (let i=0; i < customSelectOptions.length; i++) {
            customSelectOptions[i].textContent = gettext('please select â€¦')
        }
    }

    resetCheckboxes() {
        let checkboxes = this.reminderForm.querySelectorAll('input[type=checkbox]')
        for (let i=0; i < checkboxes.length; i++) {
            checkboxes[i].checked = false
        }
    }

    fillForm(key) {
        let formFields = this.reminderForm.querySelectorAll( "input:not([type=checkbox]), select, textarea" )
        for (let i=0; i < formFields.length; i++) {
            let formField = formFields[i]
            if (formField.dataset && formField.dataset.format) {
                formField.value = moment(Date.parse(this.reminders[key][formField.name])).format(formField.dataset.format)
            } else if (formField.nodeName === 'SELECT' && formField.parentNode.classList.contains('custom-select')) {
                this.resetCheckboxes()
                if (this.reminders[key][formField.name].length) {
                    let selectOption = this.reminderForm.querySelector(`select[name="${formField.name}"] > option`)
                    selectOption.textContent = `${this.reminders[key][formField.name].length} ${gettext("selected")}`
                    for (let k = 0; k < this.reminders[key][formField.name].length; k++) {
                        let checkbox = this.reminderForm.querySelector(`input[type=checkbox][value="${this.reminders[key][formField.name][k].id}"]`)
                        if (checkbox) {
                            checkbox.checked = true
                        }
                    }
                }
            } else if (formField.multiple) {
                let ids = []
                for (let k = 0; k < this.reminders[key][formField.name].length; k++) {
                    ids.push(this.reminders[key][formField.name][k].id)
                }
                for (let j = 0; j < formField.options.length; j++) {
                    formField.options[j].selected = ids.indexOf(parseInt(formField.options[j].value)) >= 0;
                }
            } else {
                formField.value = this.reminders[key][formField.name]
            }
        }
    }

    handleFormErrors(res) {
        this.removeFormErrors()
        res.json().then((errJson) => {
            const errJsonKeys = Object.keys(errJson)
            const parser = new DOMParser()
            for (let i=0; i < errJsonKeys.length; i++) {
                if (document.getElementById('id_'+errJsonKeys[i])) {
                    let inputGroup = document.getElementById('id_' + errJsonKeys[i]).parentNode
                    inputGroup.classList.add('has-error')
                    let errorSpanDiv = parser.parseFromString(`<span class="help-inline">${errJson[errJsonKeys[i]]}</span>`, 'text/html')
                                             .querySelector('span')
                    inputGroup.appendChild(errorSpanDiv)
                }
            }
        })
    }

    removeFormErrors() {
        let errorMessages = this.reminderForm.querySelectorAll('span.help-inline')
        for (let i=0; i < errorMessages.length; i++) {
            let inputGroup = errorMessages[i].parentNode
            inputGroup.classList.remove('has-error')
            inputGroup.removeChild(errorMessages[i])
        }
    }

    truncateString(string, maxLength) {
        return string.length > maxLength ? string.substring(0, maxLength)+"..." : string
    }

    setDisabledInputs(disabled) {
        document.getElementById('id_scheduled_for').disabled = disabled
        let inputOptions = this.reminderForm.querySelectorAll('.users-select input')
        for (let i=0; i < inputOptions.length; i++) {
            let inputOption = inputOptions[i]
            inputOption.disabled = disabled
            inputOption.readOnly = disabled
        }
    }

    addListeners(elements, callback, slug=undefined, bind=true) {
        callback = bind ? callback.bind(this) : callback
        if (elements && elements.length === undefined) {
            elements.addEventListener('click', callback)
        }
        for (let i=0; i < elements.length; i++) {
            if (slug && elements[i].dataset.slug !== slug) {
                continue
            }
            elements[i].addEventListener('click', callback)
        }
    }

    removeListeners(elements, callback, slug=undefined) {
        if (elements && elements.length === undefined) {
            elements.removeEventListener('click', callback)
        }
        for (let i=0; i < elements.length; i++) {
            if (slug && elements[i].dataset.slug !== slug) {
                continue
            }
            elements[i].removeEventListener('click', callback)
        }
    }

    formToJson(form=this.reminderForm) {
        let obj = {};
        let elements = form.querySelectorAll( "input:not([type=checkbox]), select, textarea, #id_send_completed_mail" )
        for (let i = 0; i < elements.length; ++i ) {
            let element = elements[i]
            let name = element.name
            let value = undefined

            if (elements[i].nodeName === 'SELECT' && elements[i].parentNode.classList.contains('custom-select')) {
                let checkedOptions = element.closest('.form-group').querySelectorAll('input:checked')
                value = []
                for (let j=0; j < checkedOptions.length; j++) {
                    value.push(checkedOptions[j].value)
                }
            }
            else if (element.type === 'checkbox') {
                value = element.checked
            }
            else {
                value = element.multiple ? Array.from(element.querySelectorAll("option:checked"),e => e.value) : element.value
            }

            if (name) {
                obj[name] = value
            }
        }
        return obj
    }

}
