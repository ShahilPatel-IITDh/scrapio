
        var isMobile = false;
        if(/Mobi/.test(navigator.userAgent)) {
            isMobile = true;
        }
        var att = att || {};
        att.pageProperties = {
            friendlyPageName: 'BUS Connecting caregivers Pg',
            pageName:'',
            pageGroup:'OTHER',
            appCode:'MCOM',
            language:'EN',
            lineOfBusiness:'Business Solutions',            
            viewedUIExperience: isMobile ? 'Smartphone':'Desktop',
            responsiveWebDesignFlag:'1',
            pageFunction:'Learn',
            applicationName:'MARCOMM',
            pageOwnership:'Business',
            siteSection:'BUS',
            siteSubSection1:'Industries',
            siteSubSection2:'Healthcare',
            type:'',
            class:'Text',
            objective:'Consideration',
            category:'',
            vertical:'Healthcare',
            publishDate:'2018/09/19',
            publisher:'',
            persona:'',
            contentAuthor:'',
			productInFocusMedia:'',
            productInFocusLOB:'',
            productInFocusFunction:'',
            customerType:'',
            flowCode:'',
            segment:'',
            url: window.location.pathname,
            pageTitle: document.title,
        };
        att.gatedResources = '[]';
    