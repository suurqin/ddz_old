// TypeScript file
class GameSetting extends eui.Component {
    public BGM: eui.Group;
    public gameMusic: eui.Group;
    public musicType: eui.Group;
    public buttonGroup: eui.Button;
    public tableId: number;
    public settingCloseBtn: eui.Button;



    public constructor(lll, type: number, tableId: number) {
        super();
        this.skinName = "resource/my_skins/Setting.exml";
        this.name = "Setting";
        this.tableId = tableId;
        lll.addChild(this);
        sceneMgr.runScene.addLayer(this, 6);
        var BGM_num: string = egret.localStorage.getItem("BGM_num");
        var GameMusic_num: string = egret.localStorage.getItem("GameMusic_num");
        var MusicType_num: string = egret.localStorage.getItem("MusicType_num");
        this.update(this.BGM, BGM_num == null ? 100 : parseInt(BGM_num));
        this.update(this.gameMusic, GameMusic_num == null ? 100 : parseInt(GameMusic_num));
        this.updateType(MusicType_num == null ? 0 : parseInt(MusicType_num));
        this.BGM.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toutchBegin, this);
        this.BGM.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toutchMove, this);
        this.gameMusic.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.toutchBegin, this);
        this.gameMusic.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.toutchMove, this);
        for (var i = 0; i < this.musicType.numChildren; i++) {
            this.musicType.getChildAt(i).addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.typeToutchBegin, this);
        }
        this.showButtonByType(type, tableId);
        this.settingCloseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exit, this);
    }
    //关闭
    public exit() {
        sceneMgr.runScene.removeChildByTag(6);
    }

    //根据当前的场景 显示不同的按钮
    public showButtonByType(type: number, tableId: number) {
        if (type == 0) {
            this.buttonGroup.getChildAt(0).visible = true;
            this.buttonGroup.getChildAt(0).addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeAccount, this);
        } else if (type == 1) {
            if (tableId > 0) {
                this.buttonGroup.getChildAt(1).visible = true;
                this.buttonGroup.getChildAt(1).addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeVipRoom, this);
            } else {
                this.buttonGroup.getChildAt(2).visible = true;
                this.buttonGroup.getChildAt(2).addEventListener(egret.TouchEvent.TOUCH_TAP, this.getBack, this);
            }
        }
    }

    public typeToutchBegin(event) {
        let group = <eui.Group>event.currentTarget;
        for (var i = 0; i < this.musicType.numChildren; i++) {
            if (group == this.musicType.getChildAt(i)) {
                this.updatemusicType(i);
                egret.localStorage.setItem("MusicType_num", i + "");
                break;
            }

        }

    }


    public toutchBegin(event) {
        let group = <eui.Group>event.currentTarget;
        var x = event.stageX - group.x - group.getChildAt(0).x;
        this.update(group, x / group.getChildAt(0).width * 100);
    }
    public toutchMove(event) {
        let group = <eui.Group>event.currentTarget;
        var x = event.stageX - group.x - group.getChildAt(0).x;
        this.update(group, x / group.getChildAt(0).width * 100);
    }



    //更新背景条
    public update(group: eui.Group, num: number) {
        if (num > 100) {
            num = 100;
        }
        if (num < 0) {
            num = 0;
        }
        let width = group.getChildAt(0).width;
        group.getChildAt(1)
        group.getChildAt(1).width = group.getChildAt(0).width * num * 0.01;
        group.getChildAt(2).x = group.getChildAt(1).width - (group.getChildAt(2).width * 0.5) + group.getChildAt(0).x;
        if (group.name == "BGM" && playMusic.Soundeffect.getInstance().chanellBGM != null) {
            // playMusic.Soundeffect.getInstance().chanellBGM.volume = num * 0.01;
            egret.localStorage.setItem("BGM_num", num + "");
            playMusic.Soundeffect.getInstance().setVolumeBG(num * 0.01);
        }
        if (group.name == "gameMusic" && playMusic.Soundeffect.getInstance().chanellEFM != null) {
            // playMusic.Soundeffect.getInstance().chanellBGM.volume = num * 0.01;
            egret.localStorage.setItem("GameMusic_num", num + "");
            playMusic.Soundeffect.getInstance().setVolumeEF(num * 0.01);
        }
    }

    //游戏音乐type
    public updatemusicType(num: number) {
        if ((<eui.Group>this.musicType.getChildAt(num)).getChildAt(0).visible) {
            return;
        }
        for (var i = 0; i < this.musicType.numChildren; i++) {
            if (i == num) {
                (<eui.Group>this.musicType.getChildAt(i)).getChildAt(0).visible = true;
                if (playMusic.Soundeffect.getInstance().chanellBGM != null) {
                    switch (i) {
                        case 0:
                            playMusic.Soundeffect.getInstance().playBGM("bg_music0_mp3");
                            break;
                        case 1:
                            playMusic.Soundeffect.getInstance().playBGM("bg_music1_mp3");
                            break;
                        case 2:
                            playMusic.Soundeffect.getInstance().playBGM("bg_music2_mp3");
                            break;
                    }
                }

            } else {
                (<eui.Group>this.musicType.getChildAt(i)).getChildAt(0).visible = false;
            }
        }
    }

    public updateType(num: number) {
        for (var i = 0; i < this.musicType.numChildren; i++) {
            if (i == num) {
                (<eui.Group>this.musicType.getChildAt(i)).getChildAt(0).visible = true;
            } else {
                (<eui.Group>this.musicType.getChildAt(i)).getChildAt(0).visible = false;
            }
        }
    }


    //切换账号
    public changeAccount() {
        //显示登录页面
        //关闭游戏全部socket
        //清空保存的帐号等游戏记录
    }
    //返回大厅
    public getBack() {
        //发送离开桌子
        //     PlayerGameOpertaionMsg msg;
        // msg.opertaionID=GAME_OPERTAION_PLAYER_LEFT_TABLE;
        // appGetConnection()->sendMsg(&msg);
        //显示大厅
        //清空等待和游戏页面
    }
    //解散房间
    public closeVipRoom() {
        //     PlayerSetMsg Msg;
        // Msg.opertaion_id = GAME_OPERATION_PLAYER_APPLY_CLOSE_VIP_ROOM;
        // Msg.iTableID = m_iTableID;
        // Msg.iPlayerIndex = m_iPIndex;
        // Msg.agree = true;
        // appGetConnection()->sendMsg(&Msg);
        // this->removeFromParent();
    }

    //同意
    //  PlayerSetMsg msg;
    // msg.opertaion_id = GAME_OPERATION_CLOSE_VIP_ROOM_FEEDBACK;
    // msg.iTableID = m_vipTableID;
    // msg.agree = 1;
    // appGetConnection()->sendMsg(&msg);

    //不同意
    // PlayerSetMsg msg;
    // msg.opertaion_id = GAME_OPERATION_CLOSE_VIP_ROOM_FEEDBACK;
    // msg.iTableID = m_vipTableID;
    // msg.agree = 0;
    // appGetConnection()->sendMsg(&msg);

}