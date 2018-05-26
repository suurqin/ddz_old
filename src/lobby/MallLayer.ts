// TypeScript file

class Malllayer extends eui.Component {

    public closeBtn: eui.Button;
    public cLeBtn: eui.Button;
    public cGoldBtn: eui.Button;
    public gCardBtn: eui.Button;
    public gLeBtn: eui.Button;
    public lCardBtn: eui.Button;
    public lGoldBtn: eui.Button;


    public leGroup: eui.Group;
    public goldGroup: eui.Group;
    public cardGroup: eui.Group;

    public goodsLists: eui.Group;
    public allMask: egret.Shape = null;

    private goodsGroup: eui.Group;

    constructor() {
        super();



        this.addEventListener(eui.UIEvent.COMPLETE, this.uimall, this);

        /* this.allMask = new egret.Shape();
         this.allMask.graphics.beginFill(0x000000, 0.7);
         this.allMask.graphics.drawRect(0, 0, runScene.mainLayer.width, runScene.mainLayer.height);
         this.allMask.graphics.endFill();
         this.allMask.y = 0;
         this.addChild(this.allMask);*/

        this.skinName = "resource/my_skins/Mall.exml";
        this.cLeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeGroup, this);
        this.cGoldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGoldGroup, this);
        this.gCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCardGroup, this);
        this.gLeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showLeGroup, this);
        this.lCardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showCardGroup, this);
        this.lGoldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showGoldGroup, this);

        this.showCardGroup();
    }

    private uimall() {

        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            //runScene.Director.getInstance().rmGameScene("" + Constant.gameControl.MALL_SCENE);
            /* let lobby = new LobbyLayer();
             runScene.gameScene = lobby;
             runScene.Director.getInstance().adChild(lobby);*/
            //this.dispatchEventWith("EVT_RETURN");
            //runScene.Director.getInstance().rmChild(this);
            sceneMgr.runScene.removeChildByTag(lobbyScene.TAG_MALL_LAYER);

        }, this);
    }

    private showLeGroup(evt) {
        this.freshInit("lebi");
          for(let i=0;i<2;i++){
            this.goodsGroup.addChild(this.goodsinit());


        }


    }


    private showGoldGroup(evt) {
        this.freshInit("gold");
        for(let i=0;i<5;i++){
            this.goodsGroup.addChild(this.goodsinit());
        }

    }

    private showCardGroup() {

        this.freshInit("card");
          for(let i=0;i<3;i++){
            let tempgoods = this.goodsinit();
            let itemstr = "gold"+i+"_png";
            tempgoods.itemImage.source = RES.getRes(itemstr); 
            this.goodsGroup.addChild(tempgoods);
        }
    }

    //点击按钮刷新界面
    public freshInit(buttonname: string) {
        if (buttonname == "gold" || buttonname == "card" || buttonname == "lebi") {
            this.leGroup.visible = ("lebi" == buttonname);
            this.cardGroup.visible = ("card" == buttonname);
            this.goldGroup.visible = ("gold" == buttonname);
            this.goodsGroup.removeChildren();
        }
    }

    //绘制单个商品
    public goodsinit():GoodsSkin{
        let goods = new GoodsSkin();
        return goods;
    }



}

class GoodsSkin extends eui.ItemRenderer {

    public itemTitle: eui.Image;//商品名称
    public itemImage :eui.Image;//商品图片
    public buyBtn:eui.Button;  //购买按钮
    constructor() {
        super();
        this.skinName = "resource/my_skins/MyGoodsSkin.exml";
    }



}