var cocos = require('cocos2d')
  , geo = require('geometry')
  , Player = require('/layers/Player')
  , Environment    = require('/layers/Environment')


var Scene = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , player = new Player()
          , environment    = new Environment('main')

        // Add our layer to the scene
        scene.addChild(player)
        scene.addChild(environment)

        scene.environment = environment;
        scene.player = player;

        scene.playerAllowed = this.playerAllowed

        return scene;
    },
    playerAllowed : function(box) {
        var sandbags = this.environment.getSandbags()
        for (var i in sandbags) {
            if (geo.rectOverlapsRect(sandbags[i].boundingBox, box)) {
                return false;
            }
        }

        return true
    }
}

module.exports = Scene;
