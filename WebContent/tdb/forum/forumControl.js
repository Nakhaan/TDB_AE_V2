/**
 * 
 */

$(document).ready(function() {	
	loadMenu();
	loadNavigation("Forum");
	loadCeTopic() 
});

/***************************************************************************/
/*Fonctions		************************************************************/
/***************************************************************************/

function loadMenu() {
		$("#Menu").load("menuRetour.html", function() {
			$("#BTAccueil").click(function() {
				location.replace("../../tdb/index.html");
			});
		});
}

function loadNavigation(HeadTitle) {
	$("#Navigation").load("../navigation.html", function() {
		$("#HeadTitle").text(HeadTitle);
		$("#user_session").text(Cookies.get('sessionMembre'));
	});
}

/***************************************************************************/
/*FORUM			************************************************************/
/***************************************************************************/

function loadCeTopic() {
	
	var topicID = GetURLParameter('topicID');

	console.log(topicID);
	topic = {};
	topic.id = topicID;
	invokeTopic("../../rest/recupDonneesTopic",topic,"Recuperation Topic Echec",function(response) {
		console.log("ERREUR 1");
		ceTopic = response;
		console.log("ERREUR 2");
		$("#CeTopicTitle").empty();
		$("#CeTopicTitle").append(ceTopic.titre);
		$("#CeTopicDescription").empty();
		$("#CeTopicDescription").append(ceTopic.description);
		console.log("ERREUR 3");
		loadListMessage(ceTopic);
		console.log("ERREUR 4");
		loadCreerMessage(ceTopic);
		
	});	
}

function loadListMessage(ceTopic) {
	var messages = ceTopic.messages;
	$("#MessageList").empty();
	if (messages.length == 0) {
		$("#MessageList").append("<div>" + "Il n'y a pas de messages dans cette conversation" + "</div>");
	} else {
		for (var i=0; i < messages.length; i++) {
					var message = messages[i];
					$("#MessageList").append("<div> <span>" + "Auteur : " + message.auteur + "</span>" + "<br>" + "<div>" + "Message : " + message.message + "</div> </div>" + "<br>");				
		}
	}
}

function loadCreerMessage(ceTopic) {
	$("#MenuMessage").load("menuMessage.html", function() {
			$("#BTCreerMessage").click(function() {
				console.log("ERREUR 6");
				$("#NewMessage").load("newMessage.html", function() {
					$("#BTSubmitMessage").click(function () {
						console.log("ERREUR ICI");
						var MessageEntry = $("#EntreeMessage").val();
						console.log(MessageEntry);
						message = {};
						message.message = MessageEntry;
						message.auteur = Cookies.get("sessionMembre");
						message.topic = ceTopic;
						invokeTopic("../../rest/addMessToTopic",message,"Erreur Ajout Message", function(response) {
							returnMess = response;
							join = {};
							join.topicID = ceTopic.id;
							join.messageID = returnMess.id;
							invokePost("../../rest/jointure", join, "Jointure effective", "Erreur jointure")
							loadCeTopic()
						});
						console.log("AVANT INVOKEPOST");
					});
					console.log("ERREUR 4.1");
				});
				console.log("ERREUR 4.2");
			});
			console.log("ERREUR 8");
		});
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

function invokeTopic(url, data, failureMsg, responseHandler) {
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

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return decodeURIComponent(sParameterName[1]);
        }
    }
}