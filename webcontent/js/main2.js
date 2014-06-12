/**
 * @author Kiran
 */

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments);
  },i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');



var baseURL = "http://1-dot-ghfshack.appspot.com/";
var Months = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
var userID = "";
var userName = "";
var FBLoggedin = false;
var GplusLoggedin = false;
var onPageLoadLogin = true;
var starttime= "";
var endtime ="";
var timetook = "";
var answered = false;
var opt = "";
var qid = "";
var intervals = 0; 


$(document).ready(function(){
	 // ga('create', 'UA-51561151-1', 'trivarc_com');
     // ga('send', 'pageview');
     ga('create', 'UA-51561151-1', 'auto', {
		'name' : 'trivarc_com'
	});
	ga('set', 'page', '/trivarc');
     
     $(".scrollablebox").niceScroll({
     	cursorcolor : "#f1fe00",
		cursorwidth : 10,
		cursorborder : "none",
		autohidemode : false,
		cursoropacitymin: 0.5
     });
	 getNewQuestion();
	// setTimeout(function(){
	    // logout();
	// },2000);                        
	
// 	TODO: check for gmail login if logged in check in DB by querying an api
 // TODO:  

	
	var timetonextQ = 0;
	
	var currentdate = new Date(); 
	var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    
    // var curr_year = d.getFullYear();
    // console.log(Months[currentdate.getMonth()] +" " +  currentdate.getDate() 
    // + ", " + currentdate.getFullYear() + " " + currentdate.getTime());
	timetonextQ = (60 - parseInt(currentdate.getMinutes())) * 60;
	
	// startIntervalCounting();
	
	
	
	$("#countdowntimer").timeTo(timetonextQ,function(){
		// alert("dsadaf");
		timetonextQ = 3600;
		$("#countdowntimer").timeTo(timetonextQ);
		getNewQuestion();
	});
	$(".whatisthis").click(function(e){
		e.stopPropagation();
		$(".bg-mask").show();
		$(".whatsitpage").fadeIn(300);
		
	});
	
	$(".fixtures").click(function(e){
		e.stopPropagation();
		
		if($(".fixturespage").css("display") == "block"){
			$(".fixturespage").slideUp(200,function(){
				$(".scrollablebox").getNiceScroll().resize();
			});
		}else{
			$(".fixturespage").slideDown(300,function(){
				$(".scrollablebox").getNiceScroll().resize();
			});
		}
		
	});
	
	
	$(".signup").click(function(e){
		onPageLoadLogin = false;
		e.stopPropagation();
		showLoginPage();
		
	});
	$(".bg-mask").click(function(){
		$(".login-page").hide();
		$(".whatsitpage").hide();
		$(".answeredmsg").hide();
		$(".thankyoumsg").hide();
		$(".gameIframe").hide();
	// $(".bg-mask").show();
		$(".option").prop("checked",false);
		$(this).hide();
	});
	$(".closebtn,.OKbtn").click(function(){
		$(this).parent().parent().hide();
		hideLoginPage();
		$(".option").prop("checked",false);
		answered = false;
	});
	
	
	$(".signout").unbind('click').click(function(){
      	logout();          
    });
      
      
    $(".option").click(function(e){
    	e.stopPropagation();
    	var loginStatus = checkLoginStatus();
    	endtime = new Date().getTime();
    	timetook = endtime - starttime;
    	answered = true;
    	opt = $(this).val();
        qid = $(".question").attr("name");
        ga('trivarc_com.send', 'event',"Attempted",userName,qid+" with answer " + opt);
    	if(loginStatus){
    		showConfirmMsg();
    	}else{
    		 $(".signup").trigger('click');
    	}
    	
    });
    
    $(".yes").click(function(e){
    	e.stopPropagation();
    	submitAnswer();
    	hideConfirmMsg();
    });
    $(".no").click(function(e){
    	e.stopPropagation();
    	$(".option").prop("checked",false);
    	hideConfirmMsg();
    });
    
    $(document).keyup(function(e){
    	var keycode = (e.keyCode ? e.keyCode : e.which);
	    if(keycode == '13'){
			if($(".thankyoumsg").css("display") == "block"){
				hideThankyouMsg();
			}else if($(".answeredmsg").css("display") == "block"){
				hideAlreadyAnsweredMsg();
			}else if($(".confirmanswer").css("display") == "block"){
				$(".yes").trigger("click");
			}
	    }else if(keycode == '27'){
	    	if($(".thankyoumsg").css("display") == "block"){
				hideThankyouMsg();
				
			}else if($(".answeredmsg").css("display") == "block"){
				hideAlreadyAnsweredMsg();
			}else if($(".confirmanswer").css("display") == "block"){
				$(".no").trigger("click");
			}else if($(".login-page").css("display") == "block"){
				hideLoginPage();
			}
	    }
    });
    
    
});

// function startIntervalCounting(){
	// intervals = setInterval(function(){
// 		
		// var ctime = new Date();
		// ctime= (60 - parseInt(ctime.getMinutes())) * 60;
		// console.log(ctime);
	   // if(ctime <= 60){
	   	  // clearInterval(intervals);
          // // hideGame();
	   // }
	// },60000);
// }



function submitAnswer(){
	sendAnswerToServer();
}

function showQuestion(){
	$(".timer").hide();
	$(".fact-field").hide();
	$(".question-box").show();	
	$(".scrollablebox").getNiceScroll().resize();
}
function hideQuestion(){
	$(".timer").show();
	$(".fact-field").show();
	$(".previousquestion-field").show();
	$(".question-box").hide();
	$(".scrollablebox").getNiceScroll().resize();
	// showGame();
}

function showTimeupMsg(){
    $(".previousquestion-field").hide();
    $(".question-box").hide();
	$(".timer").hide();
	$(".notime-field").show();
	// showGame();
}

function hideTimeupMsg(){
	$(".notime-field").hide();
	$(".timer").show();
}

function showThankyouMsg(){
	
	$(".thankyoumsg").fadeIn(300);
	$(".bg-mask").show();
}
function hideThankyouMsg(){
	$(".bg-mask").hide();
	$(".thankyoumsg").hide();
}



function showLoginPage(){
	$(".login-page").fadeIn(300);
	$(".bg-mask").show();
}

function hideLoginPage(){
	$(".login-page").hide();
	$(".bg-mask").hide();
}

function showConfirmMsg(){
	$(".confirmanswer").show();
	$(".bg-mask").show();
}

function hideConfirmMsg(){
	$(".confirmanswer").hide();
	$(".bg-mask").hide();
}

function showAlreadyAnsweredMsg(){
	$(".answeredmsg").show();
	$(".bg-mask").show();
}
function hideAlreadyAnsweredMsg(){
	$(".answeredmsg").hide();
	$(".bg-mask").hide();
}

function showGame(){
	$(".gameIframe").show();
}


function hideGame(){
	$(".stopGameMsg").show();
	$(".gameIframe").hide();
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
	// alert(answered);
	
	var curdate = new Date();
	
	$(".signup").hide();
	$(".signout").show();
	hideLoginPage();
	ga('trivarc_com.send', 'event',"User_loggedIn",userName,curdate.getTime());
	if(curdate.getHours() >= 6 && curdate.getHours() < 23){
	   
	}else{
		showTimeupMsg();
		
	}
	
	
	
	
}


function logoutSuccessFully(){
	var curdate = new Date();
	
	ga('trivarc_com.send', 'event',"User_loggedOut",userName,curdate.getTime());
	FBLoggedin = false;
	GplusLoggedin = false;
	userID = "";
	userName = "";
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
	
	// alert(curdate.getHours());
	if(curdate.getHours() >= 9 && curdate.getHours() < 23){
	
	curdate = curdate.getTime();
	
	hideTimeupMsg();
	
	$.ajax({
		type:"GET",
		url: baseURL+"get?date="+curdate,
		dataType: "json",
		crossDomain:true,
		success: function(res){
			
			if(res != null){
				updateQuestionArea(res);
				ga('trivarc_com.send', 'event',"Question_arrived",curdate,res.questionId);
				starttime = new Date().getTime();
				showQuestion();
				
			}else{
				$(".previousquestion-field").hide();
				
				hideQuestion();
				
				
			}
		}
	});
	}else{
		
		showTimeupMsg();
		// startIntervalCounting();
	}
}




function updateQuestionArea(res){
	var qID = res.questionId;
	qid = qID;
	var newQ = res.question;
	var opA = '';
	var opB = '';
	var opC = '';
	var opD = '';
	var prevQue = res.lastQuestion;
	var prevans = res.lastAnswer;
	var fact = res.fact;
	
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
    
	$(".question-box").fadeIn(300);
	$(".fact-field .the-fact").html(fact);
	$(".fact-field").hide();
	$(".question").attr("name",qID);
	$(".question span").html(newQ);
	$(".opta").html(opA);
	$(".optb").html(opB);
	$(".optc").html(opC);
	$(".optd").html(opD);
	if(prevQue != undefined || prevQue != null){
		$(".previousquestion-field").show();
		$(".prevquestion span").html(prevQue);
		$(".prevquestionanswer span").html(prevans);
	}else{
		$(".previousquestion-field").hide();
	}
	
}




function checkIfUserInDB(userid){
	
	$.ajax({
		type:"GET",
		url: baseURL+"validateuser?UID="+userid,
		dataType: "text",
		crossDomain:true,
		success: function(res){
			
			if($.trim(res) == "Success"){
				// if(answered == true){
					
					checkIfQuestionIsAnswered();
				// }
				
				
				
    	    }else if(onPageLoadLogin){
			    gapi.auth.signOut();
			    if(FBLoggedin){
			    	
			    }
			    $('.whatisthis').trigger("click");
            }
			else{
				
    	    	checkIfQuestionIsAnswered();
    		}
			
			
		}
	});
	
}


function checkIfQuestionIsAnswered(){
	
	$.ajax({
		type:"GET",
		url: baseURL+"check?QID="+qid+"&UID="+userID,
		dataType: "text",
		crossDomain:true,
		success: function(res){
			//console.log(res);
			
			
			if($.trim(res) == "Success"){   // already answered
				// $(".signup").hide();
	            // $(".signout").show();
	            hideQuestion();
				showAlreadyAnsweredMsg();
			}else{
				
				if(answered)
				   showConfirmMsg();
			}
		}
	});
}

function sendAnswerToServer(){

	
	$.ajax({
		type:"GET",
		url: baseURL+"recordanswer?QID="+qid+"&AID="+opt+"&UID="+userID+"&TimeTaken="+timetook,
		dataType: "text",
		crossDomain:true,
		success: function(res){

			if($.trim(res) == "Fail"){   // already answered
				showAlreadyAnsweredMsg();
				hideQuestion();
				
			}else{
				ga('trivarc_com.send', 'event',"Answered_successfully",userID,qid+" with answer " + opt);
				showThankyouMsg();
				hideQuestion();
				// startIntervalCounting();
			}
		}
	});
}


