$("#title").hide().delay(0).fadeIn(3000);
$("#script").hide().delay(3000).fadeIn(3000);
$("#code").hide().delay(6000).fadeIn(3000);
$("#art").hide().delay(9000).fadeIn(3000);
$("#music").hide().delay(12000).fadeIn(3000);
$("#sounds").hide().delay(15000).fadeIn(3000);
$("#caf").hide().delay(18000).fadeIn(3000);
$("#letTheCycleContinue").hide().delay(21000).fadeIn(3000);

document.getElementById("letTheCycleContinue").addEventListener("click", function() {
	menuEnter.play();
	
	$("body").fadeOut(3000, function() {
		window.location.href = "presurvey.html";
  	});
});