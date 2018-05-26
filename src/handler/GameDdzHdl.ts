module gameHdl {
	export let gameDdzSocketServerIp = "192.168.1.70";
	export let gameDdzSocketServerPort = 7004;
	export class GameDdzHdl {
		public static socket = null;
		public constructor() {
		}

		public static connect() {
			if (GameDdzHdl.socket) {
				//如果已经有链接存在，直接返回
				GameDdzHdl.requestStartGame();
				return GameDdzHdl.socket;
			}
			GameDdzHdl.socket = new net.NetSocket(gameHdl.gameDdzSocketServerIp, gameHdl.gameDdzSocketServerPort, Constant.gameControl.GAME_ID_DDZ, Constant.gameControl.FLAG_DDZ);
			GameDdzHdl.socket.connect(GameDdzHdl.onGameConnect);
			return GameDdzHdl.socket;
		}
		public static onGameConnect() {
			console.log("GameDdzHdl--->onGameConnect");

			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			GameDdzHdl.sendData(HeartBeatingMsgAck);

			let LinkValidationMsg = {};
			LinkValidationMsg["checkKey"] = "wej824HYTY3cqe4RfsW4Y7Mkdhwvb54G";
			LinkValidationMsg["linkName"] = "test";
			LinkValidationMsg["msgCMD"] = Constant.MSG_LINK_VALIDATION;
			GameDdzHdl.sendData(LinkValidationMsg);

		}
		public static sendData(msg) {
			if (GameDdzHdl.socket == null || msg == null) {
				return;
			}
			msg["flag"] = Constant.gameControl.FLAG_DDZ;
			GameDdzHdl.socket.sendData(msg);
		}
		public static close() {
			if (GameDdzHdl.socket == null) {
				return;
			}
			GameDdzHdl.socket.close();
			GameDdzHdl.socket = null;
		}

		//心跳
		public static heartAck: Function = (socketId, msg) => {
			console.log("GameDdzHdl--->heartack");
			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			GameDdzHdl.sendData(HeartBeatingMsgAck);
		}
		public static linkValidationAck: Function = (socketId, msg) => {
			//效验返回
			//向大厅服发送登录请求
			console.log("GameDdzHdl--->linkValidationAck---------------");

			GameDdzHdl.login();
		}


		/**斗地主服-游戏服登录 myUser默认为manager.global.dUser*/
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
			GameDdzHdl.sendData(LoginMsg);
		}
		/**登陆返回 */
		public static loginBack: Function = (socketId, msg) => {
			console.log("GameDdzHdl--->loginBack");
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
				}
				return;
			}

			GameDdzHdl.requestStartGame();
		}
		//
		public static requestStartGame(roomId = -1) {
			let RequestStartGameMsg = {};
			RequestStartGameMsg["roomID"] = roomId;
			RequestStartGameMsg["msgCMD"] = Constant.MSG_GAME_START_GAME_REQUEST;
			GameDdzHdl.sendData(RequestStartGameMsg);
		}
		//进入桌子
		public static requestStartGameMsgAck: Function = (socketId, msg) => {
			console.log("--CenterDdzHdl------RequestStartGameMsgAck--------");
			sceneMgr.runScene.loadingAniHide();
			if (msg.result != Constant.CenterControl.CMD_EXE_OK) {
				let showResultStr = "";
				let callBack = null;
				switch (msg.result) {
					case ddz.StartGameResultType.CAN_ENTER_VIP_ROOM: {					//身上没有VIP房间，可以创建或加入房间
						(<lobbyScene.LobbyMainLayer>sceneMgr.runScene.mainLayer).addLayerWithoutVipRoom();

						let PlayerTableOperationMsg = {};
						PlayerTableOperationMsg["opValue"] = 0;
						PlayerTableOperationMsg["card_value"] = msg.roomID;
						PlayerTableOperationMsg["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_SEARCH_VIP_ROOM;
						centerHdl.CenterLobbyHdl.sendData(PlayerTableOperationMsg);
						break;
					}
					case ddz.StartGameResultType.IS_PLAYING_CAN_NOT_ENTER_ROOM: {		//正在游戏中不能进入其他房间
						showResultStr = "正在游戏中不能进入其他房间！";
						break;
					}
					case ddz.StartGameResultType.VIP_TABLE_IS_FULL: {					//vip桌子已经满座了
						showResultStr = "VIP房间人数已满，请进入其他房间";
						//如果是被邀请的，需要清除掉信息提示
						break;
					}
					case ddz.StartGameResultType.FANGKA_NOT_FOUND: {					//房卡不足
						showResultStr = "开房卡不足";
						callBack = () => {

						}
						break;
					}
					case ddz.StartGameResultType.GOLD_HIGH_THAN_MAX_LIMIT: {			//金币高于上限
						showResultStr = "亲~您太富有了，该去更高级的房间战斗啦！";
						break;
					}
					case ddz.StartGameResultType.GOLD_LOW_THAN_MIN_LIMIT: {			//金币低于下限
						//购买金币页面
						showResultStr = "金币低于下限";
						callBack = () => {

						}
						break;
					}
					case Constant.CenterControl.WRONG_PASSWORD: {					//密码错误
						showResultStr = "密码错误";
						break;
					}
					case ddz.StartGameResultType.VIP_TABLE_IS_GAME_OVER: {					//VIP桌子已经结束了
						showResultStr = "VIP桌子已经结束了";
						break;
					}


					default: {
						showResultStr = "";
					}
				}
				if (showResultStr != "") {
					//显示提示信息
				}
				return;
			}

			//进入桌子
			// 进入房间成功

			// public int result=0;
			// public int gold=0;
			// public int roomID=-1;//
			// public int tablePos=0;
			// //如果是vip桌子，这个不是0
			// public int vipTableID=0;
			// //如果是vip桌子，房主名字
			// public String creatorName="";
			// //VIP桌子密码
			// public String tablePassword="";
			// public List<SimplePlayer> players=new ArrayList<SimplePlayer>();
			// public long vipOverTime = 0;
			// public int gameState = 0;

			sceneMgr.runScene.loadScene(sceneMgr.TAG_DDZ_SCENE);
			let ddzRoomScene = <ddz.DDZRoomScene>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_DDZ_SCENE);

			// let ddzRoomScene = new ddz.DDZRoomScene(this);
			// this.addChild(ddzRoomScene);

		}



	}
}