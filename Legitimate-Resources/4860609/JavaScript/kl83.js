var Ext

var kl83 = {}
var cms = {}
kl83.dialog = {}
kl83.material = {}
kl83.material_plugin = {}
kl83.category = {}
kl83.vote = {}
kl83.settings = {}
kl83.utils = {}
kl83.kcaptcha = {}
kl83.site_settings = {}

Date.dayNames = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
Date.monthNames = [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ];

if ( Ext && Ext.apply ) {
	Ext.apply( Ext.DatePicker.prototype, {
		todayText          : "Сегодня",
		minText            : "Эта дата раньше минимальной даты",
		maxText            : "Эта дата позже максимальной даты",
		disabledDaysText   : "",
		disabledDatesText  : "",
		monthNames         : Date.monthNames,
		dayNames           : Date.dayNames,
		nextText           : 'Следующий месяц (Control+Вправо)',
		prevText           : 'Предыдущий месяц (Control+Влево)',
		monthYearText      : 'Выбор месяца (Control+Вверх/Вниз для выбора года)',
		todayTip           : "{0} (Пробел)",
		format             : "d.m.y",
		okText             : " OK ",
		cancelText         : "Отмена",
		startDay           : 1
	} )
	Ext.apply( Ext.form.DateField.prototype, {
		disabledDaysText  : "Не доступно",
		disabledDatesText : "Не доступно",
		minText           : "Дата в этом поле должна быть позже {0}",
		maxText           : "Дата в этом поле должна быть раньше {0}",
		invalidText       : "{0} не является правильной датой - дата должна быть указана в формате {1}",
		format            : "Y-m-d",
		altFormats        : "Y-m-d|Y-m-d H:i:s|d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d"
	} )
}


// Диалоговое окно настроек сайта
kl83.site_settings.edit = function() {
	
	var wnd, tabPanel, form, _form, chkPdCookieEnable;
	
	tabPanel = new Ext.TabPanel( { region: 'center', activeTab: 0, border: false, anchor: '100% 100%', deferredRender: false,
		defaults: {
			layout: 'form',
			labelWidth: 180,
			defaultType: 'textfield',
			bodyStyle: 'padding: 15px'
		},
		items: [ 
			{
				title: 'Основное',
				items: [
					{ xtype: 'textfield', name: 'site_name', fieldLabel: 'Имя сайта', anchor: '100%' }, 
					{ xtype: 'textfield', name: 'mainpage_alias', fieldLabel: 'Адрес главной страницы', width: 270 }, 
					{ xtype: 'textfield', name: 'email', fieldLabel: 'E-mail', width: 270 }
				]
			}, {
				title: 'Защита персональных данных',
				items: [
					chkPdCookieEnable = new Ext.form.Checkbox ( { boxLabel: 'Показывать сообщение об использовании файлов cookie при открытии сайта', name: 'pd_cookie_enable', hideLabel: true } ),
					{ xtype: 'tinymce', fieldLabel: 'Текст сообщения', name: 'pd_cookie_text', anchor: '100%' }
				]
			}, {
				title: 'Шаблон категории по-умолчанию',
				xtype: 'textarea',
				name: 'default_category_template',
				enableKeyEvents: true,
				listeners: {
					specialkey: function( field, e ) {
						if ( e.getKey() != 9 ) return;
						e.preventDefault();
						kl83.utils.pasteTab(e);
					}
				}
			}
		]
	} )
	
	form = new Ext.form.FormPanel( {
		border: false,
		items: tabPanel
	} )
	_form = form.getForm();
	
	wnd = new Ext.Window( {
		title: 'Настройка сайта', 
		layout: 'fit', 
		modal: true, 
		resizable: false, 
		draggable: false, 
		width: 944, 
		height: 385, 
		items: form,
		buttons: [ {
			text: 'Сохранить',
			handler: function() {
				_form.submit( { url: '/settings/ajax-update.html' } );
				wnd.hide();
			}
		}, {
			text: 'Отмена',
			handler: function() { wnd.close(); }
		} ],
		listeners: {
			show: function() {
				_form.load( { url: '/settings/get.html', method: 'get', success: function( form, action ) {
					chkPdCookieEnable.setValue( action.result.data['pd_cookie_enable'] );
				} } )
				// Проверяем включен ли модуль согласия на обработку файлов cookie
				$.ajax( { type: 'post', url: '/settings/ajax-modEnabled.html', dataType: 'text', async: true,
					data: { mod: 'cookie_accept', key: 'cb9695a478b3a4fa690b9ccb1d4f0d65' },
					success: function( data ) {
						if ( !data ) {
							tabPanel.hideTabStripItem(1);
						}
					}
				} )
			}
		}
	} ).show();
}

// проверка бот или нет, в случае если не бот вызывает функцию callback
kl83.kcaptcha.check = function( callback ) {

	function check_twice() {
		jQuery.ajax( {
			type: 'get',
			url: '/kcaptcha/index.html',
			data: { captcha_keystring: $('#kl83_antibot_test input').val() },
			dataType: 'text',
			success: function(response) {
				if ( response == '1' ) {
					$('#kl83_antibot_test').replaceWith('')
					callback()
				} else alert('Вы ввели неверный код, попробуйте еще раз.')
			}
		} )
	}

	function showCheckLayer() {
		$('body').append('<div id="kl83_antibot_test" style="position: absolute; z-index: 1002; padding: 0 0 5px; font: 12px tahoma; border: solid 5px #ccc; background: #eee">\
					<p style="background: #666; padding: 3px 5px; margin: 0; color: #fff">Введите код:<span style="float: right; cursor: pointer; width: 10px">x</span></p>\
					<p style="margin: 5px">\
						<a href="#" onclick="javascript: $(\'#kl83_antibot_test img\').attr(\'src\', \'/kcaptcha/index.php?\'+Math.random()); return false" title="Загрузить другую картинку">\
							<img width="120" height="72" border="0" style="float: left; margin: 0 5px 0 0" src="/kcaptcha/index.php" alt=""/>\
						</a>\
						<input style="margin: 10px 0 3px; width: 70px"/>\
					</p>\
					<p style="margin: 2px 5px; text-align: center"><button type="button">Готово</button></p></div>'
		)
		$('#kl83_antibot_test').css('left', ($(window).width() * 0.5) - ($('#kl83_antibot_test').width() * 0.5) + $(window).scrollLeft() + 'px')
		$('#kl83_antibot_test').css('top', ($(window).height() * 0.5) - ($('#kl83_antibot_test').height() * 0.5) + $(window).scrollTop() + 'px')
		$('#kl83_antibot_test button').bind('click', check_twice)
		$('#kl83_antibot_test span').bind('click', function(){ $('#kl83_antibot_test').replaceWith(''); alert('Вы не прошли проверку, запрашиваемая операция не будет выполнена.') } )
	}
	
	jQuery.ajax( {
		type: 'get',
		url: '/session/ishuman.html',
		dataType: 'text',
		success: function(response) {
			if ( response != '1' ) showCheckLayer();
				else callback();
		}
	} )
}



// передача голоса
kl83.vote.make_vote = function( answer ) {
	kl83.kcaptcha.check( function() {
		jQuery.ajax( {
			type: 'get',
			url: '/vote/index.html',
			data: { action: 'vote', id: answer },
			dataType: 'text',
			success: function(response) {
				if ( response == 'ok' ) window.location.reload();
					else alert('Произошла ошибка, обратитесь к системному администратору.');
			}
		} )
	} )
}


// диалог выбора вопроса
// o: { plugin_id: идентиыфикатор плагина, vote_id: текущий вопрос }
kl83.vote.selectQuestion = function( o ) {
	new Ext.Window( {
		id: 'wndSelectQuestion',
		title: 'Выберете вопрос',
		items: [ {
				xtype: 'form',
				labelWidth: 75, // label settings here cascade unless overridden
				frame: true,
				bodyStyle: 'padding:5px 5px 0',
				width: 350,
				defaults: { width: 240 },
				items: [ {
					xtype: 'combo',
					id: 'cmbSelectQuestion',
					fieldLabel: 'Материал',
					triggerAction: 'all',
					disabled: true,
					mode: 'local',
					editable: false,
					loadingText: 'Загрузка...',
					displayField: 'title',
					valueField: 'id',
					store: new Ext.data.Store( {
						autoLoad: true,
						proxy: new Ext.data.HttpProxy( { url: '/vote/index.html' } ),
						baseParams: { action: 'json-questions' },
						reader: new Ext.data.JsonReader( { root: 'data', fields: ['id','title'] } ),
						listeners: {
							load: function(store,records,options) {
								if ( o.vote_id ) Ext.getCmp('cmbSelectQuestion').setValue(o.vote_id);
								Ext.getCmp('cmbSelectQuestion').enable();
							}
						}
					} )
				} ],
				buttons: [ {
					text: 'Применть',
					handler: function() {
						var params = {};
						params['plg_'+o.plugin_id+'_node'] = Ext.getCmp('cmbSelectQuestion').getValue();
						kl83.settings.set( { params: params, callback: function() { window.location.reload(); } } )
					}
				},{
						text: 'Отмена',
						handler: function() { Ext.getCmp('wndSelectQuestion').close() }
				} ]
			}
		]
	} ).show()
}


// отправка запроса на сервер для сохранине параметров (settings)
// o: { params: { имя_параметра: значение_параметра... }, callback: function() }
kl83.settings.set = function( o ) {
	Ext.Ajax.request( {
		url: '/settings/ajax-update.html',
		params: o.params,
		success: o.callback
	} )
}


// настройка плагина materials
kl83.material_plugin.settings = function( o ) {
	
	function setCategories() {
		jQuery.ajax( {
			type: 'get',
			url: '/index.html',
			data: { action: 'raw-get-categories-names', categories: o.categories },
			dataType: 'text',
			success: function( response ) {
				Ext.getCmp('lblCategories').setText('<p>Выбраны категории: '+response+'.</p>', false);
			}
		} )
	}
	setCategories();
	
	var exclude_labels = [ 'Материалы не будут автоматически исключаться.', 'Будут автоматически исключаться прошедшие* материалы.', 'Будут автоматически исключаться прошедшие* и заканчивающиеся сегодня* материалы.', 'Будут автоматически исключаться прошедшие*, заканчивающиеся сегодня* и проходящие сейчас* материалы.', 'Будут автоматически исключаться прошедшие*, заканчивающиеся сегодня*, проходящие сейчас* и начинающиеся сегодня* материалы.' ]
	var display_labels = [ 'Будут отображаться все материалы.', 'Не будут отображаться материалы начинающиеся сегодня* или в будущем*.', 'Не будут отображаться материалы начинающиеся в будущем*.' ]
	var order_values = [ [0,'случайно'], [1,'по дате, по возрастанию'], [2,'по дате, по убыванию'] ]
	new Ext.Window( {
		id: 'wndPlgMaterialSettings',
		title: 'Настройка блока материалов',
		modal: true,
		layout: 'fit',
		width: 500,
		height: 300,
		items: [ {
				xtype: 'form',
				border: false,
				items: [ {
						xtype: 'tabpanel',
						border: false,
						activeTab: 0,
						anchor: '100% 100%',
						deferredRender: false,
						defaults: {
							layout: 'form',
							labelWidth: 230,
							defaultType: 'textfield',
							bodyStyle: 'padding: 15px',
							hideMode: 'offsets'
						},
						items: [ {
								title: 'Основное',
								items: [ {
										xtype: 'combo',
										id: 'cmbOrdering',
										fieldLabel: 'Сортировка материалов',
										store: order_values,
										triggerAction: 'all',
										editable: false,
										width: 220,
										value: o.ordering
									},{
										id: 'txtLimit',
										xtype: 'textfield',
										fieldLabel: 'Количество выводимых материалов',
										value: o.limit
								} ]
							},{
								title: 'Категории',
								items: [ {
										xtype: 'label',
										html: '<p style="margin-top: 3px">Материалы из выбранных категорий будут отображаться в настраиваемом блоке автоматически.</p>'
									},{
										id: 'lblCategories',
										xtype: 'label'
									},{
										xtype: 'button',
										text: 'Изменить',
										listeners: {
											click: function( btn, e ) {
												kl83.dialog.select_categories({selected: o.categories, callback: function( oo ) {
													o.categories = oo.selected
													setCategories()
												} } )
											}
										}
								} ]
							},{
								title: 'Отображение',
								items: [ {
										xtype: 'label',
										html: '<p style="margin-top: 3px">Выберете материалы которые следует отображать в настраиваемом блоке.</p><p>Например, если в блоке отображаются новости, то вероятно не следует отображать материалы с датой которая еще не наступила.</p>'
									},{
										xtype: 'slider',
										id: 'sldDisplayMode',
										width: 300,
										minValue: 0,
										maxValue: 2,
										value: o.display_mode,
										listeners: {
											change: function( slider, val ) {
												Ext.getCmp('lblDisplay').setText(display_labels[val])
											}
										}
									},{
										xtype: 'label',
										id: 'lblDisplay',
										html: display_labels[o.display_mode]
									},{
										xtype: 'label',
										html: '<p>* Понятие времени (сегодня, в будущем, в прошлом) не имеет отношения к текущей дате. Оно подразумевает дату загрузки страницы.</p>'
								} ]
							},{
								title: 'Исключение',
								items: [ {
										xtype: 'label',
										html: '<p style="margin-top: 3px">Выберете материалы которые с течением времени будут исключаться из настраимаего блока автоматически.</p><p>Например, если в блоке отображаются анонсы событий, то вероятно следует исключить материалы с датой которая уже прошла.</p>'
									},{
										xtype: 'slider',
										id: 'sldExcludeMode',
										width: 300,
										minValue: 0,
										maxValue: 4,
										value: o.exclude_mode,
										listeners: {
											change: function( slider, val ) {
												Ext.getCmp('lblExclude').setText(exclude_labels[val])
											}
										}
									},{
										xtype: 'label',
										id: 'lblExclude',
										html: exclude_labels[o.exclude_mode]
									},{
										xtype: 'label',
										html: '<p>* Понятие времени (сегодня, в будущем, в прошлом) не имеет отношения к текущей дате. Оно подразумевает дату загрузки страницы.</p>'
								} ]
							},{
								xtype: 'textarea',
								id: 'taTemplate',
								title: 'Шаблон вывода',
								enableKeyEvents: true,
								value: o.template,
								listeners: {
									specialkey: function( field, e ) {
										if ( e.getKey() != 9 ) return
										e.preventDefault()
										kl83.utils.pasteTab(e)
									}
								}
						} ]
				} ]
			}
		],
		buttons: [ {
				text: 'Применть',
				handler: function() {
					var params = {}
					params['plg_'+o.id+'_ordering'] = Ext.getCmp('cmbOrdering').getValue()
					params['plg_'+o.id+'_limit'] = Ext.getCmp('txtLimit').getValue()
					params['plg_'+o.id+'_display_mode'] = Ext.getCmp('sldDisplayMode').getValue()
					params['plg_'+o.id+'_exclude_mode'] = Ext.getCmp('sldExcludeMode').getValue()
					params['plg_'+o.id+'_template'] = Ext.getCmp('taTemplate').getValue()
					params['plg_'+o.id+'_categories'] = o.categories
					kl83.settings.set( { params: params, callback: function(){window.location.reload()} } )
				}
			},{
				text: 'Отмена',
				handler: function(){ Ext.getCmp('wndPlgMaterialSettings').close() }
		} ]
	} ).show()
}


kl83.material_plugin.add_material = function( o ) {
	kl83.dialog.select_material( {
		material_id: 0,
		callback: function( id ) {
			if ( id == 0 ) return
			var params = {}
			params['plg_'+o.id+'include_mat'] = (o.include_mat == '' ? o.include_mat : o.include_mat+','+id)
			kl83.settings.set( { params: params, callback: function(){window.location.reload()} } )
		}
	} )
}


// диалог выбора категорий
kl83.dialog.select_categories = function( o ) {
	new Ext.Window( {
		id: 'wndSelectCategories',
		title: 'Выбор категорий',
		modal: true,
		layout: 'fit',
		width: 400,
		height: 500,
		items: [ {
			id: 'treeSelectCategories',
			xtype: 'treepanel',
			dataUrl: '/index.php?action=ajax-cats-by-parent',
			rootVisible: false,
			autoScroll: true,
			root: {
				nodeType: 'async',
				id: "0"
			},
			
			listeners: {
            'expandnode': function( node ){
				node.eachChild( function(node){
					if ( (','+o.selected+',').indexOf(','+node.id+',') != -1 ) node.ui.toggleCheck(true)
				} )
            } }
		} ],
		buttons: [ {
				text: 'Применть',
				handler: function(){
					o.callback({selected: Ext.getCmp('treeSelectCategories').getChecked('id').join(',')})
					Ext.getCmp('wndSelectCategories').close()
				}
			},{
				text: 'Отмена',
				handler: function(){ Ext.getCmp('wndSelectCategories').close() }
		} ]
	} ).show()

}


// Выбор материала для плагина material
// o - объект: plugin_id - идентификатор материала; material_id - id материала; category_id - id категории
kl83.material_plugin.set_material = function( o ) {
	kl83.dialog.select_material( {
		category_id: o.category_id,
		material_id: o.material_id,
		category_type: 0,
		callback: function(id) {
			if ( id == 0 ) return;
			var params = {};
			params['plg_'+o.plugin_id+'_node'] = id;
			kl83.settings.set( { params:params, callback: function() { window.location.reload(); } } );
		}
	} )
}


// Диалог выбора материала.
// o: {
// 	category_id: выбрать указанную категорию при инициализации,
// 	material_id: выбрать указанный материал при инициализации,
// 	category_type: фильтр типа категорий,
// 	callback(id: выбранный материал): функция для вызова по завершении выбора материала
// }
kl83.dialog.select_material = function( o ) {
	
	var material_id = o.material_id == undefined ? 0 : o.material_id;
	var category_id = o.category_id;
	
	var cmb_material = new Ext.form.ComboBox( {
		fieldLabel: 'Материал',
		triggerAction: 'all',
		disabled: true,
		mode: 'local',
		editable: false,
		emptyText: ' -- Выберите материал --',
		loadingText: 'Загрузка...',
		displayField: 'title',
		valueField: 'id',
		store: new Ext.data.Store( {
			proxy: new Ext.data.HttpProxy( { url: '/index.html' } ),
			baseParams: { action: 'json-material-list', category: 0 },
			reader: new Ext.data.JsonReader( { root: 'data', fields: ['id','category','title'] } ),
			listeners: {
				load: function(store,records,options) {
					if ( material_id && category_id == cmb_category.getValue() ) {
						cmb_material.setValue( material_id );
						cmb_material.enable();
					}
				}
			}
		} ),
		listeners: { }
	} )
	
	var cmb_category = new Ext.form.ComboBox( {
		fieldLabel: 'Категория',
		triggerAction: 'all',
		// disabled: true,
		mode: 'local',
		editable: false,
		emptyText: ' -- Выберите категорию --',
		loadingText: 'Загрузка...',
		displayField: 'name',
		valueField: 'id',
		store: new Ext.data.Store( {
			proxy: new Ext.data.HttpProxy( { url: '/index.html' } ),
			baseParams: { action: 'json-category-list', category_type: o.category_type },
			reader: new Ext.data.JsonReader( { root: 'data', fields: ['id','type','name'] } ),
			listeners: {
				load: function(store,records,options) {
					if ( category_id ) {
						cmb_category.setValue(category_id);
						cmb_material.store.setBaseParam( 'category', category_id );
						cmb_material.store.load();
					}
				}
			}
		} ),
		listeners: {
			select: function(combo,record,index) {
				cmb_material.clearValue();
				cmb_material.store.removeAll();
				cmb_material.store.setBaseParam( 'category', combo.getValue() );
				cmb_material.store.reload();
				if ( cmb_material.disabled ) cmb_material.enable();
			}
		}
	} )
	
	cmb_category.store.load();
	
	var wnd = new Ext.Window( {
		title: 'Выберите материал',
		modal: true,
		items: [
			new Ext.FormPanel( {
				labelWidth: 75, // label settings here cascade unless overridden
				frame:true,
				bodyStyle:'padding:5px 5px 0',
				width: 350,
				defaults: {width: 240},
				items: [ cmb_category, cmb_material ],
				buttons: [ {
						text: 'Применть',
						handler: function() {
							o.callback( (id = cmb_material.getValue()) == '' ? 0 : id );
							wnd.close();
						}
					},{
						text: 'Отмена',
						handler: function() { wnd.close(); }
				} ]
			} )
		]
	} )
	wnd.show();
}


// отмена перехода между эл. уп. при нажатии таб в textarea
kl83.utils.pasteTab = function( evt ) {
	var tab = "	";
	var t = evt.target;
	var ss = t.selectionStart;
	var se = t.selectionEnd;
	// Special case of multi line selection
	if ( ss != se && t.value.slice(ss,se).indexOf("\n") != -1 ) {
		// In case selection was not of entire lines (e.g. selection begins in the middle of a line)
		// we ought to tab at the beginning as well as at the start of every following line.
		var pre = t.value.slice(0,ss);
		var sel = t.value.slice(ss,se).replace(/\n/g,"\n"+tab);
		var post = t.value.slice(se,t.value.length);
		t.value = pre.concat(tab).concat(sel).concat(post);
		
		t.selectionStart = ss + tab.length;
		t.selectionEnd = se + tab.length;
	} else {
		// "Normal" case (no selection or selection on one line only)
		t.value = t.value.slice(0,ss).concat(tab).concat(t.value.slice(ss,t.value.length));
		if (ss == se) {
			t.selectionStart = t.selectionEnd = ss + tab.length;
		} else {
			t.selectionStart = ss + tab.length
			t.selectionEnd = se + tab.length
		}
	}
	
}


// генерация имени файла путем транслитерации символов и замены непригодных символов на символ -
kl83.utils.makefilename = function( str ) {
	if ( str == undefined ) return '';
	return str.toLowerCase().replace(/[а-я]/g, function( m ) {
			var lat = new Array("a","b","v","g","d","e","yo","zh","z","i","y","k","l","m","n","o","p","r","s","t","u","f","kh","tc","ch","sh","shc","'","y","'","e'","yu","ya");
			var cyr = "абвгдеёжзийклмнопрстуфхцчшщьыъэюя";
			return lat[cyr.indexOf(m)];
		} ).replace(/[^-a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-/, '').replace(/-$/, '');
}


// проверка формы редактирования материала перед отправкой
kl83.material.check_edit_form = function() {
	if ( $('#title').length && $('#title').val() == '' ) { alert('Страница обязательно должна содержать заголовок!'); return; }
	if ( $('#alias').length ) {
		if ( $('#alias').val() == 'index.html' ) { alert('Нельзя использовать index.html в качестве адреса!'); return; }
		if ( !/^[0-9a-zA-Z_\-\.]*$/.test($('#alias').val()) ) { alert('Адрес может содержать только символы латинского алфавита, цифры знаки дефис, подчеркивание и точку!'); return; }
		if ( $('#alias').val() != '' && !/^.*\.html?$/.test($('#alias').val()) ) { alert ('Адрес обязательно должен заканчиваться на .html!'); return; }
	}
	$('#static_edit').submit();
}


// убрать/показать поля взависимости от выбранного типа категории
kl83.material.editforminit = function() {
	$('#category').bind( 'change', kl83.material.editforminit );
	$('.variable').css('display', 'none');
	var cat_params = kl83_categories[$('#category').val()];
	$('.flag-'+cat_params.type).css('display', 'block');
	$('#fld_start').css('display', cat_params.usestart == 1 ? 'block' : 'none');
	$('#fld_final').css('display', cat_params.usefinal == 1 ? 'block' : 'none');
	
	if ( cat_params.type == 0 ) {
		tinymce.execCommand('mceRemoveEditor',false,'content');
		// $('#content').css('height', '200px');
		$('#content').bind( 'keydown', function( e ) {
			var keyCode = e.keyCode || e.which;
			if ( keyCode != 9 ) return;
			e.preventDefault();
			kl83.utils.pasteTab(e);
		} )
	} else tinymce.execCommand('mceAddEditor',false,'content');
	
}


// Убрать/показать поля в зависимости от выбранного типа категории
kl83.category.editforminit = function() {
	$('#type').bind('change', kl83.category.editforminit);
	$('#usedate').bind('change', kl83.category.editforminit);
	$('.variable').css('display', 'none');
	$('.flag-'+$('#type').val()).css('display', 'block');
	if ( $('#type').val() == 2 && $('#usedate').val() > 0 ) {
		$('.onusedate').css('display', 'block');
	} else {
		$('.onusedate').css('display', 'none');
	}
}


// Затемнение фона экрана
kl83.blind_window = function() {
	$('body').append('<div id="blind-window"></div>');
	if ( $(document).height() > $(window).height() ) {
		bg_height = $(document).height();
	} else {
		bg_height = $(window).height();
	}
	$('#blind-window').css( {
		'position':'absolute',
		'left':'0',
		'right':'0',
		'top':'0',
		'height':bg_height+'px',
		'cursor':'pointer',
		'background-color':'RGBa(0,0,0,0.75)',
		'z-index':'1000'
	} )
}
// Удаление затемнения фона экрана
kl83.blind_window_hide = function() {
	$('#blind-window').hide();
	$('#blind-window').remove();
}

$(document).ready( function() {
	
	//Ext.util.CSS.swapStyleSheet( '/extjs/resources/css/ext-all-notheme.css', '/extjs/resources/css/ext-all-notheme.css' );
	
	// Инициализация лайтбокса
	$(document).ready( function() {
		$("a[rel^='prettyPhoto']").prettyPhoto();
	} )
	
	// Версия для печати
	$('.check-print, #check-print').bind( 'click', function() {
		if ( $.cookie('disabled-print') ) { 
			$.cookie('disabled-print', null); 
		} else { 
			$.cookie('disabled-print', true); 
		}
		location.reload(true);
	} )
	

	
	// Локализация календаря
	pickmeup.defaults.locales['ru'] = {
		days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
		daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
		months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
	};
	
	
	// Обработка нажатий клавиш
	$(document).keyup( function(event) {
		// исключение случаев ввода пользователем текста
		if ( " select input textarea ".indexOf(" "+document.activeElement.tagName.toLowerCase()+" ") != -1 ) return;

		switch ( event.which ) {
			 //"l" - переход к авторизации
			case 76:
				window.location.assign('/admin/login.html');
			break;
			// "e" - скрывает/отображает элементы управления сайтом
			case 69:
				if ( $('.cms-ui').length == 0 ) return;
				if ( $('.cms-ui').css('visibility') == 'visible' ) {
					$('.cms-ui').css('visibility', 'hidden');
					jQuery.cookie( 'ui-admin-links-hide', '1', {expires: 7, path: '/'} );
				} else {
					$('.cms-ui').css('visibility', 'visible');
					jQuery.cookie('ui-admin-links-hide', '0', {expires: 7, path: '/'});
				}
			break;
			// "Ctrl+i" или "Win+i" - Основная информация о сайте для Windows
			// "Command+i" - для Mac
			case 73:
				if ( event.ctrlKey || event.metaKey ) {
					$.getJSON( '/info/ajax-getInfo.html', { }, function(response) {
						if ( response != null ) {
							$('body').prepend('<div id="site-info"></div>');
							$('#site-info').css( {'position':'absolute', 'z-index':'99999', 'background-color':'#fff', 'padding':'10px'} );
							$('#site-info').html( 
								'CMS version: ' + response.cms_version + '<br/>' +
								'CMS release: ' + response.cms_release + '<br/>' +
								'CMS key: ' + response.cms_key + '<br/>' +
								'Root directory: ' + response.doc_root
							);
						} else {
							alert('Ошибка');
						}
					} )
				}
			break;
		}
	} )
	
	
	// создаем и показываем панель управления на основе #kl83_infobar
	if ( Ext != undefined && $('#kl83_infobar').length ) {
		info = new Ext.Window( {
			title: 'Панель управления',
			renderTo: Ext.getBody(),
			items: [ new Ext.Panel({border: false, applyTo: 'kl83_infobar', autoShow: true, padding: 5}) ],
			collapsible: true,
			resizable: false,
			collapsed: Ext.util.Cookies.get('kl83-infobar-expanded') == '1' ? false : true,
			expandOnShow: false,
			closable: false,
			layout: 'fit',
			x: Ext.util.Cookies.get('kl83-infobar-x') || 0,
			y: Ext.util.Cookies.get('kl83-infobar-y') || 0,
			width: 300,
			closeAction: 'hide',
			border: false,
			listeners: {
				move: function( wnd, x, y ) {
					jQuery.cookie('kl83-infobar-x', x, {expires: 7, path: '/'})
					jQuery.cookie('kl83-infobar-y', y, {expires: 7, path: '/'})
				},
				collapse: function() {
					jQuery.cookie('kl83-infobar-expanded', '0', {expires: 7, path: '/'})
				},
				expand: function() {
					jQuery.cookie('kl83-infobar-expanded', '1', {expires: 7, path: '/'})
				}
			}
		} ).show();
	}
	
	$('.cms-ui').each( function( i, el ) {
		var offset = $(el).parent().offset();
		$(el).offset(offset);
	} )
	if ( jQuery.cookie('ui-admin-links-hide') != '1' ) {
		$('.cms-ui').css('visibility', 'visible');
	}
	/* $('.cms-ui').bind( 'mouseover', function(event) {
		//$(this).parent().addClass('kl83-ui-border')
		if ( this.getElementsByTagName('ul').length == 0 ) return;
		this.style.zIndex = '1001'; this.getElementsByTagName('ul')[0].style.visibility = 'visible';
	} )
	$('.cms-ui').bind( 'mouseout', function(event) {
		//$(this).parent().removeClass('kl83-ui-border')
		if ( this.getElementsByTagName('ul').length == 0 ) return;
		this.style.zIndex = '1000'; this.getElementsByTagName('ul')[0].style.visibility = 'hidden';
	} ) */
	
} )