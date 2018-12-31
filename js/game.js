//
//
//
//	VARIABLES
//
//
//

//misc variables
var screen = document.getElementById("screen");
var screenContext = screen.getContext("2d");
var fps = 30;
var playerAnimCounter = 0;
var messageAnimCounter = 0;
var numSquares = 30;
const blockWidth = window.innerWidth / numSquares * 0.75;
const blockHeight = window.innerHeight / numSquares * 1;
var currentLevel = 3;
var gameStarted = false;
var gameMode = "messageIntercom";
var mouseX, mouseY;
var itemIndex = 0;
var optionIndex = 0;
var shopTalkIndex = 0;
var shopBuyIndex = 0;
var shopSellIndex = 0;
var messageIndex = 0;
var itemMenuIndex = 0;
var adviceMenuIndex = 0;
var peppermintCount = 0;
var toothpickCount = 0;
var debugMode = false;

//sound variables
var menuEnter = document.getElementById("menuEnter");
menuEnter.style.display = "none";
menuEnter.volume = 1;
var walk = document.getElementById("walk");
walk.style.display = "none";
walk.volume = 0.5;
var arenaMusic = document.getElementById("arenaMusic");
arenaMusic.style.display = "none";
arenaMusic.volume = 0.2;
var shopMusic = document.getElementById("shopMusic");
shopMusic.style.display = "none";
shopMusic.volume = 0.2;
var buySuccess = document.getElementById("buySuccess");
buySuccess.style.display = "none";
buySuccess.volume = 1;
var buyFailure = document.getElementById("buyFailure");
buyFailure.style.display = "none";
buyFailure.volume = 1;
var heal = document.getElementById("heal");
heal.style.display = "none";
heal.volume = 1;
var hit = document.getElementById("hit");
hit.style.display = "none";
hit.volume = 1;
var doorShut = document.getElementById("doorShut");
doorShut.style.display = "none";
doorShut.volume = 1;
var pressButton = document.getElementById("pressButton");
pressButton.style.display = "none";
pressButton.volume = 1;

//floors variables
var floors = calculateBlocks(0, 0, 37, 25);
var arenaFloorTexture = new Image();
arenaFloorTexture.src = "../assets/sprites/environment/floorArena.png";
var shopFloorTexture = new Image();
shopFloorTexture.src = "../assets/sprites/environment/floorShop.png";
var arenaWallTexture = new Image();
arenaWallTexture.src = "../assets/sprites/environment/wallArena.png";

//stats variables
var url = window.location.href;
var params = url.split("&");
var values = [];
var stats = new Object();
var currentLevel = 0;

params.forEach(function(element) {
	values.push(element.split("=")[1]);
});

//reset presurvey if player lied
if (values[13] === "Yes") {
	window.location.href = "presurvey.html";
}

//generate name
stats.name = values[0].replace(/%20/g, " ");

//generate gender
if (values[1] === "Male") {
	stats.gender = "male";
}
else if (values[1] === "Female") {
	stats.gender = "female";
}
else {
	stats.gender = "non-binary";
}

//generate sexuality
if (values[2] === "Straight") {
	stats.sexuality = "straight";
}
else {
	stats.sexuality = "non-straight";
}

//generate disabilities
if (values[3] === "No") {
	stats.disabilities = false;
}
else {
	stats.disabilities = true;
}

//generate education
if (values[4] === "No") {
	stats.education = "non-college";
}
else {
	stats.education = "college";
}

//generate race/ethnicity
if (values[5] === "White") {
	stats.race = "white";
}
else {
	stats.race = "minority";
}

//generate passing status
if (values[6] === "no") {
	stats.passing = true;
}
else {
	stats.passing = false;
}

//generate faith
if (values[7] === "Yes") {
	stats.faith = "christian";
}
else {
	stats.faith = "non-christian";
}

//generate citizenship
if (values[8] === "Yes") {
	stats.citizenship = "first-world";
}
else {
	stats.citizenship = "third-world";
}

//generate income
if (values[9] === "Over%20$150,000") {
	stats.income = 200000;
}
else if (values[9] === "Between%20$150,000%20and%20$50,000") {
	stats.income = 100000;
}
else {
	stats.income = 50000;
}

//generate parental love
if (values[10] === "Yes") {
	stats.parentalLove = true;
}
else {
	stats.parentalLove = false;
}

//generate self love
if (values[12] === "Yes") {
	stats.selfLove = true;
}
else {
	stats.selfLove = false;
}

//generate efc and economic class
stats.efc = stats.income;

if (stats.gender != "male") {
	stats.efc -= 10000;
}
if (stats.sexuality === "non-straight") {
	stats.efc -= 10000;
}
if (stats.disabilities) {
	stats.efc -= 10000;
}
if (stats.education != "non-college") {
	stats.efc -= 10000;
}
if (stats.race === "minority") {
	stats.efc -= 10000;
}
if (stats.race === "minority" && stats.passing) {
	stats.efc += 10000;
}
if (stats.faith === "non-christian") {
	stats.efc -= 10000;
}
if (stats.citizenship === "third-world") {
	stats.efc -= 10000;
}
if (!stats.parentalLove) {
	stats.efc -= 10000;
}
if (!stats.selfLove) {
	stats.efc -= 10000;
}

if (stats.efc >= 100000) {
	stats.economicClass = "upper";
}
else if (stats.efc > 50000) {
	stats.economicClass = "middle";
}
else {
	stats.economicClass = "lower";
}

//items
var canadaGooseJacket = {
	name: "Canada Goose Jacket", 
	description: "Its high price tag and plain look allow you to be elitist and appropriate low-income culture at the same time. Increases defense by 0.5.",
	value: 500,
	type: "armor",
	defense: 0.5};
var columbiaJacket = {
	name: "Columbia Jacket",
	description: "Its upsettingly ordinary, just like you. Increases defense by 0.25.",
	value: 250,
	type: "armor",
	defense: 0.25};
var smellyHoodie = {
	name: "Smelly Hoodie",
	description: "It smells like cigarette smoke and sweat, just like the Goodwill you bought it at. Increases defense by 0.",
	value: 0,
	type: "armor",
	defense: 0};
var supremeShirt = {
	name: "Supreme Shirt", 
	description: "It makes you look like a supreme douchebag. Increases defense by 2.",
	value: 1500,
	type: "armor",
	defense: 2};
var thrasherShirt = {
	name: "Thrasher Shirt",
	description: "You probably don't even read the magazine. Increases defense by 1.",
	value: 750,
	type: "armor",
	defense: 1};
var matchaLatte = {
	name: "Matcha Latte",
	description: "The fact that it tastes like grass is overshadowed by your misplaced sense of self-importance. Restores 3 points of inspiration.",
	value: 300,
	type: "healing",
	healing: 3};
var lewdJuice = {
	name: "Lewd Juice",
	description: "It contains a lethal amount of mango concentrate. Restores 1 point of inspiration.",
	value: 150,
	type: "healing",
	healing: 1};
var peppermint = {
	name: "Peppermint",
	description: "Minty fresh (TM). Restores 0 points of inspiration.",
	value: 0,
	type: "healing",
	healing: 0};
var toothpick = {
	name: "Toothpick",
	description: "Wood flavored. Has no apparent effect.",
	value: 0,
	type: "misc"};

//generate inventory, inspiration, and money
if (stats.economicClass == "upper") {
	stats.inventory = [matchaLatte, toothpick];
	stats.armor = canadaGooseJacket;
	stats.inspiration = 10;
	stats.money = 500
}
else if (stats.economicClass == "middle") {
	stats.inventory = [lewdJuice, toothpick];
	stats.armor = columbiaJacket;
	stats.inspiration = 10;
	stats.money = 50;
}
else {
	stats.inventory = [peppermint, toothpick];
	stats.armor = smellyHoodie;
	stats.inspiration = 10;
	stats.money = 0;
}

//generate movement variables
stats.x = 678;
stats.y = 600;
stats.width = blockWidth * 3 * 0.37;
stats.height = blockWidth * 3;
stats.speed = 0;
stats.direction = "right";
stats.lastHori = "right";
stats.location = "arena";
var playerTexture = new Image();
playerTexture.src = "../assets/sprites/players/" + stats.economicClass + "Idle.png";

var levels = [
//level 0
{dialogue: ["Wake up.",
				"WAKE UP.",
				"WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP WAKEUP.",
				"Oh, you're awake. I didn't wake you, did I?",
				"You're probably wondering where you are and why a sultry, god-like voice is communicating with you over an intercom...",
				"You've been selected for organ harvest.",
				"...",
				"Only kidding.",
				"Welcome to the Future Income Standarized Aptitude Test - or FISAT for short - courtesy of our nonthreatening, trustworthy government.",
				"DISCLAIMER: THE F.I.S.A.T. DOES NOT DISCRIMINATE ON THE BASIS OF RACE, COLOR, RELIGION, SEX, AGE, NATIONAL ORIGIN, VETERAN STATUS, SEXUAL ORIENTATION, GENDER IDENTITY, DISABILITY, OR ANY OTHER BASIS OF DISCRIMINATION PROHIBITED BY LAW.",
				"I'll be your guide.",
				"My name isn't important.",
				"Your name isn't important, either.",
				"To that end, call me whatever you want.",
				"I won't call you anything.",
				"Half because your name escapes me.",
				"Half because I can't be asked.",
				"Each coming task assesses your competency in vital life skills.",
				"Succeed and you'll be rewarded.",
				"Fail and we'll all come together and throw tomatoes at you.",
				"Succeeders get rewarded.",
				"Failures get tomatoed.",
				"If you're ever feeling stumped, feel free to reach out for help.",
				"Each hint is an affordable $99.99.",
				"Plus tax.",
				"Between each level is a shop.",
				"You're encouraged to open letters from home, mingle with other competitors, and spend your parents' hard earned money at the shop.",
				"Use the [w], [a], [s], and [d] keys to walk and navigate menus.",
				"Alternatively, if you're the kind of person who breathes exclusively out of their mouth, use the arrow keys.",
				"[Control] is for toggling pause.",
				"[Space] is for talking to people, inspecting items, and microwaving burritos.",
				"And with that, I'd like to welcome you again to FISAT.",
				"Good luck.",
				"Your future depends on it."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "Shop Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/shopkeeper.png",
			talks: ["I miss my wife.",
					"The Lewd Juice is free for $10.",
					"Buy something, will ya?",
					"Sometimes I feel like we're just biding our time until the grave.",
					"I'm not wearing any pants.",
					"Don't you have anything better to do?",
					"You remind me of my childhood friend, Jimmy. He died young.",
					"This music is really grating on my gosh darn ears.",
					"My son never calls me.",
					"I sometimes question whether or not I'm a good person."],
			items: [supremeShirt, thrasherShirt, matchaLatte, lewdJuice, peppermint, toothpick],
			location: "shop"},
		{name: "Rusty",
			x: 1300,
			y: 600,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/lowerIdle.png",
			talk: "I wish that my parents loved eachother.",
			location: "shop"},
		{name: "Adrian",
			x: 1300,
			y: 450,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/middleIdle.png",
			talk: "Ya know, people always laugh at the idea of working behind a desk. Me? I embrace it. I'll take papercuts over calluses any day.",
			location: "shop"},
		{name: "Julius",
			x: 1300,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/upperIdle.png",
			talk: "Why isn't FISAT funding free massages for competitors? It's a matter of mental health.",
			location: "shop"},
		{name: "Arcade Cabinet",
			x: 1250,
			y: 50,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "It smells faintly of pizza and off-brand soda.",
			location: "shop"},
		{name: "Mail Box",
			x: 200,
			y: 600,
			width: blockWidth * 2 * 0.62,
			height: blockWidth * 2,
			texture: "../assets/sprites/environment/mailbox.png",
			talk: "It's empty.",
			location: "shop"}],

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false},

//level 1
{dialogue: ["Hello, again.",
			"I'm so excited to be here, as evidenced by my monotone inflection.",
			"Welcome to the first task.",
			"Here, you'll be tested over your ability to construct arbitrary meaninging from literary texts.",
			"This skill will serve you well in a variety of real-life situations.",
			"Such as if someone were to put a gun to your head and demand that you interpret poetry.",
			"It would be useful then.",
			"To answer a question, stand atop its corresponding button plate and press [space].",
			"Answer incorrectly, and you'll lose inspiration.",
			"Don't worry, there are no wrong answers.",
			"Except for nearly all of them.",
			"Reminder that at the advice table you can call upon the power of your parents' debit card to assist you for a low, non-refundable payment of $99.99.",
			"Plus tax.",
			"If you don't have enough money to pay for advice, don't worry.",
			"Just guess."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "Shop Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/shopkeeper.png",
			talks: ["Have you ever considered how arbitrary the decimal system is? If we would have evolved from dolphins, we would use binary instead.",
					"I hope Robert enjoys sleeping in my bed and banging my wife.",
					"I honestly cannot tell who you are. I left my prescription glasses at home.",
					"If you want to make it all the way through and live a successful life, you should try Lewd Juice (TM).",
					"I can say with 35% certainty that Matcha Tea is edible.",
					"Millennials are a government conspiracy.",
					"Back when I was your age, we didn't have video games. We had small pox.",
					"Here's a secret: my mustache is fake.",
					"Do you want to hear about my stamp collection? Never mind. No one ever wants to hear about my stamp collection.",
					"My arthritis senses are tingling. A storm is coming."],
			items: [supremeShirt, thrasherShirt, matchaLatte, lewdJuice, peppermint, toothpick],
			location: "shop"},
		{name: "Advice Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/advicekeeper.png",
			advicesIndex: -1,
			advices: ["I'm feeling blue.", "I think that I may throw up.", "This poem sure is depressing."],
			location: "arena"},
		{name: "Rusty",
			x: 1300,
			y: 600,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/lowerIdle.png",
			talk: "I honestly just guessed on that last one. My luck is gonna run out eventually.",
			location: "shop"},
		{name: "Adrian",
			x: 1300,
			y: 450,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/middleIdle.png",
			talk: "Sometimes words spiral off the page and out of my line of sight. Why do they go where I can't follow?",
			location: "shop"},
		{name: "Julius",
			x: 1300,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/upperIdle.png",
			talk: "A fellow competitor told me earlier that their parents couldn't afford to send them an allowance. Why don't they just buy more money?",
			location: "shop"},
		{name: "Arcade Cabinet",
			x: 1250,
			y: 50,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "It smells faintly of pizza and off-brand soda.",
			location: "shop"},
		{name: "Mail Box",
			x: 200,
			y: 600,
			width: blockWidth * 2 * 0.62,
			height: blockWidth * 2,
			texture: "../assets/sprites/environment/mailbox.png",
			talk: "It's empty.",
			location: "shop"},
		{name: "A Flowery Poem",
			x: 675,
			y: 400,
			width: blockWidth,
			height: blockWidth,
			texture: "../assets/sprites/items/paper.png",
			talk: "Running out of my eyes and seeping into <br />the sockets that are the hollow places in my clavicle. Running down my <br /> throat and mixing with snot and blood and memories. Choking me. <br/> Blueberries.",
			location: "arena"}],

questions: ["What color are the berries?", "What don't blueberries mix with in the throat?", "What do blueberries symbolize?"],

questionsIndex: 0,

buttons: [{name: "Button",
				label: ["Red", "Blood", "Classism"],
				isTrue: [false, false, false],
				x: 1000,
				y: 100,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["Blue", "Snot", "Blueberries"],
				isTrue: [true, false, false],
				x: 1000,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["Orange", "Bile", "Depression"],
				isTrue: [false, true, true],
				x: 1000,
				y: 600,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"}],

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false},

//level 2
{dialogue: ["You haven't been disqualified yet.",
			"What a blessing.",
			"Don't get too ahead of yourself, though.",
			"You're about to partake in America's second least-favorite pastime.",
			"High School Mathematics.",
			"If you get a few questions wrong, don't worry.",
			"You'll just fail.",
			"And we both know you'd rather be at home watching low-brow sitcoms."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "Shop Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/shopkeeper.png",
			talks: ["You better be well and proud, friendo. You done did wasted my entire lunch break.",
					"I would tell you to get off my lawn if I had one.",
					"Do you have any water? I have been drinking nothing but Lewd Juice (TM) for a while now, and I can barely breathe.",
					"Who needs underwear? What I wear under my britches is my business.",
					"Between you and me, the FISAT is a waste of time. I never took the thing, and look at me now.",
					"Your generation is pretty lucky to have these fancy new foods like pizza. Back in my day, we ate mud.",
					"Maybe I should move to a new town. Maybe I should bathe regularly. Maybe I should date women who have taste. Nah.",
					"Where did I go wrong, Melissa?",
					"If the IRS ever asks, I was never here.",
					"What do my childhood innocence and lower left earlobe have in common? I lost both in Vietnam."],
			items: [supremeShirt, thrasherShirt, matchaLatte, lewdJuice, peppermint, toothpick],
			location: "shop"},
		{name: "Advice Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/advicekeeper.png",
			advicesIndex: -1,
			advices: ["Something tells me that the number 220 is important to you.", "Protip: modulo is basically just a pretentious computer science word for remainder after division.", "5! = 5 * 4 * 3 * 2 * 1."],
			location: "arena"},
		{name: "Rusty",
			x: 1300,
			y: 600,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/lowerIdle.png",
			talk: "My family always praises me as some kinda STEM guru because I know how to do basic arithmetic. I used to believe them.",
			location: "shop"},
		{name: "Adrian",
			x: 1300,
			y: 450,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/middleIdle.png",
			talk: "Why is it even called calculus? What are you calculating? Your plummeting GPA?",
			location: "shop"},
		{name: "Julius",
			x: 1300,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/upperIdle.png",
			talk: "Income inequality is a really big problem. So big, in fact, that I plan to use my higher status to virtue signal about it to my similarly well-off peers as opposed to doing anything to facilitate positive change. No need to thank me.",
			location: "shop"},
		{name: "Arcade Cabinet",
			x: 1250,
			y: 50,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "It smells faintly of pizza and off-brand soda.",
			location: "shop"},
		{name: "Mail Box",
			x: 200,
			y: 600,
			width: blockWidth * 2 * 0.62,
			height: blockWidth * 2,
			texture: "../assets/sprites/environment/mailbox.png",
			talk: "It's empty.",
			location: "shop"},
		{name: "A Formula Sheet",
			x: 675,
			y: 400,
			width: blockWidth,
			height: blockWidth,
			texture: "../assets/sprites/items/paper.png",
			talk: "a = 10 <br /> b = 13! <br /> c = 14!",
			location: "arena"}],

questions: ["a * 22 = ?", "a modulo 2 = ?", "c / d = ?"],

questionsIndex: 0,

buttons: [{name: "Button",
				label: ["220", "1", "14"],
				isTrue: [true, false, true],
				x: 1000,
				y: 100,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["22", "5", "10"],
				isTrue: [false, false, false],
				x: 1000,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["2", "0", "1"],
				isTrue: [false, true, true],
				x: 1000,
				y: 600,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"}],

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false},

//level 3
{dialogue: ["Congratulations. You've made it far.",
			"You should be proud.",
			"No really.",
			"You've done what was expected of you.",
			"What a prodigy.",
			"But your future success hindges on more than just blueberry poems and math.",
			"Prepare to assess one of the most important facets of daily work life.",
			"Second only to nepotism.",
			"Social interaction.",
			"I should probably mention that messing up from here on out deducts thrice the inspiration.",
			"It may seem daunting, but I wouldn't worry about it.",
			"You seem like a social kinda person.",
			"Especially seeing as you never talk and make unblinking eye contact with everyone you encounter."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "Shop Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/shopkeeper.png",
			talks: ["You can put a cat in a dry cleaner, but that don't put the biscuits in the oven.",
					"This whole FISAT business is for the birds anyway. In a few years, we're all gonna be unified and subserviant to our alien overlords. I saw it on History TV.",
					"You ever question where your finger nails go after you cut them off? Probably not.",
					"Read Southern Monthly. Arm yourself with knowledge.",
					"Melissa used to make the best pickled beets in the county. Now that she's gone, I subsist entirely on butter sandwiches.",
					"Butter sandwiches make your bones strong, increasing your chances of surviving the winter.",
					"Back in my day, we didn't have baseball. We had stickball. We hit eachother with sticks. Last one standing won.",
					"I don't even know why you come here.",
					"When I was a kid, I befriended a giant talking tree, but that's silly. Trees can't be friends.",
					"Would you believe me if I said that the peppermints are made out of drywall?"],
			items: [supremeShirt, thrasherShirt, matchaLatte, lewdJuice, peppermint, toothpick],
			location: "shop"},
		{name: "Advice Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/advicekeeper.png",
			advicesIndex: -1,
			advices: ["I could really go for some caramel right now.", "Performative activism is all the rage with kids these days.", "I'm dating this girl, Miranda. She's much better than Melissa."],
			location: "arena"},
		{name: "Rusty",
			x: 1300,
			y: 600,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/lowerIdle.png",
			talk: "My neighborhood may have the economic and cultural value of a dumpster, but at least rich people tokenize it for its alleged 'aesthetic'.",
			location: "shop"},
		{name: "Adrian",
			x: 1300,
			y: 450,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/middleIdle.png",
			talk: "I've never seen Hamilton, but I own the soundtrack.",
			location: "shop"},
		{name: "Julius",
			x: 1300,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/upperIdle.png",
			talk: "Isabella is such an inspiration to social justice advocates like me. I've been arrested seven times myself. It's the best way to gain followers on Insta.",
			location: "shop"},
		{name: "Arcade Cabinet",
			x: 1250,
			y: 50,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "It smells faintly of pizza and off-brand soda.",
			location: "shop"},
		{name: "Mail Box",
			x: 200,
			y: 600,
			width: blockWidth * 2 * 0.62,
			height: blockWidth * 2,
			texture: "../assets/sprites/environment/mailbox.png",
			talk: "It's empty.",
			location: "shop"},
		{name: "Isabella",
			x: 675,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3 ,
			texture: "../assets/sprites/npcs/isabella.png",
			talk: "I spend most of my time in mom and pop coffee shops in poor areas. Poverty is my aesthetic. That's where I get my best writing ideas: the womb of low-income suffering.",
			location: "arena"}],

questions: ["What do you think Isabella likes to drink?", "What do you think Isabella does in her spare time?", "Who wrote Isabella's favorite play, Hamilton?"],

questionsIndex: 0,

buttons: [{name: "Button",
				label: ["Off-brand soda", "Puzzles", "Lin-Manuel Miranda"],
				isTrue: [false, false, true],
				x: 975,
				y: 100,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["Juicy juice", "Get arrested performatively", "Annie Baker"],
				isTrue: [false, true, false],
				x: 975,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["Caramel Frappes", "Donate to charity", "David Adjmi"],
				isTrue: [true, false, false],
				x: 975,
				y: 600,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"}],

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false},

//level 4
{dialogue: ["Are you ready for some football?",
			"Me neither.",
			"You're about to partake in the most ironically homoerotic sport populated mostly by homophobes.",
			"So bend over and prepare to have your ass slaped by the straightest guys around.",
			"I have faith in you.",
			"After all, success in this sport only requires excessive amounts of daily exercise and steroids.",
			"You have pretty thick calves.",
			"You'll do fine."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "Shop Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/shopkeeper.png",
			talks: ["owo *notices ur wallet* wat's dis OwO",
					"I used to be somewhat of an athlete myself. I would have gone pro if it weren't for my bum knee.",
					"If you're here about the expiration dates on my Matcha Lattes being blacked out, you just keep walking, friendo.",
					"My son's always trying to get me to make an account with facenovel.com or some bologna like that. Why can't he just eat paint chips like a normal kid?",
					"Never shake a buzzard's beak at a mule's funeral.",
					"I hit something with my car last night. Not quite sure what it was, but it sure do taste good with tatters.",
					"I feel like I've finally gotten over Melissa. I don't even miss the late nights spent in her arms, gazing into her beautiful green eyes.",
					"Even though my generation had marginally more opportunities than yours does, I still affirm that minimum wage should remain $0.12/hour.",
					"I didn't even finish FISAT, but I sure do feel as though I've gained wisodom with age. That's the only education I need, buddy.",
					"When you've gotten to where I am in life, you'll know you've made it. I live in refurbished RV down by the creek. What more could a fella want?"],
			items: [supremeShirt, thrasherShirt, matchaLatte, lewdJuice, peppermint, toothpick],
			location: "shop"},
		{name: "Rusty",
			x: 1300,
			y: 600,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/lowerIdle.png",
			talk: "I don't know how much more of this I can take.",
			location: "shop"},
		{name: "Adrian",
			x: 1300,
			y: 450,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/middleIdle.png",
			talk: "Pretty sure that my collar bone is broken.",
			location: "shop"},
		{name: "Julius",
			x: 1300,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/upperIdle.png",
			talk: "I'm willing to check my privilege: my parents make six figures, I live in a first-world country, and - as a result of nepotism - I can more-or-less fail at everything in life and still end up a success. Good. Privilege checked. It's good to know that my actions here change the world for the better.",
			location: "shop"},
		{name: "Arcade Cabinet",
			x: 1250,
			y: 50,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "It smells faintly of pizza and off-brand soda.",
			location: "shop"},
		{name: "Mail Box",
			x: 200,
			y: 600,
			width: blockWidth * 2 * 0.62,
			height: blockWidth * 2,
			texture: "../assets/sprites/environment/mailbox.png",
			talk: "It's empty.",
			location: "shop"}],

enemies: [[{name: "Football Player",
			x: 50,
			y: 400,
			speed: 11,
			direction: "right",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 1300,
			y: 250,
			speed: 11,
			direction: "left",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"}],
		[{name: "Football Player",
			x: 100,
			y: 350,
			speed: 11,
			direction: "down",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 100,
			y: 350,
			speed: 11,
			direction: "left",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"}],
		[{name: "Football Player",
			x: 200,
			y: 350,
			speed: 11,
			direction: "down",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 600,
			y: 350,
			speed: 11,
			direction: "up",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 1000,
			y: 350,
			speed: 11,
			direction: "down",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 600,
			y: 350,
			speed: 11,
			direction: "left",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 100,
			y: 100,
			speed: 11,
			direction: "right",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 1300,
			y: 600,
			speed: 11,
			direction: "left",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"}]],

buttons: [{name: "Button",
				x: 660,
				y: 100,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				x: 100,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				x: 1250,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"}],

waveIndex: 0,

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false},

//level 5
{dialogue: ["You made it to the semi-finals.",
			"It's all downhill from here, though.",
			"This is the part where you lie your way through an application.",
			"All your hard work is about to pay off, so long as your parents paid for your doctor to falsely diagnose you with ADHD.",
			"Otherwise, you're fucked.",
			"Participants who come from money are far more likely to have done well on past tasks.",
			"They deserve success more.",
			"And even if they don't, it doesn't matter.",
			"The FISAT has never been about fairness.",
			"You may notice that the advice keeper is sitting in a different position than usual.",
			"He also serves as FISAT's admission officer.",
			"Go to him for advice.",
			"Go to him for questions.",
			"Basically pay him to feed you your own guts.",
			"But don't tell him that I said that."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "Shop Keeper",
			x: 75,
			y: 100,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/shopkeeper.png",
			talks: ["Even though this is probably the last time I'm gonna see you in this context, I'm not gonna give you a discount. I've got seven bloodhounds to feed.",
					"I sure do miss Melissa... or was it Jane? Barbara? Ever since I got diagnosed with alzheimer's, I'm not sure of anything anymore. Maybe I just made the whole thing up...",
					"You know my son finished the FISAT and look where it got him. He's got a good job and loving marriage, but he never visits me anymore.",
					"I'm thinking of selling this shop off and moving to Florida, but there wouldn't be no point in it. There's nothing there waiting for me.",
					"I wish you'd stop taking up space in my shop with your chit-chat... Eh, who am I kidding? You're the only person who's ever paid me this much mind.",
					"You wanna know what I did in Vietnam? I butched innocent folks. There weren't no reason for it. I just did it. I don't know why I acted that way.",
					"You're a good kid. You've made it this far. I wish that I could say that I'm proud, but I just feel sorry for you."],
			items: [supremeShirt, thrasherShirt, matchaLatte, lewdJuice, peppermint, toothpick],
			location: "shop"},
		{name: "Advice Keeper",
			x: 575,
			y: 300,
			width: blockWidth * 6,
			height: blockWidth * 6 * 0.63,
			texture: "../assets/sprites/npcs/advicekeeper.png",
			advicesIndex: -1,
			advices: ["You ever wonder how they keep it so bright in here? Probably candles.", "I can see why Melissa left me. I'm pathetic.", "I'm thinking of -50."],
			location: "arena"},
		{name: "Adrian",
			x: 1300,
			y: 450,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/middleIdle.png",
			talk: "I'm scared. One more mistake and I'm gone.",
			location: "shop"},
		{name: "Julius",
			x: 1300,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			texture: "../assets/sprites/players/upperIdle.png",
			talk: "I'm in the lead, naturally, because I work the hardest. Anyone who's gotten disqualified at this point was slacking off. I'm glad that good things happen to good people.",
			location: "shop"},
		{name: "Arcade Cabinet",
			x: 1250,
			y: 50,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "It smells faintly of pizza and off-brand soda.",
			location: "shop"},
		{name: "Mail Box",
			x: 200,
			y: 600,
			width: blockWidth * 2 * 0.62,
			height: blockWidth * 2,
			texture: "../assets/sprites/environment/mailbox.png",
			talk: "It's empty.",
			location: "shop"}],

questions: ["Jack be nimble. Jack be quick. Jack jumped over the?", "What's my ex-wife's name?", "What number am I thinking of?"],

questionsIndex: 0,

buttons: [{name: "Button",
				label: ["Candle stick", "Jane", "99"],
				isTrue: [true, false, false],
				x: 1000,
				y: 100,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["Hole", "Barbara", "-50"],
				isTrue: [false, false, true],
				x: 1000,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["...", "Melissa", "1"],
				isTrue: [false, true, false],
				x: 1000,
				y: 600,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"}],

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false},

//level 6
{dialogue: ["This is it.",
			"The end.",
			"Hits here are worth 5 inspiration.",
			"I'm sure you made it here because you're just that capable.",
			"And not as a result of your winning the birth lottery.",
			"FISAT was made by and for a specific demographic.",
			"And unless if you've been chugging Matcha Lattes this entire time, you probably aren't part of said demographic.",
			"I mean, depending on your upbrining, the FISAT doesn't affect your future anyway.",
			"Some people never even participate.",
			"Some people spend their entire lives writing into moleskins at mom and pop coffee shops, thriving regardless because of their parents' successes.",
			"Again, FISAT has never been about fairness.",
			"It's been about filtering out undesirables.",
			"Are you an undesirable?",
			"Let's find out."],

dialogueIndex: 0,

arenaWalls: calculateBlocks(0, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25))))),

shopWalls: calculateBlocks(0, 0, 15, 0).concat(
	calculateBlocks(21, 0, 37, 0).concat(
	calculateBlocks(0, 0, 0, 25).concat(
	calculateBlocks(0, 25, 15, 25).concat(
	calculateBlocks(21, 25, 37, 25).concat(
	calculateBlocks(37, 0, 37, 25)))))),

npcs: [{name: "A Formula Sheet",
			x: 675,
			y: 400,
			width: blockWidth,
			height: blockWidth,
			texture: "../assets/sprites/items/paper.png",
			talk: "a = 10 <br /> b = 13! <br /> c = 14!",
			location: "arena"},
		{name: "Arcade Cabinet",
			x: 650,
			y: 300,
			width: blockWidth * 4.5 * 0.64,
			height: blockWidth * 4.5,
			texture: "../assets/sprites/environment/arcade.png",
			talk: "...",
			location: "arena"},
		{name: "A Flowery Poem",
			x: 675,
			y: 400,
			width: blockWidth,
			height: blockWidth,
			texture: "../assets/sprites/items/paper.png",
			talk: "Running out of my eyes and seeping into <br />the sockets that are the hollow places in my clavicle. Running down my <br /> throat and mixing with snot and blood and memories. Choking me. <br/> Blueberries.",
			location: "arena"},
		{name: "?",
				x: 660,
				y: 350,
				width: blockWidth * 2,
				height: blockWidth * 2,
				location: "arena",
				talk: "?",
				texture: "../assets/sprites/environment/upButton.png"},
		{name: "Isabella",
			x: 675,
			y: 300,
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3 ,
			texture: "../assets/sprites/npcs/isabella.png",
			talk: "I spend most of my time in mom and pop coffee shops in poor areas. Poverty is my aesthetic. That's where I get my best writing ideas: the womb of low-income suffering.",
			location: "arena"},
		{name: "Poor Bastard",
				x: 675,
				y: 300,
				width: blockWidth * 3 * 0.37,
				height: blockWidth * 3,
				texture: "../assets/sprites/players/lowerIdle.png",
				talk: "I wish that my parents loved eachother.",
				location: "arena"},
		{name: "Honorable Mention",
				x: 675,
				y: 300,
				width: blockWidth * 3 * 0.37,
				height: blockWidth * 3,
				texture: "../assets/sprites/players/middleIdle.png",
				talk: "Ya know, people always laugh at the idea of working behind a desk. Me? I embrace it. I'll take papercuts over calluses any day.",
				location: "arena"},
		{name: "Gifted",
				x: 675,
				y: 300,
				width: blockWidth * 3 * 0.37,
				height: blockWidth * 3,
				texture: "../assets/sprites/players/upperIdle.png",
				talk: "Why isn't FISAT funding free massages for competitors? It's a matter of mental health.",
				location: "arena"}],

enemies: [{name: "Football Player",
			x: 150,
			y: 100,
			speed: 11,
			direction: "right",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 1300,
			y: 350,
			speed: 11,
			direction: "left",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"},
		{name: "Football Player",
			x: 150,
			y: 600,
			speed: 11,
			direction: "right",
			width: blockWidth * 3 * 0.37,
			height: blockWidth * 3,
			idleTexture: "../assets/sprites/enemies/footballIdle.png",
			leftTexture: "../assets/sprites/enemies/footballLeft.png",
			rightTexture: "../assets/sprites/enemies/footballRight.png",
			enemyAnimCounter: 0,
			talk: "HUT! HUT! HUT!",
			location: "arena"}],

questions: ["a * (b / c) = ?",
			"What do I smell like?",
			"What do the eyes represent?",
			"?",
			"What does Isabella do after she checks her privilege?",
			"What should be done to the poor bastard?",
			"Who cares?",
			"Who am I?"],

questionsIndex: 0,

buttons: [{name: "Button",
				label: ["5 / 7", "beans", "pizza and off-brand soda", "?", "something", "nothing", "not me", "Gifted"],
				isTrue: [true, false, true, true, false, true, true, true],
				x: 1000,
				y: 100,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["10 / 13", "chips", "gay marriage", "?", "nothing", "nothing", "not me", "Gifted"],
				isTrue: [false, false, false, true, true, true, true, true],
				x: 1000,
				y: 350,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"},
			{name: "Button",
				label: ["10 / 7", "pizza and off-brand soda", "colonialism", "?", "something", "nothing", "not me", "Gifted"],
				isTrue: [false, true, false, true, false, true, true, true],
				x: 1000,
				y: 600,
				width: blockWidth * 2 * 0.62,
				height: blockWidth * 2,
				location: "arena",
				upTexture: "../assets/sprites/environment/upButton.png",
				downTexture: "../assets/sprites/environment/downButton.png"}],

openedMailbox: false,

closedArena: false,

closedShop: true,

closedPrevious: false}
];

//remove competitor that the player is playing as
for (let level of levels) {
	levelNPCs = new Array();

	if (stats.economicClass === "lower") {
		for (let npc of level.npcs) {
			if (npc.name != "Rusty") {
				levelNPCs.push(npc);
			}
		}
	}
	else if (stats.economicClass === "middle") {
		for (let npc of level.npcs) {
			if (npc.name != "Adrian") {
				levelNPCs.push(npc);
			}
		}
	}
	else if (stats.economicClass === "upper") {
		for (let npc of level.npcs) {
			if (npc.name != "Julius") {
				levelNPCs.push(npc);
			}
		}
	}

	level.npcs = levelNPCs;
}

//
//
//
//	MISC. FUNCTIONS
//
//
//
$(document).ready(function(){
    $("body").hide(0).delay().fadeIn(10000, function() {
    	$(".borderclass").addClass("border");
    	$(".borderclass").addClass("border-dark");
    	$(".inspirationClass").addClass("inspiration");
    	$("body").css("color", "white");
    	gameStarted = true;
    });
});

window.onload = function() {
	//set misc variables
	screen.width = window.innerWidth - window.innerWidth / 20;
	screen.height = window.innerHeight - window.innerHeight / 8;
	screen.tabIndex = 1000;
	screen.style.outline = "none";

	screen.addEventListener("keydown", function(e) { //add key functionality when down
		if (gameStarted) {
			if (gameMode === "gameplay") { //the game is playing
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					if (!stats.speed) {stats.speed = 7;}

					stats.direction = "left";
					stats.lastHori = "left";
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					if (!stats.speed) {stats.speed = 7;}

					stats.direction = "right";
					stats.lastHori = "right";
				}
				else if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
					if (!stats.speed) {stats.speed = 7;}

					stats.direction = "up";
				}
				else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
					if (!stats.speed) {stats.speed = 7;}

					stats.direction = "down";
				}
				else if (e.key === "Control") {
					stats.speed = null;
					menuEnter.play();
					itemIndex = 0;
					gameMode = "pause";
				}
				else if (e.key === " ") {
					if (almostCollision()) {
						menuEnter.play();

						if (almostCollision().name === "Shop Keeper") {
							optionIndex = 0;
							gameMode = "shopMenu";
						}
						else if (almostCollision().name === "Advice Keeper") {
							adviceMenuIndex = 0;
							gameMode = "adviceMenu";
						}
						else if (almostCollision().name === "Button") {
							if (!levels[currentLevel].questions) {
								if (levels[currentLevel].waveIndex >= 2) {
									levels[currentLevel].closedShop = false;
								}

								levels[currentLevel].waveIndex++;
							}
							else {
								if (almostCollision().isTrue[levels[currentLevel].questionsIndex]) { //right answer; question level
									if (currentLevel < 6 && levels[currentLevel].questionsIndex === 2) {
										levels[currentLevel].closedShop = false;
									}
									else if (currentLevel === 6 && levels[currentLevel].questionsIndex === 7) {
										levels[currentLevel].closedShop = false;
									}

									levels[currentLevel].questionsIndex++;
								}
								else { //wrong answer; question level
									if (currentLevel > 5) {
										hitFun(5);
									}
									else if (currentLevel > 2) {
										hitFun(3);
									}
									else {
										hitFun(1);
									}
								}
							}
						}
						else {
							if (almostCollision().name === "Mail Box" && !levels[currentLevel].openedMailbox) {
								if (stats.economicClass === "middle") {stats.money += 150;}
								else if (stats.economicClass === "upper") {stats.money += 500;}
							}

							gameMode = "messageTalk";
						}
					}
				}
			}
			else if (gameMode === "messageIntercom") {
				if (e.key === " ") {
					levels[currentLevel].dialogueIndex++;
					menuEnter.play();
				}
			}
			else if (gameMode === "pause") {
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					menuEnter.play();
					if (itemIndex != 0 && itemIndex != 3) {if (itemIndex - 1 < stats.inventory.length) {itemIndex--;}}
					else {if (itemIndex + 2 < stats.inventory.length) {itemIndex += 2;}}
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					menuEnter.play();
					if (itemIndex != 2 && itemIndex != 5) {if (itemIndex + 1 < stats.inventory.length) {itemIndex++;}}
					else {if (itemIndex - 2 < stats.inventory.length) {itemIndex -= 2;}}
				}
				else if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
					menuEnter.play();
					if (itemIndex != 0 && itemIndex != 1 && itemIndex != 2) {if (itemIndex - 3 < stats.inventory.length) {itemIndex-= 3;}}
					else {if (itemIndex + 3 < stats.inventory.length) {itemIndex += 3;}}
				}
				else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
					menuEnter.play();
					if (itemIndex != 3 && itemIndex != 4 && itemIndex != 5) {if (itemIndex + 3 < stats.inventory.length) {itemIndex+= 3;}}
					else {itemIndex -= 3;}
				}
				else if (e.key === "Control") {
					menuEnter.play();
					gameMode = "gameplay";
				}
				else if (e.key === " " && stats.inventory.length > 0) {
					menuEnter.play();
					itemMenuIndex = 0;
					gameMode = "itemMenu";
				}
			}
			else if (gameMode === "itemMenu") {
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					menuEnter.play();
					if (itemMenuIndex != 0) {itemMenuIndex--;}
					else {itemMenuIndex += 2;}
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					menuEnter.play();
					if (itemMenuIndex != 2) {itemMenuIndex++;}
					else {itemMenuIndex -= 2;}
				}
				else if (e.key.toLowerCase() === "w" || e.key === "s" || e.key === "ArrowUp" || e.key === "ArrowDown") {
					menuEnter.play();
				}
				else if (e.key === " ") {
					menuEnter.play();

					if (itemMenuIndex === 0) { //item use
						useItem();
						itemIndex = 0;
						gameMode = "pause";
					}
					else if (itemMenuIndex === 1) { //item inspect
						menuEnter.play();
						gameMode = "messageItem";
					}
					else if (itemMenuIndex === 2) { //exit
						menuEnter.play();
						gameMode = "pause";
					}
				}
			}
			else if (gameMode === "messageItem") {
				if (e.key === " ") {
					menuEnter.play();
					gameMode = "itemMenu";
				}
			}
			else if (gameMode === "messageTalk") {
				if (e.key === " ") {
					menuEnter.play();
					gameMode = "gameplay";

					if (almostCollision().name === "Mail Box") {levels[currentLevel].openedMailbox = true;}
				}
			}
			else if (gameMode === "shopMenu") {
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					menuEnter.play();
					if (optionIndex != 0 && optionIndex != 2) {optionIndex--;}
					else {optionIndex++;}
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					menuEnter.play();
					if (optionIndex != 1 && optionIndex != 3) {optionIndex++;}
					else {optionIndex--;}
				}
				else if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
					menuEnter.play();
					if (optionIndex != 0 && optionIndex != 1) {optionIndex -= 2;}
					else {optionIndex += 2;}
				}
				else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
					menuEnter.play();
					if (optionIndex != 2 && optionIndex != 3) {optionIndex += 2;}
					else {optionIndex -= 2;}
				}
				else if (e.key === " ") {
					if (optionIndex === 0) {
						menuEnter.play();
						shopBuyIndex = 0;
						gameMode = "shopBuy";
					}
					else if (optionIndex === 1) {
						menuEnter.play();
						shopSellIndex = 0;
						gameMode = "shopSell";
					}
					else if (optionIndex === 2) {
						menuEnter.play();
						messageIndex = getRandomInt(0, levels[currentLevel].npcs[0].talks.length);
						gameMode = "shopTalk";
					}
					else if (optionIndex === 3) {
						menuEnter.play();
						gameMode = "gameplay";
					}
				}
			}
			else if (gameMode === "shopTalk") {
				if (e.key === " ") {
					menuEnter.play();
					gameMode = "shopMenu";
				}
			}
			else if (gameMode === "shopBuy") {
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					menuEnter.play();
					if (shopBuyIndex != 0 && shopBuyIndex != 3) {shopBuyIndex--;}
					else {shopBuyIndex += 2;}
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					menuEnter.play();
					if (shopBuyIndex != 2 && shopBuyIndex != 5) {shopBuyIndex++;}
					else {shopBuyIndex -= 2;}
				}
				else if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
					menuEnter.play();
					if (shopBuyIndex != 0 && shopBuyIndex != 1 && shopBuyIndex != 2) {shopBuyIndex -= 3;}
					else {shopBuyIndex += 3;}
				}
				else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
					menuEnter.play();
					if (shopBuyIndex != 3 && shopBuyIndex != 4 && shopBuyIndex != 5) {shopBuyIndex += 3;}
					else {shopBuyIndex -= 3;}
				}
				else if (e.key === " ") {
					let targetElement = $(".buys.selected");
					let targetItem;

					for (let item of levels[currentLevel].npcs[0].items) {
						if (item.name === targetElement.text().split(":")[1].trim()) {
							targetItem = item;
						}
					}

					if (!targetItem || targetItem.value > stats.money || stats.inventory.length >= 6) {
						buyFailure.play();
						gameMode = "shopMenu";
					}
					else {
						buySuccess.play();
						stats.money -= targetItem.value;
						stats.inventory.push(targetItem);
						gameMode = "shopMenu";
					}
				}
				else if (e.key === "Control") {
					menuEnter.play();
					gameMode = "shopMenu";
				}
			}
			else if (gameMode === "shopSell") {
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					menuEnter.play();
					if (shopSellIndex != 0 && shopSellIndex != 3) {if (shopSellIndex - 1 < stats.inventory.length) {shopSellIndex--;}}
					else {if (shopSellIndex + 2 < stats.inventory.length) {shopSellIndex += 2;}}
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					menuEnter.play();
					if (shopSellIndex != 2 && shopSellIndex != 5) {if (shopSellIndex + 1 < stats.inventory.length) {shopSellIndex++;}}
					else {if (shopSellIndex - 2 < stats.inventory.length) {shopSellIndex -= 2;}}
				}
				else if (e.key.toLowerCase() === "w" || e.key === "ArrowUp") {
					menuEnter.play();
					if (shopSellIndex != 0 && shopSellIndex != 1 && shopSellIndex != 2) {if (shopSellIndex - 3 < stats.inventory.length) {shopSellIndex -= 3;}}
					else {if (shopSellIndex + 3 < stats.inventory.length) {shopSellIndex += 3;}}
				}
				else if (e.key.toLowerCase() === "s" || e.key === "ArrowDown") {
					menuEnter.play();
					if (shopSellIndex != 3 && shopSellIndex != 4 && shopSellIndex != 5) {if (shopSellIndex + 3 < stats.inventory.length) {shopSellIndex += 3;}}
					else {if (shopSellIndex - 3 < stats.inventory.length) {shopSellIndex -= 3;}}
				}
				else if (e.key === " ") {
					let targetElement = $(".sells.selected");
					let targetItem;

					for (let item of stats.inventory) {
						if (item.name === targetElement.text().split(":")[1].trim()) {
							targetItem = item;
						}
					}

					if (!targetItem) {
						buyFailure.play();
						gameMode = "shopMenu";
					}
					else {
						buySuccess.play();
						stats.money += targetItem.value;
						stats.inventory.splice(stats.inventory.indexOf(targetItem), 1);
						gameMode = "shopMenu";
					}
				}
				else if (e.key === "Control") {
					menuEnter.play();
					gameMode = "shopMenu";
				}
			}
			else if (gameMode === "adviceMenu") {
				if (e.key.toLowerCase() === "a" || e.key === "ArrowLeft") {
					menuEnter.play();
					if (adviceMenuIndex != 0) {adviceMenuIndex--;}
					else {adviceMenuIndex++;}
				}
				else if (e.key.toLowerCase() === "d" || e.key === "ArrowRight") {
					menuEnter.play();
					if (adviceMenuIndex != 1) {adviceMenuIndex++;}
					else {adviceMenuIndex--;}
				}
				else if (e.key.toLowerCase() === "w" || e.key === "s" || e.key === "ArrowUp" || e.key === "ArrowDown") {
					menuEnter.play();
				}
				else if (e.key === " ") {
					if (adviceMenuIndex === 0) {
						if (stats.money >= 100) {
							buySuccess.play();
							stats.money -= 100;
							levels[currentLevel].npcs[1].advicesIndex++;
							gameMode = "messageTalk";
						}
						else {
							buyFailure.play();
						}
					}
					else if (adviceMenuIndex === 1) {
						gameMode = "gameplay";
					}
				}
			}
			else {
				console.log("error incorrect gamemode: " + gameMode);
				gameMode = "gameplay";
			}
		}

		screen.addEventListener("keyup", function(e) { //reset speed when up
			if (gameStarted) {
				if (e.key != " ") {
					if (stats.speed) {stats.speed = null;}
				}
			}
		});

		screen.addEventListener("mousemove", function() { //keep track of mouse position
			var rect = screen.getBoundingClientRect();
			var doc = document.documentElement;
			mouseX = event.clientX - rect.left - doc.scrollLeft;
			mouseY = event.clientY - rect.top - doc.scrollTop;
		});
	});

	setInterval(update, 1000 / fps);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
  	max = Math.floor(max);

  	return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

//
//
//
//	CALCULATING FUNCTIONS
//
//
//
function calculateBlocks(columns = numSquares, rows = numSquares, columnsEnd = numSquares, 
						rowsEnd = numSquares, width = blockWidth, height = blockHeight) {
	let res = new Array();

	if (columns === numSquares && rows === numSquares) { //fill entire board
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				res.push({x: blockWidth * i, y: blockHeight * j, width: width, height: height,});
			}
		}
	}
	else { //make a specific stroke
		for (let i = columns; i <= columnsEnd; i++) {
			for (let j = rows; j <= rowsEnd; j++) {
				res.push({x: blockWidth * i, y: blockHeight * j, width: width, height: height});
			}
		}
	}

	return res;
}

function calculateInspiration() {
	if (stats.inspiration > 9) {
		$("#inspiration10").css("background-color", "white");
		$("#inspiration10").css("color", "white");
		$("#inspiration9").css("background-color", "white");
		$("#inspiration9").css("color", "white");
		$("#inspiration8").css("background-color", "white");
		$("#inspiration8").css("color", "white");
		$("#inspiration7").css("background-color", "white");
		$("#inspiration7").css("color", "white");
		$("#inspiration6").css("background-color", "white");
		$("#inspiration6").css("color", "white");
		$("#inspiration5").css("background-color", "white");
		$("#inspiration5").css("color", "white");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 1;
		shopMusic.playbackRate = 1;
	}
	else if (stats.inspiration > 8) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "white");
		$("#inspiration9").css("color", "white");
		$("#inspiration8").css("background-color", "white");
		$("#inspiration8").css("color", "white");
		$("#inspiration7").css("background-color", "white");
		$("#inspiration7").css("color", "white");
		$("#inspiration6").css("background-color", "white");
		$("#inspiration6").css("color", "white");
		$("#inspiration5").css("background-color", "white");
		$("#inspiration5").css("color", "white");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.95;
		shopMusic.playbackRate = 0.95;
	}
	else if (stats.inspiration > 7) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "white");
		$("#inspiration8").css("color", "white");
		$("#inspiration7").css("background-color", "white");
		$("#inspiration7").css("color", "white");
		$("#inspiration6").css("background-color", "white");
		$("#inspiration6").css("color", "white");
		$("#inspiration5").css("background-color", "white");
		$("#inspiration5").css("color", "white");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.9;
		shopMusic.playbackRate = 0.9;
	}
	else if (stats.inspiration > 6) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "white");
		$("#inspiration7").css("color", "white");
		$("#inspiration6").css("background-color", "white");
		$("#inspiration6").css("color", "white");
		$("#inspiration5").css("background-color", "white");
		$("#inspiration5").css("color", "white");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.85;
		shopMusic.playbackRate = 0.85;
	}
	else if (stats.inspiration > 5) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "white");
		$("#inspiration6").css("color", "white");
		$("#inspiration5").css("background-color", "white");
		$("#inspiration5").css("color", "white");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.8;
		shopMusic.playbackRate = 0.8;
	}
	else if (stats.inspiration > 4) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "black");
		$("#inspiration6").css("color", "black");
		$("#inspiration5").css("background-color", "white");
		$("#inspiration5").css("color", "white");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.75;
		shopMusic.playbackRate = 0.75;
	}
	else if (stats.inspiration > 3) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "black");
		$("#inspiration6").css("color", "black");
		$("#inspiration5").css("background-color", "black");
		$("#inspiration5").css("color", "black");
		$("#inspiration4").css("background-color", "white");
		$("#inspiration4").css("color", "white");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.5;
		shopMusic.playbackRate = 0.5;
	}
	else if (stats.inspiration > 2) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "black");
		$("#inspiration6").css("color", "black");
		$("#inspiration5").css("background-color", "black");
		$("#inspiration5").css("color", "black");
		$("#inspiration4").css("background-color", "black");
		$("#inspiration4").css("color", "black");
		$("#inspiration3").css("background-color", "white");
		$("#inspiration3").css("color", "white");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.2;
		shopMusic.playbackRate = 0.2;
	}
	else if (stats.inspiration > 1) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "black");
		$("#inspiration6").css("color", "black");
		$("#inspiration5").css("background-color", "black");
		$("#inspiration5").css("color", "black");
		$("#inspiration4").css("background-color", "black");
		$("#inspiration4").css("color", "black");
		$("#inspiration3").css("background-color", "black");
		$("#inspiration3").css("color", "black");
		$("#inspiration2").css("background-color", "white");
		$("#inspiration2").css("color", "white");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0.1;
		shopMusic.playbackRate = 0.1;
	}
	else if (stats.inspiration > 0) {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "black");
		$("#inspiration6").css("color", "black");
		$("#inspiration5").css("background-color", "black");
		$("#inspiration5").css("color", "black");
		$("#inspiration4").css("background-color", "black");
		$("#inspiration4").css("color", "black");
		$("#inspiration3").css("background-color", "black");
		$("#inspiration3").css("color", "black");
		$("#inspiration2").css("background-color", "black");
		$("#inspiration2").css("color", "black");
		$("#inspiration1").css("background-color", "white");
		$("#inspiration1").css("color", "white");

		arenaMusic.playbackRate = 0;
		shopMusic.playbackRate = 0;
	}
	else {
		$("#inspiration10").css("background-color", "black");
		$("#inspiration10").css("color", "black");
		$("#inspiration9").css("background-color", "black");
		$("#inspiration9").css("color", "black");
		$("#inspiration8").css("background-color", "black");
		$("#inspiration8").css("color", "black");
		$("#inspiration7").css("background-color", "black");
		$("#inspiration7").css("color", "black");
		$("#inspiration6").css("background-color", "black");
		$("#inspiration6").css("color", "black");
		$("#inspiration5").css("background-color", "black");
		$("#inspiration5").css("color", "black");
		$("#inspiration4").css("background-color", "black");
		$("#inspiration4").css("color", "black");
		$("#inspiration3").css("background-color", "black");
		$("#inspiration3").css("color", "black");
		$("#inspiration2").css("background-color", "black");
		$("#inspiration2").css("color", "black");
		$("#inspiration1").css("background-color", "black");
		$("#inspiration1").css("color", "black");

		arenaMusic.playbackRate = 0;
		shopMusic.playbackRate = 0;
	}

	if (currentLevel === 6 && levels[currentLevel].questionsIndex >= 8) {
		arenaMusic.playbackRate = 0;
		shopMusic.playbackRate = 0;
	}
}

function calculateMoney() {
	if (stats.money > 9999) {$("#moneyCounter").text("MONEY:" + 9999);}
	else if (stats.money < 0) {$("#moneyCounter").text("MONEY:" + 0);}
	else {$("#moneyCounter").text("MONEY:" + stats.money);}
}

function calculateMessage() {
	if (messageAnimCounter < 1) {
		$("#messageContentB").css("color", "rgb(240, 40, 0)");
	}
	else {
		$("#messageContentB").css("color", "black");
	}

	$("#messageName").text("Intercom Voice");

	if (levels[currentLevel].dialogueIndex < levels[currentLevel].dialogue.length) {
		$("#messageContentA").text(levels[currentLevel].dialogue[levels[currentLevel].dialogueIndex]);
	}
	else {
		gameMode = "gameplay";
	}
}

function calculateMessageItem() {
	if (messageAnimCounter < 1) {
		$("#messageContentB").css("color", "rgb(240, 40, 0)");
	}
	else {
		$("#messageContentB").css("color", "black");
	}

	var name = stats.inventory[itemIndex].name;
	var description = stats.inventory[itemIndex].description;

	$("#messageName").text(name);
	$("#messageContentA").text(description);
}

function calculateMessageTalk(npc) {
	if (messageAnimCounter < 1) {
		$("#messageContentB").css("color", "rgb(240, 40, 0)");
	}
	else {
		$("#messageContentB").css("color", "black");
	}

	var name = npc.name;
	var description = npc.talk;

	if (name === "Mail Box") {
		if (levels[currentLevel].openedMailbox) {
			$("#messageContentA").text(description);
		}
		else if (stats.economicClass === "lower") {
			$("#messageContentA").text("Dear " + stats.name + ": We didn't last very long in FISAT. Maybe you should give up. Love Mom & Dad.");
		}
		else if (stats.economicClass === "middle") {
			$("#messageContentA").text("Dear " + stats.name + ": You're doing an okay job: not too good, not too shabby. Just okay. Enclosed is your $150 allowance. Love Mom & Dad.");
		}
		else if (stats.economicClass === "upper") {
			$("#messageContentA").text("Dear " + stats.name + ": You're doing a fantastic job. Your ability to rant endlessly about problems that don't affect you amazes us every day. Enclosed is your $500 allowance. You deserve it. Love Mom & Dad.");
		}
	}
	else if (name === "Advice Keeper") {
		if (levels[currentLevel].npcs[1].advicesIndex >= levels[currentLevel].npcs[1].advices.length) {
			$("#messageContentA").text("Water is wet.");
		}
		else {
			$("#messageContentA").text(levels[currentLevel].npcs[1].advices[levels[currentLevel].npcs[1].advicesIndex]);
		}
	}
	else {
		$("#messageContentA").html(description);
	}

	$("#messageName").text(name);
}

function calculateMessageShop() {
	if (messageAnimCounter < 1) {
		$("#messageContentB").css("color", "rgb(240, 40, 0)");
	}
	else {
		$("#messageContentB").css("color", "black");
	}

	$("#messageName").text("Shop Keeper");
	$("#messageContentA").text(levels[currentLevel].npcs[0].talks[messageIndex]);
}

function calculateShopBuy() {
	for (let i = 0; i < 6; i++) {
		let value = levels[currentLevel].npcs[0].items[i].value;
		let name = levels[currentLevel].npcs[0].items[i].name;
		$("#buy" + i).text("$" + value + ": " + name);
	}
}

function calculateShopSell() {
	for (let i = 0; i < stats.inventory.length; i++) {
		let value = stats.inventory[i].value;
		let name = stats.inventory[i].name;
		$("#sell" + i).text("$" + value + ": " + name);
	}
}

function calculateItemMenu() {
	var name = $("#item" + itemIndex).text();

	$("#itemMenuName").text(name);
}

//
//
//
//	STAT CHANGE FUNCTIONS
//
//
//

function healFun(val = 0) {
	heal.play();

	if (stats.inspiration + val > 10) {stats.inspiration = 10;}
	else {stats.inspiration += val;}
}

function hitFun(val = 0) {
	hit.play();

	if (val === 0) {stats.inspiration = 0;}
	else if (stats.armor && stats.armor.defense < val) {
		stats.inspiration -= (val - stats.armor.defense);
	}
	else {
		stats.inspiration -= val;
	}
}

function useItem() {
	var itemTarget = $(".items.selected").text();
	var selected;

	for (let item of stats.inventory) {
		if (itemTarget === item.name) {selected = item;}
	}

	if (selected.type === "armor") {
		if (stats.armor) {
			stats.inventory.push(stats.armor);
		}

		stats.armor = selected;
	}
	else if (selected.type === "healing") {
		healFun(selected.healing);
	}
	else if (selected.type === "misc") {
		if (selected.name === "Peppermint") {peppermintCount++;}
		else if (selected.name === "Toothpick") {toothpickCount++;}
	}

	stats.inventory.splice(stats.inventory.indexOf(selected), 1);
}

//
//
//
//	DRAWING FUNCTIONS
//
//
//

function drawBlocks(blocks, texture) {
	screenContext.globalAlpha = 1;

	for (let block of blocks) {
		screenContext.drawImage(texture, block.x, block.y, block.width, block.height);
	}
}

function drawButtons() {
	screenContext.globalAlpha = 1;

	if (!levels[currentLevel].questions) {
		if (levels[currentLevel].waveIndex < levels[currentLevel].buttons.length) {
			let buttonTexture = new Image();
			let button = levels[currentLevel].buttons[levels[currentLevel].waveIndex];

			if (collision(stats, button)) {
				buttonTexture.src = button.downTexture;

				if (!button.soundPlayed) {
					pressButton.play();
					button.soundPlayed = true;
				}
			}
			else {
				buttonTexture.src = button.upTexture;
				button.soundPlayed = false;
			}

			screenContext.drawImage(buttonTexture, button.x, button.y, blockWidth * 2, blockWidth * 2);
		}
	}
	else {
		if (levels[currentLevel].questionsIndex < levels[currentLevel].questions.length) {
			for (let button of levels[currentLevel].buttons) {
				let buttonTexture = new Image();

				if (collision(stats, button)) {
					buttonTexture.src = button.downTexture;

					if (!button.soundPlayed) {
						pressButton.play();
						button.soundPlayed = true;
					}
				}
				else {
					buttonTexture.src = button.upTexture;
					button.soundPlayed = false;
				}

				screenContext.drawImage(buttonTexture, button.x, button.y, blockWidth * 2, blockWidth * 2);
				drawText(button.x + (blockWidth * 2.5), button.y + blockWidth, button.label[levels[currentLevel].questionsIndex], "rgb(240, 40, 0)", 20);
			}
		}
	}
}


function drawText(topLeftX, topLeftY, text, color, size) {
	screenContext.globalAlpha = 1;
	screenContext.fillStyle = color;
	screenContext.font = size + "px retro";
	screenContext.fillText(text, topLeftX, topLeftY);
}

function drawEnemies() {
	if (levels[currentLevel].questions) {
		for (let enemy of levels[currentLevel].enemies) {
			let enemyTexture = new Image();

			if (enemy.speed)  {
				if (enemy.direction === "left") {
					if (enemy.enemyAnimCounter <  0.5) {
						enemyTexture.src = enemy.leftTexture;
					}
					else {
						enemyTexture.src = enemy.rightTexture;

						if (enemy.enemyAnimCounter > 1) {enemy.enemyAnimCounter = 0;}
					}
				}
				else {
					if (enemy.enemyAnimCounter < 0.5) {
						enemyTexture.src = enemy.rightTexture;
					}
					else {
						enemyTexture.src = enemy.leftTexture;
						
						if (enemy.enemyAnimCounter > 1) {enemy.enemyAnimCounter = 0;}
					}
				}

				enemy.enemyAnimCounter += 4 / fps;
			}
			else {
				enemyTexture.src = enemy.idleTexture;
			}

			screenContext.drawImage(enemyTexture, enemy.x, enemy.y, enemy.width, enemy.height);
		}
	}
	else {
		for (let enemy of levels[currentLevel].enemies[levels[currentLevel].waveIndex]) {
			let enemyTexture = new Image();

			if (enemy.speed)  {
				if (enemy.direction === "left") {
					if (enemy.enemyAnimCounter <  0.5) {
						enemyTexture.src = enemy.leftTexture;
					}
					else {
						enemyTexture.src = enemy.rightTexture;

						if (enemy.enemyAnimCounter > 1) {enemy.enemyAnimCounter = 0;}
					}
				}
				else {
					if (enemy.enemyAnimCounter < 0.5) {
						enemyTexture.src = enemy.rightTexture;
					}
					else {
						enemyTexture.src = enemy.leftTexture;
						
						if (enemy.enemyAnimCounter > 1) {enemy.enemyAnimCounter = 0;}
					}
				}

				enemy.enemyAnimCounter += 4 / fps;
			}
			else {
				enemyTexture.src = enemy.idleTexture;
			}

			screenContext.drawImage(enemyTexture, enemy.x, enemy.y, enemy.width, enemy.height);
		}
	}
}

function drawPlayer() {
	screenContext.globalAlpha = 1;

	if (stats.speed) { //player is moving
		if (stats.direction === "left" || stats.lastHori === "left") {
			if (playerAnimCounter < 0.5) {
				playerTexture.src = "../assets/sprites/players/" + stats.economicClass + "Left.png";
			}
			else {
				playerTexture.src = "../assets/sprites/players/" + stats.economicClass + "Right.png";
			}
		}
		else {
			if (playerAnimCounter < 0.5) {
				playerTexture.src = "../assets/sprites/players/" + stats.economicClass + "Right.png";
			}
			else {
				playerTexture.src = "../assets/sprites/players/" + stats.economicClass + "Left.png";
			}
		}
	}
	else { //player is not moving
		playerTexture.src = "../assets/sprites/players/" + stats.economicClass + "Idle.png";
	}

	screenContext.drawImage(playerTexture, stats.x, stats.y, stats.width, stats.height);
}

function drawNPCs() {
	screenContext.globalAlpha = 1;

	if (currentLevel === 6 && levels[currentLevel].questionsIndex < levels[currentLevel].questions.length) {
		let npc = levels[currentLevel].npcs[levels[currentLevel].questionsIndex];
		let newImage = new Image();
		newImage.src = npc.texture;
		screenContext.drawImage(newImage, npc.x, npc.y, npc.width, npc.height);
	}
	else if (currentLevel < 6) {
		for (let npc of levels[currentLevel].npcs) {
			if (stats.location === npc.location) {
				let newImage = new Image();
				newImage.src = npc.texture;
				screenContext.drawImage(newImage, npc.x, npc.y, npc.width, npc.height);
			}
		}
	}
}

function draw() {
	//draw debugging coordinates near mouse
	if (debugMode) {
		drawText(mouseX, mouseY, mouseX + ",  " + mouseY, "red", 20);
	}

	//lower canvas opacity based on player inspiration
	if (stats.inspiration > 9) {
		screen.style.opacity = "1";
	}
	else if (stats.inspiration <= 0) {
		screen.style.opacity = "0";
	}
	else {
		screen.style.opacity = "0." + Math.ceil(stats.inspiration);
	}

	//draw floors
	if (stats.location === "arena") {
		drawBlocks(floors, arenaFloorTexture);
	}
	else if (stats.location === "shop") {
		drawBlocks(floors, shopFloorTexture);
	}

	//draw walls
	if (stats.location === "arena") {
		drawBlocks(levels[currentLevel].arenaWalls, arenaWallTexture);
	}
	else if (stats.location === "shop") {
		drawBlocks(levels[currentLevel].shopWalls, arenaWallTexture);
	}

	//draw buttons
	if (stats.location === "arena"
		&& levels[currentLevel].buttons
		&& levels[currentLevel].closedShop) {
		drawButtons();
	}

	//draw player
	drawPlayer();

	//draw npcs
	drawNPCs();

	//draw enemies
	if (stats.location === "arena" 
		&& levels[currentLevel].enemies
		&& levels[currentLevel].closedShop) {
		if (currentLevel === 4 &&
			levels[currentLevel].waveIndex < levels[currentLevel].buttons.length) {
			drawEnemies();
		}
		else if (currentLevel === 6 &&
			levels[currentLevel].questionsIndex < levels[currentLevel].questions.length) {
			drawEnemies();
		}
	}

	//draw bounds box
	screenContext.fillStyle = "black";
	screenContext.fillRect(600, 771, 150, 10);
}

//
//
//	MOVEMENT FUNCTIONS
//
//
//
function collision(entity1, entity2) {
	if (!entity1 || !entity2) {return false;}
	else if (entity1.location && entity2.location && entity1.location != entity2.location) {return false;}
	else if (entity1.x < entity2.x + entity2.width &&
		entity1.x + entity1.width > entity2.x &&
		entity1.y < entity2.y + entity2.height &&
		entity1.y + entity1.height > entity2.y) {

		return true;
	}
}

function collisionList(entity, blocks) {
	for (let block of blocks) {
		if (collision(entity, block)) {
			return block;
		}
	}

	return null;
}

function distance(entity1, entity2) {
	var distanceHori = Math.abs((entity2.x + (entity2.width / 2)) - (entity1.x + (entity1.width / 2)));
	var distanceVert = Math.abs((entity2.y + (entity2.height / 2)) - (entity1.y + (entity1.height / 2)));

	return Math.sqrt((distanceHori*distanceHori) + (distanceVert*distanceVert));
}

function almostCollision() {
	let res = new Array();
	let closestDistance = 200;
	let closest;

	for (let npc of levels[currentLevel].npcs) {
		let currentDistance = distance(stats, npc);

		if (currentDistance < 200 &&
			currentDistance < closestDistance &&
			stats.location === npc.location) {
			closestDistance = currentDistance;
			closest = npc;
		}
	}

	if (stats.location === "arena") {
		for (let button of levels[currentLevel].buttons) {
			let currentDistance = distance(stats, button);

			if (currentDistance < 200 &&
				currentDistance < closestDistance &&
				stats.location === button.location) {
				closestDistance = currentDistance;
				closest = button;
			}
		}
	}

	return closest;
}

function moveEnemies() {
	if (levels[currentLevel].questions) {
		for (let enemy of levels[currentLevel].enemies) {
			if (collisionList(enemy, levels[currentLevel].arenaWalls)) {
				if (enemy.direction === "left") {enemy.direction = "right";}
				else if (enemy.direction === "right") {enemy.direction = "left";}
				else if (enemy.direction === "up") {enemy.direction = "down";}
				else if (enemy.direction === "down") {enemy.direction = "up";}
			}

			if (enemy.direction === "left") {enemy.x -= enemy.speed;}
			else if (enemy.direction === "right") {enemy.x += enemy.speed;}
			else if (enemy.direction === "up") {enemy.y -= enemy.speed;}
			else if (enemy.direction === "down") {enemy.y += enemy.speed;}

			if (collision(stats, enemy)) {
				levels[currentLevel].enemies.splice(levels[currentLevel].enemies.indexOf(enemy), 1);
				hitFun(5);
			}
		}
	}
	else {
		for (let enemy of levels[currentLevel].enemies[levels[currentLevel].waveIndex]) {
			if (collisionList(enemy, levels[currentLevel].arenaWalls)) {
				if (enemy.direction === "left") {enemy.direction = "right";}
				else if (enemy.direction === "right") {enemy.direction = "left";}
				else if (enemy.direction === "up") {enemy.direction = "down";}
				else if (enemy.direction === "down") {enemy.direction = "up";}
			}

			if (enemy.direction === "left") {enemy.x -= enemy.speed;}
			else if (enemy.direction === "right") {enemy.x += enemy.speed;}
			else if (enemy.direction === "up") {enemy.y -= enemy.speed;}
			else if (enemy.direction === "down") {enemy.y += enemy.speed;}

			if (collision(stats, enemy)) {
				levels[currentLevel].enemies[levels[currentLevel].waveIndex].splice(
					levels[currentLevel].enemies[levels[currentLevel].waveIndex].indexOf(enemy), 1);
				hitFun(3);
			}
		}
	}
}

function movePlayer() {
	let dummy = {x: null, y: null, direction: null, 
				 width: stats.width, height: stats.height, location: stats.location};

	if (stats.direction === "up") {
		dummy.x = stats.x;
		dummy.y = stats.y - stats.speed;
		dummy.direction = "up";
	}
	else if (stats.direction === "down") {
		dummy.x = stats.x;
		dummy.y = stats.y + stats.speed;
		dummy.direction = "down";
	}
	else if (stats.direction === "left") {
		dummy.x = stats.x - stats.speed;
		dummy.y = stats.y;
		dummy.direction = "left";
	}
	else {
		dummy.x = stats.x + stats.speed;
		dummy.y = stats.y;
		dummy.direction = "right";
	}

	if (stats.location === "arena") {
		if (currentLevel === 6) {
			if (!collisionList(dummy, levels[currentLevel].arenaWalls) &&
				!collision(dummy, levels[currentLevel].npcs[levels[currentLevel].questionsIndex])) { //player hasn't collided with anything
				if (stats.speed) { //player is moving
					if (stats.direction === "left") {stats.x -= stats.speed;}
					else if (stats.direction === "right") {stats.x += stats.speed;}
					else if (stats.direction === "up") {stats.y -= stats.speed;}
					else {stats.y += stats.speed;}
				}
			}
		}
		else {
			if (!collisionList(dummy, levels[currentLevel].arenaWalls) &&
				!collisionList(dummy, levels[currentLevel].npcs)) { //player hasn't collided with anything
				if (stats.speed) { //player is moving
					if (stats.direction === "left") {stats.x -= stats.speed;}
					else if (stats.direction === "right") {stats.x += stats.speed;}
					else if (stats.direction === "up") {stats.y -= stats.speed;}
					else {stats.y += stats.speed;}
				}
			}
		}

		if (stats.y <= -135) { //player touched the top of the screen
			if (currentLevel === 6) {
				gameOver();
			}
			else {
				stats.x = 678;
				stats.y = 760;
				stats.location = "shop";
			}
		}
		else if (stats.y >= 774) { //player touched the bottom of the screen
			stats.x = 678;
			stats.y = -93;
			currentLevel--;
			stats.location = "shop";
		}	
	}
	else if (stats.location === "shop") {
		if (!collisionList(dummy, levels[currentLevel].shopWalls) && 
			!collisionList(dummy, levels[currentLevel].npcs)) { //player hasn't collided with anything
			if (stats.speed) { //player is moving
				if (stats.direction === "left") {stats.x -= stats.speed;}
				else if (stats.direction === "right") {stats.x += stats.speed;}
				else if (stats.direction === "up") {stats.y -= stats.speed;}
				else {stats.y += stats.speed;}
			}
		}

		if (stats.y <= -135) { //player touched the top of the screen
			stats.x = 678;
			stats.y = 760;
			currentLevel++;
			stats.location = "arena";
			gameMode = "messageIntercom";
		}
		else if (stats.y >= 774) { //player touched the bottom of the screen
			stats.x = 678;
			stats.y = -93;
			stats.location = "arena";
		}	
	}
}

function gameOver() {
	stats.speed = 0;
	$("#screen").keydown(false);
	let madeItToEnd = false;

	if (currentLevel === 6 && levels[currentLevel].questionsIndex >= 8) {
		madeItToEnd = true;
	}

	$("body").fadeOut(10000, function() {
		window.location.href = "postsurvey.html?economicClass=" + stats.economicClass + 
								"&currentLevel=" + currentLevel +
								"&madeItToEnd=" + madeItToEnd +
								"&name=" + stats.name +
								"&gender=" + stats.gender +
								"&sexuality=" + stats.sexuality +
								"&disabilities=" + stats.disabilities +
								"&education=" + stats.education +
								"&race=" + stats.race +
								"&passing=" + stats.passing +
								"&faith=" + stats.faith +
								"&citizenship=" + stats.citizenship +
								"&parents=" + stats.parents +
								"&selfLove=" + stats.selfLove;
	});
}

function update() {
	if (gameStarted) {
		if (gameMode === "gameplay") {
			if (stats.location === "arena" &&
				levels[currentLevel].questions &&
				levels[currentLevel].questionsIndex < levels[currentLevel].questions.length) {
				$("#statusBar").css("margin-top", "0");
				$("#questionBox").css("display", "block");
				$("#questionText").text(levels[currentLevel].questions[levels[currentLevel].questionsIndex]);
			}
			else {
				$("#questionBox").css("display", "none");
				$("#statusBar").css("margin-top", "5%");
			}

			$("#messageBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#statusBar").css("display", "block");

			if (stats.location === "arena" 
				&& levels[currentLevel].enemies
				&& levels[currentLevel].closedShop) {
				if (currentLevel === 4 &&
					levels[currentLevel].waveIndex < levels[currentLevel].buttons.length) {
					moveEnemies();
				}
				else if (currentLevel === 6 &&
					levels[currentLevel].questionsIndex < levels[currentLevel].questions.length) {
					moveEnemies();
				}
			}

			movePlayer();
			calculateInspiration();
			calculateMoney();
		}
		else if (gameMode === "messageIntercom") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#messageBar").css("display", "block");


			if (messageAnimCounter > 2) {
				messageAnimCounter = 0;
			}

			messageAnimCounter += 4 / fps;
			calculateMessage();
		}
		else if (gameMode === "pause") {
			$("#statusBar").css("display", "none");
			$("#messageBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#pauseBar").css("display", "block");

			$("#pauseName").text(stats.name);

			if (stats.armor) {
				$("#pauseArmor").text("Armor: " + stats.armor.name);
			}
			else {
				$("#pauseArmor").text("Armor: None");
			}

			$("#pauseMoney").text("$" + stats.money);

			for (let i = 0; i < stats.inventory.length; i++) {
				$("#item" + i).text(stats.inventory[i].name);
				$("#item" + i).removeClass("selected");
			}
			for (let i = stats.inventory.length; i < 6; i++) {
				$("#item" + i).text("");
			}

			$("#item" + itemIndex).addClass("selected");
		}
		else if (gameMode === "messageItem") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#messageBar").css("display", "block");


			if (messageAnimCounter > 2) {
				messageAnimCounter = 0;
			}

			messageAnimCounter += 4 / fps;
			calculateMessageItem();
		}
		else if (gameMode === "messageTalk") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#messageBar").css("display", "block");


			if (messageAnimCounter > 2) {
				messageAnimCounter = 0;
			}

			messageAnimCounter += 4 / fps;

			if (currentLevel === 6) {
				var npc = levels[currentLevel].npcs[levels[currentLevel].questionsIndex];
			}
			else {
				var npc = almostCollision();
			}

			calculateMessageTalk(npc);
		}
		else if (gameMode === "shopMenu") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#messageBar").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#shopMenu").css("display", "block");

			for (let i = 0; i < 4; i++) {
				$("#option" + i).removeClass("selected");
			}

			$("#option" + optionIndex).addClass("selected");
		}
		else if (gameMode === "shopTalk") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#messageBar").css("display", "block");


			if (messageAnimCounter > 2) {
				messageAnimCounter = 0;
			}

			messageAnimCounter += 4 / fps;
			calculateMessageShop();
		}
		else if (gameMode === "shopBuy") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#messageBar").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#shopBuy").css("display", "block");

			for (let i = 0; i < 6; i++) {
				$("#buy" + i).removeClass("selected");
			}

			$("#buy" + shopBuyIndex).addClass("selected");

			calculateShopBuy();
		}
		else if (gameMode === "shopSell") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#messageBar").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#shopSell").css("display", "block");

			for (let i = 0; i < 6; i++) {
				$("#sell" + i).removeClass("selected");
			}
			for (let i = stats.inventory.length; i < 6; i++) {
				$("#sell" + i).text("");
			}

			$("#sell" + shopSellIndex).addClass("selected");

			calculateShopSell();
		}
		else if (gameMode === "itemMenu") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#messageBar").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#adviceMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#itemMenu").css("display", "block");

			for (let i = 0; i < 3; i++) {
				$("#itemMenu" + i).removeClass("selected");
			}

			$("#itemMenu" + itemMenuIndex).addClass("selected");
			calculateItemMenu()
		}
		else if (gameMode === "adviceMenu") {
			$("#statusBar").css("display", "none");
			$("#pauseBar").css("display", "none");
			$("#shopMenu").css("display", "none");
			$("#messageBar").css("display", "none");
			$("#shopBuy").css("display", "none");
			$("#shopSell").css("display", "none");
			$("#itemMenu").css("display", "none");
			$("#questionBox").css("display", "none");
			$("#adviceMenu").css("display", "block");

			for (let i = 0; i < 2; i++) {
				$("#adviceMenu" + i).removeClass("selected");
			}

			$("#adviceMenu" + adviceMenuIndex).addClass("selected");
		}

		if (stats.location === "arena") {
			shopMusic.pause();
			arenaMusic.play();
		}
		else if (stats.location === "shop") {
			arenaMusic.pause();
			shopMusic.play();
		}

		if (stats.speed && playerAnimCounter < 1) { //player is moving
			playerAnimCounter += 4 / fps;
			walk.play();
		}
		else {
			playerAnimCounter = 0;

		}
	}

	if (stats.location === "arena" && //if the shop door should open
		!levels[currentLevel].closedShop) {
		levels[currentLevel].arenaWalls = calculateBlocks(0, 0, 15, 0).concat(
									calculateBlocks(21, 0, 37, 0).concat(
									calculateBlocks(0, 0, 0, 25).concat(
									calculateBlocks(0, 25, 37, 25).concat(
									calculateBlocks(37, 0, 37, 25)))));

		doorShut.play();
		levels[currentLevel].closedShop = true;
	}

	if (stats.location === "shop" && //if the shop door should shut behind the player
		!levels[currentLevel].closedPrevious &&
		stats.y < 620) {
		levels[currentLevel].shopWalls = calculateBlocks(0, 0, 15, 0).concat(
									calculateBlocks(21, 0, 37, 0).concat(
									calculateBlocks(0, 0, 0, 25).concat(
									calculateBlocks(0, 25, 37, 25).concat(
									calculateBlocks(37, 0, 37, 25)))));
		doorShut.play();
		levels[currentLevel].closedPrevious = true;
	}

	if (currentLevel != 0 && //if the arena door should shut behind the player
		stats.location === "arena" && 
		!levels[currentLevel].closedArena &&
		stats.y < 620) {
		levels[currentLevel].arenaWalls = calculateBlocks(0, 0, 37, 0).concat(
									calculateBlocks(0, 0, 0, 25).concat(
									calculateBlocks(0, 25, 37, 25).concat(
									calculateBlocks(37, 0, 37, 25))));
		doorShut.play();
		levels[currentLevel].closedArena = true;
	}

	draw();

	if (stats.inspiration <= 0) {
		gameOver();
	}
}