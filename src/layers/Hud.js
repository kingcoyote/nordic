var cocos = require('cocos2d')
  , geo   = require('geometry')
  , HealthBar = require('/nodes/hud/HealthBar')
  , events = require('events')

function Hud() {
    Hud.superclass.constructor.call(this)

    var screen = cocos.Director.sharedDirector.winSize

    // health bar
    var healthBar = new HealthBar()
    healthBar.position = new geo.Point(10, screen.height - 10)
    this.healthBar = healthBar
    this.addChild(healthBar)


    // minimap
    // inventory
    // money
}

Hud.inherit(cocos.nodes.Layer, {
    onEnter : function() {
        Hud.superclass.onEnter.call(this)

        var self = this

        events.addListener(this.parent, 'player health change', function(current, max) {
            self.healthBar.updateHealth(current, max)
        })
    }
});

module.exports = Hud;

