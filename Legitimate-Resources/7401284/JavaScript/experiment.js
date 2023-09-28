$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }

});

clickEventAjaxNeedToSend = true;
clickEventAjaxNeedToSend2 = true;
let clickEvents = {};

$(".zapier-airslate-integration-block").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/event/zapier-airslate-integration-block',
        data: {},
        success: function (data) {
        }
    });
});

$(".linkedin-link-click-event").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/prefill-link-on-contact-page',
        data: {},
        success: function (data) {
        }
    });

});

$(".header-phone-link-event").click(function (e) {
    $.ajax({
        type: 'POST',
        url: '/phone-in-header-change',
        data: {},
        success: function (data) {
        }
    });
});

$(".header-contact-button-event").click(function () {
    $.ajax({
        type: 'POST',
        url: '/click-contact-button-in-header',
        data: {},
        success: function (data) {
        }
    });
});

$(".home-page-free-trial-click").submit(
    function () {
    $.ajax({
        type: 'POST',
        url: '/event/homepage-free-trial-form-click',
        data: {},
        success: function (data) {
        }
    });
});

$("#closeBanner").click(
    function () {
    $.ajax({
        type: 'POST',
        url: '/experiment/save-close-banner',
        data: {},
        success: function (data) {
        }
    });
});

$("#feature-free-trial-form-click").submit(
    function () {
        $.ajax({
            type: 'POST',
            url: '/event/feature-free-trial-form-click',
            data: {},
            success: function (data) {
            }
        });
    });

$("#feature-sign-a-sample-doc").click(
    function () {
        $.ajax({
            type: 'POST',
            url: '/event/feature-sign-a-sample-doc',
            data: {},
            success: function (data) {
            }
        });
    });

$('#clickHomePage').on("click touchstart keypress", function(e) {
    var url = $(this).attr("data-url")
    if (clickEventAjaxNeedToSend) {
        clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/enterprise-banner-home-page-click',
            data: {},
            success: function (data) {
                window.location.href = url;
            },
            error: function (data) {
                window.location.href = url;
            }
        });
    }
});

$('#clickNotHomePage').on("click touchstart keypress", function(e) {
    var url = $(this).attr("data-url")
    if (clickEventAjaxNeedToSend) {
        clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/enterprise-banner-not-home-page-click',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            },
            success: function (data) {
                window.location.href = url;
            },
            error: function (data) {
                window.location.href = url;
            }
        });
    }
});

$('.clickIntegrationMicrosoftTeams').on("click touchstart keypress", function(e) {
    if (clickEventAjaxNeedToSend) {
        clickEventAjaxNeedToSend = false;
        dataLayer.push({
            'event': 'CustomEvt',
            'eventCategory': 'Landing',
            'eventAction': 'Install The App Landing Click',
            'eventLabel': 'Integration MS Teams'
        })
    }
});


$('.pdf-editing-link-event').on("click touchstart keypress", function(e) {
    let url = $(this).attr("href")
    if (clickEventAjaxNeedToSend) {
       let clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/new-links-in-header-exp-pdf-editing',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            },
        });
    }
});

$('.online-payments-link-event').on("click touchstart keypress", function(e) {
    let url = $(this).attr("href")
    if (clickEventAjaxNeedToSend) {
       let clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/new-links-in-header-exp-payments',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
});

$('.partners-buttons__track').on("click touchstart keypress", function(e) {
    if (clickEventAjaxNeedToSend2) {
        clickEventAjaxNeedToSend2 = false;
        $.ajax({
            type: 'POST',
            url: '/event/construction-partners-button-click',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
});

$('.request-demo-track-event').on("click touchstart keypress", function(e) {
    if (clickEventAjaxNeedToSend) {
        clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/construction-request-demo-click',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
});

$("#form-sign-button, #form-sign-button-2").on("click", function(e) {
    if (clickEventAjaxNeedToSend) {
        clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/form-new-button-sign-form',
            data: {},
            success: function (data) {
            }
        });
    }
});

$("#form-edit-button, #form-edit-button-2").on("click", function(e) {
    if (clickEventAjaxNeedToSend) {
        clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/form-new-button-edit-form',
            data: {},
            success: function (data) {
            }
        });
    }
});

$('.click-event').on("click touchstart keypress", function(e) {
    let clickEventType = $(this).attr("data-click-event-type")

    if (clickEvents[clickEventType] === undefined) {
        clickEvents[clickEventType] = true;
        $.ajax({
            type: 'POST',
            url: '/event/click-events',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content'),
                "eventType": clickEventType
            },
        });
    }
});

$('#ukraineSupportBtn').on("click touchstart keypress", function(e) {
    if (clickEventAjaxNeedToSend) {
        let clickEventAjaxNeedToSend = false;
        $.ajax({
            type: 'POST',
            url: '/event/ukraine-support-event',
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            },
        });
    }
});

$(".js-menu-solutions-item").on("mouseenter focusin click touchstart keypress", function () {
    if (clickEvents['icp-page-links-in-header'] === undefined) {
        clickEvents['icp-page-links-in-header'] = true;
        $.ajax({
            type: "POST",
            url: "/event/icp-page-links-in-header",
            data: {
                "_token": $('meta[name="csrf-token"]').attr('content')
            }
        });
    }
});
