var cocos = require('cocos2d')
  , geo   = require('geometry')
  , Player = require('/Player')

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function GameLayer () {
    // You must always call the super class constructor
    GameLayer.superclass.constructor.call(this)

    var s = cocos.Director.sharedDirector.winSize

    var player = new Player();
    player.position = geo.ccp(s.width / 2, s.height / 2)
    this.addChild({ child:player });

    this.player = player;

    this.isKeyboardEnabled = true;
}

GameLayer.inherit(cocos.nodes.Layer, {
    keyDown : function(e) {
        // 38 = up
        // 40 = down
        // 37 = left
        // 39 = right
    }
});

module.exports = GameLayer;

