//variables
var numSquares = 6;
var colors = [];
var pickedColor = pickColor();

//selectors
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#resetButton");
var modeButtons = document.querySelectorAll(".mode");

//initialising function
init();

function init() {
	//mode buttons click listeners
	setupModeButtons();
	//square click listeners
	setupSquares();
	//reset button click listener
	resetButton.addEventListener("click", reset);
	//reset display
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", modeButtonClick);
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", squareClick);
	}
}

function modeButtonClick() {
	modeButtons[0].classList.remove("selected");
	modeButtons[1].classList.remove("selected");
	this.classList.add("selected");
	this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
	reset();
}

function changeColors(color) {
	//loop through all squares
	for (var i = 0 ; i < squares.length; i++) {
		//change each color in each quare to match given colors
		squares[i].style.background = color;
	}	
}

function pickColor() {
	//pick a random number (0-lastIndex)
	var number = Math.floor(Math.random() * colors.length);
	//use that number to access the colors array
	return colors[number];
}

function generateRandomColors(num) {
	var array = [];

	for (var i = 0; i < num; i++) {
		array[i] = generateRandomColor();
	}
	return array;
}

function generateRandomColor() {
	//generate red value
	var red = Math.floor(Math.random() * 256);
	//generate green value
	var green = Math.floor(Math.random() * 256);
	//generate blue value
	var blue = Math.floor(Math.random() * 256);
	
	//combine into string
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function squareClick() {
	var clickedColor = this.style.background;

	if (clickedColor === pickedColor) {
		messageDisplay.textContent = "Correct";
		changeColors(clickedColor);
		h1.style.background = clickedColor;
		resetButton.textContent = "Play Again?";
	} else {
		this.style.background = "#232323";
		messageDisplay.textContent = "Try Again";
	}
}

function reset() {
	colors = generateRandomColors(numSquares);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	h1.style.background = "steelblue";
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
}