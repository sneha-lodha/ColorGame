var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

//Initializing everything
function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

//setting up the different mode buttons 
function setUpModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }
}

//Adding event listeners to squares and adding the winning game logic
function setUpSquares(){
    for(var i = 0; i < squares.length; i++){
        //adding click listeners to squares
        squares[i].addEventListener("click", function(){
            var clickedColor = this.style.backgroundColor;
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            } else {
                this.style.backgroundColor = "black";
                messageDisplay.textContent = "try again!"
            }
        });
    }
}

//functionality for reset button to get new set of colors or
// start a new game after winning
function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = " ";
    for(var i = 0; i < squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
    reset();
});


//Once the correct color is guessed, change all the squares to the color that is given 
function changeColors(color){
    squares.forEach(element => {
        element.style.backgroundColor = color;
    });
}

//Function to pick a random color from the colors array and assign that as the target color to guess
function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

//Function to generate num numbers of ranndom colors in an array and return it 
function generateRandomColors(num){
    var colors = [];
    for(var i = 0; i < num; i++){
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b= Math.floor(Math.random() * 256);
        colors[i] = "rgb(" + r + ", " + g + ", " + b + ")";
    }
    return colors;
}