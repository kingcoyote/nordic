var cocos = require('cocos2d')
  , geo = require('geometry')
  , Scene = require('/scenes/Scene')


var MainMenu = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()

        setTimeout(function() {
            cocos.Director.sharedDirector.pushScene(Scene.create('Game'))
        }, 2000)

        return scene;
    }
}

module.exports = MainMenu;

