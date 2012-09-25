var cocos = require('cocos2d')
  , geo = require('geometry')
  , Scene = require('/scenes/Scene')


var MainMenu = {
    create : function() {
        // Create a scene and layer
        var scene = new cocos.nodes.Scene()

        scene.addChild(new MenuLayer())

        return scene;
    }
}

var MenuLayer = function() {
    MenuLayer.superclass.constructor.call(this)

    var startMenu = new cocos.nodes.MenuItem({ callback: function(){ 
        cocos.Director.sharedDirector.pushScene(Scene.create('Game')); 
    }})
    var label = new cocos.nodes.Label({string: 'Start'});
    startMenu.contentSize = label.contentSize
    startMenu.addChild(label)

    this.menuItems = [
        startMenu
    ]

    var menu = new cocos.nodes.Menu({
        items: this.menuItems
    })

    menu.mouseDown = function(e) {
        this.children[e.button].activate()
    }

    menu.anchorPoint = new geo.Point(0,0)

    this.addChild(menu)

    this.isMouseEnabled = true
}

MenuLayer.inherit(cocos.nodes.Layer)

module.exports = MainMenu;

