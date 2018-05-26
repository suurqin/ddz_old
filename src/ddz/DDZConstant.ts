namespace ddz {

    // 进入游戏
    export const MSG_REQUEST_START_GAME_MSG = 0xc30003;
    export const MSG_REQUEST_START_GAME_MSG_ACK = 0xc30004;

    // 开始游戏
    export const MSG_GAME_START_MSG = 0xc30060;

    // 斗地主桌内行为
    export const MSG_DDZ_GAME_OPERTAION_MSG = 0xc31001;
    export const MSG_DDZ_GAME_OPERTAION_MSG_ACK = 0xc31002;

    // 是否为关牌
    export const MAHJONG_OPERTAION_GUAN = 1;

    export class TablePosition {
        public static POS_CENTER = 0;
        public static POS_LEFT = 1;
        public static POS_RIGHT = 2;
        public static POS_UP = 3;
    }

    export class CommenType {
        public static CMD_EXE_OK = 0;//命令执行成功
        public static CMD_EXE_FAILED = 1000;//命令执行失败
        public static WRONG_PASSWORD = 1001;//密码错误
        public static USER_NOT_FOUND = 1002;//玩家未找到
        public static SERVER_BUSY = 1003;//服务忙碌
        public static USER_ALREADY_EXIST = 1004;//同名玩家已经存在
    }

    // 斗地主房间类型
    export class DDZRoomType {
        // /**普通场*/
        // public static ROOM_TYPE_COMMON_1 = 1;//初级场
        // public static ROOM_TYPE_COMMON_2 = 2;//中级场
        // public static ROOM_TYPE_COMMON_3 = 3;//高级场
        // /**VIP场*/
        // public static ROOM_TYPE_VIP = 4;//vip场
        // /**单机场*/
        // public static ROOM_TYPE_SINGLE = 5;//单机场

        /**游戏类型*/
        public static GAME_TYPE_DDZ = 1;//斗地主
        public static GAME_TYPE_SDY = 2;//三打一

        /**二人斗地主房间id区间*/
        public static ERREN_DDZ_ROOM_ID_MIN = 2020;//斗地主
        public static ERREN_DDZ_ROOM_ID_MAX = 2030;//斗地主
        public static ERREN_DDZ_ROOM_ID_GUANMAX = 2040;//关牌
        public static ERREN_DDZ_ROOM_ID_DDZNORMALSTR = 2100;//斗地主二人
        public static ERREN_DDZ_ROOM_ID_DDZNORMALEND = 2110;//斗地主二人
        public static ERREN_DDZ_ROOM_ID_GUANNORMALSTR = 2110;//斗地主二人
        public static ERREN_DDZ_ROOM_ID_GUANNORMALEND = 2120;//斗地主二人
    }


	// 进入房间返回类型
	export class StartGameResultType {

        public static FANGKA_NOT_FOUND = 1100;//房卡不足
        public static GOLD_LOW_THAN_MIN_LIMIT = 1101;//金币低于下限
        public static GOLD_HIGH_THAN_MAX_LIMIT = 1102;//金币超过上限
        public static CAN_ENTER_VIP_ROOM = 1103;//可以进入VIP房间
        public static VIP_TABLE_IS_FULL = 1104;//vip桌子已经满座了
		public static VIP_TABLE_IS_GAME_OVER = 1105;//VIP桌子已经结束了
        public static IS_PLAYING_CAN_NOT_ENTER_ROOM = 1106;//正在游戏中不能进入其他房间
    }

    // 桌内行为返回类型
	export class PlayerOperationType {
		
        public static SEND_CARD = 1000;//发牌
        public static CALL_LANDLORD = 1001;//叫地主
        public static PUSH_CARD = 1002;//出牌
        public static BRIGHT_CARD = 1003;//明牌
        public static AUTO = 1004;//托管
		public static ENTER_TABLE = 1005;//进入房间
        public static LEAVE_TABLE = 1006;//离开房间
        public static START_PUSH_CARD = 1007;//叫完地主开始打牌
        public static NEXT_CALL_LANDLORD = 1008;//轮到xx叫地主
        public static NEXT_PUSH_CARD = 1009;//下一个出牌的人
        public static GAME_OVER_CAL = 1010;//结算
        public static CANCEL_AUTO = 1011;//取消托管
		public static RECOVER = 1012;//断线重连
        public static DOUBLE_PIE = 1013;//玩家加倍
        public static START_DOUBLE_PIE = 1014;//开始加倍阶段
    }
    
    // 桌内行为返回类型
	export class DDZColorValue {
		
        public static WHITE = 0xFFFFFF;//白色
        public static BLACK = 0x000000;//黑色
        public static YELLOW = 0xFFFF00;//黄色
    }

    export class DDZRoleType {
        public static ROLE_DZ = 100;
        public static ROLE_NM = 200;
    }

    export class DDZCardNum {
        public static DDZ_START_CARD_NUM = 17;
        public static DDZ_DIZHU_MORE_CARD = 3;
    }

    export class DDZCardScale {
        public static DDZ_CARD_SCALE_BIG = 0.6;
        public static DDZ_CARD_SCALE_SMALL = 0.4;
    }

    export class DDZCardSpace {
        public static DDZ_CARD_SPACE_20 = 20;// 0.4倍间距
        public static DDZ_CARD_SPACE_25 = 25;// 0.5倍间距
        public static DDZ_CARD_SPACE_30 = 30;// 0.6倍间距
        public static DDZ_CARD_SPACE_50 = 50;// 1倍间距
    }

   export class DDZCardType {
        public static CARD_TYPE_ERROR = -1;
		public static CARD_TYPE_SINGLE = 0;
		public static CARD_TYPE_DOUBBLE = 1;
		public static CARD_TYPE_THREE = 2;
		public static CARD_TYPE_THREE_ONE = 3;
		public static CARD_TYPE_THREE_TWO = 4;
		public static CARD_TYPE_TWO_THREE = 5;
		public static CARD_TYPE_TWO_THREE_TWO = 6;
		public static CARD_TYPE_TWO_THREE_SINGLE = 7;
		public static CARD_TYPE_THREE_THREE = 8;
		public static CARD_TYPE_THREE_TWO_SINGLE = 9;
		public static CARD_TYPE_THREE_THREE_TWO = 10;
		public static CARD_TYPE_THREE_THREE_SINGLE = 11;
		public static CARD_TYPE_FOUR_THREE = 12;
		public static CARD_TYPE_FIVE_THREE = 13;
		public static CARD_TYPE_FOUR = 14;
		public static CARD_TYPE_FOUR_ONE = 15;
		public static CARD_TYPE_FOUR_TWO = 16;
		public static CARD_TYPE_FOUR_ONE_PAIR = 17;
		public static CARD_TYPE_FOUR_TWO_PAIR = 18;
		public static CARD_TYPE_ROCKET = 19;
		public static CARD_TYPE_THREE_FOUR_SINGLE = 20;
        public static CARD_TYPE_PLANE = 21;
    }

    // actionType 1表示不出，2表示不叫，3表示叫1分，4表示叫2分，5表示叫3分，6表示明牌, 7加倍, 8不加倍, 9表示跟，10表示不跟
    export class DDZActionType{
        public static DDZ_ACTION_TYPE_BC = 1;// 不出
        public static DDZ_ACTION_TYPE_BJ = 2;// 不叫
        public static DDZ_ACTION_TYPE_F1 = 3;// 1分
        public static DDZ_ACTION_TYPE_F2 = 4;// 2分
        public static DDZ_ACTION_TYPE_F3 = 5;// 3分
        public static DDZ_ACTION_TYPE_MP = 6;// 明牌
        public static DDZ_ACTION_TYPE_JB = 7;// 加倍
        public static DDZ_ACTION_TYPE_BJB = 8;// 不加倍
        public static DDZ_ACTION_TYPE_G = 9;// 跟
        public static DDZ_ACTION_TYPE_BG = 10;// 不跟
    }

    export class DDZPushCardType {
        public static DDZ_PUSH_CARD_WZ = 1;// 王炸
        public static DDZ_PUSH_CARD_ZD = 2;// 炸弹
        public static DDZ_PUSH_CARD_FJ = 3;// 飞机
        public static DDZ_PUSH_CARD_CT = 4;// 春天
        public static DDZ_PUSH_CARD_LD = 5;// 连对
        public static DDZ_PUSH_CARD_SZ = 6;// 顺子
    }

    export class DDZCardCode{
        public static C3 = 3;
        public static C4 = 4;
        public static C5 = 5;
        public static C6 = 6;
        public static C7 = 7;
        public static C8 = 8;
        public static C9 = 9;
        public static C10 = 10;
        public static CJ = 11; 
        public static CQ = 12;
        public static CK = 13;
        public static CA = 14;
        public static C2 = 15;

        public static CJOCKER_BLACK = 116;// 小王
        public static CJOCKER_RED = 117;// 大王

        public static COLOR_DIAMOND = 1;//方块
        public static COLOR_CLUB = 2;//梅花
        public static COLOR_HEART  = 3;//红心
        public static COLOR_BLACK = 4;//黑桃
    }
    
}