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
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        mEmitter.instance.registerEvent('jump', this.jump.bind(this));
    },

    jump(isClick) {
        if (isClick) {
            mEmitter.instance.emit('disable', false);
            // var jumpUp = cc.moveBy(0.5,0,100);
            // var jumpDown = cc.moveBy(0.5,0,-100);
            cc.tween(this.node)
                .repeat(3,
                    cc.tween(this.node)
                        .by(0.5, { position: cc.v2(0, 100) })
                        .by(0.5, { position: cc.v2(0, -100) })
                        .by(0.5, { angle: 360 })
                        .call(this.talk)
                        .delay(1)
                )
                .call(this.showBtn)
                .start();
            // var rotate = cc.rotateBy(0.5,360);
            // var downrot = cc.sequence(jumpDown,rotate);
            // var spawn = cc.spawn(jumpDown,rotate);
            // var greeting = cc.callFunc(this.talk('Hello World'));
            // var seq = cc.sequence(jumpUp,greeting,spawn);
            // //var seq = cc.sequence(jumpUp,jumpDown,rotate);
            // var rep = cc.repeat(seq,3);
            // var func2 = cc.callFunc(this.showBtn());
            // var final_seq = cc.sequence(rep,func2);
            // this.node.runAction(final_seq,func2, cc.removeSelf());
        }
    },

    talk(msg) {
        cc.log(msg)
    },

    showBtn() {
        mEmitter.instance.emit('disable', true);
        //cc.log('true');
    },

    start() {

    },

    // update (dt) {},
});
