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
       
    },

    // LIFE-CYCLE CALLBACKS:

    move(isClick) {
        if(isClick === true) {
            // var action = cc.moveBy(5,400,0);
            // this.node.runAction(action);
            cc.tween(this.node)
            .by(5,{position: cc.v2(400,0)})
            .start();
        }
    },

    stop(isClick) {
        if(isClick) {
            this.node.stopAllActions();
            cc.log('Run');
        }
    },

    clicked() {
        this.move(true);
    },

    onLoad () {
        //mEmitter.instance = new mEmitter;
        mEmitter.instance.registerEvent('move',this.move.bind(this));
        mEmitter.instance.registerEvent('stop',this.stop.bind(this));
        //this.node.on('mousedown',this.clicked.bind(this));
    },

    start () {

    },

    // update (dt) {},
});
