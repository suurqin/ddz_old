// TypeScript file

namespace runScene {
    export let gameScene: eui.Component = null;
    //export let gameOverScene: eui.Component = null;
    export let mainLayer: eui.UILayer = null;
    export let loading: eui.Component = null;
    export let loadingPro: eui.Component = null;
    //
    export class Director {
        public static instance: Director = null;
        public allMask: egret.Shape = null;

        public static getInstance() {
            if (Director.instance == null) {
                Director.instance = new Director();
            }
            return Director.instance;
        }

        public rmGameScene(name: string) {
            runScene.mainLayer.removeChild(runScene.mainLayer.getChildByName(name));
            //runScene.gameScene = null;
        }

        /* public rmGameOverScene() {
             runScene.mainLayer.removeChild(runScene.gameOverScene);
             runScene.gameOverScene = null;
         }*/

        public adChild(child: egret.DisplayObject) {
            //let layer : eui.UILayer = runScene.mainLayer;
            //console.log("aaaaaaaaaaaaaaa");
            if (runScene.mainLayer != null) {
                //console.log("bbbbbbbbbbbbbbb");
                runScene.mainLayer.addChild(child);
            }
        }

        public rmChild(child: egret.DisplayObject){
            if (runScene.mainLayer != null) {
                //console.log("bbbbbbbbbbbbbbb");
                runScene.mainLayer.removeChild(child);
            }
        };

        /****************loading 动画******************/
        public LoadingShow() {
            if (runScene.loading == null) {
                if (runScene.mainLayer != null) {
                    runScene.loading = new Loading();
                    runScene.mainLayer.addChild(runScene.loading);
                }
            }
        }

        public LoadingHide() {
            if (runScene.loading != null) {
                if (runScene.mainLayer != null) {
                    runScene.mainLayer.removeChild(runScene.loading);
                    runScene.loading = null;
                }
            }
        }
        /****************loading 进度条******************/
        public LoadingProShow() {
            if (runScene.loadingPro == null) {
                if (runScene.mainLayer != null) {
                    runScene.loadingPro = new LoadingPro();
                    runScene.mainLayer.addChild(runScene.loadingPro);
                }
            }
        }

        public LoadingProHide() {
            if (runScene.loadingPro != null) {
                if (runScene.mainLayer != null) {
                    runScene.mainLayer.removeChild(runScene.loadingPro);
                    runScene.loadingPro = null;
                }
            }
        }

    }
}



