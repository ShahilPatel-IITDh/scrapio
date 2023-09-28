var certificate = {

	getCertificate: function(certObj){
		var currentLang = $('select[name=updateMyLanguage] option').filter(':selected').val();
		currentLang = currentLang || certObj.langCode;

		var passArguments = {
			targetService: "certificate",
			targetMethod: "getCertificateURL",
			scoId: certObj.scoId,
			userId: certObj.userId,
			langCode: currentLang,
			glsGroup: certObj.glsGroup,
			prevId: certObj.prevId,
			submissionId: certObj.submissionId
		};
    	SKILLCASTGLOBALJS.ajaxCallForJSON(passArguments, this.downloadCertificate, SKILLCASTGLOBALJS.defaults.noArgsObject);
	},

	downloadCertificate: function(response){
    var rd = response.data;
    if(rd.hasOwnProperty('tempFileUrl')){
      window.location.href = rd.tempFileUrl;
    } else {
      alert('File URL not found');
    }
  }

};