function Boid(){
	this.partnerBoids = [];

	this.positionX = 0;
	this.positionY = 0;

	this.velocityX = 0;
	this.velocityY = 0;
	this.nextVelocityX = 0;
	this.nextVelocityY = 0;
}

Boid.prototype.setPartnerBoids = function(boids){
	this.partnerBoids = boids;
}

Boid.prototype.update = function(){
	this.setVelocity();
	this.setPosition();
}

Boid.prototype.setVelocity = function(){
	var meanPositionX = 0;
	var meanPositionY = 0;
    var meanSpeedX = 0;
    var meanSpeedY = 0;
    var forceDistanceX = 0;
    var forceDistanceY = 0;
    var forcePositionX = 0;
    var forcePositionY = 0;
    var forceSpeedX = 0;
    var forceSpeedY = 0;

    var botCount = 1;
    meanPositionX = this.positionX;
    meanPositionY = this.positionY;
    meanSpeedX = this.velocityX;
    meanSpeedY = this.velocityY;

    for(var i = 0; i < this.partnerBoids.length; i++){
    	if (this.partnerBoids[i] != this)
        {
            var distanceVectorX = this.positionX - this.partnerBoids[i].positionX;
            var distanceVectorY = this.positionY - this.partnerBoids[i].positionY;
            var distance = Math.sqrt(
    	       		Math.pow(distanceVectorX, 2) + Math.pow(distanceVectorY, 2)
            );

            if (distance < SchwarmConstants.MAX_DISTANCE) {
                botCount++;
                meanPositionX += this.partnerBoids[i].positionX;
                meanPositionY += this.partnerBoids[i].positionY;
                meanPositionX += this.partnerBoids[i].velocityX;
                meanPositionY += this.partnerBoids[i].velocityY;

                if (distance > 0) {
                    forceDistanceX += (1.0 / Math.pow(distance, 2)) * distanceVectorX;
                    forceDistanceY += (1.0 / Math.pow(distance, 2)) * distanceVectorY;
                }
            }
        }
    }

    meanPositionX /= botCount;
    meanPositionY /= botCount;
    meanSpeedX /= botCount;
    meanSpeedY /= botCount;

    forcePositionX = meanPositionX - this.positionX;
    forcePositionY = meanPositionY - this.positionY;
    forceSpeedX = meanSpeedX - this.velocityX;
    forceSpeedY = meanSpeedY - this.velocityY;

    this.nextVelocityX = this.velocityX +
        (SchwarmConstants.FACTOR_ENVIRONMENT *
            (
            SchwarmConstants.FACTOR_MEAN_POSITION * forcePositionX +
            SchwarmConstants.FACTOR_MEAN_SPEED * forceSpeedX +
            SchwarmConstants.FACTOR_MEAN_DISTANCE * forceDistanceX
            )
        );
        
    this.nextVelocityY = this.velocityY +
    (SchwarmConstants.FACTOR_ENVIRONMENT *
        (
        SchwarmConstants.FACTOR_MEAN_POSITION * forcePositionY +
        SchwarmConstants.FACTOR_MEAN_SPEED * forceSpeedY +
        SchwarmConstants.FACTOR_MEAN_DISTANCE * forceDistanceY
        )
    );
}

Boid.prototype.setPosition = function(){
	this.velocityX = (this.velocityX + this.nextVelocityX) / 2;
	this.velocityY = (this.velocityY + this.nextVelocityY) / 2;

    this.positionX += this.velocityX;
    this.positionY += this.velocityY;

    if (this.positionX >= SchwarmConstants.MAX_X) {
        this.velocityX *= -1.0;
        this.positionX = SchwarmConstants.MAX_X - 0.01;
    }
    
    if (this.positionX <= SchwarmConstants.MIN_X) {
        this.velocityX *= -1.0;
        this.positionX = SchwarmConstants.MIN_X + 0.01;
    }
        
    if (this.positionY >= SchwarmConstants.MAX_Y) {
        this.velocityY *= -1.0;
        positionY = SchwarmConstants.MAX_Y - 0.01;
    }
        
    if (this.positionY <= SchwarmConstants.MIN_Y) {
    	this.velocityY *= -1.0;
        this.positionY = SchwarmConstants.MIN_Y + 0.01;
    }
}