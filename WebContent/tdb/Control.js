/**
 * 
 */

$(document).ready(function() {
	
	loadMenu();
	loadAccueil();
	loadSmallDataBase();
	
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
		loadCurrentsEvents();
		loadCurrentsTopics();
		loadNavigation("Accueil");
}

function loadCurrentsEvents() {
	listEvents = invokeGet("../rest/listevents", "failed to list salles", function(response) {
		var listDate;
		var listAsso;
		var listNomEvent;
		listEvents = response;
		if (listEvents.length == 0) {
			$("#EVENTTOCOME").append("Aucun evenement a venir !")
			return;
		}
		listDate="<ul class=\"details\"> <li class=\"topic\">Date</li>";
		listAsso="<ul class=\"details\"> <li class=\"topic\">Asso</li>";
		listNomEvent="<ul class=\"details\"> <li class=\"topic\">Events</li>";
		for (var i=0; i < listEvents.length; i++) {
			var ev = listEvents[i];
			listDate+="<li><a href=\"#\">" + ev.date + "</a></li>";
			listAsso+="<li><a href=\"#\">" + ev.asso_organisateur.nom + "</a></li>";
			listNomEvent+="<li><a href=\"#\">" + ev.nom + "</a></li>";
		}
		listDate+="</ul>";
		listAsso+="</ul>";
		listNomEvent+="</ul>";
		$("#EVENTTOCOME").empty();
		$("#EVENTTOCOME").append(listDate);
		$("#EVENTTOCOME").append(listAsso);
		$("#EVENTTOCOME").append(listNomEvent);
	});
	$("#SeeAll").click(function() {
		loadForum();
	});
	
}

function loadCurrentsTopics() {
	listTopics = invokeGet("../rest/listTopic", "failed to list salles", function(response) {
		var listNomTopics;
		listTopics = response;
		if (listTopics.length == 0) {
			$("#CURRENTTOPICS").append("Aucun topics actuellement!")
			return;
		}
		listNomTopics="<ul class=\"top-sales-details\">";
		for (var i=0; i < listTopics.length; i++) {
			var tp = listTopics[i];
			listNomTopics+="<li><a href=\"#\"><span class=\"product\">" + tp.titre + "</span></a></li>";
		}
		listNomTopics+="</ul>";
		$("#CURRENTTOPICS").empty();
		$("#CURRENTTOPICS").append(listNomTopics);
	});
}

/***************************************************************************/
/*EVENEMENT		************************************************************/
/***************************************************************************/

function loadEvenements() {
	$("#Page").load("evenements.html", function() {
		$("#BTCreateEvent").click(function() {
			loadAddEvent();
		});
		$("#BTSubscribeEvent").click(function() {
		});
		$("#BTMyEvents").click(function() {
		});
	});
	loadNavigation("Evenements");
}

function loadAddEvent() {
	$("#ShowMessage").empty();
	$("#Page").load("AddEvent.html", function() {
		loadAssoc();
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
			asso = {};
			asso.nom = $("#EventOrga").val();
			event.asso_organisateur=asso;
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

function loadAssoc() {
	$("#ShowMessage").empty();
	listAssoc = invokeGet("../rest/listassoc", "failed to list salles", function(response) {
		var list;
		listAssoc = response;
		if (listAssoc == null) return;
		list="<select name=\"Assoc\" id=\"EventOrga\">";
		for (var i=0; i < listAssoc.length; i++) {
			var a = listAssoc[i];
			list+="<option value=\""+ a.nom + "\">" + a.nom + "</option>";
		}
		list+="</select>";
		$("#selection-club").empty();
		$("#selection-club").append(list);
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
	$("#MenuTopic").empty();
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
			$("#BTRetourTopics").click(function() {
				loadForum();
			});
		});
}

function loadTopics() {
	listPersons = invokeGet("../rest/listTopic", "failed to list topic", function(response) {
		var list = " ";
		listTopic = response;
		if (listTopic.length == 0) {
			$("#TopicMsg").text("Il n'y a aucun topic.");
			return 
		} else {
			for (var i=0; i < listTopic.length; i++) {
			var topic = listTopic[i];					
			list+="<div class=\"Topic-box\">" + "<a href=\"/TDB_AE_V4/tdb/forum/topic.html?topicID=" + topic.id + "\">" + "<button class=\"buttonTopic\">" + "<span class=\"TitreTopic\">" + topic.titre + "</span><br>" + "<span class=\"DescTopic\">" + topic.description + "</span>" + "</button>" + "</a>" + "</div>";
			}
		};

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
		if (currentUser == "admin") {
			$("#RealName").text("Admin");
			$("#UserName").text("a.k.a Dieu");
			$("#EmailUser").text("dieu@dieu.fr");
			$("#PromoUser").text("+inf");
		} else {
			utilisateur = {};
			utilisateur.username = currentUser;
			invokeUser("../rest/recupeDonneesUser",utilisateur,"Erreur Chargement Donnees utilisateur", function(response) {
			userl = response;
			$("#RealName").text(userl.prenom + " " + userl.nom);
			$("#UserName").text(userl.username);
			$("#EmailUser").text(userl.mail);
			$("#PromoUser").text(userl.annee);
			$("#BTsCompte").load("monCompte/modifierBtnCompte.html", function() {
			$("#BTModifierCompte").click(function() {
				loadModifierCompte();
			});
		});
		});
		}
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
		club ={};
		listAssoc = invokeGet("../rest/listassoc", "failed to list salles", function(response) {
			var list;
			var nom;
			listAssoc = response;
			if (listAssoc == null) return;
			list="<select class=\"assoc\" id=\"Assochang\">";
			for (var i=0; i < listAssoc.length; i++) {
				var a = listAssoc[i];
				list+="<option value=\""+ a.nom + "\">" + a.nom + "</option>";
			}
			list+="</select>";
			$("#selection-club").empty();
			$("#selection-club").append(list);
			var n = listAssoc[0].nom;
		    $("select.assoc").change(function(){
		    	n = $(this).children("option:selected").val();
		    });
			$("#BTClub").click(function() {
				Cookies.set('association', n, { expires: 7, path: '/' });
				loadModifClub1();
				});
		});
				
	});
}

function loadModifClub1() {
	$("#ShowMessage").empty();
	$("#Page").load("ModifClub1.html", function() {

		club ={};
		club.nom = Cookies.get('association');
		asso = invokeUser("../rest/assoc", club,"failed to list salles", function(response) {
			asso = response;
			if (asso == null) return;
			var prez = asso.president;
			$("#Prez").empty();
			$("#Prez").append("<p>" + prez.prenom + " " + prez.nom  +"<p>");
			var trez = asso.tresorier;
			$("#Trez").empty();
			$("#Trez").append("<p>" + trez.prenom + " " + trez.nom  +"<p>");
			var bur = asso.bureau;
			var list="<ul>";
			for (var i=0; i < bur.length; i++) {
				var personne = bur[i];					
				list+="<li>"+personne.prenom+" "+person.nom+"</li>";
			}
			list+="</ul><br>";
			$("#Bureau").empty();
			$("#Bureau").append(list);
			var mem = asso.membres;
			var list="<ul>";
			for (var i=0; i < mem.length; i++) {
				var personne = mem[i];					
				list+="<li>"+personne.prenom+" "+person.nom+"</li>";
			}
			list+="</ul><br>";
			$("#Membres").empty();
			$("#Membres").append(list);
			//deuxieme partie
			
			util ={};
			listutil = invokeGet("../rest/liststudent","failed to list utilisateur", function(response) {
				var list;
				var nom;
				listutil = response;
				if (listutil == null) return;
				list="<select class=\"trez\" id=\"trez\">";
				for (var i=0; i < listutil.length; i++) {
					var u = listutil[i];
					list+="<option value=\""+ u.username + "\">" + u.prenom + " " + u.nom +"</option>";
				}
				list+="</select>";
				$("#ListOfTrez").empty();
				$("#ListOfTrez").append(list);
				var t ;
			    $("select.trez").change(function(){
			    	t = $(this).children("option:selected").val();
			    });
				
				list="<select class=\"prez\" id=\"prez\">";
				for (var i=0; i < listutil.length; i++) {
					var u = listutil[i];
					list+="<option value=\""+ u.username+ "\">" + u.prenom + " " + u.nom +"</option>";
				}
				list+="</select>";
				$("#ListOfPrez").empty();
				$("#ListOfPrez").append(list);
				var p ;
			    $("select.prez").change(function(){
			    	p = $(this).children("option:selected").val();
			    });
			    //Bureau add
			    list="<select class=\"bur1\" id=\"bur1\">";
				for (var i=0; i < bur.length; i++) {
					var u = listutil[i];
					list+="<option value=\""+ u.username + "\">" + u.prenom + " " + u.nom +"</option>";
				}
				list+="</select>";
				$("#ListOfBureau1").empty();
				$("#ListOfBureau1").append(list);
				var b1 ;
			    $("select.bur1").change(function(){
			    	b1 = $(this).children("option:selected").val();
			    });
			    //Bureau del
			    list="<select class=\"bur2\" id=\"bur2\">";
				for (var i=0; i < bur.length; i++) {
					var u = bur[i];
					list+="<option value=\""+ u.username + "\">" + u.prenom + " " + u.nom +"</option>";
				}
				list+="</select>";
				$("#ListOfBureau2").empty();
				$("#ListOfBureau2").append(list);
				var b2 ;
			    $("select.bur2").change(function(){
			    	b2 = $(this).children("option:selected").val();
			    });
			    //Membres add
			    list="<select class=\"mem1\" id=\"mem1\">";
				for (var i=0; i < listutil.length; i++) {
					var u = listutil[i];
					list+="<option value=\""+ u.username + "\">" + u.prenom + " " + u.nom +"</option>";
				}
				list+="</select>";
				$("#ListOfMembre1").empty();
				$("#ListOfMembre1").append(list);
				var m1 ;
			    $("select.mem1").change(function(){
			    	m1 = $(this).children("option:selected").val();
			    });
			    //Membres delete
			    list="<select class=\"mem2\" id=\"mem2\">";
				for (var i=0; i < mem.length; i++) {
					var u = mem[i];
					list+="<option value=\""+ u.username + "\">" + u.prenom + " " + u.nom +"</option>";
				}
				list+="</select>";
				$("#ListOfMembre2").empty();
				$("#ListOfMembre2").append(list);
				var m2 ;
			    $("select.mem2").change(function(){
			    	m2 = $(this).children("option:selected").val();
			    });
				$("#BTChangeTres").click(function() {
					invokePost("../rest/changetres",[t,asso],"failed to change tres");
					loadModifClub1();
				});
				$("#BTChangePres").click(function() {
					invokePost("../rest/changepres",[p,asso],"failed to change pres");
					loadModifClub1();
				});
				$("#BTABur").click(function() {
					invokePost("../rest/addbur",[b1,asso],"failed to add to bureau");
					loadModifClub1();
				});
				$("#BTAMem").click(function() {
					invokePost("../rest/addmem",[m1,asso],"failed to add to membres");
					loadModifClub1();
				});
				$("#BTDBur").click(function() {
					invokePost("../rest/delbur",[b2,asso],"failed to add to bureau");
					loadModifClub1();
				});
				$("#BTDMem").click(function() {
					invokePost("../rest/delmem",[m2,asso],"failed to add to membres");
					loadModifClub1();
				});
				$("#BTBye").click(function() {
					Cookies.remove('association',{ path: '/' });
					loadAdmin();
				});
			});
				
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
	location.replace("/TDB_AE_V4/");
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

function loadSmallDataBase() {
	loadUsersDataBase();
	loadSallesDataBase();
	loadAssoDataBase();
	loadEventsDataBase();
	
}

function loadUsersDataBase(){
	for (var i=0; i < 10; i++) {
		utilisateur = {};
		utilisateur.username = "User " + i;
		utilisateur.password = "Pass " + i;
		utilisateur.mail = "User"+i+"@"+"domaine.fr";
		utilisateur.nom = "Nom "+i;
		utilisateur.prenom = "Prenom "+i;
		utilisateur.annee = 200 + i;
		invokePost("../rest/addutilisateur", utilisateur, "L'utilisateur a ete ajoute'", "Erreur Ajout utilisateur");
	}
}

function loadSallesDataBase() {
	for (var i=0; i < 10; i++) {
		salle = {};
		salle.nom= "C" + 10 + i;
		salle.batiment= "A";	
		salle.etage= 1;
		salle.capacite= 64;		
		invokePost("../rest/addsalle", salle, "event was added", "failed to add an event");
	}
}

function loadEventsDataBase() {
			for (var i=0; i < 10; i++) {
				event = {};
				event.nom="Event" + i;
				event.description="Description" + i;	
				event.date="02/06/2022";
				event.time="14:00";
				s = {};
				s.nom = "C" + 10 + i;
				event.salle = s;
				asso = {};
				asso.nom = "Club" + i;
				event.asso_organisateur=asso;
				invokePost("../rest/addevent", event, "event was added", "failed to add an event");
			
			}
	
}

function loadAssoDataBase() {
		for (var i=0; i < 10; i++) {
				club = {};
				club.nom="Club" + i;
				club.description="Description" + i;
				prez = {};
				trez = {};
				prez.username = "User " + i;
				trez.username = "User " + i;
				club.president = prez
				club.tresorier = trez
				invokePost("../rest/addclub", club, "club was added", "failed to add a club");
			}

}