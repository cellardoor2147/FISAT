$("#title").hide().delay(0).fadeIn(1000);
$("#name").hide().delay(1000).fadeIn(1000);
$("#education").hide().delay(2000).fadeIn(1000);
$("#career").hide().delay(3000).fadeIn(1000);
$("#income").hide().delay(4000).fadeIn(1000);
$("#buttons").hide().delay(5000).fadeIn(1000);

//stats variables
var url = window.location.href;
var params = url.split("&");
var values = [];

params.forEach(function(element) {
	values.push(element.split("=")[1]);
});

var economicClass = values[0];
var currentLevel = values[1];
var madeItToEnd = values[2];
var name = values[3].replace(/%20/g, " ");
var gender = values[4];
var sexuality = values[5];
var disabilities = values[6];
var education = values[7];
var race = values[8];
var passing = values[9];
var faith = values[10];
var citizenship = values[11];
var parents = values[12];
var selfLove = values[13];
var careers;
var career;
var levelOfEducation;
var income = 0;
var incomeStr = "$0";

if (economicClass === "lower") {
	if (currentLevel < 3) {
		careers = ["Unemployed"];
		levelOfEducation = "Didn't graduate high school";
		income = "Less%20than%20$50,000";
		incomeStr = "$0";
	}
	else if (currentLevel < 4) {
		careers = ["Field hand", "Dishwasher", "Factory line worker"];
		levelOfEducation = "GED";
		income = "Less%20than%20$50,000";
		incomeStr = "$20,000";
	}
	else if (currentLevel < 5) {
		careers = ["Oil field worker", "Janitor", "Garbage person"];
		levelOfEducation = "High school diploma";
		income = "Less%20than%20$50,000";
		incomeStr = "$30,000";
	}
	else if (currentLevel < 6 || madeItToEnd === "false") {
		careers = ["Office worker", "Chef", "Technician"];
		levelOfEducation = "Some college";
		income = "Less%20than%20$50,000";
		incomeStr = "$40,000";
	}
	else if (currentLevel == 6 && madeItToEnd === "true") {
		careers = ["Nurse", "Programmer", "Teacher"];
		levelOfEducation = "College graduate";
		income = "Between%20$150,000%20and%20$50,000";
		incomeStr = "$50,000";
	}
}
else if (economicClass === "middle") {
	if (currentLevel < 3) {
		careers = ["Field hand", "Dishwasher", "Factory line worker"];
		levelOfEducation = "Didn't graduate high school";
		income = "Less%20than%20$50,000";
		incomeStr = "$40,000";
	}
	else if (currentLevel < 4) {
		careers = ["Oil field worker", "Janitor", "Garbage person"];
		levelOfEducation = "GED";
		income = "Between%20$150,000%20and%20$50,000";
		incomeStr = "$50,000";
	}
	else if (currentLevel < 5) {
		careers = ["Office worker", "Chef", "Technician"];
		levelOfEducation = "High school diploma";
		income = "Between%20$150,000%20and%20$50,000";
		incomeStr = "$60,000";
	}
	else if (currentLevel < 6 || madeItToEnd === "false") {
		careers = ["Nurse", "Programmer", "Teacher"];
		levelOfEducation = "Some college";
		income = "Between%20$150,000%20and%20$50,000";
		incomeStr = "$70,000";
	}
	else if (currentLevel == 6 && madeItToEnd === "true") {
		careers = ["Doctor", "Engingeer", "Politician"];
		levelOfEducation = "College graduate";
		income = "Over%20$150,000";
		incomeStr = "$150,000";
	}
}
else {
	if (currentLevel < 3) {
		careers = ["Bum off of parents", "Freelance writer", "Artist"];
		levelOfEducation = "Didn't graduate high school";
		income = "Between%20$150,000%20and%20$50,000";
		incomeStr = "$60,000";
	}
	else if (currentLevel < 4) {
		careers = ["Bum off of parents", "Freelance writer", "Artist"];
		levelOfEducation = "GED";
		income = "Between%20$150,000%20and%20$50,000";
		incomeStr = "$70,000";
	}
	else if (currentLevel < 5) {
		careers = ["You have a job that you don't deserve"];
		levelOfEducation = "High school diploma";
		income = "Over%20$150,000";
		incomeStr = "$150,000";
	}
	else if (currentLevel < 6 || madeItToEnd === "false") {
		careers = ["You have a job that you don't deserve"];
		levelOfEducation = "Some college";
		income = "Over%20$150,000";
		incomeStr = "$300,000";
	}
	else if (currentLevel == 6 && madeItToEnd === "true") {
		careers = ["You have a job that you don't deserve"];
		levelOfEducation = "College graduate";
		income = "Over%20$150,000";
		incomeStr = "$1,000,000";
	}
};

function getRandomInt(min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);

  	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

career = careers[getRandomInt(0, careers.length)];

$("#nameValue").text(name);
$("#educationValue").text(levelOfEducation);
$("#careerValue").text(career);
$("#incomeValue").text(incomeStr);

document.getElementById("children").addEventListener("click", function() {
	menuEnter.play();
	
	$("body").fadeOut(1000, function() {
		window.location.href = "game.html?" +
							"name=" + name + " Jr." +
							"&gender=" + gender +
							"&sexuality=" + sexuality +
							"&disabilities=" + disabilities +
							"&education=" + education +
							"&race=" + race +
							"&passing=" + passing +
							"&faith=" + faith +
							"&citizenship=" + citizenship +
							"&income=" + income +
							"&parents=" + parents +
							"&selfIncome=" + 0 +
							"&selfLove=" + selfLove +
							"&lying=" + "No";
  	});
});

document.getElementById("endIt").addEventListener("click", function() {
	menuEnter.play();
	
	$("body").fadeOut(1000, function() {
		window.location.href = "credits.html";
  	});
});