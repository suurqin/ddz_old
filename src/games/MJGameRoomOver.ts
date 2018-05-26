// TypeScript file
module gameroomOver {

    export class GameRoomOverMsg {
        public paoPos: number;
        public winPos: number;
        public players: Array<gameOver.SimplePlayer> = [];
        public round: number;
        public currentTask: number;
        public msgCMD: number;
    }
    export class GameRoomOverConfig {
        public static WIN_UI = "gr_1_png";
        public static PAO_UI = "gr_2_png";
        public static FOUR_PLAYER_BG_UI = "gr_11_png";
        public static TWO_PLAYER_BG_UI = "gr_10_png";


    }

}

class GameRoomOver extends eui.Component {
    public gameRoomOver: eui.Group;
    public fourPlayer: eui.Group;
    public threePlayer: eui.Group;
    public twoPlayer: eui.Group;

    public gr_msg: gameroomOver.GameRoomOverMsg;
    public playerNum: number;
    public group_now: eui.Group;

    public constructor() {
        super();
    }

    public updateGR_OverMsg(msg: Object) {
        this.skinName = "resource/my_skins/GameRoomOver.exml";
        this.gr_msg = <gameroomOver.GameRoomOverMsg>msg;

        //测试代码
        this.gr_msg.paoPos = 0;
        this.gr_msg.winPos = 0;
        for (var i = 0; i < 2; i++) {
            var pl: gameOver.SimplePlayer = new gameOver.SimplePlayer();
            pl.gold = -11;
            pl.palyerIndex = 16138;
            pl.playerName = "社1会生活"
            pl.tablePos = i;
            pl.zhuangCount = 100;
            pl.winCount = 2000;
            pl.mobaoCount = 3000;
            pl.dianpaoCount = 4000;
            pl.baozhongbaoCount = 1;
            this.gr_msg.players[i] = pl;
        }
        //测试代码/

        this.playerNum = this.gr_msg.players.length;
        switch (this.playerNum) {
            case 2:
                this.group_now = this.twoPlayer;
                break;
            case 3:
                this.group_now = this.threePlayer;
                break;
            case 4:
                this.group_now = this.fourPlayer;
                break;
        }
        this.group_now.visible = true;
        this.updateMsg();

    }

    public updateMsg() {
        var playerMsg = this.gr_msg.players;
        for (var i = 0; i < this.group_now.numChildren; i++) {
            var playerGroup = <eui.Group>this.group_now.getChildAt(i);
            var isWinPos = this.w_playerBg(playerGroup, playerMsg[i]);
            //头像 //deng
            (<eui.Label>playerGroup.getChildAt(2)).text = playerMsg[i].playerName;
            (<eui.Label>playerGroup.getChildAt(3)).text = playerMsg[i].palyerIndex + "";
            (<eui.Label>playerGroup.getChildAt(4)).text = playerMsg[i].zhuangCount + "";
            (<eui.Label>playerGroup.getChildAt(5)).text = playerMsg[i].winCount + "";
            (<eui.Label>playerGroup.getChildAt(6)).text = playerMsg[i].dianpaoCount + "";
            (<eui.Label>playerGroup.getChildAt(7)).text = playerMsg[i].mobaoCount + "";
            (<eui.Label>playerGroup.getChildAt(8)).text = playerMsg[i].baozhongbaoCount + "";
            (<eui.Label>playerGroup.getChildAt(9)).text = playerMsg[i].gold + "";

            if (isWinPos) {
                (<eui.Label>playerGroup.getChildAt(2)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(3)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(4)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(5)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(6)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(7)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(8)).textColor = 0xffffff;
                (<eui.Label>playerGroup.getChildAt(9)).textColor = 0xffffff;
            }
        }
    }

    //画玩家背景
    public w_playerBg(pl_group: eui.Group, pl_msg: gameOver.SimplePlayer): boolean {
        var isWinPos = false;
        var isPaoPos = false;
        if (pl_msg.tablePos == this.gr_msg.winPos) {
            isWinPos = true;
        }
        if (pl_msg.tablePos == this.gr_msg.paoPos) {
            isPaoPos = true;
        }

        if (isWinPos) {
            (<eui.Image>pl_group.getChildAt(0)).source =
                RES.getRes(this.playerNum == 2 ? gameroomOver.GameRoomOverConfig.TWO_PLAYER_BG_UI : gameroomOver.GameRoomOverConfig.FOUR_PLAYER_BG_UI);
            let image = new eui.Image();
            image.source = RES.getRes(gameroomOver.GameRoomOverConfig.WIN_UI);
            image.width = 114;
            image.height = 54;
            image.x = pl_group.x - 20;
            image.y = pl_group.y + 10;
            image.rotation = -20;
            this.group_now.addChild(image);
        }
        if (isPaoPos) {
            let image = new eui.Image();
            image.source = RES.getRes(gameroomOver.GameRoomOverConfig.PAO_UI);
            image.width = 65;
            image.height = 73;
            image.x = pl_group.x + pl_group.width - image.width + 20;
            image.y = pl_group.y - 10;
            this.group_now.addChild(image);
        }
        return isWinPos;
    }


}