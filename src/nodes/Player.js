var cocos = require('cocos2d')
  , geo   = require('geometry')
  , util  = require('util')

function Player() {
    Player.superclass.constructor.call(this)
    
    this.texture = new cocos.Texture2D({ file: "/resources/player.png" })
    this.sprite = new cocos.nodes.Sprite();
    this.addChild({ child:this.sprite});
    this.sprite.anchorPoint = new geo.Point(0, 0)
    this.setAnimation('standingDown')

    this.anchorPoint = new geo.Point(0.5, 0.5);
    this.speed = 70;
    this.movement = { 
        up    : false,
        down  : false,
        left  : false,
        right : false
    };
    this.scheduleUpdate();
}

Player.inherit(cocos.nodes.Node, {
    update: function(dt) {
        var box 
          , win = cocos.Director.sharedDirector.winSize
          , vel = new geo.Point(0, 0)

        if (this.movement.left) {
            vel.x -= this.speed * dt
        }

        if (this.movement.right) {
            vel.x += this.speed * dt
        }

        if (this.movement.up) {
            vel.y += this.speed * dt
        }

        if (this.movement.down) {
            vel.y -= this.speed * dt
        }

        sandbags = this.parent.parent.env.sandbags

        box = new geo.Rect(this.position.x, this.position.y, 28, 28)
        box.origin.x += vel.x

        // check if i can move left/right
        for (var i in sandbags) {
            if (geo.rectOverlapsRect(box, sandbags[i].boundingBox)) {
                // cannot move that way
                vel.x = 0
            }
        }
        
        box = new geo.Rect(this.position.x, this.position.y, 28, 28)
        box.origin.y += vel.y

        // check if i can move up/down
        for (var i in sandbags) {
            if (geo.rectOverlapsRect(box, sandbags[i].boundingBox)) {
                // cannot move that way
                vel.y = 0
            }
        }

        if (vel.y == 0 && vel.x == 0) animationName = 'stop'
        if (vel.y < 0) animationName = 'walkingDown'
        if (vel.y > 0) animationName = 'walkingUp'
        if (vel.x > 0) animationName = 'walkingRight'
        if (vel.x < 0) animationName = 'walkingLeft'

        this.setAnimation(animationName)

        this.position.x += vel.x
        this.position.y += vel.y
    }
});

Player.prototype.setAnimation = function setAnimation(animationName) {
    if (animationName == 'stop') {
        switch (this.animationName) {
            case 'walkingUp':
                animationName = 'standingUp';
                break;
            case 'walkingLeft':
                animationName = 'standingLeft';
                break;
            case 'walkingRight':
                animationName = 'standingRight';
                break;
            default:
                animationName = 'standingDown';
                break;
        }
    }

    if (this.animationName == animationName) return false

    var animationData = this.animation[animationName]
    var animFrames = [];

    this.animationName = animationName

    for (var i in animationData.frames) {
        animFrames.push(new cocos.SpriteFrame({
            texture: this.texture, 
            rect: geo.rectMake(
                this.frameSize.width * animationData.frames[i][0], 
                this.frameSize.height * animationData.frames[i][1], 
                this.frameSize.width, 
                this.frameSize.height
            )
        }))
    }

    var animation = new cocos.Animation({frames: animFrames, delay: 0.075})
      , animate   = new cocos.actions.Animate({animation: animation, restoreOriginalFrame: false})
      , seq       = new cocos.actions.Sequence({
            actions: [
                new cocos.actions.FlipX({ flipX: animationData.mirror }),
                animate
            ]
        })
    
    this.sprite.runAction(new cocos.actions.RepeatForever(seq));
}

Player.prototype.frameSize = new geo.Size(30, 29)

Player.prototype.animation = {
    'standingDown'    : {frames:[[0,0]], mirror:false},
    'walkingDown'     : {frames:[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0],[9,0],[10,0]], mirror:false},
    'standingUp'    : {frames:[[0,1]], mirror:false},
    'walkingUp'     : {frames:[[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1]], mirror:false},
    'standingLeft'    : {frames:[[0,1]], mirror:false},
    'walkingLeft'     : {frames:[[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2]], mirror:false},
    'standingRight'    : {frames:[[0,1]], mirror:true},
    'walkingRight'     : {frames:[[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2]], mirror:true},
}

module.exports = Player;

