

function ShowStep2() {
	document.getElementById("clavier").style.display = "block";
	document.getElementById("btn-container").style.display = "none";
}

function valider() {
	var mdp = document.getElementById("user_id").value;
	if (mdp.length == 5) {
		return true;

	} else {
		return false;
	}
}	


