var cocos = require('cocos2d')
  , geo   = require('geometry')
  , util  = require('util')

function Player() {
    Player.superclass.constructor.call(this)
    
    this.anchorPoint = new geo.Point(0.5, 0.5);

    var sprite = new cocos.nodes.Sprite({
        file: '/resources/player.png',
        rect: new geo.Rect(0, 0, 16, 16)
    });
    sprite.anchorPoint = (new geo.Point(-0.5, -0.5))

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

