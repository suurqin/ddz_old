namespace net {
	export class HandlerMgr {
		public constructor() {
			this.initHandler();
		}

		private socketHandlers = {};
		/**回调集合*/
		// private handlers = {};

		private getSocketHandlers(socketId): any {
			let handlers = this.socketHandlers[socketId + ""];
			if (!handlers) {
				handlers = this.socketHandlers[socketId + ""] = {};
			}
			return handlers;
		}

		/** 增加回调 */
		private addHandler(socketId, event, fn) {
			let handlers = this.getSocketHandlers(socketId);

			if (handlers[event]) {
				console.log("event:" + event + "' handler has been registered.");
				return;
			}

			handlers[event] = fn;
		}
		/**获取回调 */
		public getHandler(socketId, event): Function {
			let handlers = this.getSocketHandlers(socketId);
			return handlers[event];
		}

		/**注册回调 */
		private initHandler() {
			this.initUpdateLobbyHdl();
			this.initCenterLobbyHdl();
			this.initGameLobbyMjHdl();
			this.initGameMjHdl();
			this.initGameLobbyDdzHdl();
			this.initGameDdzHdl();
		}
		
		/**废弃消息，接受不做处理 （大厅部分的消息都在大厅服处理，两个游戏服中忽略） */
		private static noneOperation(){}

		/**注册回调 大厅更新服*/
		private initUpdateLobbyHdl() {
			let addHdl = (event: any, fn: any) =>{
				this.addHandler(Constant.gameControl.UPDATE_ID_LOBBY, event, fn);
			}
			let updateLobbyHdl = updateHdl.UpdateLobbyHdl;
			// addHdl(Constant., updateLobbyHdl.);
			addHdl(Constant.MSG_HEART_BEATING, updateLobbyHdl.heartAck);
			addHdl(Constant.MSG_LINK_VALIDATION_ACK, updateLobbyHdl.linkValidationAck);
			addHdl(Constant.MSG_GET_PATCH_VESION_ACK, updateLobbyHdl.getPatchVersionAck);
			addHdl(Constant.MSG_GET_PATCH_FILE_LIST_ACK, updateLobbyHdl.getPatchFileListAck);
			addHdl(Constant.MSG_GET_PATCH_FILE_ACK, updateLobbyHdl.getPatchFileAck);
		}
		/**注册回调 大厅中心服*/
		private initCenterLobbyHdl() {
			let addHdl = (event: any, fn: any) =>{
				this.addHandler(Constant.gameControl.CENTER_ID_LOBBY , event, fn);
			}
			let centerLobbyHdl = centerHdl.CenterLobbyHdl;
			/**
			addHdl(Constant., centerLobbyHdl.);
			*/
			addHdl(Constant.MSG_HEART_BEATING, centerLobbyHdl.heartAck);//中心服心跳
			addHdl(Constant.MSG_LINK_VALIDATION_ACK, centerLobbyHdl.linkValidationAck);//中心服效验
			addHdl(Constant.MSG_GAME_LOGIN_ACK, centerLobbyHdl.loginBack);//游戏服校验返回登录处理

			addHdl(Constant.MSG_GAME_UPDATE_PLAYER_ITEM_LIST, centerLobbyHdl.updatePlayerItemList);//服务器通知客户端更新整个道具列表
			addHdl(Constant.MSG_SHOW_NOTICE_ONLOGIN, centerLobbyHdl.showNoticeOnLoginAck);//登录后提示弹窗
			addHdl(Constant.MSG_TWO_PEOPLE_SUPPORT, centerLobbyHdl.twoPeopleSupportAck);//二人支持

			addHdl(Constant.MSG_GAME_SEARCH_VIP_ROOM_ACK, centerLobbyHdl.searchVipRoomAck);//查找vip房间返回
			addHdl(Constant.MSG_GAME_START_GAME_REQUEST_ACK, centerLobbyHdl.RequestStartGameMsgAck);//进入游戏

			addHdl(Constant.MSG_GAME_CONNECT_GAME_SOCKET_ACK, centerLobbyHdl.connectGameSocket);//切换相应游戏服务器

			addHdl(Constant.MSG_GAME_OTHERLOGIN_ACK, centerLobbyHdl.OtherLoginMsgAck);//帐号在其他地方登录
			
			addHdl(Constant.MSG_ZHIDUI_SUPPORT, centerLobbyHdl.zhiDuiAck);//支对
			addHdl(Constant.MSG_SHOW_NOTICE_ONCREATEVIP, centerLobbyHdl.showNoticeOnCreateVIP);//VIP广告
			addHdl(Constant.Continue_Login_Ack_Msg, centerLobbyHdl.continueLoginAckMsg); //
			addHdl(Constant.Player_BaoXiang_Num_Msg_Ack, centerLobbyHdl.playerBaoXiangNumMsgAck); //宝箱
			addHdl(Constant.Get_Ranking_Reward_Msg_Ack, centerLobbyHdl.getRankingRewardMsgAck); //排行奖励信息
			addHdl(Constant.MSG_CLIENT_BASE_TASK_MSG_ACK, centerLobbyHdl.baseTaskMsgAck);//任务请求返回
			
		}
		
		/**注册回调 麻将游戏服 大厅部分*/
		private initGameLobbyMjHdl() {
			let addHdl = (event: any, fn: any) =>{
				this.addHandler(Constant.gameControl.GAME_MJ_ID, event, fn);
			}
			let gameMjHdl = gameHdl.GameMjHdl;

			addHdl(Constant.MSG_GAME_LOGIN_ACK, gameMjHdl.loginBack);//游戏服校验返回登录处理
			addHdl(Constant.MSG_GAME_START_GAME_REQUEST_ACK, gameMjHdl.RequestStartGameMsgAck);//进入游戏

			addHdl(Constant.Continue_Login_Ack_Msg, HandlerMgr.noneOperation);//废弃
			addHdl(Constant.MSG_TWO_PEOPLE_SUPPORT, HandlerMgr.noneOperation);//废弃
			addHdl(Constant.MSG_SHOW_NOTICE_ONCREATEVIP, HandlerMgr.noneOperation);//废弃
			addHdl(Constant.MSG_SHOW_NOTICE_ONLOGIN, HandlerMgr.noneOperation);//废弃
			addHdl(Constant.MSG_ZHIDUI_SUPPORT, HandlerMgr.noneOperation);//废弃
			addHdl(Constant.Player_BaoXiang_Num_Msg_Ack, HandlerMgr.noneOperation);//废弃
			addHdl(Constant.Get_Ranking_Reward_Msg_Ack, HandlerMgr.noneOperation);//废弃

		}
		/**注册回调 麻将游戏服*/
		private initGameMjHdl() {
			let addHdl = (event: any, fn: any) =>{
				this.addHandler(Constant.gameControl.GAME_MJ_ID, event, fn);
			}
			let gameMjHdl = gameHdl.GameMjHdl;
			//游戏服
			addHdl(Constant.MSG_HEART_BEATING, gameMjHdl.heartAck);//游戏服心跳
			addHdl(Constant.MSG_LINK_VALIDATION_ACK, gameMjHdl.linkValidationAck);//游戏服效验

			//牌局开始
			//提醒玩家进行操作
			addHdl(Constant.MSG_GAME_UPDATE_PLAYER_PROPERTY, gameMjHdl.UpdatePlayerPropertiesAck);//服务器通知客户端更新属性
			addHdl(Constant.MSG_GAME_SEND_SCROLL_MES, gameMjHdl.RecvScrollMsg);//跑马灯
			addHdl(Constant.MSG_GAME_START_GAME, gameMjHdl.StartGame);//开始游戏
			addHdl(Constant.MSG_GAME_PLAYER_OPERATION_NOTIFY, gameMjHdl.PlayerOpertaionNotify);//提醒玩家操作
			addHdl(Constant.MSG_GAME_PLAYER_TABLE_OPERATION, gameMjHdl.PlayerOperationAck);//操作结果
			addHdl(Constant.MSG_GAME_GAME_OVER_ACK, gameMjHdl.gameOverAck);//小结算
			addHdl(Constant.MSG_GAME_VIP_ROOM_CLOSE, gameMjHdl.roomCloseMsg);//总结算
			addHdl(Constant.MSG_GAME_GAME_OPERTAION_ACK, gameMjHdl.sureCloseRoom);//玩家的某些行为


		
		}

		/**注册回调 斗地主游戏服 大厅部分*/
		private initGameLobbyDdzHdl() {
			let addHdl = (event: any, fn: any) =>{
				this.addHandler(Constant.gameControl.GAME_ID_DDZ, event, fn);
			}
			let ddzGameHdlInLobby = gameHdl.GameDdzHdl;
			//斗地主大厅部分操作
			addHdl(Constant.MSG_GAME_LOGIN_ACK, ddzGameHdlInLobby.loginBack);//游戏服校验返回登录处理
			addHdl(ddz.MSG_REQUEST_START_GAME_MSG_ACK, ddzGameHdlInLobby.requestStartGameMsgAck);//进入游戏
			
		}
		/**注册回调 斗地主游戏服*/
		private initGameDdzHdl() {
			let addHdl = (event: any, fn: any) =>{
				this.addHandler(Constant.gameControl.GAME_ID_DDZ, event, fn);
			}
			let ddzGameHdl = ddz.DDZGameMsgProcess;
			
			// 斗地主牌局开始
			addHdl(ddz.MSG_GAME_START_MSG, ddzGameHdl.gameStartMsg);//开始游戏
			addHdl(ddz.MSG_DDZ_GAME_OPERTAION_MSG_ACK, ddzGameHdl.ddzGameOpertaionAckMsg);//桌内行为
		}

	}
}