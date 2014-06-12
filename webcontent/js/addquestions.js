/**
 * @author Kiran
 */

var baseURL = "http://1-dot-ghfshack.appspot.com/";

$(document).ready(function(){
	$(".displaydate").datetimepicker();
	$(".submitQ").click(function(e){
		e.stopPropagation();
		addNewQuestion();
	});
	
	$(".submitFact").click(function(e){
		e.stopPropagation();
		addNewFact();
	});
	
});


function addNewQuestion(){
	var date = $(".question-date").val();
	var que = $(".question textarea").val();
	var optA = $(".optionA").val();
	var optB = $(".optionB").val();
	var optC = $(".optionC").val();
	var optD = $(".optionD").val();
	var correctans = $(".correctans").val();
	var fact = $(".fact textarea").val();
	
	console.log(date);
	// console.log("opt a"+optA);
	// console.log("opt b"+optB);
	// console.log("opt c"+optC);
	// console.log("opt d"+optD);
	// console.log("correct ans"+correctans);
	var optarray = [];
	optarray.push(optA);
	optarray.push(optB);
	optarray.push(optC);
	optarray.push(optD);
	
	var quesJson = {
		"question":que,
		"options": optarray,
		"questionDate": date,
		"answer": correctans
	};
	var year = '';
	var mm = '';
	var dd = '';
	var hh = '';
	var min = '';
	var sec = '';
	var dat = date.split(" ")[0];
	var tim = date.split(" ")[1];
	// console.log(dat);
	// console.log(tim);
	year = dat.split("/")[0];
	mm = parseInt(dat.split("/")[1]) -1;
	dd = dat.split("/")[2];
	hh = tim.split(":")[0];
	min = tim.split(":")[1];
	// console.log(year);
	
	console.log(year + " "+ mm+ " "+dd+ " "+ hh+ " "+min);
	var qdate = new Date(year,mm,dd,hh,min,0);
	console.log(qdate.getTime().toString());
	var quedate = qdate.getTime().toString();
	
	
	var jsonString = '{"question":"'+ que +'","options":["'+ optA +'","'+optB+'","'+ optC+'","'+optD+'"],"answer":"'+ correctans +'","fact":"'+ fact +'"}&date='+quedate;
	
	
	console.log(jsonString);
	$.ajax({
		type:"GET",
		url: baseURL+"add?question="+jsonString,
		crossDomain:true,
		dataType: "text",
		success: function(res){
			console.log(res);
			if($.trim(res)=="Question Added"){
				$("input").val("");
				$("textarea").val("");
			}else{
				alert("Something wrong with the entered values");
			}
			
		}
	});
	
	
}

function addNewFact(){
	var date = $(".fact-date").val();
	var fact = $(".fact textarea").val();
	var year = '';
	var mm = '';
	var dd = '';
	var hh = '';
	var min = '';
	var sec = '';
	var dat = date.split(" ")[0];
	var tim = date.split(" ")[1];
	
	year = dat.split("/")[0];
	mm = parseInt(dat.split("/")[1]) -1;
	dd = dat.split("/")[2];
	hh = tim.split(":")[0];
	min = tim.split(":")[1];
	
	
	console.log(year + " "+ mm+ " "+dd+ " "+ hh+ " "+min);
	var qdate = new Date(year,mm,dd,hh,min,0);
	console.log(qdate.getTime().toString());
	var quedate = qdate.getTime().toString();
	
	
	
	$.ajax({
		type:"GET",
		url: baseURL+"addfact?fact="+fact+"&date="+quedate,
		crossDomain:true,
		dataType: "text",
		success: function(res){
			console.log(res);
		}
	});
}
