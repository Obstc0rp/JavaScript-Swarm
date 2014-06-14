window.SchwarmConstants = (function(){
	var constants = {
		FACTOR_MEAN_POSITION: 0.05,
		FACTOR_MEAN_SPEED: 0.4,
		FACTOR_MEAN_DISTANCE: 20.0,
		FACTOR_ENVIRONMENT: 0.2,
	
		MAX_DISTANCE: 50,

		MAX_X: window.innerWidth,
		MIN_X: 0,
		MAX_Y: window.innerHeight,
		MIN_Y: 0,

		NUMBER_OF_BOIDS: 100
	}

	return constants;
})()