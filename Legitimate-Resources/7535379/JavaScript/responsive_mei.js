var metalist = document.getElementsByTagName('meta');
var hasMeta = false;
for(var i = 0; i < metalist.length; i++) {
    var name = metalist[i].getAttribute('name');
    if(name && name.toLowerCase() === 'viewport') {
        metalist[i].setAttribute('content', 'width=device-width,initial-scale=1.0');
        hasMeta = true;
        break;
    }
}
if(!hasMeta) {
    var meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width,initial-scale=1.0');
    document.getElementsByTagName('head')[0].appendChild(meta);
}

var css = document.createElement('link');
css.href = "https://www.etc-plaza.jp/css/sp_mei.css";
css.rel = "stylesheet";
css.type = "text/css";
document.head.appendChild(css);


/*
var css = document.createElement('link');
css.href = "../css/sp.css";
css.rel = "stylesheet";
css.type = "text/css";
document.head.appendChild(css);
*/



var script = document.createElement('script')
script.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js');
script.setAttribute('type', 'text/javascript');
script.setAttribute('charset', 'UTF-8');
script.addEventListener('load', function() {

	$(function() {
                
                
                var winW = $(window).width();
                var devW = 767;
                var dev2W = 1030;
                
                // window-width 1030px以下
                if(winW <= dev2W) {
                    
                    if( $('h2.title').text().trim() === '利用明細' ) {
                        if( $('form').length ){
                            $('form > table:nth-of-type(1) table.meisaiinfo > tbody > tr:nth-of-type(3) > td > table:nth-of-type(1)').addClass('mselect1');
                            $('form > table:last-of-type table.meisaiinfo > tbody > tr:nth-of-type(2) > td > table:nth-of-type(1)').addClass('mselect2');
                            $('form > table:nth-of-type(1) table.meisaiinfo > tbody > tr:nth-of-type(4) > td > table:nth-of-type(1)').addClass('page1');
                            $('form > table:last-of-type table.meisaiinfo > tbody > tr:nth-of-type(3) > td > table:nth-of-type(1)').addClass('page2');
                            $('form > table:nth-of-type(5) td.meisai_link').css('text-align', 'center');
                            $('.mselect1').clone(true).insertAfter('form > table:nth-of-type(1) table.meisaiinfo > tbody > tr:nth-of-type(3) > td > br');
                            $('form > table:nth-of-type(1) table.meisaiinfo > tbody > tr:nth-of-type(3) > td > table.mselect1:nth-of-type(2)').addClass('mselect1_2');
                            $('.mselect2').clone(true).insertAfter('form > table:nth-of-type(7) table.meisaiinfo > tbody > tr:nth-of-type(2) > td > br');
                            $('form > table:nth-of-type(7) table.meisaiinfo > tbody > tr:nth-of-type(2) > td > table.mselect2:nth-of-type(2)').addClass('mselect2_2');
                        }else{
                            $('table.contents td.contents > div > table:nth-of-type(1) > tbody > tr > td > table.meisaiinfo > tbody > tr:nth-of-type(3) > td > table:nth-of-type(1)').addClass('mselect1');
                            $('table.contents td.contents > div > table:nth-of-type(6) table.meisaiinfo > tbody > tr:nth-of-type(2) > td > table:nth-of-type(1)').addClass('mselect2');
                            $('.mselect1').clone(true).insertAfter('table.contents td.contents > div > table:nth-of-type(1) > tbody > tr > td > table.meisaiinfo > tbody > tr:nth-of-type(3) > td > br');
                            $('.mselect2').clone(true).insertAfter('table.contents td.contents > div > table:nth-of-type(6) > tbody > tr > td > table.meisaiinfo > tbody > tr:nth-of-type(2) > td > br');
                            $('table.contents td.contents > div > table:nth-of-type(1) > tbody > tr > td > table.meisaiinfo > tbody > tr:nth-of-type(3) > td > table.mselect1:nth-of-type(2)').addClass('mselect1_2');
                            $('table.contents td.contents > div > table:nth-of-type(6) > tbody > tr > td > table.meisaiinfo > tbody > tr:nth-of-type(2) > td > table.mselect2:nth-of-type(2)').addClass('mselect2_2');
                        }
//                        //期間選択
                        $('.mselect1:nth-of-type(1) tr td.mlink, .mselect2:nth-of-type(1) tr td.mlink').remove();
                        $('.mselect1:nth-of-type(1) tr td.mlink_disable, .mselect2:nth-of-type(1) tr td.mlink_disable').remove();
                        $('.mselect1:nth-of-type(1) tr td, .mselect2:nth-of-type(1) tr td').css('margin', '2px');
                        $('.mselect1:nth-of-type(1) tr td > span, .mselect2:nth-of-type(1) tr td > span').parent().not('td.mlink_no_current').before('<span class="br">');

                        $('.mselect1:nth-of-type(1) tr, .mselect2:nth-of-type(1) tr').css('display', 'block');
                        $('.mselect1:nth-of-type(1) tr, .mselect2:nth-of-type(1) tr').addClass('tr');

                        var notlist = 'td.mlink, td.mlink_disable';
                        $('.mselect1:nth-of-type(2) tr td, .mselect2:nth-of-type(2) tr td').not(notlist).remove();
                        $('.page1:nth-of-type(2) td, .page2:nth-of-type(2) td').not('td.plink').remove();
                        
                        
                        var tableW = $('tr.meisai').parent().parent().width();
                        var frameW = $('div.contentsWrapper').width() * 0.95;
                        if(tableW >= frameW){
                            $('tr.meisai').parent().parent().wrap('<div class="meisai-wrap table-wrap">');
                            $('div.meisai-wrap').css({
                                'width': frameW,
                                'overflow-x': 'scroll'
                            });
                        }
                        $('div.meisai-wrap td').css('white-space','nowrap');
                    }
                }
                
                // window-width 767px 以下
                if(winW <= devW){
                    const txt = $('h2.title').text().trim();
                    console.log(txt);
                    
                    $('span').css('word-break','break-all');
                    if( $('table.procedure_container > tbody > tr > td:nth-of-type(5)').length ){
                        $('table.procedure_container > tbody > tr:nth-of-type(1)').clone(true).appendTo('table.procedure_container');
                        $('table.procedure_container > tbody > tr:nth-of-type(1) td:gt(2)').css('display', 'none');
                        $('table.procedure_container > tbody > tr:nth-of-type(2) td:lt(3)').css('display', 'none');
                    }
                    
                    
                    //上下表示テーブル
                    $('td.caption_top').parent().parent().parent().addClass('fl').addClass('sign');
                    $('td.caption_top br').remove();
                    
                    $('table.sign').css({'cssText': 'border: solid 1px #234600'});
                    $('td.caption_left').css('border-left', 'none')
                    $('td.caption_bottom').css('border-bottom', 'none')
                    $('table.sign > tbody > tr:first-of-type > td:first-of-type').css('border-top', 'none');
                    $('table.sign > tbody > tr:last-of-type > td:last-of-type').css('border-bottom', 'none');
                    
                    
                    
                    if( $('form').length ){ 
                        var tr = $('table.sign > tbody > tr').length;
                        for(var i = 0; i < tr ; i++){
                            if($('table.sign > tbody > tr:nth-of-type(' + i + ') > td.caption_left').text().trim().indexOf('ＥＴＣカードによるご利用年月日') >= 0){
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table').addClass('date');
                                if($('table.date td').length >= 7){
                                    $('table.date').clone(true).insertAfter('table.date').addClass('clone');
                                    $('table.sign > tbody > tr:nth-of-type(' + i + ') table.date:first td:last-of-type').remove();
                                    $('table.sign > tbody > tr:nth-of-type(' + i + ') table.date:last td:lt(6)').remove();
                                }
                                $('table.date.clone').removeClass('date').removeClass('clone');
                                var length = $('table.date td').length;
                                for(var j = 1; j <= length; j++){
                                    if( (j % 2) == 0 ){
                                        var text = $('table.date td:nth-of-type(' + j + ')').text().trim();
                                        $('<span class="normal2 add">').appendTo('table.date td:nth-of-type(' + (j-1) + ')');
                                        $('table.date td:nth-of-type(' + (j-1) + ') span.add').text(text);
                                        $('table.date td:nth-of-type(' + j + ')').addClass('remove');
                                    }
                                }
                                $('table.date td.remove').remove();
                                var html = $('table.date td:last-of-type').prev().html();
                                var html_add = $('table.date td:last-of-type').html();
                                html = html + html_add;
                                $('table.date td:last-of-type').remove();
                                $('table.date td:last-of-type').html(html);
                                $('table.date tr').css({
                                    'display': 'flex',
                                    'flex-wrap': 'wrap'
                                });
                            }
                            
                            
                            if($('table.sign > tbody > tr:nth-of-type(' + i + ') > td.caption_left').text().trim() === '車載器情報'){
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table').clone(true).insertAfter('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1)').css('width', 'auto');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td').css('width', 'auto');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:gt(0)').css('display', 'none');

                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2) > input').remove();
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(4) > input').remove();
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(6) > input').remove();

                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(7)').css('display', 'table-cell');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(7) br').remove();
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(2)').css('width', 'auto');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').css('display', 'none');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(2) > input').css('width', '62.5px');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(4) > input').css('width', '100px');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(6) > input').css('width', '75px');
                                $('table.sign > tbody > tr:nth-of-type(' + i + ') > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(7)').css('display', 'none');
                                
                                var j = i+2;
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table').css('height', 'auto');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table').clone(true).insertAfter('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(1) > tbody > tr > td').css('width', 'auto');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(1) > tbody > tr > td:nth-of-type(1) br').remove();
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2)').css('text-align', 'left');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(1) > tbody > tr > td:nth-of-type(3)').css('display', 'none');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(1) > tbody > tr > td:nth-of-type(4)').css('display', 'none');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').css('display', 'none');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(2)').css('display', 'none');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(3)').css('text-align', 'left');
                                $('table.sign > tbody > tr:nth-of-type(' + j + ') > td > table tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(3)').css('width', '100%');
                                
                                if(!$('table.sign > tbody > tr:nth-of-type(' + i + ') > td.caption_left').hasClass('caption-top')){
                                    $('table.sign > tbody > tr:nth-of-type(' + i + ') > td.caption_left').css({
                                        'border-bottom': 'solid 1px black',
                                        'padding': '5px 0'
                                    });
                                }
                            }
                        }
                    }
                    
                    
                    //以下ページ別対応
                    if(txt === 'カードの追加登録／削除 -お申込-'){
                        if( !$('table.contents > tbody > tr > td').hasClass('contents') ){
                            $('table.contents > tbody > tr > td').addClass('contents');
                        }
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) table').addClass('fl');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) table').addClass('card-no-table');
                    }
                    
                    if(txt === 'カードの追加登録 -確認-'){
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table').addClass('fl');
                    }
                    
                    if(txt === 'カードの追加登録 -完了-'){
                        $('table.contents td.contents > div > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2) table').addClass('fl');
                        $('table.contents td.contents > div > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2) table').addClass('card-no-table');
                    }
                    
                    if(txt ==='カードの削除 -確認-' || txt === 'カードの削除 -完了-') {
                        $('table.fl > tbody > tr > td:nth-of-type(2) table').addClass('fl');
                        $('table.fl > tbody > tr > td:nth-of-type(2) table').addClass('card-no-table');
                    }
                    
                    if(txt === 'カードの追加登録 -完了-' || txt === 'カードの削除 -完了-'){
                        $('table.fl.sign').css('margin-bottom','15px');
                    }
                    
                    
                    if(txt ==='ユーザーＩＤ照会 -お申込-'){
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) table').clone(true).insertAfter('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) table');
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) table:nth-of-type(1) > tbody > tr > td:nth-of-type(2)').remove();
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').remove();
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) table:nth-of-type(2) > tbody > tr > td:nth-of-type(1) br').replaceWith(' ');
                        $('table.fl > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(4)').clone(true).insertAfter('table.fl > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(4)');
                        $('table.fl > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)').remove();
                        $('table.fl > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(1)').remove();
                        $('table.fl > tbody > tr:nth-of-type(5) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(1) br').remove();
                    }
                    
                    if(txt === '利用実績 -検索-'){
                        $('table.fl > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table').css('width', 'auto').addClass('date');
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table ').css('width', 'auto');
                        var html = $('table.date td:last-of-type').prev().html();
                        var html_add = $('table.date td:last-of-type').html();
                        html = html + html_add;
                        $('table.date td:last-of-type').remove();
                        $('table.date td:last-of-type').html(html);
                        $('table.date tr').css({
                            'display': 'flex',
                            'flex-wrap': 'wrap'
                        });
                        
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table ').css('border-collapse', 'collapse');
                        $('table.fl > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table > tbody > tr > td:nth-of-type(1)').css('padding', '5px');
                        $('input.tno1').css('width', '62.5px');
                        $('input.tno2').css('width', '75px');
                    }
                    
                    if (txt === '利用実績 -確認-'){
                        $('div.contentsWrapper > table.contents td.contents > div > table:nth-of-type(2)').wrap('<div class="table-wrap">');
                        $('div.contentsWrapper > table.contents td.contents > div > div').css('overflow-x', 'scroll');
                        
                    }
                    
                    if(txt === 'サービスのご解約 -お申込-' || txt === 'サービスのご解約 -確認-') {
                        var attention = $('span.attention').length;
                        for(var i = 0; i < attention; i++){
                            var text = $('span.attention:eq(' + i + ')').text();
                            if(text.indexOf('==') >= 0){
                                $('span.attention:eq(' + i + ')').addClass("remove");
                            }
                        }
                        $('span.remove').remove();
                    }
                    
                    if(txt === '利用明細検索'){
                        $('table.contents > tbody > tr > td.contents > div').css('min-width', '301px');
                        $('form > table.fl > tbody > tr > td > table').not('form > table.fl > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table').addClass('fl');
                        $('form > table.fl > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table').removeClass('fl');
                        $('form > table.fl > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table').clone(true).insertAfter('form > table.fl > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table');
                        $('form > table.fl > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:gt(0)').remove();
                        $('form > table.fl > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table:nth-of-type(2)').css('width', 'auto');
                        $('form > table.fl > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').remove();
                        $('form > table.fl > tbody > tr:nth-of-type(7) > td table').removeClass('fl');
//                        
                        $('form > table.fl > tbody > tr:last-of-type > td:nth-of-type(2) table table').addClass('fl');
                        $('form > table.fl > tbody > tr:last-of-type > td:nth-of-type(2) table table').addClass('card-no-table');
                        
                        
                        $('form > table.fl > tbody > tr:nth-of-type(1) > td > table').addClass('date').css('width','auto');
                        
                        $('table.date tr').css({
                            'display': 'flex',
                            'flex-wrap': 'wrap'
                        });
                        $('<td class="add_td">').appendTo('table.date tr');
                        var count = $('table.date').length;
/*
                        for(var i = 0; i < count; i++){
                            var table = $('table.date:eq(' + i + ') td.add_td').prev().html();
                            table = table.replace("から","").replace("まで", "");
                            $('table.date:eq(' + i + ') td.add_td').prev().html(table);
                        }
                        $('table.date:first td.add_td').text('から');
                        $('table.date:last td.add_td').text('まで');
                        
                        var text1 = $('table.date td:nth-of-type(2)').html();
                        var text2 = $('table.date td:nth-of-type(3)').html();
                        text1 = text1 + text2;
                        $('table.date td:nth-of-type(2)').html(text1);
                        $('table.date td:nth-of-type(3)').remove();
*/
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規仮登録 -お申込-'){
                        $('form').css('width','90%');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(1)').clone(true).insertAfter('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(1)');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(1) > td:nth-of-type(2)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(2) > td:nth-of-type(1)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(2) > td:nth-of-type(1) br').replaceWith(' ');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(2) > td').removeAttr('rowspan');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(4)').clone(true).insertAfter('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(4)');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(1)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td br').replaceWith(' ');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) td:nth-of-type(2) > table > tbody > tr:nth-of-type(4) > td').removeAttr('rowspan');
                        
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(3) > td').addClass('item_left');
                        
                        $('form > table:nth-of-type(2) > tbody > tr:nth-of-type(2) table tr').css({
                            'display': 'flex',
                            'flex-wrap': 'wrap'
                        });
                        $('form > table:nth-of-type(2) > tbody > tr:nth-of-type(2) table tr td:nth-of-type(2)').addClass('input_td');
                        $('form > table:nth-of-type(2) > tbody > tr:nth-of-type(3) > td').css('height', 'auto');
                        $('form > table:nth-of-type(2) > tbody > tr > td').not('form > table:nth-of-type(2) > tbody > tr > td.caption_top').css('padding', '0');
                        $('form > table:nth-of-type(2) > tbody > tr:nth-of-type(3) > td > table').css('padding', '5px');
                        $('form > table:nth-of-type(2) > tbody > tr:nth-of-type(4) > td > input').css('margin', '5px');
                        $('table.fl img').css('float', 'inherit');
                        
                        $('td.item_left').css('border-left', 'none')
                    }
                    
                    if( txt === 'アカウントロック解除 -ご登録内容確認-'){
                        $('form > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table').clone(true).insertAfter('form > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table');
                        $('form > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2)').remove();
                        $('form > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').remove();
                        $('form > table > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td br').replaceWith(' ');
                    }
                
                    if( txt === '利用明細' ) {
                        $('table.fl').css('width', 'auto');
                        
                       if( $('form').length ){
                            $('form').css('width', '90vw');
                            $('form').css('min-width', '320px');
                            $('form > table').not('form > table:nth-of-type(1)').not('form > table:nth-of-type(7)').css({'cssText': 'width: 90vw !important'});
                            
                            //明細テーブル横スクロール
                            $('form > div:nth-of-type(1) table').css('table-layout', 'initial');
                            $('form > div:nth-of-type(1)').css('overflow-x', 'scroll');
                            $('form > div:nth-of-type(1)').css({'cssText': 'overflow-x: scroll;' + 'width: 90vw !important'});
                            $('table.meisaiinfo > tbody > tr:nth-of-type(1) > td').css('border-top','none');
                            $('form > table:nth-of-type(2)').addClass('fl');
                            $('form > table:nth-of-type(3)').addClass('fl');
                            $('form > table:nth-last-of-type(2)').addClass('fl');
                            $('form > table:nth-last-of-type(2) > tbody > tr > td:nth-of-type(1)').after('<br>');
                            $('form > table:nth-last-of-type(2) > tbody > tr > td:nth-of-type(2) > table').removeClass('fl');
                            $('form > table:last-of-type > tbody > tr > td > table:nth-of-type(2)').addClass('fl meisai_bottom');
                        }else{
                            //明細テーブル横スクロール
                            $('table.contents td.contents > div > div:nth-of-type(1) table').css('table-layout', 'initial');
                            $('table.contents td.contents > div > div:nth-of-type(1)').css('overflow-x', 'scroll');
                            $('table.contents td.contents > div > div:nth-of-type(1)').css({'cssText': 'overflow-x: scroll;' + 'width: 90vw !important'});
                            $('table.contents td.contents > div > div > table > tbody > tr:nth-of-type(1) > td > span').css('word-break', 'keep-all');
                            $('table.meisaiinfo > tbody > tr:nth-of-type(1) > td').css('border-top','none');
                            $('table.contents td.contents > div > table:nth-of-type(2)').addClass('fl');
                            $('table.contents td.contents > div > table:nth-of-type(2) > tbody > tr > td').addClass('meisai_link');
                            $('table.contents td.contents > div > table:nth-of-type(3)').addClass('fl');
                            $('table.contents td.contents > div > table:nth-of-type(3) > tbody > tr > td').addClass('meisai_link');
                            $('table.contents td.contents > div > table:nth-of-type(4)').addClass('fl');
                            $('table.contents td.contents > div > table:nth-of-type(4) > tbody > tr > td:nth-of-type(1)').after('<br>');
                            $('table.contents td.contents > div > table:nth-of-type(4) > tbody > tr > td:nth-of-type(2) > table').removeClass('fl');
                            $('table.contents td.contents > div > table:nth-of-type(5) > tbody > tr > td > table:nth-of-type(2)').addClass('fl meisai_bottom');
                        }
                        
                        //期間選択
                        var index1 = [];
                        var length = $('.mselect1:nth-of-type(1) tr.tr td').length;
                        for(var i = 0; i <= length; i++){
                            if(  $('.mselect1:nth-of-type(1) tr.tr td:nth-of-type(' + i + ') span.normal3').length ){
                                index1.push(i);
                            }
                        }
                        for(var i = 0; i < index1.length; i++){
                            var point = index1[i] + 7;
                            if(point <= index1[i+1]){
                                $('.mselect1:nth-of-type(1) tr td:nth-of-type(' + point + ')').before('<td>');
                                $('.mselect1:nth-of-type(1) tr td:nth-of-type(' + point + ')').before('<span>');
                                $('.mselect1:nth-of-type(1) tr td:nth-of-type(' + point + ')').css('width', '44.61px');
                            }
                        }
                        
                        var index2 = [];
                        var length = $('.mselect2:nth-of-type(1) tr.tr td').length;
                        for(var i = 0; i <= length; i++){
                            if(  $('.mselect2:nth-of-type(1) tr.tr td:nth-of-type(' + i + ') span.normal3').length ){
                                index2.push(i);
                            }
                        }
                        for(var i = 0; i < index2.length; i++){
                            var point = index2[i] + 7;
                            if(point <= index2[i+1]){
                                $('.mselect2:nth-of-type(1) tr td:nth-of-type(' + point + ')').before('<td>');
                                $('.mselect2:nth-of-type(1) tr td:nth-of-type(' + point + ')').before('<span>');
                                $('.mselect2:nth-of-type(1) tr td:nth-of-type(' + point + ')').css('width', '44.61px');
                            }
                        }
                        
                        //ページネーション
                        $('.page1').clone(true).insertAfter('form > table:nth-of-type(1) table.meisaiinfo > tbody > tr:nth-of-type(4) > td > br');
                        $('.page2').clone(true).insertAfter('form > table:nth-of-type(6) table.meisaiinfo > tbody > tr:nth-of-type(3) > td > br');
                        $('.page1:nth-of-type(1) td.plink, .page2:nth-of-type(1) td.plink').remove();
                        $('.page1:nth-of-type(2) td, .page2:nth-of-type(2) td').not('td.plink').remove();
                        
                        //明細テーブル横スクロール
                        $('form > div:nth-of-type(1)').css({'cssText': 'overflow-x: scroll;' + 'width: 90vw !important'});
                        
                        $('td.item_right').css('border-right', 'none');
                        $('table.sign > tbody > tr:nth-of-type(3) > td:nth-of-type(2)').css('border-left', '');
                        $('table.sign > tbody > tr:nth-of-type(4) > td:nth-of-type(1)').css('border-left', '');
                        $('table.sign > tbody > tr:nth-of-type(4) > td:nth-of-type(1)').css('border-left', '');
                        $('table.sign > tbody > tr:nth-of-type(1) > td:nth-of-type(2)').css('border-top', 'none')
                        $('table.sign > tbody > tr:nth-of-type(1) > td:nth-of-type(2)').css('border-right', 'none');
                        $('table.sign > tbody > tr:nth-of-type(1) > td:nth-of-type(2)').css('border-left', 'solid 1px #234600');
                        
                        var sign_html = $('table.sign').html();
                        sign_html = sign_html.replace(/\\/g,'&yen;').replace(/\\/g,'&yen;');
                        $('table.sign').html(sign_html);
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -確認-'){
                        $('table.contents > tbody > tr > td.contents > div > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(2) > table').addClass('fl');
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -本登録完了-'){
                        $('table.contents > tbody > tr > td.contents > div > table:nth-of-type(1) > tbody > tr:nth-of-type(3) > td:nth-of-type(2) > table').addClass('fl');
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -お申込-（登録カード種別選択）'){
                        $('form > div > table').css('width', '90%');
                        $('<br><br>').insertAfter('form > div > table:nth-of-type(2)');
                        $('form > div > table:nth-of-type(1)').clone(true).insertAfter('form > div > br:nth-of-type(3) ');
                        $('<br>').insertAfter('form > div > table:nth-of-type(3)');
                        $('form > div > table:nth-of-type(2)').clone(true).insertAfter('form > div > br:nth-of-type(4) ');
                        
                        $('form > div > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2)').remove();
                        $('form > div > table:nth-of-type(2) > tbody > tr > td:nth-of-type(2)').remove();
                        $('form > div > table:nth-of-type(3) > tbody > tr > td:nth-of-type(1)').remove();
                        $('form > div > table:nth-of-type(4) > tbody > tr > td:nth-of-type(1)').remove();
                        
                        $('form > div > table:nth-of-type(odd) > tbody > tr > td > img').not('form > div > table:nth-of-type(5) > tbody > tr > td > img').css('width', '100%');
                        $('form > div > table:nth-of-type(2n) > tbody > tr > td > a > img').css('width', '85%');
                        $('form > div > table:nth-of-type(5) > tbody > tr > td:nth-of-type(2) > p').css('margin-right', '0');
                        
                        $('form > div > table:nth-of-type(5) > tbody > tr > td:nth-of-type(1)').css('vertical-align', 'top');
                        $('form > div > table:nth-of-type(5) > tbody > tr > td:nth-of-type(1)').css('padding-top', '3rem');
                    }
                    
                    if(txt === 'パスワード再設定のお願い -変更-'){
                        $('div.contentsWrapper > table.contents td.contents > div > form > table:nth-of-type(1)').removeClass('fl sign');
                        $('div.contentsWrapper > table.contents td.contents > div > form > table:nth-of-type(1)').css('border', 'none')
                        $('div.contentsWrapper > table.contents td.contents > div > form > table:nth-of-type(1) > tbody > tr:nth-of-type(2) > td:nth-of-type(1)').css('border-left', '')
                        $('div.contentsWrapper > table.contents td.contents > div > form > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(3)').css('border-bottom', '')
                    }
                    
                    if(txt === 'ユーザー情報変更 -変更-'){
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(9) > td > table:nth-of-type(1)').addClass('fl');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(9) > td > table:nth-of-type(1) br').replaceWith(" ");
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(9) > td > table:nth-of-type(1) > tbody > tr:nth-of-type(1)').after('<span>');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(9) > td > table:nth-of-type(1) > tbody > span').addClass('span-br');
                        
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(13) > td > table').addClass('fl');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(13) > td > table br').replaceWith(" ");
                        $('.item_left').css('border-left', 'none');
                        $('form > table:nth-of-type(1)').css('border', 'solid 1px #234600')
                        $('td.caption_left').css('border-left', 'none');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td.caption_left.caption_top.caption_right').css('border-top', 'none');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(14) > td.item_bottom').css('border-bottom', 'none');
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -お申込-（ＥＴＣクレジットカード／ＥＴＣパーソナルカード登録用）' || txt === 'ＥＴＣ利用照会サービス新規本登録 -お申込-（ＥＴＣコーポレートカード登録用）'){
                        $('tr.pwRow').css('margin-top', '0')
                        $('table.cardTable').css('margin','0')
                        $('table.sign > tbody > tr:nth-of-type(12) > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td').css({'cssText': 'width: calc(90vw - 12px)'});
//                        $('table.sign > tbody > tr:nth-of-type(6) > td:nth-of-type(2) > table:nth-of-type(1)').css('width', 'auto')
                        $('form > table').css({'cssText': 'width: 90% !important'});
                        $('form > table').css('margin', 'auto')
                        
                        $('form > div > table:nth-of-type(1) > tbody > tr:nth-of-type(12) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr:nth-of-type(2)').clone(true).insertAfter('form > div > table:nth-of-type(1) > tbody > tr:nth-of-type(12) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr:nth-of-type(2)');
                        $('form > div > table:nth-of-type(1) > tbody > tr:nth-of-type(12) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr:nth-of-type(2) > td:nth-of-type(2)').remove();
                        $('form > div > table:nth-of-type(1) > tbody > tr:nth-of-type(12) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr:nth-of-type(3) > td:nth-of-type(1)').remove();
                        $('form > div > table:nth-of-type(1) > tbody > tr:nth-of-type(12) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr:nth-of-type(3) > td:nth-of-type(1) br').replaceWith(' ');
                        
                        $('form > div > table > tbody > tr:nth-of-type(10) table table:nth-of-type(2) tr').css({
                            'display': 'flex',
                            'flex-wrap': 'wrap'
                        });
                        $('form > div > table > tbody > tr:nth-of-type(10) table table:nth-of-type(2) tr p').css({
                            'margin': '0',
                            'text-align': 'left'
                        });
                        $('td').removeAttr('nowrap');
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -お申込-（ＥＴＣクレジットカード／ＥＴＣパーソナルカード登録用）'){
                        $('table.sign > tbody > tr:nth-of-type(10) > td > table > tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(3) > p').css('text-align', 'left');
                        $('table.sign > tbody > tr:nth-of-type(10) > td > table > tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(4) img').css('max-width', '100px');
                        $('table.sign > tbody > tr:nth-of-type(10) > td > table > tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(4) img').css('width', '100%');
                        $('table.sign > tbody > tr:nth-of-type(10) > td > table > tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(4) img').css('height', 'auto');
                        $('table.sign > tbody > tr:nth-of-type(10) > td > table > tbody > tr > td > table:nth-of-type(2) > tbody > tr > td:nth-of-type(4)').css('width', '100px');
                    }
                    
                    if(txt ==='ＥＴＣマイレージサービスのＩＤ／パスワード入力'){
                        if( $('table.sign > tbody > tr').length === 3 ) {
                            $('table.sign > tbody > tr:nth-of-type(2) > td:first-of-type').css('border-top', 'none')
                        }
                    }
                    
                    if(txt === 'ログイン') {
                        $('form > table:nth-of-type(2)').css('table-layout', 'fixed');
                        $('form > table:nth-of-type(2) > tbody > tr:nth-of-type(1) > td > table').css('width', '100%');
                    }
                    
                    if(txt === '新パスワード発行 -お申込-'){
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table').clone(true).insertAfter('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1) br').replaceWith(' ');
                        
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > table').clone(true).insertAfter('form > table:nth-of-type(1) > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > table');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > table:nth-of-type(1) > tbody > tr > td:nth-of-type(2)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(2) > td:nth-of-type(2) > table:nth-of-type(2) > tbody > tr > td:nth-of-type(1) br').replaceWith(' ');
                        
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(4)').clone(true).insertAfter('form > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(4)');
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(1)').remove();
                        $('form > table:nth-of-type(1) > tbody > tr:nth-of-type(4) > td:nth-of-type(2) > table > tbody > tr:nth-of-type(5) > td:nth-of-type(1) br').replaceWith(' ');
                        
                    }
                    
                    
                    //エラーページ
                   // $('table.error table tr:nth-of-type(1) td:nth-of-type(2) br').not(txt === 'ＥＴＣ利用照会サービス新規仮登録 -確認してください-').remove();
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -確認してください-' || txt === 'カードの追加登録／削除 -確認してください-'){
                        if($('table.error > tbody > tr  td.error_top > table > tbody > tr:nth-of-type(2) > td > table').length){
                            var text = $('table.error table tr:nth-of-type(2) td span').text().replace(/\s+/g,'').split('●');
                            $('table.error > tbody > tr  td.error_top > table > tbody > tr:nth-of-type(2) > td > span').html('車載器管理番号の入力にあたっては、<br>以下の点にご注意のうえ、再度入力をお願いします。');
                            $('table.error > tbody > tr  td.error_top > table > tbody > tr:nth-of-type(2) > td > span').append('<ul>');
                            $('table.error > tbody > tr  td.error_top > table > tbody > tr:nth-of-type(2) > td > span > ul').css('padding-left', '20px');
                            for(var i = 1; i < text.length; i++){
                                $('table.error > tbody > tr  td.error_top > table > tbody > tr:nth-of-type(2) > td > span > ul').append('<li>');
                                $('table.error > tbody > tr  td.error_top > table > tbody > tr:nth-of-type(2) > td > span > ul > li:nth-of-type(' + i + ')').text(text[i]);
                            }

                            $('table.error > tbody > tr > td.error_top > table > tbody > tr:nth-of-type(2) > td table > tbody > tr:nth-of-type(1) > td:nth-of-type(2) > span').addClass('k');
                            trim1 = $('span.k').text().replace(/\s+/g,' ');
                            $('span.k').text(trim1);

                            $('table.error > tbody > tr > td.error_top > table > tbody > tr:nth-of-type(2) > td table > tbody > tr:nth-of-type(2) > td > span').addClass('m');
                            trim2 = $('span.m').text().replace(/\s+/g,' ');
                            $('span.m').text(trim2);
                        }
                    }
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規本登録 -確認してください-' || txt === 'カードの追加登録／削除 -確認してください-'){
                        if($('span.attention').text() === 'ご入力のETCカード番号、車載器情報、利用年月日に該当する走行が見つかりません。詳細はこちら。' ){
                            $('td.error_top > table > tbody > tr:nth-of-type(2) > td > br').remove();
                            var html = $('td.error_top > table > tbody > tr:nth-of-type(2) span').html();
                            html = html.replace(/<br>/g,'').replace(/\s+/g,'').replace(/&nbsp;/g,'');
                            var html_arr = html.split('●');
                            $('td.error_top > table > tbody > tr:nth-of-type(2) span').addClass('flag');
                            $('span.flag').html(html_arr[0]);
                            $('span.flag').append('<dl>');
                            for(var i=1;i<4;i++){
                                $('span.flag > dl').append('<dt></dt><dd></dd><br>');
                                var tmp_text = html_arr[i].split('・・・');
                                $('span.flag > dl dt:last-of-type').html('●' + tmp_text[0]);
                                $('span.flag > dl dd:last-of-type').html(tmp_text[1]);
                            }
                        }
                    }
                    
                    
                    
                    if(txt === 'ＥＴＣ利用照会サービス新規仮登録 -確認してください-' || txt === 'ユーザー情報変更 -確認してください-'){
                        var text = $('span.attention').text().split('・');
                        if(text.length > 1){
                            $('span.attention').text('以下のような操作により、処理が受け付けられませんでした。');
                            $('span.attention').append('<ul>');
                            $('span.attention > ul').css('padding-left', '20px');
                            for(var i = 1; i < text.length; i++){
                                $('span.attention > ul').append('<li>');
                                $('span.attention > ul > li:nth-of-type(' + i + ')').text(text[i]);
                            }
                        }
                    }
                    
                    if(txt === 'ユーザーＩＤ照会 -確認してください-' || txt === '新パスワード発行 -確認してください-'){
                        $('td.error_top > table table span:nth-of-type(3)').html('&nbsp;&nbsp;（ナビダイヤルがご利用いただけないお客さま&nbsp;<br>045-477-1262）&nbsp;');
                        $('td.error_top > table table span:nth-of-type(3)').css('display', 'block');
                        $('td.error_top > table table span:nth-of-type(3)').css('text-indent', '-17px');
                        $('td.error_top > table table span:nth-of-type(3)').css('padding-left', '17px');
                    } 
                    
                    if(txt ==='エラー') {
                        $('table.error').css({'cssText': 'width: auto !important'});
                    }
                    
                    //表を左右に動かしてご覧ください
                    $('<p class="addp">表を左右に動かしてご覧ください。</p>').insertBefore('div.table-wrap');
                    $('p.addp').css({
                        'font-size': '80%',
                        'margin': '0',
                        'text-align': 'left'
                    })
                }
	})

})
document.head.appendChild(script)