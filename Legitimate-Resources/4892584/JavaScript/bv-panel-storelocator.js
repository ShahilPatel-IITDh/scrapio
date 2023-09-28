
	<div class="npc-bouton-vert--header">
		<span class="npc-bv-h--title"data-content="title"></span>
	</div>
	<div class="restitutionAgences npc-GreenBtn-contentInfo--fsMB npc-GreenBtn-contentInfo--aLNpl npc-GreenBtn-contentBlockItem--noPad">Merci de sélectionner l'agence à laquelle vous souhaitez vous adresser.</div>
	<a href="#" class="StoreLocatorCard-headLink StoreLocatorCard-headLink--mobile js-filter">Filtrer</a>
      <div class="restitutionAgences npc-GreenBtn-contentBlockItem--noPad npc-GreenBtn-contentBlockItem--brandContact">
         <div class="StoreLocatorMap-head">
            <p class="npc-StoreLocatorMap-near">
               <span class="js-StoreLocatorMap-near">0 agence</span> à proximité
            </p>
			
            <button class="npc-msl-link npc-link-custom npc-link-bv-custom js-StoreLocatorCard-headLink--redirect npc-GreenBtn-contentBlockItemBackLink" id="voirPlusAgences" href="#">
               <span>Voir plus <span class="hidden-xs hidden-sm"> d'agences</span></span>
            </button>
         </div>
         <div class="npc-StoreLocatorMap-Filters js-StoreLocatorMap-Filters">
            <div class="StoreLocatorMap-Filter">
               <div class="form-group">
                  <div class="checkbox">
                     <input type="checkbox" value="monday" class="checkbox-input" id="filter-open--monday-bv" data-filter="openings">
                     <label class="checkbox-label" for="filter-open--monday-bv">Ouvert le lundi</label>
                  </div>
                  <div class="checkbox">
                     <input type="checkbox" value="saturday" class="checkbox-input" id="filter-open--saturday-bv" data-filter="openings">
                     <label class="checkbox-label" for="filter-open--saturday-bv">Ouvert le
                     samedi</label>
                  </div>
               </div>
            </div>
            <div class="StoreLocatorMap-Filter StoreLocatorMap-Filter--sep   hidden"></div>
            <div class="StoreLocatorMap-Filter hidden">
               <div class="form-group">
                  <div class="checkbox">
                     <input type="checkbox" value="desk" class="checkbox-input" id="filter-office--ca" data-filter="service">
                     <label class="checkbox-label" for="filter-office--ca">
                     Guichets et distributeurs Crédit%20Agricole
                     </label>
                  </div>
               </div>
            </div>
            <div class="StoreLocatorMap-Filter StoreLocatorMap-Filter--sep"></div>
            <div class="StoreLocatorMap-Filter hidden">
               <div class="form-group">
                  <div class="checkbox">
                     <input type="checkbox" value="appointement" class="checkbox-input" id="filter-appointement" data-filter="attribute">
                     <label class="checkbox-label" for="filter-appointement">
                     Prise de rendez-vous
                     </label>
                  </div>
               </div>
            </div>
            <div class="StoreLocatorMap-Filter StoreLocatorMap-Filter--noSep">
               	<div class="form-group  ">
					<select class="selectpicker show-menu-arrow bootstrap-select--default" data-size="dataSize" data-filter="type" data-dropdown-align-right="true" data-dropup-auto="false">
					<option value="">Type d'agence</option>
					<option id="option-generalPublic" value="generalPublic" data-class="isNotPublic">Agences grand Public</option>
					<option id="option-privateBanking" value="privateBanking" data-class="isNotPrivateBanking">Banques Privées</option>
					<option id="option-enterprise" value="enterprise" data-class="isNotEnterprise">Centres d'affaires et  Agences Entreprises</option>
					<option id="option-pro_farmer_association" value="pro_farmer_association" data-class="isNotProFarmAssoc">Agences pros, agris, associations</option>
					<option id="option-publicCollectivity" value="publicCollectivity" data-class="isNotPublicCollectivity">Agences collectivités publiques</option>
					</select>
				</div>
            </div>
         </div>
         <div class="StoreLocatorMap-content js-StoreLocatorMap-content">
            <div class="StoreLocatorMap-Agencies js-StoreLocatorMap-Agencies">
               <ul class="StoreLocatorMap-AgenciesList">
               </ul>
            </div>
            <div class="StoreLocatorMap-Map js-StoreLocatorMap-Map" style="max-height: 800px;">
               <div class="StoreLocatorMap-GMap js-StoreLocatorMap-GMap"></div>
            </div>
         </div>
      </div>
      <div class="restitutionAgences StoreLocatorMap-Toggles">
         <div class="StoreLocatorMap-Toggle js-StoreLocatorToggle" data-target="js-StoreLocatorMap-Map" id="mapAgency">
            Carte
         </div>
         <div class="StoreLocatorMap-Toggle js-StoreLocatorToggle active" data-target="js-StoreLocatorMap-Agencies" id="listAgency">
            Liste
         </div>
      </div>
   </div>


     <!-- MODAL -->
  <div id="FilterModal-Bv" class="modal fade Modal filterModal--filteronly js-FilterModal" role="dialog">
    <div class="Modal-dialog">
      <div class="Modal-content">
        <div class="Modal-header">
          <button type="button" class="Modal-close" data-dismiss="modal" aria-label="Close"></button>
        </div>
  
        <div class="Modal-body">
          <p class="Modal-mainTitle">Filtrer</p>
  
          <div class="FilterModal-Content">
            <div class="FilterModal-Filters toggle-open js-FilterModal-Filters">
              <div class="FilterModal-Filter">
                <div class="form-group">
                  <div class="checkbox">
                    <input type="checkbox" value="monday" class="checkbox-input" id="m-filter-open--monday-bv" data-filter="openings">
                    <label class="checkbox-label" for="m-filter-open--monday-bv">Ouvert le lundi</label>
                  </div>
                  <div class="checkbox">
                    <input type="checkbox" value="saturday" class="checkbox-input" id="m-filter-open--saturday-bv" data-filter="openings">
                    <label class="checkbox-label" for="m-filter-open--saturday-bv">Ouvert le
                      samedi</label>
                  </div>
                </div>
              </div>
              <div class="FilterModal-Filter">
                <div class="form-group ">
          <select class="selectpicker show-menu-arrow bootstrap-select--default" data-filter="type" data-dropdown-align-right="true" data-dropup-auto="false">
            <option value="">Type d'agence</option>
            <option value="generalPublic">Agences grand Public</option>
            <option value="privateBanking">Banques Privées</option>
            <option value="enterprise">Centres d'affaires et  Agences Entreprises</option>
            <option value="pro_farmer_association">Agences pros, agris, associations</option>
            <option value="publicCollectivity">Agences collectivités publiques</option>
          </select>
                </div>
                <div class="FilterModal-Actions">
                  <a href="#" class="FormActions-btn js-FilterModal-reset">Effacer</a>
                  <button class="FormActions-btn FormActions-btn--submit js-FilterModal-apply">Appliquer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
