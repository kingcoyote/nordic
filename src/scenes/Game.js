var cocos = require('cocos2d')
  , Player = require('/layers/Player')
  , Env    = require('/layers/Environment')

var Director = {
    
}

var Scene = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , player = new Player()
          , env    = new Env('main')

        var director = Director
        this.director = director

        env.director = director
        player.director = director

        // Add our layer to the scene
        scene.addChild(player)
        scene.addChild(env)

        scene.env = env;
        scene.player = player;

        return scene;
    }
}

module.exports = Scene;
