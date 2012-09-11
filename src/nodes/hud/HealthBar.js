var cocos = require('cocos2d')
  , geo = require('geometry')

function HealthBar() {
    HealthBar.superclass.constructor.call(this)

    var label = new cocos.nodes.Label({ string: "" })
    label.anchorPoint = new geo.Point(0,1)
    this.label = label
    this.addChild(label)
}

HealthBar.inherit(cocos.nodes.Node, {
    updateHealth : function(current, max) {
        this.label.string = "HP: " + current + " / " + max 
    }
})

module.exports = HealthBar

