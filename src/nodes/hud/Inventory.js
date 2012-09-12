var cocos = require('cocos2d')
  , geo = require('geometry')

function Inventory() {
    Inventory.superclass.constructor.call(this)

    var label = new cocos.nodes.Label({ string:"Inventory : empty" })
    label.anchorPoint = new geo.Point(0,0)
    this.label = label
    this.addChild(this.label)
}

Inventory.inherit(cocos.nodes.Node, {})

module.exports = Inventory
