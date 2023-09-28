
<div class="npc-bouton-vert--header">
	<span class="npc-bv-h--title" data-content="title"></span>
</div>
<form id="bv-form" method="post">
    <div id="blocInsertionAgenceAfter" class="npc-GreenBtn-contentBlockItem  npc-GreenBtn-contentBlockItem--noPad npc-GreenBtn-contentBlockItem--minH npc-GreenBtn-margin-bloc">
        <div class="npc-GreenBtn-contentBlockItemBody npc-GreenBtn-contentBlockItemBody--content">
            <div class="npc-GreenBtn-contentBlockItemText npc-GreenBtn-contentBlockItemBody--item">
                Votre demande concerne
                <span class="hidden-xs">: </span>
                <span class="npc-GreenBtn-contentBlockItemSpan" data-content="qualifdemande"></span>
            </div>
            <div class="npc-GreenBtn-contentBlockItemContentLink npc-GreenBtn-contentBlockItemBody--item">
                <a href="javascript: void(0);" id="changerMotifGreenBtn" class="npc-msl-link npc-link-custom npc-link-bv-custom npc-GreenBtn-contentBlockItemLink js-bv-form-goHome"><span>Changer</span></a>
            </div>
        </div>
    </div>
	
		
<div class="ficheAgence npc-GreenBtn-contentBlockItem npc-GreenBtn-contentBlockItem--noPad npc-GreenBtn-margin-bloc" data-class="showHideAgence">
	<div class="npc-GreenBtn-contentBlockItemHeader">
		<div class="npc-GreenBtn-contentBlockItemTitle--leftWhite">
			Votre agence
			<span class="hidden-xs">:</span>
		</div>
	</div>
	<div class="npc-GreenBtn-contentBlockItemBody">
		<div class="npc-GreenBtn-contentBlockItemTitle npc-GreenBtn-contentBlockItemTitle--green"data-template-bind='[{"attribute": "data-tracking-affichage_fiche_agence", "value": "agenceName"}]' data-content="agenceName"></div>
		<div class="npc-GreenBtn-contentBlockItemText npc-GreenBtn-contentBlockItemText--black" data-content="horaireTodayAgence"></div>
		<div class="js-blockMoreInformations">
			<div class="npc-CardAgencyFunc-element">
				<h2 class="npc-CardAgencyFunc-title">Contact :</h2>
				<p class="npc-CardAgencyFunc-address" data-content="addressCpVille"></p>
				<div class="CardAgencyFunc-bloc">
					<p class="npc-CardAgencyFunc-line" data-content="phoneNumber"></p>
					<p class="npc-CardAgencyFunc-line" data-content="fax"></p>
					<p class="npc-CardAgencyFunc-line" data-content="emailAddress"></p>
				</div>
			</div>
			<h2 class="npc-CardAgencyFunc-title">Ouverture :</h2>
			<div class="npc-flex-container">
					<ul class="npc-CardAgencyFunc-days">
						<li class="npc-CardAgencyFunc-day npc-CardAgencyFunc-day--closed">
							<span class="npc-CardAgencyFund-dayName">Lundi</span>
							<span class="npc-CardAgencyFund-dayOpening" data-content="planingLundi"></span>
						</li>
						<li class="npc-CardAgencyFunc-day">
							<span class="npc-CardAgencyFund-dayName">Mardi</span>
							<span class="npc-CardAgencyFund-dayOpening" data-content="planingMardi"></span>
						</li>
						<li class="npc-CardAgencyFunc-day CardAgencyFunc-day--today">
							<span class="npc-CardAgencyFund-dayName">Mercredi</span>
							<span class="npc-CardAgencyFund-dayOpening" data-content="planingMercredi"></span>
						</li>
						<li class="npc-CardAgencyFunc-day">
							<span class="npc-CardAgencyFund-dayName">Jeudi</span>
							<span class="npc-CardAgencyFund-dayOpening" data-content="planingJeudi"></span>
						</li>
					</ul>
					<ul class="npc-CardAgencyFunc-days">
						<li class="npc-CardAgencyFunc-day">
							<span class="npc-CardAgencyFund-dayName">Vendredi</span>
							<span class="npc-CardAgencyFund-dayOpening" data-class="ouvertureVendredi"></span>
						</li>
						<li class="npc-CardAgencyFunc-day">
							<span class="npc-CardAgencyFund-dayName">Samedi</span>
							<span class="npc-CardAgencyFund-dayOpening" data-content="planingSamedi"></span>
						</li>
						<li class="npc-CardAgencyFunc-day">
							<span class="npc-CardAgencyFund-dayName">Dimanche</span>
							<span class="npc-CardAgencyFund-dayOpening" data-content="planingDimanche"></span>
						</li>
					</ul>
			</div>
			<h2 class="npc-CardAgencyFunc-title">Services :</h2>
			<div class="npc-ServiceList">
				<ul class="npc-CardAgencyFunc-list">
					<li data-class="atm">Distributeurs automatiques de billets</li>
					<li data-class="automaticCashMachine">Guichets automatiques</li>
					<li data-class="wheelChairAccess">Accès handicapé</li>
					<li data-class="carPark">Parking</li>
				</ul>
				<ul class="npc-CardAgencyFunc-list">
					<li data-class="exchangeCurrency">Change</li>
					<li data-class="extraService1Show" data-content="extraService1"></li>
					<li data-class="extraService2Show" data-content="extraService2"></li>
					<li data-class="extraService3Show" data-content="extraService3"></li>
					<li data-class="ouvertureSamediShow">Ouvert le samedi</li>
				</ul>
			</div>
		</div>
		<div id="masquerMoreInfo" class="npc-GreenBtn-contentBlockItemContentLink">
			<a href="#" class="npc-msl-link npc-link-custom npc-link-bv-custom npc-GreenBtn-contentBlockItemLink js-moreInformationsLink">Plus d’informations</a>
		</div>
	</div>
</div>

    <div data-class="showHideVisite" class="npc-GreenBtn-contentBlockItem npc-GreenBtn-contentBlockItem--noPad emailFormHide npc-GreenBtn-margin-bloc">
        <div class="npc-GreenBtn-contentBlockItemHeader">
            <div class="npc-GreenBtn-contentBlockItemTitle--leftWhite">
                Vous souhaitez nous rendre visite
                <span class="hidden-xs">:</span>
            </div>
        </div>
        <div class="npc-GreenBtn-contentBlockItemBody">
            <div class="npc-bv-crenau">
                <div class="form-group">
                    <label for="dayForm">Jour</label>
                    <div class="input-field">
                        <input type="text" id="dayForm" name="dayForm" class="form-control date js-appointmentCalendar" readonly="readonly"  placeholder="jj/mm/aaaa">
                        <span class="icon npc-calendar input-field-icon"></span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="hour">Créneau horaire</label>
                    <div class="npc-bv-selectBox">
                        <select id="hour" name="hour" tabindex="-1">
                            <option value="0">Créneau horaire</option>
                            <option value="Matin">Matin</option>
                            <option value="Aprés midi">Aprés midi</option>
                        </select>
                        <div class="npc-bv-selected" role="button" tabindex=0 aria-label="Séléctionner un créneau horaire">Créneau horaire</div>
                        <div class="npc-line"></div>
                        <div class="npc-bv-options npc-bv-scrollbar">
                            <ul>
                                <li select-value="Matin" role="button" tabindex="-1">Le matin</li>
                                <li select-value="Aprés midi" role="button" tabindex="-1">L'après-midi</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="npc-GreenBtn-contentBlockItem npc-GreenBtn-contentBlockItem--noPad npc-GreenBtn-margin-bloc">
        <div class="npc-GreenBtn-contentBlockItemHeader">
            <div class="npc-GreenBtn-contentBlockItemTitle--leftWhite">
                Renseignez vos coordonnées 
                <span class="hidden-xs">:</span>
            </div>
        </div>
        <div class="npc-GreenBtn-contentBlockItemBody">
            <div>
                <p class="npc-GreenBtn-callbackFormRequiredField">
                    champ obligatoire
                </p>
                <div class="npc-infos-identite">
                    <div class="form-group">
						<label for="civility">Civilité</label>
                        <div class="npc-bv-selectBox">
                            <select id="civility" name="civility" tabindex="-1">
                                <option value="0" class="hidden">Civilité</option>
                                <option value="Madame">Madame</option>
                                <option value="Monsieur">Monsieur</option>
                            </select>
                            <div class="npc-bv-selected" role="button" tabindex=0 aria-label="Séléctionner votre civilité">Civilité</div>
                            <div class="npc-line"></div>
							<div class="npc-bv-options npc-bv-scrollbar">
								<ul>
									<li select-value="0" class="hidden">Civilité</li>
           							<li select-value="Madame" role="button" tabindex="-1">Madame</li>
           							<li select-value="Monsieur" role="button" tabindex="-1">Monsieur</li>
								</ul>
							</div>
						</div>
                        
                    </div>
                    <div class="npc-GreenBtn-callbackFormGroup--NoPadLeft form-group">
                        <div class="input-field">
							<label for="lastname" class="npc-requierd-input">Nom</label>
                            <input type="text" class="form-control" id="lastname" name="lastname" placeholder="Nom" minlength="2" maxlength="100">
                        </div>
                    </div>
                    <div class="npc-GreenBtn-callbackFormGroup--NoPadLeft form-group">
                        <div class="input-field">
							<label for="firstname" class="npc-requierd-input">Prénom</label>
                            <input type="text" class="form-control" id="firstname" name="firstname" placeholder="Prénom"minlength="2" maxlength="100">
                        </div>
                    </div>
                </div>
                <div class="npc-infos-personels" id="emailDivMove">
                    <div class="form-group" data-class="showHideDDN">
                        <label for="birthdateForm">Date de naissance</label>
                        <div class="input-field">
                            <input type="text" id="birthdateForm" name="birthdateForm" class="form-control date js-appointmentCalendar"readonly="readonly" placeholder="jj/mm/aaaa">
                            <span class="icon npc-calendar input-field-icon"></span>
                        </div>
                    </div>
                    <div id="emailContainer" class="npc-GreenBtn-callbackFormGroup--NoPadLeft form-group">
                        <label for="email" class="npc-requierd-input">Email</label>
                        <div class="input-field">
                            <input type="email" class="form-control" id="emailForm" name="emailForm" placeholder="adresse@mail.fr"maxlength="100">
                        </div>
                    </div>
                </div>
                <div class="npc-infos-tel" id="emailNewContainer" data-class="showHidePhone">
                    <div class="form-group">
						<label for="country">Indicatif Téléphonique</label>
                        <div class="npc-bv-selectBox">
                            <select id="country" name="country" tabindex="-1"></select>
							<div class="npc-bv-selected" role="button" tabindex=0 aria-label="Séléctionner l'indicatif téléphonique">France (+33)</div>
                            <div class="npc-line"></div>
                            <div class="npc-bv-options npc-bv-scrollbar">
                                <ul></ul>
                            </div>
                        </div>
                    </div>
                    <div class="npc-GreenBtn-callbackFormGroup--NoPadLeft form-group">
					<label for ="phonenumberForm" class="npc-requierd-input">Téléphone</label>
                        <div class="input-field">
                            <input id="phonenumberForm" name="phonenumberForm" type="text" class="form-control"placeholder="01 23 45 67 89" minlength="12" maxlength="14">  
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="npc-GreenBtn-callbackFormWrapper npc-GreenBtn-margin-bloc">
        <div class="npc-GreenBtn-callbackFormContent">
            <div class="npc-OutputMsg--noBcgColor npc-OutputMsg--opposition">
                <p>
                    <b>Opposition au démarchage téléphonique</b>
                </p>
                <p>
                    Si vous ne souhaitez pas faire l’objet de prospection commerciale téléphonique, vous pouvez vous inscrire gratuitement sur la liste d’opposition au démarchage téléphonique Bloctel. Pour en savoir plus sur les modalités d’inscription, consultez le site internet
                    <a href="http://www.bloctel.gouv.fr" target="_blank" class="npc-msl-link npc-link-custom npc-link-bv-custom" style="display: unset;"><span>www.bloctel.gouv.fr</span></a>
                    .
                    <br/>
                    Les consommateurs inscrits sur cette liste ne pourront plus être démarchés téléphoniquement par un professionnel, sauf en cas de relations contractuelles préexistantes avec ce professionnel lors du démarchage téléphonique.
                </p>
            </div>
        </div>
    </div>
    <div id="CaptchaBoutonVertAfter" class="npc-GreenBtn-contentBlockItem npc-GreenBtn-contentBlockItem--noPad npc-GreenBtn-margin-bloc">
        <div class="npc-GreenBtn-contentBlockItemHeader">
            <div class="npc-GreenBtn-contentBlockItemTitle--leftWhite">
                Formulez votre demande 
                <span class="hidden-xs">:</span>
            </div>
        </div>
        <div class="npc-GreenBtn-contentBlockItemBody form-group">
            <div class="input-field">
                <textarea id="comment" name="comment" class="npc-GreenBtn-contentBlockItemTextarea" placeholder="Votre message ici …" maxlength="500" aria-labe="Tapez votre message ici"></textarea>
            </div>
        </div>
    </div>
    <div id="CaptchaBoutonVert" class="npc-full-width npc-bv-Captcha-calcul--whiteText">
        <div class="parsys-captcha captcha parbase">













<div class="Captcha" data-npc-captcha>
	<div class="Captcha-title">Merci de faire ce calcul afin de vérifier que vous n’êtes pas un robot</div>
	<div class="Captcha-body">
		<div class="Captcha-calcul js-Captcha-calcul">
		</div>
		<div class="Captcha-answer">
			<div class="form-group">
				<div class="input-field">
					<input class="form-control js-Captcha-response" type="text" placeholder="Votre réponse" >
				</div>
			</div>
		</div>
	</div>

	<div class="Captcha-errorMessage npc-form-error-custom errorValue js-Captcha-errorMessageValue hidden">
		La valeur saisie est incorrecte
	</div>

	<div class="Captcha-errorMessage npc-form-error-custom errorMissing js-Captcha-errorMessageMissing hidden">
		Merci de renseigner ce champ
	</div>
</div>
</div>

    </div>
	<div class="npc-GreenBtn-callbackLaterFooter">
        <div class="checkbox">
            <input type="checkbox" value="" id="checkboxMentionsLegales" name="checkboxMentionsLegales">
            <label class="checkbox-label npc-GreenBtn-callbackLaterFooterFormLabel npc-GreenBtn-callbackFormLabel--lowerCase" for="checkboxMentionsLegales">Je certifie avoir pris connaissance des <a href="/ca-alpesprovence/particulier/informations/mentions-legales.html" id="checkboxMentionLegale" class="npc-msl-link npc-link-custom npc-link-bv-custom npc-GreenBtn-callbackLaterFooterFormLink" target="_blank" style="display: unset;"><span>mentions légales</span></a></label>
        </div>
    </div>
   
    <button id="sendEmailForm" type="submit" aria-label="Valider" class="npc-msl-button npc-button-custom npc-button-bv-secondary npc-bv-center-button" data-template-bind='[{"attribute": "data-trackingclass-npc", "value": "trackingClass"}]'><span>Valider</span></button>
</form>
           
