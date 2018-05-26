// TypeScript file
class LoadingPro extends eui.Component {

    public LoadingBg: eui.Image          //背景图片
    public ProgressLine: eui.ProgressBar //进度条

    public constructor() {
        super();

        /********************背景图片**********************/
        this.LoadingBg = new eui.Image(RES.getRes("loadingbk1_png"));
        this.addChild(this.LoadingBg);
        /*************进度条*************/
        this.ProgressLine = new eui.ProgressBar();
        this.ProgressLine.skinName = "resource/my_skins/MyProgressSkin.exml";
        this.ProgressLine.maximum = 100;
        this.ProgressLine.minimum = 0;
        this.ProgressLine.x = 205;
        this.ProgressLine.y = 372;
        this.ProgressLine.width = 390;
        this.ProgressLine.height = 69;
        this.ProgressLine.value = 0;
        this.addChild(this.ProgressLine);
        var timer: egret.Timer = new egret.Timer(10, 100);
        timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandler, this);
        timer.start();
    }

    public timerHandler() {
        this.ProgressLine.value += 1;
        if (this.ProgressLine.value >= 100) {
             this.ProgressLine.value = 100;
             runScene.Director.getInstance().LoadingProHide();
             }
    }

}

class Loading extends eui.Component {
    public mc1:egret.MovieClip = null;
    public allMask : egret.Shape = null;
    public aaa : number = 100;
    //public bg : eui.Image = null;
    public constructor() {
        super();
        //this.bg = new eui.Image(RES.getRes("loadingbk1_png"));
        //this.addChild(this.bg);
        
        this.allMask = new egret.Shape();
        this.allMask.graphics.beginFill(0x000000, 0.7);
        this.allMask.graphics.drawRect(0, 0, runScene.mainLayer.width, runScene.mainLayer.height);
        this.allMask.graphics.endFill();
        this.allMask.y = 0;
        this.addChild(this.allMask);

        var data = RES.getRes("loading_json");
        var txtr = RES.getRes("loading_png");
        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        this.mc1 = new egret.MovieClip(mcFactory.generateMovieClipData("loading"));
        this.mc1.x = 350;
        this.mc1.y = 190;
        this.addChild(this.mc1);
        this.mc1.play(-1);
    }

}