module myStorage {
	export enum KeyAndType {
		Account = 1,
		Password,
		version = 10,
		BgmVolume = 1001,
		BgmType,
		SoundVolume,
		GameType_creatRoom = 2000,
		QuanNum_creatRoom = 2001,
		Psw_creatRoom,
		RoomID_creatRoom,
		TableRule_creatRoom,
		Sound_creatRoom,
		Area_creatRoom,
		QuanNum_creatRoom_ddz = 3001,
		Psw_creatRoom_ddz,
		RoomID_creatRoom_ddz,
		times_creatRoom_ddz,
		showRecorder_creatRoom_ddz,
	};

	export let version: string = "1.2.3";

	export class MyStorage {
		public constructor() {
			let version = MyStorage.get(KeyAndType.version);
			if(!version || (version < myStorage.version)){
				MyStorage.set(KeyAndType.version, myStorage.version);
			}else{
				myStorage.version = version;
			}
		}

		public static set(keyNum: number, value: any) {
			egret.localStorage.setItem(keyNum.toString(), JSON.stringify(value));
		}

		public static get(keyNum: number) {
			var value: string = egret.localStorage.getItem(keyNum.toString());
			if(value && value != "undefined"){
				return JSON.parse(value);
			}
			else{
				return null;
			}
		}

		public static remove(keyNum: number) {
			egret.localStorage.removeItem(keyNum.toString());
		}

		//在哈希数组中寻找对应的值，删除并添加新值
		private static checkAndAddHashInfo = (key: number, newHashInfo: { key, value }) => {
			let list = MyStorage.get(key);
			if(list == null){
				list = [];
			}
			for (let i = 0; i < list.length; i++) {
				let oldHashInfo: { key, value } = list[i];
				if (oldHashInfo.key == newHashInfo.key) {
					list.splice(i, 1);
					break;
				}
			}
			list.push(newHashInfo);
			MyStorage.set(key, list);
		}
		//在哈希数组中寻找对应的值
		private static getHashInfo = (list: { key, value }[], theKey) => {
			if(list == null){
				return null;
			}
			for (let i = 0; i < list.length; i++) {
				let oldHashInfo: { key, value } = list[i];
				if (oldHashInfo.key == theKey) {
					return oldHashInfo.value;
				}
			}
			return null;
		}

		public static setCreatRoom(CreateVipRoomMsg) {
			this.set(KeyAndType.Area_creatRoom, CreateVipRoomMsg.area);
			this.checkAndAddHashInfo(KeyAndType.RoomID_creatRoom, {
				key: CreateVipRoomMsg.area, value: CreateVipRoomMsg.roomID
			});
			//具体信息的key 每条对应“地区+人数”
			let areaAndRoomIDKey: string = CreateVipRoomMsg.area + "areaAndRoomIDKey" + CreateVipRoomMsg.roomID;
			//密码
			this.checkAndAddHashInfo(KeyAndType.Psw_creatRoom, {
				key: areaAndRoomIDKey, value: CreateVipRoomMsg.psw
			});
			//圈数
			this.checkAndAddHashInfo(KeyAndType.QuanNum_creatRoom, {
				key: areaAndRoomIDKey, value: CreateVipRoomMsg.quanNum
			});
			//是否开启声音
			this.checkAndAddHashInfo(KeyAndType.Sound_creatRoom, {
				key: areaAndRoomIDKey, value: CreateVipRoomMsg.sound
			});
			//玩法数组
			this.checkAndAddHashInfo(KeyAndType.TableRule_creatRoom, {
				key: areaAndRoomIDKey, value: CreateVipRoomMsg.tableRule
			});
		}

		public static getRoomIDByArea(area: number) {
			let oldHashInf = this.getHashInfo(this.get(KeyAndType.RoomID_creatRoom), area);
			if(oldHashInf){
				return oldHashInf.value;
			}
			return null;
		}
		public static getHashInfByAreaAndRoomID(area : number, roomID: number) {
			//具体信息的key 每条对应“地区+人数”
			let areaAndRoomIDKey: string = area + "areaAndRoomIDKey" + roomID;
			let CreateVipRoomMsg = {};
			CreateVipRoomMsg["quanNum"] = this.getHashInfo(this.get(KeyAndType.QuanNum_creatRoom), areaAndRoomIDKey);
			CreateVipRoomMsg["psw"] = this.getHashInfo(this.get(KeyAndType.Psw_creatRoom), areaAndRoomIDKey);
			CreateVipRoomMsg["tableRule"] = this.getHashInfo(this.get(KeyAndType.TableRule_creatRoom), areaAndRoomIDKey);
			CreateVipRoomMsg["sound"] = this.getHashInfo(this.get(KeyAndType.Sound_creatRoom), areaAndRoomIDKey);
			return CreateVipRoomMsg;
		}

		public static setCreatRoomDdz(CreateDdzVipRoomMsg){
			this.set(KeyAndType.RoomID_creatRoom_ddz, CreateDdzVipRoomMsg.playerNum);
			let areaAndRoomIDKey: string = "PlayerNumDdz" + CreateDdzVipRoomMsg.playerNum;
			this.checkAndAddHashInfo(KeyAndType.Psw_creatRoom_ddz, {
				key: areaAndRoomIDKey, value: CreateDdzVipRoomMsg.psw
			});
			this.checkAndAddHashInfo(KeyAndType.RoomID_creatRoom_ddz, {
				key: areaAndRoomIDKey, value: CreateDdzVipRoomMsg.roomID
			});
			this.checkAndAddHashInfo(KeyAndType.times_creatRoom_ddz, {
				key: areaAndRoomIDKey, value: CreateDdzVipRoomMsg.times
			});
			this.checkAndAddHashInfo(KeyAndType.showRecorder_creatRoom_ddz, {
				key: areaAndRoomIDKey, value: CreateDdzVipRoomMsg.showRecorder
			});

		}
		
		public static getHashInfByPlayerNumDdz(playerNum: number) {
			//具体信息的key 每条对应“地区+人数”
			let areaAndRoomIDKey: string = "PlayerNumDdz" + playerNum;
			let CreateVipRoomMsg = {};
			CreateVipRoomMsg["psw"] = this.getHashInfo(this.get(KeyAndType.Psw_creatRoom_ddz), areaAndRoomIDKey);
			CreateVipRoomMsg["roomID"] = this.getHashInfo(this.get(KeyAndType.RoomID_creatRoom_ddz), areaAndRoomIDKey);
			CreateVipRoomMsg["times"] = this.getHashInfo(this.get(KeyAndType.times_creatRoom_ddz), areaAndRoomIDKey);
			CreateVipRoomMsg["showRecorder"] = this.getHashInfo(this.get(KeyAndType.showRecorder_creatRoom_ddz), areaAndRoomIDKey);
			
			return CreateVipRoomMsg;
		}

	}


}