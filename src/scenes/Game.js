var cocos = require('cocos2d')
  , Player = require('/layers/Player')

var Scene = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , player = new Player()

        // Add our layer to the scene
        scene.addChild(player)

        return scene;
    }
}

module.exports = Scene;
