//通用组件
namespace SetComponent {


    //大厅底部按钮栏
    export class Downbutton extends eui.Group {

        public buttonNumber: number             //显示按钮的数量
        public buttonList: Array<SingleButton>  //大厅配置信息

        public constructor() {
            super();

            this.width = 1000;
            this.height = 80;
            this.horizontalCenter = -30;
            this.anchorOffsetX = 0;
            this.y = 640;
            this.buttonList = [];
        }

        //设置按钮组中每个按钮的位置
        public setButtons() {

            this.buttonNumber = this.buttonList.length;
            if (this.buttonNumber == 0) {
                return;
            }
            for (let i = 0; i < this.buttonNumber; i++) {
                this.addChild(this.buttonList[i]);
                this.buttonList[i].setPosition((i + 1) * this.width / (this.buttonNumber + 1), 0);
            }
        }
        //添加按钮到本容器的数组中
        public buttonListAddChild(Btn: SingleButton) {
            if (Btn) {
                Btn.anchorOffsetX = 34;
                this.buttonList.push(Btn);
            }
            else {
                console.log("fail to add singleButton");
            }
        }
    }

    //单个按钮
    export class SingleButton extends eui.Button {

        /*********按钮构造函数
         * @param index ：传入图片的数量
         * @param upstr ：up状态时的按钮图片
         * @param downstr ：down状态时的按钮图片
         **/
        constructor(index: number, upstr: string, downstr: string = null) {
            super();
            switch (index) {
                //只有一张图片的按钮
                case 1: {
                    let strSkinName =
                        `<e:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui">
                        <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
                                source="${upstr}"/>
                        <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
                                size="20"
                                textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
                        <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
                    </e:Skin>`
                    this.skinName = strSkinName;
                }
                    break;
                //有两种状态图片的按钮
                case 2: {
                    let strSkinName =
                        `<e:Skin class="skins.ButtonSkin" states="up,down,disabled" minHeight="50" minWidth="100" xmlns:e="http://ns.egret.com/eui">
                        <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" alpha.disabled="0.5"
                                source="${upstr}"
                                source.down="${downstr}"/>
                        <e:Label id="labelDisplay" top="8" bottom="8" left="8" right="8"
                                size="20"
                                textColor="0xFFFFFF" verticalAlign="middle" textAlign="center"/>
                        <e:Image id="iconDisplay" horizontalCenter="0" verticalCenter="0"/>
                    </e:Skin>`
                    this.skinName = strSkinName;
                }
                    break;
                default: break;
            }

        }

        //给按钮设置位置
        public setPosition(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

    }

    /**button扩展 charon */
    export class buttonPic extends eui.Button{
        private normalImage: eui.Image;
        /**
         * 
         */
        constructor(normalStr : string, normalScale : number = 1){
            super();
            this.normalImage = <eui.Image>this.getChildAt(0);
            this.normalImage.source = RES.getRes(normalStr);
            let normalPic : egret.Texture = <egret.Texture>this.normalImage.source;
            this.width = normalPic.textureWidth * normalScale;
            this.height = normalPic.textureHeight * normalScale;
        }
        /** 初始化三种状态下的图片
         * @param upPicStr
         * @param downPicStr
         * @param disabledStr
         */
        initPic(upPicStr : string = null, downPicStr : string = null, disabledStr : string = null){
            if(upPicStr != null){
                let propertyUp: eui.SetProperty = <eui.SetProperty>this.skin.states[0].overrides[0];
                propertyUp.value = upPicStr;
            }
            if(downPicStr != null){
                let propertyDown: eui.SetProperty = <eui.SetProperty>this.skin.states[1].overrides[0];
                propertyDown.value = downPicStr;
            }
            if(disabledStr != null){
                let propertyDisabled: eui.SetProperty = <eui.SetProperty>this.skin.states[2].overrides[0];
                propertyDisabled.value = disabledStr;
            }
        }

        
    }

    //自定义ToggleButton
    export class MyToggleButton extends egret.Sprite {
        constructor(upstr: string, downstr: string) {
            super();
            var exml =
                `<e:Group xmlns:e="http://ns.egret.com/eui">
                <e:ToggleButton >
                    <e:Skin states="up,down,disabled">
                    <e:Image width="100%" height="100%" source="${upstr}" source.down="${downstr}"/>
                    <e:Label id="labelDisplay" horizontalCenter="0" verticalCenter="0"/>
                    </e:Skin>
                </e:ToggleButton>
            </e:Group>`;

            var clazz = EXML.parse(exml);
            var button = new clazz();
            this.addChild(button);
        }

        //给按钮设置位置
        public setPosition(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }


}