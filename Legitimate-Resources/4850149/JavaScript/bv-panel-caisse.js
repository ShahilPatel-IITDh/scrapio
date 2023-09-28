 

  
  
    
    
   
  
  
 

  <div class="npc-bouton-vert--header">
	    <span class="npc-bv-h--title">À quel sujet souhaitez-vous nous contacter ?</span>
	</div>
	<div class="npc-bv-selectBox npc-bv-select-sujet">
		<select id="selectMotifBV" tabindex="-1"></select>
		<div class="npc-bv-selected" role="button" tabindex=0 aria-label="Séléctionner un motif de contact"></div>
		<div class="npc-line"></div>
		<div class="npc-bv-options npc-bv-scrollbar">
        	<ul></ul>
 		</div>
    </div>
  <p id="messageChannel" class="npc-msl-color-grey-000"></p>
  <div class="npc-bv-cr">
    <a href="javascript: void(0);" aria-label="Être rappelé" class="Card npc-bv-cr--card js-bv-callbackOpenChoixRappel" data-channelId="2" data-trackingClass-npc="oic_moyen_rappel" data-class="showHideCardRappel">
      <i class="icon npc-phone"></i>    
      <span class="npc-bv-cr-card--title">Être rappelé</span>
      <span class="npc-bv-cr-card--desc">Choisissez un créneau et nous vous rappelons.</span>
    </a>
    <a href="#" aria-label="Prendre un rendez-vous" class="Card npc-bv-cr--card js-bv-callbackOpenChoixRdv" data-channelId="5" data-trackingclass-npc="oic_moyen_prise_de_rdv" data-class="showHideCardRdv">
      <i class="icon npc-calendar"></i>    
      <span class="npc-bv-cr-card--title">Prendre un rendez-vous</span>
      <span class="npc-bv-cr-card--desc">En agence, par téléphone ou en Visio, choisissez un créneau.</span>
    </a>
    <a href="#" aria-label="Envoyer un email" class="Card npc-bv-cr--card js-bv-callbackOpenChoixEmail" data-channelId="4" data-trackingclass-npc="oic_moyen_email" data-class="showHideCardMail">
      <i class="icon npc-mail"></i>    
      <span class="npc-bv-cr-card--title">Envoyer un email</span>
      <span class="npc-bv-cr-card--desc">Un conseiller répondra à votre email dans la journée.</span>
    </a>
    <a href="javascript: void(0);" aria-label="Tchater avec un conseiller" class="Card npc-bv-cr--card js-bv-callbackOpenChoixChat" data-channelId="1" data-trackingclass-npc="oic_moyen_tchat" data-class="showHideCardChat">
      <i class="icon npc-talk"></i>    
      <span class="npc-bv-cr-card--title">Tchater avec un conseiller</span>
      <span class="npc-bv-cr-card--desc">Un conseiller à votre écoute pour vous guider.</span>
    </a>
  </div>

    <div class="npc-bv--info--agence" id="nonConnecteNumAgenceBloc" data-class="displayBlocInfoAgence">

      <div class="npc-bv--info--phone" data-class="sansArcep">
        <i class="icon ic_call_large"></i>
        <div class="npc-bv-ia--content-phone">          
        <span class="npc-bv-h-c-left--desc-s" data-content="title"></span>
        <a class="npc-msl-link npc-link-custom npc-link-bv-custom npc-bv-ia--desc--phone"  data-content="phoneNumber" data-href="phoneNumberHref"></a>
        <span class="npc-bv-ia--desc--s" data-content="callPrice"></span>
        </div>
      </div>
      <div class="npc-bv--info--phoneArcep" data-class="avecArcep">
        <span class="npc-bv-h-c-left--desc-s" data-content="title"></span>
        <a class="npc-msl-link npc-link-custom npc-link-bv-custom npc-num-tel-arcep npc-num-tel-arcep--big" data-class="typeArcep" data-href="phoneNumberHref"> 
          <span class="npc-num-tel-arcep--number" data-content="phoneNumber"></span>
          <div class="npc-num-tel-arcep--legalMentions">
            <span class="npc-nta-legalMentions-text"  data-content="serviceArcep"></span>
          </div>
        </a>
        <span class="npc-bv-ia--desc--s" data-content="callPrice"></span>
      </div>

      <div class="npc-bv-ia--content-schedule">
        <span class="npc-bv-ia--desc--m" data-content="hours1" data-class="hours1"></span>
        <span class="npc-bv-ia--desc--m" data-content="hours2"></span>
        <span class="npc-bv-ia--desc--m" data-content="hours3"></span>
      </div>
    </div>

  <div class="npc-bv--flex--lien">
    
      

    
      
      
      

       
          <a aria-label="Faire une réclamation" href='/ca-des-savoie/particulier/form-demande-reclamation.html' class="npc-msl-link npc-link-custom npc-link-bv-custom inverted npc-msl-small" data-class="displayFaireReclamation" data-trackingclass-npc="oic_reclamation">
              <span>Faire une réclamation</span>
          </a>
      

    


    
      <button aria-label="Trouver le numéro d’une agence" class="npc-msl-link npc-link-custom npc-link-bv-custom inverted npc-msl-small TrouverNumeroAgenceLien js-bv-callbackOpenChoixNumAgence"
      data-class="displayTrouverUneAgence" data-trackingclass-npc="oic_trouver_une_agence">
        <span>Trouver le numéro d’une agence</span>
      </button>
    
    </div>


	<div class="npc-bouton-vert--footer">
	    <div class="npc-bv-aideLien">
	        <i class="icon npc-help"></i>
	        <div class="npc-bv-aideLien--content">
	            <span class="npc-bv-al-c--title">Besoin d'aide ?</span>
	            <span class="npc-bv-al-c--desc">Tous les numéros d’urgence 24h/24</span>
	        </div>

			<button aria-label="Lien" class="npc-msl-link npc-link-custom npc-link-bv-custom 
			inverted npc-msl-small js-bv-callbackOpenAideEtUrgence" 
			data-trackingclass-npc="oic_urgence_caisse">
	        	<span>Aide et urgence</span>
	    	</button>
		</div>
	</div>
