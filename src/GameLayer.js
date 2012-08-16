var cocos = require('cocos2d')
  , geo   = require('geometry')

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function GameLayer () {
    // You must always call the super class constructor
    GameLayer.superclass.constructor.call(this)

    // Get size of canvas
    var s = cocos.Director.sharedDirector.winSize

    // Create label
    var label = new cocos.nodes.Label({ string:   'Cocos2d'
                          , fontName: 'Arial'
                          , fontSize: 76
                          })

    // Position the label in the centre of the view
    label.position = geo.ccp(s.width / 2, s.height / 2)

    // Add label to layer
    this.addChild(label)
}

GameLayer.inherit(cocos.nodes.Layer);

module.exports = GameLayer;

