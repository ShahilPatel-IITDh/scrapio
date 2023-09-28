
   <li class="StoreLocatorMap-Agency js-storeLoc-agency listeAgenceGeolocalisee"

       data-template-bind='[{"attribute": "data-agenceid", "value": "agenceIdList"}, {"attribute": "data-val", "value": "valueAttr"}]'>
   
       <input 
         class="js-agency"
         type="hidden" 
         data-template-bind='[{"attribute": "data-latitude", "value": "latitude"},
                             {"attribute": "data-longitude", "value": "longitude"},
                             {"attribute": "data-market", "value": "markets"},
                             {"attribute": "data-opening", "value": "opening"}]'
       >

       <div class="hidden js-storeLoc-content">
           <h2 class="GMap-AgencyTitle"></h2>
           <p class="GMap-openings" data-content="agenceName"></p>
           <p class="GMap-today" data-content="horaireTodayAgenceForMobile"></p>
           <a href="#"  data-template-bind='[{"attribute": "data-agenceid", "value": "agenceIdList"}]' class="plusInfo GreenBtn-GMap-more">Cliquer ici pour choisir cette agence</a>
       </div>

       <h2 class="StoreLocatorMap-AgencyTitle" data-content="agenceName"></h2>
       <p class="StoreLocatorMap-AgencyAddress" data-content="horaireAdressCPVille"></p>
   
       <div class="StoreLocatorMap-AgencyProx">
           
             
             
               <img data-src="pinAgence" alt="Pin" class="StoreLocatorMap-AgencyProxIcon" />
             
           
           <span class="StoreLocatorMap-AgencyProxValue" data-content="agenceDistance"></span>
       </div>
   
   </li>
  