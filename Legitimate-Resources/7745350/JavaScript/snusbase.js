// Last deploy: html_table_search
// New deploy: html_combo_search

let startSearch = function () {
    //var el = document.getElementById('search_res');
    //el.innerHTML = '<div style="text-align:center;"><img src="/img/svgs/loading_desktop_full.svg" width="100%"></div>';
}

let e = function(html) {
    try {
        return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    } catch {
        return html;
    }
}

let combo_v2_expand = function (dataset) {
    document.getElementById(dataset).className += ' opened_combo';
    document.getElementById(dataset).onclick = '';
    document.getElementById("expand_"+dataset).remove();

    var el = document.getElementById('combolist_res_'+dataset);
    el.style.display = 'block';

}

let combo_v2 = async function (term) {
    let results = await fetch('https://beta.snusbase.com/v2/combo/' + term, {headers: {authorization: 'none'}}).then(function(response){ return response.json(); }).catch((err) => console.error(err));
    return results
}

let combo_v2_parse = async function (term, original) {
    let res = await combo_v2(term)
    console.log('New count:', res.size + original)
    document.getElementById('result_count').innerHTML = (res.size + original)
    document.getElementById('combolists').innerHTML = '';
    let comboel = document.getElementById('combolists')
    Object.keys(res.result).forEach(el => {
        let s_or_nah = 'results'
        if(res.result[el].length < 2) s_or_nah = 'result'
        comboel.innerHTML += '<div class="searchtools combo" id="'+el+'" onclick="combo_v2_expand(\''+el+'\')"><div class="topbar">'+el.toUpperCase()+' - '+res.result[el].length+' '+s_or_nah+'</div><div class="combolist_res" style="display: none;" id="combolist_res_'+el+'"></div><div id="expand_'+el+'" class="expand">(click to expand)</div></div>';
        res.result[el].forEach(element => {
            document.getElementById('combolist_res_'+el).innerHTML += '<div>'+e(element.username)+'<span class="combo_sep"> </span>'+e(element.password)+'</div>'
        })
    })
}

let getComboCounts = function (term, originalResults, apikey = null) {
    var exploitin = fetch('https://api.snusbase.com/combo/exploitin/' + term).then(function(response){ return response.json(); });
    var antipublic = fetch('https://api.snusbase.com/combo/antipublic/' + term).then(function(response){ return response.json(); });

    Promise.all([exploitin,antipublic]).then(function(results){
        results["exploitin"] = results[0];
        results["antipublic"] = results[1];
        console.log(results);

        var comboel = document.getElementById('combolists');
        
        if(results.antipublic.result_count >= 1) {
            comboel.innerHTML += '<div class="searchtools combo" id="antipublic" onclick="expandCombolists(\''+term+'\', \'antipublic\')"><div class="topbar">ANTIPUBLIC_2B_COMBOLIST_2018 - '+results.antipublic.result_count+' results</div><div class="combolist_res" style="display: none;" id="combolist_res_antipublic"></div><div id="expand_antipublic" class="expand">(click to expand)</div></div>';
            results.antipublic.results.forEach(element => {
                document.getElementById('combolist_res_antipublic').innerHTML += '<div>'+e(element.email)+':'+e(element.password)+'</div>'
            });
        }
        if(results.exploitin.result_count >= 1) {
            comboel.innerHTML += '<div class="searchtools combo" id="exploitin" onclick="expandCombolists(\''+term+'\', \'exploitin\')"><div class="topbar">EXPLOITIN_805M_COMBOLIST_2016 - '+results.exploitin.result_count+' results</div><div class="combolist_res" style="display: none;" id="combolist_res_exploitin"></div><div id="expand_exploitin" class="expand">(click to expand)</div></div>';
            results.exploitin.results.forEach(element => {
                document.getElementById('combolist_res_exploitin').innerHTML += '<div>'+e(element.email)+':'+e(element.password)+'</div>'
            });
        }

        resultCount = (results.antipublic.result_count + results.exploitin.result_count);
        
        if(results.exploitin.result_count >= 1 && results.antipublic.result_count >= 1) {
            $("#result_count").replaceWith('<span id="result_count">'+(originalResults + resultCount)+'</span>');
        } else if(results.exploitin.result_count >= 1) {
            $("#result_count").replaceWith('<span id="result_count">'+(originalResults + results.exploitin.result_count)+'</span>');
        } else if(results.antipublic.result_count >= 1) {
            $("#result_count").replaceWith('<span id="result_count">'+(originalResults + results.antipublic.result_count)+'</span>');
        }

    });
}

let expandCombolists = function (term, dataset, apikey = null) {
    document.getElementById(dataset).className += ' opened_combo';
    document.getElementById(dataset).onclick = '';
    document.getElementById("expand_"+dataset).remove();

    var el = document.getElementById('combolist_res_'+dataset);
    el.style.display = 'block';

}

let crack = function (identifier, hash) {
    crackSB1(identifier, hash)
}

let crackSB1 = function (identifier, hash) {
    var url = 'https://beta.snusbase.com/v1/sbhash/' + hash;
    var searchid = 'result' + identifier;
    var buttonid = 'bresult' + identifier;

    if(!$('#'+buttonid).hasClass('b_disabled')) {

        $('#'+buttonid).addClass('b_disabled');
        document.getElementById(buttonid).innerHTML = 'Cracking..';

        fetch(url).then(function(response) {
            return response.json();
        }).then(function(response) {
            content = '<tr><td class="cracked_password">Password </td><td class="datatable cracked_password">' + e(response['password']) + '</td></tr>';
            if(response.found) {
                $('#'+searchid).append(content);
                document.getElementById(buttonid).innerHTML = 'Cracked';
                document.getElementById(buttonid).remove()
            } else if(!response.found) {
                document.getElementById(buttonid).innerHTML = 'Not Found';
            } else {
                console.log('err: ' + response);
                document.getElementById(buttonid).innerHTML = 'Error';
            }
        });
    }
}

let ipWhois = function (address) {
    var url = 'https://api.snusbase.com/v2/ipwhois/'+address;

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(response) {
        console.log(response);
    })
}

let viewMore = function (query, checksum) {
    var url = 'https://beta.snusbase.com/v1/more';

    fetch(url).then(function(response) {
        return response.json();
    }).then(function(res) {
        res.response.forEach(element => {
            if(element.checksum == checksum) {
                var el = document.getElementById(element.checksum).childNodes[0];
                var data = '<tbody>';
                delete element.username;delete element.email;delete element.lastip;delete element.hash;delete element.hash;delete element.salt;delete element.password;delete element.name;
                for (let key of Object.keys(element)) {
                    if(element[key] && element[key] !== '' && element[key] !== null && element[key] !== 'null' && element[key] !== undefined && key !== 'checksum') {
                        data += '<tr><td>'+e(key)+' </td><td class="datatable">'+e(element[key])+'</td>';
                    }
                }
                data += '</tbody>';
                el.innerHTML = el.innerHTML + data;
            }
        });
    })
}

let full = function (query, checksum, button) {
    console.log(query)
    console.log(window.atob(query))
    var query = window.atob(query)
    button.innerHTML = 'Loading...'
    fetch('https://beta.snusbase.com/v1/more', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: query
    }).then((response) => response.json()).then((res) => {
        console.log(res)
        res.response.forEach(el => {
            button.remove()
            console.log(el)
            if(el.checksum == checksum) {
                var element = document.getElementById(el.checksum).childNodes[0];
                var data = '';
                delete el.username;delete el.email;delete el.lastip;delete el.hash;delete el.hash;delete el.salt;delete el.password;delete el.name;
                for (let key of Object.keys(el)) {
                    if(el[key] && el[key] !== '' && el[key] !== null && el[key] !== 'null' && el[key] !== undefined && key !== 'checksum') {
                        data += '<tr><td>'+e(key)+' </td><td class="datatable">'+e(el[key])+'</td>';
                    }
                }
                element.innerHTML = element.innerHTML + data;
                if(element.querySelector('.xhash')) {
                    element.querySelector('.xhash').onclick = function (el) {
                        load_pass(el.srcElement, el.srcElement.innerHTML)
                }}
                if(element.querySelector('.xlastip')) {
                    element.querySelector('.xlastip').onclick = function (el) {
                    load_ipwhois(el.srcElement)
                }}
            }
        });
    }).catch((err) => console.error(err))
}

window.onload = function (e) {
    if(window.location.pathname && window.location.pathname == '/search') {
        var formel = document.getElementById('searchform');
        if(formel.addEventListener){
            formel.addEventListener("submit", startSearch, false);
        }else if(formel.attachEvent){
            formel.attachEvent('onsubmit', startSearch);
        }
    }

    $("input[type='checkbox']").change(function(){
        if($(this).is(":checked")){
            $(this).parent().addClass("sb_checkbox_checked"); 
        }else{
            $(this).parent().removeClass("sb_checkbox_checked");  
        }
    });
}
