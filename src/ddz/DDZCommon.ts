namespace ddz {

	// 斗地主房间玩家信息
	export class DDZPlayerInfo extends eui.Component{

		// 玩家信息
		private playerId:string;// 玩家ID
		private palyerIndex:number;// 玩家ID
		private playerName:string;// 玩家昵称
		private playerGold:number;// 玩家金币
		private playerHeadImg:number;// 玩家头像
		private playerSex:number;// 玩家性别
		private tablePos:number;// 桌子位置
		private cardNum:number;// 剩余牌数
		private simplePlayer:ddz.SimplePlayer;// 玩家基本信息

		
		private isHas:boolean = false;
		private roleType:number;


		// 玩家信息组件
		private ddz_player_info:eui.Group;
		private ddz_player_icon:eui.Image;// 玩家头像
		private ddz_flag_farmer_l:eui.Image;// 农民左
		private ddz_flag_dz_l:eui.Image;// 地主左
		private ddz_flag_farmer_r:eui.Image;// 农民右
		private ddz_flag_dz_r:eui.Image;// 地主右

		private ddz_player_common:eui.Image;// 准备
		private ddz_player_common_nm:eui.Image;// 农民
		private ddz_player_common_dz:eui.Image;// 地主

		private ddz_player_info_name:eui.Label;// 玩家昵称
		private ddz_player_info_gold:eui.Label;// 玩家金币
		private ddz_hat_dz:eui.Image;// 地主帽子
		private ddz_chat_bubble_group_l:eui.Group;// 会话泡泡左侧
		private ddz_chat_bubble_group_r:eui.Group;// 会话泡泡右侧
		private ddz_chat_bubble_l:eui.Image;// 会话泡泡左侧
		private ddz_chat_bubble_r:eui.Image;// 会话泡泡右侧
		private ddz_chat_bubble_lable_l:eui.Label;// 会话泡泡左侧
		private ddz_chat_bubble_lable_r:eui.Label;// 会话泡泡右侧
		private ddz_card_num_l_group:eui.Group;// 剩余牌数左侧
		private ddz_card_num_r_group:eui.Group;// 剩余牌数右侧
		private ddz_card_num_l:eui.Label;// 剩余牌数左侧
		private ddz_card_num_r:eui.Label;// 剩余牌数右侧


		public constructor() {
			super();

			this.width = 300;
			this.height = 220;

			this.initPlayerGroup();
			this.initPlayerVisible();
		}

		/**
		 * 初始化组件
		 */
		public initPlayerGroup() {

			// 加载皮肤
			this.skinName = "resource/my_skins/DDZRoomPlayerInfo.exml";

			// 添加事件
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showPlayerDetailInfo, this);
		}

		/**
		 * 初始化显示
		 */
		public initPlayerVisible() {

			this.ddz_player_icon.visible = true;
			this.ddz_flag_farmer_l.visible = false;
			this.ddz_flag_dz_l.visible = false;
			this.ddz_flag_farmer_r.visible = false;
			this.ddz_flag_dz_r.visible = false;
			this.ddz_player_common_nm.visible = false;
			this.ddz_player_common_dz.visible = false;
			this.ddz_player_common.visible = true;
			this.ddz_player_info_name.visible = false;
			this.ddz_player_info_gold.visible = false;
			this.ddz_hat_dz.visible = false;
			this.ddz_chat_bubble_group_l.visible = false;
			this.ddz_chat_bubble_group_r.visible = false;
			this.ddz_card_num_l_group.visible = false;
			this.ddz_card_num_r_group.visible = false;
			
		}

		/**
		 * 初始化玩家数据
		 */
		public initPlayerData(simplePlayer:ddz.SimplePlayer) {

			this.simplePlayer = simplePlayer;
			this.tablePos = this.simplePlayer.tablePos;
			this.playerId = this.simplePlayer.playerID;
			this.palyerIndex = this.simplePlayer.palyerIndex;
			this.playerSex = this.simplePlayer.sex;
			
			this.setPlayerName(this.simplePlayer.playerName);
			this.setPlayerGold(this.simplePlayer.gold);
			this.setPlayerHeadImg(this.simplePlayer.headImg);
		}

		/**
		 * 设置玩家为地主
		 */
		public setPlayerToDiZhu() {

			this.roleType = ddz.DDZRoleType.ROLE_DZ;

			this.ddz_player_icon.visible = true;
			this.ddz_player_common_nm.visible = false;
			this.ddz_player_common_dz.visible = true;
			this.ddz_player_common.visible = false;
			this.ddz_hat_dz.visible = true;
			this.ddz_chat_bubble_group_l.visible = false;
			this.ddz_chat_bubble_group_r.visible = false;
			this.ddz_flag_farmer_l.visible = false;
			this.ddz_flag_farmer_r.visible = false;

			switch(this.tablePos) { 
				// POS_CENTER
				case ddz.TablePosition.POS_CENTER: { 
					this.ddz_flag_dz_l.visible = true;
					this.ddz_flag_dz_r.visible = false;		
					this.ddz_card_num_l_group.visible = false;
					this.ddz_card_num_r_group.visible = false;	

					this.ddz_player_info_name.visible = false;
					this.ddz_player_info_gold.visible = false;
					break; 
				} 
				// POS_RIGHT
				case ddz.TablePosition.POS_RIGHT: { 
					this.ddz_flag_dz_l.visible = false;
					this.ddz_flag_dz_r.visible = true;
					this.ddz_card_num_l_group.visible = false;
					this.ddz_card_num_r_group.visible = true;	

					this.ddz_player_info_name.visible = true;
					this.ddz_player_info_gold.visible = true;
					break; 
				} 
				// POS_LEFT
				case ddz.TablePosition.POS_LEFT: { 
					this.ddz_flag_dz_l.visible = true;
					this.ddz_flag_dz_r.visible = false;	
					this.ddz_card_num_l_group.visible = true;
					this.ddz_card_num_r_group.visible = false;	

					this.ddz_player_info_name.visible = true;
					this.ddz_player_info_gold.visible = true;
					break; 
				} 
				default: { 
					break; 
				} 
			} 

			// 成为地主动画
			ddz.toBeDiZhuEffect(this.ddz_hat_dz, 300, egret.Ease.circInOut);
			
		}


		/**
		 * 设置玩家为农民
		 */
		public setPlayerToNongMin() {

			this.roleType = ddz.DDZRoleType.ROLE_NM;

			this.ddz_player_icon.visible = true;
			this.ddz_player_common_nm.visible = true;
			this.ddz_player_common_dz.visible = false;
			this.ddz_player_common.visible = false;
			this.ddz_hat_dz.visible = false;
			this.ddz_chat_bubble_group_l.visible = false;
			this.ddz_chat_bubble_group_r.visible = false;
			this.ddz_flag_dz_l.visible = false;
			this.ddz_flag_dz_r.visible = false;

			switch(this.tablePos) { 
				// POS_CENTER
				case ddz.TablePosition.POS_CENTER: { 
					this.ddz_flag_farmer_l.visible = true;
					this.ddz_flag_farmer_r.visible = false;
					this.ddz_card_num_l_group.visible = false;
					this.ddz_card_num_r_group.visible = false;	

					this.ddz_player_info_name.visible = false;
					this.ddz_player_info_gold.visible = false;
					break; 
				} 
				// POS_RIGHT
				case ddz.TablePosition.POS_RIGHT: { 
					this.ddz_flag_farmer_l.visible = false;
					this.ddz_flag_farmer_r.visible = true;
					this.ddz_card_num_l_group.visible = false;
					this.ddz_card_num_r_group.visible = true;	

					this.ddz_player_info_name.visible = true;
					this.ddz_player_info_gold.visible = true;
					break; 
				} 
				// POS_LEFT
				case ddz.TablePosition.POS_LEFT: { 
					this.ddz_flag_farmer_l.visible = true;
					this.ddz_flag_farmer_r.visible = false;
					this.ddz_card_num_l_group.visible = true;
					this.ddz_card_num_r_group.visible = false;		

					this.ddz_player_info_name.visible = true;
					this.ddz_player_info_gold.visible = true;
					break; 
				} 
				default: { 
					break; 
				} 
			} 
		}

		/**
		 * 设置会话泡泡显示
		 */
		public setChatBubbleVisible(isShow:boolean) {

			switch(this.tablePos) { 
				// POS_CENTER
				case ddz.TablePosition.POS_CENTER: { 
					this.ddz_chat_bubble_group_l.visible = isShow;
					this.ddz_chat_bubble_group_r.visible = false;		
					break; 
				} 
				// POS_RIGHT
				case ddz.TablePosition.POS_RIGHT: { 
					this.ddz_chat_bubble_group_l.visible = false;	
					this.ddz_chat_bubble_group_r.visible = isShow;
					break; 
				} 
				// POS_LEFT
				case ddz.TablePosition.POS_LEFT: { 
					this.ddz_chat_bubble_group_l.visible = isShow;
					this.ddz_chat_bubble_group_r.visible = false;		
					break; 
				} 
				default: { 
					break; 
				} 
			} 
		}

		/**
		 * 获取会话泡泡
		 */
		public getChatBubble():eui.Group {
			if(this.tablePos == ddz.TablePosition.POS_CENTER || 
				this.tablePos == ddz.TablePosition.POS_LEFT){

				return this.ddz_chat_bubble_group_l;
			}else if(this.tablePos == ddz.TablePosition.POS_RIGHT){
				return this.ddz_chat_bubble_group_r;
			}
		}

		/**
		 * 设置会话泡泡内容
		 */
		public setChatBubbleContent(content:string) {
			console.log(content);
			
			if(this.tablePos == ddz.TablePosition.POS_CENTER || 
				this.tablePos == ddz.TablePosition.POS_LEFT){

				this.ddz_chat_bubble_lable_l.$setText(content);
			}else if(this.tablePos == ddz.TablePosition.POS_RIGHT){
				this.ddz_chat_bubble_lable_r.$setText(content);
			}
		}

		/**
		 * actionType 1表示不出，2表示不叫，3表示叫1分，4表示叫2分，5表示叫3分,7表示加倍，8表示不加倍,9表示跟，10表示不跟
		 */
		public showTipText(parent:ddz.DDZRoomScene, tablePos:number, textType:number){
			switch (textType){
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BC:// 不出
					this.setChatBubbleContent("不出");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BJ:// 不叫
					this.setChatBubbleContent("不叫");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_F1:// 1分
					this.setChatBubbleContent("1分");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_F2:// 2分
					this.setChatBubbleContent("2分");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_F3:// 3分
					this.setChatBubbleContent("3分");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_MP:// 明牌
					this.setChatBubbleContent("明");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_JB:// 加倍
					this.setChatBubbleContent("加倍");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BJB:// 不加倍
					this.setChatBubbleContent("不加倍");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_G:// 跟
					this.setChatBubbleContent("跟");
					break;
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BG:// 不跟
					this.setChatBubbleContent("不跟");
					break;
				default:
					break;
			}
			ddz.fadeInOutEffect(this.getChatBubble(), 500, 1000, 500);
			parent.$sound.playPlayerOperationSound(parent, tablePos, textType);
		}

		/**
		 * 设置玩家头像
		 */
		public setPlayerHeadImg(headImg:number) {
			let iconName = "logo"+headImg+"_png";
			let texture:egret.Texture = RES.getRes(iconName);
			this.ddz_player_icon.texture = texture;
			this.playerHeadImg = headImg;
		}

		/**
		 * 设置玩家昵称
		 */
		public setPlayerName(playerName:string) {

			this.ddz_player_info_name.$setText(playerName);
			this.playerName = playerName;
		}


		/**
		 * 设置玩家金币
		 */
		public setPlayerGold(playerGold:number) {

			this.ddz_player_info_gold.$setText(playerGold+"");
			this.playerGold = playerGold;
		}

		/**
		 * 设置剩余牌数
		 */
		public setPlayerCardNum(cardNum:number) {
			if(this.tablePos == ddz.TablePosition.POS_CENTER){
				this.ddz_card_num_l_group.visible = false;
				this.ddz_card_num_r_group.visible = false;	
			}else{
				this.ddz_card_num_l.$setText(cardNum+"");
				this.ddz_card_num_r.$setText(cardNum+"");
			}
			this.cardNum = cardNum;
		}

		/**
		 * 设置玩家上线线状态
		 */
		public playerOnline() {

			this.ddz_player_info_name.$setTextColor(ddz.DDZColorValue.YELLOW);
			this.ddz_player_info_gold.$setTextColor(ddz.DDZColorValue.YELLOW);
		}

		/**
		 * 设置玩家下线状态
		 */
		public playerOffline() {

			this.ddz_player_info_name.$setTextColor(ddz.DDZColorValue.BLACK);
			this.ddz_player_info_gold.$setTextColor(ddz.DDZColorValue.BLACK);
		}

		/**
		 * 展示玩家详细信息
		 */
		public showPlayerDetailInfo() {
			
		}

		/**
		 * 获取宽度
		 */
		public getWidth() {
			
			return this.ddz_player_info.width;
		}


		/**
		 * 获取高度
		 */
		public getHeight() {

			return this.ddz_player_info.height;
		}


		/**
		 * Getter $tablePos
		 * @return {number}
		 */
		public get $tablePos(): number {
			return this.tablePos;
		}

		/**
		 * Setter $tablePos
		 * @param {number} value
		 */
		public set $tablePos(value: number) {
			this.tablePos = value;
		}

		/**
		 * Getter $playerName
		 * @return {String}
		 */
		public get $playerName(): String {
			return this.playerName;
		}

		/**
		 * Getter $playerGold
		 * @return {number}
		 */
		public get $playerGold(): number {
			return this.playerGold;
		}

		/**
		 * Getter $cardNum
		 * @return {number}
		 */
		public get $cardNum(): number {
			return this.cardNum;
		}

		/**
		 * Getter $playerSex
		 * @return {number}
		 */
		public get $playerSex(): number {
			return this.playerSex;
		}

		/**
		 * Setter $playerSex
		 * @param {number} value
		 */
		public set $playerSex(value: number) {
			this.playerSex = value;
		}
			
		/**
		 * Getter $roleType
		 * @return {number}
		 */
		public get $roleType(): number {
			return this.roleType;
		}

		/**
		 * Setter $roleType
		 * @param {number} value
		 */
		public set $roleType(value: number) {
			this.roleType = value;
		}

		/**
		 * Getter $isHas
		 * @return {boolean }
		 */
		public get $isHas(): boolean  {
			return this.isHas;
		}

		/**
		 * Setter $isHas
		 * @param {boolean } value
		 */
		public set $isHas(value: boolean ) {
			this.isHas = value;
		}
			
			
	}


	// 斗地主房间计时器
	export class DDZCommonClock extends eui.Group{

		private clockImage:egret.Bitmap;
		private clockNumLabel:egret.BitmapText;
		private secondNum:number;
		private callBackFunc:Function;
		private clockTimer:egret.Timer;

		public constructor() {
			super();

			this.width = 60;
			this.height = 66;

			this.initClock();
		}

		/**
		 * 初始化组件
		 */
		public initClock() {

			// 设置背景图
			this.clockImage = ddz.createBitmapByName("ddz_timer_bg_png");
			this.clockImage.x = 0;
			this.clockImage.y = 0;
			this.addChild(this.clockImage);

			// 设置时间标签 
			this.clockNumLabel = new eui.BitmapLabel();
			this.clockNumLabel.font = RES.getRes("ddzClockNum_fnt");;
			this.clockNumLabel.width = this.width;
			this.clockNumLabel.height = this.height;
			this.clockNumLabel.x = 0;
			this.clockNumLabel.y = 3.1;
			this.clockNumLabel.$setTextAlign(egret.HorizontalAlign.CENTER);
			this.clockNumLabel.$setVerticalAlign(egret.VerticalAlign.MIDDLE);
			this.clockNumLabel.$setText("");
			this.addChild(this.clockNumLabel);

			this.visible = false;
		}

		/**
		 * 计时器开始计时
		 */
		public startTimer(secondNum:number, callBackFunc:Function){

			this.visible = true;
			this.secondNum = secondNum;
			this.callBackFunc = callBackFunc;
			this.clockNumLabel.$setText(this.secondNum+"");
			
			if(this.clockTimer != null && this.clockTimer != undefined){
				this.clockTimer.stop();
			}
			// 创建一个计时器对象
			this.clockTimer = new egret.Timer(1000, this.secondNum);
			// 注册事件侦听器
			this.clockTimer.addEventListener(egret.TimerEvent.TIMER,this.timerFunc,this);
			this.clockTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.timerComFunc,this);
			// 开始计时
			this.clockTimer.start();
		}

		/**
		 * 计时器计时开始
		 */
		public stopTimer(){
			if(this.clockTimer != null && this.clockTimer != undefined){
				this.clockTimer.stop();
				this.clockTimer = null;
			}
			this.visible = false;
		}

		/**
		 * 计时器计时
		 */
		private timerFunc(){
			this.secondNum = this.secondNum-1;
			this.clockNumLabel.$setText(this.secondNum+"");
		}

		/**
		 * 计时器计时结束
		 */
		private timerComFunc(){
			if(this.clockTimer != null && this.clockTimer != undefined){
				this.clockTimer.stop();
				this.clockTimer = null;
			}
			if(this.callBackFunc != null){
				this.callBackFunc();
			}
		}

		/**
		 * 计时器设置位置
		 */
		public setPosition(x:number, y:number){
			this.x = x;
			this.y = y;
		}

	}
}
