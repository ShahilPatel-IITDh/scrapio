const storeId = document.body.dataset.sid;
var accessoriesData = {
    id: "",
    sub: 0,
};
var incartArray = [];
incartArray["incart"] = "";
incartArray["incart_all"] = {};
let accessoriesArray = [];
// for localStorage
let prodArray = "";

function cartAllAjax(id) {
    const fetchURL = "cart-ajax.php?action=recart&cartitems=" + id;
    fetch(fetchURL, {
        credentials: "same-origin",
    })
        .then(function () {
            // add products from cart to 'incart' string
            accessoriesArray["incart"] += id + ",";
            window.footerFunctions.MiniCartAjax();
            prodArray += id + ",";
            id = id + "";
            id = id.split(",");
            if (Object.keys(accessoriesArray["incart_all"]).length == 0) {
                accessoriesArray["incart_all"] = {};
            }
            for (var i = 0; i < id.length; i++) {
                accessoriesArray["incart_all"][id[i]] = "1";
            }
            //local storage
            var key = "pedA" + accessoriesData.id;
            if (key in localStorage) {
                localStorage.removeItem(key);
            }
            localStorage.setItem(key, prodArray);
            //local storage end

            const bottomRequired = document.querySelector("bottom_r_accessories");
            if (bottomRequired) {
                const qtyButtons = Array.from(bottomRequired.querySelectorAll(".drop_qty"));
                qtyButtons.forEach(function (button) {
                    button.classList.add("disable-btn");
                    button.value = "1";
                });
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cartOneAjax(id, qty, subscription, frequency, button) {
    const fetchURL =
        "cart-ajax.php?" +
        new URLSearchParams({
            mini_scart: "yes",
            update: "yes",
            action: "add",
            products_id: id,
            quantity: qty,
            subscription: subscription,
            frequency: frequency,
        });
    fetch(fetchURL, {
        credentials: "same-origin",
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if ("headerCartModule" in window) {
                // update quantity in the new header
                window.headerCartModule.updateProductQuantity(id, qty);
            }
            document.body.dispatchEvent(
                new CustomEvent("iterableCartUpdate", {
                    detail: {
                        currentCart: data[2].products,
                        storeId: document.body.dataset.s,
                    },
                })
            );
            let cartData = document.getElementById("cartData");
            if (cartData) cartData.innerHTML = JSON.stringify(data[2].products);
            document.body.dispatchEvent(
                new CustomEvent("AnalyticCartEvent", {
                    detail: {
                        id: id,
                        action: "add",
                    },
                })
            );
            const rcSubButton = document.querySelector(".bottom_all_accessories .p" + id + " .subButton");
            const rcAttMenu = document.querySelector(
                ".bottom_all_accessories .p" + id + " .attributeswap .attributemenu"
            );
            const rcBottomCartBtns = Array.from(
                document.querySelectorAll(".bottom_all_accessories .p" + id + " .bottom_cart_btn")
            );
            const cpSubButton = document.querySelector("#cart_popup .p" + id + " .subButton");
            const cpAttMenu = document.querySelector("#cart_popup .p" + id + " .attributeswap .attributemenu");
            const cpAtcCartBtns =
                storeId != 16
                    ? Array.from(document.querySelectorAll("#cart_popup .p" + id + " .atc_cart_btn"))
                    : Array.from(document.querySelectorAll("#cart_popup .p" + id + " .atc_cart_btn_acw"));
            if (rcSubButton) {
                rcSubButton.classList.remove("bottom_cart_btn");
                rcSubButton.classList.add("bottom_cart_btn_in");
                rcSubButton.innerHTML =
                    '<a href="https://' + location.host + '/shopping_cart.php"><span>In Cart</span></a>';
                if (storeId != 16) {
                    rcSubButton.classList.remove("font-colors-green-text");
                    rcSubButton.classList.add("font-colors-gray-dark");
                }
            }
            if (rcAttMenu) {
                rcAttMenu.classList.add("disable-btn");
            }
            rcBottomCartBtns.forEach(function (button) {
                button.classList.remove("bottom_cart_btn");
                button.classList.add("bottom_cart_btn_in");
                if (storeId != 16) {
                    button.classList.remove("font-colors-green-text");
                    button.classList.add("font-colors-gray-dark");
                }
                button.textContent = "In Cart";
            });
            cpAtcCartBtns.forEach(function (button) {
                button.classList.remove("atc_cart_btn");
                button.classList.remove("atc_cart_btn_acw");
                button.classList.add("atc_cart_btn_in");
                button.textContent = "In Cart";
            });
            if (cpSubButton) {
                cpSubButton.classList.remove("atc_cart_btn");
                cpSubButton.classList.remove("atc_cart_btn_acw");
                cpSubButton.classList.add("atc_cart_btn_in");
                cpSubButton.textContent = "In Cart";
            }
            if (cpAttMenu) {
                cpAttMenu.classList.add("disable-btn");
            }

            accessoriesArray["incart"] += id + ",";
            if (Object.keys(accessoriesArray["incart_all"]).length == 0) {
                accessoriesArray["incart_all"] = {};
            }
            if (qty) {
                accessoriesArray["incart_all"][id] = qty.toString();
            }
            //local storage
            prodArray += id + ",";
            var key = "pedA" + accessoriesData.id;
            if (key in localStorage) {
                localStorage.removeItem(key);
            }
            localStorage.setItem(key, prodArray);
            //local storage end
            window.footerFunctions.MiniCartAjax();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function accessAjaxNew(callFrom) {
    callFrom = callFrom || "";
    const fetchURL =
        "get_accessories.php?" +
        new URLSearchParams({
            accessoriesData: JSON.stringify(accessoriesData),
        });
    fetch(fetchURL, {
        method: "GET",
        credentials: "same-origin",
    })
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (Object.keys(data).length > 0) {
                var subArr =
                    storeId != 16 ? display_accessoriesNew(data, callFrom) : display_accessoriesACW(data, callFrom);
                setAttribute(data);
                accessoriesArray = data;
                accessoriesArray["incart"] = incartArray["incart"];
                accessoriesArray["incart_all"] = incartArray["incart_all"];
                //local storage
                var key = "pedA" + accessoriesData.id;
                //check if products from local storage are also in cart
                //case when user comes next day or after removing products from shopping_cart
                // if the same main product contains accessories added to cart from other main product
                // then we need to add a key for this main product with same accessories in local storage
                if (typeof accessoriesArray["all_prod_ids"] != "undefined") {
                    var incartIDs = accessoriesArray["all_prod_ids"].slice(0, -1); // all accessories IDs of current displayed main product
                    incartIDs = incartIDs.split(",");
                    var counter2 = 0;
                    var newstrArray2 = "";
                    for (var i = 0; i < incartIDs.length; i++) {
                        // if accessories are in cart
                        if (accessoriesArray["incart"].indexOf(incartIDs[i]) > -1) {
                            counter2++;
                            newstrArray2 += incartIDs[i] + ","; // create a string 'arrray' with accessories that are in cart
                        }
                    }
                    if (counter2 > 0) {
                        if (key in localStorage) {
                            //check if the key of main prod_id exists in local storage
                            localStorage.removeItem(key);
                        }
                        localStorage.setItem(key, newstrArray2); // adding shared accessories from cart to local storage for this main product
                        prodArray = newstrArray2;
                        newstrArray2 = "";
                    } else {
                        // if no accessories of this main product are in cart
                        if (key in localStorage) {
                            //check if the key of main prod_id exists in local storage
                            localStorage.removeItem(key);
                        }
                    }
                }
                //local storage end
            } else {
                if (document.querySelector(".atc_r_accessories")) {
                    document.querySelector(".atc_r_accessories").style.display = "none";
                }
                if (document.querySelector(".atc_r_accessories")) {
                    document.querySelector(".atc_r_accessories").style.display = "none";
                }
                if (required <= 0 && optional <= 0) {
                    if (document.getElementById("cart_popup")) {
                        document.getElementById("cart_popup").style.height = "100%";
                    }
                    if (document.getElementById("atc-pop")) {
                        document.getElementById("atc-pop").style.height = "100%";
                    }
                    if (document.querySelector(".atc_accessories_container")) {
                        document.querySelector(".atc_accessories_container").style.display = "none";
                    }
                    if (document.querySelector(".atc_bottom_atc_btn")) {
                        document.querySelector(".atc_bottom_atc_btn").style.display = "none";
                    }
                    if (document.getElementById("atc_to_top")) {
                        document.getElementById("atc_to_top").style.display = "none";
                    }
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}
// this function adds color to options from select
// this function is useless if no size drop down
function existVal(key) {
    var checkArray1 = [];
    var checkArray2 = [];
    const optionEl = document.querySelector(".dropdown.group" + key + " > option:checked");
    var drop1;
    if (optionEl) {
        var drop1 = optionEl.dataset.prodid;
    }
    if (typeof drop1 === "number") {
        drop1 = drop1.toString();
        checkArray1.push(drop1);
    } else {
        checkArray1 = drop1.split(",");
    }
    const optionEl2 = document.querySelector(".dropdown2.group" + key + " > option:checked");
    var drop2;
    if (optionEl2) {
        drop2 = optionEl2.dataset.prodid;
    }
    if (typeof drop2 === "number") {
        drop2 = drop2.toString();
        checkArray2.push(drop2);
    } else {
        checkArray2 = drop2.split(",");
    }
    const options2 = Array.from(document.querySelectorAll(".dropdown2.group" + key + " > option"));
    options2.forEach(function (option) {
        var count2 = 0;
        var dataATTR2 = option.dataset.prodid.toString();
        for (var i = 0; i < checkArray1.length; i++) {
            if (dataATTR2.indexOf(checkArray1[i]) > -1) {
                count2++;
            }
        }
        if (count2 > 0) {
            option.style.color = "#000";
        } else {
            option.style.color = "#CCC";
        }
    });
    const options = Array.from(document.querySelectorAll(".dropdown.group" + key + " > option"));
    options.forEach(function (option) {
        var dataATTR1 = option.dataset.prodid.toString();
        var count1 = 0;
        for (var i = 0; i < checkArray2.length; i++) {
            if (dataATTR1.indexOf(checkArray2[i]) > -1) {
                count1++;
            }
        }
        if (count1 > 0) {
            option.style.color = "#000";
        } else {
            option.style.color = "#CCC";
        }
    });
}

//count the number of products in each section
var required = 0;
var optional = 0;
//check if any subscription accessories
var numSub = 0;
// check for dropdown in each section. Used in accessAjax() to remove blank space if all accessory boxes are of the same size.
var rselect = 0;
var oselect = 0;

function display_accessoriesNew(data, callFrom) {
    var newATCAccessories = "";
    var newBottomAccessories = "";
    var subArr = new Array();
    var selectAtr2 = "";
    const rBottomAccessGroup = document.querySelector(".bottom_r_accessories .bottom_access_group");
    const oBottomAccessGroup = document.querySelector(".bottom_o_accessories .bottom_access_group");
    const rAtcAccessGroup = document.querySelector(".atc_r_accessories .atc_access_group");
    const oAtcAcessGroup = document.querySelector(".atc_o_accessories .atc_access_group");
    if (rBottomAccessGroup) {
        rBottomAccessGroup.innerHTML = "";
    }
    if (oBottomAccessGroup) {
        oBottomAccessGroup.innerHTML = "";
    }
    if (rAtcAccessGroup) {
        rAtcAccessGroup.innerHTML = "";
    }
    if (oAtcAcessGroup) {
        oAtcAcessGroup.innerHTML = "";
    }
    var required = 0;
    var optional = 0;
    for (var key in data) {
        if (key != "incart" && key != "incart_all" && key != "all_prod_ids") {
            //Trademark symbol
            if (data[key][0]["products_name"].match("&amp;trade;")) {
                data[key][0]["products_name"] = data[key][0]["products_name"].replace("&amp;trade;", "&#174");
            }

            //new atc showAccessories

            newATCAccessories +=
                '<div class="atc_pr_set p' +
                data[key][0]["products_id"] +
                '" data-prodID="' +
                data[key][0]["products_id"] +
                '" data-group="' +
                key +
                '">';
            newATCAccessories += '<div class="atc_pr_set_top">';
            newATCAccessories +=
                '<div class="atc_img_block"><a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '"><img loading="lazy" width="60px" height="60px" src="/products-image/280/' +
                data[key][0]["products_bimage"] +
                '" alt="' +
                data[key][0]["products_name"] +
                '"></a></div>';
            newATCAccessories += '<div class="atc_pr_product_desctiption">';
            newATCAccessories += '<div class="atc_pr_name">';
            newATCAccessories +=
                '<a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '">' +
                data[key][0]["products_name"] +
                "</a>";
            newATCAccessories += "</div>";
            newATCAccessories += '<div class="atc_pr_model" tabindex="0">';
            newATCAccessories += "<span>Model: " + data[key][0]["products_model"] + "</span>";
            newATCAccessories += "</div>";
            newATCAccessories += "</div>";
            newATCAccessories += "</div>";
            newATCAccessories += '<div class="atc_pr_bottom">';

            // new bottom accessories
            newBottomAccessories +=
                '<div class="bottom_pr_set p' +
                data[key][0]["products_id"] +
                '" data-prodID="' +
                data[key][0]["products_id"] +
                '" data-group="' +
                key +
                '">';
            newBottomAccessories += '<div class="bottom_pr_set_top">';
            newBottomAccessories +=
                '<div class="bottom_img_block"><a tabindex="-1" aria-hidden="true" href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '"><img loading="lazy" width="75px" height="75px" src="/products-image/280/' +
                (data[key][0]["products_bimage"] && data[key][0]["products_bimage"] != ""
                    ? data[key][0]["products_bimage"]
                    : "product_0_125.gif") +
                '" alt="' +
                data[key][0]["products_name"] +
                '"></a></div>';
            newBottomAccessories += '<div class="bottom_accessories_right">';
            newBottomAccessories += '<div class="bottom_pr_product_desctiption">';
            newBottomAccessories += '<div class="bottom_pr_name">';
            newBottomAccessories +=
                '<a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '">' +
                data[key][0]["products_name"] +
                "</a>";
            newBottomAccessories += "</div>";
            newBottomAccessories += '<div class="bottom_pr_model" tabindex="0">';
            newBottomAccessories += "<span>Model: " + data[key][0]["products_model"] + "</span>";
            newBottomAccessories += "</div>";
            newBottomAccessories += "</div>";

            if (data[key][0]["subscription_eligible"] == "0" || !data[key][0]["quantity"]) {
                newBottomAccessories += '<div class="bottom_drop_block bottom_acc_none_sub">';
                if (data[key]["dropdown"]["value"] && Object.keys(data[key]["dropdown"]["value"]).length > 1) {
                    let unique = Math.floor(Math.random() * 10000);
                    newBottomAccessories += '<div class="bottom_drop_set">';
                    newBottomAccessories +=
                        '<label for="bddg' + unique + '">' + data[key]["dropdown"]["name"] + "</label>";
                    newBottomAccessories +=
                        '<select id="bddg' +
                        unique +
                        '" class="bottom_drop_select bg-colors-white-text dropdown group' +
                        key +
                        '">';
                    //if second drop down exists
                    if (data[key]["dropdown"]["value2"]) {
                        var tot1 = 0;
                        for (var keyV2 in data[key]["dropdown"]["value2"]) {
                            tot1++;
                        }
                        if (tot1 > 1) {
                            for (var keyV2 in data[key]["dropdown"]["value2"]) {
                                if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                                    //convert object to comma separated string for data attribute
                                    var dataAtr2 = Object.keys(
                                        data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]
                                    )
                                        .map(function (k) {
                                            return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                                        })
                                        .join(",");
                                }
                                //select the option that belongs to this product
                                if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                                    // data atribute for displayed value in second dropdown
                                    var selectAtr2 = dataAtr2;
                                }
                            }
                        }
                    }
                    var tot2 = 0;
                    for (var keyV in data[key]["dropdown"]["value"]) {
                        tot2++;
                        if (data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]]) {
                            var dataAtr = Object.keys(data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]])
                                .map(function (k) {
                                    return data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]][k];
                                })
                                .join(","); //convert object to comma separated string for data attribute
                        }
                        var optionStyle = 'class="font-colors-black-text"';
                        //select the option that belogs to this product
                        if (data[key]["dropdown"]["value"][keyV] == data[key][0]["attributes_value"]) {
                            var selected = " selected ";
                            var disVal = data[key]["dropdown"]["value"][keyV]; //displayed value in first dropdown
                            var selectAtr = dataAtr; //data atribute for displayed value in first dropdown
                        } else {
                            var selected = "";
                        }
                        //if dropdown2 exists
                        if (tot1 > 1) {
                            //find out which values from dropdown should be black and which should be gray
                            var checkArray = dataAtr.split(",");
                            var count1 = 0;
                            for (var ii = 0; ii < checkArray.length; ii++) {
                                if (selectAtr2.indexOf(checkArray[ii]) > -1) {
                                    count1++;
                                }
                            }
                            var optionStyle =
                                count1 > 0 ? 'class="font-colors-black-text"' : ' class="font-colors-gray-text" ';
                        } else {
                            var optionStyle = 'class="font-colors-black-text"';
                        }
                        newBottomAccessories +=
                            "<option " +
                            optionStyle +
                            ' data-prodId="' +
                            dataAtr +
                            '" value="' +
                            data[key]["dropdown"]["value"][keyV] +
                            '" ' +
                            selected +
                            ">" +
                            data[key]["dropdown"]["value"][keyV] +
                            "</option>";
                    }
                    newBottomAccessories += "</select>";
                    newBottomAccessories += "</div>";
                    //newBottomAccessories += '</div>';
                }
                //if second drop down exists
                if (data[key]["dropdown"]["value2"]) {
                    var tot = 0;
                    for (var keyV2 in data[key]["dropdown"]["value2"]) {
                        tot++;
                    }
                    if (tot > 1) {
                        newBottomAccessories += '<div class="bottom_drop_set">';
                        newBottomAccessories += "<span>" + data[key]["dropdown"]["name2"] + "</span>";
                        newBottomAccessories +=
                            '<select class="bottom_drop_select bg-colors-white-text dropdown2 group' + key + '">';
                        for (var keyV2 in data[key]["dropdown"]["value2"]) {
                            if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                                var dataAtr2 = Object.keys(
                                    data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]
                                )
                                    .map(function (k) {
                                        return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                                    })
                                    .join(","); //convert object to comma separated string for data attribute
                                //find out which values from dropdown2 should be black and which should be gray
                                var checkArray2 = dataAtr2.split(",");
                                var count2 = 0;
                                for (var ii = 0; ii < checkArray2.length; ii++) {
                                    //if first dropdown exist
                                    if (tot2 > 1) {
                                        if (selectAtr.indexOf(checkArray2[ii]) > -1) {
                                            count2++;
                                        }
                                    } else {
                                        count2++;
                                    }
                                }
                                var optionStyle2 =
                                    count2 > 0 ? 'class="font-colors-black-text"' : ' class="font-colors-gray-text" ';
                            }
                            //select the option that belogs to this product
                            if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                                var selected2 = " selected ";
                                var disVal2 = data[key]["dropdown"]["value2"][keyV2];
                                var selectAtr2 = dataAtr2; // data aribute for displayed value in second dropdown
                            } else {
                                var selected2 = "";
                            }
                            newBottomAccessories +=
                                "<option " +
                                optionStyle2 +
                                ' data-prodId="' +
                                dataAtr2 +
                                '" value="' +
                                data[key]["dropdown"]["value2"][keyV2] +
                                '" ' +
                                selected2 +
                                ">" +
                                data[key]["dropdown"]["value2"][keyV2] +
                                "</option>";
                        }
                        newBottomAccessories += "</select>";
                        newBottomAccessories += "</div>";
                        //newBottomAccessories += '</div>';
                    }
                }
                newBottomAccessories += "</div>";
            } else {
                newBottomAccessories += '<div class="bottom_acc_sub">';
                newBottomAccessories += '<div class="subscription_radio">';
                newBottomAccessories += data[key][0]["radio"];
                newBottomAccessories += "</div>";
                newBottomAccessories += '<div class="drop_block_subscription">';
                newBottomAccessories += data[key][0]["quality"];
                newBottomAccessories += data[key][0]["frequency"];
                newBottomAccessories += data[key][0]["quantity"];
                newBottomAccessories += "</div>";

                newBottomAccessories += '<div class="drop_block_not_subscription">';
                newBottomAccessories += data[key][0]["quality"];
                newBottomAccessories += '<div class="attributeswap" id="quantityDiv">';
                newBottomAccessories += '<div class="optTitle">Quantity</div>';

                // if product is in cart
                var disabledBtn =
                    incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1 ? "disable-btn" : "";
                newBottomAccessories += '<select class="attributemenu ' + disabledBtn + '" id="quantityDropdown">';
                for (var key2 in data["incart_all"]) {
                    if (key2.indexOf(data[key][0]["products_id"]) > -1 || key2 == data[key][0]["products_id"]) {
                        var qty = parseInt(data["incart_all"][key2]);
                        break;
                    } else {
                        var qty = 1;
                    }
                }
                for (var k = 1; k <= 5; k++) {
                    var selQty = qty == k ? "selected" : "";
                    newBottomAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                }

                newBottomAccessories += "</select>";
                newBottomAccessories += "</div>";
                newBottomAccessories = getSizeAndQualityNew(newBottomAccessories, data, key);

                newBottomAccessories += "</div>";
                newBottomAccessories += "</div>";
            }

            newBottomAccessories += '<div class="bottom_pr_bottom">';
            //if this production is not a subscription product
            if (data[key][0]["subscription_eligible"] == "0" || !data[key][0]["quantity"]) {
                newATCAccessories += '<div class="atc_drop_block">';
                //if first drop down exists
                if (data[key]["dropdown"]["value"] && Object.keys(data[key]["dropdown"]["value"]).length > 1) {
                    newATCAccessories += '<div class="atc_drop_set">';

                    newATCAccessories += "<span>" + data[key]["dropdown"]["name"] + "</span>";
                    newATCAccessories += '<select class="atc_drop_select dropdown group' + key + '">';

                    //if second drop down exists
                    if (data[key]["dropdown"]["value2"]) {
                        var tot1 = 0;
                        for (var keyV2 in data[key]["dropdown"]["value2"]) {
                            tot1++;
                        }
                        if (tot1 > 1) {
                            for (var keyV2 in data[key]["dropdown"]["value2"]) {
                                if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                                    //convert object to comma separated string for data attribute
                                    var dataAtr2 = Object.keys(
                                        data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]
                                    )
                                        .map(function (k) {
                                            return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                                        })
                                        .join(",");
                                }
                                //select the option that belongs to this product
                                if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                                    // data atribute for displayed value in second dropdown
                                    var selectAtr2 = dataAtr2;
                                }
                            }
                        }
                    }
                    var tot2 = 0;
                    for (var keyV in data[key]["dropdown"]["value"]) {
                        tot2++;
                        if (data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]]) {
                            var dataAtr = Object.keys(data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]])
                                .map(function (k) {
                                    return data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]][k];
                                })
                                .join(","); //convert object to comma separated string for data attribute
                        }
                        var optionStyle = 'class="font-colors-black-text"';
                        //select the option that belogs to this product
                        if (data[key]["dropdown"]["value"][keyV] == data[key][0]["attributes_value"]) {
                            var selected = " selected ";
                            var disVal = data[key]["dropdown"]["value"][keyV]; //displayed value in first dropdown
                            var selectAtr = dataAtr; //data atribute for displayed value in first dropdown
                        } else {
                            var selected = "";
                        }
                        //if dropdown2 exists
                        if (tot1 > 1) {
                            //find out which values from dropdown should be black and which should be gray
                            var checkArray = dataAtr.split(",");
                            var count1 = 0;
                            for (var ii = 0; ii < checkArray.length; ii++) {
                                if (selectAtr2.indexOf(checkArray[ii]) > -1) {
                                    count1++;
                                }
                            }
                            var optionStyle =
                                count1 > 0 ? 'class="font-colors-black-text"' : ' class="font-colors-gray-text" ';
                        } else {
                            var optionStyle = 'class="font-colors-black-text"';
                        }
                        newATCAccessories +=
                            "<option " +
                            optionStyle +
                            ' data-prodId="' +
                            dataAtr +
                            '" value="' +
                            data[key]["dropdown"]["value"][keyV] +
                            '" ' +
                            selected +
                            ">" +
                            data[key]["dropdown"]["value"][keyV] +
                            "</option>";
                    }
                    newATCAccessories += "</select>";
                    newATCAccessories += "</div>";
                }
                //if second drop down exists
                if (data[key]["dropdown"]["value2"]) {
                    var tot = 0;
                    for (var keyV2 in data[key]["dropdown"]["value2"]) {
                        tot++;
                    }
                    if (tot > 1) {
                        newATCAccessories += '<div class="atc_drop_set">';
                        newATCAccessories += "<span>" + data[key]["dropdown"]["name2"] + "</span>";
                        newATCAccessories += '<select class="atc_drop_select dropdown2 group' + key + '">';

                        for (var keyV2 in data[key]["dropdown"]["value2"]) {
                            if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                                var dataAtr2 = Object.keys(
                                    data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]
                                )
                                    .map(function (k) {
                                        return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                                    })
                                    .join(","); //convert object to comma separated string for data attribute
                                //find out which values from dropdown2 should be black and which should be gray
                                var checkArray2 = dataAtr2.split(",");
                                var count2 = 0;
                                for (var ii = 0; ii < checkArray2.length; ii++) {
                                    //if first dropdown exist
                                    if (tot2 > 1) {
                                        if (selectAtr.indexOf(checkArray2[ii]) > -1) {
                                            count2++;
                                        }
                                    } else {
                                        count2++;
                                    }
                                }
                                var optionStyle2 =
                                    count2 > 0 ? 'class="font-colors-black-text"' : ' class="font-colors-gray-text" ';
                            }
                            //select the option that belogs to this product
                            if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                                var selected2 = " selected ";
                                var disVal2 = data[key]["dropdown"]["value2"][keyV2];
                                var selectAtr2 = dataAtr2; // data aribute for displayed value in second dropdown
                            } else {
                                var selected2 = "";
                            }
                            newATCAccessories +=
                                "<option " +
                                optionStyle2 +
                                ' data-prodId="' +
                                dataAtr2 +
                                '" value="' +
                                data[key]["dropdown"]["value2"][keyV2] +
                                '" ' +
                                selected2 +
                                ">" +
                                data[key]["dropdown"]["value2"][keyV2] +
                                "</option>";
                        }
                        newATCAccessories += "</select>";
                        newATCAccessories += "</div>";
                    }
                }
                newATCAccessories += "</div>";
                newATCAccessories += '<div class="atc_cart_block">';
                newBottomAccessories += '<div class="bottom_cart_block">';
                newBottomAccessories += '<div class="bottom_pr_price_div" tabindex="0">';
                newBottomAccessories +=
                    '<div class="font-size-18 font-weight-bold mb-2">$' + data[key][0]["products_price"] + "</div>";
                if (
                    data[key][0]["stock_status"] != "Sold Out" &&
                    data[key][0]["stock_status"] != "Product Discontinued" &&
                    data[key][0]["stock_status"] != "Out of Stock" &&
                    data[key][0]["stock_status"] != "Comming Soon"
                ) {
                    newBottomAccessories += data[key][0]["stock_status"];
                }

                newBottomAccessories += "</div>";
                // if product is in cart
                var disabledBtn =
                    incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1 ? "disable-btn" : "";
                newATCAccessories += '<select style="display:none;" class="drop_qty ' + disabledBtn + '">';
                newBottomAccessories += '<select style="display:none;" class="drop_qty ' + disabledBtn + '">';
                for (var key2 in data["incart_all"]) {
                    if (key2.indexOf(data[key][0]["products_id"]) > -1 || key2 == data[key][0]["products_id"]) {
                        var qty = parseInt(data["incart_all"][key2]);
                        break;
                    } else {
                        var qty = 1;
                    }
                }
                for (var k = 1; k <= 5; k++) {
                    var selQty = qty == k ? "selected" : "";

                    newATCAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                    newBottomAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                }
                newATCAccessories += "</select>";
                newBottomAccessories += "</select>";

                //if product is in cart
                if (incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1) {
                    newATCAccessories +=
                        '<button class="atc_cart_btn_in atc_ac_btn" data-prodID="' + data[key][0]["products_id"] + '">';
                    newATCAccessories += "In Cart";
                    newATCAccessories += "</button>";
                    newBottomAccessories +=
                        '<button class="bottom_cart_btn_in bottom_ac_btn font-colors-gray-dark bg-colors-white-text" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    newBottomAccessories += "In Cart";
                    newBottomAccessories += "</button>";
                } else {
                    if (
                        data[key][0]["stock_status"] != "Sold Out" &&
                        data[key][0]["stock_status"] != "Product Discontinued" &&
                        data[key][0]["stock_status"] != "Out of Stock" &&
                        data[key][0]["stock_status"] != "Comming Soon"
                    ) {
                        newATCAccessories +=
                            '<button class="atc_cart_btn atc_ac_btn" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newATCAccessories += "Add To Cart";
                        newATCAccessories += "</button>";
                        newBottomAccessories +=
                            '<button class="bottom_cart_btn bottom_ac_btn font-colors-green-text bg-colors-white-text" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newBottomAccessories += "Add To Cart";
                        newBottomAccessories += "</button>";
                    } else {
                        newATCAccessories +=
                            '<button class="atc_cart_btn_out" data-prodID="' + data[key][0]["products_id"] + '">';
                        newATCAccessories += data[key][0]["stock_status"];
                        newATCAccessories += "</button>";
                        newBottomAccessories +=
                            '<button class="bottom_cart_btn_out bottom_ac_btn font-colors-red-dark bg-colors-white-text" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newBottomAccessories += data[key][0]["stock_status"];
                        newBottomAccessories += "</button>";
                    }
                }

                newATCAccessories += '<div class="atc_pr_price_div" tabindex="0">';
                newATCAccessories +=
                    '<div style="font-size:24px; font-weight:bold; margin-bottom:2px;" class="acc_pro_pric">$' +
                    data[key][0]["products_price"] +
                    "</div>";
                newATCAccessories += data[key][0]["stock_status"];
                newATCAccessories += "</div>";
                newATCAccessories + "</div>";
                newBottomAccessories + "</div>";
                newBottomAccessories += "</div>";
                newBottomAccessories += "</div>";
                if (data[key]["to_required"] == 1) {
                    required++;
                    const bottomAccessGroup = document.querySelector(".bottom_r_accessories .bottom_access_group");
                    if (bottomAccessGroup) {
                        bottomAccessGroup.insertAdjacentHTML("beforeend", newBottomAccessories);
                    }
                    const atcAcessGroup = document.querySelector(".atc_r_accessories .atc_access_group");
                    if (atcAcessGroup) {
                        atcAcessGroup.insertAdjacentHTML("beforeend", newATCAccessories);
                    }

                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (rselect < 2) {
                            rselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (rselect < 1) {
                            rselect = 1;
                        }
                    }
                } else {
                    const bottomAccessGroup = document.querySelector(".bottom_o_accessories .bottom_access_group");
                    if (bottomAccessGroup) {
                        bottomAccessGroup.insertAdjacentHTML("beforeend", newBottomAccessories);
                    }
                    const atcAcessGroup = document.querySelector(".atc_o_accessories .atc_access_group");
                    if (atcAcessGroup) {
                        atcAcessGroup.insertAdjacentHTML("beforeend", newATCAccessories);
                    }
                    optional++;
                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (oselect < 2) {
                            oselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (oselect < 1) {
                            oselect = 1;
                        }
                    }
                }
                tot = 0;
                tot1 = 0;
                tot2 = 0;
                newATCAccessories = "";
                newBottomAccessories = "";
            }
            //if this is a subscription product
            else {
                numSub++;
                subArr.push(data[key][0]["products_id"]);
                if (data[key][0]["radio"]) {
                    newATCAccessories += '<div class="subscription_radio">';
                    newATCAccessories += data[key][0]["radio"];
                    newATCAccessories += "</div>";
                }

                newATCAccessories += '<div class="drop_block_subscription">';
                newATCAccessories += data[key][0]["quality"];
                newATCAccessories += data[key][0]["frequency"];
                newATCAccessories += data[key][0]["quantity"];

                newATCAccessories += '<div class="atc_cart_block">';

                newBottomAccessories += '<div class="bottom_cart_block bottom_cart_sub">';
                //subscribe now button
                //if product is in cart
                newBottomAccessories += data[key][0]["price_block"];
                if (incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1) {
                    newATCAccessories +=
                        '<button class="atc_cart_btn_in atc_ac_btn" data-prodID="' + data[key][0]["products_id"] + '">';
                    newATCAccessories += "In Cart";
                    newATCAccessories += "</button>";

                    newBottomAccessories +=
                        '<button class="bottom_ac_btn bottom_cart_btn_in font-colors-gray-dark bg-colors-white-text" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    newBottomAccessories += "In Cart";
                    newBottomAccessories += "</button>";
                } else {
                    if (
                        data[key][0]["stock_status"] != "Sold Out" &&
                        data[key][0]["stock_status"] != "Product Discontinued" &&
                        data[key][0]["stock_status"] != "Out of Stock" &&
                        data[key][0]["stock_status"] != "Comming Soon"
                    ) {
                        newATCAccessories +=
                            '<button class="atc_cart_btn atc_ac_btn subButton" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newATCAccessories += "Subscribe Now";
                        newATCAccessories += "</button>";

                        newBottomAccessories +=
                            '<button class="bottom_cart_btn bottom_ac_btn font-colors-green-text bg-colors-white-text subButton" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newBottomAccessories += "Subscribe Now";
                        newBottomAccessories += "</button>";
                    } else {
                        newATCAccessories +=
                            '<button class="atc_cart_btn_out" data-prodID="' + data[key][0]["products_id"] + '">';
                        newATCAccessories += data[key][0]["stock_status"];
                        newATCAccessories += "</button>";
                        newBottomAccessories +=
                            '<button class="bottom_cart_btn_out bottom_ac_btn font-colors-red-dark bg-colors-white-text" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newBottomAccessories += data[key][0]["stock_status"];
                        newBottomAccessories += "</button>";
                    }
                }

                newATCAccessories += data[key][0]["price_block"];
                newATCAccessories += "</div>";
                newATCAccessories += "</div>";
                newBottomAccessories += "</div>";
                //newBottomAccessories += '</div>';

                newATCAccessories += '<div class="drop_block_not_subscription">';
                newATCAccessories += data[key][0]["quality"];
                newATCAccessories += '<div class="attributeswap" id="quantityDiv">';
                newATCAccessories += '<div class="optTitle">Quantity</div>';

                // if product is in cart
                var disabledBtn =
                    incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1 ? "disable-btn" : "";
                newATCAccessories += '<select class="attributemenu ' + disabledBtn + '" id="quantityDropdown">';
                for (var key2 in data["incart_all"]) {
                    if (key2.indexOf(data[key][0]["products_id"]) > -1 || key2 == data[key][0]["products_id"]) {
                        var qty = parseInt(data["incart_all"][key2]);
                        break;
                    } else {
                        var qty = 1;
                    }
                }
                for (var k = 1; k <= 5; k++) {
                    var selQty = qty == k ? "selected" : "";
                    newATCAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                }
                newATCAccessories += "</select>";
                newATCAccessories += "</div>";
                newATCAccessories = getSizeAndQualityNew(newATCAccessories, data, key);

                //if product is in cart
                if (incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1) {
                    //add to cart button and qty drop down
                    newATCAccessories += '<div class="atc_cart_block">';
                    newATCAccessories +=
                        '<button class="atc_cart_btn_in atc_ac_btn" data-prodID="' + data[key][0]["products_id"] + '">';
                    newATCAccessories += "In Cart";
                    newATCAccessories += "</button>";
                    newATCAccessories += '<div class="price_block" id="originalPrice">';
                    newATCAccessories += "<span class='acc_pro_pric'>$" + data[key][0]["products_price"] + "</span>";
                    newATCAccessories += data[key][0]["stock_status"];
                    newATCAccessories += "</div>";
                    newATCAccessories += "</div>";

                    newBottomAccessories += '<div class="bottom_cart_block bottom_cart_nosub">';

                    newBottomAccessories += '<div class="price_block" id="originalPrice">';
                    newBottomAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                    newBottomAccessories += data[key][0]["stock_status"];
                    newBottomAccessories += "</div>";
                    newBottomAccessories +=
                        '<button class="bottom_cart_btn_in bottom_ac_btn font-colors-gray-dark bg-colors-white-text" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    newBottomAccessories += "In Cart";
                    newBottomAccessories += "</button>";
                    newBottomAccessories += "</div>";
                } else {
                    if (
                        data[key][0]["stock_status"] != "Sold Out" &&
                        data[key][0]["stock_status"] != "Product Discontinued" &&
                        data[key][0]["stock_status"] != "Out of Stock" &&
                        data[key][0]["stock_status"] != "Comming Soon"
                    ) {
                        newATCAccessories += '<div class="atc_cart_block">';

                        newATCAccessories +=
                            '<button class="atc_cart_btn atc_ac_btn" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newATCAccessories += "Add To Cart";
                        newATCAccessories += "</button>";
                        newATCAccessories += '<div class="price_block">';
                        newATCAccessories +=
                            "<span class='acc_pro_pric'>$" + data[key][0]["products_price"] + "</span>";
                        newATCAccessories += data[key][0]["stock_status"];
                        newATCAccessories += "</div>";
                        newATCAccessories += "</div>";

                        newBottomAccessories += '<div class="bottom_cart_block bottom_cart_nosub">';

                        newBottomAccessories += '<div class="price_block">';
                        newBottomAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                        newBottomAccessories += data[key][0]["stock_status"];
                        newBottomAccessories += "</div>";
                        newBottomAccessories +=
                            '<button class="bottom_cart_btn bottom_ac_btn font-colors-green-text bg-colors-white-text" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newBottomAccessories += "Add To Cart";
                        newBottomAccessories += "</button>";
                        newBottomAccessories += "</div>";
                    } else {
                        newATCAccessories += '<div class="atc_cart_block">';

                        newATCAccessories +=
                            '<button class="atc_cart_btn_out" data-prodID="' + data[key][0]["products_id"] + '">';
                        newATCAccessories += data[key][0]["stock_status"];
                        newATCAccessories += "</button>";
                        newATCAccessories += "</div>";

                        newBottomAccessories += '<div class="bottom_cart_block bottom_cart_nosub">';
                        newBottomAccessories +=
                            '<button class="bottom_cart_btn_out bottom_ac_btn font-colors-red-dark bg-colors-white-text" data-prodID="' +
                            data[key][0]["products_id"] +
                            '">';
                        newBottomAccessories += data[key][0]["stock_status"];
                        newBottomAccessories += "</button>";
                        newBottomAccessories += "</div>";
                    }
                }
                newATCAccessories += "</div>";
                if (data[key]["to_required"] == 1) {
                    required++;
                    if (callFrom == "minicart" && accessoriesData.sub == 1) {
                    } else {
                        const bottomAccessGroup = document.querySelector(".bottom_r_accessories .bottom_access_group");
                        if (bottomAccessGroup) {
                            bottomAccessGroup.insertAdjacentHTML("beforeend", newBottomAccessories);
                        }
                        const atcAcessGroup = document.querySelector(".atc_r_accessories .atc_access_group");
                        if (atcAcessGroup) {
                            atcAcessGroup.insertAdjacentHTML("beforeend", newATCAccessories);
                        }
                    }
                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (rselect < 2) {
                            rselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (rselect < 1) {
                            rselect = 1;
                        }
                    }
                } else {
                    if (callFrom == "minicart" && accessoriesData.sub == 1) {
                    } else {
                        const bottomAccessGroup = document.querySelector(".bottom_o_accessories .bottom_access_group");
                        if (bottomAccessGroup) {
                            bottomAccessGroup.insertAdjacentHTML("beforeend", newBottomAccessories);
                        }
                        const atcAcessGroup = document.querySelector(".atc_o_accessories .atc_access_group");
                        if (atcAcessGroup) {
                            atcAcessGroup.insertAdjacentHTML("beforeend", newATCAccessories);
                        }
                    }
                    optional++;
                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (oselect < 2) {
                            oselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (oselect < 1) {
                            oselect = 1;
                        }
                    }
                }
                tot = 0;
                tot1 = 0;
                tot2 = 0;
                newATCAccessories = "";
                newBottomAccessories = "";
            }
            newATCAccessories += "</div>";
            newATCAccessories += "</div>";
            newBottomAccessories += "</div>";
            newBottomAccessories += "</div>";
        }
    }
    if (document.querySelector(".bottom_r_accessories")) {
        document.querySelector(".bottom_r_accessories").style.display = required > 0 ? "block" : "none";
    }
    if (document.querySelector(".bottom_o_accessories")) {
        document.querySelector(".bottom_o_accessories").style.display = optional > 0 ? "block" : "none";
    }
    if (document.querySelector(".atc_r_accessories")) {
        document.querySelector(".atc_r_accessories").style.display = required > 0 ? "block" : "none";
    }
    if (document.querySelector(".atc_o_accessories")) {
        document.querySelector(".atc_o_accessories").style.display = optional > 0 ? "block" : "none";
    }

    const atcRnumberCircles = Array.from(document.getElementsByClassName("atc_r_numberCircle"));
    const atcOnumberCircles = Array.from(document.getElementsByClassName("atc_o_numberCircle"));
    const bottomRnumberCircles = Array.from(document.getElementsByClassName("bottom_r_numberCircle"));
    const bottomOnumberCircles = Array.from(document.getElementsByClassName("bottom_o_numberCircle"));
    const requiredCircles = atcRnumberCircles.concat(bottomRnumberCircles);
    const optionalCircles = atcOnumberCircles.concat(bottomOnumberCircles);
    requiredCircles.forEach(function (element) {
        element.textContent = required;
    });
    optionalCircles.forEach(function (element) {
        element.textContent = optional;
    });

    const priceBlocks = Array.from(document.getElementsByClassName("price_block"));
    priceBlocks.forEach(function (priceBlock) {
        const children = Array.from(priceBlock.children);
        if (children.length > 1) {
            children[1].style.margin = "0px";
        }
    });
    if (required <= 0 && optional <= 0) {
        if (document.getElementById("cart_popup")) {
            document.getElementById("cart_popup").style.height = "100%";
        }
        if (document.getElementById("atc-pop")) {
            document.getElementById("atc-pop").style.height = "100%";
        }
        if (document.querySelector(".atc_accessories_container")) {
            document.querySelector(".atc_accessories_container").style.display = "none";
        }
        if (document.querySelector(".atc_bottom_atc_btn")) {
            document.querySelector(".atc_bottom_atc_btn").style.display = "none";
        }
        if (document.getElementById("atc_to_top")) {
            document.getElementById("atc_to_top").style.display = "none";
        }
        if (document.getElementById("accessoriesContainer")) {
            document.getElementById("accessoriesContainer").style.display = "none";
        }
        if (document.getElementById("bottomAccessoryBox")) {
            document.getElementById("bottomAccessoryBox").style.display = "none";
        }
    }
    return subArr;
}

function display_accessoriesACW(data, callFrom) {
    var showAccessories = "";
    var newATCAccessories = "";
    var subArr = new Array();
    const accessGroupR = document.querySelector(".bottom_r_accessories .bottom_access_group");
    const accessGroupO = document.querySelector(".bottom_o_accessories .bottom_access_group");
    const atcAccessGroupR = document.querySelector(".atc_r_accessories .atc_access_group");
    const atcAccessGroupO = document.querySelector(".atc_o_accessories .atc_access_group");
    if (accessGroupR) {
        accessGroupR.innerHTML = "";
    }
    if (accessGroupO) {
        accessGroupO.innerHTML = "";
    }
    if (atcAccessGroupR) {
        atcAccessGroupR.innerHTML = "";
    }
    if (atcAccessGroupO) {
        atcAccessGroupO.innerHTML = "";
    }
    var required = 0;
    var optional = 0;
    for (var key in data) {
        if (key != "incart" && key != "incart_all" && key != "all_prod_ids") {
            //Trademark symbol
            if (data[key][0]["products_name"].match("&amp;trade;")) {
                data[key][0]["products_name"] = data[key][0]["products_name"].replace("&amp;trade;", "&#174");
            }
            showAccessories +=
                '<div class="bottom_pr_set p' +
                data[key][0]["products_id"] +
                '" data-prodID="' +
                data[key][0]["products_id"] +
                '" data-group="' +
                key +
                '">';
            showAccessories += '<div class="bottom_img_block">';
            showAccessories +=
                '<a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '"><img data-src="/products-image/280/' +
                data[key][0]["products_bimage"] +
                '" alt="' +
                data[key][0]["products_name"] +
                '" class="lazy PED_placeholder"></a>';
            showAccessories += "</div>";
            showAccessories += '<div class="bottom_accessories_right">';
            showAccessories += '<div class="top_block">';
            showAccessories += '<div class="bottom_pr_name">';
            showAccessories +=
                '<a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '">' +
                data[key][0]["products_name"] +
                "</a>";
            showAccessories += "</div>";
            showAccessories += '<div class="price_block bottom_pr_price_div" id="originalPrice">';
            showAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
            showAccessories += data[key][0]["stock_status"];
            showAccessories += "</div>";

            //new atc showAccessories

            newATCAccessories +=
                '<div class="atc_pr_set p' +
                data[key][0]["products_id"] +
                '" data-prodID="' +
                data[key][0]["products_id"] +
                '" data-group="' +
                key +
                '">';
            newATCAccessories += '<div class="atc_pr_set_top">';
            newATCAccessories +=
                '<div class="atc_img_block"><a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '"><img width="60px" height="60px" src="/products-image/280/' +
                data[key][0]["products_bimage"] +
                '" alt="' +
                data[key][0]["products_name"] +
                '"></a></div>';
            newATCAccessories += '<div class="atc_pr_product_desctiption">';
            newATCAccessories += '<div class="atc_pr_name">';
            newATCAccessories +=
                '<a href="' +
                data[key][0]["prod_link"] +
                '" title="' +
                data[key][0]["products_name"] +
                '">' +
                data[key][0]["products_name"] +
                "</a>";
            newATCAccessories += "</div>";
            newATCAccessories += '<div class="atc_pr_model" tabindex="0">';
            newATCAccessories += "<span>Model: " + data[key][0]["products_model"] + "</span>";
            newATCAccessories += "</div>";
            newATCAccessories += "</div>";
            newATCAccessories += "</div>";
            newATCAccessories += '<div class="atc_pr_bottom">';
            //subscription price
            if (data[key][0]["subscription_eligible"] == "1" && data[key][0]["quantity"]) {
                showAccessories += data[key][0]["price_block"];
            }
            // end subscription price and button
            showAccessories += "</div>";
            showAccessories += '<div class="bottom_block">';
            //if this production is not a subscription product
            if (data[key][0]["subscription_eligible"] == "0" || !data[key][0]["quantity"]) {
                showAccessories += '<div class="bottom_pr_model">';
                showAccessories += "<span>Model: " + data[key][0]["products_model"] + "</span>";
                showAccessories += "</div>";
                showAccessories += '<div class="bottom_drop_block">';
                newATCAccessories += '<div class="atc_drop_block">';
                //if first drop down exists
                if (data[key]["dropdown"]["value"] && Object.keys(data[key]["dropdown"]["value"]).length > 1) {
                    showAccessories += '<div class="drop_set">';
                    newATCAccessories += '<div class="atc_drop_set">';
                    showAccessories += "<span>" + data[key]["dropdown"]["name"] + "</span>";
                    showAccessories +=
                        '<select aria-label="' +
                        data[key]["dropdown"]["name"] +
                        '" class="bottom_drop_select dropdown group' +
                        key +
                        '">';
                    newATCAccessories += "<span>" + data[key]["dropdown"]["name"] + "</span>";
                    newATCAccessories +=
                        '<select aria-label="' +
                        data[key]["dropdown"]["name"] +
                        '" class="atc_drop_select dropdown group' +
                        key +
                        '">';
                    //if second drop down exists
                    if (data[key]["dropdown"]["value2"]) {
                        var tot1 = 0;
                        for (var keyV2 in data[key]["dropdown"]["value2"]) {
                            tot1++;
                        }
                        if (tot1 > 1) {
                            for (var keyV2 in data[key]["dropdown"]["value2"]) {
                                if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                                    //convert object to comma separated string for data attribute
                                    var dataAtr2 = Object.keys(
                                        data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]
                                    )
                                        .map(function (k) {
                                            return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                                        })
                                        .join(",");
                                }
                                //select the option that belongs to this product
                                if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                                    // data atribute for displayed value in second dropdown
                                    var selectAtr2 = dataAtr2;
                                }
                            }
                        }
                    }
                    var tot2 = 0;
                    for (var keyV in data[key]["dropdown"]["value"]) {
                        tot2++;
                        if (data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]]) {
                            var dataAtr = Object.keys(data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]])
                                .map(function (k) {
                                    return data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]][k];
                                })
                                .join(","); //convert object to comma separated string for data attribute
                        }
                        var optionStyle = 'style="color:#000;"';
                        //select the option that belogs to this product
                        if (data[key]["dropdown"]["value"][keyV] == data[key][0]["attributes_value"]) {
                            var selected = " selected ";
                            var disVal = data[key]["dropdown"]["value"][keyV]; //displayed value in first dropdown
                            var selectAtr = dataAtr; //data atribute for displayed value in first dropdown
                        } else {
                            var selected = "";
                        }
                        //if dropdown2 exists
                        if (tot1 > 1) {
                            //find out which values from dropdown should be black and which should be gray
                            var checkArray = dataAtr.split(",");
                            var count1 = 0;
                            for (var ii = 0; ii < checkArray.length; ii++) {
                                if (selectAtr2.indexOf(checkArray[ii]) > -1) {
                                    count1++;
                                }
                            }
                            var optionStyle = count1 > 0 ? 'style="color:#000;"' : ' style="color:#CCC;" ';
                        } else {
                            var optionStyle = 'style="color:#000;"';
                        }
                        showAccessories +=
                            "<option " +
                            optionStyle +
                            ' data-prodId="' +
                            dataAtr +
                            '" value="' +
                            data[key]["dropdown"]["value"][keyV] +
                            '" ' +
                            selected +
                            ">" +
                            data[key]["dropdown"]["value"][keyV] +
                            "</option>";
                        newATCAccessories +=
                            "<option " +
                            optionStyle +
                            ' data-prodId="' +
                            dataAtr +
                            '" value="' +
                            data[key]["dropdown"]["value"][keyV] +
                            '" ' +
                            selected +
                            ">" +
                            data[key]["dropdown"]["value"][keyV] +
                            "</option>";
                    }
                    newATCAccessories += "</select>";
                    newATCAccessories += "</div>";
                    showAccessories += "</select>";
                    showAccessories += "</div>";
                }
                //if second drop down exists
                if (data[key]["dropdown"]["value2"]) {
                    var tot = 0;
                    for (var keyV2 in data[key]["dropdown"]["value2"]) {
                        tot++;
                    }
                    if (tot > 1) {
                        showAccessories += '<div class="drop_set">';
                        showAccessories += "<span>" + data[key]["dropdown"]["name2"] + "</span>";
                        showAccessories +=
                            '<select aria-label="' +
                            data[key]["dropdown"]["name2"] +
                            '" class="bottom_drop_select dropdown2 group' +
                            key +
                            '">';
                        newATCAccessories += '<div class="atc_drop_set">';
                        newATCAccessories += "<span>" + data[key]["dropdown"]["name2"] + "</span>";
                        newATCAccessories +=
                            '<select aria-label="' +
                            data[key]["dropdown"]["name2"] +
                            '" class="atc_drop_select dropdown2 group' +
                            key +
                            '">';
                        for (var keyV2 in data[key]["dropdown"]["value2"]) {
                            if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                                var dataAtr2 = Object.keys(
                                    data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]
                                )
                                    .map(function (k) {
                                        return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                                    })
                                    .join(","); //convert object to comma separated string for data attribute
                                //find out which values from dropdown2 should be black and which should be gray
                                var checkArray2 = dataAtr2.split(",");
                                var count2 = 0;
                                for (var ii = 0; ii < checkArray2.length; ii++) {
                                    //if first dropdown exist
                                    if (tot2 > 1) {
                                        if (selectAtr.indexOf(checkArray2[ii]) > -1) {
                                            count2++;
                                        }
                                    } else {
                                        count2++;
                                    }
                                }
                                var optionStyle2 = count2 > 0 ? 'style="color:#000;"' : ' style="color:#CCC;" ';
                            }
                            //select the option that belogs to this product
                            if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                                var selected2 = " selected ";
                                var disVal2 = data[key]["dropdown"]["value2"][keyV2];
                                var selectAtr2 = dataAtr2; // data aribute for displayed value in second dropdown
                            } else {
                                var selected2 = "";
                            }
                            showAccessories +=
                                "<option " +
                                optionStyle2 +
                                ' data-prodId="' +
                                dataAtr2 +
                                '" value="' +
                                data[key]["dropdown"]["value2"][keyV2] +
                                '" ' +
                                selected2 +
                                ">" +
                                data[key]["dropdown"]["value2"][keyV2] +
                                "</option>";
                            newATCAccessories +=
                                "<option " +
                                optionStyle2 +
                                ' data-prodId="' +
                                dataAtr2 +
                                '" value="' +
                                data[key]["dropdown"]["value2"][keyV2] +
                                '" ' +
                                selected2 +
                                ">" +
                                data[key]["dropdown"]["value2"][keyV2] +
                                "</option>";
                        }
                        showAccessories += "</select>";
                        showAccessories += "</div>";
                        newATCAccessories += "</select>";
                        newATCAccessories += "</div>";
                    }
                }
                newATCAccessories += "</div>";
                showAccessories += "</div>";
                showAccessories += '<div class="bottom_cart_block">';
                newATCAccessories += '<div class="atc_cart_block">';
                showAccessories += '<div class="cart_qty">';
                showAccessories += "<span>Qty</span>";
                // if product is in cart
                var disabledBtn =
                    incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1 ? "disable-btn" : "";
                showAccessories +=
                    '                    <select class="drop_qty ' + disabledBtn + '" aria-label="Select Quantity">';
                newATCAccessories +=
                    '<select style="display:none;" class="drop_qty ' + disabledBtn + '" aria-label="Select Quantity">';
                for (var key2 in data["incart_all"]) {
                    if (key2.indexOf(data[key][0]["products_id"]) > -1 || key2 == data[key][0]["products_id"]) {
                        var qty = parseInt(data["incart_all"][key2]);
                        break;
                    } else {
                        var qty = 1;
                    }
                }
                for (var k = 1; k <= 5; k++) {
                    var selQty = qty == k ? "selected" : "";

                    showAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                    newATCAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                }
                showAccessories += "</select>";
                newATCAccessories += "</select>";
                showAccessories += "</div>";
                showAccessories += '<div class="price_block">';
                showAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                showAccessories += data[key][0]["stock_status"];
                showAccessories += "</div>";

                //if product is in cart
                if (incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1) {
                    showAccessories +=
                        '<div class="bottom_cart_btn_in bottom_ac_btn darkbutton" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">In Cart</div>';
                    newATCAccessories +=
                        '<button class="atc_cart_btn_in atc_ac_btn" data-prodID="' + data[key][0]["products_id"] + '">';
                    newATCAccessories += "In Cart";
                    newATCAccessories += "</button>";
                } else {
                    showAccessories +=
                        '<div class="bottom_cart_btn bottom_ac_btn darkbutton" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    showAccessories += "<span>Add To Cart</span>";
                    showAccessories += "</div>";
                    newATCAccessories +=
                        '<button class="atc_cart_btn_acw atc_ac_btn" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    newATCAccessories += "Add To Cart";
                    newATCAccessories += "</button>";
                }
                showAccessories += "</div>";

                newATCAccessories += '<div class="atc_pr_price_div">';
                newATCAccessories +=
                    '<div style="font-size:24px; font-weight:bold; margin-bottom:2px;" class="acc_pro_pric" tabindex="0">$' +
                    data[key][0]["products_price"] +
                    "</div>";
                newATCAccessories += data[key][0]["stock_status"];
                newATCAccessories += "</div>";
                newATCAccessories + "</div>";
                if (data[key]["to_required"] == 1) {
                    required++;
                    if (accessGroupR) {
                        accessGroupR.insertAdjacentHTML("beforeend", showAccessories);
                    }
                    if (atcAccessGroupR) {
                        atcAccessGroupR.insertAdjacentHTML("beforeend", newATCAccessories);
                    }

                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (rselect < 2) {
                            rselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (rselect < 1) {
                            rselect = 1;
                        }
                    }
                } else {
                    if (accessGroupO) {
                        accessGroupO.insertAdjacentHTML("beforeend", showAccessories);
                    }
                    if (atcAccessGroupO) {
                        atcAccessGroupO.insertAdjacentHTML("beforeend", newATCAccessories);
                    }
                    optional++;
                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (oselect < 2) {
                            oselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (oselect < 1) {
                            oselect = 1;
                        }
                    }
                }
                tot = 0;
                tot1 = 0;
                tot2 = 0;
                showAccessories = "";
                newATCAccessories = "";
            }
            //if this is a subscription product
            else {
                numSub++;
                subArr.push(data[key][0]["products_id"]);
                showAccessories += '<div class="bottom_pr_model" style=" width: 790px;">';
                showAccessories += "<span>Model: " + data[key][0]["products_model"] + "</span>";
                showAccessories += "</div>";
                if (data[key][0]["radio"]) {
                    showAccessories += '<div class="subscription_radio">';
                    showAccessories += data[key][0]["radio"];
                    showAccessories += "</div>";
                    newATCAccessories += '<div class="subscription_radio">';
                    newATCAccessories += data[key][0]["radio"];
                    newATCAccessories += "</div>";
                }
                showAccessories += '<div class="drop_block_subscription">';
                showAccessories += data[key][0]["quality"];
                showAccessories += data[key][0]["frequency"];
                showAccessories += data[key][0]["quantity"];

                newATCAccessories += '<div class="drop_block_subscription">';
                newATCAccessories += data[key][0]["quality"];
                newATCAccessories += data[key][0]["frequency"];
                newATCAccessories += data[key][0]["quantity"];

                newATCAccessories += '<div class="atc_cart_block">';
                //subscribe now button
                //if product is in cart
                if (incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1) {
                    showAccessories += '<div class="bottom_cart_block">';
                    showAccessories += data[key][0]["price_block"];
                    showAccessories +=
                        '<div class="bottom_cart_btn_in bottom_ac_btn subButton darkbutton" style="display:none;" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">In Cart</div>';
                    showAccessories += "</div>";

                    newATCAccessories +=
                        '<button class="atc_cart_btn_in atc_ac_btn" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">In Cart';
                    newATCAccessories += "</div>";
                } else {
                    showAccessories += '<div class="bottom_cart_block">';
                    showAccessories += data[key][0]["price_block"];
                    showAccessories +=
                        '<div class="bottom_cart_btn bottom_ac_btn darkbutton subButton" style= "display:none;" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    showAccessories += '<span style="padding-left:4px;">Subscribe Now</span>';
                    showAccessories += "</div>";
                    showAccessories += "</div>";

                    newATCAccessories +=
                        '<button class="atc_cart_btn_acw atc_ac_btn subButton" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    newATCAccessories += "Subscribe Now";
                    newATCAccessories += "</button>";
                }

                newATCAccessories += data[key][0]["price_block"];
                newATCAccessories += "</div>";
                newATCAccessories += "</div>";
                showAccessories += "</div>";
                showAccessories += '<div class="drop_block_not_subscription">';
                showAccessories += data[key][0]["quality"];
                showAccessories += '<div class="attributeswap" id="quantityDiv">';
                showAccessories += '<div class="optTitle">Quantity</div>';

                newATCAccessories += '<div class="drop_block_not_subscription">';
                newATCAccessories += data[key][0]["quality"];
                newATCAccessories += '<div class="attributeswap" id="quantityDiv">';
                newATCAccessories += '<div class="optTitle">Quantity</div>';
                // if product is in cart
                var disabledBtn =
                    incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1 ? "disable-btn" : "";
                showAccessories +=
                    '                    <select class="attributemenu ' + disabledBtn + '" id="quantityDropdown">';
                newATCAccessories += '<select class="attributemenu ' + disabledBtn + '" id="quantityDropdown">';
                for (var key2 in data["incart_all"]) {
                    if (key2.indexOf(data[key][0]["products_id"]) > -1 || key2 == data[key][0]["products_id"]) {
                        var qty = parseInt(data["incart_all"][key2]);
                        break;
                    } else {
                        var qty = 1;
                    }
                }
                for (var k = 1; k <= 5; k++) {
                    var selQty = qty == k ? "selected" : "";
                    showAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                    newATCAccessories += '<option value="' + k + '" ' + selQty + ">" + k + "</option>";
                }
                showAccessories += "</select>";
                showAccessories += "</div>";
                showAccessories = getSizeAndQualityNew(showAccessories, data, key);

                newATCAccessories += "</select>";
                newATCAccessories += "</div>";
                newATCAccessories = getSizeAndQualityNew(newATCAccessories, data, key);
                //if product is in cart
                if (incartArray["incart"].indexOf(data[key][0]["products_id"].toString()) > -1) {
                    //add to cart button and qty drop down
                    showAccessories += '<div class="bottom_cart_block">';
                    showAccessories += '<div class="price_block">';
                    showAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                    showAccessories += data[key][0]["stock_status"];
                    showAccessories += "</div>";
                    showAccessories +=
                        '<div class="bottom_cart_btn_in bottom_ac_btn darkbutton" style= "margin-top:25px;" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">In Cart</div>';
                    showAccessories += "</div>";

                    newATCAccessories += '<div class="atc_cart_block">';
                    newATCAccessories +=
                        '<button class="atc_cart_btn_in atc_ac_btn" data-prodID="' + data[key][0]["products_id"] + '">';
                    newATCAccessories += "In Cart";
                    newATCAccessories += "</button>";
                    newATCAccessories += '<div class="price_block" id="originalPrice">';
                    newATCAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                    newATCAccessories += data[key][0]["stock_status"];
                    newATCAccessories += "</div>";
                    newATCAccessories += "</div>";
                } else {
                    showAccessories += '<div class="bottom_cart_block">';
                    showAccessories += '<div class="price_block" id="originalPrice">';
                    showAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                    showAccessories += data[key][0]["stock_status"];
                    showAccessories += "</div>";
                    showAccessories +=
                        '<button class="bottom_cart_btn bottom_ac_btn darkbutton" style= "margin-top:25px;" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    showAccessories += "Add To Cart";
                    showAccessories += "</button>";
                    showAccessories += "</div>";

                    newATCAccessories += '<div class="atc_cart_block">';

                    newATCAccessories +=
                        '<button class="atc_cart_btn_acw atc_ac_btn" data-prodID="' +
                        data[key][0]["products_id"] +
                        '">';
                    newATCAccessories += "Add To Cart";
                    newATCAccessories += "</button>";
                    newATCAccessories += '<div class="price_block">';
                    newATCAccessories += "<span>$" + data[key][0]["products_price"] + "</span>";
                    newATCAccessories += data[key][0]["stock_status"];
                    newATCAccessories += "</div>";
                    newATCAccessories += "</div>";
                }
                showAccessories += "</div>";
                newATCAccessories += "</div>";
                if (data[key]["to_required"] == 1) {
                    required++;
                    if (callFrom == "minicart" && accessoriesData.sub == 1) {
                    } else {
                        if (accessGroupR) {
                            accessGroupR.insertAdjacentHTML("beforeend", showAccessories);
                        }
                        if (atcAccessGroupR) {
                            atcAccessGroupR.insertAdjacentHTML("beforeend", newATCAccessories);
                        }
                    }
                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (rselect < 2) {
                            rselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (rselect < 1) {
                            rselect = 1;
                        }
                    }
                } else {
                    if (callFrom == "minicart" && accessoriesData.sub == 1) {
                    } else {
                        if (accessGroupO) {
                            accessGroupO.insertAdjacentHTML("beforeend", showAccessories);
                        }
                        if (atcAccessGroupO) {
                            atcAccessGroupO.insertAdjacentHTML("beforeend", newATCAccessories);
                        }
                    }
                    optional++;
                    if (data[key]["select1"] == 1 && data[key]["select2"] == 1) {
                        if (oselect < 2) {
                            oselect = 2;
                        }
                    }
                    if (data[key]["select1"] == 1 || data[key]["select2"] == 1) {
                        if (oselect < 1) {
                            oselect = 1;
                        }
                    }
                }
                tot = 0;
                tot1 = 0;
                tot2 = 0;
                showAccessories = "";
                newATCAccessories = "";
            }
            newATCAccessories += "</div>";
            newATCAccessories += "</div>";
            showAccessories += "</div>";
            showAccessories += "</div>";
            showAccessories += "</div>";
        }
    }

    const allAccessories = document.querySelector(".bottom_all_accessories");
    if ("helpers" in window && allAccessories) helpers.lazyLoad(allAccessories);

    const rAccessories = document.querySelector(".bottom_r_accessories");
    const oAccessories = document.querySelector(".bottom_o_accessories");
    const atcAccessoriesR = document.querySelector(".atc_r_accessories");
    const atcAccessoriesO = document.querySelector(".atc_o_accessories");
    if (rAccessories) {
        rAccessories.style.display = required > 0 ? "block" : "none";
    }
    if (oAccessories) {
        oAccessories.style.display = optional > 0 ? "block" : "none";
    }
    if (atcAccessoriesR) {
        atcAccessoriesR.style.display = required > 0 ? "block" : "none";
    }
    if (atcAccessoriesO) {
        atcAccessoriesO.style.display = optional > 0 ? "block" : "none";
    }

    const acwAtcRnumberCircle = document.querySelector(".atc_r_numberCircle_acw");
    const acwAtcOnumberCircle = document.querySelector(".atc_o_numberCircle_acw");
    if (acwAtcRnumberCircle) {
        acwAtcRnumberCircle.textContent = required;
    }
    if (acwAtcOnumberCircle) {
        acwAtcOnumberCircle.textContent = optional;
    }

    if (required <= 0 && optional <= 0) {
        const cartPopup = document.getElementById("cart_popup");
        const atcPop = document.getElementById("atc-pop");
        const atcBottomBtn = document.querySelector(".atc_bottom_atc_btn");
        const atcTopTop = document.getElementById("atc_to_top");
        if (cartPopup) {
            cartPopup.style.height = "100%";
        }
        if (atcPop) {
            atcPop.style.height = "100%";
        }
        if (atcBottomBtn) {
            atcBottomBtn.style.display = "none";
        }
        if (atcTopTop) {
            atcTopTop.style.display = "none";
        }
    }
    return subArr;
}

//subscription on radio button change function
function onRadioChangeATC(id) {
    var price = document.querySelector(".atc_all_accessories .p" + id + " .radioField").dataset.price;
    var checked = document.querySelector(".atc_all_accessories .p" + id + " input[name=subscription]:checked");
    var subscription = checked.value;
    if (subscription == "no") {
        const stockText = document.querySelector("#cart_popup .p" + id + "  #originalPrice .stockText");
        if (stockText) {
            stockText.style.margin = "0";
        }
        //product page & minicart pop up
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription").style.display =
                "block";
        }
        if (document.querySelector("#cart_popup .p" + id + " .drop_block_not_subscription")) {
            document.querySelector("#cart_popup .p" + id + " .drop_block_not_subscription").style.display = "block";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription").style.display =
                "none";
        }
        if (document.querySelector("#cart_popup .p" + id + " .drop_block_subscription")) {
            document.querySelector("#cart_popup .p" + id + " .drop_block_subscription").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .price_block span")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .price_block span").textContent = "$" + price;
        }
        if (document.querySelector("#cart_popup .p" + id + " .price_block span")) {
            document.querySelector("#cart_popup .p" + id + " .price_block span").textContent = "$" + price;
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .stockText")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .stockText").textContent = "In-Stock";
        }
        if (document.querySelector("#cart_popup .p" + id + " .stockText")) {
            document.querySelector("#cart_popup .p" + id + " .stockText").textContent = "In-Stock";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice")) {
            document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice").style.display = "block";
        }
        if (document.querySelector("#cart_popup .p" + id + " #originalPrice")) {
            document.querySelector("#cart_popup .p" + id + " #originalPrice").style.display = "block";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " #subPrice")) {
            document.querySelector(".bottom_all_accessories .p" + id + " #subPrice").style.display = "none";
        }
        if (document.querySelector("#cart_popup .p" + id + " #subPrice")) {
            document.querySelector("#cart_popup .p" + id + " #subPrice").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .subButton")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .subButton").style.display = "none";
        }
        if (document.querySelector("#cart_popup .p" + id + " .subButton")) {
            document.querySelector("#cart_popup .p" + id + " .subButton").style.display = "none";
        }
    } else if (subscription == "yes") {
        const stockText = document.querySelector("#cart_popup .p" + id + " #subPrice .stockText");
        if (stockText) {
            stockText.style.margin = "0";
        }
        //product page & minicart pop up
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription").style.display =
                "none";
        }
        if (document.querySelector("#cart_popup .p" + id + " .drop_block_not_subscription")) {
            document.querySelector("#cart_popup .p" + id + " .drop_block_not_subscription").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice")) {
            document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice").style.display = "none";
        }
        if (document.querySelector("#cart_popup .p" + id + " #originalPrice")) {
            document.querySelector("#cart_popup .p" + id + " #originalPrice").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .top_block #subPrice")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .top_block #subPrice").style.display = "block";
        }
        if (document.querySelector("#cart_popup .p" + id + " #subPrice")) {
            document.querySelector("#cart_popup .p" + id + " #subPrice").style.display = "block";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription").style.display =
                "block";
        }
        if (document.querySelector("#cart_popup .p" + id + " .drop_block_subscription")) {
            document.querySelector("#cart_popup .p" + id + " .drop_block_subscription").style.display = "block";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .subButton")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .subButton").style.display = "block";
        }
        if (document.querySelector("#cart_popup .p" + id + " .subButton")) {
            document.querySelector("#cart_popup .p" + id + " .subButton").style.display = "block";
        }
    }
    if (window.matchMedia("(max-width: 736px)").matches) {
        document.querySelector(".bottom_all_accessories .p" + id + " #subPrice").style.display = "block";
        document.querySelector("#cart_popup .p" + id + " #subPrice").style.display = "block";
    }

    //price block change
    const rcCheckedOption = document.querySelector(
        ".bottom_all_accessories .p" + id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
    );
    var priceText;
    var quantity;
    if (rcCheckedOption) {
        priceText = rcCheckedOption.textContent;
        quantity = rcCheckedOption.value;
    }

    if (!priceText) {
        var priceText = document.querySelector(
            "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
        ).textContent;
        var quantity = document.querySelector(
            "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
        ).value;
    }

    var temp = priceText.split("/");
    var price = temp[0].substr(temp[0].lastIndexOf("$") + 1, temp[0].length);
    var finalPrice = (price * quantity).toFixed(2);
    const rcSubPrice = document.querySelector(".bottom_all_accessories .p" + id + " #subPrice span");
    const cpSubPrice = document.querySelector("#cart_popup .p" + id + " #subPrice span");
    if (rcSubPrice) {
        rcSubPrice.textContent = "$" + finalPrice;
    }
    if (cpSubPrice) {
        cpSubPrice.textContent = "$" + finalPrice;
    }

    const rcAttChecked = document.querySelector(
        ".bottom_all_accessories .p" + id + " #frequencyDiv .attributemenu option:checked"
    );
    const cpAttChecked = document.querySelector("#cart_popup .p" + id + " #frequencyDiv .attributemenu option:checked");
    var frequencySelected1;
    var frequencySelected2;
    if (rcAttChecked) {
        frequencySelected1 = rcAttChecked.value;
    }
    if (cpAttChecked) {
        frequencySelected2 = cpAttChecked.value;
    }

    const rcStockText = document.querySelector(".bottom_all_accessories .p" + id + " #subPrice .stockText");
    const cpStockText = document.querySelector("#cart_popup .p" + id + " #subPrice .stockText");
    if (frequencySelected1 == 1 || frequencySelected2 == 1) {
        if (rcStockText) {
            rcStockText.textContent = "Every month";
        }
        if (cpStockText) {
            cpStockText.textContent = "Every month";
        }
    } else {
        if (rcStockText) {
            rcStockText.textContent = "Every " + frequencySelected1 + " months";
        }
        if (cpStockText) {
            cpStockText.textContent = "Every " + frequencySelected1 + " months";
        }
    }
}

function onRadioChangeBottom(id) {
    var price = document.querySelector(".bottom_all_accessories .p" + id + " .radioField").dataset.price;
    var checked = document.querySelector(".bottom_all_accessories .p" + id + " input[name=subscription]:checked");
    var subscription = checked.value;
    if (subscription == "no") {
        //product page & minicart pop up
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription").style.display =
                "flex";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_sub")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_sub").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_nosub")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_nosub").style.display = "flex";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription").style.display =
                "none";
        }

        if (document.querySelector(".bottom_all_accessories .p" + id + " .stockText")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .stockText").textContent = "In-Stock";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice")) {
            document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice").style.display = "block";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " #subPrice ")) {
            document.querySelector(".bottom_all_accessories .p" + id + " #subPrice ").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .subButton")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .subButton").style.display = "none";
        }
    } else if (subscription == "yes") {
        //product page & minicart pop up
        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_not_subscription").style.display =
                "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_sub")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_sub").style.display = "flex";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_nosub")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .bottom_cart_nosub").style.display = "none";
        }

        if (document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .drop_block_subscription").style.display =
                "flex";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .stockText")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .stockText").textContent = "In-Stock";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice")) {
            document.querySelector(".bottom_all_accessories .p" + id + " #originalPrice").style.display = "none";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .bottom_pr_bottom #subPrice ")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .bottom_pr_bottom #subPrice ").style.display =
                "block";
        }
        if (document.querySelector(".bottom_all_accessories .p" + id + " .subButton")) {
            document.querySelector(".bottom_all_accessories .p" + id + " .subButton").style.display = "block";
        }
        if (window.matchMedia("(max-width: 736px)").matches) {
            if (document.querySelector(".bottom_all_accessories .p" + id + " #subPrice ")) {
                document.querySelector(".bottom_all_accessories .p" + id + " #subPrice ").style.display = "block";
            }
        }
    }
    if (document.querySelector(".bottom_all_accessories .p" + id + " .price_block span")) {
        document.querySelector(".bottom_all_accessories .p" + id + " .price_block span").textContent = "$" + price;
    }

    //price block change
    const rcCheckedOption = document.querySelector(
        ".bottom_all_accessories .p" + id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
    );
    var priceText;
    var quantity;
    if (rcCheckedOption) {
        priceText = rcCheckedOption.textContent;
        quantity = rcCheckedOption.value;
    }
    if (!priceText) {
        priceText = document.querySelector(
            "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
        ).textContent;
        quantity = document.querySelector(
            "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
        ).value;
    }

    var temp = priceText.split("/");
    var price = temp[0].substr(temp[0].lastIndexOf("$") + 1, temp[0].length);
    var finalPrice = (price * quantity).toFixed(2);
    const rcSubPrice = document.querySelector(".bottom_all_accessories .p" + id + " #subPrice span");
    const cpSubPrice = document.querySelector("#cart_popup .p" + id + " #subPrice span");
    if (rcSubPrice) {
        rcSubPrice.textContent = "$" + finalPrice;
    }
    if (cpSubPrice) {
        cpSubPrice.textContent = "$" + finalPrice;
    }

    const rcAttChecked = document.querySelector(
        ".bottom_all_accessories .p" + id + " #frequencyDiv .attributemenu option:checked"
    );
    const cpAttChecked = document.querySelector("#cart_popup .p" + id + " #frequencyDiv .attributemenu option:checked");
    var frequencySelected1;
    var frequencySelected2;
    if (rcAttChecked) {
        frequencySelected1 = rcAttChecked.value;
    }
    if (cpAttChecked) {
        frequencySelected2 = cpAttChecked.value;
    }

    const rcStockText = document.querySelector(".bottom_all_accessories .p" + id + " #subPrice .stockText");
    const cpStockText = document.querySelector("#cart_popup .p" + id + " #subPrice .stockText");
    if (frequencySelected1 == 1 || frequencySelected2 == 1) {
        if (rcStockText) {
            rcStockText.textContent = "Every month";
        }
        if (cpStockText) {
            cpStockText.textContent = "Every month";
        }
    } else {
        if (rcStockText) {
            rcStockText.textContent = "Every " + frequencySelected1 + " months";
        }
        if (cpStockText) {
            cpStockText.textContent = "Every " + frequencySelected1 + " months";
        }
    }
}

function setAttribute(data) {
    //set radioField
    for (var key in data) {
        if (data[key][0]["subscription_eligible"] == "1" && data[key][0]["quantity"]) {
            //set pop up
            var id = data[key][0]["products_id"];
            var qty_dropdown = data[key][0]["qty_dropdown"];
            var frequency_options = data[key][0]["frequency_options"];
            var price = data[key][0]["products_price"];
            var short_name = data[key][0]["working_name_short"];
            var cart_popup = document.getElementById("cart_popup");
            //frequency drop down set up
            if (frequency_options != null && frequency_options != "") {
                var frequencyArray = frequency_options.split("");
                const cpFrequencyDivAtt = document.querySelector(
                    "#cart_popup .p" + id + " .drop_block_subscription #frequencyDiv .attributemenu"
                );
                const rcFrequencyDivAtt = document.querySelector(
                    ".bottom_all_accessories .p" + id + " .drop_block_subscription #frequencyDiv .attributemenu"
                );
                const cpFrequencySelect = document.querySelector("#cart_popup .p" + id + " #frequencyDiv select");
                if (cpFrequencyDivAtt) {
                    cpFrequencyDivAtt.innerHTML = "";
                }
                if (rcFrequencyDivAtt) {
                    rcFrequencyDivAtt.innerHTML = "";
                }
                if (cpFrequencySelect) {
                    cpFrequencySelect.innerHTML = "";
                }

                for (var key3 = 0; key3 < frequencyArray.length; key3++) {
                    var value3 = frequencyArray[key3];
                    if (key3 == 0 && value3 == "1") {
                        var tempOption = '<option value="1" >Monthly</option>';
                        if (rcFrequencyDivAtt) {
                            rcFrequencyDivAtt.insertAdjacentHTML("beforeend", tempOption);
                        }
                        if (cpFrequencySelect) {
                            cpFrequencySelect.insertAdjacentHTML("beforeend", tempOption);
                        }
                    } else if (key3 > 0 && key3 < 11 && value3 == "1") {
                        var tempOption1 = '<option value="' + (key3 + 1) + '">Every ' + (key3 + 1) + " Months</option>";
                        if (rcFrequencyDivAtt) {
                            rcFrequencyDivAtt.insertAdjacentHTML("beforeend", tempOption1);
                        }
                        if (cpFrequencySelect) {
                            cpFrequencySelect.insertAdjacentHTML("beforeend", tempOption1);
                        }
                    } else if (key3 == 11 && value3 == "1") {
                        var tempOption1 = '<option value="' + (key3 + 1) + '">Yearly</option>';
                        if (rcFrequencyDivAtt) {
                            rcFrequencyDivAtt.insertAdjacentHTML("beforeend", tempOption1);
                        }
                        if (cpFrequencySelect) {
                            cpFrequencySelect.insertAdjacentHTML("beforeend", tempOption1);
                        }
                    }
                }
            }
            if (cart_popup) {
                if (cart_popup.closest(".cart-pop-outer")) {
                    if (cart_popup.closest(".cart-pop-outer").parentNode.querySelector(".bottom_all_accessories")) {
                        const cpQuantityDivSelect = document.querySelector(
                            "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv select"
                        );
                        const rcQuantityDivSelect = document.querySelector(
                            ".bottom_all_accessories .p" + id + " .drop_block_subscription #quantityDiv select"
                        );
                        if (cpQuantityDivSelect && rcQuantityDivSelect) {
                            cpQuantityDivSelect.value = rcQuantityDivSelect.value;
                        }

                        const cpFrequencySelect = document.querySelector(
                            "#cart_popup .p" + id + " #frequencyDiv select"
                        );
                        const rcFrequencySelect = document.querySelector(
                            ".bottom_all_accessories .p" + id + " #frequencyDiv select"
                        );
                        if (cpFrequencySelect && rcFrequencySelect) {
                            cpFrequencySelect.value = rcFrequencySelect.value;
                        }

                        const cpStockText = document.querySelector("#cart_popup .p" + id + " #subPrice .stockText");
                        const rcStockText = document.querySelector(
                            ".bottom_all_accessories .p" + id + " #subPrice .stockText"
                        );
                        if (cpFrequencySelect && cpFrequencySelect.value == 1) {
                            if (cpStockText) {
                                cpStockText.textContent = "Every month";
                            }
                            if (rcStockText) {
                                rcStockText.textContent = "Every month";
                            }
                        } else {
                            if (cpStockText) {
                                cpStockText.textContent = "Every " + cpFrequencySelect.value + " months";
                            }
                            if (rcStockText) {
                                rcStockText.textContent = "Every " + cpFrequencySelect.value + " months";
                            }
                        }
                    }
                }
                var qualityCount = 0;
                const atcDropOptions = Array.from(
                    document.querySelectorAll("#cart_popup .p" + id + " .atc_pr_bottom #qualityDropdown > option")
                );
                atcDropOptions.forEach(function (option) {
                    if (option.value == data[key][0]["attributes_value"]) {
                        qualityCount++;
                        const cpOption = document.querySelector(
                            "#cart_popup .p" +
                                id +
                                ' .atc_pr_bottom #qualityDropdown option[value="' +
                                option.value +
                                '"]'
                        );
                        if (cpOption) {
                            cpOption.selected = true;
                        }
                    }
                });
                if (qualityCount == 0) {
                    const cpQualityDivs = Array.from(
                        document.querySelectorAll("#cart_popup .p" + id + " .atc_pr_bottom #qualityDiv")
                    );
                    cpQualityDivs.forEach(function (div) {
                        div.style.display = "none";
                    });
                }
            }

            const cpRadioField = document.querySelector("#cart_popup .p" + id + " .radioField");
            if (cpRadioField) {
                cpRadioField.dataset.pid = id;
                cpRadioField.dataset.price = price;
            }
            const rcRadioField = document.querySelector(".bottom_all_accessories .p" + id + " .radioField");
            if (rcRadioField) {
                rcRadioField.dataset.pid = id;
                rcRadioField.dataset.price = price;
            }
            const cpRadioFirstChild = document.querySelector(
                "#cart_popup .p" + id + " .radioField .firstRadio span:nth-child(1)"
            );
            const rcRadioFirstChild = document.querySelector(
                ".bottom_all_accessories .p" + id + " .radioField .firstRadio span:nth-child(1)"
            );
            if (cpRadioFirstChild) {
                cpRadioFirstChild.textContent = " - $" + price;
            }
            if (rcRadioFirstChild) {
                rcRadioFirstChild.textContent = " - $" + price;
            }
            //set frequency selection attribute
            const cpFrequencyDiv = document.querySelector("#cart_popup .p" + id + " #frequencyDiv");
            const rcFrequencyDiv = document.querySelector(".bottom_all_accessories .p" + id + " #frequencyDiv");
            if (cpFrequencyDiv) {
                cpFrequencyDiv.dataset.pid = id;
            }
            if (rcFrequencyDiv) {
                rcFrequencyDiv.dataset.pid = id;
            }
            //set quantity selection attribute
            const cpQuantityDiv = document.querySelector(
                "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv"
            );
            const rcQuantityDiv = document.querySelector(".bottom_all_accessories .p" + id + " #quantityDiv");
            if (cpQuantityDiv) {
                cpQuantityDiv.dataset.pid = id;
            }
            if (rcQuantityDiv) {
                rcQuantityDiv.dataset.pid = id;
            }
            //disable subscription quality, quantity, frequency drop down if product in cart
            if (incartArray["incart"].indexOf(id.toString()) > -1) {
                const rcAttMenu = document.querySelector(
                    ".bottom_all_accessories .p" + id + " .attributeswap .attributemenu"
                );
                const cpAttMenu = document.querySelector("#cart_popup .p" + id + " .attributeswap .attributemenu");
                if (rcAttMenu) {
                    rcAttMenu.classList.add("disable-btn");
                }
                if (cpAttMenu) {
                    cpAttMenu.classList.add("disable-btn");
                }
            }
            const rcAtcDrops = Array.from(
                document.querySelectorAll(
                    ".bottom_all_accessories .p" +
                        id +
                        " .bottom_acc_sub .drop_block_not_subscription .atc_drop_set .dropdown"
                )
            );
            if (rcAtcDrops.length > 0) {
                rcAtcDrops.forEach(function (rcAtcDrop) {
                    const options = Array.from(rcAtcDrop.querySelectorAll("option"));
                    options.forEach(function (option) {
                        const qualityOption = document.querySelector(
                            ".bottom_all_accessories .p" +
                                id +
                                ' .bottom_acc_sub #qualityDropdown option[value="' +
                                option.value +
                                '"]'
                        );
                        if (
                            window.getComputedStyle(option).getPropertyValue("color") == "rgb(204, 204, 204)" &&
                            qualityOption
                        ) {
                            qualityOption.disabled = true;
                        }
                        if (option.value == data[key][0]["attributes_value"] && qualityOption) {
                            qualityOption.selected = true;
                        }
                    });
                });
                const rcQualityOptions = Array.from(
                    document.querySelectorAll(
                        ".bottom_all_accessories .p" +
                            id +
                            " .bottom_acc_sub .drop_block_not_subscription #qualityDropdown > option"
                    )
                );
                rcQualityOptions.forEach(function (option) {
                    const rcAtcDropOptions = Array.from(
                        document.querySelectorAll(
                            ".bottom_all_accessories .p" +
                                id +
                                ' .bottom_acc_sub .drop_block_not_subscription .atc_drop_set .dropdown option[value="' +
                                option.value +
                                '"]'
                        )
                    );
                    if (rcAtcDropOptions.length <= 0) {
                        const rcQualityOptions = Array.from(
                            document.querySelectorAll(
                                ".bottom_all_accessories .p" +
                                    id +
                                    ' .bottom_acc_sub #qualityDropdown option[value="' +
                                    option.value +
                                    '"]'
                            )
                        );
                        rcQualityOptions.forEach(function (qOption) {
                            qOption.remove();
                        });
                    }
                });
            } else {
                qualityCount = 0;
                const rcDropNotQualityOptions = Array.from(
                    document.querySelectorAll(
                        ".bottom_all_accessories .p" + id + " .drop_block_not_subscription #qualityDropdown > option"
                    )
                );
                rcDropNotQualityOptions.forEach(function (option) {
                    if (option.value != data[key]["dropdown"]["value"][0]) {
                        option.disabled = true;
                    }
                    if (option.value == data[key][0]["attributes_value"]) {
                        qualityCount++;
                        const qualityOption = document.querySelector(
                            ".bottom_all_accessories .p" +
                                id +
                                ' .drop_block_not_subscription #qualityDropdown option[value="' +
                                option.value +
                                '"]'
                        );
                        if (qualityOption) {
                            qualityOption.selected = true;
                        }
                    }
                });
                if (qualityCount == 0) {
                    const qualityDiv = document.querySelector(
                        ".bottom_all_accessories .p" + id + " .drop_block_not_subscription #qualityDiv"
                    );
                    if (qualityDiv) {
                        qualityDiv.style.display = "none";
                    }
                }

                qualityCount = 0;
                const rcDropQualityOptions = Array.from(
                    document.querySelectorAll(
                        ".bottom_all_accessories .p" + id + " .drop_block_subscription #qualityDropdown > option"
                    )
                );
                rcDropQualityOptions.forEach(function (option) {
                    if (option.value != data[key]["dropdown"]["value"][0]) {
                        option.disabled = true;
                    }
                    if (option.value == data[key][0]["attributes_value"]) {
                        qualityCount++;
                        const qualityOption = document.querySelector(
                            ".bottom_all_accessories .p" +
                                id +
                                ' .drop_block_subscription #qualityDropdown option[value="' +
                                option.value +
                                '"]'
                        );
                        if (qualityOption) {
                            qualityOption.selected = true;
                        }
                    }
                });
                if (qualityCount == 0) {
                    const qualityDiv = document.querySelector(
                        ".bottom_all_accessories .p" + id + " .drop_block_subscription #qualityDiv"
                    );
                    if (qualityDiv) {
                        qualityDiv.style.display = "none";
                    }
                }
            }
        }
    }
}

function getSizeAndQualityNew(showAccessoriesNew, data, key) {
    //if first drop down exists
    if (data[key]["dropdown"]["value"] && Object.keys(data[key]["dropdown"]["value"]).length > 1) {
        showAccessoriesNew += '<div class="atc_drop_set" style="float:left; margin-left:0px; display:none">';
        showAccessoriesNew += "<span>" + data[key]["dropdown"]["name"] + "</span>";
        showAccessoriesNew += '<select class="drop_select dropdown group' + key + '">';
        //if second drop down exists
        if (data[key]["dropdown"]["value2"]) {
            var tot1 = 0;
            for (var keyV2 in data[key]["dropdown"]["value2"]) {
                tot1++;
            }
            if (tot1 > 1) {
                for (var keyV2 in data[key]["dropdown"]["value2"]) {
                    if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                        //convert object to comma separated string for data attribute
                        var dataAtr2 = Object.keys(data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]])
                            .map(function (k) {
                                return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                            })
                            .join(",");
                    }
                    //select the option that belongs to this product
                    if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                        // data atribute for displayed value in second dropdown
                        var selectAtr2 = dataAtr2;
                    }
                }
            }
        }
        var tot2 = 0;
        for (var keyV in data[key]["dropdown"]["value"]) {
            tot2++;
            if (data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]]) {
                var dataAtr = Object.keys(data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]])
                    .map(function (k) {
                        return data[key]["valToProd"][data[key]["dropdown"]["value"][keyV]][k];
                    })
                    .join(","); //convert object to comma separated string for data attribute
            }
            var optionStyle = 'class="font-colors-black-text"';
            //select the option that belogs to this product
            if (data[key]["dropdown"]["value"][keyV] == data[key][0]["attributes_value"]) {
                var selected = " selected ";
                var disVal = data[key]["dropdown"]["value"][keyV]; //displayed value in first dropdown
                var selectAtr = dataAtr; //data atribute for displayed value in first dropdown
            } else {
                var selected = "";
            }
            //if dropdown2 exists
            if (tot1 > 1) {
                //find out which values from dropdown should be black and which should be gray
                var checkArray = dataAtr.split(",");
                var count1 = 0;
                for (var ii = 0; ii < checkArray.length; ii++) {
                    if (selectAtr2.indexOf(checkArray[ii]) > -1) {
                        count1++;
                    }
                }
                var optionStyle = count1 > 0 ? 'class="font-colors-black-text"' : ' class="font-colors-gray-text" ';
            } else {
                var optionStyle = 'class="font-colors-black-text"';
            }
            showAccessoriesNew +=
                "<option " +
                optionStyle +
                ' data-prodId="' +
                dataAtr +
                '" value="' +
                data[key]["dropdown"]["value"][keyV] +
                '" ' +
                selected +
                ">" +
                data[key]["dropdown"]["value"][keyV] +
                "</option>";
        }
        showAccessoriesNew += "</select>";
        showAccessoriesNew += "</div>";
    }
    //if second drop down exists
    if (data[key]["dropdown"]["value2"]) {
        var tot = 0;
        for (var keyV2 in data[key]["dropdown"]["value2"]) {
            tot++;
        }
        if (tot > 1) {
            showAccessoriesNew += '<div class="atc_drop_set" style="display: none;">';
            showAccessoriesNew += "<span>" + data[key]["dropdown"]["name2"] + "</span>";
            showAccessoriesNew += '<select class="drop_select dropdown2 group' + key + '">';
            for (var keyV2 in data[key]["dropdown"]["value2"]) {
                if (data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]]) {
                    var dataAtr2 = Object.keys(data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]])
                        .map(function (k) {
                            return data[key]["valToProd"][data[key]["dropdown"]["value2"][keyV2]][k];
                        })
                        .join(","); //convert object to comma separated string for data attribute
                    //find out which values from dropdown2 should be black and which should be gray
                    var checkArray2 = dataAtr2.split(",");
                    var count2 = 0;
                    for (var ii = 0; ii < checkArray2.length; ii++) {
                        //if first dropdown exist
                        if (tot2 > 1) {
                            if (selectAtr.indexOf(checkArray2[ii]) > -1) {
                                count2++;
                            }
                        } else {
                            count2++;
                        }
                    }
                    var optionStyle2 =
                        count2 > 0 ? 'class="font-colors-black-text"' : ' class="font-colors-gray-text" ';
                }
                //select the option that belogs to this product
                if (data[key]["dropdown"]["value2"][keyV2] == data[key][0]["attributes_value2"]) {
                    var selected2 = " selected ";
                    var disVal2 = data[key]["dropdown"]["value2"][keyV2];
                    var selectAtr2 = dataAtr2; // data aribute for displayed value in second dropdown
                } else {
                    var selected2 = "";
                }
                showAccessoriesNew +=
                    "<option " +
                    optionStyle2 +
                    ' data-prodId="' +
                    dataAtr2 +
                    '" value="' +
                    data[key]["dropdown"]["value2"][keyV2] +
                    '" ' +
                    selected2 +
                    ">" +
                    data[key]["dropdown"]["value2"][keyV2] +
                    "</option>";
            }
            showAccessoriesNew += "</select>";
            showAccessoriesNew += "</div>";
        }
    }
    if (data[key]["dropdown"]["value3"]) {
    }
    return showAccessoriesNew;
}

document.addEventListener("click", function (event) {
    if (
        event.target.closest(".atc_cart_btn_in") ||
        event.target.closest(".bottom_cart_btn_in") ||
        event.target.closest(".goToCart")
    ) {
        window.location.href = "https://" + location.host + "/shopping_cart.php";
    }

    if (event.target.closest(".atc_cart_btn") || event.target.closest(".atc_cart_btn_acw")) {
        event.preventDefault();
        const atcCartBtn =
            storeId != 16 ? event.target.closest(".atc_cart_btn") : event.target.closest(".atc_cart_btn_acw");
        const prod_id = atcCartBtn.dataset.prodid;
        const freqEl = document.querySelector("#cart_popup .p" + prod_id + " #frequencyDiv .attributemenu");
        let frequency;
        if (freqEl) {
            frequency = freqEl.value;
        }
        const subscription = "yes";
        const subTotalEl = document.getElementById("atc_cartSubTotal_monery");
        let subTotal;
        let totalNum;
        if (subTotalEl) {
            subTotal = subTotalEl.dataset.total;
            totalNum = subTotalEl.dataset.num;
        }

        let newNum;
        let newTotal;
        if (atcCartBtn.classList.contains("subButton")) {
            const prodQtyEl = document.querySelector(
                "#cart_popup .p" + prod_id + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
            );
            let prod_qty;
            if (prodQtyEl) {
                prod_qty = prodQtyEl.value;
            }
            const priceEl = document.querySelector(
                "#cart_popup .p" + prod_id + " .drop_block_subscription #subPrice span"
            );
            let price;
            if (priceEl) {
                price = priceEl.textContent;
            }
            const priceT = price.split("$")[1];
            newNum = parseInt(totalNum) + parseInt(prod_qty);
            newTotal = parseFloat(subTotal) + parseFloat(priceT);
            cartOneAjax(prod_id, prod_qty, subscription, frequency, atcCartBtn);
        } else {
            let prod_qty;
            let price;
            if (atcCartBtn.closest(".drop_block_not_subscription")) {
                const prodQtyEl = document.querySelector(
                    "#cart_popup .p" +
                        prod_id +
                        " .drop_block_not_subscription #quantityDiv .attributemenu option:checked"
                );
                if (prodQtyEl) {
                    prod_qty = prodQtyEl.value;
                }
                const priceEl = document.querySelector(
                    "#cart_popup .p" + prod_id + " .drop_block_not_subscription .price_block span"
                );
                if (priceEl) {
                    price = priceEl.textContent;
                }
                const priceT = price.split("$")[1];
                newNum = parseInt(totalNum) + parseInt(prod_qty);
                newTotal = parseFloat(subTotal) + parseFloat(priceT) * prod_qty;
            } else {
                if (
                    atcCartBtn.classList.contains("atc_cart_btn") ||
                    atcCartBtn.classList.contains("atc_cart_btn_acw")
                ) {
                    const parentDropQty = atcCartBtn.parentNode.querySelector(".drop_qty");
                    if (parentDropQty) {
                        prod_qty = parentDropQty.value;
                    }
                } else {
                    const parentDropQty = atcCartBtn.parentNode.querySelector(".cart_qty").querySelector(".drop_qty");
                    if (parentDropQty) {
                        prod_qty = parentDropQty.value;
                    }
                }
                const priceEl = document.querySelector("#cart_popup .p" + prod_id + " .atc_cart_block .acc_pro_pric");
                if (priceEl) {
                    price = priceEl.textContent;
                }
                const priceT = price.split("$")[1];
                newTotal = parseFloat(subTotal) + parseFloat(priceT);
                newNum = parseInt(totalNum) + 1;
            }
            cartOneAjax(prod_id, prod_qty, subscription, frequency, atcCartBtn);
        }
        const subTMoney = document.getElementById("atc_cartSubTotal_monery");
        const subTNumber = document.getElementById("atc_cartSubTotal_number");
        if (subTMoney) {
            subTMoney.dataset.total = newTotal;
            subTMoney.dataset.num = newNum;
            subTMoney.textContent = "$" + numberWithCommas(parseFloat(newTotal).toFixed(2));
        }
        if (subTNumber) {
            subTNumber.textContent = newNum + " items";
        }
    }

    if (event.target.closest(".bottom_cart_btn")) {
        event.preventDefault();
        const bottomCartBtn = event.target.closest(".bottom_cart_btn");
        const prod_id = bottomCartBtn.dataset.prodid;
        if (bottomCartBtn.classList.contains("subButton")) {
            const freqEl = document.querySelector(
                ".bottom_all_accessories .p" + prod_id + " #frequencyDiv .attributemenu"
            );
            let frequency;
            if (freqEl) {
                if (freqEl.value) {
                    frequency = freqEl.value;
                } else {
                    const freqEl2 = document.querySelector(
                        "#cart_popup .p" + prod_id + " #frequencyDiv .attributemenu"
                    );
                    if (freqEl2) {
                        frequency = freqEl2.value;
                    }
                }
            }
            const prodQtyEl = document.querySelector(
                ".bottom_all_accessories .p" +
                    prod_id +
                    " .drop_block_subscription #quantityDiv .attributemenu option:checked"
            );
            let prod_qty;
            if (prodQtyEl) {
                if (prodQtyEl.value) {
                    prod_qty = prodQtyEl.value;
                } else {
                    const prodQtyEl2 = document.querySelector(
                        "#cart_popup .p" +
                            prod_id +
                            " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                    );
                    if (prodQtyEl2) {
                        prod_qty = prodQtyEl2.value;
                    }
                }
            }
            const subscription = "yes";
            cartOneAjax(prod_id, prod_qty, subscription, frequency, bottomCartBtn);
        } else {
            let prod_qty = 1;
            if (storeId == 16) {
                prod_qty = bottomCartBtn.parentNode.querySelector(".drop_qty").value;
            }
            cartOneAjax(prod_id, prod_qty, "", 0, bottomCartBtn);
        }
    }
});

// display product from selected attributes
document.addEventListener("change", function (event) {
    if (event.target.matches(".bottom_drop_select")) {
        event.preventDefault();
        const bottomDropSelect = event.target.closest(".bottom_drop_select");
        var prod_id = "";
        var group = "";
        var selVal = "";
        var selVal2 = "";
        var typeSelect = "";
        var newProd = [];
        prod_id = bottomDropSelect.closest(".bottom_pr_set").dataset.prodid;
        group = bottomDropSelect.closest(".bottom_pr_set").dataset.group; // this is the group from accessoriesArray where product is located
        if (bottomDropSelect.classList.contains("dropdown")) {
            var dropSelect = 1;
            selVal = bottomDropSelect.value.replace(/"/g, "&quot;");
            if (bottomDropSelect.closest(".bottom_drop_block").querySelector(".dropdown2")) {
                selVal2 = bottomDropSelect
                    .closest(".bottom_drop_block")
                    .querySelector(".dropdown2")
                    .value.replace(/"/g, "&quot;");
            }
        } else if (bottomDropSelect.classList.contains("dropdown2")) {
            var dropSelect = 2;
            selVal2 = bottomDropSelect.value.replace(/"/g, "&quot;");
            if (bottomDropSelect.closest(".bottom_drop_block").querySelector(".dropdown")) {
                selVal = bottomDropSelect
                    .closest(".bottom_drop_block")
                    .querySelector(".dropdown")
                    .value.replace(/"/g, "&quot;");
            }
        }
        if (selVal != "" && selVal2 != "") {
            typeSelect = 2;
        } else if (selVal != "" && selVal2 == "") {
            typeSelect = 0;
        } else if (selVal == "" && selVal2 != "") {
            typeSelect = 1;
        }
        for (var key in accessoriesArray[group]) {
            if (accessoriesArray[group][key]["products_id"] != prod_id) {
                if (typeSelect == 2) {
                    if (
                        selVal == accessoriesArray[group][key]["attributes_value"] &&
                        selVal2 == accessoriesArray[group][key]["attributes_value2"]
                    ) {
                        newProd = accessoriesArray[group][key];
                    }
                }
                if (typeSelect == 0) {
                    if (selVal == accessoriesArray[group][key]["attributes_value"]) {
                        newProd = accessoriesArray[group][key];
                    }
                }
                if (typeSelect == 1) {
                    if (selVal2 == accessoriesArray[group][key]["attributes_value2"]) {
                        newProd = accessoriesArray[group][key];
                    }
                }
            }
        }
        if (Object.keys(newProd).length > 0) {
            // if product exists then new data are added
            const oldProduct = document.querySelector(".bottom_all_accessories .p" + prod_id);
            if (oldProduct) {
                oldProduct.classList.remove("p" + prod_id);
                oldProduct.classList.add("p" + newProd["products_id"]);
            }
            const oldProductCP = document.querySelector("#cart_popup .p" + prod_id);
            if (oldProductCP) {
                oldProductCP.classList.remove("p" + prod_id);
                oldProductCP.classList.add("p" + newProd["products_id"]);
            }
            const newProduct = document.querySelector(".bottom_all_accessories .p" + newProd["products_id"]);
            if (newProduct) {
                newProduct.dataset.prodid = newProd["products_id"];
            }

            const bottomAccessoriesRight = bottomDropSelect.closest(".bottom_accessories_right");
            const bottomAcBtn = bottomDropSelect.closest(".bottom_accessories_right").querySelector(".bottom_ac_btn");
            const dropQty = bottomDropSelect
                .closest(".bottom_accessories_right")
                .querySelector(".bottom_cart_block")
                .querySelector(".drop_qty");

            if (bottomDropSelect.closest(".bottom_pr_set").querySelector(".bottom_img_block")) {
                bottomDropSelect.closest(".bottom_pr_set").querySelector(".bottom_img_block").innerHTML =
                    '<a href="' +
                    newProd["prod_link"] +
                    '" title="' +
                    newProd["products_name"] +
                    '"><img width="75px" height="75px" src="/products-image/280/' +
                    (newProd["products_bimage"] && newProd["products_bimage"] != ""
                        ? newProd["products_bimage"]
                        : "product_0_125.gif") +
                    '" alt="' +
                    newProd["products_name"] +
                    '"></a>';
            }
            if (bottomAccessoriesRight) {
                bottomAccessoriesRight.dataset.prodid = newProd["products_id"];
            }
            if (bottomAccessoriesRight.querySelector(".bottom_pr_name")) {
                bottomAccessoriesRight.querySelector(".bottom_pr_name").innerHTML =
                    '<a href="' +
                    newProd["prod_link"] +
                    '" title="' +
                    newProd["products_name"] +
                    '">' +
                    newProd["products_name"] +
                    "</a>";
            }
            if (bottomAccessoriesRight.querySelector(".bottom_pr_price_div")) {
                if (storeId != 16) {
                    bottomAccessoriesRight.querySelector(".bottom_pr_price_div").innerHTML =
                        '<div class="font-size-18 font-weight-bold mb-2">$' +
                        newProd["products_price"] +
                        "</div>" +
                        newProd["stock_status"];
                } else {
                    bottomAccessoriesRight.querySelector(".bottom_pr_price_div").innerHTML =
                        "<span>$" + newProd["products_price"] + "</span>" + newProd["stock_status"];
                }
            }
            if (bottomAccessoriesRight.querySelector(".bottom_pr_model")) {
                bottomAccessoriesRight.querySelector(".bottom_pr_model").innerHTML =
                    "<span>Model: " + newProd["products_model"] + "</span>";
            }

            if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                // if the selected product is in cart
                if (bottomAcBtn) {
                    bottomAcBtn.dataset.prodid = newProd["products_id"];
                    bottomAcBtn.classList.remove("bottom_cart_btn");
                    bottomAcBtn.classList.add("bottom_cart_btn_in");
                    if (storeId != 16) {
                        bottomAcBtn.classList.add("font-colors-gray-dark");
                    }
                    bottomAcBtn.textContent = "In Cart";
                }
                if (dropQty) {
                    dropQty.classList.add("disable-btn");
                }
            } else {
                if (bottomAcBtn) {
                    bottomAcBtn.dataset.prodid = newProd["products_id"];
                    bottomAcBtn.classList.remove("bottom_cart_btn_in");
                    bottomAcBtn.classList.add("bottom_cart_btn");
                    if (storeId != 16) {
                        bottomAcBtn.classList.remove("font-colors-gray-dark");
                        bottomAcBtn.classList.add("font-colors-green-text");
                    }
                    bottomAcBtn.textContent = "Add To Cart";
                }
                if (dropQty) {
                    dropQty.classList.remove("disable-btn");
                    dropQty.value = "1";
                }
            }

            if (typeSelect == 2) {
                existVal(group);
            }
        } else {
            // if product does not exist
            //do nothing for now
        }
    }

    if (event.target.matches(".atc_drop_select")) {
        event.preventDefault();
        const atcDropSelect = event.target;
        var prod_id = "";
        var group = "";
        var selVal = "";
        var selVal2 = "";
        var typeSelect = "";
        var newProd = [];
        prod_id = atcDropSelect.parentNode.parentNode.parentNode.parentNode.dataset.prodid;
        group = atcDropSelect.parentNode.parentNode.parentNode.parentNode.dataset.group;
        if (atcDropSelect.classList.contains("dropdown")) {
            var dropSelect = 1;
            selVal = atcDropSelect.value.replace(/"/g, "&quot;");
            if (atcDropSelect.parentNode.parentNode.querySelector(".dropdown2")) {
                selVal2 = atcDropSelect.parentNode.parentNode.querySelector(".dropdown2").value.replace(/"/g, "&quot;");
            }
        } else if (atcDropSelect.classList.contains("dropdown2")) {
            var dropSelect = 2;
            selVal2 = atcDropSelect.value.replace(/"/g, "&quot;");
            if (atcDropSelect.parentNode.parentNode.querySelector(".dropdown")) {
                selVal = atcDropSelect.parentNode.parentNode.querySelector(".dropdown").value.replace(/"/g, "&quot;");
            }
        }
        if (selVal != "" && selVal2 != "") {
            typeSelect = 2;
        } else if (selVal != "" && selVal2 == "") {
            typeSelect = 0;
        } else if (selVal == "" && selVal2 != "") {
            typeSelect = 1;
        }
        for (var key in accessoriesArray[group]) {
            if (accessoriesArray[group][key]["products_id"] != prod_id) {
                if (typeSelect == 2) {
                    if (
                        selVal == accessoriesArray[group][key]["attributes_value"] &&
                        selVal2 == accessoriesArray[group][key]["attributes_value2"]
                    ) {
                        newProd = accessoriesArray[group][key];
                    }
                }
                if (typeSelect == 0) {
                    if (selVal == accessoriesArray[group][key]["attributes_value"]) {
                        newProd = accessoriesArray[group][key];
                    }
                }
                if (typeSelect == 1) {
                    if (selVal2 == accessoriesArray[group][key]["attributes_value2"]) {
                        newProd = accessoriesArray[group][key];
                    }
                }
            }
        }
        if (Object.keys(newProd).length > 0) {
            // if product exists then new data are added
            const productContainer = document.querySelector(".bottom_all_accessories .p" + prod_id);
            if (productContainer) {
                productContainer.classList.remove("p" + prod_id);
                productContainer.classList.add("p" + newProd["products_id"]);
            }

            const atcPrSet = atcDropSelect.closest(".atc_pr_set");
            const atcAcBtn = atcDropSelect.closest(".atc_pr_set").querySelector(".atc_ac_btn");
            const subButton = atcDropSelect.closest(".atc_pr_set").querySelector(".subButton");
            const attMenu = document.querySelector("#cart_popup .p" + prod_id + " .attributeswap .attributemenu");

            if (atcPrSet.querySelector(".atc_img_block")) {
                atcPrSet.querySelector(".atc_img_block").innerHTML =
                    '<a href="' +
                    newProd["prod_link"] +
                    '" title="' +
                    newProd["products_name"] +
                    '"><img width="60px" height="60px" src="/products-image/280/' +
                    newProd["products_bimage"] +
                    '" alt="' +
                    newProd["products_name"] +
                    '"></a>';
            }
            if (atcPrSet.querySelector(".atc_pr_name")) {
                atcPrSet.querySelector(".atc_pr_name").innerHTML =
                    '<a href="' +
                    newProd["prod_link"] +
                    '" title="' +
                    newProd["products_name"] +
                    '">' +
                    newProd["products_name"] +
                    "</a>";
            }
            if (atcPrSet.querySelector(".atc_pr_price_div")) {
                atcPrSet.querySelector(".atc_pr_price_div").innerHTML =
                    '<div style="font-size:24px; font-weight:bold; margin-bottom:2px;" class="acc_pro_pric" tabindex="0">$' +
                    newProd["products_price"] +
                    "</div>" +
                    newProd["stock_status"];
            }
            if (atcPrSet.querySelector(".atc_pr_model")) {
                atcPrSet.querySelector(".atc_pr_model").innerHTML =
                    "<span>Model: " + newProd["products_model"] + "</span>";
            }
            if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                // if the selected product is in cart
                if (atcAcBtn) {
                    atcAcBtn.classList.add("atc_cart_btn_in");
                    atcAcBtn.textContent = "In Cart";
                    atcAcBtn.classList.remove("atc_cart_btn");
                    atcAcBtn.classList.remove("atc_cart_btn_acw");
                    atcAcBtn.dataset.prodid = newProd["products_id"];
                }
                if (subButton) {
                    subButton.classList.remove("atc_cart_btn");
                    subButton.classList.remove("atc_cart_btn_acw");
                    subButton.classList.add("atc_cart_btn_in");
                    subButton.textContent = "In Cart";
                }
                if (attMenu) {
                    attMenu.classList.add("disable-btn");
                }
            } else {
                if (atcAcBtn) {
                    storeId != 16 ? atcAcBtn.classList.add("atc_cart_btn") : atcAcBtn.classList.add("atc_cart_btn_acw");
                    atcAcBtn.textContent = "Add To Cart";
                    atcAcBtn.classList.remove("atc_cart_btn_in");
                    atcAcBtn.dataset.prodid = newProd["products_id"];
                }
                if (subButton) {
                    subButton.classList.remove("atc_cart_btn_in");
                    storeId != 16
                        ? subButton.classList.add("atc_cart_btn")
                        : subButton.classList.add("atc_cart_btn_acw");
                    subButton.textContent = "Subscribe Now";
                }
                if (attMenu) {
                    attMenu.classList.remove("disable-btn");
                }
            }
            if (typeSelect == 2) {
                existVal(group);
            }
            if (atcPrSet) {
                atcPrSet.classList.remove("p" + prod_id);
                atcPrSet.classList.add("p" + newProd["products_id"]);
                atcPrSet.dataset.prodid = newProd["products_id"];
            }
        } else {
            // if product does not exist
            if (dropSelect == 1) {
                for (var key in accessoriesArray[group]["dropdown"]["value2"]) {
                    for (var key2 in accessoriesArray[group]) {
                        if (accessoriesArray[group][key2]["attributes_value"] == selVal) {
                            newProd = accessoriesArray[group][key2];

                            const atcPrSet = atcDropSelect.closest(".atc_pr_set");
                            const atcAcBtn = atcDropSelect.closest(".atc_pr_set").querySelector(".atc_ac_btn");
                            const subButton = atcDropSelect.closest(".atc_pr_set").querySelector(".subButton");
                            const attMenu = document.querySelector(
                                "#cart_popup .p" + prod_id + " .attributeswap .attributemenu"
                            );

                            if (atcPrSet.querySelector(".dropdown2")) {
                                atcPrSet.querySelector(".dropdown2").value = newProd["attributes_value2"].replace(
                                    "&quot;",
                                    /"/g
                                );
                            }
                            if (atcPrSet.querySelector(".atc_img_block")) {
                                atcPrSet.querySelector(".atc_img_block").innerHTML =
                                    '<a href="' +
                                    newProd["prod_link"] +
                                    '" title="' +
                                    newProd["products_name"] +
                                    '"><img width="60px" height="60px" src="/products-image/280/' +
                                    newProd["products_bimage"] +
                                    '" alt="' +
                                    newProd["products_name"] +
                                    '"></a>';
                            }
                            if (atcPrSet.querySelector(".atc_pr_name")) {
                                atcPrSet.querySelector(".atc_pr_name").innerHTML =
                                    '<a href="' +
                                    newProd["prod_link"] +
                                    '" title="' +
                                    newProd["products_name"] +
                                    '">' +
                                    newProd["products_name"] +
                                    "</a>";
                            }
                            if (atcPrSet.querySelector(".atc_pr_price_div")) {
                                atcPrSet.querySelector(".atc_pr_price_div").innerHTML =
                                    '<div style="font-size:24px; font-weight:bold; margin-bottom:2px;" class="acc_pro_pric" tabindex="0">$' +
                                    newProd["products_price"] +
                                    "</div>" +
                                    newProd["stock_status"];
                            }
                            if (atcPrSet.querySelector(".atc_pr_model")) {
                                atcPrSet.querySelector(".atc_pr_model").innerHTML =
                                    "<span>Model: " + newProd["products_model"] + "</span>";
                            }
                            if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                                // if the selected product is in cart
                                if (atcAcBtn) {
                                    atcAcBtn.classList.add("atc_cart_btn_in");
                                    atcAcBtn.textContent = "In Cart";
                                    atcAcBtn.classList.remove("atc_cart_btn");
                                    atcAcBtn.classList.remove("atc_cart_btn_acw");
                                    atcAcBtn.dataset.prodid = newProd["products_id"];
                                }
                                if (subButton) {
                                    subButton.classList.remove("atc_cart_btn");
                                    subButton.classList.remove("atc_cart_btn_acw");
                                    subButton.classList.add("atc_cart_btn_in");
                                    subButton.textContent = "In Cart";
                                }
                                if (attMenu) {
                                    attMenu.classList.add("disable-btn");
                                }
                            } else {
                                if (atcAcBtn) {
                                    storeId != 16
                                        ? atcAcBtn.classList.add("atc_cart_btn")
                                        : atcAcBtn.classList.add("atc_cart_btn_acw");
                                    atcAcBtn.textContent = "Add To Cart";
                                    atcAcBtn.classList.remove("atc_cart_btn_in");
                                    atcAcBtn.dataset.prodid = newProd["products_id"];
                                }
                                if (subButton) {
                                    subButton.classList.remove("atc_cart_btn_in");
                                    storeId != 16
                                        ? subButton.classList.add("atc_cart_btn")
                                        : subButton.classList.add("atc_cart_btn_acw");
                                    subButton.textContent = "Subscribe Now";
                                }
                                if (attMenu) {
                                    attMenu.classList.remove("disable-btn");
                                }
                            }
                            existVal(group);
                            return;
                        }
                    }
                }
            } else if (dropSelect == 2) {
                for (var key in accessoriesArray[group]["dropdown"]["value"]) {
                    for (var key2 in accessoriesArray[group]) {
                        if (accessoriesArray[group][key2]["attributes_value2"] == selVal2) {
                            newProd = accessoriesArray[group][key2];

                            const atcPrSet = atcDropSelect.closest(".atc_pr_set");
                            const atcAcBtn = atcDropSelect.closest(".atc_pr_set").querySelector(".atc_ac_btn");
                            const subButton = atcDropSelect.closest(".atc_pr_set").querySelector(".subButton");
                            const attMenu = document.querySelector(
                                "#cart_popup .p" + prod_id + " .attributeswap .attributemenu"
                            );

                            if (atcPrSet.querySelector(".dropdown")) {
                                atcPrSet.querySelector(".dropdown").value = newProd["attributes_value"].replace(
                                    /&quot;/g,
                                    '"'
                                );
                            }
                            if (atcPrSet.querySelector(".dropdown2")) {
                                atcPrSet.querySelector(".dropdown2").value = newProd["attributes_value2"].replace(
                                    "&quot;",
                                    /"/g
                                );
                            }
                            if (atcPrSet.querySelector(".atc_img_block")) {
                                atcPrSet.querySelector(".atc_img_block").innerHTML =
                                    '<a href="' +
                                    newProd["prod_link"] +
                                    '" title="' +
                                    newProd["products_name"] +
                                    '"><img width="60px" height="60px" src="/products-image/280/' +
                                    newProd["products_bimage"] +
                                    '" alt="' +
                                    newProd["products_name"] +
                                    '"></a>';
                            }
                            if (atcPrSet.querySelector(".atc_pr_name")) {
                                atcPrSet.querySelector(".atc_pr_name").innerHTML =
                                    '<a href="' +
                                    newProd["prod_link"] +
                                    '" title="' +
                                    newProd["products_name"] +
                                    '">' +
                                    newProd["products_name"] +
                                    "</a>";
                            }
                            if (atcPrSet.querySelector(".atc_pr_price_div")) {
                                atcPrSet.querySelector(".atc_pr_price_div").innerHTML =
                                    '<div style="font-size:24px; font-weight:bold; margin-bottom:2px;" class="acc_pro_pric" tabindex="0">$' +
                                    newProd["products_price"] +
                                    "</div>" +
                                    newProd["stock_status"];
                            }
                            if (atcPrSet.querySelector(".atc_pr_model")) {
                                atcPrSet.querySelector(".atc_pr_model").innerHTML =
                                    "<span>Model: " + newProd["products_model"] + "</span>";
                            }
                            if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                                // if the selected product is in cart
                                if (atcAcBtn) {
                                    atcAcBtn.classList.add("atc_cart_btn_in");
                                    atcAcBtn.textContent = "In Cart";
                                    atcAcBtn.classList.remove("atc_cart_btn");
                                    atcAcBtn.classList.remove("atc_cart_btn_acw");
                                    atcAcBtn.dataset.prodid = newProd["products_id"];
                                }
                                if (subButton) {
                                    subButton.classList.remove("atc_cart_btn");
                                    subButton.classList.remove("atc_cart_btn_acw");
                                    subButton.classList.add("atc_cart_btn_in");
                                    subButton.textContent = "In Cart";
                                }
                                if (attMenu) {
                                    attMenu.classList.add("disable-btn");
                                }
                            } else {
                                if (atcAcBtn) {
                                    storeId != 16
                                        ? atcAcBtn.classList.add("atc_cart_btn")
                                        : atcAcBtn.classList.add("atc_cart_btn_acw");
                                    atcAcBtn.textContent = "Add To Cart";
                                    atcAcBtn.classList.remove("atc_cart_btn_in");
                                    atcAcBtn.dataset.prodid = newProd["products_id"];
                                }
                                if (subButton) {
                                    subButton.classList.remove("atc_cart_btn_in");
                                    storeId != 16
                                        ? subButton.classList.add("atc_cart_btn")
                                        : subButton.classList.add("atc_cart_btn_acw");
                                    subButton.textContent = "Subscribe Now";
                                }
                                if (attMenu) {
                                    attMenu.classList.remove("disable-btn");
                                }
                            }
                            existVal(group);
                            return;
                        }
                    }
                }
            }
            if (atcPrSet) {
                atcPrSet.classList.remove("p" + prod_id);
                atcPrSet.classList.add("p" + newProd["products_id"]);
                atcPrSet.dataset.prodid = newProd["products_id"];
            }
        }

        const obj = event.target;
        obj.dataset.eventLabel =
            "ATC Assessories Product - " + prod_id + " Drop Down Changed New Value " + newProd["products_name"];
        obj.dispatchEvent(window.analyticEvents.button);
    }

    // on change event for subscription Qualityiy change
    if (event.target.matches("#qualityDropdown")) {
        event.preventDefault();
        const qualityDropdown = event.target;

        if (qualityDropdown.closest(".atc_pr_set")) {
            var prod_id = "";
            var group = "";
            var selVal = "";
            var selVal2 = "";
            var typeSelect = "";
            var newProd = [];
            //get product id and group
            prod_id = qualityDropdown.parentNode.parentNode.parentNode.parentNode.dataset.prodid;
            group = qualityDropdown.parentNode.parentNode.parentNode.parentNode.dataset.group;
            //get select box value
            var dropSelect = 1;
            selVal = qualityDropdown.value.replace(/"/g, "&quot;");
            const rcQualityDrop = document.querySelector(".bottom_all_accessories .p" + prod_id + " #qualityDropdown");
            if (rcQualityDrop) {
                rcQualityDrop.value = qualityDropdown.value;
            }
            //get size from old drop down
            const rcDrop2 = document.querySelector(
                ".bottom_all_accessories .p" + prod_id + " .drop_block_not_subscription .dropdown2"
            );
            const cpDrop2 = document.querySelector(
                "#cart_popup .p" + prod_id + " .drop_block_not_subscription .dropdown2"
            );
            if (rcDrop2) {
                selVal2 = rcDrop2.value.replace(/"/g, "&quot;");
            } else if (cpDrop2) {
                selVal2 = cpDrop2.value.replace(/"/g, "&quot;");

                qualityDropdown.dataset.eventLabel = "ATC accessories subscription quality dropdown changed";
                qualityDropdown.dispatchEvent(window.analyticEvents.button);
                window.updateCart();
            }
            //get new product array
            for (var key in accessoriesArray[group]) {
                if (
                    selVal == accessoriesArray[group][key]["attributes_value"] &&
                    selVal2 == accessoriesArray[group][key]["attributes_value2"]
                ) {
                    newProd = accessoriesArray[group][key];
                    break;
                }
            }
            if (Array.isArray(newProd)) {
                if (newProd.length == 0) {
                    for (var key in accessoriesArray[group]) {
                        if (selVal == accessoriesArray[group][key]["attributes_value"]) {
                            newProd = accessoriesArray[group][key];
                            break;
                        }
                    }
                }
            }
            if (Object.keys(newProd).length > 0) {
                // if product exists then new data are added
                var newID = newProd["products_id"];
                var short_name = newProd["working_name_short"];
                var qty_dropdown = newProd["qty_dropdown"];
                const atcPrSet = qualityDropdown.closest(".atc_pr_set");
                if (atcPrSet) {
                    atcPrSet.classList.remove("p" + prod_id);
                    atcPrSet.classList.add("p" + newProd["products_id"]);
                    atcPrSet.dataset.prodid = newProd["products_id"];
                }

                const rcNotSubQualityDrop = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " .drop_block_not_subscription #qualityDropdown"
                );
                const cpNotSubQualityDrop = document.querySelector(
                    "#cart_popup .p" + newID + " .drop_block_not_subscription #qualityDropdown"
                );
                const rcSubQualityDrop = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " .drop_block_subscription #qualityDropdown"
                );
                const cpSubQualityDrop = document.querySelector(
                    "#cart_popup .p" + newID + " .drop_block_subscription #qualityDropdown"
                );
                if (qualityDropdown.closest(".drop_block_subscription")) {
                    if (rcNotSubQualityDrop) {
                        rcNotSubQualityDrop.value = newProd["attributes_value"];
                        rcNotSubQualityDrop.selected = true;
                    }
                    if (cpNotSubQualityDrop) {
                        cpNotSubQualityDrop.value = newProd["attributes_value"];
                        cpNotSubQualityDrop.selected = true;
                    }
                } else {
                    if (rcSubQualityDrop) {
                        rcSubQualityDrop.value = newProd["attributes_value"];
                        rcSubQualityDrop.selected = true;
                    }
                    if (cpSubQualityDrop) {
                        cpSubQualityDrop.value = newProd["attributes_value"];
                        cpSubQualityDrop.selected = true;
                    }
                }

                if (atcPrSet) {
                    const atcImgBlock = atcPrSet.querySelector(".atc_img_block");
                    const atcPrName = atcPrSet.querySelector(".atc_pr_name");
                    const atcPrPriceDiv = atcPrSet.querySelector(".atc_pr_price_div");
                    const atcPrModel = atcPrSet.querySelector(".atc_pr_model");
                    const originalPrice = atcPrSet.querySelector("#originalPrice");
                    if (atcImgBlock) {
                        atcImgBlock.innerHTML =
                            '<a href="' +
                            newProd["prod_link"] +
                            '" title="' +
                            newProd["products_name"] +
                            '"><img width="60px" height="60px" src="/products-image/280/' +
                            newProd["products_bimage"] +
                            '" alt="' +
                            newProd["products_name"] +
                            '"></a>';
                    }
                    if (atcPrName) {
                        atcPrName.innerHTML =
                            '<a href="' +
                            newProd["prod_link"] +
                            '" title="' +
                            newProd["products_name"] +
                            '">' +
                            newProd["products_name"] +
                            "</a>";
                    }
                    if (atcPrPriceDiv) {
                        atcPrPriceDiv.innerHTML =
                            '<div style="font-size:24px; font-weight:bold; margin-bottom:2px;" class="acc_pro_pric" tabindex="0">$' +
                            newProd["products_price"] +
                            "</div>" +
                            newProd["stock_status"];
                    }
                    if (atcPrModel) {
                        atcPrModel.innerHTML = "<span>Model: " + newProd["products_model"] + "</span>";
                    }
                    if (originalPrice) {
                        originalPrice.innerHTML =
                            "<span>$" + newProd["products_price"] + "</span>" + newProd["stock_status"];
                    }
                }

                const radioLabel = document.querySelector(
                    "#cart_popup .p" + newID + " .radioField .firstRadio label span"
                );
                if (radioLabel) {
                    radioLabel.textContent = " - $" + newProd["products_price"];
                }
                const radioField = document.querySelector("#cart_popup .p" + newID + " .radioField");
                if (radioField) {
                    radioField.dataset.pid = newProd["products_id"];
                    radioField.dataset.price = newProd["products_price"];
                }
                const cpFrequencyDiv = document.querySelector("#cart_popup .p" + newID + " #frequencyDiv");
                if (cpFrequencyDiv) {
                    cpFrequencyDiv.dataset.pid = newProd["products_id"];
                }
                const cpQuantityDiv = document.querySelector("#cart_popup .p" + newID + " #quantityDiv");
                if (cpQuantityDiv) {
                    cpQuantityDiv.dataset.pid = newProd["products_id"];
                }
                const cpSubButton = document.querySelector("#cart_popup .p" + newID + " .subButton");
                if (cpSubButton) {
                    cpSubButton.dataset.prodid = newProd["products_id"];
                }
                const cpNotSubDrop = document.querySelector(
                    "#cart_popup .p" + newID + " .drop_block_not_subscription .drop_set .dropdown"
                );
                if (cpNotSubDrop) {
                    cpNotSubDrop.value = newProd["attributes_value"];
                    cpNotSubDrop.selected = true;
                }

                //set quantity selection attribute
                for (var z = 1; z <= 12; z++) {
                    const nthOption = document.querySelector(
                        "#cart_popup .p" +
                            newID +
                            " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                            z +
                            ")"
                    );
                    if (nthOption) {
                        nthOption.textContent =
                            z +
                            " ($" +
                            ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                            "/filter)";
                    }
                }

                //set quantity selection attribute
                if (qty_dropdown > 24) {
                    for (var z = 1; z <= qty_dropdown; z++) {
                        if (!newProd["discount" + z]) {
                            newProd["discount" + z] = newProd["discount13"];
                        }
                        const nthOption = document.querySelector(
                            "#cart_popup .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        if (nthOption) {
                            nthOption.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                    }
                } else if (qty_dropdown <= 24) {
                    for (var z = 1; z <= qty_dropdown; z++) {
                        const nthOption = document.querySelector(
                            "#cart_popup .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        nthOption.textContent =
                            z +
                            " ($" +
                            ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                            "/" +
                            short_name +
                            ")";
                    }
                    const options = Array.from(
                        document.querySelectorAll(
                            "#cart_popup .p" + newID + " .drop_block_subscription #quantityDiv .attributemenu option"
                        )
                    );
                    options.forEach(function (option) {
                        if (option.value > qty_dropdown) {
                            option.remove();
                        }
                    });
                }

                //price block change
                const rcCheckedOption = document.querySelector(
                    ".bottom_all_accessories .p" +
                        newID +
                        " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                );
                var priceText;
                var quantity;
                if (rcCheckedOption) {
                    priceText = rcCheckedOption.textContent;
                    quantity = rcCheckedOption.value;
                }

                const cpCheckedOption = document.querySelector(
                    "#cart_popup .p" + newID + " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                );
                if (qualityDropdown.closest("#cart_popup") && cpCheckedOption) {
                    priceText = cpCheckedOption.textContent;
                    quantity = cpCheckedOption.value;
                }
                var temp = priceText.split("/");
                var price = temp[0].substr(temp[0].lastIndexOf("$") + 1, temp[0].length);
                var finalPrice = (price * quantity).toFixed(2);
                const subPriceSpan = document.querySelector("#cart_popup .p" + newID + " #subPrice span");
                if (subPriceSpan) {
                    subPriceSpan.textContent = "$" + finalPrice;
                }

                const cpAtcAcBtn = document.querySelector("#cart_popup .p" + newID + " .atc_cart_block .atc_ac_btn");
                if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                    // if the selected product is in cart
                    // changes subscribe now button
                    if (cpAtcAcBtn) {
                        cpAtcAcBtn.dataset.prodid = newProd["products_id"];
                        cpAtcAcBtn.classList.remove("atc_cart_btn");
                        cpAtcAcBtn.classList.remove("atc_cart_btn_acw");
                        cpAtcAcBtn.classList.add("atc_cart_btn_in");
                        cpAtcAcBtn.textContent = "In Cart";
                    }
                    if (cpFrequencyDiv) {
                        cpFrequencyDiv.classList.add("disable-btn");
                    }
                    if (cpQuantityDiv) {
                        cpQuantityDiv.classList.add("disable-btn");
                    }
                } else {
                    //changes Add to cart button
                    if (cpAtcAcBtn) {
                        cpAtcAcBtn.dataset.prodid = newProd["products_id"];
                        cpAtcAcBtn.classList.remove("atc_cart_btn_in");
                        storeId != 16
                            ? cpAtcAcBtn.classList.add("atc_cart_btn")
                            : cpAtcAcBtn.classList.add("atc_cart_btn_acw");
                        cpAtcAcBtn.textContent = "Add To Cart";
                    }
                    if (cpFrequencyDiv) {
                        cpFrequencyDiv.classList.remove("disable-btn");
                    }
                    if (cpQuantityDiv) {
                        cpQuantityDiv.classList.remove("disable-btn");
                    }
                    //changes subscribe now button
                    const cpSubButton = document.querySelector("#cart_popup .p" + newID + ".subButton");
                    if (cpSubButton) {
                        cpSubButton.innerHTML = "<span>Subscribe Now </span>";
                    }
                }
            } else {
                // if product does not exist
                // do nothing for now
            }
        } else if (qualityDropdown.closest(".bottom_acc_sub")) {
            var prod_id = "";
            var group = "";
            var selVal = "";
            var selVal2 = "";
            var typeSelect = "";
            var newProd = [];
            //get product id and group
            prod_id = qualityDropdown.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.prodid;
            group = qualityDropdown.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.group; // this is the group from accessoriesArray where product is located
            //get select box value
            var dropSelect = 1;
            selVal = qualityDropdown.value.replace(/"/g, "&quot;");
            const prodIdQualityDropdown = document.querySelector(
                ".bottom_all_accessories .p" + prod_id + " #qualityDropdown"
            );
            if (prodIdQualityDropdown) {
                prodIdQualityDropdown.value = qualityDropdown.value;
            }
            //get size from old drop down
            const rcDropdown2 = document.querySelector(
                ".bottom_all_accessories .p" + prod_id + " .drop_block_not_subscription .dropdown2"
            );
            const cpDropdown2 = document.querySelector(
                "#cart_popup .p" + prod_id + " .drop_block_not_subscription .dropdown2"
            );
            if (rcDropdown2) {
                selVal2 = rcDropdown2.value.replace(/"/g, "&quot;");
            } else if (cpDropdown2) {
                selVal2 = cpDropdown2.value.replace(/"/g, "&quot;");

                qualityDropdown.dataset.eventLabel = "PDP bottom accessories subscription quality dropdown changed";
                qualityDropdown.dispatchEvent(window.analyticEvents.button);
                window.updateCart();
            }
            //get new product array
            for (var key in accessoriesArray[group]) {
                if (
                    selVal == accessoriesArray[group][key]["attributes_value"] &&
                    selVal2 == accessoriesArray[group][key]["attributes_value2"]
                ) {
                    newProd = accessoriesArray[group][key];
                    break;
                }
            }
            if (Array.isArray(newProd)) {
                if (newProd.length == 0) {
                    for (var key in accessoriesArray[group]) {
                        if (selVal == accessoriesArray[group][key]["attributes_value"]) {
                            newProd = accessoriesArray[group][key];
                            break;
                        }
                    }
                }
            }
            if (Object.keys(newProd).length > 0) {
                // if product exists then new data are added
                var newID = newProd["products_id"];
                var short_name = newProd["working_name_short"];
                var qty_dropdown = newProd["qty_dropdown"];
                const bottomPrSet = qualityDropdown.closest(".bottom_pr_set");
                if (bottomPrSet) {
                    bottomPrSet.classList.remove("p" + prod_id);
                    bottomPrSet.classList.add("p" + newProd["products_id"]);
                    bottomPrSet.dataset.prodid = newProd["products_id"];
                }
                if (qualityDropdown.closest(".drop_block_subscription")) {
                    const rcDropdown = document.querySelector(
                        ".bottom_all_accessories .p" + newID + " .drop_block_not_subscription #qualityDropdown"
                    );
                    const cpDropdown = document.querySelector(
                        "#cart_popup .p" + newID + " .drop_block_not_subscription #qualityDropdown"
                    );
                    if (rcDropdown) {
                        rcDropdown.value = newProd["attributes_value"];
                        rcDropdown.selected = true;
                    }
                    if (cpDropdown) {
                        cpDropdown.value = newProd["attributes_value"];
                        cpDropdown.selected = true;
                    }
                } else {
                    const rcDropdown = document.querySelector(
                        ".bottom_all_accessories .p" + newID + " .drop_block_subscription #qualityDropdown"
                    );
                    const cpDropdown = document.querySelector(
                        "#cart_popup .p" + newID + " .drop_block_subscription #qualityDropdown"
                    );
                    if (rcDropdown) {
                        rcDropdown.value = newProd["attributes_value"];
                        rcDropdown.selected = true;
                    }
                    if (cpDropdown) {
                        cpDropdown.value = newProd["attributes_value"];
                        cpDropdown.selected = true;
                    }
                }

                if (bottomPrSet) {
                    const bottomImgBlock = bottomPrSet.querySelector(".bottom_img_block");
                    if (bottomImgBlock) {
                        bottomImgBlock.innerHTML =
                            '<a href="' +
                            newProd["prod_link"] +
                            '" title="' +
                            newProd["products_name"] +
                            '"><img width="75px" height="75px" src="/products-image/280/' +
                            (newProd["products_bimage"] && newProd["products_bimage"] != ""
                                ? newProd["products_bimage"]
                                : "product_0_125.gif") +
                            '" alt="' +
                            newProd["products_name"] +
                            '"></a>';
                    }
                    const bottomPrName = bottomPrSet.querySelector(".bottom_pr_name");
                    if (bottomPrName) {
                        bottomPrName.innerHTML =
                            '<a href="' +
                            newProd["prod_link"] +
                            '" title="' +
                            newProd["products_name"] +
                            '">' +
                            newProd["products_name"] +
                            "</a>";
                    }
                    const bottomPrPriceDiv = bottomPrSet.querySelector(".bottom_pr_price_div");
                    if (bottomPrPriceDiv) {
                        bottomPrPriceDiv.innerHTML =
                            '<div class="font-size-18 font-weight-bold mb-2">$' +
                            newProd["products_price"] +
                            "</div>" +
                            (newProd["stock_status"] != "Sold Out" &&
                            newProd["stock_status"] != "Product Discontinued" &&
                            newProd["stock_status"] != "Out of Stock" &&
                            newProd["stock_status"] != "Comming Soon"
                                ? newProd["stock_status"]
                                : "");
                    }
                    const bottomPrModel = bottomPrSet.querySelector(".bottom_pr_model");
                    if (bottomPrModel) {
                        bottomPrModel.innerHTML = "<span>Model: " + newProd["products_model"] + "</span>";
                    }
                    const originalPrice = bottomPrSet.querySelector("#originalPrice");
                    if (originalPrice) {
                        originalPrice.innerHTML =
                            "<span>$" + newProd["products_price"] + "</span>" + newProd["stock_status"];
                    }
                    const bottomCartNoSub = bottomPrSet.querySelector(".bottom_cart_nosub");
                    if (bottomCartNoSub) {
                        const priceBlock = bottomCartNoSub.querySelector(".price_block");
                        if (priceBlock) {
                            priceBlock.innerHTML =
                                "<span>$" + newProd["products_price"] + "</span>" + newProd["stock_status"];
                        }
                    }
                }

                const baaLabelSpan = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " .radioField .firstRadio label span"
                );
                if (baaLabelSpan) {
                    baaLabelSpan.textContent = " - $" + newProd["products_price"];
                }
                const baaRadioField = document.querySelector(".bottom_all_accessories .p" + newID + " .radioField");
                if (baaRadioField) {
                    baaRadioField.dataset.pid = newProd["products_id"];
                    baaRadioField.dataset.price = newProd["products_price"];
                }
                const baaFrequencyDiv = document.querySelector(".bottom_all_accessories .p" + newID + " #frequencyDiv");
                if (baaFrequencyDiv) {
                    baaFrequencyDiv.dataset.pid = newProd["products_id"];
                }
                const baaQuantityDiv = document.querySelector(".bottom_all_accessories .p" + newID + " #quantityDiv");
                if (baaQuantityDiv) {
                    baaQuantityDiv.dataset.pid = newProd["products_id"];
                }
                const baaSubButton = document.querySelector(".bottom_all_accessories .p" + newID + " .subButton");
                if (baaSubButton) {
                    baaSubButton.dataset.prodid = newProd["products_id"];
                }
                const baaDropdown = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " .drop_block_not_subscription .drop_set .dropdown"
                );
                if (baaDropdown) {
                    baaDropdown.value = newProd["attributes_value"];
                    baaDropdown.selected = true;
                }
                //set quantity selection attribute
                for (var z = 1; z <= 12; z++) {
                    const option = document.querySelector(
                        ".bottom_all_accessories .p" +
                            newID +
                            " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                            z +
                            ")"
                    );
                    if (option) {
                        option.textContent =
                            z +
                            " ($" +
                            ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                            "/filter)";
                    }
                }
                //set quantity selection attribute
                if (qty_dropdown > 24) {
                    for (var z = 1; z <= qty_dropdown; z++) {
                        if (!newProd["discount" + z]) {
                            newProd["discount" + z] = newProd["discount13"];
                        }
                        const option = document.querySelector(
                            ".bottom_all_accessories .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        if (option) {
                            option.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                    }
                } else if (qty_dropdown <= 24) {
                    for (var z = 1; z <= qty_dropdown; z++) {
                        const option = document.querySelector(
                            ".bottom_all_accessories .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        if (option) {
                            option.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                    }
                    const options = Array.from(
                        document.querySelectorAll(
                            ".bottom_all_accessories .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option"
                        )
                    );
                    options.forEach(function (option) {
                        if (option.value > qty_dropdown) {
                            option.remove();
                        }
                    });
                }
                //price block change
                const rcCheckedOption = document.querySelector(
                    ".bottom_all_accessories .p" +
                        newID +
                        " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                );
                var priceText;
                var quantity;
                if (rcCheckedOption) {
                    priceText = rcCheckedOption.textContent;
                    quantity = rcCheckedOption.value;
                }
                if (qualityDropdown.closest(".bottom_all_accessories")) {
                    const baaCheckedOption = document.querySelector(
                        ".bottom_all_accessories .p" +
                            newID +
                            " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                    );
                    if (baaCheckedOption) {
                        priceText = baaCheckedOption.textContent;
                        quantity = baaCheckedOption.value;
                    }
                }
                var temp = priceText.split("/");
                var price = temp[0].substr(temp[0].lastIndexOf("$") + 1, temp[0].length);
                var finalPrice = (price * quantity).toFixed(2);
                const baaSubPriceSpan = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " #subPrice span"
                );
                if (baaSubPriceSpan) {
                    baaSubPriceSpan.textContent = "$" + finalPrice;
                }

                const baaAtcAcBtn = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " .atc_cart_block .atc_ac_btn"
                );
                if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                    // if the selected product is in cart
                    // changes subscribe now button
                    if (baaAtcAcBtn) {
                        baaAtcAcBtn.dataset.prodid = newProd["products_id"];
                        baaAtcAcBtn.classList.remove("atc_cart_btn");
                        baaAtcAcBtn.classList.remove("atc_cart_btn_acw");
                        baaAtcAcBtn.classList.add("atc_cart_btn_in");
                        baaAtcAcBtn.textContent = "In Cart";
                    }
                    if (baaFrequencyDiv) {
                        baaFrequencyDiv.classList.add("disable-btn");
                    }
                    if (baaQuantityDiv) {
                        baaQuantityDiv.classList.add("disable-btn");
                    }
                } else {
                    //changes Add to cart button
                    if (baaAtcAcBtn) {
                        baaAtcAcBtn.dataset.prodid = newProd["products_id"];
                        baaAtcAcBtn.classList.remove("atc_cart_btn_in");
                        storeId != 16
                            ? baaAtcAcBtn.classList.add("atc_cart_btn")
                            : baaAtcAcBtn.classList.add("atc_cart_btn_acw");
                        baaAtcAcBtn.textContent = "Add To Cart";
                    }
                    if (baaFrequencyDiv) {
                        baaFrequencyDiv.classList.remove("disable-btn");
                    }
                    if (baaQuantityDiv) {
                        baaQuantityDiv.classList.remove("disable-btn");
                    }
                    //changes subscribe now button
                    const baaSubButton = document.querySelector(".bottom_all_accessories .p" + newID + ".subButton");
                    if (baaSubButton) {
                        baaSubButton.innerHTML = "<span>Subscribe Now </span>";
                    }
                }
            } else {
                // if product does not exist
                // do nothing for now
            }
        } else {
            var prod_id = "";
            var group = "";
            var selVal = "";
            var selVal2 = "";
            var typeSelect = "";
            var newProd = [];
            //get product id and group

            prod_id = qualityDropdown.parentNode.parentNode.parentNode.parentNode.dataset.prodid;
            group = qualityDropdown.parentNode.parentNode.parentNode.parentNode.dataset.group; // this is the group from accessoriesArray where product is located
            //get select box value
            var dropSelect = 1;
            selVal = qualityDropdown.value.replace(/"/g, "&quot;");
            const dropdown = document.querySelector(".bottom_all_accessories .p" + prod_id + " #qualityDropdown");
            if (dropdown) {
                dropdown.value = qualityDropdown.value;
            }
            //get size from old drop down
            const rcDropdown2 = document.querySelector(
                ".bottom_all_accessories .p" + prod_id + " .drop_block_not_subscription .dropdown2"
            );
            const cpDropdown2 = document.querySelector(
                "#cart_popup .p" + prod_id + " .drop_block_not_subscription .dropdown2"
            );
            if (rcDropdown2) {
                selVal2 = rcDropdown2.value.replace(/"/g, "&quot;");
            } else if (cpDropdown2) {
                selVal2 = cpDropdown2.value.replace(/"/g, "&quot;");
            }
            //get new product array
            for (var key in accessoriesArray[group]) {
                if (
                    selVal == accessoriesArray[group][key]["attributes_value"] &&
                    selVal2 == accessoriesArray[group][key]["attributes_value2"]
                ) {
                    newProd = accessoriesArray[group][key];
                    break;
                }
            }
            if (Array.isArray(newProd)) {
                if (newProd.length == 0) {
                    for (var key in accessoriesArray[group]) {
                        if (selVal == accessoriesArray[group][key]["attributes_value"]) {
                            newProd = accessoriesArray[group][key];
                            break;
                        }
                    }
                }
            }
            if (Object.keys(newProd).length > 0) {
                // if product exists then new data are added
                var newID = newProd["products_id"];
                var short_name = newProd["working_name_short"];
                var qty_dropdown = newProd["qty_dropdown"];
                const rcProduct = document.querySelector(".bottom_all_accessories .p" + prod_id);
                const cpProduct = document.querySelector(".bottom_all_accessories .p" + prod_id);
                if (rcProduct) {
                    rcProduct.classList.remove("p" + prod_id);
                    rcProduct.classList.add("p" + newProd["products_id"]);
                }
                if (cpProduct) {
                    cpProduct.classList.remove("p" + prod_id);
                    cpProduct.classList.add("p" + newProd["products_id"]);
                }
                if (qualityDropdown.closest(".drop_block_subscription")) {
                    const rcNotSubQualityDrop = document.querySelector(
                        ".bottom_all_accessories .p" + newID + " .drop_block_not_subscription #qualityDropdown"
                    );
                    const cpNotSubQualityDrop = document.querySelector(
                        "#cart_popup .p" + newID + " .drop_block_not_subscription #qualityDropdown"
                    );
                    if (rcNotSubQualityDrop) {
                        rcNotSubQualityDrop.value = newProd["attributes_value"];
                        rcNotSubQualityDrop.selected = true;
                    }
                    if (cpNotSubQualityDrop) {
                        cpNotSubQualityDrop.value = newProd["attributes_value"];
                        cpNotSubQualityDrop.selected = true;
                    }
                } else {
                    const rcSubQualityDrop = document.querySelector(
                        ".bottom_all_accessories .p" + newID + " .drop_block_subscription #qualityDropdown"
                    );
                    const cpSubQualityDrop = document.querySelector(
                        "#cart_popup .p" + newID + " .drop_block_subscription #qualityDropdown"
                    );
                    if (rcSubQualityDrop) {
                        rcSubQualityDrop.value = newProd["attributes_value"];
                        rcSubQualityDrop.selected = true;
                    }
                    if (cpSubQualityDrop) {
                        cpSubQualityDrop.value = newProd["attributes_value"];
                        cpSubQualityDrop.selected = true;
                    }
                }
                const rcImgBlock = document.querySelector(".bottom_all_accessories .p" + newID + " .bottom_img_block");
                const cpImgBlock = document.querySelector("#cart_popup .p" + newID + " .bottom_img_block");
                if (rcImgBlock) {
                    rcImgBlock.innerHTML =
                        '<a href="' +
                        newProd["prod_link"] +
                        '" title="' +
                        newProd["products_name"] +
                        '"><img src="/products-image/280/' +
                        newProd["products_bimage"] +
                        '" alt="' +
                        newProd["products_name"] +
                        '"></a>';
                }
                if (cpImgBlock) {
                    cpImgBlock.innerHTML =
                        '<a href="' +
                        newProd["prod_link"] +
                        '" title="' +
                        newProd["products_name"] +
                        '"><img src="/products-image/280/' +
                        newProd["products_bimage"] +
                        '" alt="' +
                        newProd["products_name"] +
                        '"></a>';
                }
                const stockText = document.querySelector("#cart_popup .p" + newID + "  #originalPrice .stockText");
                if (stockText) {
                    stockText.style.margin = "0";
                }
                const rcRadioSpan = document.querySelector(
                    ".bottom_all_accessories .p" + newID + " .radioField .firstRadio label span"
                );
                const cpRadioSpan = document.querySelector(
                    "#cart_popup .p" + newID + " .radioField .firstRadio label span"
                );
                if (rcRadioSpan) {
                    rcRadioSpan.textContent = " - $" + newProd["products_price"];
                }
                if (cpRadioSpan) {
                    cpRadioSpan.textContent = " - $" + newProd["products_price"];
                }
                const rcRadioField = document.querySelector(".bottom_all_accessories .p" + newID + " .radioField");
                const cpRadioField = document.querySelector("#cart_popup .p" + newID + " .radioField");
                if (rcRadioField) {
                    rcRadioField.dataset.pid = newProd["products_id"];
                    rcRadioField.dataset.price = newProd["products_price"];
                }
                if (cpRadioField) {
                    cpRadioField.dataset.pid = newProd["products_id"];
                    cpRadioField.dataset.price = newProd["products_price"];
                }
                const divArray = [
                    document.querySelector(".bottom_all_accessories .p" + newID + " #frequencyDiv"),
                    document.querySelector("#cart_popup .p" + newID + " #frequencyDiv"),
                    document.querySelector(".bottom_all_accessories .p" + newID + " #quantityDiv"),
                    document.querySelector("#cart_popup .p" + newID + " #quantityDiv"),
                ];
                divArray.forEach(function (element) {
                    if (element) {
                        element.dataset.pid = newProd["products_id"];
                    }
                });
                const rcSubButton = document.querySelector(".bottom_all_accessories .p" + newID + " .subButton");
                const cpSubButton = document.querySelector("#cart_popup .p" + newID + " .subButton");
                if (rcSubButton) {
                    rcSubButton.dataset.prodid = newProd["products_id"];
                }
                if (cpSubButton) {
                    cpSubButton.dataset.prodid = newProd["products_id"];
                }
                //set quantity selection attribute
                for (var z = 1; z <= 12; z++) {
                    const rcOption = document.querySelector(
                        ".bottom_all_accessories .p" +
                            newID +
                            " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                            z +
                            ")"
                    );
                    const cpOption = document.querySelector(
                        "#cart_popup .p" +
                            newID +
                            " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                            z +
                            ")"
                    );
                    if (rcOption) {
                        rcOption.textContent =
                            z +
                            " ($" +
                            ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                            "/filter)";
                    }
                    if (cpOption) {
                        cpOption.textContent =
                            z +
                            " ($" +
                            ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                            "/filter)";
                    }
                }
                //set quantity selection attribute
                if (qty_dropdown > 24) {
                    for (var z = 1; z <= qty_dropdown; z++) {
                        if (!newProd["discount" + z]) {
                            newProd["discount" + z] = newProd["discount13"];
                        }
                        const rcOption = document.querySelector(
                            ".bottom_all_accessories .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        const cpOption = document.querySelector(
                            "#cart_popup .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        if (rcOption) {
                            rcOption.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                        if (cpOption) {
                            cpOption.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                    }
                } else if (qty_dropdown <= 24) {
                    for (var z = 1; z <= qty_dropdown; z++) {
                        const rcOption = document.querySelector(
                            ".bottom_all_accessories .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        const cpOption = document.querySelector(
                            "#cart_popup .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option:nth-child(" +
                                z +
                                ")"
                        );
                        if (rcOption) {
                            rcOption.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                        if (cpOption) {
                            cpOption.textContent =
                                z +
                                " ($" +
                                ((newProd["products_price"] * (100 - newProd["discount" + z])) / 100).toFixed(2) +
                                "/" +
                                short_name +
                                ")";
                        }
                    }
                    const rcOptions = Array.from(
                        document.querySelectorAll(
                            ".bottom_all_accessories .p" +
                                newID +
                                " .drop_block_subscription #quantityDiv .attributemenu option"
                        )
                    );
                    rcOptions.forEach(function (option) {
                        if (parseInt(option.value > qty_dropdown)) {
                            option.remove();
                        }
                    });
                    const cpOptions = Array.from(
                        document.querySelectorAll(
                            "#cart_popup .p" + newID + " .drop_block_subscription #quantityDiv .attributemenu option"
                        )
                    );
                    cpOptions.forEach(function (option) {
                        if (option.value > qty_dropdown) {
                            option.remove();
                        }
                    });
                }
                //price block change
                const rcCheckedOption = document.querySelector(
                    ".bottom_all_accessories .p" +
                        newID +
                        " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                );
                var priceText;
                var quantity;
                if (rcCheckedOption) {
                    priceText = rcCheckedOption.textContent;
                    quantity = rcCheckedOption.value;
                }
                if (qualityDropdown.closest("#cart_popup")) {
                    const cpCheckedOption = document.querySelector(
                        "#cart_popup .p" +
                            newID +
                            " .drop_block_subscription #quantityDiv .attributemenu option:checked"
                    );
                    if (cpCheckedOption) {
                        priceText = cpCheckedOption.textContent;
                        quantity = cpCheckedOption.value;
                    }
                }
                var temp = priceText.split("/");
                var price = temp[0].substr(temp[0].lastIndexOf("$") + 1, temp[0].length);
                var finalPrice = (price * quantity).toFixed(2);
                const rcSubPrice = document.querySelector(".bottom_all_accessories .p" + newID + " #subPrice span");
                const cpSubPrice = document.querySelector("#cart_popup .p" + newID + " #subPrice span");
                if (rcSubPrice) {
                    rcSubPrice.textContent = "$" + finalPrice;
                }
                if (cpSubPrice) {
                    cpSubPrice.textContent = "$" + finalPrice;
                }

                const rcFrequencyDiv = document.querySelector(".bottom_all_accessories .p" + newID + " #frequencyDiv");
                const rcQuantityDiv = document.querySelector(".bottom_all_accessories .p" + newID + " #quantityDiv");
                const cpFrequencyDiv = document.querySelector("#cart_popup .p" + newID + " #frequencyDiv");
                const cpQuantityDiv = document.querySelector("#cart_popup .p" + newID + " #quantityDiv");
                if (accessoriesArray["incart"].indexOf(newProd["products_id"].toString()) > -1) {
                    // if the selected product is in cart
                    // changes subscribe now button
                    if (rcFrequencyDiv) {
                        rcFrequencyDiv.classList.add("disable-btn");
                    }
                    if (rcQuantityDiv) {
                        rcQuantityDiv.classList.add("disable-btn");
                    }
                    if (cpFrequencyDiv) {
                        cpFrequencyDiv.classList.add("disable-btn");
                    }
                    if (cpQuantityDiv) {
                        cpQuantityDiv.classList.add("disable-btn");
                    }
                } else {
                    //changes Add to cart button
                    if (rcFrequencyDiv) {
                        rcFrequencyDiv.classList.remove("disable-btn");
                    }
                    if (rcQuantityDiv) {
                        rcQuantityDiv.classList.remove("disable-btn");
                    }
                    if (cpFrequencyDiv) {
                        cpFrequencyDiv.classList.remove("disable-btn");
                    }
                    if (cpQuantityDiv) {
                        cpQuantityDiv.classList.remove("disable-btn");
                    }
                }
            } else {
                // if product does not exist
                // do nothing for now
            }
        }
    }

    if (event.target.matches(".atc_all_accessories .radioField input[type=radio][name=subscription]")) {
        const radio = event.target;
        const id = radio.closest("[data-pid]").dataset.pid;
        onRadioChangeATC(id);

        const checked = document.querySelector(".atc_all_accessories .p" + id + " input[name=subscription]:checked");
        let subscription;
        if (checked) {
            subscription = checked.value;
        }
        if (subscription == "no") {
            radio.dataset.eventLabel = "ATC accessories subscription radio clicked - unselected subscription";
            radio.dispatchEvent(window.analyticEvents.button);
        } else {
            radio.dataset.eventLabel = "ATC accessories subscription radio clicked - selected subscription";
            radio.dispatchEvent(window.analyticEvents.button);
        }
        window.updateCart();
    }

    if (event.target.matches(".bottom_all_accessories .radioField input[type=radio][name=subscription]")) {
        const radio = event.target;
        const id = radio.closest("[data-pid]").dataset.pid;
        onRadioChangeBottom(id);

        const checked = document.querySelector(".bottom_all_accessories .p" + id + " input[name=subscription]:checked");
        let subscription;
        if (checked) {
            subscription = checked.value;
        }
        if (subscription == "no") {
            radio.dataset.eventLabel = "PDP Bottom accessories subscription radio clicked - unselected subscription";
            radio.dispatchEvent(window.analyticEvents.button);
        } else {
            radio.dataset.eventLabel = "PDP Bottom accessories subscription radio clicked - selected subscription";
            radio.dispatchEvent(window.analyticEvents.button);
        }
    }

    if (event.target.matches("#frequencyDiv select")) {
        const frequencySelect = event.target;
        const closest = frequencySelect.closest("[data-pid]");
        let id;
        if (closest) {
            id = closest.dataset.pid;
        }
        if (frequencySelect.closest("#cart_popup")) {
            const rcFrequencySelect = document.querySelector(
                ".bottom_all_accessories .p" + id + " #frequencyDiv select"
            );
            const cpFrequencySelect = document.querySelector("#cart_popup .p" + id + " #frequencyDiv select");
            if (rcFrequencySelect && cpFrequencySelect) {
                rcFrequencySelect.value = cpFrequencySelect.value;
            }
            frequencySelect.dataset.eventLabel = "ATC accessories subscription frequency dropdown changed";
            frequencySelect.dispatchEvent(window.analyticEvents.button);
            window.updateCart();
        }
        const rcStockText = document.querySelector(".bottom_all_accessories .p" + id + " #subPrice .stockText");
        const cpStockText = document.querySelector("#cart_popup .p" + id + " #subPrice .stockText");
        if (rcStockText) {
            if (frequencySelect.value == 1) {
                rcStockText.textContent = "Every month";
            } else {
                rcStockText.textContent = "Every " + frequencySelect.value + " months";
            }
        }
        if (cpStockText) {
            if (frequencySelect.value == 1) {
                cpStockText.textContent = "Every month";
            } else {
                cpStockText.textContent = "Every " + frequencySelect.value + " months";
            }
        }
    }

    if (event.target.matches(".drop_block_subscription #quantityDiv select")) {
        const quantitySelect = event.target;
        const id = quantitySelect.closest("[data-pid]").dataset.pid;
        var priceText;
        var quantity;
        const rcCheckedOption = document.querySelector(
            ".bottom_all_accessories .p" + id + " .drop_block_subscription #quantityDiv select option:checked"
        );
        if (quantitySelect.closest(".bottom_all_accessories")) {
            if (rcCheckedOption) {
                priceText = rcCheckedOption.textContent;
                quantity = rcCheckedOption.value;
            }
        } else if (quantitySelect.closest("#cart_popup")) {
            const cpCheckedOption = document.querySelector(
                "#cart_popup .p" + id + " .drop_block_subscription #quantityDiv select option:checked"
            );
            if (rcCheckedOption && cpCheckedOption) {
                rcCheckedOption.value = cpCheckedOption.value;
            }
            if (cpCheckedOption) {
                priceText = cpCheckedOption.textContent;
                quantity = cpCheckedOption.value;
            }

            quantitySelect.dataset.eventLabel = "ATC accessories subscription quantity dropdown changed";
            quantitySelect.dispatchEvent(window.analyticEvents.button);
            window.updateCart();
        }
        var temp = priceText.split("/");
        var price = temp[0].substr(temp[0].lastIndexOf("$") + 1, temp[0].length);
        const rcSubPrice = document.querySelector(".bottom_all_accessories .p" + id + " #subPrice span");
        const cpSubPrice = document.querySelector("#cart_popup .p" + id + " #subPrice span");
        if (rcSubPrice) {
            rcSubPrice.textContent = "$" + (price * quantity).toFixed(2);
        }
        if (cpSubPrice) {
            cpSubPrice.textContent = "$" + (price * quantity).toFixed(2);
        }
    }
});

document.addEventListener("DOMContentLoaded", function (event) {
    const bottomAddAll =
        storeId != 16 ? document.querySelector(".bottom_add_all") : document.querySelector(".add_all_r");
    if (bottomAddAll) {
        bottomAddAll.addEventListener(
            "click",
            function (event) {
                event.stopImmediatePropagation();
                let prod_id = "";
                let number = 0;
                const rAccessories = Array.from(document.querySelectorAll(".bottom_r_accessories .bottom_cart_btn"));
                rAccessories.forEach((accessory) => {
                    if (prod_id == "") {
                        prod_id = accessory.dataset.prodid;
                    } else {
                        prod_id += "," + accessory.dataset.prodid;
                    }

                    accessory.classList.add("bottom_cart_btn_in");
                    accessory.textContent = "In Cart";
                    accessory.classList.remove("bottom_cart_btn");
                    if (storeId != 16) {
                        accessory.classList.add("font-colors-gray-dark");
                        accessory.classList.remove("font-colors-green-text");
                    }
                });
                cartAllAjax(prod_id);

                if (storeId != 16) {
                    bottomAddAll.classList.add("bottom_cart_btn_in");
                    bottomAddAll.classList.remove("bottom_cart_btn", "font-colors-green-text");
                    bottomAddAll.classList.add("font-colors-gray-dark");
                } else {
                    bottomAddAll.classList.add("goToCart");
                }
                bottomAddAll.textContent = "All Required Accessories In Cart";
                bottomAddAll.dataset.eventLabel = "pdp bottom add all required accessories clicked";
                bottomAddAll.dispatchEvent(window.analyticEvents.button);
            },
            { once: true }
        );
    }
});
