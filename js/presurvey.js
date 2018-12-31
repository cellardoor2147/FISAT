var menuEnter = document.getElementById("menuEnter");
menuEnter.style.display = "none";
menuEnter.volume = 1;

document.getElementById("survey").onkeypress = function(e) {
  var key = e.charCode || e.keyCode || 0;     
  if (key == 13) {
    e.preventDefault();
  }
}

document.getElementById("nextMain").addEventListener("click", function() {
	menuEnter.play();

	$("#survey").fadeOut(1000, function() {
		document.getElementById("divMain").style.display = "none";
		document.getElementById("surveyTitle").style.display = "inline";
		document.getElementById("divName").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextName").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divName").style.display = "none";
		document.getElementById("divGender").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextGender").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divGender").style.display = "none";
		document.getElementById("divSexuality").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextSexuality").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divSexuality").style.display = "none";
		document.getElementById("divDisabilities").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextDisabilities").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divDisabilities").style.display = "none";
		document.getElementById("divEducation").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextEducation").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divEducation").style.display = "none";
		document.getElementById("divRace").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextRace").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divRace").style.display = "none";
		document.getElementById("divPassing").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextPassing").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divPassing").style.display = "none";
		document.getElementById("divFaith").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextFaith").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divFaith").style.display = "none";
		document.getElementById("divCitizenship").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextCitizenship").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divCitizenship").style.display = "none";
		document.getElementById("divIncome").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextIncome").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divIncome").style.display = "none";
		document.getElementById("divParents").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextParents").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divParents").style.display = "none";
		document.getElementById("divSelfIncome").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextSelfIncome").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divSelfIncome").style.display = "none";
		document.getElementById("divSelf").style.display = "inline";

		$("#survey").fadeIn(1000, function() {
		});
  	});
});

document.getElementById("nextSelf").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		document.getElementById("divSelf").style.display = "none";
		document.getElementById("divLying").style.display = "inline";

		$("#survey").fadeIn(1000, function() {

		});
  	});
});

document.getElementById("beginLife").addEventListener("click", function() {
	menuEnter.play();
	
	$("#survey").fadeOut(1000, function() {
		loadGame();
  	});
});

function loadGame() {
	var name = document.getElementById("name").value;
	var gender = document.getElementById("gender").value;
	var sexuality = document.getElementById("sexuality").value;
	var disabilities = document.getElementById("disabilities").value;
	var education = document.getElementById("education").value;
	var race = document.getElementById("race").value;
	var passing = document.getElementById("passing").value;
	var faith = document.getElementById("faith").value;
	var citizenship = document.getElementById("citizenship").value;
	var income = document.getElementById("income").value;
	var parents = document.getElementById("parents").value;
	var selfIncome = document.getElementById("selfIncome").value;
	var selfLove = document.getElementById("selfLove").value;
	var lying = document.getElementById("lying").value;

	window.location.href = "index.html?" +
							"name=" + name +
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
							"&selfIncome=" + selfIncome +
							"&selfLove=" + selfLove +
							"&lying=" + lying;
}