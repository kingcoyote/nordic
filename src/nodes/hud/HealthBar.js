var cocos = require('cocos2d')
  , geo = require('geometry')

function HealthBar() {
    HealthBar.superclass.constructor.call(this)

    this.current = 10;
    this.max = 10;

    var label = new cocos.nodes.Label({ string: "HP: " + this.current + " / " + this.max })
    label.anchorPoint = new geo.Point(0,1)
    this.label = label
    this.addChild(label)
}

HealthBar.inherit(cocos.nodes.Node, {})

module.exports = HealthBar

