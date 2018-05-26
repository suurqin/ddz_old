// TypeScript file

namespace Constant {

    //心跳
    export const MSG_HEART_BEATING = 0xa10001;
    export const MSG_HEART_BEATING_ACK = 0xa10002;
    //链接校验
    export const MSG_LINK_VALIDATION = 0xa10003;
    export const MSG_LINK_VALIDATION_ACK = 0xa10004;

    //客户端请求补丁文件列表/
    export const MSG_GET_PATCH_FILE_LIST = 0xb20001
    export const MSG_GET_PATCH_FILE_LIST_ACK = 0xb20002
    //客户端请求补丁文件/
    export const MSG_GET_PATCH_FILE = 0xb20003
    export const MSG_GET_PATCH_FILE_ACK = 0xb20004
    //获取版本更新信息
    export const MSG_GET_PATCH_VESION = 0xb20006
    export const MSG_GET_PATCH_VESION_ACK = 0xb20007

    //服务器通知客户端更新整个道具列表
    export const MSG_GAME_UPDATE_PLAYER_ITEM_LIST = 0xc30017

    //登录后提示弹窗
    export const MSG_SHOW_NOTICE_ONLOGIN = 0xc300228;

    //关闭语音
    export const MSG_CLOSE_SOUND = 0xc30305;
    export const MSG_CLOSE_SOUND_ACK = 0xc30306;

    //中心服务器请求及应答
    export const CENTER_SERVER_GET_GAME_SERVER_INFO = 0xd40100;
    export const CENTER_SERVER_GET_GAME_SERVER_INFO_ACK = 0xd40101;
    //登录信息
    export const MSG_GAME_LOGIN = 0xc30001;
    export const MSG_GAME_LOGIN_ACK = 0xc30023;
    //二人支持
    export const MSG_TWO_PEOPLE_SUPPORT = 0xc300229;
    //支对
    export const MSG_ZHIDUI_SUPPORT = 0xc300226;
    //VIP广告
    export const MSG_SHOW_NOTICE_ONCREATEVIP = 0xc300227;

    //
    export const Continue_Login_Ack_Msg = 0xc30614;

    //宝箱
    export const Player_BaoXiang_Num_Msg_Ack = 0xc30606;

    //服务端返回给客户端的排行榜奖励信息
    export const Get_Ranking_Reward_Msg_Ack = 0xc30617;

    //基础任务返回
    export const MSG_CLIENT_BASE_TASK_MSG = 0xc30506;
    export const MSG_CLIENT_BASE_TASK_MSG_ACK = 0xc30507;

    //服务器通知客户端更新属性
    export const MSG_GAME_UPDATE_PLAYER_PROPERTY = 0xc30002;
    //断线重连
    export const MSG_GAME_START_GAME_REQUEST = 0xc30003;
    export const MSG_GAME_START_GAME_REQUEST_ACK = 0xc30004;
    //跑马灯
    export const MSG_GAME_SEND_SCROLL_MES = 0xc30015;
    //创建房间
    export const MSG_GAME_VIP_CREATE_ROOM = 0xc30100;
    //查找VIP房间返回
    export const MSG_GAME_SEARCH_VIP_ROOM_ACK = 0xc30101;
    //切换相应游戏服务器 
    export const MSG_GAME_CONNECT_GAME_SOCKET_ACK = 0xc30723;
    //进入房间
    export const MSG_GAME_ENTER_VIP_ROOM = 0xc30102;
    //开始游戏
    export const MSG_GAME_START_GAME = 0xc30060;
    //操作提醒
    export const MSG_GAME_PLAYER_OPERATION_NOTIFY = 0xc30061;
    //请求操作和操作结果
    export const MSG_GAME_PLAYER_TABLE_OPERATION = 0xc30062;
    //小结算
    export const MSG_GAME_GAME_OVER_ACK = 0xc3000d;
    //总结算
    export const MSG_GAME_VIP_ROOM_CLOSE = 0xc30200;
    //帐号在其他地方登录
    export const MSG_GAME_OTHERLOGIN_ACK = 0xc30205;
    
    export const MSG_GAME_GAME_OPERTAION = 0xc30008;

    export const  MSG_GAME_GAME_OPERTAION_ACK = 0xc30009  

    export class gameControl {
        //麻将服务器标示
        public static FLAG_MJ = 0;
        //斗地主服务器标示
        public static FLAG_DDZ = 1;
        //大厅服务器标示
        public static FLAG_DT = 2;

        public static UPDATE_ID = 1;//更新服ID 
        public static CENTER_ID = 2;//中心服
        public static GAME_MJ_ID = 3;//游戏服麻将


        public static UPDATE_ID_DDZ = 4;//更新服ID 斗地主
        public static CENTER_ID_DDZ = 5;//中心服 斗地主
        public static GAME_ID_DDZ = 6;//游戏服麻将 斗地主

        public static UPDATE_ID_LOBBY = 7;//更新服ID 大厅
        public static CENTER_ID_LOBBY = 8;//中心服 大厅

        public static FANGKIA_NOT_FOUND = 1100;//房卡不足
        public static GOLD_LOW_THAN_MIN_LIMIT = 1101;//金币低于下限
        public static GOLD_HIGH_THAN_MAX_LIMIT = 1102;//金币超过上限
        public static CAN_ENTER_VIP_ROOM = 1103;//可以进入VIP房间
        public static VIP_TABLE_IS_FULL = 1104;//vip桌子已经满座了
        public static IS_PLAYING_CAN_NOT_ENTER_ROOM = 1106;//正在游戏中不能进入其他房间
        public static BI_SAI_KA_BUZU = 1108;//比赛卡不足
        public static LEBI_BUY_FORM = 1109;
        public static CAN_SELECT_VIP_ROOM = -105;//进入房间返回

        //public static LOGIN_SCENE = 10000//登录
        //public static LOBBY_SCENE = 10001//大厅
        //public static GAME_SCENE = 10002//游戏
        //public static MALL_SCENE = 10003//商城
        //public static GAME_OVER_SCENE = 10010//小结算
        //public static ROOM_CLOSE_SCENE = 10010//总结算
    }

    export const enum CenterControl {
        CMD_EXE_OK = 0,                         //命令执行成功
        CMD_EXE_FAILED = 1000,	                //命令执行失败
        WRONG_PASSWORD = 1001,              	//密码错误
        USER_NOT_FOUND = 1002,	                //玩家未找到
        SERVER_BUSY = 1003,	                    //服务忙碌
        USER_ALREADY_EXIST = 1004,	            //同名玩家已经存在
        ACCOUNT_ALREADY_EXIST = 1012,           //帐号重复
        MACHINE_CODE_ALREADY_EXIST = 1013,      //机器码重复
        SERVER_IS_BUSY = 1014,                  //服务器忙碌
        SERVER_IS_FULL = 1015,                  //服务器注册量已满
        ACCOUNT_NAME_BAD_WORD = 1301,           //名字包含非法字符

    }

    export enum position {
        EPT_OPPISITE = 0,//对家
        EPT_UP = 1,//上家，左手边
        EPT_DOWN = 2,//下家，右手边
        EPT_MYSELF = 3,//自己
        ERROR = 4,
    }

    export enum PlayerOperationType {
        OP_MO = 0,//摸
        OP_CHU = 1,//出
        OP_LUO = 2,//落
        OP_CHI = 3,//吃
        OP_PENG = 4,//碰
        OP_GANG = 5,//杠
        OP_ZHIDUI = 6,//支队
        OP_ZHANTING = 7,//粘听
        OP_CHITING = 8,//吃听
        OP_PENGTING = 9,//碰听
        OP_TING = 10,//听
        OP_HU = 11,//和
        OP_MOBAOHU = 12,//摸宝和
        OP_DAFENG = 13,//大风
        OP_HONGZHONG = 14,//红中满天飞
        OP_BAOZHONGBAO = 15,//宝中宝
        OP_QINGYISE = 16,//清一色
        OP_QIXIAODUI = 17,//七小队
        OP_LOU = 18,//漏
        OP_PIAO = 19,//飘
        OP_ZHA = 20,//开牌炸
        OP_TIANHU = 21,//天和
        OP_DIHU = 22,//地和
        OP_ANGANG = 23
    };

    export class gameRoomType {
        /**普通场*/
        public static ROOM_TYPE_COMMON_1 = 1;//初级
        public static ROOM_TYPE_COMMON_2 = 2;//中级
        public static ROOM_TYPE_COMMON_3 = 3;//高级

        public static ROOM_TYPE_VIP = 4;/*VIP场*/
        public static ROOM_TYPE_SINGLE = 5;/*单机场*/
        public static ROOM_TYPE_COUPLE = 6;/*二人*/
        public static ROOM_TYPE_THREE = 8;/*三人*/

        /*地区*/
        public static ROOM_TYPR_DQ = 100;
        public static ROOM_TYPR_ZZ = 101;
        public static ROOM_TYPR_ZY = 102;
        public static ROOM_TYPR_LD = 103;
        public static ROOM_TYPR_TK = 104;
        public static ROOM_TYPR_ZYDB = 105;
        public static ROOM_TYPR_ZYDH = 106;
    }


    export class MJOperation {
        /**玩家的麻将操作*/
        public static MAHJONG_OPERTAION_NONE = 0x0;//无操作
        public static MAHJONG_OPERTAION_MO = 0x03;//摸
        public static MAHJONG_OPERTAION_CHI = 0x01;//吃
        public static MAHJONG_OPERTAION_PENG = 0x02;//碰
        public static MAHJONG_OPERTAION_AN_GANG = 0x04;//暗杠
        public static MAHJONG_OPERTAION_MING_GANG = 0x08;//明杠
        public static MAHJONG_OPERTAION_CHU = 0x10;//出牌
        public static MAHJONG_OPERTAION_HU = 0x20;//胡牌
        public static MAHJONG_OPERTAION_TING = 0x40;//听牌
        public static MAHJONG_OPERTAION_CANCEL = 0x80;//给玩家提示操作，玩家点取消
        public static MAHJONG_OPERTAION_ZHAN_TING = 0x40000000; //粘听
        public static MAHJONG_OPERTAION_ZHAN = 0x80000000; //粘牌操作

        public static MAHJONG_OPERTAION_OFFLINE = 0x100;//断线
        public static MAHJONG_OPERTAION_ONLINE = 0x200;//断线后又上线
        public static MAHJONG_OPERTAION_AUTO_CHU = 0x400;//听牌后自动出牌
        public static MAHJONG_OPERTAION_GAME_OVER = 0x800;//牌局结束

        public static MAHJONG_OPERTAION_GAME_OVER_CHANGE_TABLE = 0x1000;//牌局结束，玩家选择换桌
        public static MAHJONG_OPERTAION_GAME_OVER_CONTINUE = 0x2000;//牌局结束，玩家选择继续开始游戏

        public static MAHJONG_OPERTAION_SEARCH_VIP_ROOM = 0x4000; /**客户端通知服务器查找vip房间 **/
        public static MAHJONG_OPERTAION_ADD_CHU_CARD = 0x8000; /**玩家打出的牌，没有被人吃碰胡，在打这个牌的玩家面前摆一张牌 **/
        public static MAHJONG_OPERTAION_SHOW_BAO_CARD = 0x10000;/**显示宝牌**/
        public static MAHJONG_OPERTAION_TIP = 0x20000;/**提示当前谁在操作**/
        public static MAHJONG_OPERTAION_CHI_TING = 0x40000; //吃了直接听，吃听
        public static MAHJONG_OPERTAION_OVERTIME_AUTO_CHU = 0x80000;//超时自动出牌
        public static MAHJONG_OPERTAION_EXTEND_CARD_REMIND = 0x100000;//提醒房主续卡
        public static MAHJONG_OPERTAION_EXTEND_CARD_SUCCESSFULLY = 0x200000;//提醒房主续卡成功
        public static MAHJONG_OPERTAION_WAITING_OR_CLOSE_VIP = 0x400000;//VIP房间有人逃跑，是否继续等待
        public static MAHJONG_OPERTAION_NO_START_CLOSE_VIP = 0x800000;//VIP房间超时未开始游戏，房间结束
        public static MAHJONG_OPERTAION_ONLY_ZIMO_TIME = 0x1000000;//最后的分张阶段
        public static MAHJONG_OPERTAION_PENG_TING = 0x2000000;//碰听
        public static MAHJONG_OPERTAION_MING_GANG_TING = 0x3000000;//杠听
        public static MAHJONG_OPERTAION_QIANG_TING = 0x4000000;//包括抢听和碰听
        public static MAHJONG_OPERTAION_EXTEND_CARD_FAILED = 0x8000000;//提醒房主续卡失败

        public static MAHJONG_OPERTAION_BAO_IS_OVER = 0x10000000;//提醒未听牌的玩家，宝牌换掉了
        //public static MAHJONG_OPERTAION_REQCLOSE 0x20000000//玩家请求解散房间
        public static MAHJONG_OPERTAION_ZHIDUI = 0x20000000;//支对
        public static MAHJONG_OPERTAION_ASK_HU = 0x300;	//询问是否胡牌
        public static MAHJONG_OPERTAION_CANCEL_ZIMOHU = 0x80000000; //取消自摸胡牌

        public static MAHJONG_OPERTAION_ASK_PAO = 0x90000001;
        public static MAHJONG_OPERTAION_CHOOSE_PAO = 0x90000002;
        public static MAHJONG_OPERTAION_ASK_CKM = 0x90000003;
        public static MAHJONG_OPERTAION_CHOOSE_CKM = 0x90000004;
        public static MAHJONG_OPERTAION_LINDIAN_SHOW = 0x90000005;
        public static MAHJONG_OPERTAION_LINDIAN_HIDE = 0x90000006;
    }


    export class gameOverCode {
        /**玩家牌局结果*/
        public static MAHJONG_HU_CODE_MEN_QING = 0x0001;//门清
        public static MAHJONG_HU_CODE_DIAN_PAO = 0x0002;//点炮
        public static MAHJONG_HU_CODE_MYSELF_ZHUANG_JIA = 0x0004;//自己是不是庄家
        public static MAHJONG_HU_CODE_ZI_MO = 0x0008;//自摸

        public static MAHJONG_HU_CODE_JIA_HU = 0x0010;//夹胡
        public static MAHJONG_HU_CODE_MO_BAO = 0x0020;//摸宝：摸到宝牌和牌。
        public static MAHJONG_HU_CODE_BAO_BIAN = 0x0040;//宝边：在小胡的基础上，要胡的牌正好是宝牌，自摸到宝牌，则称宝边。
        public static MAHJONG_HU_CODE_BAO_ZHONG_BAO = 0x0080;//宝中宝：在大胡的基础上，要胡的牌正好是宝牌，自摸到宝牌，则成为宝中宝。

        //泰康
        public static MAHJONG_HU_CODE_QIXIAODUI = 0x80000;//七小对
        public static MAHJONG_HU_CODE_DUIDUIHU = 0x40000; //飘
        public static MAHJONG_HU_CODE_QINGYISE = 0x400000; //清一色
        public static MAHJONG_HU_CODE_MENTING = 0x20000000; //闷胡


        //肇源
        public static MAHJONG_HU_CODE_1KAN = 0x1000000; //1坎
        public static MAHJONG_HU_CODE_2KAN = 0x2000000; //2坎
        public static MAHJONG_HU_CODE_3KAN = 0x4000000; //3坎
        public static MAHJONG_HU_CODE_4KAN = 0x8000000; //4坎
        public static MAHJONG_HU_CODE_5KAN = 0x10000000; //5坎
        public static MAHJONG_HU_CODE_6KAN = 0x20000000; //6坎
        public static MAHJONG_HU_CODE_7KAN = 0x40000000; //7坎

        //林甸
        public static MAHJONG_HU_CODE_CKM = 0x1000000; //岔开门
        public static MAHJONG_HU_CODE_PAOTWO = 0x2000000; //跑2
        public static MAHJONG_HU_CODE_PAOFIVE = 0x4000000; //跑5

        public static MAHJONG_HU_CODE_TING = 0x0100;//是否听牌
        public static MAHJONG_HU_CODE_TARGET_ZHUANG_JIA = 0x0200;//输赢的对方是庄家

        public static MAHJONG_HU_CODE_TARGET_37_BIAN = 0x0400;//37边
        public static MAHJONG_HU_CODE_TARGET_DAN_DIAO = 0x0800;//单吊

        public static MAHJONG_HU_CODE_TARGET_LOU = 0x1000;//漏
        public static MAHJONG_HU_CODE_TARGET_DA_FENG = 0x2000;//大风
        public static MAHJONG_HU_CODE_TARGET_HONG_ZHONG = 0x4000;//红中满天飞
        public static MAHJONG_HU_CODE_ZHA = 0x8000;
        public static MAHJONG_HU_CODE_TIANHU = 0x10000;
        public static MAHJONG_HU_CODE_DIHU = 0x20000;
        public static MAHJONG_HU_CODE_WIN = 0x100000;//赢
        public static MAHJONG_HU_CODE_LOSE = 0x200000;//输


    }

    export enum operateType {
        OPERATION_CHI,//吃
        OPERATION_PENG,//碰
        OPERATION_TING,//听
        OPERATION_CTING,//吃听
        OPERATION_PTING,//碰听
        OPERATION_HU,//胡
        OPERATION_ZHIMO,//自摸
        OPERATION_JIAHU,//夹胡
        OPERATION_LOUJIA,//搂夹
        OPERATION_MOBAOHU,//摸宝胡
        OPERATION_BAOZBAO,//宝中宝
        OPERATION_DAFENG,//大风
        OPERATION_ZHONG,//红中满天飞
        OPERATION_LOU,//漏
        OPERATION_HUANBAO,//换宝
        OPERATION_ZHIDUI,//支队
        OPERATION_GANG,//杠
        OPERATION_CHAKAI,//叉开门
        OPERATION_PAO1,//跑1
        OPERATION_PAO2,//跑2
        OPERATION_PAO5,//跑5
        OPERATION_QINGYISE,//清一色
        OPERATION_QIXIAODUI,//七小对
        OPERATION_PIAOHU//飘胡
    }

}