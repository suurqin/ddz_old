// TypeScript file
// TypeScript file
class WaitMJTableLayer extends eui.Component {


    private roomID: eui.Label                       //房间ID
    private waitGroup: eui.Group;                   //等待界面组
    private wOpPlayer: eui.Group;                   //等待中的对家
    private wDnPlayer: eui.Group;                   //等待中的上家
    private wUpPlayer: eui.Group;                   //等待中的自己
    private wMyPlayer: eui.Group;                   //等待中的下家    
    private dislutionRoomBtn: eui.Button;           //解散房间按钮
    private inviteBtn: eui.Button;                  //邀请按钮
    private waitPlayerGroups: Array<eui.Group>;
    private playerInWaitTable: Array<number>;
    private roomType: number;                       //房间类型
    private currentOperation: number = null;
    private waitRmBackBtn: eui.Button;               //返回按钮
    private waitRmVoiceBtn: eui.Button;              //语音聊天
    private waitRmChatBtn: eui.Button;               //聊天
    private isVipTable: boolean = true;



    public constructor() {
        super();
        this.skinName = "resource/my_skins/WaitingRoom.exml";


        this.playerInWaitTable = new Array<number>();
        this.waitPlayerGroups = [this.wOpPlayer, this.wUpPlayer,
        this.wDnPlayer, this.wMyPlayer];
        this.dislutionRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.dislutionRoom, this);
        this.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.invitePlayer, this);
        this.waitRmBackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);              //返回按钮
        this.waitRmVoiceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.voiceChat, this);           //语音
        this.waitRmChatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.normalchat, this);              //聊天
    }


    /*桌子上的数据----------------------------------------------------->*/
    public addWaitTablePlayer(msg) {


        this.roomType = msg.roomType;
        if (msg == null) return;
        //VIP房  
        if (msg.vipTableID > 0) {
            //房主名字，房间号，邀请和解散房间
            this.updateTableMsg(msg);
            if (this.roomType == Constant.gameRoomType.ROOM_TYPE_COUPLE) {
                this.wUpPlayer.visible = false;
                this.wDnPlayer.visible = false;
            }
            if (this.roomType == Constant.gameRoomType.ROOM_TYPE_THREE) {

                this.wUpPlayer.visible = false;
            }

            if (msg.creatorName == manager.global.mPlayer.playerName) {
                this.inviteBtn.visible = true;
                this.dislutionRoomBtn.visible = true;
            }

            let player = msg.players;
            for (let i in player) {
                let id = player[i].playerID;
                if (!this.isInTable(id)) continue;//有人了就不刷新了
                this.initTableInfo(player[i]);
            }


        } else {
            this.isVipTable = false;
        }





        // optional int32 result = 1;
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

        /*
        message SimplePlayer{
        optional string playerID = 1;
        optional string playerName = 2;
        optional int32 headImg = 3;
        optional int32 sex = 4;
        optional int32 palyerIndex = 5;
        optional int32 gold = 6;
        optional int32 tablePos = 7;
        optional string desc = 8;
        optional int32 fan = 9;
        optional int32 gameResult = 10;
        optional int32 canFriend = 11;
        optional int32 inTable = 12;
        optional int32 zhuangCount = 13;
        optional int32 winCount = 14;
        optional int32 dianpaoCount = 15;
        optional int32 mobaoCount = 16;
        optional int32 baozhongbaoCount = 17;
        optional string ip = 18;
        optional string headIconUrl = 19;
        optional int32 redPacketCount = 20;
        optional int32 redPacketMoney = 21;
}
        */




    }



    //当前座位是否有人
    public isInTable(id) {
        let isAdd = true;
        for (let i in this.playerInWaitTable) {
            if (id == this.playerInWaitTable[i]) {
                isAdd = false;
                break;
            }
        }
        if (isAdd) this.playerInWaitTable.push(id);
        return isAdd;
    }

    //头像等信息
    public initTableInfo(info: manager.SimplePlayer) {
        let group: eui.Group = this.waitPlayerGroups[gmConvert.getPosition.getPos(info.tablePos, this.playerInWaitTable.length)];
        group.visible = true;


        (<eui.Label>group.getChildAt(4)).text = info.palyerIndex + "";
        (<eui.Label>group.getChildAt(5)).text = info.gold + "";
    }

    //解散房间
    public dislutionRoom() {

        let Tips = new TipsModule();
        Tips.tipsBtnGroup.visible = true;
        Tips.tipsEnsureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
            let msg = {};
            msg["opertaionID"] = 1034;
            msg["opValue"] = this.roomID;
            msg["msgCMD"] = Constant.MSG_GAME_GAME_OPERTAION; 
            gameHdl.GameMjHdl.sendData(msg);
           
        }
        ,this);
         Tips.tipsUndoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,() => {
           Tips.closeTips();
        }
        ,this);
        this.addChild(Tips);
    }

    //邀请好友
    public invitePlayer() {
        console.log("");
    }

    //返回大厅
    public backToLobby() {
        console.log("back to lobby");
        let PlayerGameOpertaionMsg = {};
        PlayerGameOpertaionMsg["opertaionID"] = 1005;//离开桌子
        PlayerGameOpertaionMsg["msgCMD"] = Constant.MSG_GAME_PLAYER_TABLE_OPERATION;
        gameHdl.GameMjHdl.sendData(PlayerGameOpertaionMsg);
        sceneMgr.GameScene.getInstance().loadScene(sceneMgr.TAG_LOBBY_SCENE);


    }


    //语音聊天
    public voiceChat() {
        console.log("");
    }

    //聊天
    public normalchat() {
        console.log("");

    }

    public updateTableMsg(msg) {
        if (this.isVipTable) {

            this.roomID.text = msg.vipTableID + "号房间";
        }
    }

}