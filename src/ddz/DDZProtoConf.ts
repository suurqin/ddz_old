namespace ddz{
	//---------------------------斗地主消息---------------------------
	export class DDZProtoConf {
		public constructor() {
		}
		public static conf = [

			{	//心跳消息包
				cmd: "0xa10001_1",
				fileName: "CenterMsg_proto",
				package: "com.proto.msg",
				messageName: "HeartBeatingMsg",
			},
			{	//心跳消息包返回
				cmd: "0xa10002_1",
				fileName: "CenterMsg_proto",
				package: "com.proto.msg",
				messageName: "HeartBeatingAckMsg",
			},
			{	//链接之后发送确认链接消息
				cmd: "0xa10003_1",
				fileName: "CenterMsg_proto",
				package: "com.proto.msg",
				messageName: "LinkValidationMsg",
			},
			{	//链接之后发送确认链接消息返回
				cmd: "0xa10004_1",
				fileName: "CenterMsg_proto",
				package: "com.proto.msg",
				messageName: "LinkValidationMsgAck",
			},



			//----------更--新--服------------------------------------

			//----------中--心--服------------------------------------





			//----------游--戏--服------------------------------------

			//--------------------------斗地主牌局开始-------------------------------- 
			{
				cmd: "0xc30004_1",						//进入游戏返回
				fileName: "DDZMsg_proto",
				package: "com.proto.msg",
				messageName: "RequestStartGameMsgAck",
				cmdStr: "Request_Start_Game_Msg_Ack",
			},
			{
				cmd: "0xc30060_1",						//开始游戏返回
				fileName: "DDZMsg_proto",
				package: "com.proto.msg",
				messageName: "GameStartMsg",
				cmdStr: "Game_Start_Msg",
			},
			{
				cmd: "0xc31002_1",						//斗地主桌内行为返回
				fileName: "DDZMsg_proto",
				package: "com.proto.msg",
				messageName: "DDZGameOpertaionAckMsg",
				cmdStr: "DDZ_Game_Opertaion_Ack_Msg",
			},
			// {
			// 	cmd: "0xc31002_1",						//斗地主桌内行为返回
			// 	fileName: "DDZMsg_proto",
			// 	package: "com.proto.msg",
			// 	messageName: "DDZGameOpertaionAckMsg",
			// 	cmdStr: "DDZ_Game_Opertaion_Ack_Msg",
			// },
		];
	}
}