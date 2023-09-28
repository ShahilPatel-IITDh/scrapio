(function ($) {
    'use strict';
    if ($('#search-services').length > 0) {
        const hiddenItems = [
            'Family Medicine Residency Program',
            'Sports Medicine Fellowship',
        ];
        new Vue({
            el: '#search-services',
            data() {
                return {
                    loading: true,
                    selectedLetter: null,
                    searchString: null,
                    searchResults: []
                }
            },
            watch: {},
            computed: {
                alphabet() {
                    return 'abcdefghijklmnopqrstuvwxyz'.split('');
                }
            },
            methods: {
                ajaxCall(param1, param2) {
                    $.ajax({
                        url: searchservicestreatments.ajax_url,
                        type: 'post',
                        data: {
                            action: 'searchservicestreatments',
                            params: param1,
                            type: search_page_type,
                        },
                        success: function (response) {
                            param2(response)
                        }
                    });
                },
                searchByName() {
                    var self = this,
                        params = {
                            search: self.searchString
                        },
                        success = function (response) {
                            const data = response.filter(item => !hiddenItems.includes(item.title));
                            self.searchResults = data;
                            self.loading = false;
                        };

                    self.loading = true;
                    self.selectedLetter = null;
                    this.ajaxCall(params, success);
                },

                searchByLetter(letter) {
                    var self = this,
                        params = {
                            letter: letter
                        },
                        success = function (response) {
                            const data = response.filter(item => !hiddenItems.includes(item.title));
                            self.searchResults = data;
                            self.loading = false;
                        };

                    self.loading = true;
                    self.selectedLetter = letter;
                    self.searchString = null;
                    this.ajaxCall(params, success);
                },

                getUrlVars() {
                    var vars = {};
                    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                        vars[key] = value;
                    });
                    return vars;
                }

            },
            created() {

                var self = this,
                    urlParams = this.getUrlVars(),
                    success = function (response) {
                        const data = response.filter(item => !hiddenItems.includes(item.title));
                        self.searchResults = data;
                        self.loading = false;
                    };

                if (urlParams && urlParams.searchST) {
                    self.searchString = urlParams.searchST;
                    this.searchByName();
                } else {
                    this.ajaxCall(null, success);
                }
            },
            mounted() {
                // var items = document.querySelectorAll('.single-service-treatment');
                // var hiddenText = [
                //     'Family Medicine Residency Program',
                //     'Sports Medicine Fellowship',
                // ];
                // items.forEach(item => {
                //     if (hiddenText.includes(item.innerText)) {
                //         item.remove();
                //     }
                // })
            }
        });
    }

})(jQuery);
