'use strict';
/**
 * @ngdoc overview
 * @name PSERecharge
 * @description
 * # PSERecharge
 *
 * Main module of the application.
 */
angular.module('PSERecharge', [
    'ngAnimate', 'ngCookies', 'ngResource', 'ngRoute', 'ngSanitize','angulartics', 'angulartics.google.analytics',
    'pragmaMoneyFormat', 'noCAPTCHA', 'vcRecaptcha',
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/cashIn/cashIn-v2.html',
        controller: 'cashInController',
        controllerAs: 'cashInCtrl'
    }).when('/confirmation', {
        templateUrl: 'views/confirmation/confirmation.html',
        controller: 'confirmationController',
        controllerAs: 'confirmationCtrl'
    }).when('/bancolombia', {
        templateUrl: 'views/bancolombia/bancolombia.html',
    }).otherwise({
        redirectTo: '/'
    });
}]).run(['$window', 'configProvider', 'messageProvider', '$rootScope', 'pragmaMoneyFormatProvider', function($window, configProvider, messageProvider, $rootScope, pragmaMoneyFormatProvider) {

    /*Seteo de mensajes de la app CashIn PSE*/
    $rootScope.i18n = messageProvider;
    var supportedBrowsers = configProvider.supportedBrowserVersions,
        currentBrowser = $window.bowser.name,
        currentBrowserVersion = $window.bowser.version,
        compatibleBrowser = true;

    pragmaMoneyFormatProvider.overrideDefaultOptions(configProvider.moneyFormats);
    /*var BrowserFilter = filterFilter(supportedBrowsers, {name: currentBrowser});*/
    angular.forEach(supportedBrowsers, function(value, key) {
        /*Recorrer el array de navegadores compatibles y verificar que el navegador se encuentre en el array*/
        if (value.name === currentBrowser) {
            /*Verificar que la versión del navegador cumpla con los requisitos minimos*/
            if (currentBrowserVersion >= value.minVersion) {
                compatibleBrowser = true;

            }
        }
    });
    if (compatibleBrowser === false) {
        window.location.href = ('http://browsehappy.com/?locale=es');
    }


}]);

(function(){
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-88231765-1', 'auto');
})();


angular.module('PSERecharge')
    .constant('configProvider', {
        maxAmount: 10,
        URLgetTransactionInformation: '',
        URLctp: '',
        URLRechargeService: '',
        URLgenerateTicketId: '',
        URLgetBankList: '',
        UrlRecaptchaVerification: 'https://www.google.com/recaptcha/api/siteverify',
        supportedBrowserVersions: [{
            name: 'Chrome',
            minVersion: '1'
        }, {
            name: 'Opera',
            minVersion: '1'
        }, {
            name: 'Firefox',
            minVersion: '1'
        }, {
            name: 'Edge',
            minVersion: '1'
        }, {
            name: 'Microsoft Edge',
            minVersion: '1'
        }, {
            name: 'Internet Explorer',
            minVersion: '1'
        }, {
            name: 'IE',
            minVersion: '1'
        }, {
            name: 'Vivaldi',
            minVersion: '1'
        }, {
            name: 'Safari',
            minVersion: '1'
        }, {
            name: 'Samsung Internet for Android',
            minVersion: '1'
        }

        ],
        moneyFormats: {
            'prefix': '$ ',
            'decimalSeparator': '',
            'thousandsSeparator': '.',
            'decimalLimit': 0,
            'minAmmount': 1,
            'maxAmmount': 999999999999999
        },
        cookies: {
            'keyRecaptcha': 'psl'
        }
    });

/**
 * Provider que se encarga del manejo de cookies
 * @class cookieProvider
 * @module WebNequi
 */
angular.module('PSERecharge')
    .factory('cookieProvider', [function(){

        var api = {
            setCookie: setCookie,
            getCookie : getCookie,
            eraseCookie: eraseCookie
        };

        return api;

        /**
         * Método para agregar una llave-valor de cookie
         * @method setCookie
         * @param {String} key llave de la cookie a guardar
         * @param {String or Boolean} value valor asociado a la llave a guardar
         * @param {Int} days numero de dias para expirar cookie
         * @private
         */
        function setCookie(key, value, days) {
            var expires = '',
                date = new Date();
            if (days) {
                date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
                expires = '; expires=' + date.toGMTString();
            }
            document.cookie = String(key + '=' + value + expires + '; path=/');
        }

        /**
         * Método para obtener el valor de una llave dentro de las cookies
         * @method getCookie
         * @param {String} key llave de la cookie a obtener
         * @private
         */
        function getCookie(key) {
            var nameEQ = key + '=';
            var ca = document.cookie.split(';');
            for(var i=0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1,c.length);
                }
                if (c.indexOf(nameEQ) === 0) {
                    return c.substring(nameEQ.length,c.length);
                }
            }
            return null;
        }

        /**
         * Método para borrar el valor de una llave dentro de las cookies
         * @method eraseCookie
         * @param {String} key llave de la cookie a borrar
         * @private
         */
        function eraseCookie(key) {
            setCookie(key,'',-1);
        }

}]);

/**
 * Provider para el manejo de internacionalización de la aplicacion, este Provider
 * contiene las configuraciones especificas de cada pais
 * @class messageProvider
 * @constructor
 * @module sherpa
 */
angular.module('PSERecharge').factory('messageProvider', function() {
    var message = Object.freeze({
        'cashIn': {
            'title': 'Recarga de cuenta',
            'account_info': 'Cuenta a recargar',
            'cell_number': 'Número de celular',
            'confirm_cell_number': 'Confirma el número de celular',
            'cellphone': 'Celular',
            'cashin_amount': 'Valor a recargar',
            'amount': 'Valor',
            'bank': 'Banco',
            'person_info': 'Datos de quien recarga',
            'doc_type': 'Tipo de documento',
            'doc_type_cc': 'Cédula de ciudadanía',
            'doc_type_ce': 'Cédula de extranjería',
            'doc_type_ti': 'Tarjeta de identidad',
            'doc_type_nit': 'NIT',
            'doc_type_pp': 'Pasaporte',
            'doc_type_idc': 'Identificador único de cliente',
            'doc_type_cel': 'Id. por número celular',
            'doc_type_rc': 'Registro civil',
            'doc_type_de': 'Documento de identificación extranjero',
            'doc_num': 'Número de documento',
            'email': 'Correo electrónico',
            'pse_disclaimer': 'La recarga se hará usando los servicios de PSE y se debitará de tu cuenta corriente o de ahorros.',
            'next': 'Continuar',
            'summary': 'Resumen de tu recarga',
            'payment_desc': 'Concepto',
            'person_type': 'Tipo de persona',
            'natural_person': 'Natural',
            'juridic_person': 'Jurídica',
            'bank_choose': 'Elige el banco',
            'go_back': 'Atrás',
            'continue': 'Continuar',
            'cancel': 'Cancelar',
            'tohome': 'Regresar al inicio'
        },
        'alertMsg': {
            /*        Strings en Español para los mensajes de alerta que no son devueltos por el servidor*/
            'ups_connerror': '¡Ups!',
            'oops_connerror': 'Error',
            'connerror': 'Lo sentimos inténtalo de nuevo más tarde.',
            'ok': 'Listo',
            'check_phone': 'Error',
            'non_assoc': 'El número de celular no está asociado a ninguna cuenta Nequi, intenta de nuevo.',
            'no_response': 'Error',
            'no_response_text': 'Lo sentimos no hemos podido establecer conexión con el servidor. Revisa tu conexión o vuelve a intentarlo.',
            'fatal_error': 'Ha ocurrido un error. Te recomendamos refrescar tu navegador.',
            'ctp_error': 'Error',
            'ctp_error_text': 'Lo sentimos en este momento no podemos reenviarte a la sucursal de tu banco. Intenta de nuevo más tarde.',
            'checkAmmount': 'Se te fue la mano',
            'genericError': 'Error',
            'pse_error': 'Tenemos problemas para comunicarnos con PSE, por favor intenta de nuevo más tarde',
            'nighttime_error': 'No podemos recargar. La recarga por PSE volverá a estar habilitada a las 6 a.m, intenta a esa hora porfa.',
            'checkAmmountBody': 'Recuerda los limites de tu cuenta Nequi',
            'recaptchaError': 'Error al validar Recaptcha.'
        },
        'confirmation': {
            /*        Strings en Español para la pantalla de confirmación de PSE*/
            'receipt': 'Comprobante',
            'title': 'Resumen de tu recarga',
            'company': 'Empresa',
            'nit': 'NIT',
            'email': 'Correo',
            'ip': 'Dirección IP',
            'status': 'Estado',
            'payment_form': 'Descripción',
            'payment_date': 'Fecha del pago',
            'ref': 'Referencia',
            'auth': 'Autorización',
            'bank': 'Banco',
            'total': 'Total',
            'desc': 'Descripción',
            'desc_val': 'Recarga Nequi',
            'total_vat': 'Total IVA',
            'expand': 'Ver comprobante',
            'return': 'Regresar al inicio',
            'cell_number': 'Número de celular',
            'new_recharge': 'Nueva recarga',
            'quit': 'Salir',
            'print': 'Imprimir',
            'save': 'Guardar',
            'screenshothint': 'Recuerda que tambien puedes tomar un pantallazo desde tu celu.'
        },
        'analytics': {
            'event_type_error': 'Error',
            'pse_cashin_category': 'PSE-Entrada',
            'malformed_response_label': 'Respuesta malformada',
            'ticket_id_couldnt_be_generated_label': 'No se pudo generar ticket ID',
            'event_type_process_recharge': 'Click botón: Continuar Recarga',
            'event_type_go_to_bank': 'Click botón: Continuar banco'
        },
        'response_codes': {
            'success': '0',
            'generic': '500',
            'generic_number': 500,
            'broker_timeout': '11-18L',
            'parsing_error': '11-17L',
            'transaction_failed': '2-CCSB000005',
            'forbidden': '403',
            'forbidden_number': 403
        }
    });
    return message;
});

/**
* Provider para publicar las funciones utilitarias de la aplicación
* @class utilsProvider
* @constructor
* @module PSERecharge
*/

angular.module('PSERecharge')
    .factory('utilsProvider', function(){

    /**
     * Objeto para exponer interface publica del provider
     * @property self
     * @type object
     */
    var self = {
        generateDateWithFormat: generateDateWithFormat
    };

    /**
     * Funcion para crear la fecha en el formato necesario para enviar en las cabeceras del request
     * @method generateDateWithFormat
     * @param {Date} date 
     * @private
     * @returns {String} String con la fecha en formato  aaaa-mm-dd hh:mm:ss
     */
    function generateDateWithFormat(date) {
        return [date.getFullYear(),
            ('0' + (date.getMonth() + 1)).slice(-2),
            ('0' + date.getDate()).slice(-2)
        ].join('-') + ' ' + [
            ('0' + date.getHours()).slice(-2),
            ('0' + date.getMinutes()).slice(-2),
            ('0' + date.getSeconds()).slice(-2)
        ].join(':');
    }

    return self;
});

angular.module('PSERecharge').controller('cashInController', cashInController);
cashInController.$inject = ['$http', '$timeout', 'cashInService', '$window', 'messageProvider', '$cookies', '$analytics', 'cookieProvider', 'configProvider'];

function cashInController($http, $timeout, cashInService, $window, messageProvider, $cookies, $analytics, cookieProvider, configProvider) {
    var self = this;
    /**
     * Define la visibilidad de la vista de confirmación de los datos
     * @type {Bool}
     */
    var toggled,
        /**
         * Define si los campos del formulario se encuentran bloqueados
         * @type {Bool}
         */
        formlock,
        /**
         * Define el bloqueo de los botones
         * @type {Bool}
         */
        noSubmit,
        /**
         * Contiene el TicketID
         * @type {double}
         */
        ticketId,
        /**
         * Define la visibilidad del overlay para los mensajes de información
         * @type {Bool}
         */
        message,
        /**
         * Define las clases adicionales para los botones
         * @type {String}
         */
        btnClass,

        /**
         * Define tiempo en el que aparece el tooltip
         * @type {bool}
         */
        timeOut;

    self.phone = '';
    self.toggled = false;
    self.form_lock = false;
    self.noSubmit = false;
    self.message = false;
    self.timeOut = true;
    self.btnClass = '';
    self.ticketId = '';
    self.gateway_types = [{
        value: 0,
        label: messageProvider.cashIn.natural_person
    }, {
        value: 1,
        label: messageProvider.cashIn.juridic_person
    }];
    self.gateway_type = self.gateway_types[0];
    $analytics.pageTrack('/recarga-cuenta');

    /**
     * propiedad para controlar cuando se muestra el
     * captcha
     * @property showCaptcha
     * @type boolean
     */
    self.showCaptcha = false;

    /**
     * Funcion que gestiona un error para mostrarlo al usuario como una modal.
     * @method self.handleError
     * @param messageTitle Texto para el titulo de la modal a mostrar.
     * @param messageBody Texto con el contenido a mostrar en la modal.
     * @param messageButton Texto para colocar en el botón que tiene la modal.
     * @private
     */
    self.handleError = function (messageTitle, messageBody, messageButton) {
        self.message = true;
        try {
            navigator.vibrate(250);
        } catch (e) { }
        self.messageTitle = messageTitle;
        self.messageBody = messageBody;
        self.messageButton = messageButton;
        self.noSubmit = false;
        self.form_lock = false;
        self.btnClass = '';
    }

    self.timeTooltip = function (bank) {
        if (!!bank && bank.code === '1007') {
            self.timeOut = false;
            setTimeout(function () {
                self.timeOut = true;
            }, 12000);
        }
    }

    /**
     * Funcion que se ejecuta cuando la obtencion de la lista de bancos es exitosa.
     * En caso de que no se pueda obtener la lista de bancos por parte del Middle,
     * mostrar mensaje y desbloquear formulario
     * @method getBankListSuccess
     * @param response Objeto con la informacion de respuesta
     * @private
     */
    function getBankListSuccess(response) {
        if (!!response.data.ResponseMessage && response.data.ResponseMessage.ResponseHeader.Status.StatusCode === messageProvider.response_codes.success) {
            self.bankList = response.data.ResponseMessage.ResponseBody.any.getBankListRS.data;
        } else if (!!response.data.ResponseMessage && response.data.ResponseMessage.ResponseHeader.Status.StatusCode === messageProvider.response_codes.forbidden) {
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.nighttime_error, messageProvider.alertMsg.ok);
        } else if (!!response.data.ResponseMessage && response.data.ResponseMessage.ResponseHeader.Status.StatusCode !== messageProvider.response_codes.success) {
            self.handleError(messageProvider.alertMsg.oops_connerror, response.data.ResponseMessage.ResponseHeader.Status.StatusDesc, messageProvider.alertMsg.ok);
        } else {
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.connerror, messageProvider.alertMsg.ok);
        }
    }

    /**
     * Funcion que se ejecuta cuando la obtencion de la lista de bancos es exitosa
     * @method getBankListSuccess
     * @param response Objeto con la informacion de respuesta
     * @private
     */
    function getBankListFail(reason) {
        if (reason.status === messageProvider.response_codes.forbidden_number) {
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.nighttime_error, messageProvider.alertMsg.ok);
        } else if (reason.status === messageProvider.response_codes.generic_number) {
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.connerror, messageProvider.alertMsg.ok);
        } else {
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.no_response_text, messageProvider.alertMsg.ok);
        }
    }

    /**
     * Funcion que se ejecuta cuando se pudo generar el ticketId.
     * @method generateTicketIdSuccess
     * @param response Objeto con la informacion de respuesta
     * @private
     */
    self.generateTicketIdSuccess = function (response) {
        if (!!response.data.ResponseMessage && response.data.ResponseMessage.ResponseHeader.Status.StatusCode === messageProvider.response_codes.success) {
            self.ticketId = response.data.ResponseMessage.ResponseBody.any.generateTicketIdRS.ticketId;
            self.desc = response.data.ResponseMessage.ResponseBody.any.generateTicketIdRS.paymentDescription;
            /* Mostar DIV con los datos de confirmación*/
            self.toggled = true;
            self.btnClass = '';
            self.noSubmit = false;
            scroll(0, 0);
            $analytics.pageTrack('/elegir-banco');
        }
        /* La respuesta vino malformada */
        else {
            $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                category: messageProvider.analytics.pse_cashin_category,
                label: messageProvider.analytics.malformed_response_label
            });
            alert(messageProvider.alertMsg.pse_error);
            location.reload();
        }
    }

    /**
     * Funcion que se ejecuta en caso de que no se pueda generar el ticketId.
     * @method generateTicketIdFail
     * @param response Objeto con la informacion de respuesta
     * @private
     */
    self.generateTicketIdFail = function (reason) {
        $analytics.eventTrack(messageProvider.analytics.event_type_error, {
            category: messageProvider.analytics.pse_cashin_category,
            label: messageProvider.analytics.ticket_id_couldnt_be_generated_label
        });
        alert(messageProvider.alertMsg.pse_error);
        self.noSubmit = false;
        self.form_lock = false;
        self.btnClass = '';
    }

    /**
     * Funcion que se ejecuta cuando el servicio de validar el cliente responde
     * http status OK.
     *
     * Recibe respuesta por parte del servidor (Independiente si fue exitosa la
     * validación ST:200).
     *
     * Si la cuenta de NEQUI existe entonces, validar que sea posible obtener el
     * ticketID.
     *
     * @method validateClientSuccess
     * @param response Objeto con la informacion de respuesta
     * @private
     */
    function validateClientSuccess(response) {
        var customerData = {
          phoneNumber: self.phone,
          transactionValue: self.amount,
          documentType: self.id_type,
          documentNumber: self.id_num,
          email: self.email,
          name: '',
          userType: self.userType,
          bankCode: self.bank.code
        };
        if (!!response.data.ResponseMessage) {
            if (response.data.ResponseMessage.ResponseHeader.Status.StatusCode === messageProvider.response_codes.success) {
                /**
                * Generar ticketID
                */
                cashInService.generateTicketId2(customerData).then(self.generateTicketIdSuccess, self.generateTicketIdFail);
            }
            /**
            * El servidor de validación no responde o se presenta un código de error
            * distinto a 200 OK.
            */
            else {
                /**
                * Ammount Check Failed
                */
                var StatusCode = (response.data.ResponseMessage.ResponseHeader.Status.StatusCode).toString();
                var StatusDesc = (response.data.ResponseMessage.ResponseHeader.Status.StatusDesc).toString();
                if (StatusCode === messageProvider.response_codes.transaction_failed) {
                    $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                        category: messageProvider.analytics.pse_cashin_category,
                        label: StatusDesc
                    });
                    self.handleError(messageProvider.alertMsg.checkAmmount, StatusDesc, messageProvider.alertMsg.ok);
                }
                /**
                * Ante el internal Server error (500)
                */
                else if (StatusCode === messageProvider.response_codes.generic || StatusCode === messageProvider.response_codes.parsing_error) {
                    self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.connerror, messageProvider.alertMsg.ok);
                } else if (StatusCode === messageProvider.response_codes.broker_timeout) {
                    self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.connerror, messageProvider.alertMsg.ok);
                } else {
                    $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                        category: messageProvider.analytics.pse_cashin_category,
                        label: StatusDesc
                    });
                    self.handleError(messageProvider.alertMsg.check_phone, StatusDesc, messageProvider.alertMsg.ok);
                }
            }
        } else {
            /**
            * Respuesta malformada.
            */
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.connerror, messageProvider.alertMsg.ok);
        }
    }

    /**
    * En caso de no obtener respuesta por parte del servicio de validación
    * de cuentas.
    *
    * @method validateClientFail
    * @param response Objeto con la informacion de respuesta
    * @private
    */
    function validateClientFail(reason) {
        if (reason.status === messageProvider.response_codes.forbidden_number) {
            self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.nighttime_error, messageProvider.alertMsg.ok);
        } else {
            self.handleError(messageProvider.alertMsg.no_response, messageProvider.alertMsg.no_response_text, messageProvider.alertMsg.ok);
        }
    }

    /**
    * Ejecutamos la carga de la lista de bancos.
    */
    cashInService.getBankList2(self.phone).then(getBankListSuccess, getBankListFail);

    /**
     * Metodo ejecutado al enviar los datos iniciales de la recarga, se consumen los servicios de validación de cuenta existente y el getBankList para popular el select de los bancos
     * @method submit
     * @param isValid Resultado de la validación de Angular en el formulario
     * @public
     */
    self.submit = function (isValid) {
        /*Todos los campos del formulario cumplen con las validaciones establecidas en la vista, bloquear los controles*/
        if (isValid) {
            self.noSubmit = true;
            self.form_lock = true;
            /*Aplicar la clase spinner a los botones*/
            self.btnClass = 'spinner';
            /*Enviar click a Analytics */
            $analytics.eventTrack(messageProvider.analytics.event_type_process_recharge, {
                category: messageProvider.analytics.pse_cashin_category
            });
            /*Recopilar datos del usuario */
            var customerData = {
                phoneNumber: self.phone,
                transactionValue: self.amount,
                documentType: self.id_type,
                documentNumber: self.id_num,
                email: self.email,
                name: '',
                userType: self.userType,
                bankCode: self.bank.code
            };

            cashInService.verifyCaptcha(self.myRecaptchaResponse, customerData).then(function (response) {
                if (!!response.data.ResponseMessage && !!response.data.ResponseMessage.ResponseHeader) {
                    if (response.data.ResponseMessage.ResponseHeader.Status.StatusCode === messageProvider.response_codes.success) {
                        sessionStorage.setItem('token', response.data.ResponseMessage.ResponseBody.any.verifyCaptchaRS.token);
                        //Iniciar promesas para validación de la cuenta
                        cashInService.validateClient2(customerData).then(validateClientSuccess, validateClientFail);
                    } else {
                        self.handleError(messageProvider.alertMsg.genericError, response.data.ResponseMessage.ResponseHeader.Status.StatusDesc, messageProvider.alertMsg.ok);
                    }
                } else {
                    self.handleError(messageProvider.alertMsg.genericError, messageProvider.alertMsg.recaptchaError, messageProvider.alertMsg.ok);
                }
            }, function () {
                $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                    category: messageProvider.analytics.pse_cashin_category,
                    label: messageProvider.alertMsg.no_response_text
                });

                self.handleError(messageProvider.alertMsg.no_response, messageProvider.alertMsg.no_response_text, messageProvider.alertMsg.ok);
            });

        } else {
            $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                category: messageProvider.analytics.pse_cashin_category,
                label: messageProvider.alertMsg.fatal_error
            });
            self.message = true;
            self.messageTitle = messageProvider.alertMsg.no_response;
            self.messageBody = messageProvider.alertMsg.fatal_error;
            self.messageButton = messageProvider.alertMsg.ok;
        }
    };

    /**
     * Metodo llamado desde la pantalla de confirmación para regresar a la entrada de datos
     * @method back
     * @public
     */
    self.back = function () {
        self.noSubmit = false;
        self.form_lock = !(self.form_lock);
        self.toggled = !(self.toggled);
        self.btnClass = '';
        self.myRecaptchaResponse = undefined;
    };

    /**
     * Metodo llamado desde los mensajes de advertencia para cerrar el modal
     * @method hideMessage
     * @public
     */
    self.hideMessage = function () {
        self.message = !(self.message);
    };

    /**
     * Metodo que consume el servicio de contrucción del link de reenvio hacia la pasarela y reenvia al usuario hacia esta
     * @method gotoGateway
     * @public
     */
    self.gotoGateway = function () {
        self.noSubmit = true;
        /*Aplicar la clase spinner a los botones*/
        self.btnClass = 'spinner';
        /*Enviar evento a analytics*/
        $analytics.eventTrack(messageProvider.analytics.event_type_go_to_bank, {
            category: messageProvider.analytics.pse_cashin_category,
            value: self.bank.name
        });
        /*            Crear un array con los datos introducidos por el usuario*/
        var customerData = {
            phoneNumber: self.phone,
            transactionValue: self.amount,
            documentType: '',
            documentNumber: '',
            email: '',
            userType: self.gateway_type.value,
            bankCode: self.bank.code,
            ticketId: self.ticketId
        };
        $cookies.put('lastBank', self.bank.code);
        var promisectp = cashInService.createTransactionPayment2(customerData);
        promisectp.then(function (response) {
            if (!!response.data.ResponseMessage) {
                /*                Recibe respuesta por parte del servidor (Independiente si fue exitosa la validación ST:200)*/
                if (response.data.ResponseMessage.ResponseHeader.Status.StatusCode === messageProvider.response_codes.success && !!response.data.ResponseMessage.ResponseBody.any.createTransactionPaymentRS.returnCode && response.data.ResponseMessage.ResponseBody.any.createTransactionPaymentRS.returnCode === 'SUCCESS') {
                    $window.location.href = response.data.ResponseMessage.ResponseBody.any.createTransactionPaymentRS.bankUrl;
                } else {
                    $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                        category: messageProvider.analytics.pse_cashin_category,
                        label: response.data.ResponseMessage.ResponseBody.any.createTransactionPaymentRS.validationMessage
                    });
                    self.handleError(messageProvider.alertMsg.ups_connerror, response.data.ResponseMessage.ResponseBody.any.createTransactionPaymentRS.validationMessage, messageProvider.alertMsg.ok);
                }
            } else {
                /**
                * Respuesta malformada.
                */
                self.handleError(messageProvider.alertMsg.oops_connerror, messageProvider.alertMsg.connerror, messageProvider.alertMsg.ok);
            }
        }, function (reason) {
            $analytics.eventTrack(messageProvider.analytics.event_type_error, {
                category: messageProvider.analytics.pse_cashin_category,
                label: messageProvider.alertMsg.ctp_error_text
            });
            self.handleError(messageProvider.alertMsg.ctp_error, messageProvider.alertMsg.ctp_error_text, messageProvider.alertMsg.ok);
        });
    };
    /**
     * Configuración del plugin Jquery Alphanum (Para las entradas en los campos del formulario de ingreso de datos)
     * @method settingsInput
     * @public
     */
    function settingsInput() {
        $(function () {
            /*Validaciones número de celular*/
            $('#Inputphone').numeric({
                allowMinus: false,
                allowThouSep: false,
                allowDecSep: false,
                maxDigits: 10,
                allowLeadingSpaces: false,
                disallow: '.,'
            });

            /*Validaciones número de celular*/
            $('#InputphoneValid').numeric({
                allowMinus: false,
                allowThouSep: false,
                allowDecSep: false,
                maxDigits: 10,
                allowLeadingSpaces: false,
                disallow: '.,'
            });
            /*  Validaciones cantidad a recargar*/
            $('#Inputdocnum').numeric({
                allowMinus: false,
                allowThouSep: false,
                allowDecSep: false,
                maxDigits: 11,
                allowLeadingSpaces: false,
                disallow: '.,'
            });
        });
    }

    /**
     * Funcion para inicializar el captcha.
     */
    function initCaptcha() {

        var cookieValue = cookieProvider.getCookie(configProvider.cookies.keyRecaptcha);
        if (cookieValue === null) {
            cookieProvider.setCookie(configProvider.cookies.keyRecaptcha, 'true', 365);
            self.showCaptcha = true;
        } else {
            self.showCaptcha = cookieValue;
        }

    }

    /**
    * Metodo para inicializar el captcha.
    */
    initCaptcha();
    /*Aplicar a la vista*/
    settingsInput();
    self.gotoHome = function () {
        window.location.href = 'http://www.nequi.com';
    };
}

angular.module('PSERecharge').controller('confirmationController', confirmationController);
confirmationController.$inject = ['$http', '$timeout', 'confirmationService', '$window', 'messageProvider', '$routeParams', '$analytics'];

function confirmationController($http, $timeout, confirmationService, $window, messageProvider, $routeParams, $analytics) {
    var self = this;
    self.loading = true;
    var ticketId = '';
    self.footer_toggler = 'hide';
    $analytics.pageTrack('/resumen-recarga');
    if (!!$routeParams.debug) {
        var debug = $routeParams.debug;
        if (debug === 'OK') {
            self.loading = true;
            self.transaction_status = 'Aprobada';
            self.success = true;
            self.status_msg = 'Tu recarga ha sido exitosa';
            self.overlay = true;
            self.status_img = 'status-success';
        }
        if (debug === 'FAILED') {
            self.loading = true;
            self.transaction_status = 'Fallida';
            self.success = true;
            self.status_msg = 'Tu recarga ha fallado, ¿Por que no vuelves a intentarlo?';
            self.overlay = true;
            self.status_img = 'status-fail';
        }
        if (debug === 'NOT_AUTHORIZED') {
            self.loading = true;
            self.transaction_status = 'Rechazada';
            self.success = true;
            self.status_msg = 'Tu banco no autorizado la transacción';
            self.overlay = true;
            self.status_img = 'status-notauth';
        }
        if (debug === 'PENDING') {
            self.transaction_status = 'Pendiente';
            self.success = true;
            self.status_msg = 'Tu recarga se encuentra pendiente de validación, por favor espera unos minutos y revisa que el saldo se vea reflejado en tu mochila';
            self.overlay = true;
            self.status_img = 'status-pending';
        }
    }
    if (!!$routeParams.ticketId) {
        self.loading = true;
        ticketId = $routeParams.ticketId;
        var getTransactionInformation = confirmationService.getTransactionInformation2(ticketId);
        getTransactionInformation.then(function(response) {
            if (!!response.data.ResponseMessage.ResponseBody.any.getTransactionInformationRS) {
                self.data = response.data.ResponseMessage.ResponseBody.any.getTransactionInformationRS;
                if (!!self.data && !!self.data.returnCode) {
                    if (self.data.returnCode !== 'SUCCESS') {
                        $window.location.href = 'http://www.nequi.com';
                    } else {
                        if (self.data.transactionState === 'OK') {
                            $analytics.eventTrack('Recarga exitosa', {category: 'PSE-Entrada', value: self.data.transactionValue, label: self.data.financialInstitutionName}); 
                            self.transaction_status = 'Aprobada';
                            self.success = true;
                            self.status_msg = 'Tu recarga ha sido exitosa, gracias por usar Nequi';
                            self.overlay = true;
                            self.status_img = 'status-success';
                            self.loading = false;
                        }
                        if (self.data.transactionState === 'FAILED') {
                            $analytics.eventTrack('Recarga fallida', {category: 'PSE-Entrada', value: self.data.transactionValue, label: self.data.financialInstitutionName}); 
                            self.transaction_status = 'Fallida';
                            self.success = true;
                            self.status_msg = 'Tu recarga ha fallado, ¿Por que no vuelves a intentarlo?';
                            self.overlay = true;
                            self.status_img = 'status-fail';
                            self.loading = false;
                        }
                        if (self.data.transactionState === 'NOT_AUTHORIZED') {
                            $analytics.eventTrack('Recarga Rechazada', {category: 'PSE-Entrada', value: self.data.transactionValue, label: self.data.financialInstitutionName}); 
                            self.transaction_status = 'Rechazada';
                            self.success = true;
                            self.status_msg = 'Tu banco no autorizó la transacción';
                            self.overlay = true;
                            self.status_img = 'status-notauth';
                            self.loading = false;
                        }
                        if (self.data.transactionState === 'PENDING') {
                            $analytics.eventTrack('Recarga Pendiente', {category: 'PSE-Entrada', value: self.data.transactionValue, label: self.data.financialInstitutionName});
                            self.transaction_status = 'Pendiente';
                            self.success = true;
                            self.status_msg = 'Tu recarga se encuentra pendiente de validación, por favor espera unos minutos y revisa que el saldo se vea reflejado en tu mochila';
                            self.overlay = true;
                            self.status_img = 'status-pending';
                            self.loading = false;
                            alert('Por favor verificar si el débito fue realizado en el banco');
                        }
                    }
                } else {
                    $window.location.href = 'http://www.nequi.com';
                }
            } else {
                $window.location.href = 'http://www.nequi.com';
            }
        }, function(reason) {
            alert('En este momento no podemos verificar el resultado de tu recarga, comprueba que se haya añadido a tu mochila y en caso contrario ponte en contacto con servicio al cliente.');
            $window.location.href = 'http://www.nequi.com';
        });
    } else {
        $window.location.href = 'http://www.nequi.com';
    }
    self.hideOverlay = function() {
        self.overlay = false;
    };
    self.gotoHome = function() {
        $analytics.eventTrack('Click botón: Nueva Recarga', {category: 'PSE-Entrada'});  
        window.location.href = '/bdigitalpsl';
    };
    self.gotoHome_Page = function() {
        $analytics.eventTrack('Click botón: Salir', {category: 'PSE-Entrada'}); 
        window.location.href = 'http://www.nequi.com.co';
    };
    self.generatePDF = function() {
        html2canvas(document.getElementById('confirmationPrintArea'), {
            onrendered: function(canvas) {
                var data = canvas.toDataURL("image/jpeg", 1.0);
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500,
                    }]
                };
                pdfMake.createPdf(docDefinition).download('RecargaNequi.pdf');
            }
        });
    };
}
angular.module('PSERecharge').factory('cashInService', cashInService);
cashInService.$inject = ['$http', '$resource', 'configProvider', '$q', 'utilsProvider'];

function cashInService($http, $resource, configProvider, $q, utilsProvider) {
    /**
     * Inicialización del servicio
     */
    var cashInService = {},
        /**
         * Inicialización del SDK de Amazon API Gateway
         */
        apigClient = apigClientFactory.newClient();

    /**
     * Valida la existencia de una cuenta Nequi
     * @method validateClient
     * @param data Número de télefono a validar
     * @public
     */
    cashInService.validateClient2 = function (data) {
        var promise = $q.defer();
        apigClient.servicesPseValidateClientPost({}, validateClientRequest(data)).then(function (data) {
            promise.resolve(data);
        }).catch(function (error) {
            promise.reject(error);
        });
        return promise.promise;
    };
    /**
     * Prepara el request message para validateClient
     * @method validateClientRequest
     * @param phoneNumber Número de télefono a validar
     * @private
     */
    function validateClientRequest(customerData) {
        var messageId = sessionStorage.getItem('messageId');
        return {
            'RequestMessage': {
                'RequestBody': {
                    'any': {
                        'validateClientRQ': {
                            'phoneNumber': customerData.phoneNumber,
                            'transactionValue': customerData.transactionValue,
                            'value': customerData.transactionValue,
                            'bankCode': customerData.bankCode,
                            'token': sessionStorage.getItem('token')
                        }
                    }
                },
                'RequestHeader': {
                    'Address': {
                        'DeviceAddress': '1.1.1.1',
                        'NetworkAddress': '1.1.1.1'
                    },
                    'Channel': 'PL-001',
                    'Destination': {
                        'ServiceName': 'PSEServices',
                        'ServiceOperation': 'validateClient',
                        'ServiceRegion': 'C001',
                        'ServiceVersion': '1.0.0'
                    },
                    'MessageID': messageId,
                    'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                }
            }
        };
    }
    /**
     * Trae la lista de bancos de PSE
     * @method getBankList
     * @param phoneNumber Número de télefono con el fin de revalidar
     * @public
     */
    cashInService.getBankList2 = function (phoneNumber) {
        var promise = $q.defer();
        apigClient.servicesPseGetBankListPost({}, getBankListRequest(phoneNumber)).then(function (data) {
            promise.resolve(data);
        }).catch(function (error) {
            promise.reject(error);
        });
        return promise.promise;
    };
    /**
     * Prepara el request message para getBankList
     * @method getBankListRequest
     * @param phoneNumber Número de télefono a validar
     * @private
     */
    function getBankListRequest(phoneNumber) {
        var messageId = new Date().getTime().toString();
        return {
            'RequestMessage': {
                'RequestBody': {
                    'any': {
                        'getBankListRQ': {
                            'phoneNumber': phoneNumber
                        }
                    }
                },
                'RequestHeader': {
                    'Channel': 'PL-001',
                    'Destination': {
                        'ServiceName': 'PSEServices',
                        'ServiceOperation': 'getBankList',
                        'ServiceRegion': 'C001',
                        'ServiceVersion': '1.0.0'
                    },
                    'MessageID': messageId.substring(messageId.length - 9),
                    'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                }
            }
        };
    }
    /**
     * Solicita el enlace a la pasarela correspondiente según los datos definidos por el usuario
     * @method createTransactionPayment
     * @param customerData Objeto con los datos introducidos por usuario
     * @public
     */
    cashInService.createTransactionPayment2 = function (customerData) {
        var promise = $q.defer();
        apigClient.servicesPseCreateTransactionPaymentPost({}, createTransactionPaymentRequest(customerData)).then(function (data) {
            promise.resolve(data);
        }).catch(function () {
            promise.reject();
        });
        return promise.promise;
    };
    /**
     * Prepara el request message para createTransactionPayment
     * @method createTransactionPaymentRequest
     * @param phoneNumber Número de télefono a validar
     * @private
     */
    function createTransactionPaymentRequest(customerData) {
        var messageId = sessionStorage.getItem('messageId');
        var date = new Date();
        return {
            'RequestMessage': {
                'RequestBody': {
                    'any': {
                        'createTransactionPaymentRQ': {
                            'phoneNumber': customerData.phoneNumber,
                            'transactionValue': customerData.transactionValue,
                            'documentType': customerData.documentType,
                            'documentNumber': customerData.documentNumber,
                            'email': customerData.email,
                            'userType': customerData.userType,
                            'bankCode': customerData.bankCode,
                            'ticketId': customerData.ticketId,
                            'token': sessionStorage.getItem('token')
                        }
                    }
                },
                'RequestHeader': {
                    'Address': {
                        'DeviceAddress': '172.31.15.5',
                        'NetworkAddress': '172.31.15.5'
                    },
                    'Channel': 'PL-001',
                    'Destination': {
                        'ServiceName': 'PSEServices',
                        'ServiceOperation': 'createTransactionPayment',
                        'ServiceRegion': 'C001',
                        'ServiceVersion': '1.0.0'
                    },
                    'MessageID': messageId,
                    'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                }
            }
        };
    }
    cashInService.createTransactionPayment2 = function (customerData) {
        var promise = $q.defer();
        apigClient.servicesPseCreateTransactionPaymentPost({}, createTransactionPaymentRequest(customerData)).then(function (data) {
            promise.resolve(data);
        }).catch(function () {
            promise.reject();
        });
        return promise.promise;
    };
    /**
     * Solicita el ticketID según los datos definidos por el usuario
     * @method createTransactionPayment
     * @param data Objeto con los datos introducidos por usuario
     * @public
     */
    cashInService.generateTicketId2 = function (data) {
        var promise = $q.defer();
        apigClient.servicesPseGenerateTicketidPost({}, generateTicketIdRequest(data)).then(function (data) {
            promise.resolve(data);
        }).catch(function () {
            promise.reject();
        });
        return promise.promise;
    };
    /**
     * Prepara el request message para generateTicketId
     * @method createTransactionPaymentRequest
     * @param data Objeto con la data introducida por el usuario
     * @private
     */
    function generateTicketIdRequest(data) {
        var messageId = sessionStorage.getItem('messageId');
        var date = new Date();
        return {
            'RequestMessage': {
                'RequestBody': {
                    'any': {
                        'generateTicketIdRQ': {
                            'phoneNumber': data.phoneNumber,
                            'transactionValue': data.transactionValue,
                            'bankCode': data.bankCode,
                            'token': sessionStorage.getItem('token')
                        }
                    }
                },
                'RequestHeader': {
                    'Address': {
                        'DeviceAddress': '172.31.15.5',
                        'NetworkAddress': '172.31.15.5'
                    },
                    'Channel': 'PL-001',
                    'Destination': {
                        'ServiceName': 'PSEServices',
                        'ServiceOperation': 'generateTicketId',
                        'ServiceRegion': 'C001',
                        'ServiceVersion': '1.0.0'
                    },
                    'MessageID': messageId,
                    'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                }
            }
        };
    }
    /*
    DEBUG ONLY - OJO BORRAR
    */
    cashInService.getBankList = function (phoneNumber) {
        var messageId = new Date().getTime().toString();
        var promise = $q.defer();
        $http({
            method: 'POST',
            url: configProvider.URLgetBankList,
            headers: {
                'Authorization': '',
                'Content-Type': 'application/json'
            },
            data: {
                'RequestMessage': {
                    'RequestBody': {
                        'any': {
                            'getBankListRQ': {
                                'phoneNumber': phoneNumber
                            }
                        }
                    },
                    'RequestHeader': {
                        'Address': {
                            'DeviceAddress': '172.31.15.5',
                            'NetworkAddress': '172.31.15.5'
                        },
                        'Channel': 'PL-001',
                        'Destination': {
                            'ServiceName': 'PSEServices',
                            'ServiceOperation': 'getBankList',
                            'ServiceRegion': 'C001',
                            'ServiceVersion': '1.0.0'
                        },
                        'MessageID': messageId.substring(messageId.length - 9),
                        'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                    }
                }
            }
        }).then(function (data) {
            promise.resolve(data);
        }, function () {
            promise.reject();
        });
        return promise.promise;
    };
    cashInService.generateTicketId = function (phoneNumber) {
        var messageId = sessionStorage.getItem('messageId');
        var promise = $q.defer();
        $http({
            method: 'POST',
            url: configProvider.URLgenerateTicketId,
            headers: {
                'Authorization': '',
                'Content-Type': 'application/json'
            },
            data: {
                'RequestMessage': {
                    'RequestBody': {
                        'any': {
                            'generateTicketIdRQ': {
                                'phoneNumber': phoneNumber,
                                'token': sessionStorage.getItem('token')
                            }
                        }
                    },
                    'RequestHeader': {
                        'Address': {
                            'DeviceAddress': '172.31.15.5',
                            'NetworkAddress': '172.31.15.5'
                        },
                        'Channel': 'PL-001',
                        'Destination': {
                            'ServiceName': 'PSEServices',
                            'ServiceOperation': 'generateTicketId',
                            'ServiceRegion': 'C001',
                            'ServiceVersion': '1.0.0'
                        },
                        'MessageID': messageId,
                        'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                    }
                }
            }
        }).then(function (data) {
            promise.resolve(data);
        }, function () {
            promise.reject();
        });
        return promise.promise;
    };
    cashInService.createTransactionPayment = function (customerData) {
        var messageId = sessionStorage.getItem('messageId');
        var promise = $q.defer();
        $http({
            method: 'POST',
            url: configProvider.URLctp,
            headers: {
                'Authorization': '',
                'Content-Type': 'application/json'
            },
            data: {
                'RequestMessage': {
                    'RequestBody': {
                        'any': {
                            'createTransactionPaymentRQ': {
                                'phoneNumber': customerData.phoneNumber,
                                'transactionValue': customerData.transactionValue,
                                'documentType': customerData.documentType,
                                'documentNumber': customerData.documentNumber,
                                'email': customerData.email,
                                'userType': customerData.userType,
                                'bankCode': customerData.bankCode,
                                'ticketId': customerData.ticketId,
                                'token': sessionStorage.getItem('token')
                            }
                        }
                    },
                    'RequestHeader': {
                        'Address': {
                            'DeviceAddress': '172.31.15.5',
                            'NetworkAddress': '172.31.15.5'
                        },
                        'Channel': 'PL-001',
                        'Destination': {
                            'ServiceName': 'PSEServices',
                            'ServiceOperation': 'createTransactionPayment',
                            'ServiceRegion': 'C001',
                            'ServiceVersion': '1.0.0'
                        },
                        'MessageID': messageId,
                        'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                    }
                }
            }
        }).
            then(function (data) {
                promise.resolve(data);
            }, function () {
                promise.reject();
            });
        return promise.promise;
    };

    /**
     * Valida la existencia de una cuenta Nequi
     * @method verifyCaptcha
     * @param gResponse captcha a verificar
     * @param data Data de la transaccion
     * @public
     */
    cashInService.verifyCaptcha = function (gResponse, data) {
        var promise = $q.defer();
        apigClient.servicesPseVerifyCaptchaPost({}, verifyCaptchaRequest(gResponse, data)).then(function (data) {
            promise.resolve(data);
        }).catch(function (error) {
            promise.reject(error);
        });
        return promise.promise;
    };

    /**
        * Prepara el request message para verifyCaptcha
        * @method validateClientRequest
        * @param gRecaptchaResponse Hash del captcha generado por el usuario.
        * @param data Data de la transaccion
        * @private
        */
    function verifyCaptchaRequest(gRecaptchaResponse, data) {
        var messageId = new Date().getTime().toString();
        var messageIdFormat = messageId.substring(messageId.length - 9);
        sessionStorage.setItem('messageId', messageIdFormat);
        return {
            'RequestMessage': {
                'RequestBody': {
                    'any': {
                        'verifyCaptchaRQ': {
                            'recaptchaResponse': gRecaptchaResponse,
                            'phoneNumber': data.phoneNumber,
                            'transactionValue': data.transactionValue,
                            'bankCode': data.bankCode
                        }
                    }
                },
                'RequestHeader': {
                    'Address': {
                        'DeviceAddress': '1.1.1.1',
                        'NetworkAddress': '1.1.1.1'
                    },
                    'Channel': 'PL-001',
                    'Destination': {
                        'ServiceName': 'PSEServices',
                        'ServiceOperation': 'verifyCaptcha',
                        'ServiceRegion': 'C001',
                        'ServiceVersion': '1.0.0'
                    },
                    'MessageID': messageIdFormat,
                    'RequestDate': utilsProvider.generateDateWithFormat(new Date())
                }
            }
        };

    }
    /**
     * Trae una lista de paises
     * @method getCountry
     * @public
     */
    cashInService.getCountry = function () {
        var promise = $q.defer();
        $http.get('https://restcountries.eu/rest/v1/all').
            then(function (data) {
                promise.resolve(data);
            }, function () {
                promise.reject();
            });
        return promise.promise;
    };
    return cashInService;
}

   angular.module('PSERecharge').factory('confirmationService', confirmationService);

   confirmationService.$inject = ['$http', '$resource', 'configProvider', '$q'];

   function confirmationService($http, $resource, configProvider, $q) {
       /**
        * Inicialización del servicio     
        */
       var confirmationService = {},

           apigClient = apigClientFactory.newClient();

       confirmationService.getTransactionInformation = function(ticketId) {
           var promise = $q.defer();
           $http({
               method: 'POST',
               url: configProvider.URLgetTransactionInformation,
               headers: {
                   'Authorization': 'Basic V1NfVVNFUjpnN09ZYjlIUGtJY0wkOEY= ',
                   'Content-Type': 'application/json'
               },
               data: {
                   'RequestMessage': {
                       'RequestBody': {
                           'any': {
                               'getTransactionInformationRQ': {
                                   'ticketId': ticketId
                               }
                           }
                       },
                       'RequestHeader': {
                           'Channel': 'PL-001',
                           'Destination': {
                               'ServiceName': 'PSEServices',
                               'ServiceOperation': 'getTransactionInformation',
                               'ServiceRegion': 'C001',
                               'ServiceVersion': '1.0.0'
                           },
                           'MessageID': '1467046416507',
                           'RequestDate': '2016-06-27T16:53:36.507Z'
                       }
                   }
               }
           }).
           then(function(data) {
               promise.resolve(data);
           }, function() {
               promise.reject();
           });
           return promise.promise;
       };

       /**
        * Solicita el ticketID según los datos definidos por el usuario
        * @method createTransactionPayment
        * @param customerData Objeto con los datos introducidos por usuario
        * @public
        */
       confirmationService.getTransactionInformation2 = function(ticketId) {

           var promise = $q.defer();
           apigClient.servicesPseGetTransactionInformationPost({}, getTransactionInformationRequest(ticketId)).then(function(data) {
               promise.resolve(data);
           }).catch(function() {
               promise.reject();
           });
           return promise.promise;
       };
       /**
        * Prepara el request message para generateTicketId
        * @method createTransactionPaymentRequest
        * @param phoneNumber Número de télefono a validar
        * @private
        */
       function getTransactionInformationRequest(ticketId) {
           var messageId = new Date().getTime().toString();
           var date = new Date();
           return {
               'RequestMessage': {
                   'RequestBody': {
                       'any': {
                           'getTransactionInformationRQ': {
                               'ticketId': ticketId
                           }
                       }
                   },
                   'RequestHeader': {
                       'Channel': 'PL-001',
                       'Destination': {
                           'ServiceName': 'PSEServices',
                           'ServiceOperation': 'getTransactionInformation',
                           'ServiceRegion': 'C001',
                           'ServiceVersion': '1.0.0'
                       },
                       'MessageID': messageId.substring(messageId.length - 9),
                       'RequestDate': new Date().toJSON()
                   }
               }
           };
       }
       return confirmationService;
   }
