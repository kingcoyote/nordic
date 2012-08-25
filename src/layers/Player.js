var cocos = require('cocos2d')
  , geo   = require('geometry')
  , Player = require('/nodes/Player')

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function Layer () {
    // You must always call the super class constructor
    Layer.superclass.constructor.call(this)

    var player = new Player()
    player.position = new geo.Point(250,250)
    this.addChild({ child:player })
    this.player = player

    this.isKeyboardEnabled = true
    this.isMouseEnabled = true

    this.scheduleUpdate()
}

Layer.inherit(cocos.nodes.Layer, {
    keyDown : function(e) {
        var v = this.player.velocity
        switch (e.which) {
            case 87: // w
                v.y += 1
                break;
            case 83: // s
                v.y -= 1
                break;
            case 65: // a
                v.x -= 1
                break;
            case 68: // d
                v.x += 1
                break;
        }

        this.player.velocity = v
    },
    keyUp : function(e) {
        var v = this.player.velocity
        switch (e.which) {
            case 87: // w
                v.y -= 1
                break;
            case 83: // s
                v.y += 1
                break;
            case 65: // a
                v.x += 1
                break;
            case 68: // d
                v.x -= 1
                break;
        }

        this.player.velocity = v
    },
    update : function(dt) {
        this.player.position.x += this.player.velocity.x * this.player.speed * dt
        this.player.position.y += this.player.velocity.y * this.player.speed * dt
    }
});

module.exports = Layer;

