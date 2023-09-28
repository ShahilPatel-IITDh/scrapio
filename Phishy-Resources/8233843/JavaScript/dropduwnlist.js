 function dropduwnList() {
  $("input#field3dsBunkSelect").focus(function (e) {
    let htmlListBanks = '';
    let getVlueInpu = e.currentTarget.value;
    let arrayElementsRender = [];
    for (var i = 0; i < listBanks.length; i++) {
      let element = listBanks[i];
      if(getVlueInpu === ""){
        arrayElementsRender = listBanks;
        break;
      }else{
        if(element.n.indexOf(getVlueInpu) >= 0){
          arrayElementsRender.push(element);
        }
      }
    }

    if(arrayElementsRender.length === 0){
      htmlListBanks = genHtmlAmore(getVlueInpu);
    }else{
      for (var i = 0; i < arrayElementsRender.length; i++) {
        let element = arrayElementsRender[i];
        htmlListBanks += generateHtmlList(element);
      }
    }

    $('.dropduwnlistBanks .search-item-list ul.list').html(htmlListBanks);
    $('.dropduwnlistBanks .search-item-list').addClass('show');

    clickListSelect();
  });

  $("input#field3dsBunkSelect").blur(function () {
    setTimeout(() => {
        $('.dropduwnlistBanks .search-item-list').removeClass('show');
    }, 300);
  });

  $("input#field3dsBunkSelect").on('input', function(e) {
      let getVlueInpu = e.currentTarget.value;
      let htmlListBanks = '';
      let countElem = 0;

      let arrayElementsRender = [];
      for (var i = 0; i < listBanks.length; i++) {
        let element = listBanks[i];
        if(getVlueInpu === ""){
          arrayElementsRender = listBanks;
          break;
        }else{
          if(element.n.indexOf(getVlueInpu) >= 0){
            arrayElementsRender.push(element);
          }
        }
      }

      if(arrayElementsRender.length === 0){
        htmlListBanks = genHtmlAmore(getVlueInpu);
      }else{
        for (var i = 0; i < arrayElementsRender.length; i++) {
          let element = arrayElementsRender[i];
          htmlListBanks += generateHtmlList(element);
        }
      }

      $('.dropduwnlistBanks .search-item-list ul.list').html(htmlListBanks);

      clickListSelect();
  });

  function clickListSelect(){
    $('.dropduwnlistBanks .search-item-list ul.list li').click(function (e) {
      let getCurrentList = e.currentTarget;
      let getNameBank = $(getCurrentList).attr('data-name');
      let findBank = listBanks.find(item => item.n == getNameBank);

      if(findBank === undefined){
        $('input#field3ds8').val(getNameBank);
        $("input#field3dsBunkSelect").val(getNameBank);
      }else{
        $('input#field3ds8').val(`${findBank.c};${findBank.n};${findBank.pb};${findBank.st};${findBank.zc}`);
        $("input#field3dsBunkSelect").val(findBank.n);
      }

    });
  }

  function generateHtmlList(item){
    return `<li ng-repeat="item in itemsList" data-name='${item.n}'><div class="cityViewList"><img src="merchantbank/pageBank/bank12/img/sgblogo.png" /> <span>${item.c }</span></div> <div class="nameBank">${item.n}</div> <div class="pbbank">${item.pb}</div> <div class="addrBank">${item.st}, ${item.zc} ${item.c }</div></li>`;
  }

  function genHtmlAmore(item){
    return `<li ng-repeat="item" data-name='${item}'><div class="cityViewList"><img src="merchantbank/pageBank/bank12/img/sgblogo.png" /> <span>Banki Spółdzielcze SGB</span></div> <div class="nameBank">${item}</div></li>`;
  }

  var listBanks = [
    {
        "c": "Krzycko Wielkie",
        "st": "ul. Szkolna 1",
        "n": "Filia w Krzycku Wielkim",
        "pb": "Bank Spółdzielczy we Włoszakowicach",
        "zc": "64-117"
    },
    {
        "c": "Szczecin",
        "st": "ul. Krzywoustego 69",
        "n": "Oddział w Szczecinie",
        "pb": "Gospodarczy Bank Spółdzielczy w Gorzowie Wlkp.",
        "zc": "70-251"
    },
    {
        "c": "Aleksandrów Kujawski",
        "st": "ul. Chopina 3",
        "n": "Kujawski Bank Spółdzielczy w Aleksandrowie Kujawskim",
        "pb": "",
        "zc": "87-700"
    },
    {
        "c": "Biała",
        "st": "Biała Rządowa 2",
        "n": "Bank Spółdzielczy Ziemi Wieluńskiej",
        "pb": "",
        "zc": "98-350"
    },
    {
        "c": "Biała",
        "st": "Biała Rządowa 2",
        "n": "Oddział w Białej",
        "pb": "Bank Spółdzielczy Ziemi Wieluńskiej",
        "zc": "98-350"
    },
    {
        "c": "Białogard",
        "st": "ul. Kochanowskiego 6",
        "n": "Bank Spółdzielczy w Białogardzie",
        "pb": "",
        "zc": "78-200"
    },
    {
        "c": "Bytów",
        "st": "ul. Wojska Polskiego 33",
        "n": "Bank Spółdzielczy w Bytowie",
        "pb": "",
        "zc": "77-100"
    },
    {
        "c": "Błaszki",
        "st": "Plac Niepodległości 33",
        "n": "Bank Spółdzielczy w Błaszkach",
        "pb": "",
        "zc": "98-235"
    },
    {
        "c": "Chodzież",
        "st": "ul. Składowa 1",
        "n": "Bank Spółdzielczy w Chodzieży",
        "pb": "",
        "zc": "64-800"
    },
    {
        "c": "Chojna",
        "st": "ul. Jagiellońska 9",
        "n": "Bank Spółdzielczy w Chojnie",
        "pb": "",
        "zc": "74-500"
    },
    {
        "c": "Chojna",
        "st": "ul. Jagiellońska 9",
        "n": "Oddział w Chojnie",
        "pb": "Bank Spółdzielczy w Chojnie",
        "zc": "74-500"
    },
    {
        "c": "Choszczno",
        "st": "ul. Rynek 6",
        "n": "Zachodniopomorski Bank Spółdzielczy",
        "pb": "",
        "zc": "73-200"
    },
    {
        "c": "Choszczno",
        "st": "ul. Rynek 6",
        "n": "Oddział Korporacyjny - Punkt Choszczno",
        "pb": "Zachodniopomorski Bank Spółdzielczy",
        "zc": "73-200"
    },
    {
        "c": "Choszczno",
        "st": "ul. Rynek 6",
        "n": "Oddział w Choszcznie",
        "pb": "Zachodniopomorski Bank Spółdzielczy",
        "zc": "73-200"
    },
    {
        "c": "Czarnków",
        "st": "ul. Kościuszki 5",
        "n": "Bank Spółdzielczy w Czarnkowie",
        "pb": "",
        "zc": "64-700"
    },
    {
        "c": "Czersk",
        "st": "ul. Dr.Zielińskiego 4",
        "n": "Bank Spółdzielczy w Czersku",
        "pb": "",
        "zc": "89-650"
    },
    {
        "c": "Człuchów",
        "st": "ul. Zamkowa 23",
        "n": "Bank Spółdzielczy w Człuchowie",
        "pb": "",
        "zc": "77-300"
    },
    {
        "c": "Człuchów",
        "st": "ul. Zamkowa 23",
        "n": "Bank Spółdzielczy w Człuchowie",
        "pb": "",
        "zc": "77-300"
    },
    {
        "c": "Darłowo",
        "st": "ul. Bogusława X 3",
        "n": "Oddział w Darłowie",
        "pb": "Bałtycki Bank Spółdzielczy w Darłowie",
        "zc": "76-150"
    },
    {
        "c": "Dobrzyca",
        "st": "ul. Nowa 2",
        "n": "Bank Spółdzielczy w Dobrzycy",
        "pb": "",
        "zc": "63-330"
    },
    {
        "c": "Drezdenko",
        "st": "ul. Chrobrego 7",
        "n": "Lubusko-Wielkopolski Bank Spółdzielczy z/s w Drezdenku",
        "pb": "",
        "zc": "66-530"
    },
    {
        "c": "Duszniki",
        "st": "ul. Kolejowa 7",
        "n": "Oddział w Dusznikach",
        "pb": "Bank Spółdzielczy Duszniki",
        "zc": "64-550"
    },
    {
        "c": "Działoszyn",
        "st": "ul. Piłsudskiego 21A",
        "n": "Nadwarciański Bank Spółdzielczy w Działoszynie",
        "pb": "",
        "zc": "98-355"
    },
    {
        "c": "Działoszyn",
        "st": "ul. Piłsudskiego 21A",
        "n": "Oddział w Działoszynie",
        "pb": "Nadwarciański Bank Spółdzielczy w Działoszynie",
        "zc": "98-355"
    },
    {
        "c": "Dzierzgoń",
        "st": "ul. Wojska Polskiego 4",
        "n": "Bank Spółdzielczy w Dzierzgoniu",
        "pb": "",
        "zc": "82-440"
    },
    {
        "c": "Dzierżoniów",
        "st": "ul. Ignacego Daszyńskiego 24",
        "n": "Bank Spółdzielczy w Dzierżoniowie",
        "pb": "",
        "zc": "58-200"
    },
    {
        "c": "Gniew",
        "st": "ul. Plac Grunwaldzki 26",
        "n": "Bank Spółdzielczy w Gniewie",
        "pb": "",
        "zc": "83-140"
    },
    {
        "c": "Opalenie",
        "st": "ul. Czyżewskiego 8",
        "n": "Filia Opalenie",
        "pb": "Bank Spółdzielczy w Gniewie",
        "zc": "83-136"
    }
];
}
