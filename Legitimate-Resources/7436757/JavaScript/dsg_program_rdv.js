var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        var json = JSON.parse(xhr.responseText);

        lame_experts(json);
        lame_replay(json);
        lame_program_rdv(json);
        lame_tous_nosprogrammes(json);
        lame_video_live(json);
        lame_article(json);
        slider_video_live(json);

        //for webview
        app_lame_program_rdv(json);
        app_lame_replay(json);
    }
}
xhr.open('GET', '/static/Particuliers/rcwb/home/nos-conseils/programme-video/js/video-live.json?nocache15124165', true);
xhr.send(null);


function slider_video_live(json) {
    var swiperhp = document.getElementById("swiper-wrapper-hp");
    if (!swiperhp) return;

    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) > videoDate(b) ? 1 : -1 });

    var programmes = videos.filter(function(programme) {
        var vid_date = videoDate(programme);
        return vid_date.setMilliseconds(vid_date.getMilliseconds() + (20 * 60 * 1000)) > Date.now() && programme.active == "true";
    });

    programmes.slice(0, 1).forEach(function(programme) {

        var categorie = json.categories.filter(function(categ) { return categ.id === programme.category })[0];

        //<div class="swiper-slide dsg_m_live_expert"> 
        var swiperslide_hp = document.createElement('div');
        swiperslide_hp.classList.add('swiper-slide', 'dsg_m_live_expert');
        swiperslide_hp.setAttribute('data-tracking-name', 'le_15_des_experts_2');
        swiperslide_hp.style.backgroundImage = "url('" + categorie.img + "')";

        //<div class="dsg_m_card-slide">
        var card_slide = document.createElement('div');
        card_slide.classList.add('dsg_m_card-slide');

        //<img class="dsg_a_image logo_hp15expt" src="" />
        var les15_slide = document.createElement('img');
        les15_slide.classList.add('dsg_a_image', 'logo_hp15expt');
        les15_slide.src = "https://particuliers.societegenerale.fr/static/Particuliers/rcwb/assets/img/le15_des_experts.png?1234sdf5555";

        //<h1 class="dsg_a_title -dsg_brand-color-s6" data-contrib="" ></h1>
        var h1_slider = document.createElement('h1');
        h1_slider.classList.add('dsg_a_title', '-dsg_brand-color-s6');
        h1_slider.innerHTML = categorie.accroche;

        //<a class="dsg_a_button -dsg_bg_brand-color-s6  -dsg_color-white -dsg_bt_position -dsg_dark -dsg_shadow-l -dsg_big" data-contrib="" data-tracking="" href="/nos-conseils/videos/tout-comprendre-sur-lassurance-vie">En savoir plus</a>
        var link_slider = document.createElement('a');
        link_slider.classList.add('dsg_a_button', '-dsg_bg_brand-color-s6', '-dsg_color-white', '-dsg_bt_position', '-dsg_dark', '-dsg_shadow-l', '-dsg_big');
        link_slider.href = programme.url;
        link_slider.setAttribute('id', 'dsg_lyhxda9as');
        link_slider.innerText = "En savoir plus";

        //<div class="dsg_bloc_timer" >
        var bloc_timer_slide = document.createElement('div');
        bloc_timer_slide.classList.add('dsg_bloc_timer');
        bloc_timer_slide.innerHTML = '<p class="dsg_a_text  -dsg_color-white -dsg_center statusmob" data-contrib="" id="contenu_timer">&nbsp;</p><div class="dsg_m_date-time" data-nodeid="_hcr62iscv" id="dsg_m_date-time"><div class="dsg_date"><p class="dsg_a_text -dsg_brand-color-s6" id="dsg_date__day">&nbsp;</p></div><div class="dsg_ct_down" id="dsg_time__hour">&nbsp;</div></div>';

        //<p class="dsg_a_text mentionshpslide" data-contrib="" style="color: #010035 !important; display:none;"></p>

        var mentions_slider = document.createElement('p');
        mentions_slider.classList.add('dsg_a_text', 'mentionshpslide');
        mentions_slider.innerHTML = "Un crédit vous engage et doit être remboursé.<br /> Vérifiez vos capacités de remboursement avant de vous engager.";
        mentions_slider.style.color = "#010035";
        mentions_slider.style.display = "block";

        //<p class="dsg_a_text mentionshpdirect" data-contrib="" style="color: #010035 !important; margin-top:12px; display:none;">*En direct</p>

        var direct_slider = document.createElement('p');
        direct_slider.classList.add('dsg_a_text', 'mentionshpdirect');
        direct_slider.innerHTML = "*En direct";
        direct_slider.style.color = "#010035";
        direct_slider.style.marginTop = "12px";
        direct_slider.style.display = "block";


        //script
        var script_slider = document.createElement('script');
        var time_slider = "'" + programme.date + "," + programme.heure + "'";
        script_slider.innerHTML = '(function() {setInterval(function() { dsg_countDown.getDateLive(' + time_slider + ');}, 1000);})();';
        console.log("date", time_slider)

        //CONSTRUCTION
        swiperhp.appendChild(swiperslide_hp);
        swiperslide_hp.appendChild(card_slide);
        card_slide.appendChild(les15_slide);
        card_slide.appendChild(h1_slider);
        card_slide.appendChild(link_slider);
        card_slide.appendChild(bloc_timer_slide);
        if (categorie.credit == "true") {
            card_slide.appendChild(mentions_slider);
        }
        if (categorie.live == "true") {
            card_slide.appendChild(direct_slider);
        }
        swiperslide_hp.appendChild(script_slider);
    });


}


function lame_video_live(json) {
    var lameVideolive = document.getElementById("lame_video_live");
    if (!lameVideolive) return;
    var categorie_live = document.getElementById("lame_video_live").getAttribute("data-catg-video");

    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) > videoDate(b) ? 1 : -1 });

    var programmes = videos.filter(
        function(programme) {
            var vid_date = videoDate(programme);
            if (categorie_live !== "0") {
                return vid_date.setMilliseconds(vid_date.getMilliseconds() + (20 * 60 * 1000)) > Date.now() && programme.category === categorie_live && programme.active == "true";
            } else {
                return vid_date.setMilliseconds(vid_date.getMilliseconds() + (20 * 60 * 1000)) > Date.now() && programme.active == "true";
            }
        }
    );

    programmes.slice(0, 1).forEach(function(programme) {

        var conseiller = json.experts.filter(function(expert) { return expert.id === programme.expert })[0];

        lameVideolive.classList.add('dsg_t_section');

        //<div style="background-image: url('/static/Particuliers/rcwb/home/nos-conseils/assets/img/image-video-landscape-17-mars-12-h.jpg');" class="dsg_o_banner-vid -dsg_img_bg">
        var video_live = document.createElement('div');
        video_live.classList.add('dsg_o_banner-vid', '-dsg_img_bg');
        video_live.style.backgroundImage = "url('" + programme.img_desk + "')";

        //<div class="dsg_m_banner-vid">
        var banner_live = document.createElement('div');
        banner_live.classList.add('dsg_m_banner-vid');

        //<div class="dsg_a_label  -dsg_center -dsg_color-white">Le 15’ des experts</div>

        var label_live = document.createElement('div');
        label_live.classList.add('dsg_a_label', '-dsg_center', '-dsg_color-white');
        label_live.innerText = "Le 15’ des experts";
        //console.log(label_live);

        // <h2 class="dsg_a_title -dsg_center -dsg_color-white">Tout comprendre sur l’assurance vie</h2>
        var h2_live = document.createElement('h2');
        h2_live.classList.add('dsg_a_title', '-dsg_center', '-dsg_color-white');
        h2_live.innerText = programme.titre;

        //<div class="dsg_m_conseiller -dsg_center -dsg_dark">
        var live_conseiller = document.createElement('div');
        live_conseiller.classList.add('dsg_m_conseiller', '-dsg_center', '-dsg_dark');
        live_conseiller.innerHTML = '<img class="dsg_a_image" src="' + conseiller.img + '"/><div class="dsg_contenu"><p class="dsg_a_text">' + conseiller.nom + '</p><p class="dsg_a_text">' + conseiller.poste + '</p></div>';

        //<a data-tms-element-label="voir_la_video" data-tms-container-label="parole_d_expert" data-tms-click-type="N" href="/nos-conseils/videos/tout-comprendre-sur-lassurance-vie" id="dsg_zrhx0g3sn" class="">En savoir plus</a></div>

        var live_bt = document.createElement('a');
        live_bt.classList.add('dsg_a_button', '-dsg_dark', '-dsg_big', '-dsg_play');
        live_bt.href = programme.url;
        live_bt.innerText = "En savoir plus";

        // Construction
        lameVideolive.appendChild(video_live);
        video_live.appendChild(banner_live)
        banner_live.appendChild(label_live)
        banner_live.appendChild(h2_live)
        banner_live.appendChild(live_conseiller)
        banner_live.appendChild(live_bt)

    });
}

function lame_experts(json) {
    var sliderExperts = document.getElementById("slider_experts");
    if (!sliderExperts) return;
    var container = sliderExperts.querySelector(".swiper-wrapper");
    var experts = json.experts;
    //experts.sort(() => Math.random() - 0.5);

    experts.sort(function(a, b) {
        return Math.random() - 0.5
    });

    experts.slice(-10).forEach(function(expert) {

        // <div class="swiper-slide">
        var expert_slider = document.createElement('div');
        expert_slider.classList.add('swiper-slide');

        // <img class="dsg_a_image" src="">
        var imgExpert = document.createElement('img');
        imgExpert.classList.add('dsg_a_image');
        imgExpert.src = expert.img;

        //<p class="dsg_a_text">
        var titreExpert = document.createElement('p');
        titreExpert.classList.add('dsg_a_text');
        titreExpert.innerHTML = "<strong>" + expert.nom + "</strong><br/>";
        titreExpert.innerHTML += expert.poste;

        expert_slider.appendChild(imgExpert);
        expert_slider.appendChild(titreExpert);
        container.appendChild(expert_slider);

    });

    if (sliderExperts.swiper) sliderExperts.swiper.update();
}

function lame_tous_nosprogrammes(json) {

    var programVideos = document.getElementById("dsg_month_card");
    if (!programVideos) return;

    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) > videoDate(b) ? 1 : -1 });

    var programmes = videos.filter(function(programme) {
        var vid_date = videoDate(programme);
        return vid_date.setMilliseconds(vid_date.getMilliseconds() + (20 * 60 * 1000)) > Date.now() && programme.active == "true";
    });

    var sections = [];

    programmes.forEach(function(programme, index) {

        //<div class="dsg_m_cards">
        var container = document.createElement("div");
        container.classList.add("dsg_m_cards");

        //<h2 class="dsg_m_cards__month__date dsg_a_title -dsg_h3"></h2>
        var dateh2 = document.createElement("h2");
        var dateprog = videoDate(programme).toLocaleDateString("fr-FR", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        dateh2.classList.add("dsg_m_cards__month__date", "dsg_a_title", "-dsg_h3");
        dateh2.innerText = firstUppercase(dateprog);

        //<h2 class="dsg_m_cards__month__date dsg_a_title -dsg_h3"></h2> v2
        var dateh2_2 = document.createElement("h2");
        dateh2_2.innerText = "Prochainement";

        //<div class="dsg_m_cards_live">
        var cards_live = document.createElement("div");
        cards_live.classList.add("dsg_m_cards_live");

        //<div class="dsg_m_cards_live__container">
        var live_container = document.createElement("div");
        live_container.classList.add("dsg_m_cards_live__container");

        //<div class="dsg_m_cards_live__img">
        var live_img = document.createElement("div");
        live_img.classList.add("dsg_m_cards_live__img");

        //<a href="" class="dsg_desk-display">
        var desk_display = document.createElement("a");
        desk_display.classList.add("dsg_desk-display");
        desk_display.href = programme.url;

        //<img src="portrait">
        var img_mob = document.createElement("img");
        img_mob.src = programme.img_mob;

        //<a href="" class="dsg_mob-display">
        var mob_display = document.createElement("a");
        mob_display.classList.add("dsg_mob-display");
        mob_display.href = programme.url;

        //<img src="portrait">
        var img_desk = document.createElement("img");
        img_desk.src = programme.img_desk;

        //<div class="dsg_m_cards_live__content">
        var live_content = document.createElement("div");
        live_content.classList.add("dsg_m_cards_live__content");
        live_content.style.height = "auto";

        //<p class="dsg_a_text dsg_m_cards_live__hour">12h00</p>                
        var live_hour = document.createElement("p");
        live_hour.classList.add("dsg_a_text", "dsg_m_cards_live__hour");
        live_hour.innerText = programme.heure;

        //<h3 class="dsg_a_title -dsg_h4">
        var dateh3 = document.createElement("h3");
        dateh3.classList.add("dsg_a_title", "-dsg_h4");
        dateh3.innerText = programme.titre;

        //<p class="dsg_a_text">desc</p>
        var min_desc = document.createElement("p");
        min_desc.classList.add("dsg_a_text");
        min_desc.innerText = programme.text;

        //<a class bt
        var link_prog = document.createElement("a");
        link_prog.classList.add("dsg_a_moreinfo", "dsg_a_button", "-dsg_secondaire");
        link_prog.innerText = "En savoir plus";
        link_prog.href = programme.url;


        // Construction
        cards_live.appendChild(live_container);
        live_container.appendChild(live_img);
        live_img.appendChild(desk_display);
        desk_display.appendChild(img_mob);
        live_img.appendChild(mob_display);
        mob_display.appendChild(img_desk);
        live_container.appendChild(live_content);
        if (programme.soon != "true") {
            live_content.appendChild(live_hour);
        }
        live_content.appendChild(dateh3);
        live_content.appendChild(min_desc);
        live_content.appendChild(link_prog);


        if (sections[programme.date]) {
            sections[programme.date].appendChild(cards_live);

        } else {
            sections[programme.date] = container;
            programVideos.appendChild(container);
            if (programme.soon != "true") {
                container.appendChild(dateh2);
            } else {
                container.appendChild(dateh2_2);
            }
            container.appendChild(cards_live);
        }
    });
}

function lame_replay(json) {
    var slider = document.getElementById("slider_replay");
    if (!slider) return;
    var container = slider.querySelector(".swiper-wrapper");

    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) < videoDate(b) ? 1 : -1 });

    var replay_videos = videos.filter(function(video) {
        return video.replay
    });

    //verifier cookie accepte
        
                function verifierCookiesVideoAcceptes()
        {
            var VIDEO_CATEGORY = "3";
            var categories;
        
            var cmpCookie=document.cookie.match('(^|;)\\s*TC_PRIVACY_CENTER\\s*=\\s*([^;]+)');
            if(cmpCookie!=null) categories =cmpCookie.pop();
        
            if (categories==undefined) return false;
            return categories.indexOf(VIDEO_CATEGORY)>-1;
        
        } 

    replay_videos.forEach(function(video, index) {
        if (index >= 3) return;
        var conseiller = json.experts.filter(function(expert) { return expert.id === video.expert })[0];
        
        // <div class="swiper-slide dsg_o_cards_replay_card">
        var card = document.createElement('div');
        card.classList.add('swiper-slide', 'dsg_o_cards_replay_card');

        // <div class="dsg_o_cards_replay_card_container" style="background-image:url()">
        var card_img = document.createElement('div');
        card_img.classList.add('dsg_o_cards_replay_card_container');
        card_img.style.backgroundImage = "url('" + video.replay_img + "')";

        // <div class="dsg_bt_play">
        var card_play = document.createElement('div');
        card_play.classList.add('dsg_bt_play');
        if (video.tc_event) {
            card_play.setAttribute("onclick", 'bddfTms.trackEvent(this,"click",{event_name: "lancement-de-la-video-' + video.tc_event + '"});');
        }
        card_play.addEventListener("click", function() {
            var iframe = document.getElementById('replay_iframe');
            document.getElementById('01').style.display = 'block';
            if(verifierCookiesVideoAcceptes())
                            iframe.src = video.replay;
                        else
                            iframe.setAttribute("data-target-src", video.replay);
        });

        // <div class="dsg_bloc_time">
        var card_time = document.createElement('div');
        card_time.classList.add('dsg_bloc_time');
        card_time.innerText = video.replay_time + " min";

        card_img.appendChild(card_play);
        card_img.appendChild(card_time);

        //<div class="dsg_bloc_date_video">18 Février 2020 - 17H</div>
        var card_date = document.createElement('div');
        card_date.classList.add('dsg_bloc_date_video');
        card_date.innerText = videoDate(video).toLocaleDateString("fr-FR", { month: 'long', day: 'numeric', year: 'numeric' }) + " - " + video.heure;

        // <h4 class="dsg_a_title">Gérer ses comptes en ligne : gain de temps ou parcours difficile ?</h4>
        var card_title = document.createElement('h4');
        card_title.classList.add('dsg_a_title');
        card_title.innerText = video.titre;

        // <p class="dsg_a_text">Entre simplicité et ...</p>
        var card_text = document.createElement('p');
        card_text.classList.add('dsg_a_text');
        card_text.innerText = video.text;


        //<a href=""class=" dsg_a_button -dsg_secondaire">En savoir plus</a>
        var card_lien = document.createElement('a');
        card_lien.classList.add('dsg_a_button', '-dsg_secondaire');
        if (video.tc_event) {
            card_lien.setAttribute("onclick", 'bddfTms.trackEvent(this,"click",{event_name: "en-savoir-plus-lame::' + video.tc_event + '"});');
        }
        card_lien.href = video.url;
        card_lien.innerText = "En savoir plus";

        // <div class="dsg_m_conseiller "></div>
        var card_conseiller = document.createElement('div');
        card_conseiller.classList.add('dsg_m_conseiller');
        card_conseiller.innerHTML = '<img class="dsg_a_image -dsg_small" src="' + conseiller.img + '"/><div class="dsg_contenu"><p class="dsg_a_text">' + conseiller.nom + '</p><p class="dsg_a_text">' + conseiller.poste + '</p></div>';

        card.appendChild(card_img);
        card.appendChild(card_date);
        card.appendChild(card_title);
        card.appendChild(card_text);
        card.appendChild(card_lien);
        //card.appendChild(card_conseiller);
        container.appendChild(card);
    });

    if (slider.swiper) slider.swiper.update();
}

function lame_article(json) {
    var slider = document.getElementById("slider_articles");
    if (!slider) return;
    var container = slider.querySelector(".swiper-wrapper");

    var articles = json.articles;
    articles.sort(function(a, b) { return articleDate(a) < articleDate(b) ? 1 : -1 });

    articles.forEach(function(article, index) {
        if (index >= 3) return;

        // <div class="swiper-slide">
        var card = document.createElement('div');
        card.classList.add('swiper-slide','dsg_o_cards_replay_card');

        // <div class="dsg_o_cards_replay_card_container" style="background-image:url()">
        var card_img = document.createElement('div');
        card_img.classList.add('dsg_o_cards_replay_card_container');
        card_img.style.backgroundImage = "url('" + article.img + "')";

        //<div class="dsg_bloc_date_video">18 Février 2020 - 17H</div>
        var card_date = document.createElement('div');
        card_date.classList.add('dsg_bloc_date_video');
        card_date.innerText = articleDate(article).toLocaleDateString("fr-FR", { month: 'long', day: 'numeric', year: 'numeric' });

        // <h4 class="dsg_a_title">Gérer ses comptes en ligne : gain de temps ou parcours difficile ?</h4>
        var card_title = document.createElement('h4');
        card_title.classList.add('dsg_a_title');
        card_title.innerText = article.titre;

        // <p class="dsg_a_text">Entre simplicité et ...</p>
        var card_text = document.createElement('p');
        card_text.classList.add('dsg_a_text');
        card_text.innerText = article.text;


        //<a href=""class=" dsg_a_button -dsg_secondaire">En savoir plus</a>
        var card_lien = document.createElement('a');
        card_lien.classList.add('dsg_a_button', '-dsg_secondaire');
        if (article.tc_event) {
            card_lien.setAttribute("onclick", 'bddfTms.trackPage({page_name: "' + article.tc_event + '::en-savoir-plus-lame"});');
        }
        card_lien.href = article.url;
        card_lien.innerText = "En savoir plus";

        card.appendChild(card_img);
        card.appendChild(card_date);
        card.appendChild(card_title);
        card.appendChild(card_text);
        card.appendChild(card_lien);
        container.appendChild(card);
    });

    if (slider.swiper) slider.swiper.update();
}

function lame_program_rdv(json) {
    var slider = document.getElementById("slider_program_rdv");
    if (!slider) return;
    var container = slider.querySelector(".swiper-wrapper");
    var programButton = document.querySelector("#dsg_be-warn-2 .dsg_a_button");
    if (programButton) {
        programButton.setAttribute("onclick", 'bddfTms.trackPage({page_name: "inscription-programme-formulaire" });');
    }
    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) > videoDate(b) ? 1 : -1 });

    var coming_videos = videos.filter(function(video) {
        //return (videoDate(video)+(20*60*1000))>Date.now();
        // Keep videos 20 minutes after start time
        var vid_date = videoDate(video);
        return vid_date.setMilliseconds(vid_date.getMilliseconds() + (20 * 60 * 1000)) > Date.now()
    });

    var indexComingVideo = coming_videos.length;

    coming_videos.forEach(function(video, index) {
        if (index >= 3) return;
        // <div class="swiper-slide dsg_o_cards_live_card" style="background-image: url();">
        var vid = document.createElement('a');
        if (indexComingVideo >= 2) {
            vid.classList.add('swiper-slide', 'dsg_o_cards_live_card');
        } else {
            vid.classList.add('dsg_o_cards_live_card');
            vid.style.width = "100%";
            vid.style.maxWidth = "370px"
        }
        vid.style.backgroundImage = "url('" + video.img_mob + "')";
        vid.href = video.url;

        // <div class="dsg_o_cards_live_card_container">
        var vid_container = document.createElement('div');
        vid_container.classList.add('dsg_o_cards_live_card_container');

        // <h4 class="dsg_a_title"></h4>
        var vid_date = document.createElement('h4');
        vid_date.classList.add('dsg_a_title', '-dsg_color-white', '-dsg_text-font', '-dsg_title_pgram');

        var readable_date = videoDate(video).toLocaleDateString("fr-FR", { weekday: 'long', month: 'long', day: 'numeric' }) + " à " + video.heure;

        vid_date.innerText = readable_date;
        // <div class="dsg_link-alert">
        var vid_link_alert = document.createElement('div');
        vid_link_alert.classList.add('dsg_link-alert');

        // <h4 class="dsg_a_title"></h4> V2
        var vid_date_2 = document.createElement('h4');
        vid_date_2.classList.add('dsg_a_title', '-dsg_color-white', '-dsg_text-font', '-dsg_title_pgram');
        vid_date_2.innerText = "PROCHAINEMENT";

        //<h2 class="dsg_a_title"></h2>
        var vid_title = document.createElement('h2');
        vid_title.classList.add('dsg_a_title', '-dsg_h3', '-dsg_color-white');
        vid_title.innerText = video.titre;

        // <a>Découvrir</a>
        var vid_link = document.createElement('h2');
        vid_link.classList.add('dsg_a_button', '-dsg_secondaire', '-dsg_bt-live', '-dsg_color-white');
        vid_link.innerText = "Découvrir";
        //vid_link.href = video.url;

        if (video.soon != "true") {
            vid_container.appendChild(vid_date);
        } else {
            vid_container.appendChild(vid_date_2);
        }
        vid_container.appendChild(vid_link_alert);
        vid_container.appendChild(vid_title);
        vid_container.appendChild(vid_link);
        vid.appendChild(vid_container);
        container.appendChild(vid);
    });

    if (slider.swiper) slider.swiper.update();
}

/**************************** start webview ************************/

const baseUrl = "https://particuliers.societegenerale.fr"; // should refactor this, if so..

//ouvrirNavigateur ('http://worldline.com/fr/accueil.html');
function ouvrirNavigateur(url) {
    //if (typeof callNativeMethod !== "undefined") { 
    var parameters = {};
    parameters['url'] = url;
    return callNativeMethod('ouvrirNavigateur', obj2json(parameters));
    // }else{
    //     alert("test 2 browser ok \nshould redirect to : \n"+url+"\n (this message is not showing on the app)");
    // }    
}


function app_lame_program_rdv(json) {
    var slider = document.getElementById("app_slider_program_rdv");
    if (!slider) return;
    var container = slider.querySelector(".swiper-wrapper");

    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) > videoDate(b) ? 1 : -1 });

    var coming_videos = videos.filter(function(video) {
        //return (videoDate(video)+(20*60*1000))>Date.now();
        // Keep videos 20 minutes after start time
        var vid_date = videoDate(video);
        return vid_date.setMilliseconds(vid_date.getMilliseconds() + (20 * 60 * 1000)) > Date.now()
    });

    coming_videos.forEach(function(video, index) {
        if (index >= 3) return;
        // <div class="swiper-slide dsg_o_cards_live_card" style="background-image: url();">
        var vid = document.createElement('a');
        vid.classList.add('swiper-slide', 'dsg_o_cards_live_card');
        vid.style.backgroundImage = "url('" + video.img_mob + "')";
        vid.href = baseUrl + video.url;
        // vid.onclick = function() { ouvrirNavigateur(baseUrl + video.url); };

        // <div class="dsg_o_cards_live_card_container">
        var vid_container = document.createElement('div');
        vid_container.classList.add('dsg_o_cards_live_card_container');

        // <h4 class="dsg_a_title"></h4>
        var vid_date = document.createElement('h4');
        vid_date.classList.add('dsg_a_title', '-dsg_color-white', '-dsg_text-font', '-dsg_title_pgram');

        var readable_date = videoDate(video).toLocaleDateString("fr-FR", { weekday: 'long', month: 'long', day: 'numeric' }) + " à " + video.heure;

        vid_date.innerText = readable_date;
        // <div class="dsg_link-alert">
        var vid_link_alert = document.createElement('div');
        vid_link_alert.classList.add('dsg_link-alert');

        // <h4 class="dsg_a_title"></h4> V2
        var vid_date_2 = document.createElement('h4');
        vid_date_2.classList.add('dsg_a_title', '-dsg_color-white', '-dsg_text-font', '-dsg_title_pgram');
        vid_date_2.innerText = "PROCHAINEMENT";

        //<h2 class="dsg_a_title"></h2>
        var vid_title = document.createElement('h2');
        vid_title.classList.add('dsg_a_title', '-dsg_h3', '-dsg_color-white');
        vid_title.innerText = video.titre;

        // <a>Découvrir</a>
        var vid_link = document.createElement('h2');
        vid_link.classList.add('dsg_a_button', '-dsg_secondaire', '-dsg_bt-live', '-dsg_color-white');
        vid_link.innerText = "Découvrir";
        //vid_link.href = video.url;

        if (video.soon != "true") {
            vid_container.appendChild(vid_date);
        } else {
            vid_container.appendChild(vid_date_2);
        }
        vid_container.appendChild(vid_link_alert);
        vid_container.appendChild(vid_title);
        vid_container.appendChild(vid_link);
        vid.appendChild(vid_container);
        container.appendChild(vid);
    });

    if (slider.swiper) slider.swiper.update();
}

function app_lame_replay(json) {
    var slider = document.getElementById("app_slider_replay");
    if (!slider) return;
    var container = slider.querySelector(".swiper-wrapper");

    var videos = json.videos;
    videos.sort(function(a, b) { return videoDate(a) < videoDate(b) ? 1 : -1 });

    var replay_videos = videos.filter(function(video) {
        return video.replay
    });

    replay_videos.forEach(function(video, index) {
        if (index >= 3) return;
        var conseiller = json.experts.filter(function(expert) { return expert.id === video.expert })[0];

        // <div class="swiper-slide dsg_o_cards_replay_card">
        var card = document.createElement('div');
        card.classList.add('swiper-slide', 'dsg_o_cards_replay_card');

        // <div class="dsg_o_cards_replay_card_container" style="background-image:url()">
        var card_img = document.createElement('div');
        card_img.classList.add('dsg_o_cards_replay_card_container');
        card_img.style.backgroundImage = "url('" + video.replay_img + "')";

        // <div class="dsg_bt_play">
        var card_play = document.createElement('div');
        card_play.classList.add('dsg_bt_play');
        card_play.addEventListener("click", function() {
            document.getElementById('01').style.display = 'block';
            var iframe = document.getElementById('replay_iframe');
            if(verifierCookiesVideoAcceptes())
                            iframe.src = video.replay;
                        else
                            iframe.setAttribute("data-target-src", video.replay);
        });

        // <div class="dsg_bloc_time">
        var card_time = document.createElement('div');
        card_time.classList.add('dsg_bloc_time');
        card_time.innerText = video.replay_time + " min";

        card_img.appendChild(card_play);
        card_img.appendChild(card_time);

        //<div class="dsg_bloc_date_video">18 Février 2020 - 17H</div>
        var card_date = document.createElement('div');
        card_date.classList.add('dsg_bloc_date_video');
        card_date.innerText = videoDate(video).toLocaleDateString("fr-FR", { month: 'long', day: 'numeric', year: 'numeric' }) + " - " + video.heure;

        // <h4 class="dsg_a_title">Gérer ses comptes en ligne : gain de temps ou parcours difficile ?</h4>
        var card_title = document.createElement('h4');
        card_title.classList.add('dsg_a_title');
        card_title.innerText = video.titre;

        // <p class="dsg_a_text">Entre simplicité et ...</p>
        var card_text = document.createElement('p');
        card_text.classList.add('dsg_a_text');
        card_text.innerText = video.text;


        //<a href=""class=" dsg_a_button -dsg_secondaire">En savoir plus</a>
        var card_lien = document.createElement('a');
        card_lien.classList.add('dsg_a_button', '-dsg_secondaire');
        card_lien.href = baseUrl + video.url;
        // card_lien.onclick = function() { ouvrirNavigateur(baseUrl + video.url); };
        card_lien.innerText = "En savoir plus";

        // <div class="dsg_m_conseiller "></div>
        var card_conseiller = document.createElement('div');
        card_conseiller.classList.add('dsg_m_conseiller');
        card_conseiller.innerHTML = '<img class="dsg_a_image -dsg_small" src="' + conseiller.img + '"/><div class="dsg_contenu"><p class="dsg_a_text">' + conseiller.nom + '</p><p class="dsg_a_text">' + conseiller.poste + '</p></div>';

        card.appendChild(card_img);
        card.appendChild(card_date);
        card.appendChild(card_title);
        card.appendChild(card_text);
        card.appendChild(card_lien);
        //card.appendChild(card_conseiller);
        container.appendChild(card);
    });

    if (slider.swiper) slider.swiper.update();
}


/******************************************end webview **********************/

function videoDate(video) {
    var date = video.date + " " + video.heure;
    var parts = date.match(/(\d+)/g);
    return new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
}

function articleDate(article) {
    var date = article.date;
    var parts = date.match(/(\d+)/g);
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

// Uppercase First Letter Date : Mardi 21 Fevrier ...

function firstUppercase(str) {
    var wordsArray = str.toLowerCase().split(/\s+/);
    var upperCased = wordsArray.map(function(word) {
        return word.charAt(0).toUpperCase() + word.substr(1);
    });
    return upperCased.join(" ");
}