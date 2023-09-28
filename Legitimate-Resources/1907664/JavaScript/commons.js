/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2016 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

/**
 * The <code>CQ_Analytics</code> library contains all analytics component classes and utilities.
 * @static
 * @class CQ_Analytics
 */

if (!window.CQ_Analytics) {
    window.CQ_Analytics = {};
}

/*************************************************************************
 *
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2015 Adobe Systems Incorporated
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 **************************************************************************/

(function() {
    
    /**
     * The DataProvider does provide methods to store and retrieve data from
     * the data layer. By default ContextHub is used as data provider.
     * Alternatively the older ClientContext can be used by setting the type
     * to ClientContext.
     * 
     * <code>
     * CQ_Analytics.DataProvider.setType(ClientContext);
     * <code>
     * 
     * The code assumes that at least one of the data providers has been loaded
     * prior to the execution of this code block.
     * 
     * @static
     * @public
     */
    CQ_Analytics.DataProvider = (function() {
        
        /**
         * ContextHub object
         */
        var CONTEXTHUB = window.ContextHub;
        
        /**
         * ClientContext object
         */
        var CLIENTCONTEXT = window.ClientContext;
        
        /**
         * Default provider type ContextHub. Falls back to ClientContext
         * if ContextHub is undefined.
         */
        var DEFAULT_PROVIDER_TYPE = CONTEXTHUB || CLIENTCONTEXT;
        
        var providerType = DEFAULT_PROVIDER_TYPE;
        
        /**
         * Returns the variables contained into a value.
         * 
         * @param {String}
         *            value The value
         */
        function getVariables(value) {
            if (!value || typeof(value) != "string") return [];
            var res = value.match(new RegExp("\\$\\{([\\w/]*)\\}", "ig"));
            return res ? res : [];
        };
        
        /**
         * Returns the path to the property contained in the provided
         * variable.
         * 
         * @static
         * @param {String}
         *            variable The variable
         * @return The path to the property. Null if no path available.
         */
        function getPropertyPath(variable) {
            if( !variable || variable.length < 2 ) return null;
            return variable.substring(2, variable.length - 1);
        };
        
        
        
        return {
            
            /**
             * Checks if the store with the specified storeName exists.
             * 
             * @static
             * @param {String}
             *            storeName Name of the store
             */
            hasStore: function hasStore(storeName) {
                if (providerType === CONTEXTHUB) {
                    return (ContextHub.getStore(storeName) !== 'undefined');
                } else {
                    return (CQ_Analytics.CCM.stores[storeName] !== 'undefined');
                }
            },
            
            /**
             * Returns all available stores.
             * 
             * @return {Object} Object holding the stores
             */
            getStores: function getStores() {
                if (providerType === CONTEXTHUB) {
                    var stores = {};
                    var chStores = ContextHub.getAllStores();
                    Object.keys(chStores).forEach(function(k, i) {
                        var store = chStores[k];
                        stores[store.name] = {};
                        stores[store.name].data = store.getTree();
                    });
                    return stores;
                } else {
                    return CQ_Analytics.CCM.getStores();
                }
            },
            
            /**
             * Sets the specified key and value on the store with name
             * storeName.
             * 
             * @static
             * @param {String}
             *            storeName Name of the store to set item
             * @param {String}
             *            key Item key
             * @param {Object}
             *            value Item value
             */
            setItem: function setItem(storeName, key, value) {
                if (providerType === CONTEXTHUB) {
                    ContextHub.setItem('/store/' + storeName + '/' + key, value);
                } else {
                    CQ_Analytics.CCM.stores[storeName].setProperty(key, value);
                }
            },
            
            /**
             * Returns the value stored with the specified key in the store with
             * name storeName.
             * 
             * @static
             * @param {String}
             *            storeName Name of the store to get item from
             * @param {String}
             *            key Item key
             */
            getItem: function getItem(storeName, key) {
                if (providerType === CONTEXTHUB) {
                    return ContextHub.getItem('/store/' + storeName + '/' + key) || "";
                } else {
                    return CQ_Analytics.CCM.stores[storeName].getProperty(key);
                }
            },
            
            /**
             * Resets the store with the specified storeName.
             * 
             * @static
             * @param {String}
             *            storeName Name of the store to reset
             */
            reset: function reset(storeName) {
                if (providerType === CONTEXTHUB) {
                    ContextHub.getStore(storeName).reset();
                } else {
                    CQ_Analytics.CCM.stores[storeName].reset();
                }
            },
            
            /**
             * Checks if data provider exists and is loaded properly.
             * 
             * @static
             * @returns {Boolean} true if data layer is present, false otherwise
             */
            exists: function exists() {
                if (providerType === CONTEXTHUB) {
                    return (ContextHub && ContextHub.version);
                } else {
                    return (CQ_Analytics && CQ_Analytics.ClientContextMgr && CQ_Analytics.ClientContextMgr.isConfigLoaded);
                }
            },
            
            /**
             * Registers a callback handler to be called when the data provider
             * has been initialized.
             * 
             * @static
             * @param {Function} callback Callback function to execute when data provider is ready
             */
            onReady: function onReady(callback) {
                if (providerType === CONTEXTHUB) {
                    ContextHub.eventing.on(
                        [ContextHub.Constants.EVENT_ALL_STORES_READY, ContextHub.Constants.EVENT_STORES_PARTIALLY_READY],
                        function(event, data) {
                            callback.call(this);
                        },
                        null,
                        true
                    );
                } else {
                    if (CQ_Analytics.CCM.areStoresInitialized) {
                        callback.call(this);
                    } else {
                        CQ_Analytics.CCM.addListener("storesinitialize", function(e) {
                            callback.call(this);
                        });
                    }
                }
            },
            
            /**
             * Sets the provider type.
             * 
             * @static
             * @param {Object}
             *            type Data provider implementation.
             */
            setType: function setType(type) {
                providerType = type;
            },
            
            /**
             * Returns the provider type.
             * 
             * @static
             * @return {Object} Data provider implementation
             */
            getType: function getType() {
                if (providerType) {
                    return providerType;
                }
                return DEFAULT_PROVIDER_TYPE;
            },
            
            /**
             * Replaces the variables into a value by their corresponding values
             * in the data provider and returns the result.
             * 
             * @static
             * @param {String}
             *            value The value
             * @return {String} The result of the replacement
             */
            replaceVariables: function (value) {
                if (!value) return value;
                //keep history to avoid infinite loops
                var history = "";
                var res = value;
                var variables = getVariables(value);
                while (variables.length > 0 && history.indexOf(variables.join()) == -1) {
                    for (var i = 0; i < variables.length; i++) {
                        //current format should ${store/property}
                        //extract store/property
                        var vName = getPropertyPath(variables[i]);
                        var v = "";
                        if (providerType === CONTEXTHUB) {
                            v = ContextHub.getItem(vName);
                        } else {
                            v = CQ_Analytics.ClientContext.get(vName);
                        }
                        res = res.replace(new RegExp("\\\$\\{" + vName + "\\}", "ig"), v);
                    }
                    history += variables.join();
                    variables = getVariables(res);
                }
                return res;
            }
        }
    })();
    
})();
