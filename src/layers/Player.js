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

    var s = cocos.Director.sharedDirector.winSize

    var player = new Player();
    player.position = geo.ccp(s.width / 2, s.height / 2)
    this.addChild({ child:player });

    this.player = player;

    this.isKeyboardEnabled = true;
}

Layer.inherit(cocos.nodes.Layer, {
    keyDown : function(e) {
        switch (e.which) {
            case 38:
                this.player.movement.up = true;
                break;
            case 40:
                this.player.movement.down = true;
                break;
            case 37:
                this.player.movement.left = true;
                break;
            case 39:
                this.player.movement.right = true;
                break;
        }
    },
    keyUp : function(e) {
        switch (e.which) {
            case 38:
                this.player.movement.up = false;
                break;
            case 40:
                this.player.movement.down = false;
                break;
            case 37:
                this.player.movement.left = false;
                break;
            case 39:
                this.player.movement.right = false;
                break;
        }
    }
});

module.exports = Layer;
