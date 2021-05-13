// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { instance } = require("../BunnyScript/EmitterClass");

cc.Class({
    extends: cc.Component,

    properties: {
        number: cc.Label,
        title: cc.Label,
        btnSubmit: cc.Button,
        _value: {
            default: 0,
        },
        _isClick: false,
        _particleList: [cc.Prefab],
        particle: cc.Prefab,

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._path = [[0, 0],
        [0, 310],
        [0, 620],
        [480, 620],
        [950, 620],
        [475, 310],
        [950, 0],
        [475, 0]],
        //this.btnSubmit.node.on('mousedown', this.updateNumber.bind(this));
        this.btnSubmit.node.active = false;
        this.updateNumber();
        //cc.log(this._path);
        
    },

    start() {

    },

    updateNumber() {
        this.number.node.active = true; 
        this.title.node.active = true;
        let input = 1000000
        this._isClick = true;
        cc.tween(this)
            .to(2, { _value: input })
            .call(() => {
                this.scaleMoney()
            })
            .start();

    },

    scaleMoney() {
        //this.number.node.color = '#FFFFFF';
        this.createParticle();
        //this.effect2();
        cc.tween(this.number.node)       
            .repeatForever(
                cc.tween(this.number.node)
                    .to(1.5, { scale: 3, color: new cc.Color(255, 255, 0) })
                    .to(1.5, { scale: 2, color: new cc.Color(255, 0, 0) }))
                    
                    
            .start();
    },

    createParticle() {
        for (let i = 0; i < 8; i++) {
            var newStar = cc.instantiate(this.particle);
            newStar.x = 500;
            newStar.y = 200;
            this._particleList[i] = newStar;
            this.node.addChild(newStar);
            this.effect(this._particleList[i], this._path[i]);
        }
    },

    effect(object, xy) {
        cc.tween(object)
            .to(2, { position: cc.v2(xy[0], xy[1]), scale: 1.5}, { easing: 'bounceIn' })
            .call(() => object.destroy())
            .start()
    },

    effect2() {
        for (let i = 0; i < 100; i++) {
            let star = cc.instantiate(this.particle);
            star.x = Math.random() * window.innerWidth;
            star.y = Math.random() * window.innerHeight;
            this.node.addChild(star);
            cc.tween(star)
                .by(2, { scale: 1 })
                .call(() => star.destroy())
                .start();
        }
    },

    destroyNode(obj) {
        obj.node.destroy();
    },

    update(dt) {
        if (this._isClick) {
            let dollar = Intl.NumberFormat('en-US');
            this.number.string = '$' + dollar.format(Math.floor(this._value));
            
        }
    },
});
