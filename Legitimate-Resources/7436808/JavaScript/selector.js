/** Copyright 2023 ChiptuningReseller - All Rights Reserved */
Vue.createApp({
  data() {
    return {
      typeData: {},
      brandData: {},
      selectedType: '',
      selectedBrands: [],
      selectedBrand: '',
      serieData: {},
      selectedSeries: [],
      selectedSerie: '',
      modelData: {},
      selectedModels: [],
      selectedModel: '',
      engineData: {},
      selectedEngines: [],
      selectedEngine: '',
      redirecting: false,
      selected_brand_id: '',
      selected_serie_id: '',
      selected_model_id: '',
      
    };
  },
  mounted() {
    /** Check if there is a vehicle type selector class active and then listen for clicks */
    window.onload = () => {
      document.querySelectorAll('.vehicle_type_selector').forEach(occurence => {
        occurence.addEventListener('click', (e) => {
          console.log(e.target.dataset.vtype)
          this.selectedType = e.target.dataset.vtype;
          this.typeSelected(true); //simulate type change
        });
      });  
    };

    if (typeof vData !== "undefined") {
      this.typeData = vData.types;
      this.brandData = vData.brands;
      this.serieData = vData.series;
      this.modelData = vData.models;
      if(typeof(onlyShowType) !== 'undefined') {
        this.onlyShowType = onlyShowType;
        this.selectedType = onlyShowType;
        this.typeSelected();
      }
    }
  },
  methods: {
    resetTypeSelector() {
        this.selectedType = '';
    },
    typeSelected(animate = false) {
        this.redirecting = false;
        var brandSelector = document.getElementById("selectBrand");
        if(animate) {
          brandSelector.classList.add('ctr-div-invisible');
        }
        this.selectedBrands = [];
        this.brandData.forEach((brand) => {
          if (brand.type == this.selectedType) {
            this.selectedBrands.push(brand);
          }
        });
        this.brandsLoaded = true;
        setTimeout(() => {
          this.brandsLoaded = false;
          if(animate) {
            brandSelector.classList.remove("ctr-div-invisible");
            brandSelector.classList.add("ctr-div-visible");
          }
        }, 750);
    },
    brandSelected() {
      if (this.selectedBrand) {
        this.selectedSeries = [];
        this.serieData.forEach((serie) => {
          if (serie.brand_id == this.selectedBrand.id) {
            this.selectedSeries.push(serie);
          }
        });
      }
    },
    serieSelected() {
      if (this.selectedSerie) {
          this.selectedModels = [];
          this.modelData.forEach((build) => {
            if (build.serie_id == this.selectedSerie.id) {
              this.selectedModels.push(build);
            }
        });
      }
    },
    modelSelected() {
      if (this.selectedModel) {
        fetch(homeUrl + '?' + new URLSearchParams({
          ctr_ajax: 'get_engines',
          model_id: this.selectedModel.id,
        }), {
          headers: {
          'Content-Type': 'application/json'
        }}).then((resp) => {
          if (resp.ok) {
            resp.json().then(json => {
              this.selectedEngines = json;
            });
          }          
        }).catch((err) => {
          console.log("An error occured while fetching the engines...", err);
        });
      }
    },
    engineSelected(evt) {
      if(evt.target.value && this.selectedEngine.slug && this.selectedEngine.id) {
        this.redirecting = true;
        var redirUrl = ctrStartUrl + this.selectedType + '/' + this.selectedBrand.slug + '/' + this.selectedSerie.slug + '/' + this.selectedModel.slug + '/' + this.selectedEngine.slug + '/' + this.selectedEngine.id;
        if(redirUrl) {
          window.location.href = redirUrl;
        }
      }
      return;
    },
}
}).mount("#selectorApp");