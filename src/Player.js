var cocos = require('cocos2d')
  , geo   = require('geometry')

function Player() {
    Player.superclass.constructor.call(this)

    this.anchorPoint = geo.ccp(0.5, 0.5)

    var sprite = new cocos.nodes.Sprite({
        file: '/resources/player.png',
        rect: new geo.Rect(0, 0, 16, 16)
    });

    this.addChild({ child:sprite });
    this.contentSize = sprite.contentSize;
    this.sprite = sprite;

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
        var pos = this.position
          , box = this.boundingBox
          , win = cocos.Director.sharedDirector.winSize

        if (this.movement.left && geo.rectGetMinX(box) >= 0) {
            pos.x -= this.speed * dt
        }

        if (this.movement.right && geo.rectGetMaxX(box) <= win.width) {
            pos.x += this.speed * dt
        }

        if (this.movement.up && geo.rectGetMaxY(box) <= win.height) {
            pos.y += this.speed * dt
        }

        if (this.movement.down && geo.rectGetMinY(box) >= 0) {
            pos.y -= this.speed * dt
        }
        pos.x = Math.floor(pos.x);
        pos.y = Math.floor(pos.y);
        this.position = pos
    }
});

module.exports = Player;

