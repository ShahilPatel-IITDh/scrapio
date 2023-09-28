import results from './comp-results.js';
import search from './comp-search.js';


'use strict';

window.addEventListener('load', createWidgetsAvw);

function createWidgetsAvw(){
	let widgets = document.querySelectorAll('.widgetavw');
	for(let loop = 0; loop < widgets.length; loop++){
		new widgetAvw(widgets[loop]);
	}
}


function widgetAvw(container) {
	this.empty = [{}, [], '', null, undefined];
	this.displayedRecords = 5;
	this.category = { id: 'aircraft', name: 'Aircraft' };
	// this.category = '';
	this.categoriesList = [
		{ id: 'aircraft', name: 'Aircraft' },
		{ id: 'jobs', name: 'Jobs' },
		{ id: 'services', name: 'Services' },
		{ id: 'parts-products', name: 'Parts & Products' },
		{ id: 'engines', name: 'Engines' },
		{ id: 'real-estates', name: 'Real Estate' },
	];
	this.sourcesDir = './';
	this.searchCat = false;
	this.searchTxt = false;
	this.listContent = [];
	this.list = null;
	this.search = null;

	this.mainContainer = container;
	this.id = this.mainContainer.id;

	if([''].includes(this.mainContainer.dataset.searchCat)){
		this.searchCat = true;
	}
	if([''].includes(this.mainContainer.dataset.searchTxt)){
		this.searchTxt = true;
	}
	if(!this.empty.includes(this.mainContainer.dataset.items)){
		this.displayedRecords = this.mainContainer.dataset.items;
	}
	if(!this.empty.includes(this.mainContainer.dataset.path)){
		this.sourcesDir = this.mainContainer.dataset.path + 'res/';
	}
	if((!this.searchCat && !this.searchTxt) &&
		!this.empty.includes(this.mainContainer.dataset.category)){
		this.category = this.categoriesList.find(
			(element)=>{return element.id
				=== this.mainContainer.dataset.category;}
		)
	}

	this.start();
}

widgetAvw.prototype.start = async function() {
	document.addEventListener(
		this.id + '-executeSearch',
		(dataParam)=>{
			this.executeSearch(dataParam.detail);
		}
	);

	if (!this.empty.includes(this.mainContainer)) {
		this.mainContainer.classList.add('widgetAvw');
		this.createScaffolds();
		let data = {
			category: this.category,
			searchedValue: '',
		};
		// if(!this.searchCat && !this.searchTxt){
			await this.executeSearch(data);
		// }
	}
	else {
		console.error('Container not valid');
	}
}

widgetAvw.prototype.createScaffolds = async function() {
	let header = document.createElement('div');
	let logoContainer = document.createElement('div');
	logoContainer.classList.add('logo');
	header.appendChild(logoContainer)
	let logo = document.createElement('img');
	logo.src = this.sourcesDir + 'img/logo.png';
	logo.classList.add('logo');
	logoContainer.appendChild(logo);
	let link = document.createElement('a');
	link.href = 'https://classifieds.avweb.com';
	link.target = '_blank';
	link.rel = 'noopener noreferrer';
	link.appendChild(logo);
	logoContainer.appendChild(link);
	this.mainContainer.appendChild(header);

	let innerContainer = document.createElement('div');
	innerContainer.classList.add('innerContainer');
	this.mainContainer.appendChild(innerContainer);

	let searchBox = await new search(
		this.id,
		this.categoriesList,
		this.category,
		this.searchCat,
		this.searchTxt
	);
	innerContainer.appendChild(searchBox);

	let listContainer = document.createElement('div');
	listContainer.classList.add('listContainer');
	innerContainer.appendChild(listContainer);
	this.list = new results(listContainer, this.sourcesDir);
	this.list.fillPlaceholder('Find something interesting');
}

widgetAvw.prototype.executeSearch = async function(dataParam) {
	let title = 'Featured ' + dataParam.category.name;

	await this.queryApi(dataParam);
	if (this.listContent.length !== 0) {
		this.list.fillListings(this.listContent, this.displayedRecords, title);
	}
	else {
		this.list.fillPlaceholder('No results... yet.');
	}
}

widgetAvw.prototype.queryApi = async function(dataParam) {
	let query = `${this.mainContainer.dataset.endpoint}?`
	+ `&section=${dataParam.category.id}`
	+ `&q=${encodeURIComponent(dataParam.searchedValue)}`
	+ `&limit=${this.mainContainer.dataset.items}`;
	let response = await fetch(query);
	let data = await response.json();
	this.listContent = data.api.results.data;
}