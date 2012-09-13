var cocos = require('cocos2d')
  , geo = require('geometry')

function HealthBar() {
    HealthBar.superclass.constructor.call(this)

    this.anchorPoint = new geo.Point(0,0)

    var label = new cocos.nodes.Label({ string: "" })
    this.label = label
    this.addChild(label)

    this.contentSize = this.label.contentSize
}

HealthBar.inherit(cocos.nodes.Node, {
    updateHealth : function(current, max) {
        this.label.string = "HP: " + current + " / " + max 
    }
})

module.exports = HealthBar

