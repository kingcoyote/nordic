var cocos = require('cocos2d')

var Scene = function() {

}

Scene.create = function(name) {
    return require('/scenes/' + name).create()
}

module.exports = Scene
