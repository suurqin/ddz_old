namespace manager {
	export class Global {
		/**服务器回调管理*/
		public static handlerMgr: net.HandlerMgr;

		/**更新服 大厅*/
		public static updateSocketLobby: net.NetSocket;
		/**中心服 大厅*/
		public static centerSocketLobby: net.NetSocket;

		/**更新服 麻将*/
		public static updateSocketMj: net.NetSocket;
		/**中心服 麻将*/
		public static centerSocketMj: net.NetSocket;
		/*游戏服 麻将*/
		public static gameSocketMj: net.NetSocket;

		/**更新服 斗地主*/
		public static updateSocketDdz: net.NetSocket;
		/**中心服 斗地主*/
		public static centerSocketDdz: net.NetSocket;
		/*游戏服 斗地主*/
		public static gameSocketDdz: net.NetSocket;

		/**数据管理 */
		//public static dataMgr: DataMgr;

		public dUser: User;
		public mPlayer: Player;                		 		 	 //玩家信息
		public mItemBaseList: Array<ItemBase>;                  //基础道具列表
		public mGameRoomList: Array<GameRoom>;                  //游戏房间列表
		public mSystemConfigParaList: Array<SystemConfigPara>;  //系统配置列表


		public mGoldBaseList: Array<ItemBase>;
		public mPropertyBaseList: Array<ItemBase>;
		public mDiamondsBaseList: Array<ItemBase>;
		public mLifeBaseList: Array<ItemBase>;
		public mAllItemBaseList: Array<ItemBase>;
		public mGiftBaseList: Array<ItemBase>;
		public mExpendList: Array<ItemBase>;
		public mItemList: Array<ItemBase>;
		public mLeBiBaseList: Array<ItemBase>;

		public verInfo: {};	//0xb20007 GetPatchVersionAckMsg
		public continueLoginList: {}[];

		//
		public getPlayerItemNumByBaseItemID(itemId: number){
			let list = this.mPlayer.playerItems;
			for (let i = 0; i < list.length; i ++) {
				if (list[i].ItemBaseID == itemId){
					return list[i].ItemNum;
				}
			}
			return 0;
		}

		public zhiCard0:number = 0;
		public zhiCard1:number = 0;
		public zhiCard2:number = 0;
		public zhiCard3:number = 0;

		public configList: {key: string | number, value: any}[] = [];
		public rankPriceData: {}[];

		public setConfig(confKey: string | number, configValue){
			for(let i = 0; i < this.configList.length; i ++){
				if(this.configList[i].key == confKey){
					this.configList[i].value = configValue;
					return ;
				}
			}
			let config: {key: string | number, value: any} = {key: "", value: ""};
			config["key"] = confKey;
			config["value"] = configValue;
			this.configList.push(config);
		}
		public getConfig(confKey: string){
			for(let i = 0; i < this.configList.length; i ++){
				if(this.configList[i].key == confKey){
					return this.configList[i].value;
				}
			}
			return null;
		}
	}

	export const enum ConfKey{
		ErRenVip = 0,
		ThreeRenVip,
		dDZdownLoadTip,
		zhiDui,
		rankPriceData,
	}

	export let global: Global = new Global();


}