ï»¿PcsIamClient.Globalization = (() => {

    let currentCulture = '';
    let form = undefined;
    let formAction = undefined;
    let callBackUrl = undefined;

    const setCurrentCulture = ((value) => {

        if (!value?.jquery) {
            value = $(value);
        }

        currentCulture = value.val();
        
        if (form) {
            form.attr("action", formAction);
            form.submit();
        }
    });

    const getCurrentCulture = (() => {
        return currentCulture;
    });

    const setForm = ((value, action, callBack) => {
        if (value?.jquery) {
            form = value;
        } else {
            form = $(value);
        }

        formAction = action;
        callBackUrl = callBack;

        
    });

    const init = ((options) => {

        console.log("PcsIamClient.Globalization init options", options);

        if (currentCulture === '') {
            currentCulture = options?.currentCulture ?? 'en-US';
        }
    });

    return {
        init,
        setCurrentCulture,
        getCurrentCulture,
        setForm
    }
})();