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
    label.anchorPoint = new geo.Point(0, 0)
    startMenu.contentSize = label.contentSize
    startMenu.addChild(label)
    startMenu.label = label
    startMenu.position = new geo.Point(320, 240)

    var aboutMenu = new cocos.nodes.MenuItem({ callback: function(){ 
        alert("It's a game!")
    }})
    var label = new cocos.nodes.Label({string: 'About'});
    label.anchorPoint = new geo.Point(0, 0)
    aboutMenu.position = new geo.Point(startMenu.contentSize.width + 15, 0)
    aboutMenu.contentSize = label.contentSize
    aboutMenu.addChild(label)
    aboutMenu.label = label
    aboutMenu.position = new geo.Point(320, 200)

    this.menuItems = [
        startMenu,
        aboutMenu
    ]

    var menu = new cocos.nodes.Menu({
        items: this.menuItems
    })

    var self = this

    menu.mouseDown = function(e) {
        for(var i in self.menuItems) {
            if (geo.rectContainsPoint(self.menuItems[i].boundingBox, e.locationInCanvas)) {
                self.menuItems[i].activate()
            }
        }
    }

    menu.anchorPoint = new geo.Point(0,0)
    menu.position = new geo.Point(0, 0)

    this.addChild(menu)

    this.isMouseEnabled = true
}

MenuLayer.inherit(cocos.nodes.Layer)

module.exports = MainMenu;

