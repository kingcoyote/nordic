var cocos = require('cocos2d')
  , geo   = require('geometry')
  , HealthBar = require('/nodes/hud/HealthBar')
  , Inventory = require('/nodes/hud/Inventory')
  , events = require('events')

function Hud() {
    Hud.superclass.constructor.call(this)

    var screen = cocos.Director.sharedDirector.winSize

    // health bar
    var healthBar = new HealthBar()
    healthBar.position = new geo.Point(10, screen.height - 10)
    this.healthBar = healthBar
    this.addChild(this.healthBar)


    // minimap
    
    // inventory
    var inventory = new Inventory()
    inventory.position = new geo.Point(10, 10)
    this.inventory = inventory
    this.addChild(this.inventory)

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

