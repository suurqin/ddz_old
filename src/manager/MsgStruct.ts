namespace manager {
    /**用户信息 */
    export class User {
        public account: string;			//玩家账号
        public password: string;			//密码
        public wxOpenId: string;
        public wxUnionId: string;
        public playerIndex: number;
        public playerName: string;		//玩家姓名
    }

    //玩家信息
    export class Player {
        public playerID: string;//玩家ID
        public account: string;//玩家账户
        public password: string; //玩家密码
        public playerName: string;//玩家游戏中昵称
        public machineCode: string;//匿名登录的机器码
        public headImg: number; 
        public gold :number; //金币
        public goldVerify: string;
        public sex: number;
        public diamond: number;//钻石
        public score: number;//积分
        public wons: number; //胜利记录
        public loses: number; //失败记录
        public escape: number; //逃跑记录
        public life: number;  //生命值玩一次掉1个，10分钟加一个，自动加满最多5个，可购买
        public tablePos: number; 
        public continueLanding: number; //连续登录天数
        public luckyDrawsTimes: number;//每日赠送抽奖的次数
        public vipLevel: number; //VIP等级
        public vipExp: number;//VIP经验
        public gemNum: number ; //晶石数量
        public playerIndex: number; //玩家索引号，类似与QQ号 系统唯一 1000 是默认值，如果玩家的值为1000的话，则表示他是老玩家需重新分配号码*/
        public cardsDown: Array<number>;//吃碰杠的牌 
        public cardsInHand: Array<number>;//手里的牌
        public cardGrab: number; //刚抓起来的牌
        public canFriend: number; //
        public phoneNumber: string; //电话号码
        //游戏输赢记录
        public normalLevel: number;
        public normalExp: number;
        public normalGameCount: number;
        public maxFanNum: number;
        public maxHuType: number;
        public maxHuCard: number;
        public array: Array<number>;
        public continuePlayVip: number;
        //玩家头像
        public headIconUrl: string;
        public playerItems :Array<PlayerItem>;

    }
    //基础道具
    export class ItemBase {
        public base_id: number;
        public name: string;
        public price: number;
        public property_1: number;
        public property_2: number;
        public property_3: number;
        public property_4: number;
        public description: string;
        public version: number;
    }
    //游戏房间
    export class GameRoom {
        public roomID: number;
        public price: number;
        public minGold: number;
        public maxGold: number;
        public roomType: number;
        public playerNum: number;
        public fixedGold: number;
    }
    //
    export class SystemConfigPara {
        public paraID: number;
        public valueInt: number;
        public pro_1: number;
        public pro_2: number;
        public pro_3: number;
        public pro_4: number;
        public pro_5: number;
        public isclient: number;
        public valueStr: string;
        public paraDesc: string;
        public msgCMD: number;
    }
    export class PlayerItem{
        public ItemBaseID:number;
        public ItemNum :number;
    }

    export class SimplePlayer {
        public playerID: string;
        public playerName: string;
        public headImg: number;
        public gold: number;
        public tablePos: number;
        public sex: number;
        public palyerIndex: number;
        public desc: string;
        public fan: number;
        public gameResult: number;
        public inTable: number;
        public zhuangCount: number;
        public dianpaoCount: number;
        public winCount: number;
        public mobaoCount: number;
        public baozhongbaoCount: number;
        public ip: string;
        public headIconUrl: string;
        public redPacketCount: number;
        public redPacketMoney: number;
    }
}