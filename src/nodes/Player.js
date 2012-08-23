var cocos = require('cocos2d')
  , geo   = require('geometry')

function Player() {
    Player.superclass.constructor.call(this)
    
    this.anchorPoint = new geo.Point(0.5, 0.5);

    var sprite = new cocos.nodes.Sprite({
        file: '/resources/player.png',
        rect: new geo.Rect(0, 0, 16, 16)
    });

    sprite.anchorPoint = (new geo.Point(0, 0))
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

        this.position = pos

        if (geo.rectGetMinX(this.boundingBox) < 0) {
            pos.x = this.boundingBox.size.width * this.anchorPoint.x
        }

        if (geo.rectGetMaxX(this.boundingBox) > win.width) {
            pos.x = win.width - this.boundingBox.size.width * this.anchorPoint.x
        }

        if (geo.rectGetMinY(this.boundingBox) < 0) {
            pos.y = this.boundingBox.size.height * this.anchorPoint.y
        }

        if (geo.rectGetMaxY(this.boundingBox) > win.height) {
            pos.y = win.height - this.boundingBox.size.height * this.anchorPoint.y
        }
        
        this.position = pos

        sandbags = this.parent.parent.env.sandbags

        for (var i in sandbags) {
            if (geo.rectOverlapsRect(this.boundingBox, sandbags[i].boundingBox)) {
                // revert position
            }
        }

        this.position = pos
    }
});

module.exports = Player;

