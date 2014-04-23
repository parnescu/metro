// no outside frameworks were used, everything is written in vanillajs
// there are things to be improved on the IE side but that's just a HUGE
// timesink and I deeed it not necesary for this particular test...
// the app looks and works very well on the Chrome,FF and IE9 or above
// on IE8 and below, since media queries are not supported... I just left it there
// as I said legacy browsers are HUGE timesinks and I despise internet explorer wholeheartedly ...
// I spent more than 3 hrs just sorting out things in IE and testing how it looks (bleh!)

(function(){
	"use strict"
		// I use wrapper function because it comes
		// much easier for me to type trace rather
		// than console.log, must be because of
		// my actionscript background
	var trace = function(f){ console.log(f);}, isIE, ver, scope,
		
		// main "class" of the project
		f = function(){
			/*
				- set scope for global use
				- detect if internet explorer, and act accordingly 
				- look for the form and submit button
				- add event listener for submit
				- validate data on button click
			*/

			scope = this;
			isIE = navigator.appName.toLowerCase().indexOf('internet explorer') != -1;
			trace('MAIN:: init '+(isIE ? "- on internet explorer" : ""));
			
			if(isIE){
				// if the user is dumb enough to use internet explorer
				// add classes for css use
				var temp = navigator.appVersion.toLowerCase().split(";");
				for (var i=0, version;version=temp[i];i++){
					if (version.indexOf("msie") != -1){
						ver = parseInt(version.replace('msie ', ""),10);
						break;
					}
				}
				document.body.className = 'legacy ie'+ver;
			}

			// look for items and add event listeners
			// if it fails -> user is on internet explorer
			try{
				this.frm = document.querySelector('#userData');
				this.submit = document.querySelector('#submitBtn');	
				this.submit.removeAttribute('onclick');
				this.submit.addEventListener('click', this.validateForm);
			}catch(e){
				this.frm = document.getElementById('userData');
				this.submit = document.getElementById('submitBtn');
				this.submit.attachEvent('onclick', this.validateForm);
			}	

			// make everything private
			return {}
		}
	f.prototype.validateEmail = function(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	} 
	f.prototype.validateForm = function(e){
		// on normal browsers form validation is built in
		// for crappy IE validation should be done by hand
		var showError = false;
		trace("MAIN:: validate form");
		if (e.preventDefault){ e.preventDefault();}
		
		if (isIE){
			trace()
			var name = document.getElementById('userName').value,
				email = document.getElementById('userEmail').value;
			
			showError = name.length < 3 || email.length < 3
			if (showError === false){ showError = scope.validateEmail(email);}
		}else{
			showError = !scope.frm.checkValidity();
		}

		if (showError === true){
			alert("Please enter valid name and e-mail address!");
		}else{
			alert("SUBMIT DATA TO SERVER")
			scope.frm.reset();
			//scope.frm.submit();
		}
		
		return false;
	}

	window.onload = function(){ window._app = new f()};
})()