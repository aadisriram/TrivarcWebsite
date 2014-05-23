/**
 * @author Kiran
 */
var baseURL = "http://1-dot-ghfshack.appspot.com/";
var Months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
var userID = "";
var userName = "";
var FBLoggedin = false;
var GplusLoggedin = false;
var onPageLoadLogin = false;


$(document).ready(function(){
	
	getNewQuestion();
	setTimeout(function(){
	    logout();
	},2000);
	
	var timetonextQ = 0;
	
	var currentdate = new Date(); 
	var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    
    // var curr_year = d.getFullYear();
    // console.log(Months[currentdate.getMonth()] +" " +  currentdate.getDate() 
    // + ", " + currentdate.getFullYear() + " " + currentdate.getTime());
	timetonextQ = (60 - parseInt(currentdate.getMinutes())) * 60;
	
	$("#countdowntimer").timeTo(timetonextQ,function(){
		// alert("dsadaf");
		timetonextQ = 3600;
		$("#countdowntimer").timeTo(timetonextQ);
		// getNewQuestion();
	});
	$(".whatisthis").click(function(e){
		e.stopPropagation();
		$(".bg-mask").show();
		$(".whatsitpage").fadeIn(300);
		
	});
	
	$(".signup").click(function(e){
		onPageLoadLogin = true;
		e.stopPropagation();
		showLoginPage();
		
	});
	$(".bg-mask").click(function(){
		$(".login-page").hide();
		$(".whatsitpage").fadeOut(200);
		$(this).hide();
	});
	$(".signout").unbind('click').click(function(){
      	logout();          
    });
      
      
    $(".option").click(function(e){
    	e.stopPropagation();
    	var loginStatus = checkLoginStatus();
    	if(loginStatus){
    		var opt = $(this).val();
			sendAnswerToServer(opt);
    	}
    	
    });
});


function showLoginPage(){
	$(".login-page").show();
	$(".bg-mask").show();
}


function checkLoginStatus(){
	
	if(FBLoggedin || GplusLoggedin){
		return true;
	}else{
		showLoginPage();
		
	}
	
	
}


function loginSuccessFul(){
	$(".signup").hide();
	$(".signout").show();
	$(".bg-mask").hide();
	$(".login-page").hide();
	
	console.log(userID + " ------ " + userName);
}
function logoutSuccessFully(){
	$(".signup").show();
	$(".signout").hide();
}

function logout(){
	
	if(FBLoggedin){
	  FB.getLoginStatus(function(response) {
	    if(response.status == "connected"){
	    	logoutSuccessFully();
	    }
	    
	  });
	 }
	 
	 gapi.auth.signOut();
	 
	 logoutSuccessFully();
}


function getNewQuestion(){
	var curdate = new Date();
	curdate = curdate.getTime();
	
	
	$.ajax({
		type:"GET",
		url: baseURL+"get?date="+curdate,
		dataType: "json",
		crossDomain:true,
		success: function(res){
			console.log(res);
			if(res != null){
				updateQuestionArea(res);
			}else{
				
				var lastQanswered = CheckLastQuestionAnswered();
				timedOut();
			}
		}
	});
}


function CheckLastQuestionAnswered(){
	
	
	
}

function timedOut(){
	
	
	
	
}

function updateQuestionArea(res){
	
	var newQ = res.question;
	var opA = '';
	var opB = '';
	var opC = '';
	var opD = '';
	
	$.each(res.options,function(k,v){
		if(k == 0){
			opA = v;
		}else if(k == 1){
			opB = v;
		}else if(k == 2){
			opC = v;
		}else if(k == 3){
			opD = v;
		}
	});
	
	$(".question span").html(newQ);
	$(".opta").html(opA);
	$(".optb").html(opB);
	$(".optc").html(opC);
	$(".optd").html(opD);
	
}


function sendAnswerToServer(opt){
	
	console.log(opt);
	
	// $.ajax({
		// type:"GET",
		// url: baseURL+"get?date="+curdate,
		// dataType: "json",
		// crossDomain:true,
		// success: function(res){
			// console.log(res);
			// if(res != null){
				// updateQuestionArea(res);
			// }else{
				// timedOut();
			// }
// 			
// 			
		// }
	// });
}
