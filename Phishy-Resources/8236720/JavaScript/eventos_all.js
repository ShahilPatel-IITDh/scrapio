/* Eventos All */


	// EVENTOS INICIAIS
		// Admin
		function iniciar_events_admin($table, $lugar){
			if(!$lugar) setTimeout(function(){ menu_hover_e_click('') }, 0.5)
			mascaras();
			fundoo_fechar();
			input_file_hover();
			criar_css();
			financeiro($table, $lugar);

			$('.campos_menu_admin .sortable').sortable();
			$('select.design').select2();
			$('[rel="draggable"]').draggable();
			$('[rel="tooltip"]').tooltip();

			// Criar ou Gerenciar Itens no Select2
			$("select.design").on("select2:select", function (ev) {
				select2_select(this, ev);
			});
		};

		// Site
		function iniciar_events_site(){
			$(document).ready(function() {
				menu_hover_e_click();
				mascaras();
				$('select.design').select2();
				autocomplete();
				$('[rel="tooltip"]').tooltip();
				criar_css();
			});
		};

		// ******************************
		function langg($palavra){
			return $palavra;
		}
		// ******************************

		// Events Externos
		$(document).ready(function(){
			$divs  = '<div class="events_externos"> ';
				$divs += '<div class="boxs"></div> ';
				$divs += '<div class="alerts"></div> ';
				$divs += '<div class="modals"></div> ';
				$divs += '<div class="requireds dni"></div> ';
				$divs += '<div class="carregando dn"> <img src="'+DIR+'/web/img/outros/carregando/loader.gif" class="dib w32 h32" /> <span> <span class="porcentagem m0 p0"></span> '+langg('Carregando')+'... </span> </div> ';
				$divs += '<div class="outros dni"></div> ';
				$dni = (HOST=='localhost:4000') ? '' : 'dni';
				$divs += '<div class="erros_ajax fechar_hide '+$dni+'"></div> ';
				$divs += '<div class="style dni"></div> ';
			$divs += '</div> ';
			$divs += '<div class="fundoo" onclick="fechar_all()"></div> ';

			$divs  += '<div class="posa t0 l0 mt50"> ';
				$divs += '<a href="'+DIR+'/'+ADMIN+'/?pg=1&m=0" class="db w20 h10 mb2"></a> ';
			$divs += '</div> ';
			$('body').append($divs);
		});
	// EVENTOS INICIAIS



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------




	// FUNCOES IMPORTANTES
		// Alerts
			function alerts($acao, $txt, $varios, $delay){
				if(!$varios)
					$('.alerts .alert').hide();
				if(!$txt) 
					$txt = $acao ? langg('Operação Realizada com Sucesso!') : langg('Ocorreu algum erro inesperado!');
				$n = parseInt(Math.random()*10000000);
				$html  = '<div class="acao_'+($acao ? 1 : 0)+' alert alert_'+$n+'"> ';
					$html += '<i class="icon icon-close" onclick="fechar_alerts('+$n+')"></i> ';
					$html += '<p> '+$txt+' </p> ';
				$html += '</div> ';

				$(".alerts").append($html);
				$delay = $delay ? $delay : 5000;
				$(".alerts .alert_"+$n).stop(true, true).fadeIn(500).delay($delay).fadeOut(1000);
				$(".alerts .alert").each(function() {
					if( !$(this).is(":visible") )
						$(this).remove()
				});
			};
			function fechar_alerts($n){
				$(".alerts .alert_"+$n).stop(true, true).fadeOut(1000);
			};
		// Alerts
	
		// Modals
			function modals($txt, $varios){
				if(!$varios)
					$('.modals .modal').hide();
				if(!$txt)
					$txt = langg('Operação Realizada com Sucesso!');
				$n = parseInt(Math.random()*10000000);
				$html  = '<div class="modal modal_'+$n+' fechar_fade"> ';
					$html += '<i class="icon icon-close fechar_modals" onclick="fechar_modals('+$n+')"></i> ';
					$html += '<h4> '+langg('Informações')+' </h4> ';
					$html += '<div class="contextoo"> '+$txt+' </div> ';
					$html += '<div class="button"> <button class="design fechar_modals cor_fff hover2 hoverr4 bd_2e6da4 back_337ab7" onclick="fechar_modals('+$n+')">'+langg('Fechar')+'</button> </div> ';
				$html += '</div> ';

				$(".modals").append($html);
				$(".modals .modal_"+$n).stop(true, true).fadeIn(500);
				fundoo();
			};
			function fechar_modals($n){
				$(".modals .modal_"+$n).stop(true, true).fadeOut(1000);
				fechar_all();
			};
		// Modals

		// Boxs
			function boxs($classe, $itens, $t10, $url, $tipo){
				$admin = (LUGAR!='site' && $url!='site') ? '/'+ADMIN : '';
				if($classe=='filtro_avancado'){
					$_GET = converter_gets($itens);
					if($_SESSION['filtro_avancado['+$_GET['id']+']'])
						$itens = $itens+'&'+$_SESSION['filtro_avancado['+$_GET['id']+']'];
				}
				$url = ($url && $url!='site') ? $url : 'Boxs/';
				$url_final = $classe;
				if($classe.indexOf(".php") < 0){
					$url_final = $classe+'.php';
				}

				if($classe == 'emitir_nota'){
					$ids = '-';
					$(".ui-selected td:first-child > div").each(function() {
						$dir = $(this).attr('dir');
						if($dir != undefined)
							$ids += $dir+'-';
					});
					$itens = 'ids='+$ids;
				}

				$.ajax({
					type: "POST",
					url: DIR+$admin+"/app/Ajax/"+$url+$url_final,
					data: $itens!=undefined ? $itens+'&classe='+$classe : 'classe='+$classe,
					dataType: "json",
					beforeSend: function(){ ajaxIni(0); },
					error: function($request, $error){ ajaxErro($request, $error); },
					success: function($json){
						if($json.evento != null)
							eval($json.evento);
						if($json.erro != null){
							$delay = $json.delay ? $json.delay : '';
							$.each($json.erro, function($key, $val) {
								alerts(0, $val, 1, $delay);
							});	

						} else if($json.title && $json.html) {
							$html = $json.script!=null ? $json.script+$json.html : $json.html;
							if($tipo == '_preto'){
								$('.boxs').html('<div class="'+$classe+' back0 fechar_fade dn"> <a href="javascript:fechar_all()" class="fechar"><i class="fa fa-times"></i></a> <div class="contextoo p0"> '+$html+' </div> <div class="clear"></div> </div>');
								fundoo($tipo);
							} else {
								$('.boxs').html('<div class="'+$classe+' fechar_fade dn e"> <a href="javascript:fechar_all()" class="fechar"><i class="fa fa-times"></i></a> <h3> '+$json.title+' </h3> <div class="contextoo"> '+$html+' </div> <div class="clear"></div> </div>');
								fundoo($tipo!=undefined ? $tipo : '');
							}
							if($t10){
								$('.boxs > .'+$classe).css('marginTop', 0).css('top', 10);
								topoo();
							} else {
								$top = $(window).scrollTop();
								$top = $top+50;
								$marginTop = (window.innerHeight/2) + ((-1*($('.boxs > .'+$classe).css('height').replace("px", "")))/2);
								$marginTop = ($top+$marginTop < 0) ? 0 : $marginTop;
								$('.boxs > .'+$classe).css('marginTop', $marginTop).css('top', $top);
							}
							$('.boxs > .'+$classe).css('marginLeft', (-1*($('.boxs > .'+$classe).css('width').replace("px", "")))/2);
							$('.boxs > .'+$classe).stop(true, true).slideDown();
							$('.boxs > .'+$classe).draggable();

							mascaras();
							criar_css();
							$('select.design').select2();
							$('[rel="tooltip"]').tooltip();

						} else {
							alerts(0, langg('Pagina Não Encontrada!'));
						}
						$(".carregando").hide();
					}
				});
			}
			function boxs_preto($classe, $itens, $t10, $url){
				boxs($classe, $itens, $t10, $url, '_preto')
			}
			function boxs_branco($classe, $itens, $t10, $url){
				boxs($classe, $itens, $t10, $url, 1)
			}
		// Boxs

		// Boxxs
			function boxxs($func){
				$("ul.boxxs ul.sortable").sortable({
					connectWith: "ul.boxxs ul.sortable",
					beforeStop: function(event, ui) {
						e = ui.item;
						eval($func);
					}
				}).disableSelection();
			}
		// Boxxs

		// Fechar All
			function fechar_all(){
				$('.fechar_hide').stop(true, true).hide();				
				$('.fechar_fade').stop(true, true).delay(50).slideUp();
				$('.fundoo').stop(true, true).delay(50).fadeOut();
				$('.events_externos > .boxs > .ver').remove();
				$('.events_externos > .boxs > .videos').remove();
				$('.events_externos > .boxs > .videos_player').remove();
			}
			function fechar_all_pagamento(){
				$('.fundoo_preto').delay(50).fadeOut();
				$('.events_externos .box_pagamento').remove();
			}
			function fechar_item(){
				$('.fechar_item').stop(true, true).hide();
			}
			function fundoo_fechar(){
				$(document).on('click', function(e) {
					e.stopPropagation();
					fechar_item();
				});
				$('.fechar_item').parent().on('click', function(e) {
					e.stopPropagation();
				});
			};
		// Fechar All

		// Menu Hover e Click
			function menu_hover_e_click($lugar){
				$lugar = $lugar ? $lugar : '';
				// Menu Hover
				    $($lugar+' ul[hover=true] > li').hover(function(e) {
				    	e.stopPropagation();
						$(this).find('> ul').stop(true, true).delay(100).slideDown();
						$(this).addClass('ativo');
				    }, function() {
						$(this).find('> ul').stop(true, true).delay(200).slideUp();
						$(this).parent().find('> li').removeClass('ativo');
				    });
				// Menu Hover

				// Menu Click
					$($lugar+' ul[click=true] > li > a').on('click', function(e) {
						e.stopPropagation();
						if(!$(this).parent().is('.ativo')){
							$(this).parent().parent().find('ul').stop(true, true).delay(200).slideUp();
							$(this).parent().parent().find('li').removeClass('ativo');

							$(this).parent().find('ul').stop(true, true).delay(100).slideDown();
							$(this).parent().addClass('ativo');
						} else {
							$(this).parent().find('ul').stop(true, true).delay(200).slideUp();
							$(this).parent().parent().find('li').removeClass('ativo');
						}
				    });
				    $($lugar+' ul[click_hover=true] > li').hover(function(e) {
				    }, function() {
						$(this).parent().find('ul').stop(true, true).delay(200).slideUp();
						$(this).parent().parent().find('li').removeClass('ativo');
					});
				// Menu Click
			};
		// Menu Hover e Click

		// Auto Complete
			function autocomplete(){
				$(".autocomplete").autocomplete({
					source: function( request, response ) {
						$.ajax( {
							type: "POST",
							url: DIR+"/app/Ajax/Autocomplete/cidades.php",
							dataType: "json",
							data: { pesq: request.term, estados: $('select#estados').val() },
							success: function( data ) {
							response( data );
							}
						});
					},
					select: function( event, ui ) {
						setTimeout(function(){
							if($('.autocomplete').attr('dir') == 1){
								veiculoss('', 'cidades');								
							}
						}, .5);
					},
					minLength: 1,
    				//change: function (e, ui) { alert("changed!"); },
    				// log( "Selected: " + ui.item.value + " aka " + ui.item.id );
				});
			};
		// Auto Complete

		// Tabs
			function tabs(e){
				if(!$(e).parent().hasClass('disabled')){
					$(e).parent().parent().find('li').removeClass('ativo');
					$(e).parent().addClass('ativo');
					$(e).parent().parent().parent().find('ul.box').find('> li').removeClass('ativo');
					$(e).parent().parent().parent().find('ul.box').find('li[tabs='+$(e).parent().attr('tabs')+']').addClass('ativo');
				}
			};
			function tabs1(e){
				if(!$(e).parent().hasClass('disabled')){
					$(e).parent().parent().find('li').removeClass('ativo');
					$(e).parent().addClass('ativo');
					$(e).parent().parent().parent().find('> .box').removeClass('ativo');
					$(e).parent().parent().parent().find('.box[tabs='+$(e).parent().attr('tabs')+']').addClass('ativo');
				}
			};
		// Tabs

		// Goemapeamento
			function goemapeamento(){
				navigator.geolocation.getCurrentPosition(goemapeamento_success, goemapeamento_error);
			}
			function goemapeamento_success(position) {
		  		carregarPontos(position.coords.latitude, position.coords.longitude);
			};
			function goemapeamento_error() {
				carregarPontos(0, 0);
			};
		// Goemapeamento

		// Criacao do Css
			function criar_css(){
				setTimeout(function(){ criar_css1(); }, 0.5);
				setTimeout(function(){ criar_css1(); }, 3000);
			}
			function criar_css1(){
				var $css = new Array();
				$x=0;
				$('*').each(function(){
					$classe = $(this).attr('class');
					if($classe){
						$array = $classe.split(" ");
						$.each($array, function($key, $val) {
							if($val.match('back_') || $val.match('bd_') || $val.match('bdt_') || $val.match('bdb_') || $val.match('bdl_') || $val.match('bdr_') || $val.match('cor_')){ //  || $val.match('min-w_') || $val.match('max-w_') || $val.match('min-h_') || $val.match('max-h_') || $val.match('lh_')
								if($css.indexOf($val) < 0){
									$css[$x] = $val;
									$x++;
								}
							}
						});	
					}
				});
				ajaxNormal('Css/css.php', 'css='+$css.join(' '), 1);
			}
		// Criacao do Css

		// Erros Ajax
	 		function erros_ajax($txt){
				$(".erros_ajax").show();
				$html  = '<i class="icon icon-close" onclick="fechar_erros_ajax()"></i> ';
				$html += '<p> '+$txt+' </p> ';
				$(".erros_ajax").html($html);
			};
			function fechar_erros_ajax(){
				$(".erros_ajax").hide();
			};
		// Erros Ajax
	// FUNCOES IMPORTANTES



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// AJAX
		// Ajax Json
		function ajaxJson($url, $data, $n_carregando){
			var $return = $.ajax({
				type: "POST",
				url: DIR+"/app/Ajax/"+$url,
				data: $data ? $data : '',
				async: false,
				beforeSend: function(){ ajaxIni($n_carregando); },
				error: function($request, $error){ ajaxErro($request, $error); },
			}).responseText;
			var $return = $.parseJSON($return);
			return $return;
		}
		function ajaxJsonAdmin($url, $data, $n_carregando){
			return ajaxJson('../../../'+ADMIN+'/app/Ajax/'+$url, $data, $n_carregando)
		}

		// Ajax Rapido
		function ajaxRapido($url, $data, $n_carregando){
			var $return = $.ajax({
				type: "POST",
				url: DIR+"/app/Ajax/"+$url,
				data: $data ? $data : '',
				async: false,
				beforeSend: function(){ ajaxIni($n_carregando); },
				error: function($request, $error){ ajaxErro($request, $error); },
			}).responseText;
			return($return);
		}
		function ajaxRapidoAdmin($url, $data, $n_carregando){
			return ajaxRapido('../../'+ADMIN+'/app/Ajax/'+$url, $data, $n_carregando)
		}

		// Ajax Normal
		function ajaxNormal($url, $data, $n_carregando){
			$.ajax({
				type: "POST",
				url: DIR+"/app/Ajax/"+$url,
				data: $data ? $data : '',
				dataType: "json",
				beforeSend: function(){ ajaxIni($n_carregando); },
				//error: function($request, $error){ ajaxErro($request, $error); },
				success: function($json){
					$(".carregando").hide();
					if($json.evento != null)
						eval($json.evento);
					if($json.erro != null){
						$.each($json.erro, function($key, $val) {
							alerts(0, $val, 1);
						});	
					} else if($json.modal){
						modals($json.modal);
					} else {
						if($json.alert=='z')	'';
						else if($json.msg)		alerts($json.alert, $json.msg);
						else if($json.alert==1)	alerts(1);
						else if($json.alert)	alerts(1, $json.alert);
						else					alerts(0);
					}
				}
			});
		}
		function ajaxNormalAdmin($url, $data, $n_carregando){
			ajaxNormal('../../'+ADMIN+'/app/Ajax/'+$url, $data, $n_carregando)
		}

		// AjaxForm * Nao mudar id para $id por causa desse arquivo (Ajax/Boxs_acoes/mais_fotos_gravar_fotos.php)
		function ajaxForm(id, $url, $n_carregando){
			setTimeout(function(){
				if($url){
					$('#'+id).attr('action', DIR+'/app/Ajax/ajaxForm/'+$url);
				}
				$(document).ready(function(){
					$('#'+id).ajaxForm({
						dataType: 'json',
						//resetForm: true,
						beforeSend: function(){ ajaxIni($n_carregando); },
						error: function($request, $error){ ajaxErro($request, $error); },
						success: function($json){

							if($json.email != null){
								$('.sistema_mautic input[name="mauticform[email]"]').val($json.email);
								$('.sistema_mautic input[name="mauticform[return]"]').val($json.dir);
								setTimeout(function(){ $(".sistema_mautic button").trigger('click') }, 0.5);
							}

							if($json.evento != null)
								eval($json.evento);
							if($json.erro != null){
								$.each($json.erro, function($key, $val) {
									alerts(0, $val, 1);
								});	
							} else if($json.modal){
								modals($json.modal);
							} else {
								if($json.alert=='z')	'';
								else if($json.msg)		alerts($json.alert, $json.msg);
								else if($json.alert==1)	alerts(1);
								else if($json.alert)	alerts(1, $json.alert);
								else					alerts(0);
							}
							$(".carregando").hide();
							if(!$json.erro && !$json.no_reset){
								$('#'+id).find('[type="reset"]').trigger('click');
								$('#'+id).find('select').trigger('change');
							}
						}
		            });
				});
			}, 0.5);
		}
		function ajaxFormAdmin(id, $url, $n_carregando){
			ajaxNormal(id, '../../'+ADMIN+'/app/Ajax/'+$url, $n_carregando)
		}

		function ajaxIni($n_carregando){
			if(!$n_carregando) $('.carregando').show();
		}
		function ajaxErro($request, $error){
			alerts(0); $(".carregando").hide(); erros_ajax($request.responseText);
		}
	// AJAX



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// FUNCOES UTEIS
 		// Rel
		function rel_estados(e, $boxx){
			$tipoo = $(e).attr('rel_estados');
			$boxx = $boxx ? '.boxx' : '';
			if($tipoo == 'cidades'){
				$tipo = $(e).attr('id').replace('estados', '');
				$dir = $(e).attr('dir') ? '[dir="'+$(e).attr('dir')+'"]' : '';
				$val = $(e).attr('cidade') ? '&val='+$(e).attr('cidade').replaceAll(" ", "%20") : '';
				if($(e).val()){
					$($boxx+' #cidades'+$tipo+$dir).load(DIR+"/app/Ajax/Padroes/select_rel.php?estados="+$(e).val()+$val, function(){
						$($boxx+' #cidades'+$tipo+$dir).trigger("change");
					});
				}
			} else if($tipoo == 'bairros'){
				$tipo = $(e).attr('id').replace('cidades', '');
				$dir = $(e).attr('dir') ? '[dir="'+$(e).attr('dir')+'"]' : '';
				$uf = $boxx+' #estados'+$tipo+$dir;
				$cidades = $($uf).attr('cidade') ? $($($uf)).attr('cidade').replaceAll(" ", "%20") : '';;
				$val = $($uf).attr('bairro') ? '&val='+$($($uf)).attr('bairro').replaceAll(" ", "%20") : '';
				$val += '&uf='+$($uf).val();
				if($cidades){
					$($boxx+' #bairros'+$tipo+$dir).load(DIR+"/app/Ajax/Padroes/select_rel.php?cidades="+$cidades+$val, function(){
						$($boxx+' #bairros'+$tipo+$dir).trigger("change");
					});
				}
			}
		}
 		// Rel
		function rel(e, $banco, $modulo){
			$extra = '';
			$(e).parent().parent().parent().parent().parent().parent().parent().find('#'+$banco).load(DIR+"/app/Ajax/Padroes/select_rel.php?banco="+$banco+"&col="+$(e).attr('id')+"&rel="+$(e).val(), function(){
				$(e).parent().parent().parent().parent().parent().parent().parent().find('#'+$banco).trigger("change");
			});
		}

	    // Downloadd
		function downloadd($arquivo){
			window.parent.location = DIR+'/download.php?arquivo='+$arquivo;
		}

		// Fundoo
		function fundoo($op){
			if($op!=undefined) $('.fundoo').stop(true, true).css('background', 'rgba(0, 0, 0, .'+$op+')');
			$('.fundoo').stop(true, true).fadeIn();
		}

		// Topoo
		function topoo(){
			$("html,body").animate( {scrollTop: $("html").offset().top}, "fast" );
		}

		// Replece All
		String.prototype.replaceAll = function($de, $para){
			var $return = this;
			var $pos = $return.indexOf($de);
			while ($pos > -1){
				$return = $return.replace($de, $para);
				$pos = $return.indexOf($de);
			}
			return $return;
		}

		// Strip Tags
		function strip_tags (input, allowed) {
			allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
			var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
			return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
				return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
			})
		}

		// Gets
		function converter_gets($gets){
			var $return = new Array();
			$array = $gets.split("&");
			$.each($array, function(key, val) {
				value = val.split("=");
				$return[value[0]] = value[1];
			});	
			return $return;
		}

		// Get Java
		function getUrlVars(){
			var $return = [], $hash;
			var $hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		 
			for(var i = 0; i < $hashes.length; i++)
			{
				$hash = $hashes[i].split('=');
				$hash[1] = unescape($hash[1]);
				$return.push($hash[0]);
				$return[$hash[0]] = $hash[1];
			}
		 
			return $return;
		}

	    // Votar Star
	    function votar_star(){
			$(".votar_star").hover(function (){
				for (var i = 1; i <= $(this).attr('dir'); i++) {
					$('.votar_star[dir='+i+']').removeClass('fa-star-o');
					$('.votar_star[dir='+i+']').addClass('fa-star');
				};
			}, function(){
				$('.votar_star').removeClass('fa-star');
				$('.votar_star').addClass('fa-star-o');
			});
			$(".votar_star").on("click", function(){
				$('input[name=star]').val($(this).attr('dir'));

				$('.votar_star').addClass('votar_star1');
				$('.votar_star').removeClass('votar_star');

				$('.votar_star1').removeClass('fa-star');
				$('.votar_star1').addClass('fa-star-o');
				for (var i = 1; i <= $(this).attr('dir'); i++) {
					$('.votar_star1[dir='+i+']').removeClass('fa-star-o');
					$('.votar_star1[dir='+i+']').addClass('fa-star');
				};
			});
	    }

		// Ordenar div
		function ordenar_div($id){
			var $container = document.getElementById($id);
			var $elements = $container.childNodes;
			var $sortMe = [];
			for (var i=0; i<$elements.length; i++) {
				if(!$elements[i].id)
					continue;
				var $sortPart = $elements[i].id.split("-");
				if($sortPart.length > 1)
					$sortMe.push([1*$sortPart[1], $elements[i]]);
			}
			$sortMe.sort(function(x, y){
				return x[0]-y[0];
			});
			for(var i=0; i<$sortMe.length; i++)
				$container.appendChild($sortMe[i][1]);
		}

		// Sem Acento
		function sem_acento($strToReplace) {
		    $str_acento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
		    $str_sem_acento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";
		    var $return = "";
		    for (var i = 0; i < $strToReplace.length; i++) {
		        if ($str_acento.indexOf($strToReplace.charAt(i)) != -1) {
		            $return += $str_sem_acento.substr($str_acento.search($strToReplace.substr(i, 1)), 1);
		        } else {
		            $return += $strToReplace.substr(i, 1);
		        }
		    }
		    return $return;
		}

		// Widht Resp
		function widht_resp(){
			$return = $('body').width();
			var userAgent = navigator.userAgent.toLowerCase();
			if( userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i)!= -1 ){
				$return = 300;
			}
		    return $return;
		}

		// Browser
		function browser(){
			if(/*@cc_on!@*/false || typeof ScriptEngineMajorVersion === "function"){
			    $return = 'ie';
			} else if(window.chrome) {
				$return = 'chrome';
			} else if(window.opera) {
				$return = 'opera';
			} else if('MozBoxSizing' in document.body.style) {
				$return = 'firefox';
			} else if({}.toString.call(window.HTMLElement).indexOf('Constructor')+1) {
				$return = 'safari';
			} else {
				$return = 'outros';
			}
			return $return;
		}


	    // Limit Char
	    function progreso_tecla($obj, $max, $id) {
			var $ancho=300;
			var $progreso = document.getElementById('progreso_'+$id);
			if ($obj.value.length < $max){
				var pos = $ancho-parseInt(($ancho*parseInt($obj.value.length))/300);
				$progreso.style.backgroundPosition = '-'+pos+'px 0px';
			} else {
				//alert('Use somente '+$max+' caracteres');
			} 
			$progreso.innerHTML = '('+$obj.value.length+' '+langg('caracteres usados de')+' '+$max+')';
	    } 

		// Input design
		function input_file(e){
			$itens = 0;
			for (var i = 0; i < e.files.length; i++) {
				$itens += 1;
			}
			$(e).parent().find("span>span").html( $itens+' '+langg('Arquivo(s) Selecionado(s)') );
		};
		function input_file_hover(){
			$('.input.file, .pop_file').hover(function (){
				$(this).parent().find('.pop_file').stop().show();
			}, function () {
				$(this).parent().find('.pop_file').stop().hide();
			});
		};

		// Shuffle -> Array Aleatorio
		function shuffle($array) {
		    var j, x, i;
		    for (i = $array.length; i; i -= 1) {
		        j = Math.floor(Math.random() * i);
		        x = $array[i - 1];
		        $array[i - 1] = $array[j];
		        $array[j] = x;
		    }
		}

		// Cep
		function cep(e){
			cepp(e);
		}
		function cepp(e, $pre){
			$pre = $pre  ? $pre : '';
			$cep = $(e).val().trim().replace('.', '').replace('-', '');
			if($cep.length >= 8){
				$.ajax({
					type: "POST",
					url: DIR+"/app/Ajax/Padroes/cep.php",
					data:  { cep: $cep },
					dataType: "json",
					beforeSend: function(){ ajaxIni(0); },
					error: function($request, $error){ ajaxErro($request, $error); },
					success: function($json){
						cepp_vals(e, $pre, $json.rua, $json.estados, $json.cidades, $json.bairros);

						if($json.erro == 1){
							$.ajax({
								type: "POST",
								url: 'https://www.republicavirtual.com.br/web_cep.php?formato=json&cep='+$cep,
								data: '',
								dataType: "json",
								success: function($json){
									var $uf = unescape($json.uf).split(" ");
									cepp_vals(e, $pre, $json.tipo_logradouro+' '+$json.logradouro, $uf[0], $json.cidade.replaceAll("%20", " "), $json.bairro);
									$(".carregando").hide();
								}
							});
						} else {
							$(".carregando").hide();
						}
					}
				});
			} else {
				alerts(0, langg('Digite o CEP Corretamente Para Buscar o Endereço Automaticamente!'));
			}
		}
		function cepp_fields(e){ /*(boxx) */
			cepp(e, '.boxx ');
		}

		function cepp_vals(e, $pre, $rua, $estados, $cidades, $bairros){

			$tipo = $(e).attr('id').replace('cep', '');
			$($pre+'#rua'+$tipo).val($rua);

			// Rel
			$($pre+'#estados'+$tipo).attr('cidade', $cidades).attr('bairro', $bairros);

			$($pre+'#bairro'+$tipo).val($bairros);
			$($pre+'#bairros'+$tipo).val($bairros);

			$($pre+'#cidades_html'+$tipo).html($cidades);
			$($pre+'#cidades'+$tipo).val($cidades);

			if($estados){
				$($pre+'#estados_html'+$tipo).html($estados);
				$($pre+'#estados'+$tipo).val($estados).trigger('change');				
			}

			if($estados){
				$($pre+'#pais'+$tipo).val('Brasil');
			}

		}
	// FUNCOES UTEIS



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// DATAS E NUMEROS
		// Contador
		function contador($classe, $dados){
			contador_time($classe, $dados);
			$.ajax({
				type: "POST",
				url: DIR+"/app/Ajax/Tempo/contador.php",
				data: $dados,
				dataType: "json",
				success: function($json){
					$($classe).html($json.tempo);
				}
			});
		}
		function contador_time($classe, $dados){
			setTimeout(function(){ contador($classe, $dados) }, 1000);
		}

		// Somar Data
		function somar_data($n, $tipo, $ano, $mes, $dia){
			$return = new Array();
			if($ano!=undefined && $mes!=undefined && $dia!=undefined)
				var $data = new Date($ano, $mes, $dia);
			else
				var $data = new Date();
			if($tipo == 'dia')
				$data.setDate($data.getDate() + $n);
			else if($tipo == 'mes')
				$data.setMonth($data.getMonth() + $n);
			else if($tipo == 'ano')
				$data.setFullYear($data.getFullYear() + $n);
			$return['dia'] = $data.getDate();
			$return['mes'] = $data.getMonth()+1;
			$return['ano'] = $data.getFullYear();
			return $return;
		}

		// Mes
		function mes($mes, $ab=0){
			$return = '';
			switch($mes){
				case 0: ($return = $ab ? langg('Jan') : langg('Janeiro'));		break;
				case 1: ($return = $ab ? langg('Fev') : langg('Fevereiro'));	break;
				case 2: ($return = $ab ? langg('Mar') : langg('Março'));		break;
				case 3: ($return = $ab ? langg('Abr') : langg('Abril'));		break;
				case 4: ($return = $ab ? langg('Mai') : langg('Maio'));		break;
				case 5: ($return = $ab ? langg('Jun') : langg('Junho'));		break;
				case 6: ($return = $ab ? langg('Jul') : langg('Julho'));		break;
				case 7: ($return = $ab ? langg('Ago') : langg('Agosto'));		break;
				case 8: ($return = $ab ? langg('Set') : langg('Setembro'));	break;
				case 9: ($return = $ab ? langg('Out') : langg('Outubro'));		break;
				case 10: ($return = $ab ? langg('Nov') : langg('Novembro'));	break;
				case 11: ($return = $ab ? langg('Dez') : langg('Dezembro'));	break;
			}
			return $return;
		}

		// Calendar
		function calendar_mes($acao, e){
			var $data_hj = new Date();
			$mes_atual = new Array();
			$ano_atual = new Array();
			for (var i = 1; i <= 5; i++) {
				$mes_atual[i] = $('ul.calendar li.mes[dir="'+i+'"]').attr('mes');
				$ano_atual[i] = $('ul.calendar li.mes[dir="'+i+'"]').attr('ano');
			};

			if($_SESSION['financeiro_dir'] && !e){
				for (var i = 1; i <= 5; i++) {
					$data = somar_data(i-2, 'mes', $_SESSION['financeiro_ano_ini'], $_SESSION['financeiro_mes_ini'], 1);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('mes', $data['mes']);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('ano', $data['ano']);
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_mes').html(mes($data['mes'], 1));
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_ano').html($data['ano']);
				};
				$('ul.calendar li.mes').removeClass('ativo');
				$('ul.calendar li.mes[dir="'+$_SESSION['financeiro_dir']+'"]').addClass('ativo');

			} else if($acao == 'atual'){
				for (var i = 1; i <= 5; i++) {
					$data = somar_data(i-3, 'mes');
					$('ul.calendar li.mes[dir="'+i+'"]').attr('mes', $data['mes']);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('ano', $data['ano']);
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_mes').html(mes($data['mes'], 1));
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_ano').html($data['ano']);
				};
				$('ul.calendar li.mes').removeClass('ativo');
				$('ul.calendar li.mes[dir="3"]').addClass('ativo');
				$_SESSION['financeiro_dir'] = 3;
				$_SESSION['financeiro_mes_atual'] = $data_hj.getMonth()+1;
				$_SESSION['financeiro_ano_atual'] = $data_hj.getFullYear();
				$_SESSION['financeiro_mes_ini'] = $('ul.calendar li.mes[dir="1"]').attr('mes');
				$_SESSION['financeiro_ano_ini'] = $('ul.calendar li.mes[dir="1"]').attr('ano');
				if(e)
					datatable_update();

			} else if($acao == 'anterior'){
				for (var i = 1; i <= 5; i++) {
					$data = somar_data(i-6, 'mes', $ano_atual[1], $mes_atual[1]-1, 1);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('mes', $data['mes']);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('ano', $data['ano']);
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_mes').html(mes($data['mes'], 1));
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_ano').html($data['ano']);
				};
				$('ul.calendar li.mes').removeClass('ativo');

			} else if($acao == 'proximo'){
				for (var i = 1; i <= 5; i++) {
					$data = somar_data(i, 'mes', $ano_atual[5], $mes_atual[5]-1, 1);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('mes', $data['mes']);
					$('ul.calendar li.mes[dir="'+i+'"]').attr('ano', $data['ano']);
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_mes').html(mes($data['mes'], 1));
					$('ul.calendar li.mes[dir="'+i+'"] a p.d_ano').html($data['ano']);
				};
				$('ul.calendar li.mes').removeClass('ativo');

			} else if($acao == 'mes'){
				e = $(e).parent();
				$('ul.calendar li.mes').removeClass('ativo');
				$(e).addClass('ativo');
				$_SESSION['financeiro_dir'] = $(e).attr('dir');
				$_SESSION['financeiro_mes_atual'] = $(e).attr('mes');
				$_SESSION['financeiro_ano_atual'] = $(e).attr('ano');
				$_SESSION['financeiro_mes_ini'] = $('ul.calendar li.mes[dir="1"]').attr('mes');
				$_SESSION['financeiro_ano_ini'] = $('ul.calendar li.mes[dir="1"]').attr('ano');
				datatable_update();
			}

			$mes_3 = $('ul.calendar li.mes[dir="3"]').attr('mes');
			$ano_3 = $('ul.calendar li.mes[dir="3"]').attr('ano');
			$('ul.calendar li.mes').removeClass('atual');
			if($mes_3-1 == $data_hj.getMonth() && $ano_3 == $data_hj.getFullYear()){
				$('ul.calendar li.mes[dir="3"]').addClass('atual');
			}
		}
		// Calendar
	// DATAS E NUMEROS



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// CONFIGURACOES E VALIDACOES
		// Preencher Campos Corretos (date, editor, etc...) Antes do Submit
		function preencher_campos_corretos(){
			// Date
			$('[type=date][navegador=firefox]').each(function(){
				$ex = $(this).val().split("/");
				$(this).parent().find('[type1=date]').val( $ex[2]+'-'+$ex[1]+'-'+$ex[0] );
			});

			// Editor
			$('.finput.finput_editor').each(function(){
				$id = $(this).find('textarea').attr('id');
		        $('#'+$id).val( CKEDITOR.instances[$id].getData() );
			});
		};

		// Editor Criar Textarea
		function editor_criar_extarea($id) {
			CKEDITOR.replace($id);

			CKEDITOR.config.toolbar = [
										{ name: 'document', items: [ 'Source', '-', 'NewPage', 'Templates', 'Preview', 'Print', '-' ] },
										{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike' ] },
										{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo', '-', 'Find', 'Replace', 'SelectAll', ] },
										{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
										'/',
										{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
										{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
										{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
										{ name: 'insert', items: [ 'Image', 'Flash', 'Table', 'Link', 'Iframe' ] },
										{ name: 'tools', items: [ 'Maximize' ] },
									];

			// Atualizando textarea
			var $editor = CKEDITOR.instances[$id] ;
			$editor.on('contentDom', function() {
			    var $editable = $editor.editable();
			    $editable.attachListener( $editor.document, 'keyup', function() {
			        $('#'+$id).val( CKEDITOR.instances[$id].getData() );
			    });
				CKEDITOR.on( 'instanceReady', function( ev ) { // Focus quando clicar em qualquer lugar onde insere o texto
					$('iframe.cke_wysiwyg_frame', ev.editor.container.$).contents().on('click', function() {
					    ev.editor.focus();
					});
				});
			});
		}
		function editor_criar_normal($id, $html) {
			var $config = {};
			$editor = CKEDITOR.appendTo( $id, $config, $html );
		}

		// Validacoes
		function required_invalid($classe, $tempo){
			setTimeout(function(){
		        $($classe).find('[required]').on("invalid", function(event) {
		        	$nome = $(this).find_parent('class', 'finput').find('label p').html();
		        	if(!$nome || $nome==undefined)
		        		$nome = $(this).find_parent('tags', 'fieldset').find('legend').html();
	        		$tabs = $(this).find_parent('class', 'itens').parent().attr('tabs');
	        		$tabs = $(this).find_parent('class', 'tabs').find('ul li[tabs="'+$tabs+'"] > a').html();
	        		$aba = $tabs ? '(Aba: '+$tabs+')' : '';
		        	$nome = !$nome ? $(this).attr("name") : $nome;
		        	alerts(0, 'Preencha o campo: '+$nome.replaceAll(':', '')+' '+$aba, 1);
		        });
			}, $tempo ? $tempo : 0.5);
		}
		function requireds_ini($classe, $tipo){
			setTimeout(function(){
				$html = $($classe).html().replaceAll('script', 'div class="dni"');
				$('.requireds').html( $html );
				if($tipo) requireds($classe, ".req_tipo_1", ".req_tipo_0");
				else	  requireds($classe, ".req_tipo_0", ".req_tipo_1");
			}, 0.5);
		}			
		function requireds($classe, $valide, $guardar){
			$($classe+' '+$valide).html( $('.requireds '+$valide).html() );
			$($classe+' '+$guardar).html('');
			required_invalid($classe);
			mascaras();
		}
	// CONFIGURACOES E VALIDACOES



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// JQUERY ATALHOS
		// Find Parent
		$.fn.find_parent = function($classe, $nome){
			$return = $(this)
			if($classe == 'tags' || $classe == 'tag'){
				$parent = $(this);
				$x=0;
				for (var $i=0; ($i<100 && $x<1); $i++){
					$parent = $parent.parent();
					if($parent.prop("tagName")){
						if( $parent.prop("tagName").toLowerCase() == $nome )
							$x++;
					}
				};
				$return = $parent;
			} else if($classe=='class'){
				$parent = $(this);
				$x=0;
				for (var $i=0; ($i<100 && $x<1); $i++){
					$parent = $parent.parent();
					if($parent.hasClass($nome))
						$x++;
				};
				$return = $parent;
			} else {
				$parent = $(this);
				$x=0;
				for (var $i=0; ($i<100 && $x<1); $i++){
					$parent = $parent.parent();
					if( $parent.attr($classe) == $nome )
						$x++;
				};
				$return = $parent;
			}
			return $return;
		}

		function trg($classe){					trigger($classe) };
		function trigger($classe){				$($classe).stop(true, true).trigger("click");	};

		function show($classe, $tempo){			$($classe).stop(true, true).show($tempo ? $tempo : ''); }
		function hide($classe, $tempo){ 		$($classe).stop(true, true).hide($tempo ? $tempo : ''); };
		function toggle($classe, $tempo){ 		$($classe).stop(true, true).toggle($tempo ? $tempo : ''); };

		function fshow($classe, $tempo){		fadeIn($classe); };
		function fhide($classe, $tempo){		fadeOut($classe); };
		function ftoggle($classe, $tempo){		fadeToggle($classe); };
		function fadeIn($classe, $tempo){		$($classe).stop(true, true).fadeIn($tempo ? $tempo : ''); };
		function fadeOut($classe, $tempo){		$($classe).stop(true, true).fadeOut($tempo ? $tempo : ''); };
		function fadeToggle($classe, $tempo){	$($classe).stop(true, true).fadeToggle($tempo ? $tempo : ''); }

		function sshow($classe, $tempo){		slideUp($classe); };
		function shide($classe, $tempo){		slideDown($classe); };
		function stoggle($classe, $tempo){		slideToggle($classe); };
		function slideUp($classe, $tempo){		$($classe).stop(true, true).slideUp($tempo ? $tempo : ''); };
		function slideDown($classe, $tempo){	$($classe).stop(true, true).slideDown($tempo ? $tempo : ''); };
		function slideToggle($classe, $tempo){	$($classe).stop(true, true).slideToggle($tempo ? $tempo : ''); }

		function submitt($classe){				setTimeout(function(){ $($classe).submit(); }, 0.5); };
		function css($classe, $acao1, $acao2){	$($classe).css($acao1, $acao2); };
		function setTime($funcao, $tempo){		setTimeout(function(){ $funcao }, $tempo ? $tempo*1000 : 1000); };

		function enter($evento, ev, e){
			if(ev.keyCode == 13) // ev.which esc = 27
				eval($evento);
		};
		function enter_click($classe, ev){
			if(ev.keyCode == 13)
				$($classe).trigger('click');
		};
	// JQUERY ATALHOS



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// COOKIES
		function lerCookie($c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++){
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==$c_name){
					return unescape(y);
				}
			}
		}
		function gravarCookie($c_name, $value, $exdays){
			var $exdate=new Date();
			$exdate.setDate($exdate.getDate() + $exdays);
			var $c_value=escape($value) + (($exdays==null) ? "" : "; expires="+$exdate.toUTCString());
			document.cookie=$c_name + "=" + $c_value;
		}
	// COOKIES


	// PRINT_R
		function pre($obj) {
 			var $return = '';
			Object.keys($obj).forEach(function($key) {
			    $return += $obj[$key]+'<br>';
			});
			return $return;
		}
		function pree($obj) {
 			var $return = '';
			Object.keys($obj).forEach(function($key) {
			    $return += key+' => '+$obj[$key]+'<br>';
			});
			return $return;
		}
	// PRINT_R



	// ----------------------------------------------------------------------------------------------------------------------------------------------------------



	// PLUGINS

		// OwlCarousel -> http://www.samsung.com/hk_en/tvapps/owl.carousel/index.html
		function Plugin1(){
			$(".Plugin1").each(function() {
				$(this).addClass('Plugin');
				$itens = $(this).attr('itens') ? $(this).attr('itens') : 5;
				$banner = $(this).attr('itens')==1 ? true : false;
				$auto = $(this).attr('auto')==0 ? false : $(this).attr('auto')*1000;
				$altura_flexcivel = $(this).attr('altura_flexcivel')==0 ? false : true;
				$(this).owlCarousel({
					items : $itens,
			      	singleItem: $banner,
			      	autoPlay : $auto,
      				autoHeight : $altura_flexcivel, // Altura Flexcivel
				});
			});
		}

		// Bxslider -> http://bxslider.com/examples/carousel-demystified // http://bxslider.com/options
		function Plugin2(){
			$(".Plugin2").each(function() {
				$width = $(this).attr('w') ? $(this).attr('w') : $(this).find('> li').width();
				$min = $(this).attr('min') ? $(this).attr('min') : 1;
				$max = $(this).attr('max') ? $(this).attr('max') : 10;
				$auto = $(this).attr('auto') ? $(this).attr('auto')*1000 : false;
				$itens = $(this).attr('itens') ? $(this).attr('itens') : 0;
				$start = $(this).attr('star') ? $(this).attr('star') : 0;
				$direction = $(this).attr('vertical')==1 ? 'vertical' : 'horizontal';
				$(this).bxSlider({
				    slideWidth: $width,
				    minSlides: $min,
				    maxSlides: $max,
				    auto: $auto,
				    pause: $auto,
				    moveSlides: $itens, // Itens por vez
				    startSlide: $start, // Qual pagina comecar
				    mode: $direction, // Vertical ou Horizontal
				});
				$setas = 0;
				$(this).parent().parent().find('.plugin_paginacao a').each(function() {
					if($(this).html() == 2)
						$setas = 1;
				});
				if(!$setas) $(this).parent().parent().find('> .bx-controls').find('.plugin_paginacao, .plugin_seta_left, .plugin_seta_right').hide();
			});
		}

		// Flexslider -> http://flexslider.woothemes.com/basic-slider-with-caption.html // https://github.com/woothemes/FlexSlider/wiki/FlexSlider-Properties
		function Plugin3(){
			$(".Plugin3").each(function() {
				$(this).addClass('Plugin');
				$width = $(this).attr('w') ? $(this).attr('w') : $(this).find('ul > li').width();
				$min = $(this).attr('min') ? $(this).attr('min') : 1;
				$max = $(this).attr('max') ? $(this).attr('max') : 10;
				$auto = $(this).attr('auto') ? $(this).attr('auto')*1000 : false;
				$itens = $(this).attr('itens') ? $(this).attr('itens') : 0;
				$start = $(this).attr('star') ? $(this).attr('star') : 0;
				$direction = $(this).attr('vertical')==1 ? 'vertical' : 'horizontal';
				$(this).flexslider({
					animation: "slide",
					itemWidth: $width,
    				minItems: $min,
    				maxItems: $max,
    				slideshow: $auto,
    				slideshowSpeed: $auto,
				    move: $itens, // Itens por vez
				    startAt: $start, // Qual pagina comecar
				    direction: $direction, // Vertical ou Horizontal
				    //smoothHeight: true, // Adapta Itens com Altura diferente
				});
				if(!$(this).find('.plugin_paginacao').html() && !$(this).hasClass('no_pagg')){
					$(this).find('.plugin_seta_left, .plugin_seta_right').hide();
				}
			});
		}

		// Lightslider -> http://sachinchoolur.github.io/lightslider/
		function Plugin4(){
			$(".Plugin4").each(function() { // Nao colocar Width fixa
				$itens = $(this).attr('itens') ? $(this).attr('itens') : 0;
				$auto = $(this).attr('auto') ? $(this).attr('auto')*1000 : false;
				$direction = false;
				if($(this).attr('vertical')==1){
					$width = false;
					$direction = true;
				}
				$galeria = false;
				$thumb = 0;
				if($(this).attr('galeria')){
					$galeria = true;
					$thumb = $(this).attr('galeria');
				}
				$(this).lightSlider({
					//autoWidth: 200, // Nao se adapta mto bem (recomendo n usar, so se precisar mesmo de uma altura fixa)
    				item: $itens, // Itens por vez
    				auto: $auto,
    				pause: $auto,
				    vertical: $direction, // Vertical ou Horizontal
				    //verticalHeight: 200, // Altura Vertical

				    // Galeria
					gallery: $galeria,
	                thumbItem: $thumb,
	                onSliderLoad: function() {
	                    $(this).removeClass('cS-hidden');
	                }  
	            });
            });
		}

		// Waterfall -> http://raphamorim.com/waterfall.js/
		function Plugin_Galeria(){
			$(".Plugin_Galeria").each(function() { // Nao colocar padding e nem margin no li
		        waterfall(this);
			});
		}

		// ElevateZoom -> http://www.elevateweb.co.uk/image-zoom/examples
		function Plugin_Zoom(){
			$(".Plugin_Zoom").each(function() {
				$zoom_w = $(this).attr('zoom_w') ? $(this).attr('zoom_w') : 300;
				$zoom_h = $(this).attr('zoom_h') ? $(this).attr('zoom_h') : 300;
				$(this).elevateZoom({
					zoomWindowWidth: $zoom_w,
					zoomWindowHeight: $zoom_h,
					cursor: "crosshair",
					easing : true, // Movimento leve apos para a imagem
					tint:true, // Fundo na Imagem
					tintColour:'#000', // Cor do Fundo na Imagem
					tintOpacity:0.5, // Opacity do Fundo na Imagem
					scrollZoom : true, // Zoom com o Mouse
					zoomWindowFadeIn: 500, // FadeIn na hora de Abrir a Imagem Zoom
					zoomWindowFadeOut: 500, // FadeOut na hora de Abrir a Imagem Zoom
					lensFadeIn: 500, // FadeIn na hora de Fechar a Imagem Zoom
					lensFadeOut: 500, // FadeOut na hora de Fechar a Imagem Zoom
				});
			});
		}

		// Mostrar Img Maior
		function Img_Maior(e){
			$src = $(e).attr("src");
			$link = $(e).attr('link') ? 1 : $link;
			$zoom = $(e).attr('zoom') ? 1 : $zoom;

			$figure = $(e).find_parent("class", "Galeria_Produtos_Img_Maior").find("figure");

			$html  = $link ? ' <a href="'+$src+'" data-imagelightbox="b"> ' : '';
				$html += '<img src="'+$src+'" class="'+$figure.find('img').attr('class')+'" ';
				$html += $zoom ? ' data-zoom-image="'+$src+' ' : '';
				$html += '" /> ';
			$html += $link ? '</a> ' : '';

			$figure.stop(true, true).hide().html($html).fadeIn(1500);
			$('.zoomContainer').remove();
			Plugin_Zoom();
		}


		$(document).ready(function() {
			Plugin1();
			Plugin2();
			Plugin3();
			Plugin4();
			Plugin_Galeria();
			Plugin_Zoom();
			ImageLightBox();
		});
	// PLUGINS



/* Eventos All


----------------------------------------------------------------------------------------------------------------------------------


*/