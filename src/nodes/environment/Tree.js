var cocos = require('cocos2d')
  , geo = require('geometry')

function Tree(params) {
    Tree.superclass.constructor.call(this)

    this.anchorPoint = new geo.Point(0, 0)

    var base = new cocos.nodes.Sprite(this.types[params.type].baseSprite)
    base.anchorPoint = new geo.Point(0, 0)
    base.position = this.types[params.type].baseOffset
    this.addChild(base)

    var tree = new cocos.nodes.Sprite(this.types[params.type].treeSprite)
    tree.anchorPoint = new geo.Point(0, 0)
    tree.position = this.types[params.type].treeOffset
    
    this.sky = [tree]
}


Tree.inherit(cocos.nodes.Node, {
    types : {
        1 : {

        },
        2: {

        },
        3: {
            baseSprite : { file:'/resources/trees.png', rect: new geo.Rect(125, 114, 23, 14) },
            baseOffset : new geo.Point(17, 0),
            treeSprite : { file:'/resources/trees.png', rect: new geo.Rect(108, 18, 57, 96) },
            treeOffset : new geo.Point(0, 14) 
        }
    }
})

module.exports = Tree
