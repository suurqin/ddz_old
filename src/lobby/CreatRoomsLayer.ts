module lobbyScene {
	//创建房间，添加默认玩法用
	enum DefautRules {
		DAQING_MAHJONG_RULE_TIANHU = 50,	//天胡
		DAQING_MAHJONG_RULE_DIHU = 51,		//地胡
		DAQING_MAHJONG_RULE_KUAITING = 52,	//快听(手里有对子就能听)
		DAQING_MAHJONG_RULE_MENTING = 53	//闷听
	};

	export const DA_QING_AREA_SELECT_VALUE = 100;
	export const ZHAO_ZHOU_AREA_SELECT_VALUE = 101;
	export const ZHAO_YUAN_AREA_SELECT_VALUE = 102;
	export const LIN_DIAN_AREA_SELECT_VALUE = 103;
	export const TAI_KANG_AREA_SELECT_VALUE = 104;
	export const ZHAO_YUAN_BAO_AREA_SELECT_VALUE = 105;
	export const ZHAO_YUAN_HUI_AREA_SELECT_VALUE = 106;

	export const ROOM_TYPE_VIP = 4;
	export const ROOM_TYPE_COUPLE = 6;
	export const ROOM_TYPE_THREE = 8;

	export const OPERATION_TYPE_CREATE_VIP_ROOM = 100;
	export const OPERATION_TYPE_CREATE_VIP_ROOM_MA_JIANG_OK = 101;
	export const OPERATION_TYPE_CREATE_VIP_ROOM_DOU_DI_ZHU_OK = 102;
	export const OPERATION_TYPE_SEARCH_VIP_ROOM = 103;
	export const OPERATION_TYPE_SEARCH_VIP_ROOM_OK = 104;
	export const OPERATION_TYPE_MA_JIANG_COIN = 105;
	export const OPERATION_TYPE_DOU_DI_ZHU_COIN = 106;


	export const ERREN_DDZ_ROOM_ID_MIN = 2020;
	export const ERREN_DDZ_ROOM_ID_MAX = 2030;
	export const ERREN_DDZ_ROOM_ID_GUANMAX = 2040;

	//麻将--
	//人数列表
	export const PlayerNumList: number[] = [ROOM_TYPE_COUPLE, ROOM_TYPE_THREE, ROOM_TYPE_VIP];
	export const PlayerNumDdzList: number[] = [2021, 2041];
	//局数列表 人数[局数[(使用房卡圈数 << 4) | num(本地图片的index，也是实际的局/圈数)]]
	export const JuNumList: number[][] = [[0x40018], [0x40015], [0x40004, 0x80008]];
	//大庆，肇州，肇源，林甸，泰康   ps：105肇源带宝，106肇源带会
	export const AreaListCreatRoomList: number[] = [DA_QING_AREA_SELECT_VALUE, ZHAO_ZHOU_AREA_SELECT_VALUE, ZHAO_YUAN_AREA_SELECT_VALUE, LIN_DIAN_AREA_SELECT_VALUE, TAI_KANG_AREA_SELECT_VALUE, ZHAO_YUAN_BAO_AREA_SELECT_VALUE, ZHAO_YUAN_HUI_AREA_SELECT_VALUE];
	//地区[玩法[tag << 4(实际传给服务的值) | picIndex(本地图片的index)]]
	//
	export const RulesAreaList: number[][] = [[0x10001, 0x20002, 0x70007, 0x30003, 0x60006, 0x40004, 0x50005, 0x90009], [0x10001, 0x20002, 0x60006, 0x50005, 0x40004, 0xa000a], [], [0x10001, 0x20002, 0xb000b, 0x30003, 0x60006, 0xc000c, 0x50005, 0x40004, 0xd000d], [0x10001, 0x20002, 0xf000f, 0x30003, 0xe000e, 0xa000a], [0x10001, 0x60006, 0xa0008, 0x50005, 0x40004, 0x100010], [0x100010, 0xa0008]];

	//斗地主

	export class CreatRoomsLayer extends eui.Component implements eui.UIComponent {
		private close_creat_room_button: eui.Button;
		private dqmj_tittle_radioButton: eui.RadioButton;
		private ddz_tittle_radioButton: eui.RadioButton;

		private mj_group: eui.Group;
		private area_select_flag_image: eui.Image;
		private areas_mj_creat_room_group: eui.Group;
		private player_num_select_group: eui.Group;
		private ju_num_select_group: eui.Group;
		private rules_mj_creat_room_group: eui.Group;
		private zy_select_group: eui.Group;
		private bao_zy_select_radioButton: eui.RadioButton;
		private hui_zy_select_radioButton: eui.RadioButton;
		private creat_other_room_checkBox: eui.CheckBox;
		private all_select_checkBox: eui.CheckBox;
		private none_select_checkBox: eui.CheckBox;
		private sound_select_checkBox: eui.CheckBox;
		private creat_room_button: eui.Button;
		private password_bg_image: eui.Image;
		private password_bitmap_label: eui.BitmapLabel;

		private ddz_group: eui.Group;
		private player_num_select_group_ddz: eui.Group;
		private ju_num_select_group_ddz: eui.Group;
		private max_select_group_ddz: eui.Group;
		private rule_select_group_ddz: eui.Group;
		private show_record_checkBox: eui.CheckBox;
		private creat_room_button_ddz: eui.Button;
		private password_bg_image_ddz: eui.Image;
		private password_bitmap_label_ddz: eui.BitmapLabel;

		private basis_group: eui.Group;

		private creatGameSelectGroup: eui.RadioButtonGroup;
		private mjAreaRadioGroup: eui.RadioButtonGroup;
		private mjPlayerNumRadioGroup: eui.RadioButtonGroup;
		private mjJuNumRadioGroup: eui.RadioButtonGroup;
		private mjZYSelectRadioGroup: eui.RadioButtonGroup;
		private mjRulesButtonList: eui.CheckBox[] = [];
		private selectValue_creatGameSelectGroup = "dqmj";
		private selectValue_mjAreaRadioGroup = lobbyScene.AreaListCreatRoomList[0];
		private selectValue_mjPlayerNumRadioGroup = this.getRoomID(lobbyScene.PlayerNumList[0]);
		private selectValue_mjJuNumRadioGroup = 0x4;//n>>4*4
		private selectValue_mjRulesButtonList = [];

		private ddzPlayerNumRadioGroup: eui.RadioButtonGroup;
		private ddzJuNumRadioGroup: eui.RadioButtonGroup;
		private ddzTimesRadioGroup: eui.RadioButtonGroup;
		private selectValue_ddzPlayerNumRadioGroup = lobbyScene.PlayerNumDdzList[0];
		private selectValue_ddzJuNumRadioGroup = 16;
		private selectValue_ddzTimesRadioGroupp = 48;

		public constructor() {
			super();
			this.skinName = "resource/my_skins/CreatRoomsLayer.exml";
			this.creatGameSelectGroup = new eui.RadioButtonGroup();
			let radioChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.selectValue_creatGameSelectGroup = radioGroup.selectedValue;
				switch (radioGroup.selectedValue) {
					case "dqmj": {
						this.basis_group.setChildIndex(this.dqmj_tittle_radioButton, 2);
						this.basis_group.setChildIndex(this.ddz_tittle_radioButton, 1);
						this.initMj();
						break;
					}
					case "ddz": {
						this.basis_group.setChildIndex(this.dqmj_tittle_radioButton, 1);
						this.basis_group.setChildIndex(this.ddz_tittle_radioButton, 2);
						this.initDdz();
						break;
					}
					default: {
						this.basis_group.setChildIndex(this.dqmj_tittle_radioButton, 2);
						this.basis_group.setChildIndex(this.ddz_tittle_radioButton, 1);
						this.initMj();
						break;
					}
				}
			}
			this.creatGameSelectGroup.addEventListener(eui.UIEvent.CHANGE, radioChangeHandler, this);
			this.dqmj_tittle_radioButton.group = this.creatGameSelectGroup;
			this.dqmj_tittle_radioButton.value = "dqmj";
			this.ddz_tittle_radioButton.group = this.creatGameSelectGroup;
			this.ddz_tittle_radioButton.value = "ddz";
			let localSelect = myStorage.MyStorage.get(myStorage.KeyAndType.GameType_creatRoom);
			if (localSelect != null) {
				this.selectValue_creatGameSelectGroup = localSelect;
			}
			switch (this.selectValue_creatGameSelectGroup) {
				case "dqmj": {
					this.initMj();
					break;
				}
				case "ddz": {
					this.initDdz();
					break;
				}
				default: {
					this.initMj();
					break;
				}
			}
			this.initEvent();
		}

		private initEvent() {
			this.close_creat_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCloseBtn, this);

			this.creat_room_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCreatRoomBtn, this);

			this.all_select_checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSelectAllOrNoneBtn, this);
			this.none_select_checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSelectAllOrNoneBtn, this);
			this.password_bg_image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPasswordImage, this);

			this.sound_select_checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			}, this);
			this.creat_other_room_checkBox.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { }, this);

			//斗地主部分
			this.creat_room_button_ddz.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCreatDdzRoomBtn, this);
			this.password_bg_image_ddz.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickPasswordImageDdz, this);

		}

		//麻将部分
		private initMj() {
			this.mj_group.visible = true;
			this.ddz_group.visible = false;
			this.dqmj_tittle_radioButton.selected = true;
			this.initMjAreaScroll(lobbyScene.AreaListCreatRoomList);

			let oldHashInfo = myStorage.MyStorage.getHashInfByAreaAndRoomID(this.getArea(), this.selectValue_mjPlayerNumRadioGroup);
			if (oldHashInfo != null) {
				this.sound_select_checkBox.selected = oldHashInfo["sound"] != null ? oldHashInfo["sound"] : true;
				this.password_bitmap_label.text = oldHashInfo["psw"] != null ? oldHashInfo["psw"] : "123456";
			}
			else {
				this.sound_select_checkBox.selected = true;
				this.password_bitmap_label.text = "123456";
			}
		}
		private initMjAreaScroll(areaList: number[]) {
			this.areas_mj_creat_room_group.removeChildren();
			let localSelect = myStorage.MyStorage.get(myStorage.KeyAndType.Area_creatRoom);
			if (localSelect != null) {
				this.selectValue_mjAreaRadioGroup = localSelect;
			}
			let radioChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				let areaIndex = 0;
				for (let i = 0; i < areaList.length; i++) {
					if (radioGroup.selectedValue == areaList[i]) {
						areaIndex = i;
						break;
					}
				}
				this.area_select_flag_image.y = 136 + 102 * areaIndex;
				if (areaList[areaIndex] == lobbyScene.ZHAO_YUAN_AREA_SELECT_VALUE) {
					//肇源带会带宝的rule初始化
					if (this.bao_zy_select_radioButton.visible) {
						this.initAreaZhaoYuan(lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE);
					} else if (this.hui_zy_select_radioButton) {
						this.initAreaZhaoYuan(lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE);
					} else {
						this.initAreaZhaoYuan(-1);
					}
				}
				else {
					this.zy_select_group.visible = false;
					this.selectValue_mjAreaRadioGroup = radioGroup.selectedValue;
				}
				this.initMjPlayerNumGroup(lobbyScene.PlayerNumList);

				let oldHashInfo = myStorage.MyStorage.getHashInfByAreaAndRoomID(this.getArea(), this.selectValue_mjPlayerNumRadioGroup);
				if (oldHashInfo != null) {
					this.sound_select_checkBox.selected = oldHashInfo["sound"] != null ? oldHashInfo["sound"] : true;
					this.password_bitmap_label.text = oldHashInfo["psw"] != null ? oldHashInfo["psw"] : "123456";
				}
				else {
					this.sound_select_checkBox.selected = true;
					this.password_bitmap_label.text = "123456";
				}
			}
			this.mjAreaRadioGroup = new eui.RadioButtonGroup();
			this.mjAreaRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioChangeHandler, this);
			let radioZYChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.initAreaZhaoYuan(radioGroup.selectedValue);
			}
			this.mjZYSelectRadioGroup = new eui.RadioButtonGroup();
			this.mjZYSelectRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioZYChangeHandler, this);
			this.bao_zy_select_radioButton.group = this.mjZYSelectRadioGroup;
			this.hui_zy_select_radioButton.group = this.mjZYSelectRadioGroup;

			for (let i: number = 0; i < areaList.length; i++) {
				switch (areaList[i]) {
					case lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE: {
						this.bao_zy_select_radioButton.visible = true;
						this.bao_zy_select_radioButton.value = lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE;
						break;
					}
					case lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE: {
						this.hui_zy_select_radioButton.visible = true;
						this.hui_zy_select_radioButton.value = lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE;
						break;
					}
					case lobbyScene.ZHAO_YUAN_AREA_SELECT_VALUE: {
						let areaSelect = this.creatAreaSelectBtn(areaList[i]);
						areaSelect.name = areaList[i] + "";
						this.areas_mj_creat_room_group.addChild(areaSelect);
						if ((lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE == this.selectValue_mjAreaRadioGroup) || (lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE == this.selectValue_mjAreaRadioGroup)) {
							areaSelect.selected = true;
							this.area_select_flag_image.y = 136 + 102 * i;
						}
						else {
							areaSelect.selected = false;
						}
						areaSelect.group = this.mjAreaRadioGroup;
						areaSelect.value = areaList[i];
						this.zy_select_group.visible = areaSelect.selected;
						if (areaSelect.selected) {
							this.initAreaZhaoYuan(this.selectValue_mjAreaRadioGroup)
						}
						break;
					}
					default: {
						let areaSelect = this.creatAreaSelectBtn(areaList[i]);
						areaSelect.name = areaList[i] + "";
						this.areas_mj_creat_room_group.addChild(areaSelect);
						if (areaList[i] == this.selectValue_mjAreaRadioGroup) {
							areaSelect.selected = true;
							this.area_select_flag_image.y = 136 + 102 * i;
						}
						else { 
							areaSelect.selected = false;
						}
						areaSelect.group = this.mjAreaRadioGroup;
						areaSelect.value = areaList[i];
					}
				}
			}
			this.initMjPlayerNumGroup(lobbyScene.PlayerNumList);
		}
		private initAreaZhaoYuan(areaValue: number) {
			let areaIndex: number = -1;
			this.zy_select_group.visible = true;
			this.bao_zy_select_radioButton.selected = (areaValue == lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE);
			this.hui_zy_select_radioButton.selected = (areaValue == lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE);
			for (let i = 0; i < lobbyScene.AreaListCreatRoomList.length; i++) {
				if (lobbyScene.AreaListCreatRoomList[i] == areaValue) {
					areaIndex = i;
					this.selectValue_mjAreaRadioGroup = areaValue;
					return;
				}
			}
			this.rules_mj_creat_room_group.removeChildren();
		}

		private initMjPlayerNumGroup(playerNumList: number[]) {
			this.player_num_select_group.removeChildren();
			let localSelect = myStorage.MyStorage.getRoomIDByArea(this.getArea());
			if (localSelect != null) {
				this.selectValue_mjPlayerNumRadioGroup = localSelect;
			} else {
				this.selectValue_mjPlayerNumRadioGroup = this.getRoomID(playerNumList[0]);
			}
			let radioChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.selectValue_mjPlayerNumRadioGroup = radioGroup.selectedValue;
				for (let i = 0; i < playerNumList.length; i++) {
					if (this.getRoomID(playerNumList[i]) == radioGroup.selectedValue) {
						this.initMjJuNumGroup(lobbyScene.JuNumList[i]);
					}
				}
				let areaIndex = 0;
				for (let i = 0; i < lobbyScene.AreaListCreatRoomList.length; i++) {
					if (this.selectValue_mjAreaRadioGroup == lobbyScene.AreaListCreatRoomList[i]) {
						areaIndex = i;
						break;
					}
				}
				this.initMjRuleGroup(lobbyScene.RulesAreaList[areaIndex]);

				let oldHashInfo = myStorage.MyStorage.getHashInfByAreaAndRoomID(this.getArea(), this.selectValue_mjPlayerNumRadioGroup);
				if (oldHashInfo != null) {
					this.sound_select_checkBox.selected = oldHashInfo["sound"] != null ? oldHashInfo["sound"] : true;
					this.password_bitmap_label.text = oldHashInfo["psw"] != null ? oldHashInfo["psw"] : "123456";
				}
				else {
					this.sound_select_checkBox.selected = true;
					this.password_bitmap_label.text = "123456";
				}
			}
			this.mjPlayerNumRadioGroup = new eui.RadioButtonGroup();
			this.mjPlayerNumRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioChangeHandler, this);

			for (let i: number = 0; i < playerNumList.length; i++) {
				let playerNumSelect: mySubassemblie.PlayerNumSelectBtnOfCreatRoom = new mySubassemblie.PlayerNumSelectBtnOfCreatRoom("roomType" + playerNumList[i]);
				playerNumSelect.name = playerNumList[i] + "";
				this.player_num_select_group.addChild(playerNumSelect);
				playerNumSelect.value = this.getRoomID(playerNumList[i]);
				playerNumSelect.selected = (this.selectValue_mjPlayerNumRadioGroup == playerNumSelect.value);
				playerNumSelect.group = this.mjPlayerNumRadioGroup;
				if (playerNumSelect.selected) {
					this.initMjJuNumGroup(lobbyScene.JuNumList[i]);

					let areaIndex = 0;
					for (let i = 0; i < lobbyScene.AreaListCreatRoomList.length; i++) {
						if (this.selectValue_mjAreaRadioGroup == lobbyScene.AreaListCreatRoomList[i]) {
							areaIndex = i;
							break;
						}
					}
					this.initMjRuleGroup(lobbyScene.RulesAreaList[areaIndex]);
				}
			}
		}

		private initMjJuNumGroup(juNumList: number[]) {
			this.ju_num_select_group.removeChildren();
			this.selectValue_mjJuNumRadioGroup = juNumList[0] >> 4 * 4;
			let radioChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.selectValue_mjJuNumRadioGroup = radioGroup.selectedValue;
			}
			this.mjJuNumRadioGroup = new eui.RadioButtonGroup();
			this.mjJuNumRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioChangeHandler, this);

			let localSelect = myStorage.MyStorage.getHashInfByAreaAndRoomID(this.getArea(), this.selectValue_mjPlayerNumRadioGroup);
			if (localSelect != null && localSelect["quanNum"] != null) {
				this.selectValue_mjJuNumRadioGroup = localSelect["quanNum"];
			}
			for (let i: number = 0; i < juNumList.length; i++) {
				let juNumSelect: mySubassemblie.JuNumSelectBtnOfCreatRoom = new mySubassemblie.JuNumSelectBtnOfCreatRoom("juNum_" + (juNumList[i] & 0xffff));
				juNumSelect.name = juNumList[i] + "";
				this.ju_num_select_group.addChild(juNumSelect);
				juNumSelect.value = juNumList[i] >> 4 * 4;
				juNumSelect.selected = (juNumSelect.value == this.selectValue_mjJuNumRadioGroup);
				juNumSelect.group = this.mjJuNumRadioGroup;
			}
		}
		private initMjRuleGroup(ruleList: number[]) {
			this.rules_mj_creat_room_group.removeChildren();
			this.mjRulesButtonList = [];
			let checkRuleCheckBox = (evt: eui.UIEvent = null) => {
				let flag_allSelect = true;
				let flag_noSelect = true;
				let rulesSelect = [];
				for (let j: number = 0; j < this.mjRulesButtonList.length; j++) {
					let ruleCheckBox = this.mjRulesButtonList[j];
					if (ruleCheckBox.selected) {
						flag_noSelect = false;
						rulesSelect.push(parseInt(ruleCheckBox.name));
					}
					else {
						flag_allSelect = false;
					}
				}
				this.all_select_checkBox.selected = flag_allSelect;
				this.none_select_checkBox.selected = flag_noSelect;
			}
			let localSelect = myStorage.MyStorage.getHashInfByAreaAndRoomID(this.getArea(), this.selectValue_mjPlayerNumRadioGroup);
			if (localSelect != null && localSelect["tableRule"] != null) {
				this.selectValue_mjRulesButtonList = localSelect["tableRule"];
			} else {
				//默认全选
				this.selectValue_mjRulesButtonList = [];
				for (let i: number = 0; i < ruleList.length; i++) {
					this.selectValue_mjRulesButtonList.push("" + (ruleList[i] >> 16));
				}
			}
			for (let i: number = 0; i < ruleList.length; i++) {
				let ruleSelect: mySubassemblie.RuleSelectBtnOfCreatRoom = new mySubassemblie.RuleSelectBtnOfCreatRoom("rule" + (ruleList[i] & 0xffff));
				ruleSelect.name = "" + (ruleList[i] >> 4 * 4);
				this.rules_mj_creat_room_group.addChild(ruleSelect);
				let isOn = false;
				for (let z = 0; z < this.selectValue_mjRulesButtonList.length; z++) {
					if (this.selectValue_mjRulesButtonList[z] == ruleSelect.name) {
						isOn = true;
						break;
					}
				}
				ruleSelect.selected = isOn;
				ruleSelect.addEventListener(egret.TouchEvent.CHANGE, checkRuleCheckBox, this);
				this.mjRulesButtonList.push(ruleSelect);
			}
			//检查全选按钮和传统按钮的显示情况。
			checkRuleCheckBox();
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		private creatAreaSelectBtn(areaValue: number) {
			let areaName = "dqst";
			switch (areaValue) {
				case lobbyScene.DA_QING_AREA_SELECT_VALUE: {
					areaName = "dqst";
					break;
				}
				case lobbyScene.ZHAO_ZHOU_AREA_SELECT_VALUE: {
					areaName = "zzst";
					break;
				}
				case lobbyScene.ZHAO_YUAN_AREA_SELECT_VALUE:
				case lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE:
				case lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE: {
					areaName = "zyst";
					break;
				}
				case lobbyScene.LIN_DIAN_AREA_SELECT_VALUE: {
					areaName = "ldst";
					break;
				}
				case lobbyScene.TAI_KANG_AREA_SELECT_VALUE: {
					areaName = "tkbt";
					break;
				}
			}
			let areaSelectBtn: mySubassemblie.AreaSelectBtnOfCreatRoom = new mySubassemblie.AreaSelectBtnOfCreatRoom(areaName);
			return areaSelectBtn;
		}

		private onClickCloseBtn(event: egret.TouchEvent) {
			this.parent.removeChild(this);
		}

		private onClickCreatRoomBtn(event: egret.TouchEvent) {
			let appMD5 = new md5();
			let CreateVipRoomMsg = {};
			let CreateVipRoomMsgStorage = {};
			CreateVipRoomMsg["operationType"] = lobbyScene.OPERATION_TYPE_CREATE_VIP_ROOM_MA_JIANG_OK;
			CreateVipRoomMsg["quanNum"] = this.selectValue_mjJuNumRadioGroup;
			CreateVipRoomMsg["roomID"] = this.selectValue_mjPlayerNumRadioGroup;
			CreateVipRoomMsg["tableRule"] = this.getRules();
			CreateVipRoomMsg["sound"] = this.sound_select_checkBox.selected ? 1 : 0;
			CreateVipRoomMsg["isBisai"] = 0;
			let gameArea = this.getArea();
			CreateVipRoomMsg["area"] = gameArea;
			CreateVipRoomMsg["times"] = 0;
			CreateVipRoomMsg["showRecorder"] = 0;
			CreateVipRoomMsg["msgCMD"] = Constant.MSG_GAME_VIP_CREATE_ROOM;
			//保存选择。密码保存未加密的
			CreateVipRoomMsgStorage = CreateVipRoomMsg;
			CreateVipRoomMsgStorage["psw"] = this.password_bitmap_label.text;
			myStorage.MyStorage.setCreatRoom(CreateVipRoomMsgStorage);

			CreateVipRoomMsg["psw"] = appMD5.convertCaps(this.password_bitmap_label.text);
			myStorage.MyStorage.set(myStorage.KeyAndType.GameType_creatRoom, this.selectValue_creatGameSelectGroup);
			switch (gameArea) {
				case lobbyScene.ZHAO_ZHOU_AREA_SELECT_VALUE: {
					CreateVipRoomMsg["tableRule"].push(DefautRules.DAQING_MAHJONG_RULE_DIHU);
					CreateVipRoomMsg["tableRule"].push(DefautRules.DAQING_MAHJONG_RULE_TIANHU);
					CreateVipRoomMsg["tableRule"].push(DefautRules.DAQING_MAHJONG_RULE_KUAITING);
					CreateVipRoomMsg["tableRule"].push(DefautRules.DAQING_MAHJONG_RULE_MENTING);
					break;
				}
				case lobbyScene.TAI_KANG_AREA_SELECT_VALUE: {
					CreateVipRoomMsg["tableRule"].push(DefautRules.DAQING_MAHJONG_RULE_TIANHU);
					CreateVipRoomMsg["tableRule"].push(DefautRules.DAQING_MAHJONG_RULE_DIHU);
					break;
				}
				default: { }
			}
			centerHdl.CenterLobbyHdl.sendData(CreateVipRoomMsg);

			// sceneMgr.runScene.loadingAniShow();
		}
		private getRoomID(roomID: number = this.selectValue_mjPlayerNumRadioGroup) {
			switch (roomID) {
				case 4: {
					roomID = 2011;
					break;
				}
				case 6: {
					roomID = 2009;
					break;
				}
				case 8: {
					roomID = 2010;
					break;
				}
				default: {
				}
			}
			return roomID;
		}
		private getRules() {
			let tableRule: Array<number> = [];
			for (let i = 0; i < this.mjRulesButtonList.length; i++) {
				if (this.mjRulesButtonList[i].selected) {
					let ruleNum = parseInt(this.mjRulesButtonList[i].name);
					tableRule.push(ruleNum);
				}
			}
			return tableRule;
		}
		private getArea() {
			let areaValue = this.selectValue_mjAreaRadioGroup;
			if (areaValue == lobbyScene.ZHAO_YUAN_AREA_SELECT_VALUE) {
				if (this.bao_zy_select_radioButton.selected) {
					return lobbyScene.ZHAO_YUAN_BAO_AREA_SELECT_VALUE;
				} else if (this.hui_zy_select_radioButton.selected) {
					return lobbyScene.ZHAO_YUAN_HUI_AREA_SELECT_VALUE;
				}
			}
			return areaValue;
		}

		private onClickSelectAllOrNoneBtn(event: egret.TouchEvent) {
			let newSelectState: boolean = false;
			switch (event.target.name) {
				case "all_select_checkBox": {
					newSelectState = true;
					break;
				}
				case "none_select_checkBox": {
					newSelectState = false;
					break;
				}
				default: { }
			}
			let rulesNum = this.rules_mj_creat_room_group.numChildren;
			for (let i = 0; i < rulesNum; i++) {
				let ruleCheck = this.rules_mj_creat_room_group.getChildAt(i);
				(<eui.CheckBox>ruleCheck).selected = newSelectState;
			}

			this.all_select_checkBox.selected = newSelectState;
			this.none_select_checkBox.selected = !newSelectState;
		}

		private onClickPasswordImage(event: egret.TouchEvent) {
			let passwordLayer = new PasswordLayer();
			sceneMgr.runScene.addLayer(passwordLayer);
			passwordLayer.passwordForParentBitmapLabel = this.password_bitmap_label;
		}


		//斗地主部分
		private initDdz() {
			this.mj_group.visible = false;
			this.ddz_group.visible = true;

			this.initDdzPlayerNumGroup(lobbyScene.PlayerNumDdzList);

			let oldHashInfo = myStorage.MyStorage.getHashInfByPlayerNumDdz(this.getPlayerNumByRoomIDDdz(this.selectValue_ddzPlayerNumRadioGroup));
			if (oldHashInfo != null) {
				this.password_bitmap_label_ddz.text = oldHashInfo["psw"] != null ? oldHashInfo["psw"] : "123456";
			}
			else {
				this.password_bitmap_label_ddz.text = "123456";
			}
		}

		private initDdzPlayerNumGroup(roomIDList: number[]) {
			this.player_num_select_group.removeChildren();
			let localSelect = myStorage.MyStorage.get(myStorage.KeyAndType.RoomID_creatRoom_ddz);
			if (localSelect != null) {
				this.selectValue_ddzPlayerNumRadioGroup = localSelect;
			} else {
				this.selectValue_ddzPlayerNumRadioGroup = lobbyScene.PlayerNumDdzList[0];
			}

			let radioChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.selectValue_ddzPlayerNumRadioGroup = radioGroup.selectedValue;
				this.initDdzJuNumAndTimesGroup(this.getPlayerNumByRoomIDDdz(this.selectValue_mjPlayerNumRadioGroup));

				let oldHashInfo = myStorage.MyStorage.getHashInfByPlayerNumDdz(this.getPlayerNumByRoomIDDdz(this.selectValue_ddzPlayerNumRadioGroup));
				if (oldHashInfo != null) {
					this.password_bitmap_label_ddz.text = oldHashInfo["psw"] != null ? oldHashInfo["psw"] : "123456";
				}
				else {
					this.password_bitmap_label_ddz.text = "123456";
				}
			}
			this.ddzPlayerNumRadioGroup = new eui.RadioButtonGroup();
			this.ddzPlayerNumRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioChangeHandler, this);
			this.player_num_select_group_ddz.removeChildren();
			for (let i: number = 0; i < roomIDList.length; i++) {
				let playerNum = this.getPlayerNumByRoomIDDdz(roomIDList[i]);
				let playerNumSelect: mySubassemblie.PlayerNumSelectBtnOfCreatRoom = new mySubassemblie.PlayerNumSelectBtnOfCreatRoom("roomType" + playerNum);
				playerNumSelect.name = playerNum + "";
				this.player_num_select_group_ddz.addChild(playerNumSelect);
				playerNumSelect.value = playerNum;
				playerNumSelect.selected = (this.getPlayerNumByRoomIDDdz(this.selectValue_ddzPlayerNumRadioGroup) == playerNumSelect.value);
				playerNumSelect.group = this.ddzPlayerNumRadioGroup;
				if (playerNumSelect.selected) {
					this.initDdzJuNumAndTimesGroup(playerNum);
				}
			}
		}
		private initDdzJuNumAndTimesGroup(playerNum: number) {
			let oldHashInfo = myStorage.MyStorage.getHashInfByPlayerNumDdz(playerNum);
			if (oldHashInfo != null && oldHashInfo["roomID"] != null) {
				this.selectValue_ddzJuNumRadioGroup = oldHashInfo["roomID"];
			} else {
				this.selectValue_ddzJuNumRadioGroup = 16;
			}
			if (oldHashInfo != null && oldHashInfo["times"] != null) {
				this.selectValue_ddzTimesRadioGroupp = oldHashInfo["times"];
			} else {
				this.selectValue_ddzTimesRadioGroupp = 48;
			}

			let radioddzJuNumChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.selectValue_ddzJuNumRadioGroup = radioGroup.selectedValue;
			}
			this.ddzJuNumRadioGroup = new eui.RadioButtonGroup();
			this.ddzJuNumRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioddzJuNumChangeHandler, this);
			let radioddzTimesChangeHandler = (evt: eui.UIEvent) => {
				let radioGroup: eui.RadioButtonGroup = evt.target;
				this.selectValue_ddzTimesRadioGroupp = radioGroup.selectedValue;
			}
			this.ddzTimesRadioGroup = new eui.RadioButtonGroup();
			this.ddzTimesRadioGroup.addEventListener(eui.UIEvent.CHANGE, radioddzTimesChangeHandler, this);

			for (let i = 0; i < this.ju_num_select_group_ddz.numChildren; i++) {
				let juNumRadioButton = <eui.RadioButton>this.ju_num_select_group_ddz.getChildAt(i);
				juNumRadioButton.group = this.ddzJuNumRadioGroup;
				juNumRadioButton.selected = (juNumRadioButton.value == this.selectValue_ddzJuNumRadioGroup);
			}

			for (let i = 0; i < this.max_select_group_ddz.numChildren; i++) {
				let timeRadioButton = <eui.RadioButton>this.max_select_group_ddz.getChildAt(i);
				timeRadioButton.group = this.ddzTimesRadioGroup;
				timeRadioButton.selected = (timeRadioButton.value == this.selectValue_ddzTimesRadioGroupp);
			}

			//刷新记牌器选项
			if (oldHashInfo != null && oldHashInfo["showRecorder"] == 0) {
				this.show_record_checkBox.selected = false;
			}
			else {
				this.show_record_checkBox.selected = true;
			}
		}
		private getPlayerNumByRoomIDDdz(roomID: number = this.selectValue_mjPlayerNumRadioGroup) {
			if (roomID < lobbyScene.ERREN_DDZ_ROOM_ID_MIN) {
			} else if (roomID < lobbyScene.ERREN_DDZ_ROOM_ID_MAX) {
				//二人斗地主
				return lobbyScene.ROOM_TYPE_COUPLE;
			} else if (roomID < lobbyScene.ERREN_DDZ_ROOM_ID_GUANMAX) {
				//经典斗地主
				return lobbyScene.ROOM_TYPE_THREE;
			} else {
				//关牌
			}
			return lobbyScene.ROOM_TYPE_THREE;
		}

		private onClickCreatDdzRoomBtn(event: egret.TouchEvent) {
			let appMD5 = new md5();
			let CreateVipRoomMsg = {};
			let CreateVipRoomMsgStorage = {};
			CreateVipRoomMsg["operationType"] = lobbyScene.OPERATION_TYPE_CREATE_VIP_ROOM_DOU_DI_ZHU_OK;
			CreateVipRoomMsg["quanNum"] = this.selectValue_ddzJuNumRadioGroup;
			CreateVipRoomMsg["roomID"] = this.selectValue_ddzPlayerNumRadioGroup;
			CreateVipRoomMsg["tableRule"] = [];
			CreateVipRoomMsg["sound"] = 0;
			CreateVipRoomMsg["isBisai"] = 0;
			CreateVipRoomMsg["area"] = 0;
			CreateVipRoomMsg["times"] = this.selectValue_ddzTimesRadioGroupp;
			CreateVipRoomMsg["showRecorder"] = this.show_record_checkBox.selected ? 1 : 0;
			CreateVipRoomMsg["msgCMD"] = Constant.MSG_GAME_VIP_CREATE_ROOM;

			//保存选择 
			CreateVipRoomMsgStorage = CreateVipRoomMsg;
			CreateVipRoomMsgStorage["psw"] = this.password_bitmap_label.text;
			myStorage.MyStorage.setCreatRoom(CreateVipRoomMsgStorage);
			myStorage.MyStorage.set(myStorage.KeyAndType.GameType_creatRoom, this.selectValue_creatGameSelectGroup);
			//密码mds5加密
			CreateVipRoomMsg["psw"] = appMD5.convertCaps(this.password_bitmap_label.text);
			centerHdl.CenterLobbyHdl.sendData(CreateVipRoomMsg);
		}

		private onClickPasswordImageDdz(event: egret.TouchEvent) {
			let passwordLayer = new PasswordLayer();
			sceneMgr.runScene.addLayer(passwordLayer);
			passwordLayer.passwordForParentBitmapLabel = this.password_bitmap_label_ddz;
		}


	}
}

module mySubassemblie {
	export class AreaSelectBtnOfCreatRoom extends eui.RadioButton implements eui.UIComponent {
		private areaSelectBtnOfCreatRoom_image: eui.Image;
		/**
		 * @param areaName 地区图片名
		 */
		public constructor(areaName: string = null) {
			super();
			if (areaName == null) {
				return;
			}
			this.skinName = "resource/mySubassemblie/AreaSelectBtnOfCreatRoom.exml";
			this.areaSelectBtnOfCreatRoom_image.source = areaName + "1_png";
			let property_upAndSelected: eui.SetProperty = <eui.SetProperty>this.skin.states[3].overrides[0];
			property_upAndSelected.value = RES.getRes(areaName + "_png");
			let property_downAndSelected: eui.SetProperty = <eui.SetProperty>this.skin.states[4].overrides[0];
			property_downAndSelected.value = RES.getRes(areaName + "_png");
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
	export class JuNumSelectBtnOfCreatRoom extends eui.RadioButton implements eui.UIComponent {
		private juNumSelectBtnOfCreatRoom_image: eui.Image;
		/**
		 * @param juNumPicName 局数图片名
		 */
		public constructor(juNumPicName: string = null) {
			super();
			if (juNumPicName == null) {
				return;
			}
			this.skinName = "resource/mySubassemblie/JuNumSelectBtnOfCreatRoom.exml";
			this.juNumSelectBtnOfCreatRoom_image.source = juNumPicName + "_png";
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
	export class PlayerNumSelectBtnOfCreatRoom extends eui.RadioButton implements eui.UIComponent {
		private playerNumSelectBtnOfCreatRoom_image: eui.Image;
		public constructor(playerNumPicName: string = null) {
			super();
			if (playerNumPicName == null) {
				return;
			}
			this.skinName = "resource/mySubassemblie/PlayerNumSelectBtnOfCreatRoom.exml";
			this.playerNumSelectBtnOfCreatRoom_image.source = playerNumPicName + "_png";
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
	export class RuleSelectBtnOfCreatRoom extends eui.CheckBox implements eui.UIComponent {
		private ruleSelectBtnOfCreatRoom_image: eui.Image;
		public constructor(rulePicName = null) {
			super();
			if (rulePicName == null) {
				return;
			}
			this.skinName = "resource/mySubassemblie/RuleSelectBtnOfCreatRoom.exml";
			this.ruleSelectBtnOfCreatRoom_image.source = rulePicName + "_png";
		}
		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
	}
}