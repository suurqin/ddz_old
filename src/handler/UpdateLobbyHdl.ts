module updateHdl {
	export let UpdateSocketServerIp = "192.168.1.70";
	export let UpdateSocketServerPort = 7005;
	// export let UpdateSocketServerIp = "192.168.1.206";
	// export let UpdateSocketServerPort = 7004;
	export class UpdateLobbyHdl {
		public static socket = null;
		public constructor() {
		}

		public static connect() {
			UpdateLobbyHdl.socket = new net.NetSocket(updateHdl.UpdateSocketServerIp, updateHdl.UpdateSocketServerPort, Constant.gameControl.UPDATE_ID_LOBBY, Constant.gameControl.FLAG_DT);
			UpdateLobbyHdl.socket.connect(UpdateLobbyHdl.onUpdateConnect);
			return UpdateLobbyHdl.socket;
		}
		public static onUpdateConnect() {
			// UpdateLobbyHdl.getPatchVersion();
			UpdateLobbyHdl.connectCenterSocket();
		}
		public static sendData(msg) {
			if (UpdateLobbyHdl.socket == null || msg == null) {
				return;
			}
			msg["flag"] = Constant.gameControl.FLAG_DT;
			UpdateLobbyHdl.socket.sendData(msg);
		}
		public static connectCenterSocket() {
			manager.Global.centerSocketLobby = centerHdl.CenterLobbyHdl.connect();
		}
		public static close() {
			if(UpdateLobbyHdl.socket == null){
				return ;
			}
			UpdateLobbyHdl.socket.close();
			UpdateLobbyHdl.socket = null;
		}

		//心跳
		public static heartAck: Function = (socketId, msg) => {
			console.log("UpdateLobbyHdl--->heartack");
			let HeartBeatingMsgAck = {};
			HeartBeatingMsgAck["msgCMD"] = Constant.MSG_HEART_BEATING_ACK;
			UpdateLobbyHdl.sendData(HeartBeatingMsgAck);
		}
		public static linkValidationAck: Function = (socketId, msg) => {
			console.log("UpdateLobbyHdl--->linkValidationAck");
		}
		//检查版本号
		public static getPatchVersion() {
			//检查版本号
			let GetPatchVersionMsg = {};
			GetPatchVersionMsg["platformType"] = 3;//平台类型
			GetPatchVersionMsg["msgCMD"] = Constant.MSG_GET_PATCH_VESION;
			UpdateLobbyHdl.sendData(GetPatchVersionMsg);
		}
		//0xb20007
		public static getPatchVersionAck = (socketId, msg) => {
			manager.global.verInfo = msg;
			//查看是否有其他文件要取
			UpdateLobbyHdl.getPatchFileList();
		}
		//获取中心服地址、版本号
		public static getPatchFileList() {
			let GetPatchFileListMsg = {};
			GetPatchFileListMsg["clientVersion"] = myStorage.version;
			GetPatchFileListMsg["msgCMD"] = Constant.MSG_GET_PATCH_FILE_LIST;
			UpdateLobbyHdl.sendData(GetPatchFileListMsg);
		}
		//0xb20002
		public static getPatchFileListAck = (socketId, msg) => {
			let patchList: {}[] = msg.GamePatchFile;
			if(msg == null || patchList.length == 0){
				centerHdl.centerSocketServerIp = msg.centerTelecomIP;
				centerHdl.centerSocketServerPort = msg.centerPort;
				UpdateLobbyHdl.connectCenterSocket();

				sceneMgr.runScene.loadingAniHide();
				return ;
			}

			//有更新，显示loading，防止玩家点其他东西
			sceneMgr.runScene.loadingAniShow();
			for (let i = 0; i < patchList.length; i ++) {
				//未完待续
				UpdateLobbyHdl.getPatchFile(patchList);
			}
		}
		//获取更新补丁
		public static getPatchFile(patchList: {}) {
			let GetPatchFileMsg = {};
			GetPatchFileMsg["pageIndex"] = 0;
			GetPatchFileMsg["fileIndex"] = 0;
			GetPatchFileMsg["patchVersion"] = patchList["patchVersion"];
			// UpdateLobbyHdl.sendData(GetPatchFileMsg);
		}
		//0xb20004
		public static getPatchFileAck = (socketId, msg) => {

		}


	}
}