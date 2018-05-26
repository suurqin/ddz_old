module lobbyScene {
	export const TAG_CREAT_ROOM_LAYER = 123;
	export const TAG_ENTER_ROOM_LAYER = 125;
	export const TAG_MALL_LAYER = 124;
	export class LobbyMainLayer extends eui.Component implements eui.UIComponent {
		private basis_group: eui.Group;
		private head_pic: eui.Image;
		private name_label: eui.Label;
		private myId_label: eui.Label;
		private card_num_label: eui.Label;
		private coin_num_label: eui.Label;
		private gold_num_label: eui.Label;

		private entrance_group: eui.Group;
		private creat_room_button: eui.Button;
		private enter_room_button: eui.Button;
		private ddz_gold_button: eui.Button;
		private mj_gold_button: eui.Button;

		private buttons_down_group: eui.Group;
		private set_button: eui.Button;
		private help_button: eui.Button;
		private share_button: eui.Button;
		private shop_button: eui.Button;

		public lastClickButtonName: string = "";

		public constructor() {
			super();
			this.skinName = "resource/my_skins/LobbyMainLayer.exml";
			this.initUI();
			this.initEvent();
		}

		private initUI() {
			let configList = [{ key: 1, value: 1 }];
			for (let i in configList) {
				let config = configList[i];
				switch (config.key) {
					case 1: {
						//
						break;
					}
					case 2: {
						break;
					}
					default: {
					}
				}
			}
			this.initMyInfo(manager.global.mPlayer);

		}    

		public initMyInfo(myInfo: manager.Player) {
			if (!myInfo) {
				return;
			}
			this.myId_label.text = myInfo.playerIndex + "";
			this.name_label.text = myInfo.playerName ? myInfo.playerName : myInfo.account;
			this.gold_num_label.text = manager.global.getPlayerItemNumByBaseItemID(7002) + "";	//图片提示为元宝，暂赋元宝数量
			// this.head_pic = getRes(myInfo.headImg);//myInfo.headIconUrl
			this.coin_num_label.text = manager.global.getPlayerItemNumByBaseItemID(8001) + "";
			let cardNum = 0;
			let playerItems = manager.global.mPlayer.playerItems;
			for (let i = 0; i < playerItems.length; i ++) {
				let itemId = playerItems[i].ItemBaseID;
				if (3000 < itemId && itemId < 4000){
					cardNum += playerItems[i].ItemNum;
				}
			}
			this.card_num_label.text = cardNum + "";

		}

		private initEvent() {
			this.shop_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openMall, this);
			this.creat_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckOnTableBtn, this);
			this.enter_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckOnTableBtn, this);
			this.ddz_gold_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckOnTableBtn, this);
			this.mj_gold_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCheckOnTableBtn, this);

		}

		/**发送消息查看该玩家是否已有房间 */
		private onClickCheckOnTableBtn(event: egret.TouchEvent) {
			let roomId = -1;
			switch (event.target.name) {
				case "mj_gold_button": {
					roomId = lobbyScene.OPERATION_TYPE_MA_JIANG_COIN;
					break;
				}
				case "ddz_gold_button": {
					roomId = lobbyScene.OPERATION_TYPE_DOU_DI_ZHU_COIN;
					break;
				}
				case "enter_room_button": {
					roomId = lobbyScene.OPERATION_TYPE_SEARCH_VIP_ROOM;
					break;
				}
				case "creat_room_button": {
					roomId = lobbyScene.OPERATION_TYPE_CREATE_VIP_ROOM;
					break;
				}
			}
			this.lastClickButtonName = event.target.name;
			
			centerHdl.CenterLobbyHdl.requestStartGame(roomId);
			// sceneMgr.runScene.loadingAniShow();
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}


		public openMall() {
			// runScene.Director.getInstance().rmGameScene();
			// let malllayer = new Malllayer();
			// runScene.gameScene = malllayer;
			// runScene.Director.getInstance().adChild(malllayer);
			let malllayer = new Malllayer();
			sceneMgr.runScene.addLayer(malllayer, TAG_MALL_LAYER);

		}

		private addSetLayer() {

		}

		public addLayerWithoutVipRoom() {
			switch (this.lastClickButtonName) {
				case "mj_gold_button": {
					break;
				}
				case "ddz_gold_button": {
					break;
				}
				case "enter_room_button": {
					let enterRoomLayer: lobbyScene.EnterRoomLayer = new lobbyScene.EnterRoomLayer();
					sceneMgr.runScene.addLayer(enterRoomLayer, TAG_ENTER_ROOM_LAYER);
					break;
				}
				case "creat_room_button": {
					let creatRoomLayer: lobbyScene.CreatRoomsLayer = new lobbyScene.CreatRoomsLayer();
					sceneMgr.runScene.addLayer(creatRoomLayer, TAG_CREAT_ROOM_LAYER);
					break;
				}
				default:
					break;
			}

			
		}
	}
}