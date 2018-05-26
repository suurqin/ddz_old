// TypeScript file
module gameOver {
    //玩家数据
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

    //玩家数据
    export class GameOverMsg {
        public roomID: number;
        public players: Array<gameOver.SimplePlayer> = [];
        public dealerPos: number;
        public cards: Array<number>;
        public huCard: number;
        public stage: number;
        public isVipTable: number;
        public readyTime: number;
        public baoCard: number;
        public huPos: number;
        public player0HandCards: Array<number>;
        public player1HandCards: Array<number>;
        public player2HandCards: Array<number>;
        public player3HandCards: Array<number>;
        public player0DownCards: Array<number>;
        public player1DownCards: Array<number>;
        public player2DownCards: Array<number>;
        public player3DownCards: Array<number>;
        public isReward: number;
        public baoCards: Array<number>;
    }



    export class GameOverConfig {
        public static repeatCount: number = 10;
        public static winFlag: string = "g_win_png";
        public static loseFlag: string = "g_lose_png";
        public static liujuFlag: string = "g_liuju_png";

        public static qixiaodui: string = "g_qxd_png";
        public static qingyise: string = "g_qys_png";
        public static baozhongbao: string = "g_bzb_png";


        public static ruleMap = {
            1: "37夹"
        }
        public static fanTypeMap = {
            1: "37夹"
        }

    }

}

class GameOver extends eui.Component {
    public gameOver: eui.Group;
    public losePlayerMsg: eui.Group;
    public loseMsgPlayer0: eui.Group;
    public cardMsg0: eui.Group;
    public loseId0: eui.Label;
    public loseName0: eui.Label;
    public loseFanType0: eui.Label;
    public loseFanNum0: eui.Label;
    public loseScoreNum0: eui.Label;
    public zhuangFlag0: eui.Image;
    public loseMsgPlayer1: eui.Group;
    public cardMsg1: eui.Group;
    public loseId1: eui.Label;
    public loseName1: eui.Label;
    public loseFanType1: eui.Label;
    public loseFanNum1: eui.Label;
    public loseScoreNum1: eui.Label;
    public zhuangFlag1: eui.Image;

    public loseMsgPlayer2: eui.Group;
    public cardMsg2: eui.Group;
    public loseId2: eui.Label;
    public loseName2: eui.Label;
    public loseFanType2: eui.Label;
    public loseFanNum2: eui.Label;
    public loseScoreNum2: eui.Label;
    public zhuangFlag2: eui.Image;
    public winnPlayerMsg: eui.Group;
    public winnerCardsMsg: eui.Group;
    public winnerFanType: eui.Label;
    public winnerName: eui.Label;
    public winnerId: eui.Label;
    public winnerFanNum: eui.Label;
    public winnerScoreNum: eui.Label;
    public winnerHuType: eui.Image;
    public winnerZhuangFlag: eui.Image;

    public countdown: eui.BitmapLabel;
    public ruleMsg: eui.Label;
    public baoCardMsg: eui.Group;
    public winOrLoseFlag: eui.Image;
    public sharing: eui.Button;
    public ready: eui.Button;
    public timer: egret.Timer;
    public g_back: eui.Button;
    public countdown0: eui.Label;
    public winfan: string = "";

    public daojishi: eui.Label;
    public shanshuo: eui.Image;

    public card_UI: manager.UIMgr = new manager.UIMgr();


    public constructor(msg) {
        super();
        this.updateGameOverMsg(msg);
        //runScene.Director.getInstance().rmChild(this);//关闭按钮调
    }
    //开启调用
    public updateGameOverMsg(msg: Object) {
        this.skinName = "resource/my_skins/GameOver.exml";
        // var i = 30;
        // let timer2: egret.Timer = new egret.Timer(500, 1);
        // var self = this;
        // this.timer = new egret.Timer(1000, 0);
        // this.timer.addEventListener(egret.TimerEvent.TIMER, (event: KeyboardEvent) => {
        //     this.daojishi.text = "" + i;
        //     this.shanshuo.visible = false;
        //     timer2.start();
        //     i--;
        // }, this);

        // timer2.addEventListener(egret.TimerEvent.TIMER, (event: KeyboardEvent) => {
        //     this.shanshuo.visible = true;
        // }, this);

        // this.timer.start();






        var g_msg = <gameOver.GameOverMsg>msg;

        //测试代码
        g_msg.baoCard = 17;
        g_msg.huCard = 2;
        g_msg.huPos = 1;
        g_msg.dealerPos = 2;
        g_msg.player0DownCards = [];
        g_msg.player1DownCards = [1];
        g_msg.player2DownCards = [1, 1];
        g_msg.player3DownCards = [1, 1, 1];
        g_msg.player0HandCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0x11, 0x12, 0x13, 0x14];
        g_msg.player1HandCards = [0x15, 0x16, 0x17, 0x18, 0x19, 0x21, 0x22, 0x23, 0x24, 0x25];
        g_msg.player2HandCards = [0x26, 0x27, 0x28, 0x29, 128, 3, 1];
        g_msg.player3HandCards = [9, 1, 2, 3];
        for (var i = 0; i < 4; i++) {
            var pl: gameOver.SimplePlayer = new gameOver.SimplePlayer();
            pl.fan = 11;
            pl.gold = -11;
            pl.palyerIndex = 16138;
            pl.playerName = "社会生活"
            pl.tablePos = i;
            pl.gameResult = 0;
            g_msg.players[i] = pl;
        }


        this.wOrL(this.r_winOrLose(g_msg.huPos));
        this.w_countdown();
        this.w_baoCard(g_msg.baoCard);
        this.w_allPlayersCards(g_msg);
        this.w_rule();
    }

    //返回赢家应该显示的胡牌方式
    public r_winnerFanType(fanType: Array<number>): string {
        var str = "";
        //deng 
        str = gameOver.GameOverConfig.baozhongbao;
        return str;
    }

    //返回输赢
    public r_winOrLose(huPos: number): number {
        var n = 1;
        if (huPos == 1
            // manager.global.mPlayer.tablePos
        ) { //deng
            n = 0;
        } else if (huPos == -1) {
            n = 2;
        }
        return n;
    }

    //画输赢
    public wOrL(type: number) {
        if (type == 0) {
            this.winOrLoseFlag.source = RES.getRes(gameOver.GameOverConfig.winFlag);
            playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_BALANCE_WIN);

        } else if (type == 1) {
            this.winOrLoseFlag.source = RES.getRes(gameOver.GameOverConfig.loseFlag);
            playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_BALANCE_LOST);
        } else {
            this.winOrLoseFlag.source = RES.getRes(gameOver.GameOverConfig.liujuFlag);
            playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_BALANCE_LOST);
        }
    }
    //倒计时
    public w_countdown() {
        var repeatCount: number = gameOver.GameOverConfig.repeatCount;
        this.timer = new egret.Timer(1000, repeatCount + 1);
        this.timer.addEventListener(egret.TimerEvent.TIMER, (event: KeyboardEvent) => {
            this.countdown0.text = "" + repeatCount;
            if (repeatCount <= 5) {
                playMusic.Soundeffect.getInstance().playSoundEffect(playMusic.EFFECT_WARRING);
            }
            if (repeatCount == 0) {
                this.countdown0.text = "";
                this.timer.stop();
                this.w_ready();
            }
            repeatCount--;
        }, this);
        this.timer.start();
    }

    //点准备
    public w_ready() {
        let msg = {};
        msg["operation"] = Constant.MJOperation.MAHJONG_OPERTAION_GAME_OVER_CONTINUE;
        manager.Global.gameSocketMj.sendData(msg);

        //点关闭
        // let msg = {};
        // msg["operation"] = Constant.MJOperation.GAME_OPERTAION_PLAYER_LEFT_TABLE;
        // manager.Global.gameSocketMj.sendData(msg);
        //sceneMgr.runScene.loadScene(sceneMgr.TAG_LOBBY_SCENE);
    }
    //点分享
    public w_sharing() {

    }

    //画宝牌
    public w_baoCard(type: number) {
        let image: manager.HandCardRender = this.card_UI.getHandCardImage(3, type);
        image.scaleX = this.baoCardMsg.width / image.width;
        image.scaleY = this.baoCardMsg.height / image.height;

        this.baoCardMsg.addChild(image);
    }

    public getHandCards(id: number, msg: gameOver.GameOverMsg): Array<number> {
        var h_cards: Array<number>;
        if (id == 0) {
            h_cards = msg.player0HandCards;
        } else if (id == 1) {
            h_cards = msg.player1HandCards;
        } else if (id == 2) {
            h_cards = msg.player2HandCards;
        } else if (id == 3) {
            h_cards = msg.player3HandCards;
        }
        return h_cards;
    }
    public getDownCards(id: number, msg: gameOver.GameOverMsg): Array<number> {
        var d_cards: Array<number>;
        if (id == 0) {
            d_cards = msg.player0DownCards;
        } else if (id == 1) {
            d_cards = msg.player1DownCards;
        } else if (id == 2) {
            d_cards = msg.player2DownCards;
        } else if (id == 3) {
            d_cards = msg.player3DownCards;
        }
        return d_cards;
    }
    public getFanTypeStr(fanType: number): string {
        var str = "";
        let fan: Array<number> = this.getfanTypeList(fanType);

        //解析老端的番型的方法 //deng
        return str;
    }

    public getfanTypeList(num: number): Array<number> {
        let fan: Array<number> = [];
        //deng 
        return fan;
    }

    //画4个玩家的内容
    public w_allPlayersCards(msg: gameOver.GameOverMsg) {
        var hu_pos = msg.huPos;
        //赢的玩家
        for (var i = 0; i < msg.players.length; i++) {
            if (hu_pos == msg.players[i].tablePos) {
                this.winfan = this.r_winnerFanType(this.getfanTypeList(msg.players[i].gameResult));
                this.d_playerMsg(msg.players[i], this.getDownCards(i, msg), this.getHandCards(i, msg), this.winnPlayerMsg
                    , msg.huCard);
                if (msg.dealerPos == msg.players[i].tablePos) {
                    this.winnerZhuangFlag.visible = true;
                }

                break;
            }
        }
        var groups: Array<eui.Group> = [this.loseMsgPlayer0, this.loseMsgPlayer1, this.loseMsgPlayer2];
        var g_i = 0;
        for (var i = 0; i < msg.players.length; i++) {
            if (hu_pos != msg.players[i].tablePos) {
                this.d_playerMsg(msg.players[i], this.getDownCards(i, msg), this.getHandCards(i, msg), groups[g_i], 0);
                if (msg.dealerPos == msg.players[i].tablePos) {
                    groups[g_i].getChildAt(6).visible = true;
                }
                g_i++;
            }
        }


    }


    //画每个玩家的内容
    public d_playerMsg(pl_msg: gameOver.SimplePlayer, downCards: Array<number>,
        handCards: Array<number>, group: eui.Group, huCard: number) {
        (<eui.Label>group.getChildAt(0)).text = pl_msg.palyerIndex + "";
        (<eui.Label>group.getChildAt(1)).text = pl_msg.playerName;
        (<eui.Label>group.getChildAt(2)).text = this.getFanTypeStr(pl_msg.gameResult);
        (<eui.Label>group.getChildAt(3)).text = pl_msg.fan + "番";
        (<eui.Label>group.getChildAt(4)).text = pl_msg.gold + "";
        this.d_playerCards((<eui.Group>group.getChildAt(5)), downCards, handCards, huCard);
        if (this.winnPlayerMsg.name == group.name) {

        }

    }

    public addCards(group: eui.Group, im: eui.Image) {
        switch (group.name) {
            case this.winnerCardsMsg.name:
                this.winnerCardsMsg.addChild(im);
                break;
            case this.cardMsg0.name:
                this.winnerCardsMsg.addChild(im);
                break;
            case this.cardMsg1.name:
                this.winnerCardsMsg.addChild(im);
                break;
            case this.cardMsg2.name:
                this.winnerCardsMsg.addChild(im);
                break;
        }
    }

    //画玩家的牌
    public d_playerCards(group: eui.Group, downCards: Array<number>, handCards: Array<number>, huCard: number) {
        var card_w = group.height / 1.5;
        var card_h = group.height;
        var x = 0;
        for (var i = 0; i < downCards.length; i++) {
            //画牌函数
            //测试代码
            for (var j = 0; j < 3; j++) {
                let image: manager.HandCardRender = this.card_UI.getHandCardImage(3, downCards[i]);
                image.scaleX = card_w / image.width;
                image.scaleY = card_h / image.height;
                image.x = x;
                image.y = 0;
                group.addChild(image);
                x += card_w
            }
            // this.addCards(group,image);
            x += card_w * 0.5;
        }

        for (var i = 0; i < handCards.length; i++) {
            //画牌函数
            let image: manager.HandCardRender = this.card_UI.getHandCardImage(3, handCards[i]);
            image.scaleX = card_w / image.width;
            image.scaleY = card_h / image.height;
            image.x = x;
            image.y = 0;
            group.addChild(image);
            x += card_w;
        }
        x += card_w / 2;
        if (huCard > 0) {
            let image: manager.HandCardRender = this.card_UI.getHandCardImage(3, huCard);
            image.scaleX = card_w / image.width;
            image.scaleY = card_h / image.height;
            image.x = x;
            image.y = 0;
            group.addChild(image);
            this.winnerHuType.source = RES.getRes(this.winfan);
            this.winnerHuType.x = x + card_w - 15 + group.x;
        }
    }

    //写玩法规则
    public w_rule() {
        var str = "37jia 单调夹 红中 保重";

        this.ruleMsg.text = str;
    }

}