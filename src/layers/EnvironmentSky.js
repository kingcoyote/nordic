var cocos = require('cocos2d')
  , geo = require('geometry')

function EnvironmentSky() {
    EnvironmentSky.superclass.constructor.call(this)
}

EnvironmentSky.inherit(cocos.nodes.Layer, {
    addSprite : function(sprite) {
        this.addChild(sprite)
    },
    adjustOffset : function(x, y) {
        var pos = this.position

        pos.x -= x
        pos.y -= y

        this.position = pos
    },

})

module.exports = EnvironmentSky
