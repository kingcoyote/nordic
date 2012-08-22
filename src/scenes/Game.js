var cocos = require('cocos2d')
  , Player = require('/layers/Player')
  , Env    = require('/layers/Environment')

var Scene = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , player = new Player()
          , env    = new Env('main')

        // Add our layer to the scene
        scene.addChild(player)
        scene.addChild(env)

        return scene;
    }
}

module.exports = Scene;
