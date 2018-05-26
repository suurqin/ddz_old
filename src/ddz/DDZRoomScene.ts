namespace ddz{

	// 斗地主游戏类 2018/4/11 add by bihx
	export class DDZRoomScene extends eui.Component {

		private stageW:number = 1280;// 舞台宽
		private stageH:number = 720;// 舞台高
		private cardW:number;// 纸牌宽
		private cardH:number;// 纸牌高

		private isVip:boolean = false;// 是否是VIP
		private playState:number;// 玩家状态
		private selfTablePos:number;// 玩家自己的桌子位置
		private currentTableId:number;// 当前桌子ID
		private vipQuanCount:number;// 圈数
		private requestStartGameMsgAck = {};// 开始游戏消息

		private ddzRoomId:number;// 房间号
		private ddzJuShuNum:number;// 局数
		private ddzDifenNum:number;// 底分
		private ddzDoubleNum:number;// 倍数
		private ddzPlayerName:string;// 玩家昵称
		private ddzPlayerGold:number;// 玩家金币
		private ddzRoomTime:string;// 系统时间

		private preCallPoint:number = 0;
		private isPlaying:boolean = false;
		private m_bHasLastCard:boolean = false;
		private lastPushPos:number = -1;
		private m_firstsend:number = 0;

		// 按钮
		private ddz_btn_record:eui.Button;// 记牌器
		private ddz_btn_chat:eui.Button;// 聊天
		private ddz_btn_spread:eui.Button;// 设置

		// 玩家操作按钮组
		private ddz_operation_group_call_dz:eui.Group;
		private ddz_btn_call_dz_no:eui.Button;// 不叫地主
		private ddz_btn_call_dz:eui.Button;// 叫地主
		private ddz_operation_group_call_score:eui.Group;
		private ddz_btn_call_dz_score_no:eui.Button;// 不叫
		private ddz_btn_call_dz_score_1:eui.Button;// 一分
		private ddz_btn_call_dz_score_2:eui.Button;// 二分
		private ddz_btn_call_dz_score_3:eui.Button;// 三分
		private ddz_operation_group_op_card:eui.Group;
		private ddz_op_bu_chu:eui.Button;// 不出
		private ddz_op_ti_shi:eui.Button;// 提示
		private ddz_op_chu_pai:eui.Button;// 出牌

		// 标签
		private ddz_room_id_label:eui.Label;// 房间号
		private ddz_jushu_num_label:eui.Label;// 局数
		private ddz_jushu_num:eui.Label;// 局数数
		private ddz_difen_num_label:eui.Label;// 底分
		private ddz_difen_num:eui.Label;// 底分数
		private ddz_double_num_label:eui.Label;// 倍数
		private ddz_double_num:eui.Label;// 倍数数
		private ddz_player_name_label:eui.Label;// 玩家昵称
		private ddz_player_gold_label:eui.Label;// 玩家金币
		private ddz_room_time_label:eui.Label;// 系统时间
		
		// 底牌组
		private ddz_dipai_group:eui.Group;

		// 发牌效果组
		private ddz_send_card_effect_group1:eui.Group;
		private ddz_send_card_effect_group2:eui.Group;
		private ddzSendCardEffectCardList1:egret.Bitmap[] = [];
		private ddzSendCardEffectCardList2:egret.Bitmap[] = [];

		// 手牌组
		private ddz_hand_card_group:eui.Group;
		private ddzSelfHandCardMap = {};
		private ddzSelfHandCardCodeList:number[] = [];
		private ddzSelfHandCardList:DDZCard[] = [];
		private ddzSelfRemovedHandCardMap = {};
		private ddzSelfRemovedHandCardList:DDZCard[] = [];

		private ddz_left_card_group:eui.Group;
		private ddzLeftHandCardMap = {};
		private ddzLeftHandCardList:DDZCard[] = [];
		private ddzLeftRemovedHandCardMap = {};
		private ddzLeftRemovedHandCardList:DDZCard[] = [];

		private ddz_right_card_group:eui.Group;
		private ddzRightHandCardMap = {};
		private ddzRightHandCardList:DDZCard[] = [];
		private ddzRightRemovedHandCardMap = {};
		private ddzRightRemovedHandCardList:DDZCard[] = [];

		// 玩家手牌剩余数
		private ddzPlayerLeftCardNumList:number[] = [];

		private ddzBeforeCardCodeList:number[] = [];// 上一轮出的牌
		private ddzLastCardCodeList:number[] = [];// 最新一轮出的牌
		private ddzLastTipCardCodeList:number[] = [];// 最新一轮提示的牌

		// 玩家信息组件
		private playerInfoCenter:ddz.DDZPlayerInfo;// 自己
		private playerInfoRight:ddz.DDZPlayerInfo;// 右侧
		private playerInfoLeft:ddz.DDZPlayerInfo;// 左侧

		// 操作计时器
		private clock:ddz.DDZCommonClock;
		// 声音效果
		private sound:ddz.DDZSound;

		// 记牌器面板
		private isDDZRecordBordVisible = true;
		private ddz_record_group:eui.Group;
		private ddz_record_board_label0:eui.Label;
		private ddz_record_board_label1:eui.Label;
		private ddz_record_board_label2:eui.Label;
		private ddz_record_board_label3:eui.Label;
		private ddz_record_board_label4:eui.Label;
		private ddz_record_board_label5:eui.Label;
		private ddz_record_board_label6:eui.Label;
		private ddz_record_board_label7:eui.Label;
		private ddz_record_board_label8:eui.Label;
		private ddz_record_board_label9:eui.Label;
		private ddz_record_board_label10:eui.Label;
		private ddz_record_board_label11:eui.Label;
		private ddz_record_board_label12:eui.Label;
		private ddz_record_board_label13:eui.Label;
		private ddz_record_board_label14:eui.Label;
		private ddzRecordBoardCardList:number[] = [];


		public constructor(){
			super();
			
			// 加载皮肤
			this.skinName = "resource/my_skins/DDZRoomScene.exml";

			// 初始化场景
			this.initDDZRoomScene();
		}

		/**
		 * 初始化场景
		 */
		private initDDZRoomScene():void{

			// 初始化属性
			this.initDDZElement();
			// 初始化事件
			this.initDDZEvent();
			// 初始化玩家信息组件
			this.initPLayerInfo();
			// 初始化发牌效果组
			this.initSendCardGroup();

			
			this.initSelfHandCard([103,104,105,106,107,108,109,203,204,205,206,207,303,304,305,306,307,403,404]);
			this.setPlayerOperationGroupOpCard(true, true, true, true);
			this.setRecordBordContent([4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]);
		}

		/**
		 * 初始化属性
		 */
		private initDDZElement() {
			// 倒计时时钟
			this.clock = new ddz.DDZCommonClock();
			this.addChild(this.clock);
			// 全局声音
			this.sound = new ddz.DDZSound();
		}

		/**
		 * 初始化事件
		 */
		private initDDZEvent() {

			this.ddz_btn_record.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRecord, this);
			this.ddz_btn_chat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showChat, this);
			this.ddz_btn_spread.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSpread, this);

			this.ddz_btn_call_dz_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationNoCallDiZhu, this);
			this.ddz_btn_call_dz.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationCallDiZhu, this);

			this.ddz_btn_call_dz_score_no.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationNoCallScore, this);
			this.ddz_btn_call_dz_score_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationCallScore1, this);
			this.ddz_btn_call_dz_score_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationCallScore2, this);
			this.ddz_btn_call_dz_score_3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationCallScore3, this);

			this.ddz_op_bu_chu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationBuChu, this);
			this.ddz_op_ti_shi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationTiShi, this);
			this.ddz_op_chu_pai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playerOperationChuPai, this);
		}

		/**
		 * 初始化玩家信息组件
		 */
		private initPLayerInfo() {
			// POS_CENTER
			this.playerInfoCenter = new ddz.DDZPlayerInfo();
			this.playerInfoCenter.x = 0;
			this.playerInfoCenter.y = 300;
			this.playerInfoCenter.$setVisible(true);
			this.playerInfoCenter.setChatBubbleVisible(false);
			this.playerInfoCenter.$tablePos = ddz.TablePosition.POS_CENTER;
			this.playerInfoCenter.setPlayerHeadImg(0);
			this.addChild(this.playerInfoCenter);
						
			// POS_RIGHT
			this.playerInfoRight = new ddz.DDZPlayerInfo();			
			this.playerInfoRight.x = this.stageW-this.playerInfoRight.getWidth();;
			this.playerInfoRight.y = 77;
			this.playerInfoRight.$setVisible(true);
			this.playerInfoRight.setChatBubbleVisible(false);
			this.playerInfoRight.$tablePos = ddz.TablePosition.POS_RIGHT;
			this.playerInfoRight.setPlayerHeadImg(1);
			this.addChild(this.playerInfoRight);

			// POS_LEFT
			this.playerInfoLeft = new ddz.DDZPlayerInfo();
			this.playerInfoLeft.x = 0;
			this.playerInfoLeft.y = 77;
			this.playerInfoLeft.$setVisible(true);
			this.playerInfoLeft.setChatBubbleVisible(false);
			this.playerInfoLeft.$tablePos = ddz.TablePosition.POS_LEFT;
			this.playerInfoLeft.setPlayerHeadImg(2);
			this.addChild(this.playerInfoLeft);
		}

		/**
		 * 添加玩家信息组件
		 */
		private addOnePLayerToTable(simplePlayer:ddz.SimplePlayer) {
			let tablePos = simplePlayer.tablePos;
			let inTable = simplePlayer.inTable;

            switch (tablePos) {
                case ddz.TablePosition.POS_CENTER:
                {
					this.playerInfoCenter.$isHas = true;
					this.playerInfoCenter.initPlayerData(simplePlayer);
					this.playerInfoCenter.$setVisible(true);
					if(inTable == 0){
						this.playerInfoCenter.playerOffline();
					}
                    break;
                }
                case ddz.TablePosition.POS_RIGHT:
                {
					this.playerInfoRight.$isHas = true;
					this.playerInfoRight.initPlayerData(simplePlayer);
					this.playerInfoRight.$setVisible(true);
					if(inTable == 0){
						this.playerInfoRight.playerOffline();
					}
                    break;
                }
                case ddz.TablePosition.POS_LEFT:
                {
					this.playerInfoLeft.$isHas = true;
					this.playerInfoLeft.initPlayerData(simplePlayer);
					this.playerInfoLeft.$setVisible(true);
					if(inTable == 0){
						this.playerInfoLeft.playerOffline();
					}
                    break;
                }
                default:{
                    break;
                }
            }
		}

		/**
		 * 初始化桌子玩家信息
		 */
		public initTable(ackMsg) {
			if(ackMsg == null){
				return;
			}
			this.requestStartGameMsgAck = ackMsg;
			this.currentTableId = ackMsg.vipTableID;

			if(this.currentTableId != 0){// VIP场

			}else{// 金币场
				this.isVip = false;
				this.initBaseRoomData(1, ackMsg.roomID);
			}

			if(manager.global.mPlayer == null){
				return;
			}
			// 设置我的座位号
			this.selfTablePos = ackMsg.tablePos;
			// 修改全局数据
            manager.global.mPlayer.tablePos = ackMsg.tablePos;
            manager.global.mPlayer.gold = ackMsg.gold;

			let playerList:ddz.SimplePlayer[] = ackMsg.players;
			let playerListLength = playerList.length;
			for (let i = 0; i < playerListLength; i++){
				let simplePlayer:ddz.SimplePlayer = playerList[i];
				this.addOnePLayerToTable(simplePlayer);
			}	
			// 更新底注
			let baseRoom:ddz.GameRoom = ddz.getGameRoomByRoomId(ackMsg.roomID);
			if(baseRoom != null){
				this.setDiFen(baseRoom.price);
			}
		}

		/**
		 * 初始化房间信息
		 */
		private initBaseRoomData(tag:number, value:any) {

			this.setRoomId(value.roomID);
			this.setPlayerName(value.creatorName);
			this.setPlayerGold(value.gold);
			this.setJuShu(5/20);
			this.setDiFen(200);
			this.setBeiShu(100);
			this.setRoomTime("18:18");
		}

		/**
		 * 初始化发牌效果组
		 */
		private initSendCardGroup() {
			this.ddz_send_card_effect_group1.$setVisible(false);
			this.ddz_send_card_effect_group2.$setVisible(false);
			for (let i = 0; i < 20; i++) {
				let cardImage:egret.Bitmap = ddz.createBitmapByName("ddzCard_json.ddz_card_back_small_png");
				cardImage.x = 0;
				cardImage.y = 0;
				cardImage.$setVisible(true);
				this.ddz_send_card_effect_group1.addChild(cardImage);
				this.ddzSendCardEffectCardList1.push(cardImage);
				this.cardW = cardImage.width;
				this.cardH = cardImage.height;
			}
			this.ddzSendCardEffectCardList1.reverse();

			for (let i = 0; i < 52; i++) {
				let imageName = "ddzCard_json.ddz_card_back_small_png";
				if(i < 51){
					if(i%3 == 0){
						imageName = "ddzCard_json.ddz_center_png";
					}else if(i%3 == 1){
						imageName = "ddzCard_json.ddz_left_png";
					}else if(i%3 == 2){
						imageName = "ddzCard_json.ddz_right_png";
					}
				}else{
					imageName = "ddzCard_json.ddz_card_back_small_png";
				}
				let cardImage:egret.Bitmap = ddz.createBitmapByName(imageName);
				cardImage.name = imageName;
				cardImage.x = (this.ddz_send_card_effect_group2.width - cardImage.width)/2;
				cardImage.y = (this.ddz_send_card_effect_group2.height - cardImage.height)/2;
				cardImage.$setVisible(true);
				this.ddz_send_card_effect_group2.addChild(cardImage);
				this.ddzSendCardEffectCardList2.push(cardImage);
			}
		}

		/**
		 * 开始发牌效果
		 */
		private startSendCardEffect() {

			this.clearTimeout();
			this.ddz_send_card_effect_group1.$setVisible(true);
			ddz.sendCardEffect1(this, 20, null);
		}

		/**
		 * 初始化手牌
		 */
		public initSelfHandCard(list:number[]) {
			list.sort(ddz.compareCardNumAsc);
			this.ddzSelfHandCardCodeList = list;
			for (let index in list) {
				let cardCode = list[index];
				let card = new DDZCard(cardCode);
				card.setPositionX((this.ddz_hand_card_group.width-card.width)/2);
				this.ddz_hand_card_group.addChild(card);
				this.ddzSelfHandCardMap[cardCode] = card;
				this.ddzSelfHandCardList.push(card);
			}
			this.ddz_hand_card_group.$setVisible(false);
		}

		/**
		 * 显示记牌器
		 */
		private showRecord() {
			if(this.ddz_record_group.visible){
				this.ddz_record_group.visible = false;
			}else{
				this.ddz_record_group.visible = true;
			}
		}

		/**
		 * 显示聊天
		 */
		private sssssssss:number = 0;
		private showChat() {

			this.setOpClockPosAndStart(this.sssssssss, 5);
			this.sssssssss++;
			if(this.sssssssss > 2){
				this.sssssssss = 0;
			}
			let type = ddz.getRandNumber(1, 8);
			let pos = ddz.getRandNumber(0, 2);
			this.getPlayerInfoByPos(pos).showTipText(this, pos, type);
		}

		/**
		 * 显示设置按钮组
		 */
		private showSpread() {
			let ran = ddz.getRandNumber(1, 8);
			this.sound.playPlayerOperationSound(this, ddz.TablePosition.POS_CENTER, ran);

		}

		/**
		 * 设置玩家操作按钮组(不叫 叫地主)
		 */
		public setPlayerOperationGroupCallDZ(isVisible:boolean, isBuJiao:boolean, isJiao:boolean) {
			if(isVisible){
				this.setPlayerOperationGroupOpCard(false, false, false, false);
				this.setPlayerOperationGroupCallScore(false, false, false, false, false);
			}
			this.ddz_operation_group_call_dz.$setVisible(isVisible);
			this.ddz_btn_call_dz_no.$setTouchEnabled(isBuJiao);
			this.ddz_btn_call_dz.$setTouchEnabled(isJiao);

			this.ddz_btn_call_dz_no.$setEnabled(isBuJiao);
			this.ddz_btn_call_dz.$setEnabled(isJiao);
		}

		/**
		 * 设置玩家操作按钮组(不出 提示 出牌)
		 */
		public setPlayerOperationGroupOpCard(isVisible:boolean, isBuChu:boolean, isTiShi:boolean, isChuPai:boolean) {
			if(isVisible){
				this.setPlayerOperationGroupCallDZ(false, false, false);
				this.setPlayerOperationGroupCallScore(false, false, false, false, false);
			}
			this.ddz_operation_group_op_card.$setVisible(isVisible);
			this.ddz_op_bu_chu.$setTouchEnabled(isBuChu);
			this.ddz_op_ti_shi.$setTouchEnabled(isTiShi);
			this.ddz_op_chu_pai.$setTouchEnabled(isChuPai);

			this.ddz_op_bu_chu.$setEnabled(isBuChu);
			this.ddz_op_ti_shi.$setEnabled(isTiShi);
			this.ddz_op_chu_pai.$setEnabled(isChuPai);
		}

		/**
		 * 设置玩家操作按钮组(不叫 一分 二分 三分)
		 */
		public setPlayerOperationGroupCallScore(isVisible:boolean, isBuJiao:boolean, isScore1:boolean, isScore2:boolean, isScore3:boolean) {
			if(isVisible){
				this.setPlayerOperationGroupCallDZ(false, false, false);
				this.setPlayerOperationGroupOpCard(false, false, false, false);
			}
			this.ddz_operation_group_call_score.$setVisible(isVisible);
			this.ddz_btn_call_dz_score_no.$setTouchEnabled(isBuJiao);
			this.ddz_btn_call_dz_score_1.$setTouchEnabled(isScore1);
			this.ddz_btn_call_dz_score_2.$setTouchEnabled(isScore2);
			this.ddz_btn_call_dz_score_3.$setTouchEnabled(isScore3);

			this.ddz_btn_call_dz_score_no.$setEnabled(isBuJiao);
			this.ddz_btn_call_dz_score_1.$setEnabled(isScore1);
			this.ddz_btn_call_dz_score_2.$setEnabled(isScore2);
			this.ddz_btn_call_dz_score_3.$setEnabled(isScore3);
		}

		/**
		 * 根据callPoint设置玩家操作按钮组(不叫 一分 二分 三分)
		 */
		public setOpCallScoreBtnByCallPoint(isVisible:boolean, isBuJiao:boolean, callPoint:number) {
			if(isVisible){
				this.setPlayerOperationGroupCallDZ(false, false, false);
				this.setPlayerOperationGroupOpCard(false, false, false, false);
			}
			this.ddz_operation_group_call_score.$setVisible(isVisible);
			this.ddz_btn_call_dz_score_no.$setTouchEnabled(isBuJiao);
			this.ddz_btn_call_dz_score_1.$setTouchEnabled(callPoint < 1);
			this.ddz_btn_call_dz_score_2.$setTouchEnabled(callPoint < 2);
			this.ddz_btn_call_dz_score_3.$setTouchEnabled(callPoint < 3);

			this.ddz_btn_call_dz_score_no.$setEnabled(isBuJiao);
			this.ddz_btn_call_dz_score_1.$setEnabled(callPoint < 1);
			this.ddz_btn_call_dz_score_2.$setEnabled(callPoint < 2);
			this.ddz_btn_call_dz_score_3.$setEnabled(callPoint < 3);
		}

		/**
		 * 设置按钮组不显示
		 */
		public setPlayerOperationGroup() {
			this.setPlayerOperationGroupCallDZ(false, false, false);
			this.setPlayerOperationGroupOpCard(false, false, false, false);
			this.setPlayerOperationGroupCallScore(false, false, false, false, false);
		}

		/**
		 * 玩家操作不叫地主
		 */
		public playerOperationNoCallDiZhu() {
			// console.log("----------------玩家操作不叫地主------------------");

		}

		/**
		 * 玩家操作叫地主
		 */
		public playerOperationCallDiZhu() {
			// console.log("----------------玩家操作叫地主------------------");

		}

		/**
		 * 玩家操作不叫分
		 */
		public playerOperationNoCallScore() {
			// console.log("----------------玩家操作不叫分------------------");

		}

		/**
		 * 玩家操作叫一分
		 */
		public playerOperationCallScore1() {
			// console.log("----------------玩家操作叫一分------------------");

		}

		/**
		 * 玩家操作叫二分
		 */
		public playerOperationCallScore2() {
			// console.log("----------------玩家操作叫二分------------------");

		}

		/**
		 * 玩家操作叫三分
		 */
		public playerOperationCallScore3() {
			// console.log("----------------玩家操作叫三分------------------");

		}

		/**
		 * 玩家操作不出
		 */
		public playerOperationBuChu() {
			// console.log("----------------玩家操作不出------------------");

			this.playerInfoCenter.setPlayerToDiZhu();
			this.playerInfoRight.setPlayerToDiZhu();
			this.playerInfoLeft.setPlayerToDiZhu();
		}

		/**
		 * 玩家操作提示
		 */
		public playerOperationTiShi() {
			// console.log("----------------玩家操作提示------------------");
			this.startSendCardEffect();

			this.playerInfoCenter.setChatBubbleContent("测试测试");
			this.playerInfoRight.setChatBubbleContent("测试测试");
			this.playerInfoLeft.setChatBubbleContent("测试测试");

			ddz.fadeInOutEffect(this.playerInfoCenter.getChatBubble(), 500, 1000, 500);
			ddz.fadeInOutEffect(this.playerInfoRight.getChatBubble(), 500, 1000, 500);
			ddz.fadeInOutEffect(this.playerInfoLeft.getChatBubble(), 500, 1000, 500);

		}

		/**
		 * 玩家操作出牌
		 */
		public playerOperationChuPai() {
			// console.log("----------------玩家操作出牌------------------");
			
			// this.centerPushCard();
			// this.leftOrRightPushCard([103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,113,114,115,116,117], true);
			// this.leftOrRightPushCard([103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,113,114,115,116,117], false);
			// ddz.playCardAnimation(this, ddz.DDZPushCardType.DDZ_PUSH_CARD_SZ, ddz.TablePosition.POS_CENTER);
			let ddzRemovedHandCardList:number[] = [];
			this.ddzSelfHandCardList.forEach(element => {
				if(element.isSeleted && !element.isRemoved){
					ddzRemovedHandCardList.push(element.cardCode);
				}
			});	
			this.notificationSendPoker(ddzRemovedHandCardList, ddz.TablePosition.POS_CENTER);
		}

		/**
		 * 玩家操作出牌(自己)
		 */
		public centerPushCard(){
			// 将上一次出的牌移除
			this.cleanPushedCard(ddz.TablePosition.POS_CENTER);

			// 当前出的牌
			let ddzRemovedHandCardList:DDZCard[] = [];
			this.ddzSelfHandCardList.forEach(element => {
				if(element.isSeleted && !element.isRemoved){
					element.isRemoved = true;
					ddzRemovedHandCardList.push(element);
				}
			});	
			
			let removedNum = ddzRemovedHandCardList.length;
			for (let i = 0; i < removedNum; i++){
				let element:DDZCard = ddzRemovedHandCardList[i];
				if(element.isSeleted && element.isRemoved){

					element.clickCardEnd();
					element.$setTouchEnabled(false);
					// 从列表移除牌
					this.ddzSelfHandCardMap[element.cardCode] = null;
					this.ddzSelfHandCardList.splice(this.ddzSelfHandCardList.indexOf(element), 1);
	
					// 加入到移除组
					this.ddzSelfRemovedHandCardMap[element.cardCode] = element;
					this.ddzSelfRemovedHandCardList.push(element);	

					// 出牌动画
					ddz.handCardOutEffect(element, this.stageW, this.stageH, ddz.DDZCardSpace.DDZ_CARD_SPACE_30, 
											removedNum, i, this.ddz_hand_card_group.y, 300);
				}
			}
			ddzRemovedHandCardList = [];

			// 重新计算手牌位置
			let listLength:number = this.ddzSelfHandCardList.length;
			for (let index in this.ddzSelfHandCardList) {
				let card = this.ddzSelfHandCardList[index];
				let newX = ddz.cardPositionUtil(listLength, Number(index), card.cardWidth, this.stageW);
				ddz.twMoveToPositionXAndEase(card, newX, 600, egret.Ease.circInOut)
			}
		}

		/**
		 * 玩家操作出牌(左侧或右侧玩家)
		 */
		public leftOrRightPushCard(pushCardList:number[], isRight:boolean){
			let pushCardNum = pushCardList.length;
			if(pushCardNum <= 0){
				return;
			}
			if(isRight){
				this.cleanPushedCard(ddz.TablePosition.POS_RIGHT);
			}else{
				this.cleanPushedCard(ddz.TablePosition.POS_LEFT);
			}

			let cardSpace = ddz.DDZCardSpace.DDZ_CARD_SPACE_20;
			let cardWidth = 0;
			for (let i = 0; i < pushCardNum; i++){
				let code = pushCardList[i];
				let card:ddz.DDZCard = new ddz.DDZCard(code);
				card.$setTouchEnabled(false);
				card.isSeleted = true;
				card.isRemoved = true;
				// 计算出牌位置
				ddz.getLeftOrRightPushCardXAndY(card, pushCardNum, cardSpace, cardWidth, i, isRight);
				if(isRight){
					this.ddzRightRemovedHandCardList.push(card);
					this.ddz_right_card_group.addChild(card);
				}else{
					this.ddzLeftRemovedHandCardList.push(card);
					this.ddz_left_card_group.addChild(card);
				}
			}
			let newX = 0;
			let newY = 130;
			let spaceNum = pushCardNum-1;
			if(pushCardNum > 13){
				spaceNum = 13;
			}
			if(isRight){
				newX = this.stageW-(260+cardSpace*spaceNum+cardWidth);
				ddz.leftOrRightHandCardOutEffect(this.ddz_right_card_group, newX, newY, 300);
			}else{
				newX = 260+cardSpace*spaceNum;
				ddz.leftOrRightHandCardOutEffect(this.ddz_left_card_group, newX, newY, 300);
			}
		}

		/**
		 * 设置记牌器显示
		 */
		public setRecordBordVisible(showRecorder:number) {
			if(showRecorder == 1){
				this.isDDZRecordBordVisible = true;
				this.ddz_btn_record.$setVisible(true);
				this.ddz_record_group.$setVisible(true);
			}else{
				this.isDDZRecordBordVisible = false;
				this.ddz_btn_record.$setVisible(false);
				this.ddz_record_group.$setVisible(false);
			}
		}

		/**
		 * 设置记牌器内容
		 */
		public setRecordBordContent(countingCards:number[]){
			this.ddzRecordBoardCardList = [];
			this.ddzRecordBoardCardList = countingCards;
			let listLength = this.ddzRecordBoardCardList.length;
			if(this.isDDZRecordBordVisible && listLength>0){
				for (let i = 0; i < listLength; i++){
					if(i > 14){
						break;
					}
					let cardNum = this.ddzRecordBoardCardList[i];
					let labelName = "ddz_record_board_label"+i;
					this[labelName].$setText(""+cardNum)
				}
			}
		}

		/**
		 * 提醒玩家操作发牌
		 */
		public operationSendCard(operationMsg:ddz.DDZGameOpertaionAckMsg){

			this.preCallPoint = -1;
			this.isPlaying = true;
			// 设置记牌器显示
			this.setRecordBordVisible(operationMsg.cardCounting);
			this.ddzPlayerLeftCardNumList[0] = ddz.DDZCardNum.DDZ_START_CARD_NUM;
			this.ddzPlayerLeftCardNumList[1] = ddz.DDZCardNum.DDZ_START_CARD_NUM;
			this.ddzPlayerLeftCardNumList[2] = ddz.DDZCardNum.DDZ_START_CARD_NUM;
			// 设置玩家剩余牌数
			this.setPlayerLeftCardNum();
			// 清除手牌
			this.clearSelfHandCard();
			// 初始化手牌
			this.initSelfHandCard(operationMsg.cards);
			// 开始发牌效果
			this.startSendCardEffect();
			// 设置记牌器内容
			this.setRecordBordContent(operationMsg.countingCards);
			if(this.vipQuanCount != -1){
				this.setJuShu(operationMsg.quanCount);
			}
		}

		/**
		 * 提醒玩家操作叫地主
		 */
		public operationCallLandLord(operationMsg:ddz.DDZGameOpertaionAckMsg){
			let callPoint = operationMsg.callPoint;
			if (callPoint > this.preCallPoint){
				if(callPoint == 5){
					this.preCallPoint = 3;
				}else{
					this.preCallPoint = callPoint;
				}
			}
			this.sound.playPlayerOperationSound(this, operationMsg.tablePos, operationMsg.callPoint+2);
			let tablePos = ddz.getTablePos(this.selfTablePos, operationMsg.tablePos);
			switch(tablePos) { 
				// POS_CENTER
				case ddz.TablePosition.POS_CENTER: { 
					this.playerInfoCenter.showTipText(this, tablePos, operationMsg.callPoint+2);
					if(operationMsg.callPoint == 3){
						this.playerInfoCenter.setPlayerToDiZhu();
						this.playerInfoLeft.setPlayerToNongMin();
						this.playerInfoRight.setPlayerToNongMin();
					}
					break; 
				} 
				// POS_RIGHT
				case ddz.TablePosition.POS_RIGHT: { 
					this.playerInfoRight.showTipText(this, tablePos, operationMsg.callPoint+2);
					if(operationMsg.callPoint == 3){
						this.playerInfoCenter.setPlayerToNongMin();
						this.playerInfoLeft.setPlayerToNongMin();
						this.playerInfoRight.setPlayerToDiZhu();
					}
					break; 
				} 
				// POS_LEFT
				case ddz.TablePosition.POS_LEFT: { 
					this.playerInfoLeft.showTipText(this, tablePos, operationMsg.callPoint+2);
					if(operationMsg.callPoint == 3){
						this.playerInfoCenter.setPlayerToNongMin();
						this.playerInfoLeft.setPlayerToDiZhu();
						this.playerInfoRight.setPlayerToNongMin();
					}
					break; 
				} 
				default: { 
					break; 
				} 
			} 
			this.setDiFen(this.ddzDifenNum);
			this.setBeiShu(this.preCallPoint > 1 ? this.preCallPoint : 1);
		}

		/**
		 * 提醒玩家操作出牌
		 */
		public operationPushCard(operationMsg:ddz.DDZGameOpertaionAckMsg){
			// 设置记牌器
			this.setRecordBordContent(operationMsg.countingCards);
			// 设置计时器
			this.clock.stopTimer();
			// 设置玩家剩余牌数
			let cardNum = operationMsg.cards.length;
			this.ddzPlayerLeftCardNumList[operationMsg.tablePos] = cardNum;
			this.setPlayerLeftCardNum();
			// 设置玩家操作按钮组不显示
			this.setPlayerOperationGroup();
			this.m_bHasLastCard = false;
			if(cardNum > 0){
				if(this.ddzLastCardCodeList.length > 0 && this.lastPushPos != operationMsg.tablePos){
					this.m_bHasLastCard = true;
				}
				this.lastPushPos = operationMsg.tablePos;
				this.ddzLastCardCodeList = operationMsg.cards;
				this.ddzLastTipCardCodeList = this.ddzLastCardCodeList;
				this.notificationSendPoker(this.ddzLastCardCodeList, this.lastPushPos);
				
			}else{
				// 不出
				let playerInfo:ddz.DDZPlayerInfo = this.getPlayerInfoByPos(operationMsg.tablePos);
				playerInfo.showTipText(this, operationMsg.tablePos, ddz.DDZActionType.DDZ_ACTION_TYPE_BC);
				// 清除出过的牌
				this.cleanPushedCard(operationMsg.tablePos);
			}
		}

		/**
		 * 提醒玩家操作轮到xx叫地主
		 */
		public operationNextCallLandLord(operationMsg:ddz.DDZGameOpertaionAckMsg){
			this.setOpClockPosAndStart(operationMsg.tablePos, 15);
			if(operationMsg.tablePos == this.selfTablePos){
				if(operationMsg.callPoint == 5){
					this.setOpCallScoreBtnByCallPoint(true, false, 2);
				}else{
					this.setOpCallScoreBtnByCallPoint(true, true, this.preCallPoint);
				}
			}
			else{
				this.setOpCallScoreBtnByCallPoint(false, false, 4);
			}
		}

		// /**
		//  * 提醒玩家操作发牌
		//  */
		// public operationSendCard(operationMsg:ddz.DDZGameOpertaionAckMsg){
		// }

		// /**
		//  * 提醒玩家操作发牌
		//  */
		// public operationSendCard(operationMsg:ddz.DDZGameOpertaionAckMsg){
		// }

		// /**
		//  * 提醒玩家操作发牌
		//  */
		// public operationSendCard(operationMsg:ddz.DDZGameOpertaionAckMsg){
		// }

		// /**
		//  * 提醒玩家操作发牌
		//  */
		// public operationSendCard(operationMsg:ddz.DDZGameOpertaionAckMsg){
		// }

		// /**
		//  * 提醒玩家操作发牌
		//  */
		// public operationSendCard(operationMsg:ddz.DDZGameOpertaionAckMsg){
		// }



		/**
		 * 玩家操作出牌
		 */
		public notificationSendPoker(cardList:number[], pos:number) {
			let cData = ddz.createCardData(cardList);
			ddz.refreshCardData(this, cData, false);
			let sex = 0;
			switch (pos) {
                case ddz.TablePosition.POS_CENTER:
                {
					sex = this.$playerInfoCenter.$playerSex;
					cardList.forEach(code => {
						this.ddzSelfHandCardList.forEach(card => {
							if(card.cardCode == code){
								card.isSeleted = true;
								card.isRemoved = false;
							}
						});	
					});

					this.centerPushCard();
                    break;
                }
                case ddz.TablePosition.POS_RIGHT:
                {
					sex = this.$playerInfoRight.$playerSex;
					this.leftOrRightPushCard(cardList, true);
                    break;
                }
                case ddz.TablePosition.POS_LEFT:
                {
					sex = this.$playerInfoLeft.$playerSex;
					this.leftOrRightPushCard(cardList, false);
                    break;
                }
                default:{
                    break;
                }
            }
			let animType:number = -1;
			let cardType = cData.type;
			let typeCount = cData.typeCount;
			console.log(cardType+"--------"+typeCount);
			if (cardType == ddz.DDZCardType.CARD_TYPE_SINGLE){
				if (typeCount != 1){
					animType = ddz.DDZPushCardType.DDZ_PUSH_CARD_SZ;		
				}
			}else if (cardType == ddz.DDZCardType.CARD_TYPE_DOUBBLE){
				if (typeCount != 1){
					animType = 5;	
				}
			}else if (cardType == ddz.DDZCardType.CARD_TYPE_ROCKET){
				animType = ddz.DDZPushCardType.DDZ_PUSH_CARD_WZ;
			}else if (cardType == ddz.DDZCardType.CARD_TYPE_FOUR){
				animType = ddz.DDZPushCardType.DDZ_PUSH_CARD_ZD;
			}else if (cardType == ddz.DDZCardType.CARD_TYPE_PLANE){
				animType = ddz.DDZPushCardType.DDZ_PUSH_CARD_FJ;
			}
			ddz.playCardAnimation(this, animType, pos);
			this.sound.playPushCardSoundBySex(cData, sex, pos);
		}

		/**
		 * 清除玩家出过的牌
		 */
		public cleanPushedCard(tablePos) {
			switch (tablePos) {
                case ddz.TablePosition.POS_CENTER:
                {
					this.ddzSelfRemovedHandCardList.forEach(element => {
						if(element.isSeleted && element.isRemoved){
							this.ddz_hand_card_group.removeChild(element);
						}
					});	
					this.ddzSelfRemovedHandCardMap = {}
					this.ddzSelfRemovedHandCardList = [];
                    break;
                }
                case ddz.TablePosition.POS_RIGHT:
                {
					this.ddz_right_card_group.removeChildren();
					this.ddz_right_card_group.x = this.stageW;
					this.ddz_right_card_group.y = 0;
					this.ddzRightRemovedHandCardList = [];
                    break;
                }
                case ddz.TablePosition.POS_LEFT:
                {
					this.ddz_left_card_group.removeChildren();
					this.ddz_left_card_group.x = -this.ddz_left_card_group.width;
					this.ddz_left_card_group.y = 0;
					this.ddzLeftRemovedHandCardList = [];
                    break;
                }
                default:{
                    break;
                }
            }
		}

		/**
		 * 设置玩家剩余牌数
		 */
		public setPlayerLeftCardNum() {
			for (let i = 0; i < 3; i++){
				let pos = ddz.getTablePos(this.selfTablePos, i);
				let num = this.setPlayerLeftCardNum[i];
				if(num < 0){
					return;
				}
				if(pos == ddz.TablePosition.POS_LEFT){
					this.playerInfoLeft.setPlayerCardNum(num);
				}else if(pos == ddz.TablePosition.POS_RIGHT){
					this.playerInfoRight.setPlayerCardNum(num);
				}
			}
		}

		/**
		 * 设置玩家操作计时器位置并开启
		 */
		public setOpClockPosAndStart(pos:number, time:number) {

			this.clock.startTimer(time, ddd);
			function ddd(){
				console.log("------------------------倒计时结束啦啦啦啦------------------------");

			}
			let x:number = this.stageW/2;
			let y:number = this.stageH/2;
			switch (pos) {
                case ddz.TablePosition.POS_CENTER:
                {
					x = (this.width-this.clock.width)/2;
					y = this.ddz_operation_group_call_dz.y-this.clock.height;
                    break;
                }
                case ddz.TablePosition.POS_RIGHT:
                {
					x = 960;
					y = 167;
                    break;
                }
                case ddz.TablePosition.POS_LEFT:
                {
					x = 260;
					y = 167;
                    break;
                }
                default:{
                    break;
                }
            }
			this.clock.setPosition(x, y);
		}

		/**
		 * 根据桌子返回玩家信息
		 */
		public getPlayerInfoByPos(tabPos:number) {
			let result:ddz.DDZPlayerInfo = null;
			switch(tabPos) { 
				// POS_CENTER
				case ddz.TablePosition.POS_CENTER: { 
					result = this.playerInfoCenter;
					break; 
				} 
				// POS_RIGHT
				case ddz.TablePosition.POS_RIGHT: { 
					result = this.playerInfoRight;
					break; 
				} 
				// POS_LEFT
				case ddz.TablePosition.POS_LEFT: { 
					result = this.playerInfoLeft;
					break; 
				} 
				default: { 
					break; 
				} 
			} 
			return result;
		}

		/**
		 * 清除自己手牌列表
		 */
		public clearSelfHandCard() {
			this.ddz_hand_card_group.removeChildren();
			this.ddzSelfHandCardMap = {};
			this.ddzSelfHandCardList = [];
			this.ddzSelfHandCardCodeList = [];
		}

		/**
		 * 设置房间号
		 */
		public setRoomId(roomId:number) {

			this.ddzRoomId = roomId;
			this.ddz_room_id_label.$setText(""+roomId);
		}

		/**
		 * 设置倍数
		 */
		public setJuShu(juShu:number) {
					
			this.ddzJuShuNum = juShu;
			this.ddz_jushu_num_label.$setText(""+juShu);
		}

		/**
		 * 设置底分
		 */
		public setDiFen(diFen:number) {
					
			this.ddzDifenNum = diFen;
			this.ddz_difen_num.$setText(""+diFen);
		}

		/**
		 * 设置倍数
		 */
		public setBeiShu(beiShu:number) {
					
			this.ddzDoubleNum = beiShu;
			this.ddz_double_num.$setText(""+beiShu);
		}

		/**
		 * 设置玩家昵称
		 */
		public setPlayerName(playerName:string) {
					
			this.ddzPlayerName = playerName;
			this.ddz_player_name_label.$setText(""+playerName);
		}

		/**
		 * 设置玩家金币
		 */
		public setPlayerGold(playerGold:number) {
					
			this.ddzPlayerGold = playerGold;
			this.ddz_player_gold_label.$setText(""+playerGold);
		}

		/**
		 * 设置系统时间
		 */
		public setRoomTime(roomTime:string) {
					
			this.ddzRoomTime = roomTime;
			this.ddz_room_time_label.$setText(""+roomTime);
		}


		/**
		 * 清除超时触发器
		 */
		public clearTimeout() {
			// 停止超时触发器
			egret.clearTimeout(0);
		}



		





		/**
		 * Getter $stageW
		 * @return {number }
		 */
		public get $stageW(): number  {
			return this.stageW;
		}

		/**
		 * Getter $stageH
		 * @return {number }
		 */
		public get $stageH(): number  {
			return this.stageH;
		}

		/**
		 * Getter $cardW
		 * @return {number}
		 */
		public get $cardW(): number {
			return this.cardW;
		}

		/**
		 * Getter $cardH
		 * @return {number}
		 */
		public get $cardH(): number {
			return this.cardH;
		}

		/**
		 * Getter $isVip
		 * @return {boolean }
		 */
		public get $isVip(): boolean  {
			return this.isVip;
		}

		/**
		 * Getter $playState
		 * @return {number}
		 */
		public get $playState(): number {
			return this.playState;
		}

		/**
		 * Getter $selfTablePos
		 * @return {number}
		 */
		public get $selfTablePos(): number {
			return this.selfTablePos;
		}

		/**
		 * Getter $currentTableId
		 * @return {number}
		 */
		public get $currentTableId(): number {
			return this.currentTableId;
		}

		/**
		 * Getter $vipQuanCount
		 * @return {number}
		 */
		public get $vipQuanCount(): number {
			return this.vipQuanCount;
		}

		/**
		 * Getter $ddzRoomId
		 * @return {number}
		 */
		public get $ddzRoomId(): number {
			return this.ddzRoomId;
		}

		/**
		 * Getter $ddzJuShuNum
		 * @return {number}
		 */
		public get $ddzJuShuNum(): number {
			return this.ddzJuShuNum;
		}

		/**
		 * Getter $ddzDifenNum
		 * @return {number}
		 */
		public get $ddzDifenNum(): number {
			return this.ddzDifenNum;
		}

		/**
		 * Getter $ddzDoubleNum
		 * @return {number}
		 */
		public get $ddzDoubleNum(): number {
			return this.ddzDoubleNum;
		}

		/**
		 * Getter $ddzPlayerName
		 * @return {string}
		 */
		public get $ddzPlayerName(): string {
			return this.ddzPlayerName;
		}

		/**
		 * Getter $ddzPlayerGold
		 * @return {number}
		 */
		public get $ddzPlayerGold(): number {
			return this.ddzPlayerGold;
		}

		/**
		 * Getter $ddzRoomTime
		 * @return {string}
		 */
		public get $ddzRoomTime(): string {
			return this.ddzRoomTime;
		}

		/**
		 * Getter $preCallPoint
		 * @return {number }
		 */
		public get $preCallPoint(): number  {
			return this.preCallPoint;
		}

		/**
		 * Getter $isPlaying
		 * @return {boolean }
		 */
		public get $isPlaying(): boolean  {
			return this.isPlaying;
		}

		/**
		 * Getter $ddz_btn_record
		 * @return {eui.Button}
		 */
		public get $ddz_btn_record(): eui.Button {
			return this.ddz_btn_record;
		}

		/**
		 * Getter $ddz_btn_chat
		 * @return {eui.Button}
		 */
		public get $ddz_btn_chat(): eui.Button {
			return this.ddz_btn_chat;
		}

		/**
		 * Getter $ddz_btn_spread
		 * @return {eui.Button}
		 */
		public get $ddz_btn_spread(): eui.Button {
			return this.ddz_btn_spread;
		}

		/**
		 * Getter $ddz_operation_group_call_dz
		 * @return {eui.Group}
		 */
		public get $ddz_operation_group_call_dz(): eui.Group {
			return this.ddz_operation_group_call_dz;
		}

		/**
		 * Getter $ddz_btn_call_dz_no
		 * @return {eui.Button}
		 */
		public get $ddz_btn_call_dz_no(): eui.Button {
			return this.ddz_btn_call_dz_no;
		}

		/**
		 * Getter $ddz_btn_call_dz
		 * @return {eui.Button}
		 */
		public get $ddz_btn_call_dz(): eui.Button {
			return this.ddz_btn_call_dz;
		}

		/**
		 * Getter $ddz_operation_group_call_score
		 * @return {eui.Group}
		 */
		public get $ddz_operation_group_call_score(): eui.Group {
			return this.ddz_operation_group_call_score;
		}

		/**
		 * Getter $ddz_btn_call_dz_score_no
		 * @return {eui.Button}
		 */
		public get $ddz_btn_call_dz_score_no(): eui.Button {
			return this.ddz_btn_call_dz_score_no;
		}

		/**
		 * Getter $ddz_btn_call_dz_score_1
		 * @return {eui.Button}
		 */
		public get $ddz_btn_call_dz_score_1(): eui.Button {
			return this.ddz_btn_call_dz_score_1;
		}

		/**
		 * Getter $ddz_btn_call_dz_score_2
		 * @return {eui.Button}
		 */
		public get $ddz_btn_call_dz_score_2(): eui.Button {
			return this.ddz_btn_call_dz_score_2;
		}

		/**
		 * Getter $ddz_btn_call_dz_score_3
		 * @return {eui.Button}
		 */
		public get $ddz_btn_call_dz_score_3(): eui.Button {
			return this.ddz_btn_call_dz_score_3;
		}

		/**
		 * Getter $ddz_operation_group_op_card
		 * @return {eui.Group}
		 */
		public get $ddz_operation_group_op_card(): eui.Group {
			return this.ddz_operation_group_op_card;
		}

		/**
		 * Getter $ddz_op_bu_chu
		 * @return {eui.Button}
		 */
		public get $ddz_op_bu_chu(): eui.Button {
			return this.ddz_op_bu_chu;
		}

		/**
		 * Getter $ddz_op_ti_shi
		 * @return {eui.Button}
		 */
		public get $ddz_op_ti_shi(): eui.Button {
			return this.ddz_op_ti_shi;
		}

		/**
		 * Getter $ddz_op_chu_pai
		 * @return {eui.Button}
		 */
		public get $ddz_op_chu_pai(): eui.Button {
			return this.ddz_op_chu_pai;
		}

		/**
		 * Getter $ddz_room_id_label
		 * @return {eui.Label}
		 */
		public get $ddz_room_id_label(): eui.Label {
			return this.ddz_room_id_label;
		}

		/**
		 * Getter $ddz_jushu_num_label
		 * @return {eui.Label}
		 */
		public get $ddz_jushu_num_label(): eui.Label {
			return this.ddz_jushu_num_label;
		}

		/**
		 * Getter $ddz_jushu_num
		 * @return {eui.Label}
		 */
		public get $ddz_jushu_num(): eui.Label {
			return this.ddz_jushu_num;
		}

		/**
		 * Getter $ddz_difen_num_label
		 * @return {eui.Label}
		 */
		public get $ddz_difen_num_label(): eui.Label {
			return this.ddz_difen_num_label;
		}

		/**
		 * Getter $ddz_difen_num
		 * @return {eui.Label}
		 */
		public get $ddz_difen_num(): eui.Label {
			return this.ddz_difen_num;
		}

		/**
		 * Getter $ddz_double_num_label
		 * @return {eui.Label}
		 */
		public get $ddz_double_num_label(): eui.Label {
			return this.ddz_double_num_label;
		}

		/**
		 * Getter $ddz_double_num
		 * @return {eui.Label}
		 */
		public get $ddz_double_num(): eui.Label {
			return this.ddz_double_num;
		}

		/**
		 * Getter $ddz_player_name_label
		 * @return {eui.Label}
		 */
		public get $ddz_player_name_label(): eui.Label {
			return this.ddz_player_name_label;
		}

		/**
		 * Getter $ddz_player_gold_label
		 * @return {eui.Label}
		 */
		public get $ddz_player_gold_label(): eui.Label {
			return this.ddz_player_gold_label;
		}

		/**
		 * Getter $ddz_room_time_label
		 * @return {eui.Label}
		 */
		public get $ddz_room_time_label(): eui.Label {
			return this.ddz_room_time_label;
		}

		/**
		 * Getter $ddz_record_group
		 * @return {eui.Group}
		 */
		public get $ddz_record_group(): eui.Group {
			return this.ddz_record_group;
		}

		/**
		 * Getter $ddz_record_board_label0
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label0(): eui.Label {
			return this.ddz_record_board_label0;
		}

		/**
		 * Getter $ddz_record_board_label1
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label1(): eui.Label {
			return this.ddz_record_board_label1;
		}

		/**
		 * Getter $ddz_record_board_label2
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label2(): eui.Label {
			return this.ddz_record_board_label2;
		}

		/**
		 * Getter $ddz_record_board_label3
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label3(): eui.Label {
			return this.ddz_record_board_label3;
		}

		/**
		 * Getter $ddz_record_board_label4
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label4(): eui.Label {
			return this.ddz_record_board_label4;
		}

		/**
		 * Getter $ddz_record_board_label5
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label5(): eui.Label {
			return this.ddz_record_board_label5;
		}

		/**
		 * Getter $ddz_record_board_label6
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label6(): eui.Label {
			return this.ddz_record_board_label6;
		}

		/**
		 * Getter $ddz_record_board_label7
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label7(): eui.Label {
			return this.ddz_record_board_label7;
		}

		/**
		 * Getter $ddz_record_board_label8
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label8(): eui.Label {
			return this.ddz_record_board_label8;
		}

		/**
		 * Getter $ddz_record_board_label9
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label9(): eui.Label {
			return this.ddz_record_board_label9;
		}

		/**
		 * Getter $ddz_record_board_label10
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label10(): eui.Label {
			return this.ddz_record_board_label10;
		}

		/**
		 * Getter $ddz_record_board_label11
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label11(): eui.Label {
			return this.ddz_record_board_label11;
		}

		/**
		 * Getter $ddz_record_board_label12
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label12(): eui.Label {
			return this.ddz_record_board_label12;
		}

		/**
		 * Getter $ddz_record_board_label13
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label13(): eui.Label {
			return this.ddz_record_board_label13;
		}

		/**
		 * Getter $ddz_record_board_label14
		 * @return {eui.Label}
		 */
		public get $ddz_record_board_label14(): eui.Label {
			return this.ddz_record_board_label14;
		}

		/**
		 * Getter $ddzRecordBoardCardList
		 * @return {number[] }
		 */
		public get $ddzRecordBoardCardList(): number[]  {
			return this.ddzRecordBoardCardList;
		}

		/**
		 * Getter $ddz_dipai_group
		 * @return {eui.Group}
		 */
		public get $ddz_dipai_group(): eui.Group {
			return this.ddz_dipai_group;
		}

		/**
		 * Getter $ddz_send_card_effect_group1
		 * @return {eui.Group}
		 */
		public get $ddz_send_card_effect_group1(): eui.Group {
			return this.ddz_send_card_effect_group1;
		}

		/**
		 * Getter $ddz_send_card_effect_group2
		 * @return {eui.Group}
		 */
		public get $ddz_send_card_effect_group2(): eui.Group {
			return this.ddz_send_card_effect_group2;
		}

		/**
		 * Getter $ddzSendCardEffectCardList1
		 * @return {egret.Bitmap[] }
		 */
		public get $ddzSendCardEffectCardList1(): egret.Bitmap[]  {
			return this.ddzSendCardEffectCardList1;
		}

		/**
		 * Getter $ddzSendCardEffectCardList2
		 * @return {egret.Bitmap[] }
		 */
		public get $ddzSendCardEffectCardList2(): egret.Bitmap[]  {
			return this.ddzSendCardEffectCardList2;
		}

		/**
		 * Getter $ddz_hand_card_group
		 * @return {eui.Group}
		 */
		public get $ddz_hand_card_group(): eui.Group {
			return this.ddz_hand_card_group;
		}

		/**
		 * Getter $ddzSelfHandCardList
		 * @return {DDZCard[] }
		 */
		public get $ddzSelfHandCardList(): DDZCard[]  {
			return this.ddzSelfHandCardList;
		}

		/**
		 * Getter $ddzSelfRemovedHandCardList
		 * @return {DDZCard[] }
		 */
		public get $ddzSelfRemovedHandCardList(): DDZCard[]  {
			return this.ddzSelfRemovedHandCardList;
		}

		/**
		 * Getter $ddzLeftHandCardList
		 * @return {DDZCard[] }
		 */
		public get $ddzLeftHandCardList(): DDZCard[]  {
			return this.ddzLeftHandCardList;
		}

		/**
		 * Getter $ddzLeftRemovedHandCardList
		 * @return {DDZCard[] }
		 */
		public get $ddzLeftRemovedHandCardList(): DDZCard[]  {
			return this.ddzLeftRemovedHandCardList;
		}

		/**
		 * Getter $ddzRightHandCardList
		 * @return {DDZCard[] }
		 */
		public get $ddzRightHandCardList(): DDZCard[]  {
			return this.ddzRightHandCardList;
		}

		/**
		 * Getter $ddzRightRemovedHandCardList
		 * @return {DDZCard[] }
		 */
		public get $ddzRightRemovedHandCardList(): DDZCard[]  {
			return this.ddzRightRemovedHandCardList;
		}

		/**
		 * Getter $ddzPlayerLeftCardNumList
		 * @return {number[] }
		 */
		public get $ddzPlayerLeftCardNumList(): number[]  {
			return this.ddzPlayerLeftCardNumList;
		}

		/**
		 * Getter $playerInfoCenter
		 * @return {ddz.DDZCommonPlayerInfo}
		 */
		public get $playerInfoCenter(): ddz.DDZPlayerInfo {
			return this.playerInfoCenter;
		}

		/**
		 * Getter $playerInfoRight
		 * @return {ddz.DDZCommonPlayerInfo}
		 */
		public get $playerInfoRight(): ddz.DDZPlayerInfo {
			return this.playerInfoRight;
		}

		/**
		 * Getter $playerInfoLeft
		 * @return {ddz.DDZCommonPlayerInfo}
		 */
		public get $playerInfoLeft(): ddz.DDZPlayerInfo {
			return this.playerInfoLeft;
		}

		/**
		 * Getter $clock
		 * @return {ddz.DDZCommonClock}
		 */
		public get $clock(): ddz.DDZCommonClock {
			return this.clock;
		}

		/**
		 * Setter $stageW
		 * @param {number } value
		 */
		public set $stageW(value: number ) {
			this.stageW = value;
		}

		/**
		 * Setter $stageH
		 * @param {number } value
		 */
		public set $stageH(value: number ) {
			this.stageH = value;
		}

		/**
		 * Setter $cardW
		 * @param {number} value
		 */
		public set $cardW(value: number) {
			this.cardW = value;
		}

		/**
		 * Setter $cardH
		 * @param {number} value
		 */
		public set $cardH(value: number) {
			this.cardH = value;
		}

		/**
		 * Setter $isVip
		 * @param {boolean } value
		 */
		public set $isVip(value: boolean ) {
			this.isVip = value;
		}

		/**
		 * Setter $playState
		 * @param {number} value
		 */
		public set $playState(value: number) {
			this.playState = value;
		}

		/**
		 * Setter $selfTablePos
		 * @param {number} value
		 */
		public set $selfTablePos(value: number) {
			this.selfTablePos = value;
		}

		/**
		 * Setter $currentTableId
		 * @param {number} value
		 */
		public set $currentTableId(value: number) {
			this.currentTableId = value;
		}

		/**
		 * Setter $vipQuanCount
		 * @param {number} value
		 */
		public set $vipQuanCount(value: number) {
			this.vipQuanCount = value;
		}

		/**
		 * Setter $ddzRoomId
		 * @param {number} value
		 */
		public set $ddzRoomId(value: number) {
			this.ddzRoomId = value;
		}

		/**
		 * Setter $ddzJuShuNum
		 * @param {number} value
		 */
		public set $ddzJuShuNum(value: number) {
			this.ddzJuShuNum = value;
		}

		/**
		 * Setter $ddzDifenNum
		 * @param {number} value
		 */
		public set $ddzDifenNum(value: number) {
			this.ddzDifenNum = value;
		}

		/**
		 * Setter $ddzDoubleNum
		 * @param {number} value
		 */
		public set $ddzDoubleNum(value: number) {
			this.ddzDoubleNum = value;
		}

		/**
		 * Setter $ddzPlayerName
		 * @param {string} value
		 */
		public set $ddzPlayerName(value: string) {
			this.ddzPlayerName = value;
		}

		/**
		 * Setter $ddzPlayerGold
		 * @param {number} value
		 */
		public set $ddzPlayerGold(value: number) {
			this.ddzPlayerGold = value;
		}

		/**
		 * Setter $ddzRoomTime
		 * @param {string} value
		 */
		public set $ddzRoomTime(value: string) {
			this.ddzRoomTime = value;
		}

		/**
		 * Setter $preCallPoint
		 * @param {number } value
		 */
		public set $preCallPoint(value: number ) {
			this.preCallPoint = value;
		}

		/**
		 * Setter $isPlaying
		 * @param {boolean } value
		 */
		public set $isPlaying(value: boolean ) {
			this.isPlaying = value;
		}

		/**
		 * Setter $ddz_btn_record
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_record(value: eui.Button) {
			this.ddz_btn_record = value;
		}

		/**
		 * Setter $ddz_btn_chat
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_chat(value: eui.Button) {
			this.ddz_btn_chat = value;
		}

		/**
		 * Setter $ddz_btn_spread
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_spread(value: eui.Button) {
			this.ddz_btn_spread = value;
		}

		/**
		 * Setter $ddz_operation_group_call_dz
		 * @param {eui.Group} value
		 */
		public set $ddz_operation_group_call_dz(value: eui.Group) {
			this.ddz_operation_group_call_dz = value;
		}

		/**
		 * Setter $ddz_btn_call_dz_no
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_call_dz_no(value: eui.Button) {
			this.ddz_btn_call_dz_no = value;
		}

		/**
		 * Setter $ddz_btn_call_dz
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_call_dz(value: eui.Button) {
			this.ddz_btn_call_dz = value;
		}

		/**
		 * Setter $ddz_operation_group_call_score
		 * @param {eui.Group} value
		 */
		public set $ddz_operation_group_call_score(value: eui.Group) {
			this.ddz_operation_group_call_score = value;
		}

		/**
		 * Setter $ddz_btn_call_dz_score_no
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_call_dz_score_no(value: eui.Button) {
			this.ddz_btn_call_dz_score_no = value;
		}

		/**
		 * Setter $ddz_btn_call_dz_score_1
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_call_dz_score_1(value: eui.Button) {
			this.ddz_btn_call_dz_score_1 = value;
		}

		/**
		 * Setter $ddz_btn_call_dz_score_2
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_call_dz_score_2(value: eui.Button) {
			this.ddz_btn_call_dz_score_2 = value;
		}

		/**
		 * Setter $ddz_btn_call_dz_score_3
		 * @param {eui.Button} value
		 */
		public set $ddz_btn_call_dz_score_3(value: eui.Button) {
			this.ddz_btn_call_dz_score_3 = value;
		}

		/**
		 * Setter $ddz_operation_group_op_card
		 * @param {eui.Group} value
		 */
		public set $ddz_operation_group_op_card(value: eui.Group) {
			this.ddz_operation_group_op_card = value;
		}

		/**
		 * Setter $ddz_op_bu_chu
		 * @param {eui.Button} value
		 */
		public set $ddz_op_bu_chu(value: eui.Button) {
			this.ddz_op_bu_chu = value;
		}

		/**
		 * Setter $ddz_op_ti_shi
		 * @param {eui.Button} value
		 */
		public set $ddz_op_ti_shi(value: eui.Button) {
			this.ddz_op_ti_shi = value;
		}

		/**
		 * Setter $ddz_op_chu_pai
		 * @param {eui.Button} value
		 */
		public set $ddz_op_chu_pai(value: eui.Button) {
			this.ddz_op_chu_pai = value;
		}

		/**
		 * Setter $ddz_room_id_label
		 * @param {eui.Label} value
		 */
		public set $ddz_room_id_label(value: eui.Label) {
			this.ddz_room_id_label = value;
		}

		/**
		 * Setter $ddz_jushu_num_label
		 * @param {eui.Label} value
		 */
		public set $ddz_jushu_num_label(value: eui.Label) {
			this.ddz_jushu_num_label = value;
		}

		/**
		 * Setter $ddz_jushu_num
		 * @param {eui.Label} value
		 */
		public set $ddz_jushu_num(value: eui.Label) {
			this.ddz_jushu_num = value;
		}

		/**
		 * Setter $ddz_difen_num_label
		 * @param {eui.Label} value
		 */
		public set $ddz_difen_num_label(value: eui.Label) {
			this.ddz_difen_num_label = value;
		}

		/**
		 * Setter $ddz_difen_num
		 * @param {eui.Label} value
		 */
		public set $ddz_difen_num(value: eui.Label) {
			this.ddz_difen_num = value;
		}

		/**
		 * Setter $ddz_double_num_label
		 * @param {eui.Label} value
		 */
		public set $ddz_double_num_label(value: eui.Label) {
			this.ddz_double_num_label = value;
		}

		/**
		 * Setter $ddz_double_num
		 * @param {eui.Label} value
		 */
		public set $ddz_double_num(value: eui.Label) {
			this.ddz_double_num = value;
		}

		/**
		 * Setter $ddz_player_name_label
		 * @param {eui.Label} value
		 */
		public set $ddz_player_name_label(value: eui.Label) {
			this.ddz_player_name_label = value;
		}

		/**
		 * Setter $ddz_player_gold_label
		 * @param {eui.Label} value
		 */
		public set $ddz_player_gold_label(value: eui.Label) {
			this.ddz_player_gold_label = value;
		}

		/**
		 * Setter $ddz_room_time_label
		 * @param {eui.Label} value
		 */
		public set $ddz_room_time_label(value: eui.Label) {
			this.ddz_room_time_label = value;
		}

		/**
		 * Setter $ddz_record_group
		 * @param {eui.Group} value
		 */
		public set $ddz_record_group(value: eui.Group) {
			this.ddz_record_group = value;
		}

		/**
		 * Setter $ddz_record_board_label0
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label0(value: eui.Label) {
			this.ddz_record_board_label0 = value;
		}

		/**
		 * Setter $ddz_record_board_label1
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label1(value: eui.Label) {
			this.ddz_record_board_label1 = value;
		}

		/**
		 * Setter $ddz_record_board_label2
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label2(value: eui.Label) {
			this.ddz_record_board_label2 = value;
		}

		/**
		 * Setter $ddz_record_board_label3
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label3(value: eui.Label) {
			this.ddz_record_board_label3 = value;
		}

		/**
		 * Setter $ddz_record_board_label4
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label4(value: eui.Label) {
			this.ddz_record_board_label4 = value;
		}

		/**
		 * Setter $ddz_record_board_label5
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label5(value: eui.Label) {
			this.ddz_record_board_label5 = value;
		}

		/**
		 * Setter $ddz_record_board_label6
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label6(value: eui.Label) {
			this.ddz_record_board_label6 = value;
		}

		/**
		 * Setter $ddz_record_board_label7
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label7(value: eui.Label) {
			this.ddz_record_board_label7 = value;
		}

		/**
		 * Setter $ddz_record_board_label8
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label8(value: eui.Label) {
			this.ddz_record_board_label8 = value;
		}

		/**
		 * Setter $ddz_record_board_label9
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label9(value: eui.Label) {
			this.ddz_record_board_label9 = value;
		}

		/**
		 * Setter $ddz_record_board_label10
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label10(value: eui.Label) {
			this.ddz_record_board_label10 = value;
		}

		/**
		 * Setter $ddz_record_board_label11
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label11(value: eui.Label) {
			this.ddz_record_board_label11 = value;
		}

		/**
		 * Setter $ddz_record_board_label12
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label12(value: eui.Label) {
			this.ddz_record_board_label12 = value;
		}

		/**
		 * Setter $ddz_record_board_label13
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label13(value: eui.Label) {
			this.ddz_record_board_label13 = value;
		}

		/**
		 * Setter $ddz_record_board_label14
		 * @param {eui.Label} value
		 */
		public set $ddz_record_board_label14(value: eui.Label) {
			this.ddz_record_board_label14 = value;
		}

		/**
		 * Setter $ddzRecordBoardCardList
		 * @param {number[] } value
		 */
		public set $ddzRecordBoardCardList(value: number[] ) {
			this.ddzRecordBoardCardList = value;
		}

		/**
		 * Setter $ddz_dipai_group
		 * @param {eui.Group} value
		 */
		public set $ddz_dipai_group(value: eui.Group) {
			this.ddz_dipai_group = value;
		}

		/**
		 * Setter $ddz_send_card_effect_group1
		 * @param {eui.Group} value
		 */
		public set $ddz_send_card_effect_group1(value: eui.Group) {
			this.ddz_send_card_effect_group1 = value;
		}

		/**
		 * Setter $ddz_send_card_effect_group2
		 * @param {eui.Group} value
		 */
		public set $ddz_send_card_effect_group2(value: eui.Group) {
			this.ddz_send_card_effect_group2 = value;
		}

		/**
		 * Setter $ddzSendCardEffectCardList1
		 * @param {egret.Bitmap[] } value
		 */
		public set $ddzSendCardEffectCardList1(value: egret.Bitmap[] ) {
			this.ddzSendCardEffectCardList1 = value;
		}

		/**
		 * Setter $ddzSendCardEffectCardList2
		 * @param {egret.Bitmap[] } value
		 */
		public set $ddzSendCardEffectCardList2(value: egret.Bitmap[] ) {
			this.ddzSendCardEffectCardList2 = value;
		}

		/**
		 * Setter $ddz_hand_card_group
		 * @param {eui.Group} value
		 */
		public set $ddz_hand_card_group(value: eui.Group) {
			this.ddz_hand_card_group = value;
		}

		/**
		 * Setter $ddzSelfHandCardList
		 * @param {DDZCard[] } value
		 */
		public set $ddzSelfHandCardList(value: DDZCard[] ) {
			this.ddzSelfHandCardList = value;
		}

		/**
		 * Setter $ddzSelfRemovedHandCardList
		 * @param {DDZCard[] } value
		 */
		public set $ddzSelfRemovedHandCardList(value: DDZCard[] ) {
			this.ddzSelfRemovedHandCardList = value;
		}

		/**
		 * Setter $ddzLeftHandCardList
		 * @param {DDZCard[] } value
		 */
		public set $ddzLeftHandCardList(value: DDZCard[] ) {
			this.ddzLeftHandCardList = value;
		}

		/**
		 * Setter $ddzLeftRemovedHandCardList
		 * @param {DDZCard[] } value
		 */
		public set $ddzLeftRemovedHandCardList(value: DDZCard[] ) {
			this.ddzLeftRemovedHandCardList = value;
		}

		/**
		 * Setter $ddzRightHandCardList
		 * @param {DDZCard[] } value
		 */
		public set $ddzRightHandCardList(value: DDZCard[] ) {
			this.ddzRightHandCardList = value;
		}

		/**
		 * Setter $ddzRightRemovedHandCardList
		 * @param {DDZCard[] } value
		 */
		public set $ddzRightRemovedHandCardList(value: DDZCard[] ) {
			this.ddzRightRemovedHandCardList = value;
		}

		/**
		 * Setter $ddzPlayerLeftCardNumList
		 * @param {number[] } value
		 */
		public set $ddzPlayerLeftCardNumList(value: number[] ) {
			this.ddzPlayerLeftCardNumList = value;
		}

		/**
		 * Setter $playerInfoCenter
		 * @param {ddz.DDZCommonPlayerInfo} value
		 */
		public set $playerInfoCenter(value: ddz.DDZPlayerInfo) {
			this.playerInfoCenter = value;
		}

		/**
		 * Setter $playerInfoRight
		 * @param {ddz.DDZCommonPlayerInfo} value
		 */
		public set $playerInfoRight(value: ddz.DDZPlayerInfo) {
			this.playerInfoRight = value;
		}

		/**
		 * Setter $playerInfoLeft
		 * @param {ddz.DDZCommonPlayerInfo} value
		 */
		public set $playerInfoLeft(value: ddz.DDZPlayerInfo) {
			this.playerInfoLeft = value;
		}

		/**
		 * Setter $clock
		 * @param {ddz.DDZCommonClock} value
		 */
		public set $clock(value: ddz.DDZCommonClock) {
			this.clock = value;
		}

		/**
		 * Getter $sound
		 * @return {ddz.DDZSound}
		 */
		public get $sound(): ddz.DDZSound {
			return this.sound;
		}

		/**
		 * Setter $sound
		 * @param {ddz.DDZSound} value
		 */
		public set $sound(value: ddz.DDZSound) {
			this.sound = value;
		}
			
		/**
		 * Getter $m_firstsend
		 * @return {number }
		 */
		public get $m_firstsend(): number  {
			return this.m_firstsend;
		}

		/**
		 * Setter $m_firstsend
		 * @param {number } value
		 */
		public set $m_firstsend(value: number ) {
			this.m_firstsend = value;
		}
			
	}
}