/* CONSTANTS */
	var canvas;
	var stage;
	var FPS = 30;
	
	var CANVAS_WIDTH = 800;
	var CANVAS_HEIGHT = 600;
	var cX = CANVAS_WIDTH/2;
	var cY = CANVAS_HEIGHT/2;
	
	//BRICK SPECS
	var N_COLUMNS = 10;
	var N_ROWS = 10;
	var BRICK_SPACER = 4;
	var BRICK_WIDTH = (CANVAS_WIDTH - (N_COLUMNS - 1) * BRICK_SPACER) / N_COLUMNS;
	var BRICK_HEIGHT = BRICK_WIDTH/4;
	
	
	
	var BRICK_Y_OFFSET = 70;
	
	//PADDLE
	var PADDLE_WIDTH = 60;
	var PADDLE_HEIGHT = 10;
	var PADDLE_Y_OFFSET = 30;
	
	//BALL
	var BALL_RADIUS = 10;
	
	//PLAYER
	var TURNS = 3;
	var GRAVITY = 10;
	var TICK_TIME = 30;
	
/*IVARS*/
	var brick_counter;
	var lives;
	
	//Paddle Positioning
	var paddleX;
	var paddleY;
	var mouseX;
	
	//Ball Positioning
	var ballLeftBorder;
	var ballTopBorder;
	var ballRightBorder;
	var ballBottomBorder;
	var vx, vy;  
	
	//Shape Objects
	var brick = new createjs.Shape();
	var paddle = new createjs.Shape();
	var ball = new createjs.Shape();
	var wall = new createjs.Shape();
	var ceiling = new createjs.Shape();
	var bottom = new createjs.Shape();
	var collider = new createjs.Shape();

function init() {
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage("breakOut");
	createjs.Ticker.addListener(window);
	stage.enableMouseOver(FPS);
	
	//Setu the game stage and play.  
	setup();
}

function tick() {
	play(TURNS);
	}



function setup(){
	//Setup the Bricks
	brickCounter = 0;  
	for(var i = 0; i < N_ROWS; i++){
		for(var j = 0; j < N_COLUMNS; j++){
			var brickX = j * (BRICK_SPACER + BRICK_WIDTH) + BRICK_SPACER/2;
			var brickY = BRICK_Y_OFFSET + (i* (BRICK_SPACER + BRICK_HEIGHT));
			if(i < 2) brick.graphics.beginFill("red").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else if (i < 4) brick.graphics.beginFill("orange").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else if (i < 6) brick.graphics.beginFill("yellow").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else if (i < 8) brick.graphics.beginFill("green").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else brick.graphics.beginFill("cyan").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			stage.addChild(brick);
			stage.update();
			brickCounter++;
		}
	}
	
	//Setup the Paddle
	paddleX = 0;//cX - PADDLE_WIDTH/2;
	paddleY = CANVAS_HEIGHT - PADDLE_Y_OFFSET;
	paddle.graphics.beginFill("black").drawRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
	stage.addChild(paddle);
	
	//Setup the Ball
	var ballX = cX - BALL_RADIUS;
	var ballY = cY + BALL_RADIUS;
	ball.graphics.beginFill("black").drawCircle(ballX, ballY, BALL_RADIUS);
	stage.addChild(ball);
	vy = GRAVITY;
	vx = 0;
	stage.update();
}

function play(nTurns){
	lives = nTurns;
	movePaddle();
	moveBall();
	checkCollision();
}

function movePaddle(){
	var paddleLeftLimit = PADDLE_WIDTH/2;
	var paddleRightLimit = CANVAS_WIDTH - (PADDLE_WIDTH/2);
	
	stage.onMouseMove = function(evt){
		mouseX = evt.stageX;
		
		if (mouseX <= paddleLeftLimit) {
		paddleX = 0;
		} else if (mouseX >= paddleRightLimit) {
			paddleX = CANVAS_WIDTH - PADDLE_WIDTH;
		} else { 
		paddleX = mouseX - PADDLE_WIDTH/2;
		}
			
		paddle.x = paddleX;
		stage.update();
	}
}

function moveBall(){
	ball.regX = cX - BALL_RADIUS;
	ball.regY = cY + BALL_RADIUS;
	ball.y += vy;
	ball.x += vx;
	
	console.log(ball.x + ", " + ball.y);
	stage.update();
}

function checkCollision(){
	//collider = getObjectUnderPoint(ball.x, ball.y);
	
	if (paddle.hitTest(ball.x, ball.y)) {
		vy = -vy;
		vx = Math.random()*3
		console.log("wack");
	}
	if (ball.x < 0 || ball.x > CANVAS_WIDTH) {
		vx = -vx;
	}
	if(ball.y < 0 || ball.y > CANVAS_HEIGHT) {
		vy = -vy;
		vx = Math.random()*3;
	}
}



function gameOver(){
	var dead = false;
	stage.onClick = function(evt) {
		dead = true;
		console.log("clicked to end game");
	}
	return dead;
}