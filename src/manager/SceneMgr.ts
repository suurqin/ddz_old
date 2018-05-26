// TypeScript file
module sceneMgr {
    export let mainBasisLayer : eui.UILayer = null;
    export let runScene : GameScene = null;
    export let loadingLayer : eui.Component = null;

	export const TAG_LOGIN_SCENE = 1;
	export const TAG_LOBBY_SCENE = 2;
	export const TAG_GAME_SCENE = 3;
    export const TAG_WAITGAME_SCENE = 4;
    export const TAG_DDZ_SCENE = 5;

    export class GameScene extends eui.Component {
        private sceneName : string = "runScene";
        mainLayer : eui.Component = null;
        noticeLayers : NoticeLayer[] = [];

        constructor(){
            super();
        }
        
        public static getInstance() {
            if (runScene == null) {
                runScene = new GameScene();
                mainBasisLayer.addChild(runScene);
            }
            return runScene;
        }

        public loadScene(index : number) {
            let newScene : GameScene = new GameScene();
            let newLayer : eui.Component = null;
            //this.loadingAniShow();
            switch (index) {
                case TAG_LOGIN_SCENE:
                {
                    newLayer = new LoginGame();
                    newScene.sceneName = "LOGIN_SCENE";
                    break;
                }
                case TAG_LOBBY_SCENE:
                {
                    newLayer = new lobbyScene.LobbyMainLayer();
                    newScene.sceneName = "LOBBY_SCENE";
                    break;
                }
                case TAG_GAME_SCENE:
                {
                    newLayer = new MJTableLayer();
                    newScene.sceneName = "GAME_SCENE";
                    break;
                }
                case TAG_DDZ_SCENE:
                {
                    newLayer = new ddz.DDZRoomScene();
                    newScene.sceneName = "DDZ_SCENE";
                    break;
                }
                case 1024:{
                    newLayer = new lobbyScene.EnterRoomLayer();
                    break;
                }
                default:{
                    //场景切换错误，警告
                    //this.addNotice(index);
                    this.loadingAniHide();
                    return ;
                }
            }
            newLayer.name = newScene.sceneName + index;
            newScene.mainLayer = newLayer;
            newScene.addChild(newScene.mainLayer);
            this.turnScene(newScene);
        }


        public loadingAniShow() {
            if(loadingLayer != null) {
                loadingLayer.visible = true;
                loadingLayer.parent.setChildIndex(loadingLayer, 64);
            }
            else {
                loadingLayer = new Loading();
                mainBasisLayer.addChildAt(loadingLayer, 64);
                loadingLayer.visible = true;                
            }
        }

        public loadingAniHide() {
            if(sceneMgr.loadingLayer != null) {
                sceneMgr.loadingLayer.visible = false;
            }
        }
        
        public addNotice(noticeTpye){
            let newNoticeLayer : NoticeLayer = null;
            switch (noticeTpye) {
                
                default: {
                    break;
                }
            }
            if (newNoticeLayer != null) {
                this.noticeLayers.push(newNoticeLayer);
                this.addChildAt(newNoticeLayer, 32);
            } 
        }


        public loadingBarShow() {
			let loadingProgress:LoadingPro = new LoadingPro; 
			this.addChildAt(loadingProgress, 64);
        }

        
        private turnScene(newScene : GameScene) {
            if(runScene != null){
                mainBasisLayer.removeChild(runScene);
            }
            runScene = newScene;
            mainBasisLayer.addChildAt(newScene, 1);
            this.loadingAniHide();
        }

        /**
         * 在该场景加入新页面
         */
        public addLayer(newLayer : eui.Component, tag : number = 0, order : number = -1) {
            if(tag != 0){
                let newLayerT = this.getRunSceneByTag(tag);
                if(newLayerT){
                    newLayerT.visible = true;
                    return ;
                }
            }
            if(order < 0){
                this.addChild(newLayer);
            }
            else{
                this.addChildAt(newLayer, order);
            }
            newLayer.name = this.sceneName + tag;
        }
        /**
         * 根据tag删除子节点
         */
        public removeChildByTag(tag : number) {
            let childName = this.sceneName + tag;
            let pendingChild = this.getChildByName(childName);
            this.removeChild(pendingChild);
        }
        /**根据tag获取当前场景中的layer */
        public getRunSceneByTag(tag : number){
            let childName = this.sceneName + tag;
            return this.getChildByName(childName);
        }

        public distoryScene(newLayer : egret.DisplayObject){
            this.removeChild(newLayer);
        }
        
    }
    
    class NoticeLayer extends eui.Component {

    }

}
