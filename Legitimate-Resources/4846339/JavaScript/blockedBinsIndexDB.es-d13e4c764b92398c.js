// This is a custom implementation of IDB-Keyval: https://github.com/jakearchibald/idb-keyval
dla.helper.createNamespace('dla.payment.blockedBinsIndexDB');
dla.payment.blockedBinsIndexDB = function () {
    class Store {
        constructor(dbName, storeName) {
            this.storeName = storeName;
            this._dbp = new Promise((resolve, reject) => {
                const openreq = indexedDB.open(dbName, 1);
                openreq.onerror = () => reject(openreq.error);
                openreq.onsuccess = () => resolve(openreq.result);
                openreq.onupgradeneeded = () => {
                    openreq.result.createObjectStore(storeName);
                };
            });
        };

        _withIDBStore(type, callback) {
            return this._dbp.then(db => new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, type);
                transaction.oncomplete = () => resolve();
                transaction.onabort = transaction.onerror = () => reject(transaction.error);
                callback(transaction.objectStore(this.storeName));
            }));
        };
    }

    function get(key, store) {
        let req;
        return store._withIDBStore('readonly', store => {
            req = store.get(key);
        }).then(() => req.result);
    }

    function keys(store) {
        const keys = [];
        return store._withIDBStore('readonly', store => {
            (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
                if (!this.result) { return; }
                keys.push(this.result.key);
                this.result.continue();
            };
        }).then(() => keys);
    }

    function set(key, value, store) {
        return store._withIDBStore('readwrite', store => store.put(value, key));
    }

    function del(key, store) {
        return store._withIDBStore('readwrite', store => {
            store.delete(key);
        });
    }

    function clear(store) {
        return store._withIDBStore('readwrite', store => {
            store.clear();
        });
    }

    function getStores() {
        return new Promise(async (resolve) => {
            this.binChecksumStore = new Store('ll-bbns-checksum', 'checksum-store');
            this.binRangesStore = new Store('ll-bbns-ranges', 'ranges-store');

            resolve({
                binChecksumStore: this.binChecksumStore,
                binRangesStore: this.binRangesStore
            });
        });
    }

    function setRanges(data) {
        return new Promise(async (resolve) => {
            Object.entries(data).reduce((acc, curr) => {
                acc = [
                    ...acc,
                    {
                        name: curr[0] && curr[0].toLowerCase(),
                        ranges: curr[1]
                    }
                ];

                return acc;
            }, []).forEach((item) => set(item.name, item.ranges, this.binRangesStore));

            resolve();
        });
    }

    function getRanges() {
        const ranges = [];
        return new Promise(async (resolve, reject) => {
            try {
                const rangeKeys = await keys(this.binRangesStore);

                for (const key of rangeKeys) {
                    const value = await get(key, this.binRangesStore);

                    ranges.push({name: key, ranges: value});
                }

                resolve(ranges);
            } catch (e) {
                reject(e);
            }
        });
    }

    return {
        get,
        set,
        keys,
        del,
        clear,
        getStores,
        setRanges,
        getRanges
    };
};

$(window).trigger('available', 'blockedBinsIndexDB');
