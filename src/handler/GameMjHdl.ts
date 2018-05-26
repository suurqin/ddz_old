module gameHdl {
	export let gameMjSocketServerIp = "192.168.1.70";
	export let gameMjSocketServerPort = 7004;
	export class GameMjHdl {
		public static socket = null;
		public constructor() {
		}

		public static connect() {
            if(GameMjHdl.socket){
                //如果已经有链接存在，直接返回
                GameMjHdl.requestStartGame();
                return GameMjHdl.socket;
            }
			GameMjHdl.socket = new net.NetSocket(gameHdl.gameMjSocketServerIp, gameHdl.gameMjSocketServerPort, Constant.gameControl.GAME_MJ_ID, Constant.gameControl.FLAG_MJ);
			GameMjHdl.socket.connect(GameMjHdl.onGameConnect);
			return GameMjHdl.socket;
		}
		public static onGameConnect() {
			console.log("GameMjHdl--->onGameConnect");

			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			GameMjHdl.sendData(HeartBeatingMsgAck);

			let LinkValidationMsg = {};
			LinkValidationMsg["checkKey"] = "wej824HYTY3cqe4RfsW4Y7Mkdhwvb54G";
			LinkValidationMsg["linkName"] = "test";
			LinkValidationMsg["msgCMD"] = Constant.MSG_LINK_VALIDATION;
			GameMjHdl.sendData(LinkValidationMsg);

		}
		public static sendData(msg) {
			if (GameMjHdl.socket == null || msg == null) {
				return;
			}
			msg["flag"] = Constant.gameControl.FLAG_MJ;
			GameMjHdl.socket.sendData(msg);
		}
		public static close() {
			if(GameMjHdl.socket == null){
				return ;
			}
			GameMjHdl.socket.close();
			GameMjHdl.socket = null;
		}

		//心跳
		public static heartAck: Function = (socketId, msg) => {
			console.log("GameMjHdl--->heartack");
			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			GameMjHdl.sendData(HeartBeatingMsgAck);
		}
		public static linkValidationAck: Function = (socketId, msg) => {
			//效验返回
			//向大厅服发送登录请求
			console.log("GameMjHdl--->linkValidationAck---------------");
            GameMjHdl.login();
		}

		/**麻将服-游戏服登录 myUser默认为manager.global.dUser*/
		public static login(myUser = manager.global.dUser){
			if(myUser == null){
				return ;
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
			GameMjHdl.sendData(LoginMsg);
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
				}
				return;
			}

            GameMjHdl.requestStartGame();
		}
		//
		public static requestStartGame(roomId = -1){
			let RequestStartGameMsg = {};
			RequestStartGameMsg["roomID"] = roomId;
			RequestStartGameMsg["msgCMD"] = Constant.MSG_GAME_START_GAME_REQUEST;
			GameMjHdl.sendData(RequestStartGameMsg);
		}
		//进入桌子
		public static RequestStartGameMsgAck: Function = (socketId, msg) => {
			console.log("--CenterMjHdl------RequestStartGameMsgAck--------");
			sceneMgr.runScene.loadingAniHide();
			if (msg.result != Constant.CenterControl.CMD_EXE_OK) {
				let showResultStr = "";
				let callBack = null;
				switch (msg.result) {
					case Constant.gameControl.CAN_ENTER_VIP_ROOM: {					//身上没有VIP房间，可以创建或加入房间
						(<lobbyScene.LobbyMainLayer>sceneMgr.runScene.mainLayer).addLayerWithoutVipRoom();

						let PlayerTableOperationMsg = {};
						PlayerTableOperationMsg["opValue"] = 0;
						PlayerTableOperationMsg["card_value"] = msg.roomID;
						PlayerTableOperationMsg["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_SEARCH_VIP_ROOM;
						centerHdl.CenterLobbyHdl.sendData(PlayerTableOperationMsg);
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
					//显示提示信息
				}
				return;
			}

            manager.global.mPlayer.tablePos = msg.tablePos;
            manager.global.mPlayer.gold = msg.gold;
            //appGetGlobal()->setSelectIndex(&ack->tableRules);//规则 
            //appGetGlobal()->setHasSound(ack->sound);//语音
            //appGetGlobal()->setMainIndex(ack->playerIndex);//静音
            //appGetGlobal()->setGameArea(ack->area);//地区               

            sceneMgr.runScene.loadScene(sceneMgr.TAG_GAME_SCENE);
            //sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_GAME_SCENE);
            let table = <MJTableLayer>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_GAME_SCENE);
            table.addTablePlayer(msg);

            let waitingtable = new WaitMJTableLayer();
            sceneMgr.runScene.addLayer(waitingtable, sceneMgr.TAG_WAITGAME_SCENE);
            waitingtable.addWaitTablePlayer(msg);

            //let MJtable: MJTableLayer = new MJTableLayer();
            //runScene.Director.getInstance().adChild(MJtable);
            //MJtable.addTablePlayer(msg);

		}

        //更新属性
        public static UpdatePlayerPropertiesAck: Function = (socketId, msg) => {

        }

        //跑马灯
        public static RecvScrollMsg: Function = (socketId, msg) => {

        }

        //开始游戏
        public static StartGame: Function = (socketId, msg) => {
            let scene: MJTableLayer = <MJTableLayer>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_GAME_SCENE);
            if (scene != null) scene.gameStart(msg);
        }

        //提醒玩家操作
        public static PlayerOpertaionNotify: Function = (socketId, msg) => {
            let table: MJTableLayer = <MJTableLayer>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_GAME_SCENE);
            let opId = Constant.MJOperation;
            if (table == null || msg == null) return;
            if (msg.operation == opId.MAHJONG_OPERTAION_GAME_OVER) {
                //游戏结束,调关闭游戏
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ASK_PAO) {
                //跑分
                table.paoOpMenu();
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ASK_CKM) {
                //叉开门
                table.chaKaiMenu();
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_LINDIAN_SHOW) {
                //林甸地区加的
                //if(){

                //}
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_OFFLINE) {
                //玩家离线
                table.tablePlayerLeft(msg.player_table_pos);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ONLINE) {
                //玩家返回桌子
                table.tablePlayerOnLine(msg.player_table_pos);
            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_CHU) == opId.MAHJONG_OPERTAION_CHU &&
                ((msg.operation & opId.MAHJONG_OPERTAION_ASK_HU) != opId.MAHJONG_OPERTAION_ASK_HU)) {
                //设置当前状态
                table.setCurrentOperation(opId.MAHJONG_OPERTAION_CHU);
                if (msg.chi_card_value == -1) {
                    //刷新手牌
                    table.cancelTing();
                }
                else if (msg.chi_card_value != 0) {
                    //摸牌
                    table.moCard(msg.chi_card_value & 0xff);
                }

                //如果玩家听牌
                if ((msg.operation & opId.MAHJONG_OPERTAION_TING) == opId.MAHJONG_OPERTAION_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_TING);
                    table.ting(msg.tingList, msg.operation);
                }
                //吃听返回的出牌消息
                if ((msg.operation & opId.MAHJONG_OPERTAION_CHI_TING) == opId.MAHJONG_OPERTAION_CHI_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_CHI_TING);
                    table.ting(msg.tingList, msg.operation);
                }
                //碰听返回的出牌消息
                if ((msg.operation & opId.MAHJONG_OPERTAION_PENG_TING) == opId.MAHJONG_OPERTAION_PENG_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_PENG_TING);
                    table.ting(msg.tingList, msg.operation);
                }
                //粘听
                if ((msg.operation & opId.MAHJONG_OPERTAION_ZHAN_TING) == opId.MAHJONG_OPERTAION_ZHAN_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_ZHAN_TING);
                    table.ting(msg.tingList, msg.operation);
                }

                //暗杠提示.....有开门的算明杠
                if ((msg.operation & opId.MAHJONG_OPERTAION_AN_GANG) == opId.MAHJONG_OPERTAION_AN_GANG) {
                    table.gangOperation(msg);
                }
                //明杠
                if ((msg.operation & opId.MAHJONG_OPERTAION_MING_GANG) == opId.MAHJONG_OPERTAION_MING_GANG) {
                    table.gangOperation(msg);
                }
                //刷新牌数
                table.updateCardRemainder(msg.cardLeftNum);

            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_TING) == opId.MAHJONG_OPERTAION_TING ||
                (msg.operation & opId.MAHJONG_OPERTAION_AN_GANG) == opId.MAHJONG_OPERTAION_AN_GANG) {
                //听牌,可能也暗杠
                if ((msg.operation & opId.MAHJONG_OPERTAION_TING) == opId.MAHJONG_OPERTAION_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_TING);
                    table.ting(msg.tingList, msg.operation);
                }

                if ((msg.operation & opId.MAHJONG_OPERTAION_AN_GANG) == opId.MAHJONG_OPERTAION_AN_GANG) {
                    table.gangOperation(msg);
                }

            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_QIANG_TING) == opId.MAHJONG_OPERTAION_QIANG_TING) {
                //抢听
                //当前只能先点听牌动作
                if (((msg.operation & opId.MAHJONG_OPERTAION_CHI_TING) == opId.MAHJONG_OPERTAION_CHI_TING)) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_CHI);
                }
                else if ((msg.operation & opId.MAHJONG_OPERTAION_PENG_TING) == opId.MAHJONG_OPERTAION_PENG_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_PENG);
                } else if ((msg.operation & opId.MAHJONG_OPERTAION_ZHAN_TING) == opId.MAHJONG_OPERTAION_ZHAN_TING) {	//粘牌
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_ZHAN_TING);
                } else if ((msg.operation & opId.MAHJONG_OPERTAION_MING_GANG_TING) == opId.MAHJONG_OPERTAION_MING_GANG_TING) {
                    table.setCurrentOperation(opId.MAHJONG_OPERTAION_MING_GANG);
                }

                table.qiangTingAndGetCardsMenu(msg);
                //时间在游戏开始的时候定，存个全局变量
                table.setOperationPlayer(msg.player_table_pos, 15);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_AUTO_CHU) {
                table.setCurrentOperation(opId.MAHJONG_OPERTAION_CHU);
                //
                //是否摸了新牌，如果是断线回来，这个通知里面没有新牌
                if (msg.chi_card_value != 0) {
                    table.moCard(msg.chi_card_value & 0xff);
                }
                table.auto_chu();
                table.updateCardRemainder(msg.cardLeftNum);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_OVERTIME_AUTO_CHU) {
                //超时自动出牌
                //置成无状态，不然超时出牌和手动出牌可能出两个牌
                table.setCurrentOperation(opId.MAHJONG_OPERTAION_NONE);

                //刷新手牌
                table.reFrushHandCard();
                //
                table.over_time_auto_chu(msg.target_card);
                table.updateCardRemainder(msg.cardLeftNum);

                //隐藏菜单按钮
                table.cancel_selection_operation();

                //设置托管状态
                table.setTuoGuanStation(true);
            }
            else if (((msg.operation & opId.MAHJONG_OPERTAION_CHI) == opId.MAHJONG_OPERTAION_CHI)//服务器通知轮到玩家吃牌
                || ((msg.operation & opId.MAHJONG_OPERTAION_PENG) == opId.MAHJONG_OPERTAION_PENG)
                || ((msg.operation & opId.MAHJONG_OPERTAION_MING_GANG) == opId.MAHJONG_OPERTAION_MING_GANG)) {
                table.setCurrentOperation(msg.operation);
                table.qiangTingAndGetCardsMenu(msg);
                //更新当前操作玩家和时间（指向自己）
                table.setOperationPlayer(msg.player_table_pos, 15);
            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_ASK_HU) == opId.MAHJONG_OPERTAION_ASK_HU) {
                //肇源带会胡返回
                //table.hu_set_opeation(msg);

                if ((msg.operation & opId.MAHJONG_OPERTAION_CHU) == opId.MAHJONG_OPERTAION_CHU) {
                    if (msg.target_card != 0) {
                        table.moCard(msg.target_card & 0xff);
                    }
                }
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_HU) {
                ///漏的时候牌要先打,清空出牌框和牌
                if (msg.chi_card_value & Constant.gameOverCode.MAHJONG_HU_CODE_TARGET_LOU) {
                    table.removeChuCardDown(msg.player_table_pos);//出来的牌
                    //table.showChuPaiKuang(false);//出牌框
                    //table.showCardTip(true);//光标
                    /*2016-5-10结尾出的牌位置*/
                    //clearCardTip(msg.player_table_pos);
                }
                table.showHuCard(msg.target_card & 0xff, msg.chi_card_value, msg.player_table_pos);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ADD_CHU_CARD) {//玩家出牌结束，没有被吃碰胡 
                //落牌
                table.removeChuCardDown(msg.player_table_pos);
                //table.showChuPaiKuang(false);
                //table.showCardTip(true);
                /*2016-5-10结尾出的牌位置*/
                //clearCardTip(msg ->player_table_pos);
                table.updateCardRemainder(msg.cardLeftNum);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_SHOW_BAO_CARD) {//显示宝牌
                /*if (appGetGlobal() ->getGameArea() == ROOM_TYPR_ZZ) {
                    bool gunbao = false;
                    if (appGetGlobal() ->tableRules.size > 0) {
                        for (int i = 0; i < appGetGlobal() ->tableRules.size;i++)
                        {
                            if (appGetGlobal() ->tableRules.buf[i] == 4) {
                                gunbao = true;
                                break;
                            }
                        }
                    }
                    if (!gunbao) {
                        this ->upZZBaoCard(&msg ->bao);
                    }
                    else {
                        this ->updateBaoCard(msg ->target_card & 0xff);
                    }

                }
                else {*/
                table.updateBaoCard(msg.target_card & 0xff);
                /*if (appGetGlobal() ->getGameArea() == ROOM_TYPR_ZYDH) {//四个会
                    myself ->setHuiValue(msg ->target_card);
                    myself ->reposition_all_cards();
                }*/

                //}

                //如果换了宝，提示上一只宝牌摸完了
                if ((msg.chi_card_value & 0xff) != 0) {
                    table.showChangeBaoTip(msg.chi_card_value & 0xff);
                }

            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_BAO_IS_OVER) {
                table.showChangeBaoTip(msg.target_card & 0xff);
                //播换宝音效
                playMusic.Soundeffect.getInstance().operateEffect(Constant.operateType.OPERATION_HUANBAO, table.getPlayerSex(manager.global.mPlayer.tablePos));
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_TIP) {//操作提示
                table.updateCardRemainder(msg.cardLeftNum);

                table.setOperationPlayer(msg.player_table_pos, 15);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_CANCEL) {
                //置成无状态
                table.setCurrentOperation(opId.MAHJONG_OPERTAION_NONE);

                //隐藏菜单按钮
                table.cancel_selection_operation();

                //设置托管状态
                table.setTuoGuanStation(true);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_EXTEND_CARD_REMIND) {//提醒玩家续卡
                if (msg.target_card == 0) {
                    //房主弹窗
                }
                else {
                    //不是房主提示等待
                }
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_EXTEND_CARD_SUCCESSFULLY) {//提醒续卡成功

            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_EXTEND_CARD_FAILED) {//续卡失败

            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_WAITING_OR_CLOSE_VIP) {//提醒玩家有人掉线,是否等带

            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_NO_START_CLOSE_VIP) {//VIP房间超时未开始

            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ONLY_ZIMO_TIME) {//分张
                //添加一张新牌
                if ((msg.chi_card_value != 0) && (msg.player_table_pos == manager.global.mPlayer.tablePos)) {
                    //ccShowText(appGetGlobal() ->getText("the_last_card"));

                    table.moCard(msg.chi_card_value & 0xff);
                }

                table.updateCardRemainder(msg.cardLeftNum);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ZHIDUI) {//支对
                table.setCurrentOperation(opId.MAHJONG_OPERTAION_ZHIDUI);
                table.setZhiDuiMenu(msg.tingList, (msg.peng_card_value == 0) ? true : false);
            }

        }




        //操作结果
        public static PlayerOperationAck: Function = (socketId, msg) => {
            let table: MJTableLayer = <MJTableLayer>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_GAME_SCENE);
            let opId = Constant.MJOperation;
            if (table == null || msg == null) return;
            let sound = playMusic.Soundeffect.getInstance();
            ///
            if ((msg.operation & opId.MAHJONG_OPERTAION_CHU) == opId.MAHJONG_OPERTAION_CHU) {//其他玩家出牌
                if (msg.player_table_pos == manager.global.mPlayer.tablePos) {
                    table.refreshPlayerCards(msg.card_value, msg.handCards, msg.beforeCards, msg.downCards);
                }
                else {
                    table.addChuCardUp(msg.card_value, msg.player_table_pos);
                    //table.showChuPaiKuang(true);
                    table.updateCardRemainder(msg.cardLeftNum);
                }
                //落桌子声
                //出牌声
                sound.getCardEffect(msg.card_value, table.getPlayerSex(msg.player_table_pos));
                sound.playSoundEffect(playMusic.EFFECT_OUT_CARD);
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_CHOOSE_PAO) {//跑
                table.paoOperationAck(msg.player_table_pos, msg.opValue);
                //播放跑几的音效
                switch (msg.opValue) {
                    case 2:
                        sound.operateEffect(Constant.operateType.OPERATION_PAO2, table.getPlayerSex(msg.player_table_pos));
                        break;
                    case 5:
                        sound.operateEffect(Constant.operateType.OPERATION_PAO5, table.getPlayerSex(msg.player_table_pos));
                        break;
                }
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_CHOOSE_CKM) {//叉开门
                table.chaOperationAck(msg.player_table_pos);
                sound.operateEffect(Constant.operateType.OPERATION_CHAKAI, table.getPlayerSex(msg.player_table_pos));
            }
            else if (((msg.operation & opId.MAHJONG_OPERTAION_CHI) == opId.MAHJONG_OPERTAION_CHI) ||
                ((msg.operation & opId.MAHJONG_OPERTAION_PENG) == opId.MAHJONG_OPERTAION_PENG)) {
                //加一个removeChuCard,移除出牌框和出的牌
                table.removeChuCard();
                table.chi_peng_OperationAck(msg);
                switch (msg.operation) {
                    case opId.MAHJONG_OPERTAION_CHI:
                        sound.operateEffect(Constant.operateType.OPERATION_CHI, table.getPlayerSex(msg.player_table_pos));
                        break;
                    case opId.MAHJONG_OPERTAION_PENG:
                        sound.operateEffect(Constant.operateType.OPERATION_PENG, table.getPlayerSex(msg.player_table_pos));
                        break;
                }
            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_TING) == opId.MAHJONG_OPERTAION_TING) {//听
                table.tingOperationAck(msg.player_table_pos);//动画
                table.tingTip(msg.player_table_pos);//设置听牌标志
                sound.operateEffect(Constant.operateType.OPERATION_TING, table.getPlayerSex(msg.player_table_pos));
                //音效
            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_AN_GANG) == opId.MAHJONG_OPERTAION_AN_GANG ||
                (msg.operation & opId.MAHJONG_OPERTAION_MING_GANG) == opId.MAHJONG_OPERTAION_MING_GANG) {//明杠和暗杠
                //加一个removeChuCard,移除出牌框和出的牌
                table.removeChuCard();
                table.gangOperationAck(msg);
                //音效
                sound.operateEffect(Constant.operateType.OPERATION_GANG, table.getPlayerSex(msg.player_table_pos));
            }
            else if ((((msg.operation & opId.MAHJONG_OPERTAION_CHI_TING) == opId.MAHJONG_OPERTAION_CHI_TING) ||
                ((msg.operation & opId.MAHJONG_OPERTAION_PENG_TING) == opId.MAHJONG_OPERTAION_PENG_TING))
                && (msg.operation & opId.MAHJONG_OPERTAION_MING_GANG_TING) != opId.MAHJONG_OPERTAION_MING_GANG_TING) {
                //加一个removeChuCard,移除出牌框和出的牌
                table.removeChuCard();
                table.tingTip(msg.player_table_pos);//设置听牌标志
                table.chi_peng_OperationAck(msg);//动画,牌处理

                if ((msg.operation & opId.MAHJONG_OPERTAION_CHI_TING) == opId.MAHJONG_OPERTAION_CHI_TING) {
                    //吃听音效
                    sound.operateEffect(Constant.operateType.OPERATION_CTING, table.getPlayerSex(msg.player_table_pos));
                }
                else {
                    //碰听音效
                    sound.operateEffect(Constant.operateType.OPERATION_PTING, table.getPlayerSex(msg.player_table_pos));
                }
            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_ZHAN_TING) == opId.MAHJONG_OPERTAION_ZHAN_TING) {
                //加一个removeChuCard,移除出牌框和出的牌
                table.removeChuCard();
                table.tingTip(msg.player_table_pos);//设置听牌标志
                table.zhanOperationAck(msg.player_table_pos);
                sound.operateEffect(Constant.operateType.OPERATION_TING, table.getPlayerSex(msg.player_table_pos));
                //音效
            }
            else if (msg.operation == opId.MAHJONG_OPERTAION_ZHIDUI) {//支对
                table.setZhiDuiCard(msg.card_value);
                //音效
                sound.operateEffect(Constant.operateType.OPERATION_ZHIDUI, table.getPlayerSex(msg.player_table_pos));
            }
            else if ((msg.operation & opId.MAHJONG_OPERTAION_MING_GANG_TING) == opId.MAHJONG_OPERTAION_MING_GANG_TING) {//明杠听
                //加一个removeChuCard,移除出牌框和出的牌
                table.removeChuCard();
                table.tingTip(msg.player_table_pos);//设置听牌标志
                //杠音效
                table.gangOperationAck(msg);
                sound.operateEffect(Constant.operateType.OPERATION_GANG, table.getPlayerSex(msg.player_table_pos));
            }
        }




		//小结算
		public static gameOverAck: Function = (socketId, msg) => {
			if (msg == null) return;
			let MJOver: GameOver = new GameOver(msg);
			runScene.Director.getInstance().adChild(MJOver);
			//MJOver.updateGameOverMsg(msg);
		}
		//总结算
		public static roomCloseMsg: Function = (socketId, msg) => {

		}

        public static sureCloseRoom:Function = (socketId, msg) => {
             sceneMgr.GameScene.getInstance().loadScene(sceneMgr.TAG_LOBBY_SCENE);
		}
	}
}