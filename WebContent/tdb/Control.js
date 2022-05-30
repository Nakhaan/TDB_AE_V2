/**
 * 
 */

$(document).ready(function() {
	loadMenu();
	loadAccueil();
});

function loadMenu() {
	$("#Menu").load("menu.html", function() {
		$("#BTAccueil").click(function() {
			loadAccueil();
		});
		$("#BTEvenements").click(function() {
			loadEvenements();
		});
		$("#BTForum").click(function() {
			loadForum();
		});
		$("#BTReservation").click(function() {
			loadReservation();
		});
		$("#BTLogOut").click(function() {
			loadLogOut();
		});
	});
}

function loadNavigation(HeadTitle) {
	$("#Navigation").load("navigation.html", function() {
		$("#HeadTitle").text(HeadTitle);
		$("#user_session").text(Cookies.get('sessionMembre'));
	});
}

function loadAccueil() {
	$("#Page").load("accueil.html", function() {
	});
	loadNavigation("Accueil");
}

function loadEvenements() {
	$("#Page").load("evenements.html", function() {
	});
	loadNavigation("Evenements");
}

function loadForum() {
	$("#Page").load("forum.html", function() {
	});
	loadNavigation("Forum");
}

function loadReservation() {
	$("#Page").load("reservation.html", function() {
	});
	loadNavigation("Réservation");
}

function loadLogOut() {
	Cookies.remove('sessionMembre',{ path: '/' });
	location.replace("/TDB_AE_V2/");
}

function loadMain() {
	$("#Main").load("Main.html", function() {
		$("#BTAddPerson").click(function() {
			loadAddPerson();
		});
		$("#BTAddAddress").click(function() {
			loadAddAddress();
		});
		$("#BTAssociate").click(function() {
			loadAssociate();
		});
		$("#BTList").click(function() {
			loadList();
		});
	});
}

function loadAddEvent() {
	$("#ShowMessage").empty();
	$("#Page").load("AddEvent.html", function() {
		$("#BTValAddEvent").click(function() {
			event = {};
			event.nom=$("#EventName").val();
			event.description=$("#EventDescription").val();	
			event.date=$("#EventDate").val();
			event.time=$("#EventTime").val();
			event.salle("#EventRoom").val();
			event.asso_organisateur=$("#EventOrga").val();
			invokePost("rest/addevent", event, "event was added", "failed to add an event");
			loadEvenements();
		});
	});
}

function invokePost(url, data, successMsg, failureMsg) {
	jQuery.ajax({
	    url: url,
	    type: "POST",
	    data: JSON.stringify(data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function (response) {
	    	$("#ShowMessage").text(successMsg);
	    },
	    error: function (response) {
	    	$("#ShowMessage").text(failureMsg);
	    }
	});
}
function invokeGet(url, failureMsg, responseHandler) {
	jQuery.ajax({
	    url: url,
	    type: "GET",
	    success: responseHandler,
	    error: function (response) {
	    	$("#ShowMessage").text(failureMsg);
	    }
	});
}