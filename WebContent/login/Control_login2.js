/**
 * 
 */
 
$(document).ready(function() {
		
	var loginUsername;
	var loginPassword;
	var loginUsernameAdmin = "admin";
	var loginPasswordAdmin = "admin";
	
	var account = [loginUsername, loginPassword];
  
	$('#BTConnexionUtilisateur').on('click', function() {
		var loginUsernameEntry = $("#login-username").val();
		var loginPasswordEntry = $("#login-password").val();

		if (loginUsernameEntry == loginUsernameAdmin && loginPasswordEntry == loginPasswordAdmin) {
			Cookies.set('sessionMembre', 'admin');
			location.replace("tdb/index.html");
		} else {
			utilisateur = {};
			utilisateur.username = loginUsernameEntry;
			utilisateur.password = loginPasswordEntry;
			user = invokeUser("rest/loginutilisateur",utilisateur,"failed to login", function(response) {
				Cookies.set('sessionMembre', loginUsernameEntry, { expires: 7, path: '/' });
				location.replace("tdb/index.html");
			});
		};
	});
  
	$('#BTRegisterUtilisateur').on('click', function() {
		var createUsernameEntry = $("#create-username").val();
		var createPasswordEntry = $("#create-password").val();
		var createEmailEntry = $("#create-email").val();
		var createNameEntry = $("#create-name").val();
		var createSurnameEntry = $("#create-surname").val();
		var createYearEntry = $("#create-year").val();
    var createUsernameValid = false;
    var createPasswordValid = false;
    var createEmailValid = false;
    var createUsernameObject = $("#create-username");
    var createPasswordObject = $("#create-password");
    var createEmailObject = $("#create-email");
    var validate = /^\s*[a-zA-Z0-9,\s]+\s*$/;
    var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(!validate.test(createUsernameEntry) || (createUsernameEntry).length == 0) {
      $(createUsernameObject).addClass("error")
      $(createUsernameObject).val("No special characters or spaces.")
    } else {
      createUsernameValid = true;
      var createUsername = $(createUsernameObject).val();
    }
    
    if(!validate.test(createPasswordEntry) || (createPasswordEntry).length == 0) {
      $(createPasswordObject).addClass("error");
      $(createPasswordObject).val("No special characters or spaces.");
    } else {
      createPasswordValid = true;
      var createPassword = $(createPasswordObject).val();
    }
    
    if(!validateEmail.test(createEmailEntry)) {
      $(createEmailObject).addClass("error");
      $(createEmailObject).val("Enter a valid email");
    } else {
      createEmailValid = true;
      console.log("Account Email " + createEmailObject.val())
    }
      
    $(createUsernameObject).on('click', function () {
      $(this).val("");  
      $(this).removeClass("error");
    });
    
    $(createPasswordObject).on('click', function () {
      $(this).val("");  
      $(this).removeClass("error");
    });
    
    $(createEmailObject).on('click', function () {
      $(this).val("");
      $(this).removeClass("error");
    });
    
		account = [createUsername, createPassword];
		
		console.log("Account Username " + account[0]);
		console.log("Account Password " + account[1]);
    
		if(createUsernameValid == true && createPasswordValid == true && createEmailValid == true) {
		
		utilisateur = {};
		utilisateur.username = account[0];
		utilisateur.password = account[1];
		utilisateur.mail = createEmailEntry;
		utilisateur.nom = createNameEntry;
		utilisateur.prenom = createSurnameEntry;
		utilisateur.annee = createYearEntry;
		
      $('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "fast");

		invokePost("rest/addutilisateur", utilisateur, "L'utilisateur a ete ajoute'", "Erreur Ajout utilisateur");
    }
	});
	
	$('.message a').on('click', function() {
		$('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "fast");
	});
});

function invokePost(url, data, successMsg, failureMsg) {
	jQuery.ajax({
	    url: url,
	    type: "POST",
	    data: JSON.stringify(data),
	    dataType: "json",
	    contentType: "application/json; charset=utf-8",
	    success: function (response) {
	    	$("#RegisterErrorMsg").text(successMsg);
	    },
	    error: function (response) {
	    	$("#RegisterErrorMsg").text(failureMsg);
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
	    	$("#RegisterErrorMsg").text(failureMsg);
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



