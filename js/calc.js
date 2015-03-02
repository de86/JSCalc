$(document).ready(function(){

	var $calcScreen = $("#calcScreen");
	var $ticker = $("#tickerScreen");
	var digit, num1, num2, operator;
	var lastPressed = "";
	var solved = false;

	// Displays digits on the calculator screen as the user presses them
	$(".number-button").click(function(){
		if(solved){
			clearScreen($calcScreen);
			clearScreen($ticker);
			solved = false;
		};

		$calcScreen.html($(calcScreen).html() + $(this).html());
		lastPressed = "digit";
	});


	// Displays calculation in the #tickerScreen div above the calculator screen
	// calculates on the go as user presses a new operator button
	$(".operator-button").click(function(){

		// Overwrites previous operator if an operator button is pushed twice
		if(lastPressed === "operator"){
			operator = $(this).html();
			var tickerText = $ticker.text();
			$ticker.html(replace($ticker.html(), $(this).html(), (tickerText.length-1)));
		} else {
			
			if(solved){
				solved = false;
			}

			if(num1 == undefined){
				num1 = parseInt($calcScreen.html(), 10);	
			} else {
				num2 = parseInt($calcScreen.html(), 10);
				num1 = calculate(num1, num2, operator);		
			};

			operator = $(this).html();
			$ticker.html(" " + $ticker.html() + " " + $calcScreen.html() + " " + $(this).html());
			clearScreen($calcScreen);
			lastPressed = "operator";
		};
	});


	// Finishes calculating on the fly and presents the answer in the calculator screen
	$("#equals").click(function(){

		if(!solved && (num1 || num1 === 0)){
			if( $calcScreen.html() != "" ){
				num2 = parseInt($calcScreen.html(), 10);
				$ticker.html($ticker.html() + " " + num2 + " " + "=");
				$calcScreen.html(calculate(num1, num2, operator));
				reset();
				solved = true;
			};
		};

		lastPressed = "equals";
	});


	// Clears all screens and resets all variables allowing the user to start again
	$("#clear").click(function(){
		reset();
		clearScreen($calcScreen);
		$ticker.html("");
	});


	// returns the calculation of 2 given numbers using the given operator
	function calculate(x, y, operator){

		switch (operator) {
			case "+":
				return x + y;
			case "-":
				return x - y;
			case "*":
				return x * y;
			case "/":
				return x / y;
			default:
				$calcScreen.html("Error");
				return;
		};

	};


	// Clears the inner html of any jQuery element passed to it.
	// Used to clear the different screens
	function clearScreen(screen){
		screen.html("");
	};


	// Resets all variables allowing the user to start again
	function reset(){
		digit = undefined;
		num1 = undefined;
		num2 = undefined;
		operator = undefined;
		lastPressed = undefined;
		solved = false;
	};


	// Replace the text of a string at a given position with a given substring
	function replace(fullString, charToInsert, position){
		var textBefore = fullString.substring(0, position);
		var textAfter = fullString.substring((position + 1));
		var tickerText = (textBefore + charToInsert + textAfter)
		$ticker.html(tickerText);
	};

	//******************************
	//*******Header Animation*******
	//******************************

	$("header").hover(
		function(){
			$("header p").slideDown(300);
		}, 

		function(){
			$("header p").slideUp(300);
		});


});