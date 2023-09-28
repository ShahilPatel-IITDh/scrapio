
        (function(){
            window.addEventListener('load', function iterablePageTrack(){
                document.body.dataset.s = 15;
                if(pageInfo && pageInfo.pageType){
                    if (pageInfo.pageType === "article" || pageInfo.pageType === "product") {
                        function stringValue(test){
                            if (test && test != '') {
                                return test;
                            }
                            return '';
                        };

                        let productInfo = {};
                        if(pageInfo.pid){
                            productInfo.id = stringValue(pageInfo.pid);
                            productInfo.name= stringValue(pageInfo.pname);
                            productInfo.image= stringValue(document.querySelector('#prodImage img').src);
                        }

                        document.body.dispatchEvent(new CustomEvent('iterablePageViewEvent', {
                            detail: {
                                category: stringValue(pageInfo.cat_name) != '' ? pageInfo.cat_name : stringValue(pageInfo.cat_id),
                                storeId: 15,
                                productData: productInfo
                            }
                        }));
                    }
                }else{
                    // console.info('no page info, no page track?')
                }
            });
        })();
    