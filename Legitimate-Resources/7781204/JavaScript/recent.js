var Sunrise;
(function (Sunrise) {
    var GlobalData;
    (function (GlobalData) {
        var RecentPressReleases = (function () {
            function RecentPressReleases(selector, categories, locale, culture, urls) {
                return new Vue({
                    el: selector,
                    data: {
                        pressReleases: null,
                        categories: categories,
                        locale: locale,
                        culture: culture
                    },
                    mounted() {
                        moment.locale(this.locale);

                        axios.get(this.getRecentUrl)
                            .then(response => this.pressReleases = response.data);
                    },
                    filters: {
                        formatDate: function (date, format) {
                            return moment(date).format(format);
                        }
                    },
                    methods: {
                    },
                    computed: {
                        getRecentUrl: function () {
                            return urls.getRecent + this.categories;
                        }
                    }
                });
            }
            return RecentPressReleases;
        }());
        GlobalData.RecentPressReleases = RecentPressReleases;
    })(GlobalData = Sunrise.GlobalData || (Sunrise.GlobalData = {}));
})(Sunrise || (Sunrise = {}));