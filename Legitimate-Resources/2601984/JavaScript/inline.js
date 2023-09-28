
    var templatePath = "\/conf\/nedbank\/settings\/wcm\/templates\/nedbank\u002Dbase\u002Dpage";
    var templateName = templatePath ? templatePath.split("/")[templatePath.split("/").length - 1] : "";
    var hostname = window.location.host ? window.location.host.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0] : '';
    var languagePageIndex = "/content/nedbank/za/en/personal/home".split('/').findIndex(function(pageNameTemp) {
        return pageNameTemp == "en";
    })
    if (languagePageIndex > -1) {
        var tempArray = "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1);
        var pageHierarchy = tempArray.join(':');
        var pageCategoryFromURL = tempArray[0];
        var subCategory1 = "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).length > 1 ? "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).splice(0, 2).join(':') : '';
        var subCategory2 = "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).length > 2 ? "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).splice(0, 3).join(':') : '';
        var subCategory3 = "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).length > 3 ? "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).splice(0, 4).join(':') : '';
        var subCategory4 = "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).length > 4 ? "/content/nedbank/za/en/personal/home".split('/').slice(languagePageIndex + 1).splice(0, 5).join(':') : '';
    } else {
        pageHierarchy = "/content/nedbank/za/en/personal/home" ? "/content/nedbank/za/en/personal/home".replace(/\//g, ":") : "";
    }

    if ("" == 'errors' || "/content/nedbank/za/en/personal/home".indexOf("error") > -1 || "/content/nedbank/za/en/personal/home".indexOf("errors") > -1) {
        var pageErrorType = "home"
    } else  {
        var pageErrorType = ""
    }
    var digitalData = {
        page: {
            pageInstanceId: "" + "-" + "/content/nedbank/za/en/personal/home",
            pageInfo: {
                destinationUrl: document.location.origin + document.location.pathname,
                metaTitle: "Personal banking services for better money choices | Nedbank",
                metaDescription: "Get a financial partner who will help, guide and support you on your personal journey." ? "Get a financial partner who will help, guide and support you on your personal journey.".trim() : '',
                metaKeywords: "",
                pageName: "home",
                pageUrlPath: "/content/nedbank/za/en/personal/home",
                pageUrlHierarchy: pageHierarchy,
                primaryCategory: "" || pageCategoryFromURL || '',
                subCategory1: subCategory1,
                subCategory2: subCategory2,
                subCategory3: subCategory3,
                subCategory4: subCategory4,
                referringUrl: document.referrer,
                pageErrorType: pageErrorType,
                sysEnv: window.innerWidth > 1024 ? 'desktop' : window.innerWidth >= 768 ? 'tablet' : 'mobile'
            },
            pageAttributes: {
                language: "English",
                template: templateName,
                version: "1.0"
            }
        },
        website: {
            websiteName: "Nedbank",
            websiteInstanceID: "nedbank\u002Dprod",
            websiteID: "personal.nedbank.co.za",
            websiteEnvironment: "" || 'production'
        }
    }

    var productpagetag = document.querySelector('meta[name=keywords]') ? document.querySelector('meta[name=keywords]').getAttribute("content") : '';
    if ((productpagetag) && ((productpagetag.indexOf('Product') !== -1) || (productpagetag.indexOf('product') !== -1))) {
        var URLfilename = document.location.pathname.split(/[\\/]/).pop().replace(/\.[^/.]+/, "");
        var productType = subCategory2 ? subCategory2.split(":").pop() : '';
        var category = productType ? productType.split("-").pop() : '';

        function standardize(str) {
            var i, frags = str.split('-');
            for (i = 0; i < frags.length; i++) {
                frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
            }
            return frags.join(' ');
        }

        function capitalizeFirstLetters(str) {
            const arr = str.split("-");
            for (var i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

            }
            return arr.join(" ");
        }

        digitalData.product = {
            segment: "" ? "" : "Product Sales",
            category: ""? "" : category,
            productType: "" ? "" : capitalizeFirstLetters(productType),
            product: "" ? "" : standardize(URLfilename),
            subProduct: "",
            merchantName: "",
            feature: "",
            featureValue: "0.00",
            multiProduct: "",
            valueAddedServices: ""
        }
    }
