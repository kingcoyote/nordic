var cocos = require('cocos2d')
  , geo   = require('geometry')
  , util  = require('util')

function Player() {
    Player.superclass.constructor.call(this)
    
    var frameSize = new geo.Size(30,30)

    // begin aniatmion

    var texture = new cocos.Texture2D({file: "/resources/player.png"});

    var frame0 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 0, 0, frameSize.width, frameSize.height)})
      , frame1 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 1, 0, frameSize.width, frameSize.height)})
      , frame2 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 2, 0, frameSize.width, frameSize.height)})
      , frame3 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 3, 0, frameSize.width, frameSize.height)})
      , frame4 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 4, 0, frameSize.width, frameSize.height)})
      , frame5 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 5, 0, frameSize.width, frameSize.height)})
      , frame6 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 6, 0, frameSize.width, frameSize.height)})
      , frame7 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 7, 0, frameSize.width, frameSize.height)})
      , frame8 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 8, 0, frameSize.width, frameSize.height)})
      , frame9 = new cocos.SpriteFrame({texture: texture, rect: geo.rectMake(frameSize.width * 3 + frameSize.width * 9, 0, frameSize.width, frameSize.height)})

    var sprite = new cocos.nodes.Sprite({frame: frame0});
    this.addChild(sprite);

    var animFrames = [
        frame0,
        frame1,
        frame2,
        frame3,
        frame4,
        frame5,
        frame6,
        frame7,
        frame8,
        frame9
    ];

    var animation = new cocos.Animation({frames: animFrames, delay: 0.1})
      , animate   = new cocos.actions.Animate({animation: animation, restoreOriginalFrame: false})
      , seq       = new cocos.actions.Sequence({
            actions: [
                animate
            ]
        })

    sprite.runAction(new cocos.actions.RepeatForever(seq));

    // end animation

    this.anchorPoint = new geo.Point(0.5, 0.5);
    this.speed = 180;
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
        var pos = util.copy(this.position)
          , win = cocos.Director.sharedDirector.winSize

        if (this.movement.left) {
            pos.x -= this.speed * dt
        }

        if (this.movement.right) {
            pos.x += this.speed * dt
        }

        if (this.movement.up) {
            pos.y += this.speed * dt
        }

        if (this.movement.down) {
            pos.y -= this.speed * dt
        }

        var box = new geo.Rect(pos.x, pos.y, this.contentSize.width, this.contentSize.height)

        if (geo.rectGetMinX(box) < 0) {
            return false;
        }

        if (geo.rectGetMaxX(box) > win.width) {
            return false;
        }

        if (geo.rectGetMinY(box) < 0) {
            return false;
        }

        if (geo.rectGetMaxY(box) > win.height) {
            return false;
        }
        
        sandbags = this.parent.parent.env.sandbags

        for (var i in sandbags) {
            if (geo.rectOverlapsRect(box, sandbags[i].boundingBox)) {
                return false;
            }
        }

        this.position = pos
    }
});

module.exports = Player;

