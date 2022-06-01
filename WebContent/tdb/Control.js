/**
 * 
 */

$(document).ready(function() {
	
	loadMenu();
	loadAccueil();
});

/***************************************************************************/
/*Fonctions		************************************************************/
/***************************************************************************/

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
			$("#BTMonCompte").click(function() {
				loadMonCompte();
			});
			//if (Cookie.get('sessionMembre')=='admin'){
				$("#BTadminDIV").load("adminButton.html",function(){
					$("#BTAdmin").click(function() {
						loadAdmin();
					});
				});
			//}
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

/***************************************************************************/
/*Accueil		************************************************************/
/***************************************************************************/

function loadAccueil() {
		$("#Page").load("accueil.html", function() {
		});
		loadNavigation("Accueil");
}

/***************************************************************************/
/*EVENEMENT		************************************************************/
/***************************************************************************/

function loadEvenements() {
	$("#Page").load("evenements.html", function() {
	});
	loadNavigation("Evenements");
}

function loadAddEvent() {
	$("#ShowMessage").empty();
	$("#Page").load("AddEvent.html", function() {
		loadSalles();
		$("#BTValAddEvent").click(function() {
			event = {};
			event.nom=$("#EventName").val();
			event.description=$("#EventDescription").val();	
			event.date=$("#EventDate").val();
			event.time=$("#EventTime").val();
			s = {};
			s.nom = $("#EventRoom").val();
			event.salle = s;
			event.asso_organisateur=$("#EventOrga").val();
			invokePost("../rest/addevent", event, "event was added", "failed to add an event");
			loadEvenements();
		});
	});
}

function loadSalles () {
	$("#ShowMessage").empty();
	listSalles = invokeGet("../rest/listsalles", "failed to list salles", function(response) {
		var list;
		listSalles = response;
		if (listSalles == null) return;
		list="<select name=\"salles\" id=\"EventRoom\">";
		for (var i=0; i < listSalles.length; i++) {
			var s = listSalles[i];
			list+="<option value=\""+ s.nom + "\">" + s.nom + "</option>";
		}
		list+="</select>";
		$("#selection-salle").empty();
		$("#selection-salle").append(list);
	});
}

/***************************************************************************/
/*FORUM			************************************************************/
/***************************************************************************/

function loadForum() {
	$("#Page").load("forum/forum.html", function() {
		$("#MenuTopic").load("forum/menuTopic.html", function(){
			$("#AfficherFormTopic").click(function() {
				loadFormTopic();
			});
		});
		loadTopics();
	});
	loadNavigation("Forum");
}

function loadFormTopic() {
	$("#TopicMsg").empty();
	$("#TopicList").empty();
	$("#TopicList").load("forum/creerTopic.html", function(){
			$("#BTCreerTopic").click(function() {
				topic = {};
				topic.auteur = Cookies.get("sessionMembre");
				topic.titre = $("#titre-topic").val();
				topic.description = $("#desc-topic").val();
				invokePost("../rest/addTopic",topic,"Topic AJout Succes","Topic Ajout Echec");
				loadForum();
			});
		});
}

function loadTopics() {
	listPersons = invokeGet("../rest/listTopic", "failed to list topic", function(response) {
		var list;
		listTopic = response;
		if (listTopic == null) {
			$("#TopicMsg").text("Il n'y a aucun topic.'");
			return 
		};
		for (var i=0; i < listTopic.length; i++) {
			var topic = listTopic[i];					
			list+= "<div>" + "<a href=\"/TDB_AE_V22/tdb/forum/topic.html?topicID=" + topic.id + "\" class=\"buttonTopic\">" + "<span>" + topic.titre + "</span><br>" + "</a>" + "<span>" + topic.description + "</span>"  + "</div>";
		}
		
		$("#TopicList").empty();
		$("#TopicList").append(list);
	});
}

/***************************************************************************/
/*Reservation	************************************************************/
/***************************************************************************/

function loadReservation() {
	$("#Page").load("reservation.html", function() {
	});
	loadNavigation("Reservation");
}

/***************************************************************************/
/*Mon Compte	************************************************************/
/***************************************************************************/

function loadMonCompte() {
	$("#Page").load("monCompte/monCompte.html", function() {
		var currentUser = Cookies.get('sessionMembre');
		utilisateur = {};
		utilisateur.username = currentUser;
		invokeUser("../rest/recupeDonneesUser",utilisateur,"Erreur Chargement Donnees utilisateur", function(response) {
			userl = response;
			$("#RealName").text(userl.prenom + " " + userl.nom);
			$("#UserName").text(userl.username);
			$("#EmailUser").text(userl.mail);
			$("#PromoUser").text(userl.annee);
		});
		
		$("#BTsCompte").load("monCompte/modifierBtnCompte.html", function() {
		$("#BTModifierCompte").click(function() {
			loadModifierCompte();
		});
	});
	});
}

function loadModifierCompte() {
	$("#BTsCompte").load("monCompte/saveBtnCompte.html", function() {
		var currentUser = Cookies.get('sessionMembre');
		$("#ModifierForm").load("monCompte/modifierFormCompte.html", function() {
			$("#BTSauvegarderCompte").click(function() {
				var prenom = $("#modifier-prenom").val();
				var nom = $("#modifier-nom").val();
				var mail = $("#modifier-email").val();
				var annee = $("#modifier-annee").val();
				if ((prenom != null) && (nom != null) && (mail != null) && (annee != null)) {
					utilisateur = {};
					utilisateur.prenom = prenom;
					utilisateur.nom = nom;
					utilisateur.username = currentUser;
					utilisateur.mail = mail;
					utilisateur.annee = annee;
					invokePost("../rest/modifierDonneesUser",utilisateur,"Erreur de modification Compte");
					loadMonCompte();
				} else {
					$("ModifierErrorMsg").text("Rentrer des modifications valides !");
					loadMonCompte();
				}
			});
		});
	});
}

/***************************************************************************/
/*ADMIN			************************************************************/
/***************************************************************************/

function loadAdmin() {
	$("#Page").load("admin.html", function() {
		$("#BTCreationSalle").click(function() {
			loadCreationSalle();
		});
		$("#BTCreationClub").click(function() {
			loadCreationClub();
		});
		$("#BTDestructionClub").click(function() {
			loadDestructionClub();
		});
		$("#BTModifierClub").click(function() {
			loadModifierClub();
		});
	});
	loadNavigation("Bonjour Admin !");
}

function loadCreationSalle() {
	$("#ShowMessage").empty();
	$("#Page").load("AddRoom.html", function() {
		salle = {};
		$('#projecteur :checkbox').change(function() {
		    // this will contain a reference to the checkbox   
		    if (this.checked) {
		        salle.projecteur = true;
		    } else {
	    	salle.projecteur = false;
	    }
	});
	$('#libre :checkbox').change(function() {
	    // this will contain a reference to the checkbox   
	    if (this.checked) {
	        salle.libre = true;
	    } else {
	    	salle.libre = false;
	    }
		});
		$("#BTValAddRoom").click(function() {
			
			salle.nom=$("#RoomName").val();
			salle.batiment=$("#BatimentName").val();	
			salle.etage=$("#Etage").val();
			salle.capacite=$("#Capacite").val();
			
			invokePost("../rest/addsalle", salle, "event was added", "failed to add an event");
			loadAdmin();
		});
	});
}

function loadCreationClub() {
	$("#ShowMessage").empty();
	$("#Page").load("AddClub.html", function() {
		var listUsers;
		invokeGet("../rest/liststudent","failed to list students",function(response){
			listUsers = response;
			if (listUsers == null) return;
			for (var i=0; i < listUsers.length; i++) {
				var user = listUsers[i];					
				$("#ListOfPrez").append("<input type='radio' name='Usernamep' value='"+user.username+"'>"+user.prenom+" "+user.nom+"<br>");
				$("#ListOfTrez").append("<input type='radio' name='Usernamet' value='"+user.username+"'>"+user.prenom+" "+user.nom+"<br>");
			}
			$("#BTValAddClub").click(function() {
				club = {};
				club.nom=$("#ClubName").val();
				club.description=$("#ClubDescription").val();
				prez = {};
				trez = {};
				prez.username = $("input[name='Usernamep']:checked").val();
				trez.username = $("input[name='Usernamet']:checked").val();
				club.president = prez
				club.tresorier = trez
				invokePost("../rest/addclub", club, "club was added", "failed to add a club");
					
				loadAdmin();
				});
		});
		
	});
}


function loadModifierClub() {
	$("#ShowMessage").empty();
	$("#Page").load("ModifClub.html", function() {
		$("#BTValAddEvent").click(function() {
			event = {};
			event.nom=$("#EventName").val();
			event.description=$("#EventDescription").val();	
			event.date=$("#EventDate").val();
			event.time=$("#EventTime").val();
			event.salle=$("#EventRoom").val();
			event.asso_organisateur=$("#EventOrga").val();
			invokePost("rest/addevent", event, "event was added", "failed to add an event");
			loadAdmin();
		});
	});
}

function loadDestructionClub() {
	$("#ShowMessage").empty();
	$("#Page").load("DeleteClub.html", function() {
		var listAsso;
		invokeGet("../rest/listassoc","failed to list association",function(response){
			listAsso = response;
			if (listAsso == null) return;
			for (var i=0; i < listAsso.length; i++) {
				var asso = listAsso[i];					
				$("#ListOfAsso").append("<input type='radio' name='asso' value='"+asso.nom+"'>"+asso.nom+" "+asso.description+"<br>");
			}
			$("#BTValDelClub").click(function() {
				club = {};
				club.nom = $("input[name='asso']:checked").val();
				invokePost("../rest/delclub", club, "club was deleted", "failed to delete a club");
					
				loadAdmin();
				});
		});
	});
}

/***************************************************************************/
/*LogOut		************************************************************/
/***************************************************************************/

function loadLogOut() {
	Cookies.remove('sessionMembre',{ path: '/' });
	location.replace("/TDB_AE_V22/");
}

/***************************************************************************/
/*INVOKES		************************************************************/
/***************************************************************************/



function invokePost(url, data, successMsg, failureMsg) {
	jQuery.ajax({
	    url: url,
	    type: "POST",
	    data: JSON.stringify(data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function (response) {
	    	console.log(successMsg);
	    },
	    error: function (response) {
	    	console.log(failureMsg);
	    }
	});
}
function invokeGet(url, failureMsg, responseHandler) {
	jQuery.ajax({
	    url: url,
	    type: "GET",
	    success: responseHandler,
	    error: function (response) {
	    	console.log(failureMsg);
	    }
	});
}

function invokeUser(url, data, failureMsg, responseHandler) {
	jQuery.ajax({
	    url: url,
	    type: "POST",
	    data: JSON.stringify(data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: responseHandler,
	    error: function (response) {
	    	console.log(failureMsg);
	    }
	});
}