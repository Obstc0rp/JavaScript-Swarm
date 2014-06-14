document.onreadystatechange = function(){

	document.getElementById('screen').width = window.innerWidth;
	document.getElementById('screen').height = window.innerHeight;

	if (document.readyState == 'complete') {
		//initialize
		init();

		//parameters
		var boids = [];
		window.onresize = function(){
			//no resize yet
			//resize(boids);
		}

		for(var i = 0; i < SchwarmConstants.NUMBER_OF_BOIDS; i++){
			var boid = new Boid();

			boid.positionX = SchwarmConstants.MAX_X / 2 + ((Math.random() - Math.random()) * (SchwarmConstants.MAX_X * 0.1));
			boid.positionY = SchwarmConstants.MAX_Y / 2 + ((Math.random() - Math.random()) * (SchwarmConstants.MAX_Y * 0.1));

			boid.velocityX = (Math.random() - Math.random()) * 2;
			boid.velocityY = (Math.random() - Math.random()) * 2;

			boids.push(boid);
		}
		for(var i = 0; i < SchwarmConstants.NUMBER_OF_BOIDS; i++){
		
			boids[i].setPartnerBoids(boids);
		}

		//setup and draw

		var canvas = document.getElementById('screen');
		var ctx = canvas.getContext('2d');

		window.setInterval(function(canvas){

			var canvas = document.getElementById('screen');
			var ctx = canvas.getContext('2d');
			update(boids);
			draw(boids, ctx);
			//TODO
					
		}, 1000/30);	// 1000 / 30 = 30 fps
			
		update(boids);
		draw(boids, ctx);
	}
}

function draw(boids, ctx){

	//clear screen
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, SchwarmConstants.MAX_X, SchwarmConstants.MAX_Y);
	ctx.fillStyle = '#000000';

	for(var i = 0; i < boids.length; i++){

		ctx.beginPath();
		ctx.arc(boids[i].positionX, boids[i].positionY, 3, 0, 2*Math.PI);
		ctx.fill();
	}
}

function update(boids){
	for(var i = 0; i < boids.length; i++){
		boids[i].update();
	}
}

function init () {
	
	SchwarmConstants.MAX_X = window.innerWidth;
	SchwarmConstants.MAX_Y = window.innerHeight;
}

function resize(boids){
	//TODO: SchwarmConstants, Boid Position - delta Windows-Size

	document.getElementById('screen').width = window.innerWidth;
	document.getElementById('screen').height = window.innerHeight;

	var oldX = SchwarmConstants.MAX_X;
	var oldY = SchwarmConstants.MAX_Y;
	SchwarmConstants.MAX_X = window.innerWidth;
	SchwarmConstants.MAX_Y = window.innerHeight;

	var deltaX = oldX / 100 * SchwarmConstants.MAX_X / 100;
	var deltaY = oldY / 100 * SchwarmConstants.MAX_Y / 100;

	console.log(oldX + ' : ' + oldY);
	console.log(SchwarmConstants.MAX_X + ' : ' + SchwarmConstants.MAX_Y);
	console.log(deltaX);
	console.log(deltaY);

	for(var i = 0; i < boids.length; i++){
		if(oldX > SchwarmConstants.MAX_X)
			boids[i].positionX -= deltaX;
		else
			boids[i].positionX += deltaX;

		if(oldY > SchwarmConstants.MAX_Y)
			boids[i].positionY -= deltaY;
		else
			boids[i].positionY += deltaY;
		
	}
}