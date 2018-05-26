namespace centerHdl {
	export let centerSocketServerIp = "192.168.1.70";
	export let centerSocketServerPort = 7006;
	export class CenterLobbyHdl {
		public static socket = null;
		public constructor() {
		}

		public static connect() {
			CenterLobbyHdl.socket = new net.NetSocket(centerHdl.centerSocketServerIp, centerHdl.centerSocketServerPort, Constant.gameControl.CENTER_ID_LOBBY, Constant.gameControl.FLAG_DT); CenterLobbyHdl.socket.connect(CenterLobbyHdl.onCenterConnect);
			return CenterLobbyHdl.socket;
		}
		public static onCenterConnect() {
			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			CenterLobbyHdl.sendData(HeartBeatingMsgAck);

			let LinkValidationMsg = {};
			LinkValidationMsg["checkKey"] = "wej824HYTY3cqe4RfsW4Y7Mkdhwvb54G";
			LinkValidationMsg["linkName"] = "test";
			LinkValidationMsg["msgCMD"] = Constant.MSG_LINK_VALIDATION;
			CenterLobbyHdl.sendData(LinkValidationMsg);
		}
		public static sendData(msg) {
			if (CenterLobbyHdl.socket == null || msg == null) {
				return;
			}
			msg["flag"] = Constant.gameControl.FLAG_DT;
			CenterLobbyHdl.socket.sendData(msg);
		}
		public static close() {
			if (CenterLobbyHdl.socket == null) {
				return;
			}
			CenterLobbyHdl.socket.close();
			CenterLobbyHdl.socket = null;
		}

		//心跳
		public static heartAck: Function = (socketId, msg) => {
			console.log("CenterLobbyHdl--->heartack");
			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			CenterLobbyHdl.sendData(HeartBeatingMsgAck);
		}
		/**登录确认 */
		public static linkValidationAck: Function = (socketId, msg) => {
			console.log("CenterLobbyHdl--->linkValidationAck");

			//如果有记录历史账号，自动登录
			CenterLobbyHdl.login();
		}
		/**大厅服-中心服登录 myUser默认为manager.global.dUser*/
		public static login(myUser = manager.global.dUser) {
			if (myUser == null) {
				return;
			}

			let LoginMsg = {};
			let appMD5 = new md5();
			let psw = appMD5.convertCaps(myUser.password)
			LoginMsg["account"] = myUser.account;
			LoginMsg["password"] = psw;
			LoginMsg["machineCode"] = "abcd";
			LoginMsg["userName"] = myUser.account;
			LoginMsg["qqOpenID"] = "qqOpenID12";
			LoginMsg["wxOpenID"] = "wxOpenID11";
			LoginMsg["deviceFlag"] = 1;
			LoginMsg["mac"] = "wefd";
			LoginMsg["headIconUrl"] = "2";
			LoginMsg["clientType"] = 3;
			LoginMsg["unionId"] = myUser.account;
			LoginMsg["msgCMD"] = Constant.MSG_GAME_LOGIN;
			CenterLobbyHdl.sendData(LoginMsg);
		}
		/**登陆返回 */
		public static loginBack: Function = (socketId, msg) => {
			console.log("CenterLobbyHdl--->loginBack");
			if (msg.result != Constant.CenterControl.CMD_EXE_OK) {
				let showResultStr = "帐号或密码错误";
				switch (msg.result) {
					case Constant.CenterControl.WRONG_PASSWORD: {				//密码错误
						showResultStr = "密码错误";
						break;
					}
					case Constant.CenterControl.USER_NOT_FOUND: {				//玩家未找到
						// showResultStr = "";
						break;
					}
					case Constant.CenterControl.SERVER_IS_BUSY: {				//服务器忙碌
						showResultStr = "服务器忙碌";
						break;
					}
					case Constant.CenterControl.SERVER_IS_FULL: {				//服务器注册量已满
						showResultStr = "服务器注册量已满";
						break;
					}
					case Constant.CenterControl.ACCOUNT_ALREADY_EXIST: {		//帐号重复
						showResultStr = "该帐号已经被注册";
						break;
					}
					case Constant.CenterControl.MACHINE_CODE_ALREADY_EXIST: {	//机器码重复
						showResultStr = "机器识别码重复";
						break;
					}
					case Constant.CenterControl.ACCOUNT_NAME_BAD_WORD: {		//名字包含非法字符
						showResultStr = "包含敏感词汇";
						break;
					}
					case Constant.CenterControl.USER_ALREADY_EXIST: {			//同名玩家已存在
						showResultStr = "同一帐号，重复登录";
						break;
					}
					default: {
						showResultStr = "";
					}
				}
				if (showResultStr != "") {
					//显示提示信息
					console.log("显示提示信息:---: " + showResultStr);
					
				}
				updateHdl.UpdateLobbyHdl.close();
				return;
			}

			//将返回的数据存到全局
			manager.global.mGameRoomList = new Array<manager.GameRoom>();
			manager.global.mPlayer = new manager.Player();
			manager.global.mSystemConfigParaList = new Array<manager.SystemConfigPara>();

			manager.global.mPlayer = msg.player;
			manager.global.mSystemConfigParaList = msg.clientParma;
			manager.global.mGameRoomList = msg.rooms;

			console.log(manager.global.mSystemConfigParaList);

			manager.global.mGoldBaseList = new Array<manager.ItemBase>();
			manager.global.mPropertyBaseList = new Array<manager.ItemBase>();
			manager.global.mDiamondsBaseList = new Array<manager.ItemBase>();
			manager.global.mLifeBaseList = new Array<manager.ItemBase>();
			manager.global.mAllItemBaseList = new Array<manager.ItemBase>();
			manager.global.mGiftBaseList = new Array<manager.ItemBase>();
			manager.global.mExpendList = new Array<manager.ItemBase>();
			manager.global.mItemList = new Array<manager.ItemBase>();
			manager.global.mLeBiBaseList = new Array<manager.ItemBase>();

			for (let i = 0; i < msg.baseItemList.length; i++) {
				let pBase: manager.ItemBase = new manager.ItemBase();
				pBase = msg.baseItemList;
				manager.global.mAllItemBaseList.push(pBase);
				if (pBase.base_id > 1000 && pBase.base_id < 2000) {
					manager.global.mGoldBaseList.push(pBase);
				}
				else if (pBase.base_id > 3000 && pBase.base_id < 4000) {
					manager.global.mPropertyBaseList.push(pBase);
				}
				else if (pBase.base_id > 4000 && pBase.base_id < 5000) {
					manager.global.mLifeBaseList.push(pBase);
				}
				else if (pBase.base_id > 5000 && pBase.base_id < 6000) {
					manager.global.mGiftBaseList.push(pBase);
				}
				else if (pBase.base_id > 7000 && pBase.base_id < 8000) {
					manager.global.mExpendList.push(pBase);
				}
				else if (pBase.base_id > 10000 && pBase.base_id < 20000) {
					manager.global.mItemList.push(pBase);
				}
				else if (pBase.base_id > 8000 && pBase.base_id < 8100) {
					manager.global.mLeBiBaseList.push(pBase);
				}
			}

			sceneMgr.runScene.loadScene(sceneMgr.TAG_LOBBY_SCENE);


			let RequestStartGameMsg = {};
			RequestStartGameMsg["roomID"] = -1;
			RequestStartGameMsg["msgCMD"] = Constant.MSG_GAME_START_GAME_REQUEST;
			CenterLobbyHdl.sendData(RequestStartGameMsg);

			let BaseTaskMsg = {};
			BaseTaskMsg["msgCMD"] = Constant.MSG_CLIENT_BASE_TASK_MSG;
			CenterLobbyHdl.sendData(BaseTaskMsg);

		}

		/**切换至相应服务器 */
		public static connectGameSocket: Function = (socketId, msg) => {
			console.log("CenterLobbyHdl--->connectGameSocket");
			if (msg.serverType == "2") {
				CenterLobbyHdl.connectDdzSocket(msg);
			} else {//msg.serverType == "1"
				CenterLobbyHdl.connectMjSocket(msg);
			}
		}
		public static connectMjSocket: Function = (msg) => {
			console.log("CenterLobbyHdl--->connectMjSocket");
			gameHdl.gameMjSocketServerIp = msg.ip;
			gameHdl.gameMjSocketServerPort = msg.port;
			//启动麻将游戏服
			manager.Global.gameSocketMj = gameHdl.GameMjHdl.connect();
		}
		public static connectDdzSocket: Function = (msg) => {
			console.log("CenterLobbyHdl--->connectDdzSocket");
			gameHdl.gameDdzSocketServerIp = msg.ip;
			gameHdl.gameDdzSocketServerPort = msg.port;
			//启动斗地主游戏服
			manager.Global.gameSocketDdz = gameHdl.GameMjHdl.connect();
		}

		//
		public static requestStartGame(roomId = -1) {
			let RequestStartGameMsg = {};
			RequestStartGameMsg["roomID"] = roomId;
			RequestStartGameMsg["msgCMD"] = Constant.MSG_GAME_START_GAME_REQUEST;
			CenterLobbyHdl.sendData(RequestStartGameMsg);
		}
		//
		public static RequestStartGameMsgAck: Function = (socketId, msg) => {
			console.log("--CenterLobbyHdl------RequestStartGameMsgAck--------");
			sceneMgr.runScene.loadingAniHide();
			if (msg.result != Constant.CenterControl.CMD_EXE_OK) {
				let showResultStr = "";
				let callBack = null;
				switch (msg.result) {
					case Constant.gameControl.CAN_ENTER_VIP_ROOM: {					//身上没有VIP房间，可以创建或加入房间
						(<lobbyScene.LobbyMainLayer>sceneMgr.runScene.mainLayer).addLayerWithoutVipRoom();
						break;
					}
					case Constant.gameControl.IS_PLAYING_CAN_NOT_ENTER_ROOM: {		//正在游戏中不能进入其他房间
						showResultStr = "正在游戏中不能进入其他房间！";
						break;
					}
					case Constant.gameControl.VIP_TABLE_IS_FULL: {					//vip桌子已经满座了
						showResultStr = "VIP房间人数已满，请进入其他房间";
						//如果是被邀请的，需要清除掉信息提示
						break;
					}
					case Constant.gameControl.FANGKIA_NOT_FOUND: {					//房卡不足
						showResultStr = "开房卡不足";
						callBack = () => {

						}
						break;
					}
					case Constant.gameControl.GOLD_HIGH_THAN_MAX_LIMIT: {			//金币高于上限
						showResultStr = "亲~您太富有了，该去更高级的房间战斗啦！";
						break;
					}
					case Constant.gameControl.GOLD_LOW_THAN_MIN_LIMIT: {			//金币低于下限
						//购买金币页面
						showResultStr = "金币低于下限";
						callBack = () => {

						}
						break;
					}
					case Constant.CenterControl.WRONG_PASSWORD: {					//密码错误
						showResultStr = "密码错误";

						let passwordLayer = new lobbyScene.PasswordLayer();
						sceneMgr.runScene.addLayer(passwordLayer);
						passwordLayer.passwordForParentBitmapLabel = null;

						break;
					}
					default: {
						showResultStr = "";
					}
				}
				if (showResultStr != "") {
					console.log("显示提示信息:---: " + showResultStr);
					//显示提示信息
				}
				return;
			}

		}

		//查找vip房间返回
		public static searchVipRoomAck: Function = (socketId, msg) => {
			sceneMgr.runScene.loadingAniHide();
			let enterRoomLayer: lobbyScene.EnterRoomLayer =
				<lobbyScene.EnterRoomLayer>(sceneMgr.runScene.getRunSceneByTag(lobbyScene.TAG_ENTER_ROOM_LAYER));
			if (enterRoomLayer) {
				if (msg.vipTableID == 0) {//未找到房间

					enterRoomLayer.SearchVipRoomMsgAck(null);

					return;
				}

				enterRoomLayer.SearchVipRoomMsgAck(msg);
			}
		}

		//服务器通知客户端更新整个道具列表
		public static updatePlayerItemList = (socketId, msg) => {

		}
		//登录后提示弹窗
		public static showNoticeOnLoginAck = (socketId, msg) => {
			// appGetGlobal()->setADNotice(ack->show);//是否弹窗控制
			// appGetGlobal()->setFullScreen(ack->full_screen);
			// appGetGlobal()->setShowTime(ack->show_time);
			// appGetGlobal()->setDelayTime(ack->delay);
			// appGetGlobal()->setAutoClise(ack->auto_close);
			// optional int32 show = 1;
			// optional int32 full_screen = 2;
			// optional int32 show_time = 3;
			// optional int32 delay = 4;
			// optional int32 auto_close = 5;

		}
		public static continueLoginAckMsg: Function = (socketId, msg) => {
			manager.global.continueLoginList = msg.continueLoginList;
		}


		//支对
		public static zhiDuiAck: Function = (socketId, msg) => {
			console.log("--------支对---------------");
			manager.global.setConfig(manager.ConfKey.zhiDui, msg.zhidui_support);
		}
		//二人支持
		public static twoPeopleSupportAck: Function = (socketId, msg) => {
			console.log("----------二人支持---------------");
			manager.global.setConfig(manager.ConfKey.ErRenVip, msg.two_people_support);
			manager.global.setConfig(manager.ConfKey.ThreeRenVip, msg.three_people_support);
		}
		//VIP广告
		public static showNoticeOnCreateVIP: Function = (socketId, msg) => {
			console.log("-------Ddz--VIP广告---------------");
			manager.global.setConfig(manager.ConfKey.dDZdownLoadTip, msg.show);
		}

		//宝箱
		public static playerBaoXiangNumMsgAck: Function = (socketId, msg) => {

			console.log("-------------宝箱-----------");

		}
		//服务端返回给客户端的排行榜奖励消息
		public static getRankingRewardMsgAck: Function = (socketId, msg) => {
			console.log("----------排行榜奖励------------");
			manager.global.setConfig(manager.ConfKey.rankPriceData, msg.priceData);

		}
		//基础任务返回
		public static baseTaskMsgAck: Function = (socketId, msg) => {
			console.log("--------基础任务--------");

		}

		//账号在其他地方登录
		public static OtherLoginMsgAck: Function = (socketId, msg) => {
			console.log("--------账号在其他地方登录--------");

		}

	}
}