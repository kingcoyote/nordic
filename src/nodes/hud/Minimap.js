var cocos = require('cocos2d')
  , geo = require('geometry')

function Minimap() {
    Minimap.superclass.constructor.call(this)

    this.anchorPoint = new geo.Point(0, 0)

    this.frame = new cocos.nodes.Sprite({
        file : '/resources/minimap.png',
        rect : new geo.Rect(0, 0, 96, 96)
    })
    this.frame.anchorPoint = new geo.Point(0, 0)
    this.contentSize = this.frame.contentSize
    this.addChild(this.frame)
}

Minimap.inherit(cocos.nodes.Node, {})

module.exports = Minimap

