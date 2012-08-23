var cocos = require('cocos2d')
  , geo   = require('geometry')
  , Zones = require('/zones/Zones')

function Layer(zone) {
    Layer.superclass.constructor.call(this)

    this.zone = Zones[zone]

    this.sandbags = []

    for (var i in this.zone.items) {
        var item = this.zone.items[i]
        var node = new cocos.nodes.Node
        var sprite = new cocos.nodes.Sprite({
            'file' : item.image,
            'rect' : new geo.Rect(0, 0, item.size.width, item.size.height)
        })
        sprite.anchorPoint = new geo.Point(0, 0)
        node.addChild({ child:sprite })
        node.contentSize = sprite.contentSize
        node.position = new geo.Point(item.position.x, item.position.y)
        this.addChild({ child:node })
        
        var sandbag = new cocos.nodes.Node()
        sandbag.position = new geo.Point(item.position.x, item.position.y)
        sandbag.contentSize = new geo.Size(item.size.width, item.size.height)

        this.sandbags.push(sandbag)
        this.addChild({ child:sandbag })
    }
}

Layer.inherit(cocos.nodes.Layer, {

})

module.exports = Layer