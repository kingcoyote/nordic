var cocos = require('cocos2d')
  , geo   = require('geometry')
  , util  = require('util')

function Player() {
    Player.superclass.constructor.call(this)
    
    this.texture = new cocos.Texture2D({ file: "/resources/player.png" })
    this.sprite = new cocos.nodes.Sprite({
        rect: new geo.Rect(0, 0, this.frameSize.width, this.frameSize.height)
    });
    this.addChild({ child:this.sprite});
    this.sprite.anchorPoint = new geo.Point(0,0);
    this.contentSize = this.sprite.contentSize;
    this.setAnimation('standingDown')

    this.speed = 70;
    this.velocity = new geo.Point(0,0)
    this.scheduleUpdate();
}

Player.inherit(cocos.nodes.Node, {
    update: function(dt) {
        var vel = this.velocity 

        if (vel.y == 0 && vel.x == 0) animationName = 'stop'
        if (vel.y < 0) animationName = 'walkingDown'
        if (vel.y > 0) animationName = 'walkingUp'
        if (vel.x > 0) animationName = 'walkingRight'
        if (vel.x < 0) animationName = 'walkingLeft'

        this.setAnimation(animationName)

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
            case 'walkingDown':
                animationName = 'standingDown';
                break;
            default:
                animationName = this.animationName;
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

    var animation = new cocos.Animation({frames: animFrames, delay: animationData.speed})
      , animate   = new cocos.actions.Animate({animation: animation, restoreOriginalFrame: false})
      , seq       = new cocos.actions.Sequence({
            actions: [
                animate
            ]
        })
    
    if (animationData.mirror) {
        this.sprite.anchorPoint = new geo.Point(1, 0)
        this.sprite.scaleX = -1
    } else {
        this.sprite.scaleX = 1
        this.sprite.anchorPoint = new geo.Point(0, 0)
    }

    this.sprite.runAction(new cocos.actions.RepeatForever(seq));
}

Player.prototype.frameSize = new geo.Size(26.5, 30)

Player.prototype.animation = {
    'standingDown'    : {frames:[[0,0]], speed:0.075},
    'walkingDown'     : {frames:[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0]], speed:0.075},
    'standingUp'    : {frames:[[0,1]], speed:0.075},
    'walkingUp'     : {frames:[[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]], speed:0.075},
    'standingLeft'    : {frames:[[0,2]], speed:0.075},
    'walkingLeft'     : {frames:[[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]], speed:0.05},
    'standingRight'    : {frames:[[0,2]], mirror:true, speed:0.075 },
    'walkingRight'     : {frames:[[1,2],[2,2],[3,2],[4,2],[5,2],[6,2],[7,2]], mirror:true, speed:0.075},
}

module.exports = Player;

