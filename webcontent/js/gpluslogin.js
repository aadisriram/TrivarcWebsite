/**
 * @author Kiran
 */

function signinCallback(authResult) {
  //console.log(authResult);
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    // if(onPageLoadLogin){
	    // console.log(authResult);
	    gapi.client.load('plus','v1', loadProfile);
        
   		// 
   		//console.log('Sign-in state: ' + authResult['error']);
    // }else{
    	// gapi.auth.signOut();
    // }
    
  } else {
    // Update the app to reflect a signed out user
    // Possible error values:
    //   "user_signed_out" - User is signed-out
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatically log in the user
    
    
  }
}

// function loginFinishedCallback(authResult) {
    // if (authResult) {
      // if (authResult['error'] == undefined){
        // toggleElement('signin-button'); // Hide the sign-in button after successfully signing in the user.
        // gapi.client.load('plus','v1', loadProfile);  // Trigger request to get the email address.
      // } else {
        // console.log('An error occurred');
      // }
    // } else {
      // console.log('Empty authResult');  // Something went wrong
    // }
  // }

  /**
   * Uses the JavaScript API to request the user's profile, which includes
   * their basic information. When the plus.profile.emails.read scope is
   * requested, the response will also include the user's primary email address
   * and any other email addresses that the user made public.
   */
  function loadProfile(){
    var request = gapi.client.plus.people.get( {'userId' : 'me'} );
    request.execute(loadProfileCallback);
  }

  /**
   * Callback for the asynchronous request to the people.get method. The profile
   * and email are set to global variables. Triggers the user's basic profile
   * to display when called.
   */
  function loadProfileCallback(obj) {
    profile = obj;

    // Filter the emails object to find the user's primary account, which might
    // not always be the first in the array. The filter() method supports IE9+.
    email = obj['emails'].filter(function(v) {
        return v.type === 'account'; // Filter out the primary email
    })[0].value; // get the email from the filtered results, should always be defined.
    displayProfile(profile);
  }

  /**
   * Display the user's basic profile information from the profile object.
   */
  function displayProfile(profile){
  	// console.log("name:" + profile['displayName']);
  	// console.log("email: "+ email);
  	userName = profile['displayName'];
  	userID = email;
  	GplusLoggedin = true;
  	loginSuccessFul();
    	
  	
  	checkIfUserInDB(userID);
  	
  	// console.log();
  	
    // document.getElementById('name').innerHTML = profile['displayName'];
    // document.getElementById('pic').innerHTML = '<img src="' + profile['image']['url'] + '" />';
    // document.getElementById('email').innerHTML = email;
   
  }
