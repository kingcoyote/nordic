var cocos = require('cocos2d')
  , geo   = require('geometry')
  , HealthBar = require('/nodes/hud/HealthBar')

function Hud() {
    Hud.superclass.constructor.call(this)

    var screen = cocos.Director.sharedDirector.winSize

    // health bar
    var health_bar = new HealthBar()
    health_bar.position = new geo.Point(10, screen.height - 10)
    this.addChild(health_bar)

    // minimap
    // inventory
    // money
}

Hud.inherit(cocos.nodes.Layer, {
    
});

module.exports = Hud;

