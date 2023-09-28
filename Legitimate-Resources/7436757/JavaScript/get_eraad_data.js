/**
 * Get Eraad data constructor
 * 
 * @options_param json_url JSON to load
 * 
 * @options_param cardType ...
 * @options_param minAge ...
 * @options_param maxage ...
 * @options_param userType ...
 * 
 * @options_param noSobriopriceContainer ...
 * @options_param sobriopriceContainer ...
 * @options_param noSobrioPrimeValueContainer ...
 * @options_param sobrioPrimeValueContainer ...
 * 
 * @options_param selectContainer ...
 * 
 */
Get_eraad_data = function (options) {
  var _this = this;

  // Get options 
  this.json_url = options.hasOwnProperty("json_url") ? options.json_url.toString() : '/static/Particuliers/rcwb/assets/data/cartes/cartes.json';
  this.cardType = options.hasOwnProperty("cardType") ? options.cardType.toString() : null;
  this.userType = options.hasOwnProperty("userType") ? options.userType.toString() : "Standard";
  this.minAge = options.hasOwnProperty("minAge") ? options.minAge.toString() : "30";
  this.maxAge = options.hasOwnProperty("maxAge") ? options.maxAge.toString() : "99";

  // Cas particulier : Non Etudiant/ Standard (18-24ans)
  if(this.userType=="Standard"&&_this.minAge.toString() == "18") this.userType="Non Etudiant";
  // Cas particulier : BFM -> tranches d'age par defaut = 35-99ans au lieu de 30-99ans
  if(this.userType=="BFM"&&_this.minAge.toString() == "30") this.minAge="35";
  // Cas particulier : BFM -> tranches d'age par defaut = 25-34ans au lieu de 25-29ans
  if(this.userType=="BFM"&&_this.maxAge.toString() == "29") this.maxAge="34";
  // Cas particulier : Carte Kapsul BFM -> tranche d'age unique = 18-99ans
  if(this.cardType=="Carte Kapsul"&&this.userType=="BFM") {this.minAge="18"; this.maxAge="99";}
  // Cas particulier : Carte Kapsul Standard -> tranche d'age = 25-99
  if(this.cardType=="Carte Kapsul"&&this.userType=="Standard") {this.minAge="25"; this.maxAge="99";}

  // Reduce price value
  this.noSobrioDiscountContainer = options.hasOwnProperty('noSobrioDiscountContainer') ? options.noSobrioDiscountContainer : null;
  this.sobrioDiscountContainer = options.hasOwnProperty('sobrioDiscountContainer') ? options.sobrioDiscountContainer : null;
  // Price value
  this.noSobrioPriceContainer = options.hasOwnProperty('noSobrioPriceContainer') ? options.noSobrioPriceContainer : null;
  this.sobrioPriceContainer = options.hasOwnProperty('sobrioPriceContainer') ? options.sobrioPriceContainer : null;
  // Prime value
  this.noSobrioPrimeValueContainer = options.hasOwnProperty('noSobrioPrimeValueContainer') ? options.noSobrioPrimeValueContainer : null;
  this.sobrioPrimeValueContainer = options.hasOwnProperty('sobrioPrimeValueContainer') ? options.sobrioPrimeValueContainer : null;
  // Prime container (hide if null)
  this.noSobrioPrimeContainer = options.hasOwnProperty('noSobrioPrimeContainer') ? options.noSobrioPrimeContainer : null;
  this.sobrioPrimeContainer = options.hasOwnProperty('sobrioPrimeContainer') ? options.sobrioPrimeContainer : null;
  // Card name
  this.noSobrioCardNameContainer = options.hasOwnProperty('noSobrioCardNameContainer') ? options.noSobrioCardNameContainer : null;
  this.sobrioCardNameContainer = options.hasOwnProperty('sobrioCardNameContainer') ? options.sobrioCardNameContainer : null;
  // Age select container
  this.selectContainer = options.hasOwnProperty('selectContainer') ? options.selectContainer : null;

  this.onSelectChange = options.hasOwnProperty('onSelectChange') ? options.onSelectChange : function(){};

  // Result values - CB sÃ¨che
  this.mensualPriceSeche = "--,--";
  this.annuelPriceSeche = "--,--";
  this.primeAmountSeche = "0";
  this.discountAmountSeche = "0";
  this.offerCodeSeche = -1;
  this.cbNameSeche = "";
  
  // Result values - CB + Sobrio
  this.mensualPriceSobrio = "--,--";
  this.primeAmountSobrio = "0";
  this.discountAmountSobrio = "0";
  this.offerCodeSobrio = -1;
  this.cbNameSobrio = "";

  this.getData = function() {
    // Search in array
    for (var i = 0; i < _this.data.length; i++) {
      var _this_in_errad = _this.data[i];
    
        // console.log("EERAD ================", i, _this_in_errad)
        // console.log("_this_in_errad.Recommandable__c == true", _this_in_errad.Recommandable__c, _this_in_errad.Recommandable__c.toString() == "true")
        // console.log("_this_in_errad.SG_EERSobrio__c == false", _this_in_errad.SG_EERSobrio__c, _this_in_errad.SG_EERSobrio__c.toString() == "false")
        // console.log(_this.minAge +"== _this_in_errad.SG_EERAgeMinimum__c", _this_in_errad.SG_EERAgeMinimum__c , _this.minAge.toString() == _this_in_errad.SG_EERAgeMinimum__c.toString())
        // console.log(_this.maxAge +"== _this_in_errad.SG_EERAgeMaximum__c", _this_in_errad.SG_EERAgeMaximum__c, _this.maxAge.toString() == _this_in_errad.SG_EERAgeMaximum__c.toString())
        // console.log(_this.cardType +"== _this_in_errad.SG_EERTypeDeCarte__c", _this_in_errad.SG_EERTypeDeCarte__c, _this.cardType.toString() == _this_in_errad.SG_EERTypeDeCarte__c.toString())
        // console.log(_this.userType +"== _this_in_errad.SG_EERCategorie__c", _this_in_errad.SG_EERCategorie__c, _this.userType.toString() == _this_in_errad.SG_EERCategorie__c.toString())
        
      // Get data without sobrio
      if (
        _this_in_errad.Recommandable__c.toString() == "true"
        &&_this_in_errad.SG_EERSobrio__c.toString() == "false"
        && (_this.minAge.toString() == _this_in_errad.SG_EERAgeMinimum__c.toString())
        && (_this.maxAge.toString() == _this_in_errad.SG_EERAgeMaximum__c.toString())
        && (_this.cardType.toString() == _this_in_errad.SG_EERTypeDeCarte__c.toString())
        && (_this.userType.toString() == _this_in_errad.SG_EERCategorie__c.toString())
      ) {
        _this.mensualPriceSeche = parseFloat(_this_in_errad.SG_EERPrixEERADMensuel__c, 10);
        _this.annuelPriceSeche = parseFloat(_this_in_errad.SG_EERPrixEERADAnnuel__c, 10);
        _this.primeAmountSeche = parseFloat(_this_in_errad.montant_Prime__c, 10);
        _this.offerCodeSeche = parseFloat(_this_in_errad.codeOffreUnique__c, 10);
        _this.discountAmountSeche = parseFloat(_this_in_errad.prixPromotionMensuel__c, 10);
        _this.cbNameSeche = _this_in_errad.SG_EERIntituleOffreSite__c;
      }
      // Get data with sobrio
      else if (
        _this_in_errad.Recommandable__c.toString() == "true"
        && _this_in_errad.SG_EERSobrio__c.toString() == "true"
        && (_this.minAge.toString() == _this_in_errad.SG_EERAgeMinimum__c.toString())
        && (_this.maxAge.toString() == _this_in_errad.SG_EERAgeMaximum__c.toString())
        && (_this.cardType.toString() == _this_in_errad.SG_EERTypeDeCarte__c.toString())
        && (_this.userType.toString() == _this_in_errad.SG_EERCategorie__c.toString())
      ) {
        _this.mensualPriceSobrio = parseFloat(_this_in_errad.SG_EERPrixEERADMensuel__c, 10);
        _this.primeAmountSobrio = parseFloat(_this_in_errad.montant_Prime__c, 10);
        _this.offerCodeSobrio = parseFloat(_this_in_errad.codeOffreUnique__c, 10);
        _this.discountAmountSobrio = parseFloat(_this_in_errad.prixPromotionMensuel__c, 10);
        _this.cbNameSobrio = _this_in_errad.SG_EERIntituleOffreSite__c;
      }
    }

    function frFormat(x){
      return x.toLocaleString('fr-FR', {minimumFractionDigits: 2});
    }
    _this.mensualPriceSeche = frFormat(_this.mensualPriceSeche);
    _this.annuelPriceSeche = _this.annuelPriceSeche;
    _this.mensualPriceSobrio = frFormat(_this.mensualPriceSobrio);
  }

  this.insertData = function() {
    // Insert no Sobrio price
    if (_this.noSobrioPriceContainer !== null) {
      var containersNoSobrio = document.querySelectorAll(_this.noSobrioPriceContainer);
      for (var index = 0; index < containersNoSobrio.length; index++) {
        //containersNoSobrio[index].innerHTML = _this.mensualPriceSeche;
        containersNoSobrio[index].innerHTML = _this.annuelPriceSeche;
      }
    }

    // Insert Sobrio price
    if (_this.sobrioPriceContainer !== null) {
      var containersSobrio = document.querySelectorAll(_this.sobrioPriceContainer);
      for (var index = 0; index < containersSobrio.length; index++) {
        containersSobrio[index].innerHTML = _this.mensualPriceSobrio;
      }
    }

    // Insert no Sobrio prime
    if (_this.noSobrioPrimeValueContainer !== null) {
      var containersPrimeValueNoSobrio = document.querySelectorAll(_this.noSobrioPrimeValueContainer);
      var containersPrimeNoSobrio = document.querySelectorAll(_this.noSobrioPrimeContainer);
      for (var index = 0; index < containersPrimeValueNoSobrio.length; index++) {
        // set value
        containersPrimeValueNoSobrio[index].innerHTML = _this.primeAmountSeche;
        // container display
        if(_this.noSobrioPrimeContainer !== null && !_this.primeAmountSeche > 0) {
          containersPrimeNoSobrio[index].style.display="none";
          containersPrimeNoSobrio[index].setAttribute("aria-hidden", true);
        } else {
          containersPrimeNoSobrio[index].style.display="";
          containersPrimeNoSobrio[index].setAttribute("aria-hidden", false);
        }
      }
    }

    // Insert Sobrio prime
    if (_this.sobrioPrimeValueContainer !== null) {
      var containersPrimeValueSobrio = document.querySelectorAll(_this.sobrioPrimeValueContainer);
      var containersPrimeSobrio = document.querySelectorAll(_this.sobrioPrimeContainer);
      for (var index = 0; index < containersPrimeValueSobrio.length; index++) {
        // set value
        containersPrimeValueSobrio[index].innerHTML = _this.primeAmountSobrio;
        // container display
        if(_this.sobrioPrimeContainer !== null && !_this.primeAmountSobrio > 0) {
          containersPrimeSobrio[index].style.display="none";
          containersPrimeSobrio[index].setAttribute("aria-hidden", true);
        } else {
          containersPrimeSobrio[index].style.display="";
          containersPrimeSobrio[index].setAttribute("aria-hidden", false);
        }
      }
    }

    // Insert Sobrio discount
    if(_this.sobrioDiscountContainer !== null) {
      var containersSobrioDiscount = document.querySelectorAll(_this.sobrioDiscountContainer);
      for (var index = 0; index < containersSobrioDiscount.length; index++) {
        containersSobrioDiscount[index].innerHTML = _this.discountAmountSobrio;
      }
    }

    // Insert no Sobrio discount
    if(_this.noSobrioDiscountContainer !== null) {
      var containersNoSobrioDiscount = document.querySelectorAll(_this.noSobrioDiscountContainer);
      for (var index = 0; index < containersNoSobrioDiscoun.lengtht; index++) {
        containersNoSobrioDiscount[index].innerHTML = _this.discountAmountSeche;
      }
    }

    // Insert Sobrio CB Name
    if(_this.sobrioCardNameContainer !== null) {
      var containersCbName = document.querySelectorAll(_this.sobrioCardNameContainer);
      for (var index = 0; index < containersCbName.length; index++) {
        containersCbName[index].innerHTML = _this.cbNameSobrio;
      }
    }

    // Insert no Sobrio CB Name
    if(_this.noSobrioCardNameContainer !== null) {
      var containersNoSobrioCbName = document.querySelectorAll(_this.noSobrioCardNameContainer);
      for (var index = 0; index < containersNoSobrioCbName.length; index++) {
        containersNoSobrioCbName[index].innerHTML = _this.cbNameSeche;
      }
    }
  }

  this.insertSelect = function() {
    var containersSelect = document.querySelectorAll(_this.selectContainer);
    for (var index = 0; index < containersSelect.length; index++) {
      // Create select
      var select = document.createElement("select");
      select.setAttribute("id", "ageSelect");

      // Create options
      if(_this.cardType==="Carte Kapsul") {
        if(_this.userType==="BFM") {
          // Kapsul BFM users
          var option1 = document.createElement("option");
          option1.setAttribute("data-dsg_min_age", 18);
          option1.setAttribute("data-dsg_max_age", 99);
          if(_this.minAge.toString() == "18") option1.setAttribute("selected", true)
          option1.innerHTML = "J'ai plus de 18 ans";

          // Append
          //select.append(option1);
          select.appendChild(option1);
        } else {
          var option1 = document.createElement("option");
          option1.setAttribute("data-dsg_min_age", 18);
          option1.setAttribute("data-dsg_max_age", 24);
          if(_this.minAge.toString() == "18") option1.setAttribute("selected", true)
          option1.innerHTML = "J'ai entre 18 et 24 ans";
          var option2 = document.createElement("option");
          option2.setAttribute("data-dsg_min_age", 25);
          option2.setAttribute("data-dsg_max_age", 99);
          if(_this.minAge.toString() == "25") option2.setAttribute("selected", true)
          option2.innerHTML = "J'ai plus de 25 ans";
          
          // Append
          //select.append(option1, option2);
          select.appendChild(option1);
          select.appendChild(option2);
        }
      } else if(_this.userType==="BFM") {
        // BFM users
        var option1 = document.createElement("option");
        option1.setAttribute("data-dsg_min_age", 18);
        option1.setAttribute("data-dsg_max_age", 24);
        if(_this.minAge.toString() == "18") option1.setAttribute("selected", true)
        option1.innerHTML = "J'ai entre 18 et 24 ans";
        var option2 = document.createElement("option");
        option2.setAttribute("data-dsg_min_age", 25);
        option2.setAttribute("data-dsg_max_age", 34);
        option2.innerHTML = "J'ai entre 25 et 34 ans";
        if(_this.minAge.toString() == "25") option2.setAttribute("selected", true)
        var option3 = document.createElement("option");
        option3.setAttribute("data-dsg_min_age", 35);
        option3.setAttribute("data-dsg_max_age", 99);
        option3.innerHTML = "J'ai plus de 35 ans";
        if(_this.minAge.toString() == "35") option3.setAttribute("selected", true)

        // Append
        //select.append(option1, option2, option3);
          select.appendChild(option1);
          select.appendChild(option2);
          select.appendChild(option3);
      } else {
        // Users
        var option1 = document.createElement("option");
        option1.setAttribute("data-dsg_min_age", 18);
        option1.setAttribute("data-dsg_max_age", 24);
        if(_this.minAge.toString() == "18") option1.setAttribute("selected", true)
        option1.innerHTML = "J'ai entre 18 et 24 ans";
        var option2 = document.createElement("option");
        option2.setAttribute("data-dsg_min_age", 25);
        option2.setAttribute("data-dsg_max_age", 29);
        option2.innerHTML = "J'ai entre 25 et 29 ans";
        if(_this.minAge.toString() == "25") option2.setAttribute("selected", true)
        var option3 = document.createElement("option");
        option3.setAttribute("data-dsg_min_age", 30);
        option3.setAttribute("data-dsg_max_age", 99);
        option3.innerHTML = "J'ai plus de 30 ans";
        if(_this.minAge.toString() == "30") option3.setAttribute("selected", true)

        // Append
        //select.append(option1, option2, option3);
          select.appendChild(option1);
          select.appendChild(option2);
          select.appendChild(option3);
      }
      containersSelect[index].appendChild(select);

      select.onchange = function() {
        _this.minAge = this.options[this.selectedIndex].getAttribute('data-dsg_min_age');
        _this.maxAge = this.options[this.selectedIndex].getAttribute('data-dsg_max_age');
        if (_this.userType!=="BFM") _this.userType = _this.minAge.toString() == "18" ? "Non Etudiant" : "Standard";
        _this.getData();
        _this.insertData();
        // call onSelectChange function
        _this.onSelectChange(_this);
      }
      _this.onSelectChange(_this);
    }
  }

  this.init = function () {
    if (_this.cardType === null) {
      console.error("Get_eraad_data", 'Pas de cardtype');
    } else {
      _this.getData();
      _this.insertData();
      _this.insertSelect();
    }
  }

  // Get associated JSON
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      _this.data = JSON.parse(this.responseText);
      _this.init();
    }
  };
  var timestamp = Math.round(new Date().getTime() / 1000);

  xhttp.open("GET", _this.json_url + "?" + timestamp, true);
  xhttp.send();
}