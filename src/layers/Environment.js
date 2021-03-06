var cocos = require('cocos2d')
  , geo   = require('geometry')
  , Zones = require('/zones/Zones')
  , util  = require('util')

function Layer(zone) {
    Layer.superclass.constructor.call(this)

    this.zone = Zones[zone]

    this.sandbags = []
    this.doors = []
}


Layer.inherit(cocos.nodes.Layer, {
    onEnter : function() {
        Layer.superclass.onEnter.call(this)

        for (var i in this.zone.items) {
            var item = this.zone.items[i]
            switch (item.type) {
                case 'sprite':
                    var node = new cocos.nodes.Node
                    var sprite = new cocos.nodes.Sprite({
                        'file' : item.image,
                        'rect' : new geo.Rect(0, 0, item.size.width, item.size.height)
                    })
                    sprite.anchorPoint = new geo.Point(0, 0)
                    node.addChild({ child:sprite })
                    node.contentSize = sprite.contentSize
                    node.position = new geo.Point(item.position.x, item.position.y)
                    this.addChild({ child:node, z:item.z })
                    
                    var box = node.boundingBox

                    if(item.sandbag === true) {
                        var sandbag = new geo.Rect(box.origin.x, box.origin.y, box.size.width, box.size.height)
                        this.sandbags.push(sandbag)
                    } else if (typeof item.sandbag === 'object') {
                        for(var i in item.sandbag) {
                            var s = item.sandbag[i]
                              , sandbag = new geo.Rect(
                                    box.origin.x + s.x,
                                    box.origin.y + s.y,
                                    s.width,
                                    s.height
                                )
                            this.sandbags.push(sandbag)
                        }
                    }
                    break;
                case 'node':
                    node = require('/nodes/' + item.node)
                    node = new node(item.params)
                    node.position = item.position
                    this.addChild({ child:node, z:item.z })
                    var box = node.boundingBox
                    for(var i in node.sandbags) {
                        var s = node.sandbags[i]
                          , sandbag = new geo.Rect(
                                box.origin.x + s.origin.x,
                                box.origin.y + s.origin.y,
                                s.size.width,
                                s.size.height
                            )
                        this.sandbags.push(sandbag)
                    }
                    for(var i in node.sky) {
                        var new_pos = util.copy(node.position)
                          , sprite = node.sky[i]

                        new_pos.x += sprite.position.x
                        new_pos.y += sprite.position.y 
                        sprite.position = new_pos

                        this.parent.addToSky(sprite)
                    }
                    break;
            }
        }

        for (var i in this.zone.doors) {
            var door = this.zone.doors[i];
            this.doors.push({
                rect: new geo.Rect(door.x, door.y, door.width, door.height),
                zone: door.zone,
                name: door.name
            })
        }

        this.position = new geo.Point(this.zone.position.x, this.zone.position.y);

    },
    getSandbags : function() {
        var sandbags = [];

        for (var i in this.sandbags) {
            var s = util.copy(this.sandbags[i])
              , pos = s.origin

            pos.x += this.position.x
            pos.y += this.position.y

            s.origin = pos

            sandbags.push(s)
        }

        return sandbags
    },
    getDoors : function() {
        var doors = [];

        for (var i in this.doors) {
            var s = util.copy(this.doors[i])
              , pos = s.rect.origin

            pos.x += this.position.x
            pos.y += this.position.y

            s.rect.origin = pos

            doors.push(s)
        }

        return doors
    },
    adjustOffset : function(x, y) {
        var pos = this.position

        pos.x -= x
        pos.y -= y

        this.position = pos
    },
    getPosition : function(name) {
        return this.zone.startPoint[name]
    },
    scrollable : function() {
        return this.zone.scrollable !== false
    }
})

module.exports = Layer
