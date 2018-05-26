module lobbyScene {
	//
	export const RulesNameList: string[] = ["",
		"不夹不胡", "3、7夹", "单调夹", "带漏的", "刮大风",
		"红中满天飞", "支对", "杠加坎", "开牌炸", "带杠的",
		"清一色", "七小对", "飘胡", "岔开门", "带跑的",
		"前后坎", "通宝"];

	export class EnterRoomLayer extends eui.Component implements eui.UIComponent {
		private bg_enter_room_image: eui.Image;
		private close_enter_room_button: eui.Button;

		private room_id_enter_room_bitmapLabel: eui.BitmapLabel;
		private input_list_enter_room_group: eui.Group;
		private cancle_enter_room_button: eui.Button;
		private join_enter_room_button: eui.Button;

		private room_basic_info_enter_room_label: eui.Label;
		private id_list_enter_room_label: eui.Label;
		private name_list_enter_room_label: eui.Label;
		private rule_llist_enter_room_group: eui.Group;

		public static searchVipRoomMsgAck: {};

		// private player_num_4_enter_room_radioButton: eui.RadioButton;
		// private player_num_3_enter_room_radioButton: eui.RadioButton;
		// private player_num_2_enter_room_radioButton: eui.RadioButton;

		public constructor() {
			super();
			this.skinName = "resource/my_skins/EnterRoomLayer.exml";
			this.initUI();
			this.initEvent();
		}

		public SearchVipRoomMsgAck(SearchVipRoomMsgAck: {}) {
			if (SearchVipRoomMsgAck == null) {
				this.setRoomInfoVisible(false);
				lobbyScene.EnterRoomLayer.searchVipRoomMsgAck = null;
				return;
			}
			lobbyScene.EnterRoomLayer.searchVipRoomMsgAck = SearchVipRoomMsgAck;
			this.room_basic_info_enter_room_label.text = this.getRoomName(SearchVipRoomMsgAck["vipTableID"]) + "\n房间局数：" + this.getRoomType(SearchVipRoomMsgAck["roomType"]) + "\n已进人数：" + SearchVipRoomMsgAck["numPlayer"] + "人";
			let nameListStr: string = "房主:" + SearchVipRoomMsgAck["playerName1"] + "\n";
			nameListStr += (SearchVipRoomMsgAck["playerName2"] != null) ? ("玩家1:" + SearchVipRoomMsgAck["playerName2"] + "\n") : ("\n");
			nameListStr += (SearchVipRoomMsgAck["playerName3"] != null) ? ("玩家2:" + SearchVipRoomMsgAck["playerName3"] + "\n") : ("\n");
			nameListStr += (SearchVipRoomMsgAck["playerName4"] != null) ? ("玩家3:" + SearchVipRoomMsgAck["playerName4"] + "\n") : ("\n");
			this.name_list_enter_room_label.text = nameListStr;
			let idListStr: string = "ID:" + SearchVipRoomMsgAck["playerIndex1"] + "\n";
			idListStr += (SearchVipRoomMsgAck["playerIndex2"] != "") ? ("ID:" + SearchVipRoomMsgAck["playerIndex2"] + "\n") : ("\n");
			idListStr += (SearchVipRoomMsgAck["playerIndex3"] != "") ? ("ID:" + SearchVipRoomMsgAck["playerIndex4"] + "\n") : ("\n");
			idListStr += (SearchVipRoomMsgAck["playerIndex4"] != "") ? ("ID:" + SearchVipRoomMsgAck["playerIndex3"] + "\n") : ("\n");
			this.id_list_enter_room_label.text = idListStr;

			let i = 0;
			for (i = 0; i < SearchVipRoomMsgAck["tableRule"].length; i++) {
				let ruleLabel = <eui.Label>this.rule_llist_enter_room_group.getChildAt(i);
				let ruleIndex = SearchVipRoomMsgAck["tableRule"][i];
				ruleLabel.text = lobbyScene.RulesNameList[ruleIndex];

			}
			for (i; i < this.rule_llist_enter_room_group.numChildren; i++) {
				let ruleLabel = <eui.Label>this.rule_llist_enter_room_group.getChildAt(i);
				ruleLabel.text = "";
			}
			//显示信息
			this.setRoomInfoVisible(true);
		}

		private initUI() {
			this.setRoomInfoVisible(false);
			this.room_id_enter_room_bitmapLabel.text = "";
		}

		private initEvent() {
			this.close_enter_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCloseBtn, this);
			for (let i = 0; i < 12; i++) {
				let jpButton = this.input_list_enter_room_group.getChildAt(i);
				jpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickInputBtn, this);
			}
			this.join_enter_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickEnterBtn, this);
			this.cancle_enter_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCloseBtn, this);
		}

		private onClickCloseBtn(event: egret.TouchEvent) {
			this.parent.removeChild(this);
		}
		private onClickInputBtn(event: egret.TouchEvent) {
			switch (event.target.name) {
				case "c":
					{	//重输
						this.room_id_enter_room_bitmapLabel.text = "";
						lobbyScene.EnterRoomLayer.searchVipRoomMsgAck = null;
						this.setRoomInfoVisible(false);
						break;
					}

				case "d":
					{	//删除
						let nowStr = this.room_id_enter_room_bitmapLabel.text;
						if (nowStr.length > 1) {
							nowStr = nowStr.substr(0, nowStr.length - 3);
							this.room_id_enter_room_bitmapLabel.text = nowStr;

						}
						else {
							this.room_id_enter_room_bitmapLabel.text = "";
						}
						lobbyScene.EnterRoomLayer.searchVipRoomMsgAck = null;
						this.setRoomInfoVisible(false);
						break;
					}
				default: {
					let nowStr = this.room_id_enter_room_bitmapLabel.text;
					if (nowStr.length < 18) {
						//未满6位，继续输入
						this.room_id_enter_room_bitmapLabel.text = nowStr + "  " + event.target.name;
						if (nowStr.length == 15) {
							//已经有五位，
							this.searchRoomInfo();
						} else {
							
						}
					}
					else {
						//已满6位
					}
					break;
				}
			}
		}
		private setRoomInfoVisible(visible: boolean = false) {
			this.room_basic_info_enter_room_label.visible = visible;
			this.id_list_enter_room_label.visible = visible;
			this.name_list_enter_room_label.visible = visible;
			this.rule_llist_enter_room_group.visible = visible;
		}

		private onClickEnterBtn(event: egret.TouchEvent) {
			if (lobbyScene.EnterRoomLayer.searchVipRoomMsgAck == null) {
				//房间号错误

				return;
			}
			lobbyScene.EnterRoomLayer.EnterVipRoomMsg();
		}
		public static EnterVipRoomMsg(pswStr = "123456"){
			let appMD5 = new md5();
			let EnterVipRoomMsg = {};
			EnterVipRoomMsg["tableID"] = lobbyScene.EnterRoomLayer.searchVipRoomMsgAck["tableID"];
			let psw = appMD5.convertCaps(pswStr);
			EnterVipRoomMsg["psw"] = psw;
			EnterVipRoomMsg["roomID"] = lobbyScene.EnterRoomLayer.searchVipRoomMsgAck["vipTableID"];
			EnterVipRoomMsg["msgCMD"] = Constant.MSG_GAME_ENTER_VIP_ROOM;
			centerHdl.CenterLobbyHdl.sendData(EnterVipRoomMsg);
		}

		private searchRoomInfo() {
			let PlayerTableOperationMsg = {};
			PlayerTableOperationMsg["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_SEARCH_VIP_ROOM;
			let inputStr = this.room_id_enter_room_bitmapLabel.text;
			PlayerTableOperationMsg["card_value"] = -1;
			PlayerTableOperationMsg["opValue"] = parseInt(inputStr.replace(/[^0-9]/g, ''));
			PlayerTableOperationMsg["player_table_pos"] = -1;
			PlayerTableOperationMsg["cardLeftNum"] = -1;
			PlayerTableOperationMsg["handCards"] = -1;
			PlayerTableOperationMsg["beforeCards"] = -1;
			PlayerTableOperationMsg["downCards"] = -1;
			PlayerTableOperationMsg["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
			centerHdl.CenterLobbyHdl.sendData(PlayerTableOperationMsg);
		}

		private getRoomName(vipTableID: number) {
			switch (vipTableID) {
				case 2010: {
					return "二人麻将";
				}
				default: {
					return "";
				}
			}
		}
		private getRoomType(roomType: number) {
			switch (roomType) {
				case 2010: {
					return "24局";
				}
				default: {
					return "4圈";
				}
			}
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
}