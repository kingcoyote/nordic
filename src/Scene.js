var cocos = require('cocos2d')
  , GameLayer = require('/GameLayer')

var Scene = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , layer = new GameLayer()

        // Add our layer to the scene
        scene.addChild(layer)

        return scene;
    }
}

module.exports = Scene;
