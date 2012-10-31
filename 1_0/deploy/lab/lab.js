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
	var NTURNS = 3;
	var GRAVITY = 15;
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
	var brick = [];
	var paddle = new createjs.Shape();
	var ball = new createjs.Shape();
	var wall = new createjs.Shape();
	var ceiling = new createjs.Shape();
	var bottom = new createjs.Shape();
	var collider = new createjs.Shape();

function init() {
	// create a new stage and point it at our canvas:
	stage = new createjs.Stage("breakOut");
	
	//Setup the game objects. 
	setup();
	
	createjs.Ticker.setFPS(30);
	createjs.Ticker.addListener(window);
}

function tick() {
	movePaddle();
	moveBall();
	checkCollision();
	checkBrickCollision();
	stage.update();
	}

function movePaddle(){
	var paddleLeftLimit = PADDLE_WIDTH*.5;
	var paddleRightLimit = CANVAS_WIDTH - (PADDLE_WIDTH*.5);
		
	if (stage.mouseX <= paddleLeftLimit) {
		paddle.x = PADDLE_WIDTH*.5;
	} else if (stage.mouseX >= paddleRightLimit) {
		paddle.x = CANVAS_WIDTH - PADDLE_WIDTH*.5;
	} else { 
		paddle.x += (stage.mouseX - paddle.x)*.5;
	}
}

function moveBall(){
	ball.y += vy;
	ball.x += vx;
	//console.log(ball.x + ", " + ball.y);
}

function checkCollision(){
	var pt = ball.localToLocal(0, 0, paddle);
	
	if (paddle.hitTest(pt.x, pt.y)) {
		vy = -vy;
		vx = Math.random()*5
		if (Math.random() >= .5) vx = -vx;
		//console.log("wack");
	}
	if (ball.x < 0 || ball.x > CANVAS_WIDTH) {
		vx = -vx;
	}
	if(ball.y < 0 || ball.y > CANVAS_HEIGHT) {
		vy = -vy;
		vx = Math.random()*5;
		if (Math.random() >= .5) vx = -vx;
	}	
}

function checkBrickCollision(){
	//var pt = ball.localToLocal(0, 0, brick);
	
	var ballTop = ball.y - BALL_RADIUS - 1;
	var ballBottom = ball.y + BALL_RADIUS + 1;
	var ballLeft = ball.x - BALL_RADIUS - 1;
	var ballRight = ball.x + BALL_RADIUS + 1;
	
	collider = stage.getObjectUnderPoint(ball.x, ballTop);
	
	if(collider != null && collider != paddle) {
		vy = -vy;
		vx = Math.random()*5;
		if (Math.random() >= .5) vx = -vx;
	
		brickCounter--;
		console.log("BRICK HIT" + collider.name);
		stage.removeChild(collider);
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

function setup(){
	//Setup the Bricks
	brickCounter = 0;  
	for(var i = 0; i < N_ROWS; i++){
		for(var j = 0; j < N_COLUMNS; j++){
			var brickX = j * (BRICK_SPACER + BRICK_WIDTH) + BRICK_SPACER/2;
			var brickY = BRICK_Y_OFFSET + (i* (BRICK_SPACER + BRICK_HEIGHT));
			brick[brickCounter] = new createjs.Shape();
			if(i < 2) brick[brickCounter].graphics.beginFill("red").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else if (i < 4) brick[brickCounter].graphics.beginFill("orange").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else if (i < 6) brick[brickCounter].graphics.beginFill("yellow").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else if (i < 8) brick[brickCounter].graphics.beginFill("green").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			else brick[brickCounter].graphics.beginFill("cyan").drawRect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
			stage.addChild(brick[brickCounter]);
			brickCounter++;
		}
	}
	
	//Setup the Paddle
	paddleX = 0;//cX - PADDLE_WIDTH/2;
	paddleY = CANVAS_HEIGHT - PADDLE_Y_OFFSET;
	paddle.regX = PADDLE_WIDTH * .5;
	paddle.regY = PADDLE_HEIGHT * .5;
	paddle.graphics.beginFill("black").drawRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
	stage.addChild(paddle);
	
	//Setup the Ball
	ball.graphics.beginFill("black").drawCircle( 0, 0, BALL_RADIUS);
	ball.x = cX - BALL_RADIUS;
	ball.y = cY + BALL_RADIUS;
	ball.name = "ball";
	stage.addChild(ball);
	vy = GRAVITY;
	vx = 0;
	
	//Initialize the number of lives
	lives = NTURNS
}