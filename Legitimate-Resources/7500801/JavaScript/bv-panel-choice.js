
	<div class="npc-bouton-vert--header">
	    <span class="npc-bv-h--title"data-content="title"></span>
	</div>


	<div class="npc-GreenBtn-contentBlockItem" data-class="showHideStoreLocator">
		<form class="js-bv-formStoreLoc">
			<div class="npc-GreenBtn-contentBlockItemTitle" data-content="itemTitlebloc"></div>
			<div class="npc-GreenBtn-contentBlockItemText">Trouvez une agence proche de vous.</div>
			<button id="findAgenceAuto" type="button" class="npc-msl-button npc-button-custom npc-button-bv-primary js-bv-formStoreLoc-geoLoc">
				<i class="icon npc-locator"></i> Autour de moi
			</button>
			<p id="errorGeolocalisation" class="hidden">Il nous est impossible de déterminer votre géolocalisation, peut-être que les paramètres de votre navigateur ne l'autorisent pas. Nous vous invitons à saisir votre adresse dans le champ en dessous du bouton «Autour de moi».</p>
			<div class="npc-GreenBtn-contentBlockItemText">
				OU
			</div>
			<div class="npc-GreenBtn-contentBlockItemInput">
				<div class="input-group">
					<input type="text" id="trouverAgenceByAdresse" class="form-control" placeholder="Adresse, CP, ville" autocomplete="off">
					<span class="input-group-btn">
						<button class="npc-msl-button npc-button-custom npc-button-bv-primary npc-bv-valider-btn js-bv-formStoreLoc" type="submit">Valider</button>
					</span>
				</div>
				<p id="errorAdress" class="hidden" style="color:red">Veuillez saisir une adresse valide.</p>
				<p id="emptyAdress" class="hidden" style="color:red">Veuillez saisir une adresse.</p>
				<p id="noAgenceByAdress" class="hidden" style="color:red">Pas d'agence disponible dans la zone géographique choisie.</p>
			</div>
		</form>
	</div>
	
	<div class="npc-GreenBtn-contentBlockItem" data-class="showHideBlocContactTel">
		<div class="npc-GreenBtn-contentBlockItemTitle">Prendre rendez-vous par téléphone</div>
		<a data-href="phoneNumberHref" class="npc-msl-link npc-link-custom npc-link-bv-custom npc-GreenBtn-c--telephone" data-class="sansArcep">
			<div class="npc-GreenBtn-contentBlockItemNumber" data-content="phoneNumber"></div>
		</a>

		<a data-href="phoneNumberHref" class="npc-msl-link npc-link-custom npc-link-bv-custom npc-GreenBtn-c--telephone" data-class="avecArcep" >
			<div class="npc-num-tel-arcep" data-class="typeArcep">
				<span class="npc-num-tel-arcep--number" data-content="phoneNumber"></span>
				<div class="npc-num-tel-arcep--legalMentions">
					<div class="npc-nta-legalMentions-text" data-content="serviceArcep"></div>
				</div>
			</div>
		</a>


		<div class="npc-bv-mentions-legales" data-content="greyTitle"></div>
		<div class="npc-GreenBtn-contentBlockItemText" data-content="hours1"></div>
		<div class="GreenBtn-contentBlockItemText" data-content="hours2"></div>
		<div class="GreenBtn-contentBlockItemText" data-content="hours3"></div>
	</div>

	<div class="npc-GreenBtn-contentBlockItem" data-class="showHideBlocContactForm">
		<div class="npc-GreenBtn-contentBlockItemTitle">Contacter directement un conseiller</div>
		<div class="npc-GreenBtn-contentBlockItemText">
			Vous serez mis en relation avec un de nos conseillers qui vous répondra dans les meilleurs délais.
		</div>
		<button aria-label="Lien" class="npc-msl-button npc-button-custom npc-button-bv-primary npc-bv-center-button js-bv-callbackOpenForm">
			<span data-content="title"></span>
		</button>
	</div>

