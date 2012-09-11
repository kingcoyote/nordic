var cocos = require('cocos2d')
  , geo = require('geometry')
  , Player = require('/layers/Player')
  , Environment    = require('/layers/Environment')
  , Hud = require('/layers/Hud')


var Scene = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()
          , player = new Player()
          , environment    = new Environment('main')
          , hud = new Hud()

        // Add our layer to the scene
        scene.addChild({ child:environment, z: -1})
        scene.addChild({ child:player, z: 5})
        scene.addChild({ child:hud, z: 999999 })

        scene.environment = environment;
        scene.player = player;

        scene.player.setPosition(scene.environment.getPosition('default'))

        scene.playerAllowed = this.playerAllowed
        scene.updatePlayerPosition = this.updatePlayerPosition
        scene.getPlayerStartPoint = this.getPlayerStartPoint
        scene.changeZones = this.changeZones

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
        
        var doors = this.environment.getDoors();
        for (var i in doors) {
            var d = doors[i];

            if (geo.rectOverlapsRect(d.rect, player)) {
                this.changeZones(d.zone, d.name)
            }
        }
    },
    changeZones: function(zone, name) {
        this.removeChild(this.environment);
        this.environment = new Environment(zone);
        this.addChild({ child:this.environment, z:-1 });
        this.player.setPosition(this.environment.getPosition(name))
    },
}

module.exports = Scene;
