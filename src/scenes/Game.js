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
        scene.addChild(environment)
        scene.addChild(player)

        scene.environment = environment;
        scene.player = player;

        scene.playerAllowed = this.playerAllowed
        scene.updatePlayerPosition = this.updatePlayerPosition
        scene.getPlayerStartPoint = this.getPlayerStartPoint

        return scene;
    },
    playerAllowed : function(box) {
        var sandbags = this.environment.getSandbags()
        for (var i in sandbags) {
            if (geo.rectOverlapsRect(sandbags[i], box)) {
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

            if (geo.rectGetMaxX(player) < geo.rectGetMinX(deadzone)) {
                // left
                x = geo.rectGetMaxX(player) - geo.rectGetMinX(deadzone)
            } else if (geo.rectGetMinX(player) > geo.rectGetMaxX(deadzone)) {
                // right
                x = geo.rectGetMinX(player) - geo.rectGetMaxX(deadzone)
            }

            if (geo.rectGetMaxY(player) < geo.rectGetMinY(deadzone)) {
                // bottom
                y = geo.rectGetMaxY(player) - geo.rectGetMinY(deadzone)
            } else if (geo.rectGetMinY(player) > geo.rectGetMaxY(deadzone)) {
                // top
                y = geo.rectGetMinY(player) - geo.rectGetMaxY(deadzone)
            }


            this.environment.adjustOffset(x, y)
            this.player.adjustOffset(x, y)
        }
    },
    getPlayerStartPoint : function() {
        return this.environment.getPlayerStartPoint()
    }
}

module.exports = Scene;
