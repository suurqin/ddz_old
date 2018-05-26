namespace ddz{
	// 斗地主打牌场景数据
	export class DDZRoomData {
		public constructor() {
		}	
	
	}

	// 斗地主牌数据
	export class DDZCardData {

		public type:number;
		public typeCount:number;
		public cardList:number[] = [];
		public cardCountList:ddz.DDZCardCountInfo[] = [];
		public countArray:number[][] = [];
		public black_jocker:boolean;
		public red_jocker:boolean;

		public constructor() {
			this.type = ddz.DDZCardType.CARD_TYPE_ERROR;
			this.typeCount = 1;
		}	

		
	}

	// 斗地主牌数据
	export class DDZCardCountInfo {

		public num:number;// 牌码（3、4、5）
		public count:number;// 一样牌的数量
		public constructor(num:number, count) {
			this.num = num;
			this.count = count;
		}	

	}
}