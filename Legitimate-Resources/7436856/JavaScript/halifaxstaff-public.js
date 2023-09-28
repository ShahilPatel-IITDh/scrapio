(function ($) {
    'use strict';
    var getData;
    if ($('#our-doctors').length > 0) {
        new Vue({
            el: '#our-doctors',
            data() {
                return {
                    loadMoreBtn: true,
                    loadedNo: 0,
                    loading: true,
                    searchParams: {
                        service_id: null,
                        gender: null,
                        primary_department: null,
                        custom_location: null
                    },
                    selectedLetter: null,
                    searchString: null,
                    searchResults: null,
                    searchTotal: 0
                }
            },
            watch: {
                loadedNo: function (val) {
                    this.loadMoreBtn = val < this.searchTotal;
                },
            },
            computed: {
                alphabet() {
                    return 'abcdefghijklmnopqrstuvwxyz'.split('');
                }
            },
            methods: {
                ajaxCall(param1, param2) {
                    $.ajax({
                        url: searchdoctors.ajax_url,
                        type: 'post',
                        data: {
                            action: 'searchdoctors',
                            params: param1,
                        },
                        success: function (response) {
                            param2(response);
                        }
                    });
                },
                loadMore() {
                    var self = this,
                        params = {
                            offset: self.loadedNo,
                            search: self.searchParams,
                            letter: self.selectedLetter
                        },
                        success = function (response) {
                            
                            if(self.selectedLetter != null){
                                var ngetData = Object.values(response.data);
                                console.log(typeof(ngetData));
                                ngetData.sort(function(a, b) {
                                    return a['lastname'] < b['lastname'] ? -1 : 1;
                                });
                                for (let i = 0; i < ngetData.length; i++) {
                                    getData.push(ngetData[i]);
                                }
                                self.searchResults = $.extend(self.searchResults, getData);
                            }
                            else{
                                self.searchResults = $.extend(self.searchResults, response.data);
                            }
                            self.loading = false;
                            if (response.data) {
                                self.loadedNo = self.loadedNo + parseFloat(response.currentPage);
                            }
                        };
                    this.loading = true;
                    this.ajaxCall(params, success);
                },
                searchByFilters() {
                    var self = this,
                        params = {
                            search: self.searchParams
                        },
                        success = function (response) {
                            self.searchResults = response.data;
                            self.loading = false;
                            self.searchTotal = parseFloat(response.total);
                            self.loadedNo = parseFloat(response.currentPage);
                        };
                    self.loading = true;
                    self.selectedLetter = null;
                    self.searchstring = null;
                    this.ajaxCall(params, success);
                },
                searchByName() {
                    var self = this,
                        params = {
                            searchString: self.searchString
                        },
                        success = function (response) {
                            self.searchResults = response.data;
                            self.loading = false;
                            self.searchTotal = parseFloat(response.total);
                            self.loadedNo = parseFloat(response.currentPage);
                        };
                    self.loading = true;
                    self.selectedLetter = null;
                    self.searchParams.service_id = null;
                    self.searchParams.gender = null;
                    self.searchParams.primarydepartment = null;
                    self.searchParams.addressblock = null;
                    this.ajaxCall(params, success);
                },
                searchByLetter(letter) {
                    var self = this,
                        params = {
                            letter: letter
                        },
                        success = function (response) {
                            //console.log("here111111");
                            getData = Object.values(response.data);
                            getData.sort(function(a, b) {
                                return a['lastname'] < b['lastname'] ? -1 : 1;
                            });
                        
                            self.searchResults = getData;
                            self.loading = false;
                            self.searchTotal = parseFloat(response.total);
                            self.loadedNo = parseFloat(response.currentPage);
                        };
                    self.selectedLetter = letter;
                    self.loading = true;
                    self.searchParams.service_id = null;
                    self.searchParams.gender = null;
                    self.searchParams.primarydepartment = null;
                    self.searchParams.addressblock = null;
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
                    success = function (response) {
                        self.searchResults = response.data;
                        self.loading = false;
                        self.searchTotal = parseFloat(response.total);
                        self.loadedNo = parseFloat(response.currentPage);
                    },
                    urlParams = this.getUrlVars();
                if (urlParams && urlParams.search) {
                    self.searchString = urlParams.search;
                    self.searchByName();
                } else if (urlParams && urlParams.service_id) {
                    self.searchParams.service_id = urlParams.service_id;
                    self.searchByFilters();
                } else if (urlParams && urlParams.doctor_letter) {
                    self.selectedLetter = urlParams.doctor_letter;
                    self.searchByLetter(urlParams.doctor_letter);
                } else {
                    self.ajaxCall(null, success);
                }
            },
            mounted() {
            }
        });
    }

})(jQuery);
