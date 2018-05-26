// TypeScript file
class Scroll {
    private group: eui.Group;
    private paoMaDengMsg: Array<string> = [];
    private paoMaDengMsg1: Array<string> = [];

    private paomadengMask: eui.Rect = new eui.Rect;
    private paoMaDengTimer: egret.Timer = new egret.Timer(500, 0);
    private paoMaDengRun: egret.Timer = new egret.Timer(20, 0);
    private paoMaDengIsRunning = false;
    private paoMaDengLable: eui.Label = new eui.Label();
    private paoMaDengBg: eui.Image = new eui.Image();
    private paoMaDengTimer1: egret.Timer = new egret.Timer(500, 0);
    private paoMaDengRun1: egret.Timer = new egret.Timer(20, 0);
    private paoMaDengIsRunning1 = false;
    private paoMaDengLable1: eui.Label = new eui.Label();
    private paoMaDengBg1: eui.Image = new eui.Image();




    public constructor(group: eui.Group) {
        this.group = group;
        this.paoMaDengLable1.x = 0;
        //group.width;
        this.paoMaDengLable1.y = 180;
        this.paoMaDengLable1.size = 25;
        this.paomadengMask.width = 400;
        this.paomadengMask.height = 25;
        this.paomadengMask.x = (group.width - this.paomadengMask.width) * 0.5;
        this.paomadengMask.y = 140;
        this.paoMaDengLable.x = this.paomadengMask.width + this.paomadengMask.x;
        this.paoMaDengLable.y = this.paomadengMask.y;
        this.paoMaDengLable.size = 25;

        this.group.addChild(this.paoMaDengBg1);
        this.group.addChild(this.paoMaDengBg);
        this.group.addChild(this.paoMaDengLable1);
        this.group.addChild(this.paomadengMask);
        this.group.addChild(this.paoMaDengLable);

        this.paoMaDengLable.mask = this.paomadengMask;
        this.paoMaDengBg.visible = false;
        this.paoMaDengBg.source = RES.getRes("scrollLampBG_png");
        this.paoMaDengBg.width = this.paomadengMask.width;
        this.paoMaDengBg.height = this.paomadengMask.height+10;
        this.paoMaDengBg.x = this.paomadengMask.x;
        this.paoMaDengBg.y = this.paomadengMask.y-5;

        this.paoMaDengBg1.visible = false;
        this.paoMaDengBg1.source = RES.getRes("scrollLampBG_png");
        this.paoMaDengBg1.width = this.group.width;
        this.paoMaDengBg1.height = this.paomadengMask.height+10;
        this.paoMaDengBg1.x = 0;
        this.paoMaDengBg1.y = this.paoMaDengLable1.y-5;


        this.paoMaDengTimerListen();
        this.paoMaDengTimerListen1();
    }

    /** * //跑马灯  */
    public pushpaoMaDengMsg(scr: ScrollMsg) {
        if (scr.type == 0) {
            for (var i = 0; i < scr.loopNum; i++) {
                this.paoMaDengMsg.push(scr.msg);
            }
        } else {
            for (var i = 0; i < scr.loopNum; i++) {
                this.paoMaDengMsg1.push(scr.msg);
            }
        }
    }

    private paoMaDengTimerListen() {
        this.paoMaDengTimer.addEventListener(egret.TimerEvent.TIMER, this.updatePaoMaDeng, this);
        this.paoMaDengTimer.start();
        this.paoMaDengRun.addEventListener(egret.TimerEvent.TIMER, this.paoMaDengMove, this);
    }
    private updatePaoMaDeng() {
        if (!this.paoMaDengIsRunning && this.paoMaDengMsg.length > 0) {
            this.paoMaDengIsRunning = true;
            this.paoMaDengLable.text = this.paoMaDengMsg.shift();
            this.paoMaDengBg.visible = true;
            this.paoMaDengStart();
        }
    }

    //
    private paoMaDengStart() {
        this.paoMaDengRun.start();
    }

    //
    private paoMaDengMove() {
        this.paoMaDengLable.x -= 2;
        if (this.paoMaDengLable.textWidth + this.paoMaDengLable.x < this.paomadengMask.x) {
            this.paoMaDengIsRunning = false;
            this.paoMaDengLable.x = this.paomadengMask.width + this.paomadengMask.x;
            this.paoMaDengLable.text = "";
            this.paoMaDengRun.stop();
            this.paoMaDengBg.visible = false;
        }

    }




    /** * //跑马灯 全屏（常用的） */

    private paoMaDengTimerListen1() {
        this.paoMaDengTimer1.addEventListener(egret.TimerEvent.TIMER, this.updatePaoMaDeng1, this);
        this.paoMaDengTimer1.start();
        this.paoMaDengRun1.addEventListener(egret.TimerEvent.TIMER, this.paoMaDengMove1, this);
    }
    private updatePaoMaDeng1() {
        if (!this.paoMaDengIsRunning1 && this.paoMaDengMsg1.length > 0) {
            this.paoMaDengIsRunning1 = true;
            this.paoMaDengLable1.text = this.paoMaDengMsg1.shift();
            this.paoMaDengLable1.x = this.group.width;
            this.paoMaDengBg1.visible = true;
            this.paoMaDengStart1();
        }
    }

    //
    private paoMaDengStart1() {
        this.paoMaDengRun1.start();
    }

    //
    private paoMaDengMove1() {
        this.paoMaDengLable1.x -= 2;
        if (this.paoMaDengLable1.textWidth + this.paoMaDengLable1.x < 0) {
            this.paoMaDengIsRunning1 = false;
            this.paoMaDengLable1.x = this.group.width;
            this.paoMaDengLable1.text = "";
            this.paoMaDengBg1.visible = false;
            this.paoMaDengRun1.stop();
        }
    }
}

class ScrollMsg {
    public msg: string;
    public loopNum: number;
    public removeAllPreviousMsg: number;
    public msgType: number;
    public hasUrl: number;
    public Url: string;
    public type: number
    public constructor(msg, type) {
        this.msg = msg.msg;
        this.loopNum = msg.loopNum;
        this.removeAllPreviousMsg = msg.removeAllPreviousMsg;
        this.msgType = msg.msgType;
        this.hasUrl = msg.hasUrl;
        this.Url = msg.Url;
        this.type = type;
    }
}