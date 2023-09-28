

/* This view acts as a rendering template to render InitScript(and server-side Form's descriptor) in FormContainerBlock's client-side for Form[dd649063-6100-4f34-ad35-998c0210c4cb].
TECHNOTE: all serverside (paths, dynamic values) of EPiServerForms will be transfered to client side here in this section. */
(function initializeOnRenderingFormDescriptor() {
    // each workingFormInfo is store inside epi.EPiServer.Forms, lookup by its FormGuid
    var workingFormInfo = epi.EPiServer.Forms["dd649063-6100-4f34-ad35-998c0210c4cb"] = {
        Id: "dd649063-6100-4f34-ad35-998c0210c4cb",
        Name: "Formulario Comercial",
        // whether this Form can be submitted which relates to the visitor's data (cookie, identity) and Form's settings (AllowAnonymous, AllowXXX)

        SubmittableStatus : {"submittable":true,"message":""},        
        ConfirmMessage : "",
        ShowNavigationBar : true,
        ShowSummarizedData : false,
        
        // serialize the dependency configuration of this form to clientside
        DependenciesInfo : [],
        // keep all fieldName which are not satisfied the field dependency conditions
        DependencyInactiveElements: [],

        // Validation info, for executing validating on client side
        ValidationInfo : [{"targetElementName":"__field_338293","targetElementId":"e4349a67-251d-4f2c-aea4-4bb4b5fc527e","validators":[{"type":"EPiServer.Forms.Implementation.Validation.RequiredValidator","description":null,"model":{"message":"Este campo es obligatorio.","validationCssClass":"ValidationRequired","additionalAttributes":{"required":"","aria-required":"true"}}}]},{"targetElementName":"__field_338295","targetElementId":"0be951bb-6efa-4476-b2a8-d37ad3b93cf0","validators":[{"type":"EPiServer.Forms.Implementation.Validation.NumericValidator","description":null,"model":{"message":"Escriba un número válido.","validationCssClass":null,"additionalAttributes":null}},{"type":"EPiServer.Forms.Implementation.Validation.RequiredValidator","description":null,"model":{"message":"Este campo es obligatorio.","validationCssClass":"ValidationRequired","additionalAttributes":{"required":"","aria-required":"true"}}}]},{"targetElementName":"__field_338297","targetElementId":"4544589b-6e2c-4803-9121-34447f35166d","validators":[{"type":"EPiServer.Forms.Implementation.Validation.RequiredValidator","description":null,"model":{"message":"Este campo es obligatorio.","validationCssClass":"ValidationRequired","additionalAttributes":{"required":"","aria-required":"true"}}},{"type":"EPiServer.Forms.Implementation.Validation.EmailValidator","description":null,"model":{"jsPattern":"(^$)|(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)","dotNetPattern":"(^$)|(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$)","message":"Escriba una dirección de correo electrónico válida.","validationCssClass":null,"additionalAttributes":null}}]},{"targetElementName":"__field_338298","targetElementId":"91392271-8c91-4792-b7a9-0235b1518d2b","validators":[{"type":"EPiServer.Forms.Implementation.Validation.RequiredValidator","description":null,"model":{"message":"Este campo es obligatorio.","validationCssClass":"ValidationRequired","additionalAttributes":{"required":"","aria-required":"true"}}}]},{"targetElementName":"__field_338300","targetElementId":"d751005f-7679-45ee-847f-a5f77fd9367b","validators":[{"type":"EPiServer.Forms.Implementation.Validation.RequiredValidator","description":null,"model":{"message":"Este campo es obligatorio.","validationCssClass":"ValidationRequired","additionalAttributes":{"required":"","aria-required":"true"}}}]},{"targetElementName":"__field_338301","targetElementId":"748dd225-cabe-4a52-b0f2-72a1d35bb2ea","validators":[{"type":"EPiServer.Forms.Implementation.Validation.CaptchaValidator","description":null,"model":{"message":"Introduzca los caracteres que ve en la imagen.","validationCssClass":null,"additionalAttributes":null}}]}],
        // Steps information for driving multiple-step Forms.
        StepsInfo : {
            Steps: [{"index":0,"attachedUrl":"","dependField":null,"dependCondition":null,"isActive":true,"attachedContentLink":"","dependValue":"","elementName":"__field_","guid":"00000000-0000-0000-0000-000000000000"}]
        },
        FieldsExcludedInSubmissionSummary: [],
        ElementsInfo: {"__field_338293":{"type":"EPiServer.Forms.Implementation.Elements.TextboxElementBlock","friendlyName":"Nombre","customBinding":false},"__field_338294":{"type":"EPiServer.Forms.Implementation.Elements.TextboxElementBlock","friendlyName":"Empresa","customBinding":false},"__field_338295":{"type":"EPiServer.Forms.Implementation.Elements.NumberElementBlock","friendlyName":"Teléfono","customBinding":false},"__field_338297":{"type":"EPiServer.Forms.Implementation.Elements.TextboxElementBlock","friendlyName":"Correo electrónico","customBinding":false},"__field_338298":{"type":"EPiServer.Forms.Implementation.Elements.SelectionElementBlock","friendlyName":"Provincia","customBinding":false},"__field_338299":{"type":"EPiServer.Forms.Implementation.Elements.SelectionElementBlock","friendlyName":"Servicio","customBinding":false},"__field_338300":{"type":"EPiServer.Forms.Implementation.Elements.TextareaElementBlock","friendlyName":"En que podemos ayudarte","customBinding":false},"__field_338302":{"type":"EPiServer.Forms.Implementation.Elements.SubmitButtonElementBlock","friendlyName":"Enviar","customBinding":false}},
        DataSubmitController: "/EPiServer.Forms/DataSubmit"
        
    };
    
    /// TECHNOTE: Calculation at FormInfo level, and these values will be static input for later processing.
    workingFormInfo.StepsInfo.FormHasNoStep_VirtualStepCreated = true;  // this FLAG will be true, if Editor does not put any FormStep. Engine will create a virtual step, with empty GUID
    workingFormInfo.StepsInfo.FormHasNothing = false;  // this FLAG will be true if FormContainer has no element at all
    workingFormInfo.StepsInfo.AllStepsAreNotLinked = true;  // this FLAG will be true, if all steps all have contentLink=="" (emptyString)
})();
