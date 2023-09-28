
	new Tablesort(document.getElementById("table-content"));
	var keywordInput = document.getElementById('filter-keyword');
	document.addEventListener('keyup', filterTable);

	function filterTable(e) {
		if (e.target.id != 'filter-keyword') return;

		var cols = document.querySelectorAll('tbody td:first-child');
		var keyword = keywordInput.value.toLowerCase();
		for (i = 0; i < cols.length; i++) {
			var text = cols[i].textContent.toLowerCase();
			if (text != 'parent directory') {
				cols[i].parentNode.style.display = text.indexOf(keyword) === -1 ? 'none' : 'table-row';
			}
		}
	}
