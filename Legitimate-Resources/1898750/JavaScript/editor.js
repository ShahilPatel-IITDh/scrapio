/*
* @package		manageMINT v2.01
* @copyright	Copyright (c) 2011 MooiMentha!, http://www.mooimentha.nl. All rights reserved
*/

// JavaScript Document

tinyMCE.init({
	mode: "specific_textareas",
	editor_selector: "mceEditor",
	theme: "advanced",
	language : 'nl',
	plugins: "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,inlinepopups,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,wordcount,advlist,autosave",
	theme_advanced_buttons1: "code,removeformat,cleanup,|,undo,redo,|,cut,copy,paste,pastetext,pasteword,formatselect,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull",
	theme_advanced_buttons2: "search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,insertdate,inserttime,preview,|,hr,|,sub,sup,|,charmap,emotions,iespell,media,|,visualchars,nonbreaking",
	theme_advanced_buttons3: "tablecontrols,visualaid,|,image,link,unlink,anchor",
	theme_advanced_buttons4: "",
	theme_advanced_blockformats : "p,h1,h2,h3,h4,h5,h6",
	theme_advanced_toolbar_location: "top",
	theme_advanced_toolbar_align: "left",
	theme_advanced_statusbar_location: "bottom",
	theme_advanced_resizing: true,
	onvert_urls : false,
	relative_urls : false,
	external_link_list_url : "/cms_files/inc/internal_links.php",
	content_css : "/inc/style.css,/cms_files/inc/editor.css",
	height:"400px",
	width:"575px",
	file_browser_callback: 'openKCFinder'
});

tinyMCE.init({
	mode: "specific_textareas",
	editor_selector: "mceEditorMini",
	theme: "simple"
});
	
function openKCFinder(field_name, url, type, win) {
	tinyMCE.activeEditor.windowManager.open({
		file: '/cms_files/editor/kcfinder2/browse.php?opener=tinymce&type=' + type + '&dir=' + type + '/public',
		title: 'File Browser',
		width: 1000,
		height: 500,
		resizable: "no",
		inline: true,
		close_previous: "no",
		popup_css: false
	}, {
		window: win,
		input: field_name
	});
	return false;
}