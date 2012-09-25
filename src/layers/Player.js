var cocos = require('cocos2d')
  , geo   = require('geometry')
  , Player = require('/nodes/Player')
  , util = require('util')
  , events = require('events')

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function Layer () {
    // You must always call the super class constructor
    Layer.superclass.constructor.call(this)

    var player = new Player()
    this.addChild({ child:player, z:1 })
    this.player = player

    this.currentHealth = 10
    this.maxHealth = 10
    this.healthChanged = true

    this.isKeyboardEnabled = true
    this.isMouseEnabled = true

    this.movement = {
        up : false,
        down : false,
        left : false,
        right : false
    }

    this.scheduleUpdate()
}

Layer.inherit(cocos.nodes.Layer, {
    onEnter : function() {
        Layer.superclass.onEnter.call(this)
        events.trigger(this.parent, "player health change", this.currentHealth, this.maxHealth)
    },
    keyDown : function(e) {
        switch (e.which) {
            case 87: // w
                this.movement.up = true
                break;
            case 83: // s
                this.movement.down = true
                break;
            case 65: // a
                this.movement.left = true
                break;
            case 68: // d
                this.movement.right = true
                break;
        }
    },
    keyUp : function(e) {
        switch (e.which) {
            case 87: // w
                this.movement.up = false
                break;
            case 83: // s
                this.movement.down = false
                break;
            case 65: // a
                this.movement.left = false
                break;
            case 68: // d
                this.movement.right = false
                break;
        }
    },
    update : function(dt) {
        this.updatePosition(dt)
        this.updateHealth()
    },
    updatePosition : function(dt) {
        var box = new geo.Rect(
                this.player.position.x,
                this.player.position.y,
                this.player.contentSize.width,
                this.player.contentSize.height
            )
          , vel = new geo.Point(0, 0)
          , tempBox = util.copy(box)

        if (this.movement.up) vel.y += 1
        if (this.movement.down) vel.y -= 1
        if (this.movement.left) vel.x -= 1
        if (this.movement.right) vel.x += 1

        tempBox.origin.x += vel.x * this.player.speed * dt
        tempBox.origin.y += vel.y * this.player.speed * dt

        if (this.parent.playerAllowed(tempBox)) {
            var pos = util.copy(this.player.position)
            pos.x += vel.x * this.player.speed * dt
            pos.y += vel.y * this.player.speed * dt
            this.player.velocity = vel
            this.player.position = pos
            this.parent.updatePlayerPosition(this.player.boundingBox)
            return
        }

        tempBox = util.copy(box)
        tempBox.origin.x += vel.x * this.player.speed * dt

        if (this.parent.playerAllowed(tempBox)) {
            var pos = util.copy(this.player.position)
            pos.x += vel.x * this.player.speed * dt
            vel.y = 0
            this.player.velocity = vel
            this.player.position = pos
            this.parent.updatePlayerPosition(this.player.boundingBox)
            return
        }

        tempBox = util.copy(box)
        tempBox.origin.y += vel.y * this.player.speed * dt

        if (this.parent.playerAllowed(tempBox)) {
            var pos = util.copy(this.player.position)
            pos.y += vel.y * this.player.speed * dt
            vel.x = 0
            this.player.velocity = vel
            this.player.position = pos
            this.parent.updatePlayerPosition(this.player.boundingBox)
            return
        }

        vel.y = 0
        vel.x = 0
        this.player.velocity = vel

        this.parent.updatePlayerPosition(this.player.boundingBox)

        return
    },
    updateHealth : function() {
        if (this.healthChanged === true) {
            events.trigger(this.parent, "player health change", this.currentHealth, this.maxHealth)
            this.healthChanged = false
        }
    },
    adjustOffset : function(x, y) {
        var pos = this.player.position

        pos.x -= x
        pos.y -= y

        this.player.position = pos
    },
    setPosition : function(pos) {
        var pos = new geo.Point(pos.x, pos.y)
        this.player.position = pos
    }
});

module.exports = Layer;

