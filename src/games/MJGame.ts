// TypeScript file
class MJTableLayer extends eui.Component {
    ///*资源----------------------------------->*/ */
    private count: number;
    private gameGroup: eui.Group;                   //游戏中的组
    private lampGroup: eui.Group;                   //方位状态灯
    private opPlayerGroup: eui.Group;               //对家
    private upPlayerGroup: eui.Group;               //上家
    private myPlayerGroup: eui.Group;               //自己
    private downPlayerGroup: eui.Group;                  //下家
    private playerGroups: Array<eui.Group>;
    private playerInTable: Array<manager.SimplePlayer>;
    private roomType: number;                       //房间类型
    private currentOperation: number = null;        //当前操作状态
    private paoGroup: eui.Group;                    //跑操作-------------------
    private chakaimengGroup: eui.Group;            //叉开门操作--------------
    private effectBtnResGroup: eui.Group;          //按钮组
    private mjActionGroup: eui.Group;
    private tipsGroup: eui.Group;

    //出牌group
    public sendCardGroup: eui.Group;
    public mySendCardGroup: eui.Group;
    public upSendCardGroup: eui.Group;
    public opSendCardGroup: eui.Group;
    public downSendCardGroup: eui.Group;

    private countDownLabel: eui.BitmapLabel;
    private timer_flag: egret.Timer = new egret.Timer(500, 1);
    private timeNum = 0;
    public nowVisbaleImg: eui.Image = new eui.Image();
    private timeChildArray: Array<eui.Image> = [];
    public card_UI: manager.UIMgr = new manager.UIMgr();
    private pengTypeGroup: eui.Group;
    private remainMJCard: eui.BitmapLabel;
    private roomIDLable: eui.Label;
    private timer_time: egret.Timer = new egret.Timer(1000, 0);
    private timeLable: eui.Label;
    private MJRulesLable: eui.Label;
    private rule = {};
    private quanNUm: eui.BitmapLabel;
    private isVipTable: boolean = true;
    private scroll: Scroll;
    private baoChange: manager.HandCardRender; // 被换下来得宝
    private setingBtnGroup: eui.Group;
    private zhiduiCards: Array<number>;
    private vipTableId: number = 0;



    /*处理数据*/
    private gangCardList: Array<number>;            //杠牌数据
    private chiCardValue: number;                   //吃牌
    private pengCardValue: number;                   //碰牌
    private zhanCardValue: number;                   //粘牌
    private cardCount: Array<number> = [];
    private opMJCardGroup: eui.Group;                //对家牌
    private upMJCardGroup: eui.Group;                //上家牌
    private myMJCardGroup: eui.Group;                //自己的牌
    private downMJCardGroup: eui.Group;              //下家牌
    private moveCard: eui.IItemRenderer;
    private handCardData: Array<number> = new Array<number>();
    private moveCardIndex: number = -1;
    private showChuCard: eui.IItemRenderer;
    private moNewCard: eui.ItemRenderer = new eui.ItemRenderer();
    private userCardCount: Array<number> = [];

    public constructor() {
        super();
        this.skinName = "resource/my_skins/Room.exml";
        this.setingBtnGroup.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_TAP, this.setting, this);
        this.setTimerRun();
        this.updateTableTime();
        this.playerInTable = new Array<manager.SimplePlayer>();
        this.gangCardList = new Array<number>();
        this.moNewCard = null;
        this.chiCardValue = 0;
        this.pengCardValue = 0;
        this.zhanCardValue = 0;
        this.cardCount = new Array<number>();
        this.playerGroups = [this.opPlayerGroup, this.upPlayerGroup,
        this.downPlayerGroup, this.myPlayerGroup];
        this.updateRuleConfig();
        this.count = 100;
        this.scroll = new Scroll(this.gameGroup);
        this.moveCard = null;
        this.handCardData = [1, 2, 1, 3, 4, 6, 4, 5, 6, 4, 5, 1, 128, 21];
        this.handCardData.sort(this.cardSort);
        this.showChuCard = null;
        this.userCardCount = new Array<number>();
        this.gameGroup.addChild(this.myPlayerGroup);
        this.gameGroup.addEventListener(egret.TouchEvent.TOUCH_END, this.removeStageListener, this);
        egret.log("" + this.handCardData.sort(this.cardSort));
        // let paoMaDengLable1: eui.Label = new eui.Label();
        // paoMaDengLable1.x = this.gameGroup.x;
        // paoMaDengLable1.y = 180;
        // paoMaDengLable1.size = 25;
        // this.gameGroup.addChild(paoMaDengLable1);
        // paoMaDengLable1.text = "32111111111111111111111111"

        //let tween = egret.Tween.get(this.lampgroup.getChildAt(0),{loop :true,onChange: this.timerActive, onChangeObj: this}).to({visible: false}, 1000);
        //测试代码
        // this.playerInTable.length = 4;
        // for (let i = 0; i < 4; i++) {
        //     let oC = this.card_UI.getRLPengCardGroup(1, i + 5, Constant.PlayerOperationType.OP_CHI);
        //     (<eui.Group>this.upPlayerGroup.getChildAt(14)).addChild(oC);
        // }
        // for (let i = 0; i < 4; i++) {
        //     let oC = this.card_UI.getRLPengCardGroup(2, i + 4, Constant.PlayerOperationType.OP_CHI);
        //     (<eui.Group>this.downPlayerGroup.getChildAt(14)).addChildAt(oC, 0);
        // }
        // for (let i = 0; i < 4; i++) {
        //     let oC = this.card_UI.getBFPengCardGroup(3, i + 3, Constant.PlayerOperationType.OP_CHI);
        //     (<eui.Group>this.myPlayerGroup.getChildAt(14)).addChild(oC);
        // }
        // for (let i = 0; i < 4; i++) {
        //     let oC = this.card_UI.getBFPengCardGroup(0, i + 2, Constant.PlayerOperationType.OP_CHI);
        //     (<eui.Group>this.opPlayerGroup.getChildAt(14)).addChildAt(oC, 0);
        // }
        // for (let i = 0; i < 24; i++) {
        //     this.addChuCardUp(i % 9 + 1, 3);
        // }
        // for (let i = 0; i < 24; i++) {
        //     this.addChuCardUp(i % 9 + 1, 0);
        // }
        // for (let i = 0; i < 24; i++) {
        //     this.addChuCardUp(i % 9 + 1, 1);
        // }
        // for (let i = 0; i < 24; i++) {
        //     this.addChuCardUp(i % 9 + 1, 2);
        // }
        let msg = {};
        msg["msg"] = "11111111111111111111111";
        msg["loopNum"] = 1;
        let aaa: ScrollMsg = new ScrollMsg(msg, 0);
        this.scroll.pushpaoMaDengMsg(aaa);

        msg["msg"] = "2222222222222222222222";
        msg["loopNum"] = 2;
        let sss: ScrollMsg = new ScrollMsg(msg, 0);
        this.scroll.pushpaoMaDengMsg(sss);

        // msg["msg"] = "3333333333333333333333";
        // msg["loopNum"] = 3;
        // let bbb: ScrollMsg = new ScrollMsg(msg, 1);
        // this.scroll.pushpaoMaDengMsg(bbb);
        // this.updateBaoCard(0x80);
        // this.showChangeBaoTip(0x80);
        // this.drawingHuType("baozhongbao", this.getPoint(0)[0], this.getPoint(0)[1], 93, 30);
        // this.drawingHuCard(0, 1);
        msg["msg"] = "3333333333333333333333";
        msg["loopNum"] = 3;
        let bbb: ScrollMsg = new ScrollMsg(msg, 1);
        this.scroll.pushpaoMaDengMsg(bbb);
        this.updateBaoCard(0x80);
        // this.showChangeBaoTip(0x80);
        this.drawingHuType("kaipaizha", this.getPoint(0)[0], this.getPoint(0)[1], 93, 30);
        this.drawingHuCard(0, 1);
        this.tipsGroup.visible = true;
        this.tipsGroup.getChildAt(0).visible = true;
        this.tipsGroup.getChildAt(0).alpha = 1;
        let timer: egret.Timer = new egret.Timer(90, 35);
        timer.addEventListener(egret.TimerEvent.TIMER, this.shadingZhuang, this);
        timer.start();

        // this.addChild(new GameSetting(1,112233));

        //var aasaaaa = [1, 2];
        //this.setZhiDuiMenu(aasaaaa, null);
        //this.vipTableId = 10000;
        // 
        // manager.global.mPlayer = new manager.Player();
        // manager.global.mPlayer.tablePos = 2;
        // this.updateTimer(0);
        // this.setOperationPlayer(1, 15);
        // var i = 0;
        // var pos = 0;
        // var timer: egret.Timer = new egret.Timer(1000, 0);
        // timer.addEventListener(egret.TimerEvent.TIMER, () => {
        //     if (i == 6) {
        //         i = 0;
        //         pos++;
        //         if (pos == 4) {
        //             pos = 0;
        //         }
        //         this.setOperationPlayer(pos, 15);
        //     }
        //     i++;
        // }, this);
        // timer.start();
        // msg.chi_card_value, msg.target_card, msg.chi_flag,
        // var card1 = 1 | 1 << 8 | 1 << 16 | 1 << 24;
        // var card2 = 0x80 | 0x80 << 8 | 0x80 << 16 | 0x80 << 24;
        // // let msg = {};
        // msg["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_CHI_TING | Constant.MJOperation.MAHJONG_OPERTAION_QIANG_TING;
        // msg["chi_card_value"] = 1 | 2 << 8 | 4 << 16 | 5 << 24;
        // msg["target_card"] = 3;
        // msg["chi_flag"] = 1 << 2 | 1 << 1;
        // this.qiangTingAndGetCardsMenu(msg);
        // this.gangOperation(msg);
        //测试代码
        //let card: Array<number> = [1, 2, 1, 3, 4, 6, 4, 5, 6, 4, 5, 0x80,5];


        for (let i = 0; i < this.handCardData.length; i++) {
            let aaa = this.card_UI.getHandCardImage(0, 0);

            let kk = this.card_UI.getHandCardImage(3, this.handCardData[i]);
            this.myMJCardGroup.addChild(kk);
            this.opMJCardGroup.addChild(aaa);
            aaa = this.card_UI.getHandCardImage(1, 0);
            this.upMJCardGroup.addChild(aaa);
            aaa = this.card_UI.getHandCardImage(2, 0);
            this.downMJCardGroup.addChild(aaa);
        }
        for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
            if (i == 0) {
                this.myMJCardGroup.getChildAt(i).x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1) + 40;
            }
            else {
                this.myMJCardGroup.getChildAt(i).x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1);
            }

            this.myMJCardGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toutchCardBegin, this);
            this.myMJCardGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_END, this.toutchCardEnd, this);
        }



        //this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toutchCardMove, this);
        //this.addEventListener(egret.TouchEvent.TOUCH_END, this.toutchCardEnd, this);
        // let self = this;
        // this.paoGroup.visible = true;
        // this.paoGroup.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_TAP, function(evt){
        //     self.pao_click(evt);
        // }, this);
        // this.paoGroup.getChildAt(0).removeEventListener(egret.TouchEvent.TOUCH_TAP,this.pao_click,this);
        //this.paoMaDengLable.mask = this.paomadengMask;
        // var data = RES.getRes("FrameBao_json");
        // var txtr = RES.getRes("FrameBao_png");
        // var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( data, txtr );
        // var mc1:egret.MovieClip = new egret.MovieClip( mcFactory.generateMovieClipData( "Frame" ) );


        // this.addChild(mc1);
        // mc1.play(-1);

        // let test = new playAnimation("tianhu");
        // this.addChild(test);
        // test.playMovieEffect();
        // test.setEffectPosition(400, 200);


        // let testTips = new TipsModule();
        // testTips.tipsLable.text = "(*Ӧ)(*ӧ)～♬你方水晶正在被攻击";
        // this.addChild(testTips);

    }

    public setting() {
        var type = this.isVipTable ? 1 : 0;
        new GameSetting(this, type, this.vipTableId);
    }
    /*桌子上 de 定时器*/
    public setTimerRun() {
        var timer: egret.Timer = new egret.Timer(1000, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        timer.start();
        //this.paoOpMenu();
        //this.ting(0);
        this.timer_flag.addEventListener(egret.TimerEvent.TIMER,
            () => {
                if (this.nowVisbaleImg != null) {
                    this.nowVisbaleImg.visible = true;
                }

            }
            , this);

    }
    //初始化规则配置
    public updateRuleConfig() {
        this.rule[0] = "不夹不胡";
        this.rule[1] = "3、7夹";
        this.rule[2] = "单调夹";
        this.rule[3] = "带漏的";
        this.rule[4] = "带大风";
        this.rule[5] = "红中";
        this.rule[6] = "支对";
        this.rule[8] = "开牌炸";
        this.rule[7] = "传统玩法";
        this.rule[9] = "杠";
        this.rule[10] = "清一色";
        this.rule[11] = "七小对";
        this.rule[12] = "飘胡";
        this.rule[13] = "岔开门";
        this.rule[14] = "带跑";
        this.rule[15] = "前后坎";
        this.rule[16] = "通宝";
        this.rule[49] = "天胡";
        this.rule[50] = "地胡";
        this.rule[51] = "快听";
        this.rule[52] = "闷听";
    }

    public updateTableTime() {
        this.timer_time.addEventListener(egret.TimerEvent.TIMER,
            () => {
                let myDate = new Date()
                var shi_str = "";
                var fen_str = "";
                let shi: number = myDate.getHours();
                let fen: number = myDate.getMinutes();
                if (shi < 10) {
                    shi_str = "0" + shi;
                } else {
                    shi_str = "" + shi;
                }
                if (fen < 10) {
                    fen_str = "0" + fen;
                } else {
                    fen_str = "" + fen;
                }
                // egret.log("时间：" + shi_str + ":" + fen_str);
                this.timeLable.text = "时间：" + shi_str + ":" + fen_str;
            }
            , this);
        this.timer_time.start();
    }


    /*桌子上的数据----------------------------------------------------->*/
    public addTablePlayer(msg) {
        if (msg == null) return;

        //     optional int32 result = 1;
        // optional int32 gold = 2;           
        // optional int32 roomID = 3;      
        // optional int32 roomType = 4;         
        // optional int32 tablePos = 5;        
        // optional int32 vipTableID = 6;//房间号
        // optional string creatorName = 7;
        // optional string tablePassword = 8;
        // repeated SimplePlayer players = 9;
        // repeated int32 tableRule = 10;         //z
        // optional int32 diZhu = 11;
        // optional int32 selectDiZhu = 12;
        // optional int32 soundOption = 13;
        // optional int32 creatorPlayerIndex = 14;
        // optional int32 roomId_yuyin = 15;
        // optional string userId_yuyin = 16;
        // optional int32 area = 17; ///地区
        // optional int32 msgCMD = 18;

        //VIP房  
        this.roomType = msg.roomType;
        if (msg.vipTableID > 0) {
            //房主名字，房间号
            this.updateTableMsg(msg);
            if (msg.roomType == Constant.gameRoomType.ROOM_TYPE_COUPLE) {
                this.upPlayerGroup.visible = false;
                this.downPlayerGroup.visible = false;
            }

            if (msg.roomType == Constant.gameRoomType.ROOM_TYPE_THREE) {
                this.upPlayerGroup.visible = false;
            }

        } else {
            this.isVipTable = false;
        }
        /*
        message SimplePlayer{
    optional string playerID = 1;          //z
    optional string playerName = 2;         //z
    optional int32 headImg = 3;
    optional int32 sex = 4;
    optional int32 palyerIndex = 5;           //z
    optional int32 gold = 6;              //z
    optional int32 tablePos = 7;
    optional string desc = 8;
    optional int32 fan = 9;              //z
    optional int32 gameResult = 10;         //z
    optional int32 canFriend = 11;
    optional int32 inTable = 12;
    optional int32 zhuangCount = 13;         //z
    optional int32 winCount = 14;               //z
    optional int32 dianpaoCount = 15;             //z
    optional int32 mobaoCount = 16;               //z
    optional int32 baozhongbaoCount = 17;           //z
    optional string ip = 18;
    optional string headIconUrl = 19;
    optional int32 redPacketCount = 20;
    optional int32 redPacketMoney = 21;
}
        */
        let player = msg.players;
        for (let i in player) {
            //let pos = player[i].tablePos;
            if (!this.isInTable(player[i])) continue;//有人了就不刷新了
            this.initTableInfo(player[i]);
        }
    }

    //当前座位是否有人
    public isInTable(player: manager.SimplePlayer) {
        let isAdd = true;
        for (let i in this.playerInTable) {
            let pl = <manager.SimplePlayer>this.playerInTable[i];
            if (player.tablePos == this.playerInTable[i].tablePos) {
                isAdd = false;
                break;
            }
        }
        if (isAdd) this.playerInTable.push(player);
        return isAdd;
    }

    //头像等信息
    public initTableInfo(info: manager.SimplePlayer) {
        let group: eui.Group = this.playerGroups[gmConvert.getPosition.getPos(info.tablePos, this.roomType)];
        group.visible = true;
        //(<eui.Image>group.getChildAt(2)).source  = 头像

        (<eui.Label>group.getChildAt(6)).text = info.playerName;
        (<eui.Label>group.getChildAt(7)).text = info.palyerIndex + "";
        (<eui.Label>group.getChildAt(8)).text = info.gold + "";


    }



    //将msg里的信息填充到场景
    public gameStart(msg) {
        if (msg == null) return;
        manager.global.mPlayer.tablePos = msg.myTablePos;
        manager.global.zhiCard0 = msg.player0ZhiduiCard;
        manager.global.zhiCard1 = msg.player1ZhiduiCard;
        manager.global.zhiCard2 = msg.player2ZhiduiCard;
        manager.global.zhiCard3 = msg.player3ZhiduiCard;
        //if (msg.chuCard != 0) {
        //this.setChuCard(600, 420, msg.chuCard);
        //this.removeChuCardDown(3);
        //}

        /*
        optional int32 myTablePos=1;----------
        repeated int32 myCards=2;-------
        repeated int32 player0Cards=3;   //桌子上打出去的牌
        repeated int32 player1Cards=4;
        repeated int32 player2Cards=5;
        repeated int32 player3Cards=6;
        repeated int32 player0CardsDown=7;//吃碰牌
        repeated int32 player1CardsDown=8;
        repeated int32 player2CardsDown=9;
        repeated int32 player3CardsDown=10;	
        optional int32 chuCardPlayerIndex=11;  //当前出牌人-----
        optional int32 chuCard=12;-----
        optional int32 dealerPos=13;//庄家位置  -----
        optional int32 quanNum=14;	//当前圈数  ----
        optional int32 baoCard=15;             //z
        optional int32 tingPlayers=16;            //z
        optional int32 player0Gold=17;             //z
        optional int32 player1Gold=18;            //z
        optional int32 player2Gold=19;           //z
        optional int32 player3Gold=20;	           //z
        optional int32 player0ZhiduiCard = 21;
        optional int32 player1ZhiduiCard = 22;
        optional int32 player2ZhiduiCard = 23;
        optional int32 player3ZhiduiCard = 24;	
        optional int32 serviceGold=25;		
        optional int32 OffLinePlayers=26;//是否在线-----
        optional int32 playerOperationTime = 27;//操作时间
        optional int32 isDealerAgain = 28;////连庄提示
        repeated int32 baoCards=29;
        optional int32 isShowCard = 30;///林甸用
        optional int32 ckmPlayers=31;  -----
        optional int32 paoPlayers=32;  -----
        optional int32 msgCMD = 33;
        */

        //打出的牌
        if (msg.chuCard != null) {
            this.addChuCardUp(msg.chuCard, msg.chuCardPlayerIndex);
        }
        if (msg.isDealerAgain == 1) {//连庄
            this.tipsGroup.visible = true;
            this.tipsGroup.getChildAt(0).visible = true;
            this.tipsGroup.getChildAt(0).alpha = 1;
            let timer: egret.Timer = new egret.Timer(90, 35);
            timer.addEventListener(egret.TimerEvent.TIMER, this.shadingZhuang, this);
            timer.start();
            playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_LIANZHUANG);
        }
        for (let i = 0; i < this.roomType; i++) {
            switch (gmConvert.getPosition.getPos(this.playerInTable[i], this.roomType)) {
                case Constant.position.EPT_OPPISITE:
                    this.addHandCard(this.opMJCardGroup, 13, Constant.position.EPT_OPPISITE, null);
                    break;
                case Constant.position.EPT_UP:
                    this.addHandCard(this.upMJCardGroup, 13, Constant.position.EPT_UP, null);
                    break;
                case Constant.position.EPT_MYSELF:
                    this.addHandCard(this.myMJCardGroup, 0, Constant.position.EPT_MYSELF, msg.myCards);
                    break;
                case Constant.position.EPT_DOWN:
                    this.addHandCard(this.downMJCardGroup, 13, Constant.position.EPT_DOWN, null);
                    break;
                default:
                    break;
            }
        }
        this.initTableMsg(msg);

    }

    //手牌
    public addHandCard(gp: eui.Group, num: number, pos: number, cards: Array<number>) {
        if (pos == Constant.position.EPT_MYSELF) {
            // for (let i in cards) {
            //     gp.addChild(this.card_UI.getHandCardImage(pos, cards[i] & 0xff));
            // }
            this.handCardData = cards;
            this.reFrushHandCard();
        }
        else {
            for (let i = 0; i < num; i++) {
                gp.addChild(this.card_UI.getHandCardImage(pos, 0));
            }
        }
    }

    /** * 庄听差开门跑等 桌子上的信息 */
    public initTableMsg(info) {
        this.updatezhuangFlag(info.dealerPos);
        this.updateTingFlag(info.tingPlayers);
        this.updatePaoFlag(info.paoPlayers);
        this.updateTimer(info.dealerPos);
        this.updateQuan(info.quanNum);
        this.updateOnLine(info.OffLinePlayers);
    }
    public updateOnLine(offLinePlayers: number) {
        for (var i = 0; i < this.roomType; i++) {
            if (((offLinePlayers >> (i * 8)) & 0xff) > 0) {
                (<eui.Label>this.getGroupByTablePos(i).getChildAt(6)).textColor = 0;
                (<eui.Label>this.getGroupByTablePos(i).getChildAt(7)).textColor = 0;
                (<eui.Label>this.getGroupByTablePos(i).getChildAt(9)).textColor = 0;
            } else {
                (<eui.Label>this.getGroupByTablePos(i).getChildAt(6)).textColor = 0xffffff;
                (<eui.Label>this.getGroupByTablePos(i).getChildAt(7)).textColor = 0xffffff;
                (<eui.Label>this.getGroupByTablePos(i).getChildAt(9)).textColor = 0xffffff;
            }
        }
    }
    public updateQuan(num: number) {
        if (num != null && num > 0) {
            this.quanNUm.text = "圈数:" + num;
        }
    }

    /** * //获取当前桌子位置的玩家的  group */
    public getGroupByTablePos(pos: number): eui.Group {
        let group: eui.Group;
        group = this.playerGroups[gmConvert.getPosition.getPos(pos, this.roomType)];
        return group;
    }
    /** * //更新桌子上哪个玩家听了  group */
    public updateTingFlag(ting: number) {
        for (var i = 0; i < this.roomType; i++) {
            if (((ting >> (i * 8)) & 0xff) > 0) {
                (<eui.Image>this.getGroupByTablePos(i).getChildAt(4)).visible = true;
            }
        }
    }
    /** * //更新桌子上庄的位置  group */
    public updatezhuangFlag(zhuangPos: number) {
        (<eui.Image>this.getGroupByTablePos(zhuangPos).getChildAt(5)).visible = true;
    }
    /** * //更新桌子上表的位置  group */
    public updateTimer(zhuangPos: number) {
        this.changeLamp(gmConvert.getPosition.getPos(zhuangPos, this.roomType));
        //旋转
        for (var i = 0; i < 5; i++) {
            switch (gmConvert.getPosition.getPos(zhuangPos, this.roomType)) {
                case 0:
                    this.lampGroup.getChildAt(i).rotation = 180;
                    break;
                case 1:
                    this.lampGroup.getChildAt(i).rotation = 90;
                    break;
                case 2:
                    this.lampGroup.getChildAt(i).rotation = 270;
                    break;
                case 3:
                    break;
                default:
                    break;
            }
        }
    }
    /** * //更新桌子跑的信息 */
    public updatePaoFlag(paoMsg: number) {
        for (var i = 0; i < this.roomType; i++) {
            var paoNum = ((paoMsg >> (i * 8)) & 0xff);
            if (paoNum == -1 && i == manager.global.mPlayer.tablePos) {
                this.paoGroup.visible = true;
            } else if (paoNum == 2) {
                (<eui.Image>this.getGroupByTablePos(i).getChildAt(11)).visible = true;
            } else if (paoNum == 5) {
                (<eui.Image>this.getGroupByTablePos(i).getChildAt(12)).visible = true;
            }
        }
    }

    /** * //更新桌子岔开门的信息 */
    public updateCKMFlag(ckmMsg: number) {
        for (var i = 0; i < this.roomType; i++) {
            var ckmNum = ((ckmMsg >> (i * 8)) & 0xff);
            if (ckmNum == -1 && i == manager.global.mPlayer.tablePos) {
                this.chakaimengGroup.visible = true;
            } else if (ckmNum == 1) {
                (<eui.Image>this.getGroupByTablePos(i).getChildAt(10)).visible = true;
            }
        }
    }

    public changeLamp(num: number) {
        switch (num) {
            case 0:
                this.timeChildArray = [<eui.Image>this.lampGroup.getChildAt(3),
                <eui.Image>this.lampGroup.getChildAt(4), <eui.Image>this.lampGroup.getChildAt(2),
                <eui.Image>this.lampGroup.getChildAt(1)];
                break;
            case 1:
                this.timeChildArray = [<eui.Image>this.lampGroup.getChildAt(2),
                <eui.Image>this.lampGroup.getChildAt(3), <eui.Image>this.lampGroup.getChildAt(1),
                <eui.Image>this.lampGroup.getChildAt(4)];
                break;
            case 2:
                this.timeChildArray = [<eui.Image>this.lampGroup.getChildAt(4),
                <eui.Image>this.lampGroup.getChildAt(1), <eui.Image>this.lampGroup.getChildAt(3),
                <eui.Image>this.lampGroup.getChildAt(2)];
                break;
            case 3:
                this.timeChildArray = [<eui.Image>this.lampGroup.getChildAt(1),
                <eui.Image>this.lampGroup.getChildAt(2), <eui.Image>this.lampGroup.getChildAt(4),
                <eui.Image>this.lampGroup.getChildAt(3)];
                break;
        }
    }

    //获取当前玩家
    public getPlayerByPos(pos: number) {
        if (this.playerInTable.length > 0) {
            for (let i in this.playerInTable) {

            }
        }
    }
    //定时器回调
    public timerFunc() {
        if (this.timeNum < 10) {
            this.countDownLabel.text = "0" + this.timeNum;
        } else {
            this.countDownLabel.text = "" + this.timeNum;
        }

        if (this.nowVisbaleImg != null) {
            this.nowVisbaleImg.visible = false;

        }
        this.timer_flag.start();

        if (this.timeNum == 0) {
            this.timeNum = 1;
        }
        this.timeNum--;
    }
    //跑分
    public paoOpMenu() {

        this.removeLister(this.paoGroup, egret.TouchEvent.TOUCH_TAP, this.pao_click);
        this.paoGroup.visible = true;
        this.paoGroup.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_TAP, this.pao_click, this);
        this.paoGroup.getChildAt(1).addEventListener(egret.TouchEvent.TOUCH_TAP, this.pao_click, this);
        this.paoGroup.getChildAt(2).addEventListener(egret.TouchEvent.TOUCH_TAP, this.pao_click, this);

    }
    public pao_click(evt) {

        let playerOperation = {};
        playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_ASK_PAO;
        if (evt.target.name == "pao2") {
            playerOperation["opValue"] = 2;
        }
        else if (evt.target.name == "pao5") {
            playerOperation["opValue"] = 5;
        }
        else {
            playerOperation["opValue"] = 0;
        }

        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;

        this.sendData(playerOperation);

        this.paoGroup.visible = false;
        this.removeLister(this.paoGroup, egret.TouchEvent.TOUCH_TAP, this.pao_click);
    }
    //叉开门
    public chaKaiMenu() {
        this.removeLister(this.chakaimengGroup, egret.TouchEvent.TOUCH_TAP, this.chak_click);
        this.chakaimengGroup.visible = true;
        this.chakaimengGroup.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_TAP, this.chak_click, this);
        this.chakaimengGroup.getChildAt(1).addEventListener(egret.TouchEvent.TOUCH_TAP, this.chak_click, this);
    }
    //叉开门点击
    public chak_click(evt) {
        let playerOperation = {};
        playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_ASK_CKM;
        if (evt.target.name == "cha") {
            playerOperation["opValue"] = 1;
        }
        else {
            playerOperation["opValue"] = 0;
        }

        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);

        this.chakaimengGroup.visible = false;
        this.removeLister(this.chakaimengGroup, egret.TouchEvent.TOUCH_TAP, this.chak_click);
    }
    //玩家离开桌子
    public tablePlayerLeft(pos) {
        (<eui.Label>this.getGroupByTablePos(pos).getChildAt(6)).textColor = 0;
        (<eui.Label>this.getGroupByTablePos(pos).getChildAt(7)).textColor = 0;
        (<eui.Label>this.getGroupByTablePos(pos).getChildAt(9)).textColor = 0;
    }
    //玩家回来
    public tablePlayerOnLine(pos) {
        (<eui.Label>this.getGroupByTablePos(pos).getChildAt(6)).textColor = 0xffffff;
        (<eui.Label>this.getGroupByTablePos(pos).getChildAt(7)).textColor = 0xffffff;
        (<eui.Label>this.getGroupByTablePos(pos).getChildAt(9)).textColor = 0xffffff;
    }
    //刷新手牌
    public reFrushHandCard() {
        this.myMJCardGroup.removeChildren();

        for (let i = 0; i < this.handCardData.length; i++) {
            this.myMJCardGroup.addChild(this.card_UI.getHandCardImage(3, this.handCardData[i]));
        }
        for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
            if (i == 0) {
                this.myMJCardGroup.getChildAt(i).x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1) + 40;
            }
            else {
                this.myMJCardGroup.getChildAt(i).x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1);
            }

            this.myMJCardGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toutchCardBegin, this);
            this.myMJCardGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_END, this.toutchCardEnd, this);
        }
    }
    //设置当前状态
    public setCurrentOperation(op) {
        this.currentOperation = op;
    }
    //摸牌
    public moCard(value) {
        if (this.moNewCard != null) {
            return;
        }

        this.handCardData.push(value & 0xff);
        let card = this.card_UI.getHandCardImage(3, value & 0xff);
        this.myMJCardGroup.addChildAt(card, 0);
    }
    //听牌处理
    public ting(tingList, opId) {
        //听牌置灰处理
        this.showAndHideOperationMenu(0);//还原
        this.removeAllLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP);//清除侦听
        //加听牌菜单,如果是吃听碰听只置灰,没有听听提示菜单
        if (this.currentOperation == Constant.MJOperation.MAHJONG_OPERTAION_TING) {
            //单独听牌的菜单
            this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("ting"));
            if ((opId && Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG != Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG) &&
                (opId && Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG != Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG)) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("guo"));//单独有听
                this.showAndHideOperationMenu(1);
                for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
                    this.mjActionGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.click_ting, this);
                }
            }

        }
    }

    //听点击
    public click_ting(evt) {
        this.showAndHideOperationMenu(0);
        this.removeLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP, this.click_ting);
        switch (evt.target.name) {
            case "guo"://还原手牌,设置出牌状态,把原来变灰的牌变回来
                this.setCurrentOperation(Constant.MJOperation.MAHJONG_OPERTAION_CHU);
                break;
            case "ting":
                let playerOperation = {};
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_TING;
                playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
                playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
                this.sendData(playerOperation);
                break;
        }
    }

    public cancelTing() {
        this.showAndHideOperationMenu(0);
        this.removeLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP, this.click_ting);
        this.reFrushHandCard();
    }

    //显示操作菜单//隐藏操作菜单
    public showAndHideOperationMenu(num) {
        if (num) {
            this.mjActionGroup.visible = true;
            this.effectBtnResGroup.visible = true;
            for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
                this.mjActionGroup.getChildAt(i).visible = true;
            }
        }
        else {
            this.mjActionGroup.visible = false;
            this.effectBtnResGroup.visible = false;
            for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
                this.mjActionGroup.getChildAt(i).visible = false;
                this.effectBtnResGroup.addChild(this.mjActionGroup.getChildAt(i));
            }
        }
    }

    //暗杠提示
    public gangOperation(msg) {
        this.showAndHideOperationMenu(0);//还原
        this.removeAllLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP);//清除侦听
        this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("gang"));
        this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("guo"));//过
        //加暗杠提示
        if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG) == Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG) {
            for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
                this.mjActionGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.an_gang_click, this);
            }
        }
        else if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG) == Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG) {
            for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
                this.mjActionGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.ming_gang_click, this);
            }
        }

        this.showAndHideOperationMenu(1);
        //有碰出来的牌可能会有明杠
        this.gangCardList = [];
        this.gangCardList = msg.gang_card_value_list;

    }

    //暗杠
    public an_gang_click(evt, ) {

        this.showAndHideOperationMenu(0);
        this.removeLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP, this.an_gang_click);
        if (this.checkGangNum() > 1) {
            return;
        }

        let playerOperation = {};
        switch (evt.target.name) {
            case "gang":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG;
                playerOperation["card_value"] = this.gangCardList[0];//杠牌的值
                break;
            case "ting":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_TING;
                break;
            case "guo":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_CANCEL;
                break;
        }
        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);


    }

    // //明杠提示
    // public mingGangOperation(msg) {
    //     //加暗杠提示
    //     this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("gang"));//暗杠或者明杠
    //     this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("guo"));//过
    //     this.showAndHideOperationMenu(1);
    //     for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
    //         this.mjActionGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.ming_gang_click, this);
    //     }
    //     this.gangCardList = [];
    //     this.gangCardList = msg.gang_card_value_list;
    //     //有碰出来的牌可能会有明杠
    // }

    //明杠
    public ming_gang_click(evt) {
        this.showAndHideOperationMenu(0);
        this.removeLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP, this.ming_gang_click);
        if (this.checkGangNum() > 1) {
            return;
        }
        let playerOperation = {};
        switch (evt.target.name) {
            case "gang":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG;
                playerOperation["card_value"] = this.gangCardList[0];//杠牌的值
                break;
            case "ting":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_TING;
                break;
            case "guo":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_CANCEL;
                break;
        }
        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);
    }

    //刷新桌子上剩余牌数
    public updateCardRemainder(num) {
        this.remainMJCard.text = num + "";
    }

    //吃碰刚抢听的时候提示
    public qiangTingAndGetCardsMenu(msg) {
        //在这只处理抢听状态
        this.showAndHideOperationMenu(0);//还原
        this.removeAllLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP);//清除侦听
        let chiTing: boolean = false;
        if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_QIANG_TING) == Constant.MJOperation.MAHJONG_OPERTAION_QIANG_TING) {
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_ZHAN_TING) == Constant.MJOperation.MAHJONG_OPERTAION_ZHAN_TING) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("zhanting"));//粘听
                this.zhanCardValue = msg.zhan_card_value;
            }
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG_TING) == Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG_TING) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("gangting"));//杠听
                this.gangCardList = [];
                this.gangCardList = msg.gang_card_value_list;
            }
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_PENG_TING) == Constant.MJOperation.MAHJONG_OPERTAION_PENG_TING) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("pengting"));//碰听
                this.pengCardValue = msg.peng_card_value;
            }
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_CHI_TING) == Constant.MJOperation.MAHJONG_OPERTAION_CHI_TING) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("chiting"));//吃听
                this.chiCardValue = msg.chi_card_value;
                chiTing = true;
            }
        }
        else {
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG) == Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("gang"));//杠
                this.gangCardList = [];
                this.gangCardList = msg.gang_card_value_list;
            }
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_PENG) == Constant.MJOperation.MAHJONG_OPERTAION_PENG) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("peng"));//碰
                this.pengCardValue = msg.peng_card_value;
            }
            if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_CHI) == Constant.MJOperation.MAHJONG_OPERTAION_CHI) {
                this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("chi"));//吃
                this.chiCardValue = msg.chi_card_value;
            }
        }
        this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("guo"));//过

        for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
            this.mjActionGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuOperationClick, this);
        }

        this.showAndHideOperationMenu(1);
        if ((msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_CHI_TING) == Constant.MJOperation.MAHJONG_OPERTAION_CHI_TING ||
            (msg.operation & Constant.MJOperation.MAHJONG_OPERTAION_CHI) == Constant.MJOperation.MAHJONG_OPERTAION_CHI) {
            this.checkChiNum(msg.chi_card_value, msg.target_card, msg.chi_flag, chiTing);
        }
    }

    //抢听
    public menuOperationClick(evt) {
        this.showAndHideOperationMenu(0);
        this.removeLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP, this.menuOperationClick);
        if (evt.target.name == "chiting" || evt.target.name == "chi") {
            if (this.pengTypeGroup.numChildren > 0) {
                for (var i = 0; i < this.pengTypeGroup.numChildren; i++) {
                    this.pengTypeGroup.getChildAt(i).visible = true;
                }
            }
            return;
        }
        let playerOperation = {};
        switch (evt.target.name) {
            case "gangting":
            case "gang":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG;
                playerOperation["card_value"] = this.gangCardList[0];//杠牌的值
                break;
            case "zhanting":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_ZHAN;
                playerOperation["card_value"] = this.zhanCardValue;//粘的值
                break;
            case "pengting":
            case "peng":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_PENG;
                playerOperation["card_value"] = this.pengCardValue;//碰的值
                break;
            case "chiting":
            case "chi":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_CHI;
                playerOperation["card_value"] = this.chiCardValue;//吃的值
                break;
            case "guo":
                playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_CANCEL;
                break;
        }
        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);
    }

    public setZhiDuiMenu(list, show) {
        let hasGuo = false;
        this.zhiduiCards = [];
        this.zhiduiCards = list;
        this.showAndHideOperationMenu(0);//还原
        this.removeAllLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP);//清除侦听
        this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("zhidui"));//支对
        for (let i in this.zhiduiCards) {
            if (this.zhiduiCards[i] == 0) {
                hasGuo = true;
                continue;
            }
        }
        if (hasGuo) {
            this.mjActionGroup.addChild(this.effectBtnResGroup.getChildByName("guo"));//过
        }
        for (let i = 0; i < this.mjActionGroup.numChildren; i++) {
            this.mjActionGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_TAP, this.menuZhiDuiClick, this);
        }
        this.showAndHideOperationMenu(1);
    }

    public menuZhiDuiClick(evt) {
        this.showAndHideOperationMenu(0);
        this.removeLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP, this.menuZhiDuiClick);
        if (evt.target.name == "zhidui") {//选项
            this.zhiduiCardsListen(this.zhiduiCards);
            return;
        }
        //走过
        let playerOperation = {};
        playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_ZHIDUI;
        playerOperation["card_value"] = 0;
        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);
    }

    //设置当前操作玩家和时间
    public setOperationPlayer(pos, time) {
        this.nowVisbaleImg = this.timeChildArray[gmConvert.getPosition.getPos(pos, this.roomType)];
        this.timeNum = time;
    }

    //自动出牌
    public auto_chu() {

    }

    //超时自动出牌
    public over_time_auto_chu(card) {

    }

    //隐藏所有操作菜单
    public cancel_selection_operation() {
        //跑
        this.paoGroup.visible = false;
        this.removeLister(this.paoGroup, egret.TouchEvent.TOUCH_TAP, this.pao_click);
        //叉
        this.chakaimengGroup.visible = false;
        this.removeLister(this.chakaimengGroup, egret.TouchEvent.TOUCH_TAP, this.chak_click);

        this.showAndHideOperationMenu(0);//还原
        this.removeAllLister(this.effectBtnResGroup, egret.TouchEvent.TOUCH_TAP);//清除侦听
    }
    //设置托管状态
    public setTuoGuanStation(stat: boolean) {

    }

    //画胡的牌
    public drawingHuCard(pos: number, cardNum: number) {
        let card = this.card_UI.getHandCardImage(3, cardNum);
        switch (pos) {
            case (Constant.position.EPT_OPPISITE): {
                card.x = 600;
                card.y = 80;
                break;
            }
            case (Constant.position.EPT_UP): {
                card.x = 270;
                card.y = 270;
                break;
            }
            case (Constant.position.EPT_MYSELF): {
                card.x = 600;
                card.y = 420;
                break;
            }
            case (Constant.position.EPT_DOWN): {

                card.x = 900;
                card.y = 270;
                break;
            }

        }
        this.addChild(card);

    }

    //胡牌位置
    public showHuCard(card, result, pos) {
        let ps = gmConvert.getPosition.getPos(pos, this.roomType);
        this.drawingHuCard(ps, card);
        //播放动画音效

        let code = Constant.gameOverCode;
        let sound = playMusic.Soundeffect.getInstance();
        let sex = this.getPlayerSex(manager.global.mPlayer.tablePos);
        if ((result & code.MAHJONG_HU_CODE_TARGET_LOU) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_PENG, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_TARGET_DA_FENG) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_DAFENG, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_TARGET_HONG_ZHONG) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_ZHONG, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_BAO_ZHONG_BAO) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_BAOZBAO, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_DUIDUIHU) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_PIAOHU, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_MO_BAO) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_MOBAOHU, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_QIXIAODUI) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_QIXIAODUI, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_QINGYISE) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_QINGYISE, sex);
        }
        else if (((result & code.MAHJONG_HU_CODE_JIA_HU) != 0) && ((result & code.MAHJONG_HU_CODE_ZI_MO) != 0)) {
            sound.operateEffect(Constant.operateType.OPERATION_LOUJIA, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_JIA_HU) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_JIAHU, sex);
        }
        else if ((result & code.MAHJONG_HU_CODE_ZI_MO) != 0) {
            sound.operateEffect(Constant.operateType.OPERATION_ZHIMO, sex);
            sound.playSoundEffect(playMusic.EFFECT_ZIMO);
        }
        else if ((result & code.MAHJONG_HU_CODE_ZHA) != 0) {
            sound.playSoundEffect(playMusic.EFFECT_ZHA);
        }
        else {
            sound.operateEffect(Constant.operateType.OPERATION_HU, sex);
        }



        if (result & code.MAHJONG_HU_CODE_TARGET_LOU) {
            sound.playSoundEffect(playMusic.EFFECT_BAOZHONGBAO);
            this.drawingHuType("baozhongbao", this.getPoint(ps)[0], this.getPoint(ps)[1], 93, 30);
        }
        else if ((result & code.MAHJONG_HU_CODE_ZHA) != 0) {
            this.drawingHuType("zha", this.getPoint(ps)[0], this.getPoint(ps)[1], 41, 32);
        }
        else if ((result & code.MAHJONG_HU_CODE_TIANHU) != 0) {
            this.drawingHuType("tianhu", this.getPoint(ps)[0], this.getPoint(ps)[1], 0, 16);
        }
        else if ((result & code.MAHJONG_HU_CODE_DIHU) != 0) {
            this.drawingHuType("dihu", this.getPoint(ps)[0], this.getPoint(ps)[1], 224, 231);
        }
        else if (result & code.MAHJONG_HU_CODE_TARGET_DA_FENG) {
            sound.playSoundEffect(playMusic.EFFECT_DAFENG);
            this.drawingHuType("dafeng", this.getPoint(ps)[0], this.getPoint(ps)[1], 21, 13);
        }
        else if (result & code.MAHJONG_HU_CODE_TARGET_HONG_ZHONG) {
            sound.playSoundEffect(playMusic.EFFECT_HONGZHONG);
            this.drawingHuType("hongzhongfei", this.getPoint(ps)[0], this.getPoint(ps)[1], 23, 92);

        }
        else if ((result & code.MAHJONG_HU_CODE_BAO_ZHONG_BAO) != 0 && (result & code.MAHJONG_HU_CODE_WIN) != 0) {
            sound.playSoundEffect(playMusic.EFFECT_BAOZHONGBAO);
            this.drawingHuType("baozhongbao", this.getPoint(ps)[0], this.getPoint(ps)[1], 93, 30);
        }
        else if (result & code.MAHJONG_HU_CODE_MO_BAO) {
            sound.playSoundEffect(playMusic.EFFECT_MOBAOHU);
            this.drawingHuType("mobaohu", this.getPoint(ps)[0], this.getPoint(ps)[1], 90, 30);
        }
        else if ((result & code.MAHJONG_HU_CODE_QIXIAODUI) != 0 && (result & code.MAHJONG_HU_CODE_WIN) != 0) {
            //七小对
            this.drawingHuType("qixiaodui", this.getPoint(ps)[0], this.getPoint(ps)[1], 24, 0);
        }
        else if ((result & code.MAHJONG_HU_CODE_DUIDUIHU) != 0 && (result & code.MAHJONG_HU_CODE_WIN) != 0) {
            this.drawingHuType("piao", this.getPoint(ps)[0], this.getPoint(ps)[1], 57, 32);
        }
        else if ((result & code.MAHJONG_HU_CODE_QINGYISE) != 0 && (result & code.MAHJONG_HU_CODE_WIN) != 0) {
            this.drawingHuType("qingyise", this.getPoint(ps)[0], this.getPoint(ps)[1], 101, 220);
        }
        else {
            sound.playSoundEffect(playMusic.EFFECT_PINGHU);
        }

        // playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_BALANCE_WIN);
        // playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_BALANCE_LOST);
        // playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_WARRING);

    }

    public getPoint(pos: number): Array<number> {
        var iii = [0, 0];
        if (pos == 0) {
            iii[0] = 640;
            iii[1] = 120;
        } else if (pos == 1) {
            iii[0] = 300;
            iii[1] = 280;
        } else if (pos == 2) {
            iii[0] = 940;
            iii[1] = 280;
        } else if (pos == 3) {
            iii[0] = 640;
            iii[1] = 440;
        }

        return iii;
    }
    //显示特效
    public drawingHuType(type: string, x: number, y: number, wuChax: number, wuChay: number) {
        let test = new playAnimation(type);
        this.gameGroup.addChild(test);
        test.playMovieEffect(1);
        // test.getAnimationmc()
        test.x = x - ((test.getAnimationmc().width * test.getAnimationmc().scaleX) / 2) - (wuChax * test.getAnimationmc().scaleX);
        test.y = y - ((test.getAnimationmc().height * test.getAnimationmc().scaleY) / 2) - (wuChay * test.getAnimationmc().scaleY);

    }


    //更新宝牌
    public updateBaoCard(card) {
        let baoCardGroup: eui.Group = <eui.Group>this.gameGroup.getChildByName("baoCardGroup");
        var bao: manager.HandCardRender;
        if (card != 0) {
            bao = this.card_UI.getHandCardImage(3, card);
        } else {
            bao = this.card_UI.getHandCardImage(0, card);
            bao.cardfront.source = RES.getRes("mjCard_json.0");
        }
        bao.scaleX = baoCardGroup.width / bao.width;
        bao.scaleY = baoCardGroup.height / bao.height;
        baoCardGroup.removeChildren();
        baoCardGroup.addChild(bao);
    }
    //提示上一个宝摸完了
    public showChangeBaoTip(card) {
        this.baoChange = this.card_UI.getHandCardImage(3, card);
        this.baoChange.width = this.tipsGroup.width / 1.5;
        this.baoChange.height = this.tipsGroup.height;
        this.baoChange.x = this.tipsGroup.width * 1 / 5;
        this.baoChange.y = -10;
        this.baoChange.name = "baoChange;"

        this.tipsGroup.addChild(this.baoChange);
        this.tipsGroup.visible = true;
        this.tipsGroup.getChildAt(1).visible = true;
        this.tipsGroup.getChildAt(1).alpha = 1;
        let timer: egret.Timer = new egret.Timer(90, 35);
        timer.addEventListener(egret.TimerEvent.TIMER, this.shading, this);
        timer.start();
    }
    //提示渐变效果
    public shading() {
        this.tipsGroup.getChildAt(1).alpha -= 0.03;
        this.baoChange.alpha -= 0.03;
        if (this.tipsGroup.getChildAt(1).alpha <= 0 && this.tipsGroup.visible) {
            this.tipsGroup.visible = false;
            this.tipsGroup.getChildAt(1).visible = false;
            this.tipsGroup.removeChildAt(this.tipsGroup.numChildren - 1);
        }
    }
    //提示渐变效果
    public shadingZhuang() {
        // this.tipsGroup.getChildAt(0).alpha -= 0.03;
        this.tipsGroup.alpha -= 0.03;
        if (this.tipsGroup.alpha <= 0 && this.tipsGroup.visible) {
            this.tipsGroup.visible = false;
            this.tipsGroup.getChildAt(0).visible = false;
        }
    }



    //刷新手牌
    public refreshPlayerCards(card_value, handCards, beforeCards, downCards) {

        let cd: number = card_value & 0xff;
        for (let j = 0; j < this.handCardData.length; j++) {
            if (cd == this.handCardData[j]) {
                this.handCardData.splice(j, 1);//移除
                break;
            }
        }
        this.myMJCardGroup.removeChildren();

        for (let i = 0; i < this.handCardData.length; i++) {
            this.myMJCardGroup.addChild(this.card_UI.getHandCardImage(3, this.handCardData[i]));
        }

        for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
            if (i == 0) {
                this.myMJCardGroup.getChildAt(i).x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1) + 40;
            }
            else {
                this.myMJCardGroup.getChildAt(i).x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1);
            }

            this.myMJCardGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toutchCardBegin, this);
            this.myMJCardGroup.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_END, this.toutchCardEnd, this);
        }
    }
    //跑返回
    public paoOperationAck(pos, value) {
        if (value == 5) {
            (<eui.Image>this.getGroupByTablePos(pos).getChildAt(11)).visible = true;
        } else if (value == 2) {
            (<eui.Image>this.getGroupByTablePos(pos).getChildAt(12)).visible = true;
        }
    }
    //叉开门
    public chaOperationAck(pos) {
        (<eui.Image>this.getGroupByTablePos(pos).getChildAt(10)).visible = true;
    }
    //吃碰返回
    public chi_peng_OperationAck(msg) {
        let ps = gmConvert.getPosition.getPos(msg.player_table_pos, this.roomType);
        switch (msg.operation) {
            case Constant.MJOperation.MAHJONG_OPERTAION_CHI:
                this.drawingHuType("chi", this.getPoint(ps)[0], this.getPoint(ps)[1], 23, 23);
                break;
            case Constant.MJOperation.MAHJONG_OPERTAION_PENG:
                this.drawingHuType("peng", this.getPoint(ps)[0], this.getPoint(ps)[1], 22, 27);
                break;
        }


    }
    //听操作结果
    public tingOperationAck(pos) {
        let ps = gmConvert.getPosition.getPos(pos, this.roomType);
        // (<eui.Image>this.getGroupByTablePos(pos).getChildAt(4)).visible = true;

        //加听动画
        this.drawingHuType("ting", this.getPoint(ps)[0], this.getPoint(ps)[1], 9, 10);
    }
    //设置听牌标志
    public tingTip(pos) {
        (<eui.Image>this.getGroupByTablePos(pos).getChildAt(4)).visible = true;
    }
    //杠操作返回
    public gangOperationAck(msg) {
        let ps = gmConvert.getPosition.getPos(msg.player_table_pos, this.roomType);
        this.drawingHuType("gang", this.getPoint(ps)[0], this.getPoint(ps)[1], 22, 26);
    }
    //粘返回
    public zhanOperationAck(pos) {
        let ps = gmConvert.getPosition.getPos(pos, this.roomType);
        this.drawingHuType("gang", this.getPoint(ps)[0], this.getPoint(ps)[1], 22, 26);
    }
    //只对
    public setZhiDuiCard(value) {
        if (value == 0) {//播动画



            playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_ZHIDUI);
            return;
        }

        ///牌变灰,刷新手牌

    }
    //发送数据
    public sendData(data) {
        manager.Global.gameSocketMj.sendData(data);
    }
    //点击清空
    public removeLister(gr: eui.Group, type: string, fn: Function) {
        for (let i = 0; i < gr.numChildren; i++) {
            if (gr.getChildAt(i).hasEventListener) {
                gr.getChildAt(i).removeEventListener(type, fn, this);
            }
        }
    }
    //直接清空
    public removeAllLister(gr: eui.Group, type: string) {
        for (let i = 0; i < gr.numChildren; i++) {
            if (gr.getChildAt(i).hasEventListener) {
                let name = gr.getChildAt(i).name;
                switch (name) {
                    case "guo":
                    case "ting":
                    case "gang":
                        gr.getChildAt(i).removeEventListener(type, this.an_gang_click, this);//有听又有杠
                        gr.getChildAt(i).removeEventListener(type, this.ming_gang_click, this);//有听又有杠
                        if (name == "gang") {
                            gr.getChildAt(i).removeEventListener(type, this.menuOperationClick, this);//明杠
                        }
                        else if (name == "guo") {
                            gr.getChildAt(i).removeEventListener(type, this.click_ting, this);//单独听
                            gr.getChildAt(i).removeEventListener(type, this.menuOperationClick, this);
                        }
                        else if (name == "ting") {
                            gr.getChildAt(i).removeEventListener(type, this.click_ting, this);//单独听
                        }
                        break;
                    case "chi":
                    case "peng":
                    case "chiting":
                    case "pengting":
                    case "gangting":
                    case "zhanting":
                        gr.getChildAt(i).removeEventListener(type, this.menuOperationClick, this);
                        break;
                    case "zhidui":
                        gr.getChildAt(i).removeEventListener(type, this.menuZhiDuiClick, this);
                        break;
                    case "hu":
                        break;
                }

            }
        }
    }

    /*桌子上的数据----------------------------------------------------->!@!!!!!!!!!*/


    //多组杠选取
    private checkGangNum(): number {
        this.pengTypeGroup.removeChildren();
        var gangNum = 0;
        gangNum = this.gangCardList.length;
        if (gangNum > 1) {
            var x = 0;
            var card_w = this.pengTypeGroup.width / 1.5;
            var card_h = this.pengTypeGroup.height;
            for (var i = 0; i < gangNum; i++) {
                for (var j = 0; j < 4; j++) {
                    let card: manager.HandCardRender = this.card_UI.getHandCardImage(3, this.gangCardList[i] & 0xff);
                    card.name = this.gangCardList[i] + "";
                    card.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickGang, this);
                    card.scaleX = card_w / card.width;
                    card.scaleY = card_h / card.height;
                    card.x = x;
                    card.y = 0;
                    this.pengTypeGroup.addChild(card);
                    x += card_w;
                }
                x += card_w / 2;
            }
        }
        return gangNum;
    }

    //多组杠点击事件
    private clickGang(evt) {
        this.pengTypeGroup.removeChildren();
        var cards = parseInt(evt.target.name);
        var c1 = cards & 0xff;
        var c4 = (cards >> 24) & 0xff;
        var operation = c1 == c4 ? Constant.MJOperation.MAHJONG_OPERTAION_AN_GANG : Constant.MJOperation.MAHJONG_OPERTAION_MING_GANG;
        let playerOperation = {};


        playerOperation["operation"] = operation;
        playerOperation["card_value"] = cards;//杠牌的值

        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);
    }

    private checkChiNum(card: number, target: number, flag: number, isChiTing: boolean): number {
        var chiNum = 0;
        var zuhe1 = false;
        var zuhe2 = false;
        var zuhe3 = false;
        var c1 = card & 0xff;
        var c2 = (card >> 8) & 0xff;
        var c3 = (card >> 16) & 0xff;
        var c4 = (card >> 24) & 0xff;

        var tingZuHe1: boolean = 1 == (flag & 1);
        var tingZuHe2: boolean = 1 == ((flag >> 1) & 1);
        var tingZuHe3: boolean = 1 == ((flag >> 2) & 1);

        if (c1 > 0 && c2 > 0) {
            if (isChiTing) {
                if (tingZuHe1) {
                    zuhe1 = true;
                    chiNum++;
                }
            } else {
                zuhe1 = true;
                chiNum++;
            }
        }
        if (c2 > 0 && c3 > 0) {
            if (isChiTing) {
                if (tingZuHe2) {
                    zuhe2 = true;
                    chiNum++;
                }
            } else {
                zuhe2 = true;
                chiNum++;
            }
        }
        if (c3 > 0 && c4 > 0) {
            if (isChiTing) {
                if (tingZuHe3) {
                    zuhe3 = true;
                    chiNum++;
                }
            } else {
                zuhe3 = true;
                chiNum++;
            }
        }

        if (chiNum > 1) {
            if (zuhe1) {
                var cards = [c1, c2, target];
                var cardValue = c1 | c2 << 8;
                this.chiCardsListen(cards, cardValue);
            }
            if (zuhe2) {
                var cards = [c2, target, c3];
                var cardValue = c2 | c3 << 8;
                this.chiCardsListen(cards, cardValue);
            }
            if (zuhe3) {
                var cards = [target, c3, c4,];
                var cardValue = c3 | c4 << 8;
                this.chiCardsListen(cards, cardValue);
            }
        }

        return chiNum;
    }

    //画3张牌
    public chiCardsListen(cards: Array<number>, cardValue: number) {
        var cardflag;

        var card_w = this.pengTypeGroup.height / 1.5;
        var x = card_w;
        var card_h = this.pengTypeGroup.height;
        if (this.pengTypeGroup.numChildren > 0) {
            x = this.pengTypeGroup.getChildAt(this.pengTypeGroup.numChildren - 1).x
                + this.pengTypeGroup.getChildAt(this.pengTypeGroup.numChildren - 1).width
                + this.pengTypeGroup.height;
        }
        for (var i = 0; i < cards.length; i++) {
            let card: manager.HandCardRender = this.card_UI.getHandCardImage(3, cards[i]);
            if (i == 0) {
                cardflag = card;
            }
            card.name = cardValue + "";

            card.scaleX = card_w / card.width;
            card.scaleY = card_h / card.height;
            card.x = x;
            card.y = 0;
            card.visible = false;
            this.pengTypeGroup.addChild(card);
            x += card_w;

        }
        let img = new eui.Image();
        img.source = RES.getRes("roomIDbg_png");
        img.width = card_w * 4;
        img.height = card_h + (card_w / 2);
        img.x = cardflag.x - (card_w / 2);
        img.y = cardflag.y - (card_w / 4);
        img.name = cardValue + "";
        img.visible = false;
        img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickChiCards, this);
        // img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickZhiduiCards, this);
        this.pengTypeGroup.addChild(img);


    }
    //多组吃牌回调
    public clickChiCards(evt) {
        this.pengTypeGroup.removeChildren();
        var cardValue = parseInt(evt.target.name);
        let playerOperation = {};
        playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_CHI;
        playerOperation["card_value"] = cardValue;//吃的值

        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);
    }

    //填充桌子上房间号规则语音等
    public updateTableMsg(msg) {
        if (this.isVipTable) {
            this.vipTableId = msg.vipTableID;
            this.roomIDLable.text = "房号：" + msg.vipTableID;
            this.MJRulesLable.text = this.getRuleStr(msg.tableRule);
        }
    }
    //获取规则str
    public getRuleStr(rules: Array<number>): string {
        var ruleStr = "";
        for (var i = 0; i < rules.length; i++) {
            ruleStr += this.rule[rules[i]] + " ";
        }
        return ruleStr;
    }

    /*牌*/
    public toutchCardBegin(evt) {

        let card = evt.currentTarget;
        this.addCardZheZhao(card);
        this.moveCard = card;
        this.gameGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toutchCardMove, this);
    }

    public toutchCardMove(evt) {
        if (this.moveCard != null) {
            let card = <manager.HandCardRender>this.moveCard;
            card.isMoving = true;
            this.moveCard.x = evt.stageX - 39 + 29 - this.moveCard.width / 2;
            this.moveCard.y = evt.stageY - 105 - 484 - this.moveCard.height / 2;
            if (this.moveCardIndex == -1) {
                for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
                    let cd = <manager.HandCardRender>this.myMJCardGroup.getChildAt(i);
                    if (cd.isMoving) {
                        this.myMJCardGroup.setChildIndex(cd, 100 + i);
                        this.moveCardIndex = i;
                        break;
                    }
                }
            }
        }
    }

    public toutchCardEnd(evt) {
        if (this.moveCard != null) {
            let card = <manager.HandCardRender>evt.currentTarget;
            this.removeCardZheZhao(card);
            this.setChuCard(evt.stageX, evt.stageY, card.num);
            if (!card.isSelect) {
                for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
                    let cd = <manager.HandCardRender>this.myMJCardGroup.getChildAt(i);
                    if (cd != null) {
                        cd.y = 0;
                        cd.isSelect = false;
                        cd.isMoving = false;
                    }
                }
                // let aaa = this.moveCard.y;
                card.y -= 20;
                card.isSelect = true;

                //点牌声
                playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_CARD_CLICK);
            }
            else {
                //直接出牌了
                if (!card.isMoving) {
                    this.chuCard(card);
                    //this.removeChuCardDown(3);
                }
            }
        }
    }

    public removeStageListener(evt) {
        if (this.moveCard != null) {
            let y = evt.stageY - 105 - 484 - this.moveCard.height / 2;
            if (y > -175) {
                this.setMoveCard();
            }
            else {
                this.chuCard(this.moveCard);
                //this.removeChuCardDown(3);
            }
            this.moveCard = null;
            this.moveCardIndex = -1;
            this.gameGroup.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.toutchCardMove, this);
        }
    }

    public setMoveCard() {
        let card = <manager.HandCardRender>this.moveCard;
        // let index = this.handCardData.indexOf(card.num);
        // egret.log("" + index);
        if (this.moveCardIndex != -1) {
            this.myMJCardGroup.setChildIndex(card, this.moveCardIndex);
        }
        for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
            let cd = <manager.HandCardRender>this.myMJCardGroup.getChildAt(i);
            let wh = i == 0 ? 40 : 0;
            if (card.num == cd.num && card.isMoving) {
                if (cd.isSelect) {
                    this.chuCard(cd);
                }
                else {
                    cd.x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1) + wh;
                    cd.y = 0;
                    cd.isMoving = false;
                    cd.isSelect = false;
                    if (this.showChuCard != null) {
                        this.gameGroup.removeChild(this.showChuCard);
                    }
                }
            }
            else {
                if (cd.isSelect) {
                    cd.x = 1190 - this.myMJCardGroup.getChildAt(i).width * (i + 1) + wh;
                    this.gameGroup.removeChild(this.showChuCard);
                }
            }
        }
    }

    public chuCard(card) {
        let cs = <manager.HandCardRender>card;
        for (let i = 0; i < this.myMJCardGroup.numChildren; i++) {
            let cd = <manager.HandCardRender>this.myMJCardGroup.getChildAt(i);
            if (cd.isSelect || cd.isMoving) {
                this.myMJCardGroup.removeChildAt(i);//移除
                break;
            }
        }

        for (let j = 0; j < this.handCardData.length; j++) {
            if (cs.num == this.handCardData[j]) {
                this.handCardData.splice(j, 1);//移除
                break;
            }
        }
        this.reFrushHandCard();


        //this.addChuCard(0, 3);
        let tw = egret.Tween.get(this.showChuCard);
        tw.to({ x: 600, y: 420, }, 200);
        // tw.call(function() {
        //     //let tw1 = egret.Tween.get(self.showChuCard);
        //         tw.to({x: 100, y: 100}, 200);
        //     });
        // let playerOperation = {};
        //         playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        //         playerOperation["card_value"] = cs.num;
        //         playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        //         this.sendData(playerOperation);
    }

    public cardSort(a, b) {
        return b - a;
    }
    //设置出的牌
    public setChuCard(x, y, num) {
        this.showChuCard = this.card_UI.getHandCardImage(3, num);
        this.showChuCard.x = x - this.showChuCard.width / 2;
        this.showChuCard.y = y - this.showChuCard.height / 2;
        this.showChuCard.name = "ChuCard";
        this.gameGroup.addChild(this.showChuCard);
    }
    ////出
    public addChuCardUp(value, pos) {
        let ps = gmConvert.getPosition.getPos(pos, this.roomType);
        switch (ps) {
            case Constant.position.EPT_MYSELF:
                this.setChuCard(600, 420, value);
                break;
            case Constant.position.EPT_DOWN:
                this.setChuCard(900, 270, value);
                break;
            case Constant.position.EPT_UP:
                this.setChuCard(270, 270, value);
                break;
            case Constant.position.EPT_OPPISITE:
                this.setChuCard(600, 80, value);
                break;
        }
    }
    //清除
    public removeChuCardDown(pos) {

        // let ps = gmConvert.getPosition.getPos(pos, this.roomType)
        let tw = egret.Tween.get(this.showChuCard);
        let tw1 = egret.Tween.get(this.showChuCard);
        let self = this;
        let posX = 0;
        let posY = 0;
        let index = 0;
        posX = this.sendCardGroup.x;
        posY = this.sendCardGroup.y;
        let card = this.card_UI.getDownCardImage(pos, (<manager.HandCardRender>this.showChuCard).num, 1);
        card.visible = false;
        card.scaleX = 0.5;
        card.scaleY = 0.5;
        switch (pos) {
            case Constant.position.EPT_MYSELF:
                this.mySendCardGroup.addChild(card);
                index = this.mySendCardGroup.getChildIndex(card);
                if (index < 6) {
                    card.x = 50.5 + index * 40.5;
                    card.y = 0;
                } else if (index < 14) {
                    card.x = 10 + (index - 6) * 40.5;
                    card.y = 45;
                } else {
                    card.x = -30.5 + (index - 14) * 40.5;
                    card.y = 90;
                }
                this.showChuCard.x = 600;
                this.showChuCard.y = 420;
                posX = posX + this.mySendCardGroup.x;
                posY = posY + this.mySendCardGroup.y;
                break;
            case Constant.position.EPT_DOWN:
                this.downSendCardGroup.addChildAt(card, 0);
                index = this.downSendCardGroup.numChildren - 1;
                if (index < 6) {
                    card.x = 70;
                    card.y = 32.5 * 6 - index * 32.5 + 32.5;
                } else if (index < 14) {
                    card.x = 120;
                    card.y = 32.5 * 8 - (index - 6) * 32.5
                } else {
                    card.x = 170;
                    card.y = 32.5 * 10 - (index - 14) * 32.5 - 32.5;
                }
                this.showChuCard.x = 900;
                this.showChuCard.y = 270;
                posX = posX + this.downSendCardGroup.x;
                posY = posY + this.downSendCardGroup.y;
                break;
            case Constant.position.EPT_UP:
                this.upSendCardGroup.addChild(card);
                index = this.upSendCardGroup.getChildIndex(card);
                if (index < 6) {
                    card.x = 30;
                    card.y = index * 32.5 + 65;
                } else if (index < 14) {
                    card.x = -20;
                    card.y = (index - 6) * 32.5 + 32.5;
                } else {
                    card.x = -70;
                    card.y = (index - 14) * 32.5;
                }
                this.showChuCard.x = 270;
                this.showChuCard.y = 270;
                posX = posX + this.upSendCardGroup.x;
                posY = posY + this.upSendCardGroup.y;
                break;
            case Constant.position.EPT_OPPISITE:
                //this.opSendCardGroup.addChild(card);
                this.opSendCardGroup.addChildAt(card, 0);
                index = this.opSendCardGroup.numChildren - 1;
                if (index < 6) {
                    card.x = 10 + 40.5 * 6 - index * 40.5;
                    card.y = 90;
                } else if (index < 14) {
                    card.x = 10 + 40.5 * 7 - (index - 6) * 40.5;
                    card.y = 45;
                } else {
                    card.x = 10 + 40.5 * 8 - (index - 14) * 40.5;
                    card.y = 0;
                }
                this.showChuCard.x = 600;
                this.showChuCard.y = 80;
                posX = posX + this.opSendCardGroup.x;
                posY = posY + this.opSendCardGroup.y;
                break;
        }
        //tw.to({ x: card.x, y: card.y, function() { self.addTableCard(pos) } }, 200);
        tw.wait(200).to({ x: card.x + posX, y: card.y + posY, }, 200).call(function () { card.visible = true });
        tw1.wait(200).to({ scaleX: 0.5, scaleY: 0.5 }, 200).call(function () { self.addTableCard(pos) });
        // tw.to({ x: card.x + posX, y: card.y + posY, }, 200).call(function () { card.visible = true });
        // tw1.to({ scaleX: 0.5, scaleY: 0.5 }, 200).call(function () { self.addTableCard(pos) });
    }

    //移动完成
    public addTableCard(pos) {
        //加到桌子上以后移除
        this.removeChuCard();
    }

    public removeChuCard() {
        if (this.gameGroup.getChildByName("ChuCard") != null) {
            this.gameGroup.removeChild(this.showChuCard);
            this.showChuCard = null;
        }
    }

    public setSendCardPosition(card: manager.SendCardRender) {
        if (!card) {

            switch (card.pos) {
                case (Constant.position.EPT_OPPISITE): {

                    card.x = 600;
                    card.y = 80;
                    break;
                }
                case (Constant.position.EPT_UP): {

                    card.x = 270;
                    card.y = 270;
                    break;
                }
                case (Constant.position.EPT_MYSELF): {
                    card.x = 600;
                    card.y = 420;
                    break;
                }
                case (Constant.position.EPT_DOWN): {

                    card.x = 900;
                    card.y = 270;
                    break;
                }

            }
        }
    }

    public getPlayerSex(pos) {
        if (this.playerInTable.length <= 0) return;
        let sex = 0;
        for (let i = 0; i < this.playerInTable.length; i++) {
            let pl = <manager.SimplePlayer>this.playerInTable[i];
            if (pl.tablePos == pos) {
                sex = pl.sex;
                break;
            }
        }
        return sex;
    }

    //牌变灰
    public addCardZheZhao(card: manager.HandCardRender) {
        if (card.getChildByName("huiZheZhao") == null) {
            let img = new eui.Image();
            img.source = RES.getRes("roomIDbg_png");
            img.width = card.cardbg.width;
            img.height = card.cardbg.height;
            img.name = "huiZheZhao";
            card.addChild(img);
        }
    }
    public removeCardZheZhao(card: manager.HandCardRender) {
        if (card.getChildByName("huiZheZhao") != null) {
            card.removeChild(card.getChildByName("huiZheZhao"));
        }

    }
    //画只对的牌
    public zhiduiCardsListen(cards: Array<number>) {
        var x = 100;
        this.pengTypeGroup.visible = true;
        var card_w = this.pengTypeGroup.height / 1.5;
        var card_h = this.pengTypeGroup.height;
        if (this.pengTypeGroup.numChildren > 0) {
            x = this.pengTypeGroup.getChildAt(this.pengTypeGroup.numChildren - 1).x + this.pengTypeGroup.height;
        }
        for (var i = 0; i < cards.length; i++) {
            let card: manager.HandCardRender = this.card_UI.getHandCardImage(3, cards[i]);
            card.scaleX = card_w / card.width;
            card.scaleY = card_h / card.height;
            card.x = x;
            card.y = 0;
            this.pengTypeGroup.addChild(card);
            x += card_w;
            let card1: manager.HandCardRender = this.card_UI.getHandCardImage(3, cards[i]);

            card1.scaleX = card_w / card1.width;
            card1.scaleY = card_h / card1.height;
            card1.x = x;
            card1.y = 0;
            this.pengTypeGroup.addChild(card1);
            x += card_w;
            x += 100;
            let img = new eui.Image();
            img.source = RES.getRes("roomIDbg_png");
            img.width = card_w * 3;
            img.height = card_h + (card_w / 2);
            img.x = card.x - (card_w / 2);
            img.y = card.y - (card_w * 0.25);
            img.name = cards[i] + "";
            img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickZhiduiCards, this);
            this.pengTypeGroup.addChild(img);
        }


    }
    //只对牌回调
    public clickZhiduiCards(evt) {
        this.pengTypeGroup.removeChildren();
        var cardValue = parseInt(evt.target.name);
        let playerOperation = {};
        playerOperation["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_ZHIDUI;
        playerOperation["card_value"] = cardValue;
        playerOperation["player_table_pos"] = manager.global.mPlayer.tablePos;
        playerOperation["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        this.sendData(playerOperation);
    }

    public getCardInLayDown(cardValue, pos): number {
        let card = 0;
        cardValue = cardValue & 0xffffffff;
        return card = (cardValue >> (pos * 8)) & 0xff;
    }

    public getLayDownType(cardValue): number {
        let card = [0, 0, 0, 0];
        for (let i = 0; i < 4; i++) {
            card[i] = this.getCardInLayDown(cardValue, i);
        }

        if (card[1] != card[0])
            return Constant.PlayerOperationType.OP_CHI;
        else {
            if (card[2] == 0)
                return Constant.PlayerOperationType.OP_ZHANTING;
            else {
                if (card[3] == 0)
                    return Constant.PlayerOperationType.OP_PENG;
                else {
                    if (card[3] != 0xb0)
                        return Constant.PlayerOperationType.OP_GANG;
                    else
                        return Constant.PlayerOperationType.OP_ANGANG;
                }
            }
        }
        //return -1;
    }
}   