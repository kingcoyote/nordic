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
        scene.updatePlayerPosition = this.updatePlayerPosition;

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
    },
    updatePlayerPosition : function(player) {
        var screen = cocos.Director.sharedDirector.winSize
          , buffer = 80
          , deadzone = new geo.Rect(buffer, buffer, screen.width - buffer*2, screen.height - buffer*2)

        if (! geo.rectOverlapsRect(player, deadzone)) {
            var x = y = 0

            if (geo.rectGetMinX(player) < geo.rectGetMinX(deadzone)) {
                x = geo.rectGetMinX(deadzone) - geo.rectGetMinX(player)
                x = -2
            } else if (geo.rectGetMaxX(player) < geo.rectGetMaxX(deadzone)) {
                x = geo.rectGetMaxX(player) - geo.rectGetMaxX(deadzone)
                x = 2
            }


            this.environment.adjustOffset(x, y)
            this.player.adjustOffset(x, y)
        }
    }
}

module.exports = Scene;
