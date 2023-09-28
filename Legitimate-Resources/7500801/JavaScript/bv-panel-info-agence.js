
	<div class="npc-bouton-vert--header">
		<span class="npc-bv-h--title">Trouver le numéro d'une agence</span>
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
	<button aria-label="Retour" class="npc-msl-button npc-button-custom npc-button-bv-secondary js-bv-leaveBV" >
  		<span>Fermer</span>
	</button>
