// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const mEmitter = require('./EmitterClass')
cc.Class({
    extends: cc.Component,

    properties: {
        _interactable: true,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        mEmitter.instance.registerEvent('disable',this.disable.bind(this));
    },

    disable(interactable) {
        // this._interactable = interactable;
        // this.interactable = this._interactable;
        this.node.active = interactable;
    },

    start () {

    },

    clicked() {
        mEmitter.instance.emit('move',true);
        mEmitter.instance.emit('jump',true);
    }

    // update (dt) {},
});
