var cocos = require('cocos2d')
  , geo   = require('geometry')

function Player() {
    Player.superclass.constructor.call(this)

    this.anchorPoint = geo.ccp(0.5, 0.5)

    var sprite = new cocos.nodes.Sprite({
        file: '/resources/player.png',
        rect: new geo.Rect(0, 0, 16, 16)
    });

    this.addChild({ child:sprite });
    this.contentSize = sprite.contentSize;
    this.sprite = sprite;
}

Player.inherit(cocos.nodes.Node);

module.exports = Player;

