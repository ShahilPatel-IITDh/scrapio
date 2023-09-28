/*** ChiptuningReseller JS **/


/** Accordion functionalities **/
const slideDown = element => element.style.height = `${element.scrollHeight}px`;
const slideUp = element => element.style.height = `0px`;
function toggleAccordion(targetId) {
	var element = document.getElementById(targetId);
	if(typeof(element) !== 'undefined') {
		if(element.style.height == '0px') {
			slideDown(element);
		} else {
			slideUp(element);
		}
	}
}

function increaseCounters(doIncrement, numberToIncrement, maxIncrement = null, targetElement = 0, firstRun = true) {
		var elements = document.getElementsByClassName('ctr-increment-counter');
		if(targetElement >= elements.length) {
			return false; // End counting
		}
		var element = elements[targetElement];
		if(firstRun) {
			element.classList.remove("ctr-opacity-0");
			element.classList.add("ctr-opacity-100");
		}
		
		var maxIncrement = maxIncrement ?? element.innerHTML;
		
		numberToIncrement++;
		element.innerHTML = numberToIncrement;
		if (doIncrement && numberToIncrement < maxIncrement && targetElement <= elements.length) {
			setTimeout(() => { increaseCounters(true, numberToIncrement, maxIncrement, targetElement, false); }, 20);
		} else {
			targetElement++;
			setTimeout(() => { increaseCounters(true, 0, null, targetElement, true); }, 20);
		}
}

setTimeout(() => {
	increaseCounters(true, 0), 200
});