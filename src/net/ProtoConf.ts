class ProtoConf {
	public constructor() {
	}
	
	private static confMjCommon = [
		{
			cmd: "0xa10001_0",						//心跳
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "HeartBeatingMsg",
			cmdStr: "heart_beating_msg",
		},
		{
			cmd: "0xa10002_0",      				//心跳应答
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "HeartBeatingAckMsg",
			cmdStr: "heart_beating_msg_ack",
		},
		{
			cmd: "0xa10003_0",						//链接请求
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LinkValidationMsg",
			cmdStr: "link_validation_msg",
		},
		{
			cmd: "0xa10004_0",						//链接请求确认应答
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LinkValidationMsgAck",
			cmdStr: "link_validation_msg_ack",
		}
	];
	private static confMjLobby = [
		{
			cmd: "0xc30001_0",						//登录
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LoginMsg",
			cmdStr: "login_msg",
		},
		{
			cmd: "0xc30023_0",						//登录应答
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LoginMsgAck",
			cmdStr: "login_msg_ack",
		},
		{
			cmd: "0xc30205_0",						//帐号在其他地方登录
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "OtherLoginMsgAck",
		},
		{
			cmd: "0xc30003_0",      				//请求进入游戏
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RequestStartGameMsg",
			cmdStr: "Request_Start_Game_Msg",
		},
		{
			cmd: "0xc30004_0",						//进入游戏
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RequestStartGameMsgAck",
			cmdStr: "Request_Start_Game_MsgAck",
		},
		{
			cmd: "0xc30015_0",						//跑马灯
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ScrollMsg",
			cmdStr: "Scroll_Msg",
		},
		{
			cmd: "0xc30102_0",						//进入VIP房间
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "EnterVipRoomMsg",
			cmdStr: "Enter_VipRoom_Msg",
		},
		{	//查找用户返回
			cmd: "0xd40203_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "FindPlayerMsgAck",
		}
	];
	private static confMjDiscard = [
		//废弃. 相关信息在大厅服务器获取，游戏服中不做处理
		{
			cmd: "0xc30614_0",						//大礼包返回
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ContinueLoginAckMsg",
			cmdStr: "continue_login_ack_msg",
		},
		{
			cmd: "0xc300229_0",						//二人支持
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "TwoPeopleSupportMsgAck",
			cmdStr: "two_people_support_msg_ack",
		},
		{
			cmd: "0xc300226_0",						//支对
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ZhiDuiMsgAck",
			cmdStr: "zhi_dui_msg_ack",
		},
		{
			cmd: "0xc300227_0",						//创建VIP提示
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ShowNoticeOnCreateVipAck",
			cmdStr: "show_notice_on_create_vip_ack",
		},
		{
			cmd: "0xc300228_0",						//登录后提示弹窗
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "ShowNoticeOnLoginAck",
		},
		{
			cmd: "0xc30606_0",						//宝箱
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerBaoXiangNumMsgAck",
			cmdStr: "Player_BaoXiang_Num_MsgAck",
		},
		{
			cmd: "0xc30617_0",						//服务端返回给客户端的排行榜奖励消息
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "GetRankingRewardMsgAck",
			cmdStr: "Get_Ranking_Reward_MsgAck",
		},
		{
			cmd: "0xc30506_0",      				//基础任务请求
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "BaseTaskMsg",
			cmdStr: "Base_Task_Msg",
		},
		{
			cmd: "0xc30507_0",						//基础任务返回
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "BaseTaskMsgAck",
			cmdStr: "Base_Task_MsgAck",
		},
		{
			cmd: "0xc30002_0",						//服务器通知客户端更新属性
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "UpdatePlayerPropertyMsg",
			cmdStr: "Update_Player_PropertyMsg",
		},
		{	//游戏服向中心服请求创建新用户cmd
			cmd: "0xd40201_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "CreateUserMsgAck",
		},
		{	//游戏逻辑服向中心服务器进行注册
			cmd: "0xc30222_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RegisterGameLogicServerMsgAck",
		},
	];
	public static confMj = [
		{
			cmd: "0xc30305_0",						//关闭语音
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "CloseVipSoundMsg",
		},
		{
			cmd: "0xc30306_0",						//关闭语音
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "CloseVipSoundMsgAck",
		},
		//————————————————————————————————————————————————————————————————————————————————————————
		//牌局-麻将
		{	//牌局开始
			cmd: "0xc30060_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "GameStartMsg",
		},
		{	//提醒玩家进行操作
			cmd: "0xc30061_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerOperationNotifyMsg",
		},
		{	//客户端发给服务器的玩家在牌桌上的操作行为
			cmd: "0xc30062_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerTableOperationMsg",
		},
		{	//游戏结束
			cmd: "0xc3000c_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerGameOverMsg",
		},
		{	//游戏结束返回
			cmd: "0xc3000d_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerGameOverMsgAck",
		},
		{	//vip房间结束
			cmd: "0xc302004_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "VipRoomCloseMsg",
		},
		{	//游戏服向中心服请求创建新用户cmd
			cmd: "0xd40201_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "CreateUserMsgAck",
		},
		{	//游戏逻辑服向中心服务器进行注册
			cmd: "0xc30222_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RegisterGameLogicServerMsgAck",
		},
		{	//查找用户返回
			cmd: "0xd40203_0",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "FindPlayerMsgAck",
		},
		{	//玩家的某些行为
			cmd: "0xc30008_0",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerGameOpertaionMsg",
		},
		{	//玩家的某些行为
			cmd: "0xc30009_0",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerGameOpertaionAckMsg",
		}
	].concat(ProtoConf.confMjCommon, ProtoConf.confMjLobby, ProtoConf.confMjDiscard);


	private static confLobbyCommon = [
		//心跳消息
		{	//心跳消息包返回
			cmd: "0xa10002_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "HeartBeatingAckMsg",
		},
		{	//心跳消息包
			cmd: "0xa10001_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "HeartBeatingMsg",
		},
		//建立连接后确认链接
		{	//链接之后发送确认链接消息
			cmd: "0xa10003_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LinkValidationMsg",
		},
		{	//链接之后发送确认链接消息返回
			cmd: "0xa10004_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LinkValidationMsgAck",
		},
	];
	private static confLobbyUpdate = [
		//检查版本号
		{	//更新服相关消息
			cmd: "0xb20006_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetPatchVersionMsg",
		},
		{	//更新服相关消息
			cmd: "0xb20007_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetPatchVersionAckMsg",
		},
		//取中心服地址、版本号
		{	//更新服相关消息
			cmd: "0xb20001_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetPatchFileListMsg",
		},
		{	//更新服相关消息
			cmd: "0xb20002_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetPatchFileListAckMsg",
		},
		//取更新补丁
		{	//更新服相关消息
			cmd: "0xb20003_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetPatchFileMsg",
		},
		{	//更新服相关消息
			cmd: "0xb20004_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetPatchFileAckMsg",
		},
	];
	private static confLobbyCenter = [
		// //账号登录、查询游戏服地址	(大厅服务的中心服和游戏服是同一个，不需要取地址)
		// {	//客户端向中心服务器请求逻辑服地址端口
		// 	cmd: "0xd40100_2",
		// 	fileName: "CenterMsg_proto",
		// 	package: "com.proto.msg",
		// 	messageName: "GetGameServerInfoMsg",
		// },
		// {	//客户端向中心服务器请求逻辑服地址返回
		// 	cmd: "0xd40101_2",
		// 	fileName: "CenterMsg_proto",
		// 	package: "com.proto.msg",
		// 	messageName: "GetGameServerInfoMsgAck",
		// },
		//
	];
	private static confLobbyGame = [
		//登录
		{	//登录
			cmd: "0xc30001_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LoginMsg",
		},
		{	//登录返回
			cmd: "0xc30023_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "LoginMsgAck",
		},
		//

		{	//切换服务器消息
			cmd: "0xc30723_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "ServerInfoMsg",
		},

		{	//大礼包返回
			cmd: "0xc30614_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ContinueLoginAckMsg",
		},
		{	//二人支持
			cmd: "0xc300229_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "TwoPeopleSupportMsgAck",
		},
		{	//
			cmd: "0xc300227_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ShowNoticeOnCreateVipAck",
		},
		{	//支对
			cmd: "0xc300226_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ZhiDuiMsgAck",
		},
		{	//宝箱
			cmd: "0xc30606_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerBaoXiangNumMsgAck",
		},
		{	//服务端返回给客户端的排行榜奖励消息
			cmd: "0xc30617_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "GetRankingRewardMsgAck",
		},
		{	//基础任务
			cmd: "0xc30506_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "BaseTaskMsg",
		},
		{	//基础任务返回
			cmd: "0xc30507_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "BaseTaskMsgAck",
		},
		{	//
			cmd: "0xc30003_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RequestStartGameMsg",
		},
		{	//
			cmd: "0xc30004_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RequestStartGameMsgAck",
		},
		{	//跑马灯消息
			cmd: "0xc30015_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "ScrollMsg",
		},
		{	//服务器通知客户端更新属性
			cmd: "0xc30002_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "UpdatePlayerPropertyMsg",
		},
		{	//创建vip房间
			cmd: "0xc30100_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "CreateVipRoomMsg",
		},
		{	//客户端发给服务器的玩家在牌桌上的操作行为  查找房间信息时用
			cmd: "0xc30062_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerTableOperationMsg",
		},
		{	//查找vip房间返回
			cmd: "0xc30101_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "SearchVipRoomMsgAck",
		},
		{	//进入vip房间
			cmd: "0xc30102_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "EnterVipRoomMsg",
		},
		{	//
			cmd: "0xd40207_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "CSCreateVipTableMsgAck",
		},
		{	//
			cmd: "0xd4020B_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "CSFindVipTableMsgAck",
		},
		{	//获取短信验证码
			cmd: "0xc30222_2",
			fileName: "CenterMsg_proto",
			package: "com.proto.msg",
			messageName: "RequestClientCompletePhoneNumAck",
		},
		{	//购买大礼包返回
			cmd: "0xc30018_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "BuyBigGiftPackAckMsg",
		},
		{	//获得宝箱
			cmd: "0xc30608_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetBaoXiangMsgAck",
		},
		{	//获得宝箱返回
			cmd: "0xc30608_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "GetBaoXiangMsgAck",
		},
		{	//请求乐币兑换
			cmd: "0xc30303_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "LeBiDuiHuanMsg",
		},
		{	//回应乐币兑换
			cmd: "0xc30304_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "LeBiDuiHuanMsgAck",
		},
		{	//开宝箱
			cmd: "0xc30610_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "OpenBaoXiangMsgAck",
		},
		{	//玩家宝箱
			cmd: "0xc30153_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerBaoXiangMsgAck",
		},
		{	//玩家绑定手机号
			cmd: "0xc30326_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerBindPhoneNumber",
		},
		{	//服务器通知客户端更新整个道具列表
			cmd: "0xc30017_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "UpdatePlayerItemListMsg",
		},
		{	//客户端通过串码提取道具道具列表
			cmd: "0xc30411_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerImeiGetCardMsg",
		},
		{	//玩家需要绑定手机号
			cmd: "0xc30412_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "PlayerNeedBindPhoneNumberAck",
		},
		{	//登录后提示弹窗
			cmd: "0xc300228_2",
			fileName: "CenterOthersMsg_proto",
			package: "com.proto.msg",
			messageName: "ShowNoticeOnLoginAck",
		},
	];

	public static confLobby = ProtoConf.confLobbyCommon.concat(ProtoConf.confLobbyUpdate, ProtoConf.confLobbyCenter, ProtoConf.confLobbyGame);

}