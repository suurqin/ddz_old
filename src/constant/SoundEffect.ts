// TypeScript file
namespace playMusic {

    export const EFFECT_ZHA = "anim_zhadan_mp3";
    export const EFFECT_CONFIRM_FILE = "confirm_mp3";       //弹窗
    export const EFFECT_OUT_CARD = "OUT_CARD_mp3";          //出牌
    export const EFFECT_ZHIDUI = "zhidui_mp3";              //支对
    export const EFFECT_BAOZHONGBAO = "baozhongbao_mp3";    //宝中宝
    export const EFFECT_DAFENG = "dafeng_mp3";              //大风
    export const EFFECT_HONGZHONG = "hongzhong_mp3";
    export const EFFECT_MOBAOHU = "mobaohu_mp3";
    export const EFFECT_PINGHU = "pinghu_mp3";
    export const EFFECT_LIANZHUANG = "lianzhuang_mp3";
    export const EFFECT_BG_MUSIC_0 = "bg_music0_mp3";
    export const EFFECT_BG_MUSIC_1 = "bg_music1_mp3";
    export const EFFECT_BG_MUSIC_2 = "bg_music2_mp3";
    export const EFFECT_CLICK_FILE = "Button32_mp3";
    export const EFFECT_BALANCE_WIN = "win_mp3";
    export const EFFECT_BALANCE_LOST = "lost_mp3";
    // export const EFFECT_UPLINE = "Upline_mp3";
    // export const EFFECT_NEW_MSG = "ReceiveMsg_mp3";
    export const EFFECT_CARD_CLICK = "card_click_mp3";
    // export const EFFECT_PENG = "effect_peng_mp3";
    export const EFFECT_ZIMO = "effect_zimo_mp3";
    // export const EFFECT_FANGPAO = "effect_fangpao_mp3";
    export const EFFECT_WARRING = "effect_warning_mp3";
    export const EFFECT_LEVELUP = "effect_levelup_mp3";
    export const EFFECT_ROULETTE = "hall_roulette_do_mp3";

    export class Soundeffect extends egret.DisplayObjectContainer {

        public BGMusic: egret.Sound = null              //背景音乐
        public chanellBGM: egret.SoundChannel = null;   //背景音乐播放器
        public EFMusic: egret.Sound = null              //音效
        public chanellEFM: egret.SoundChannel = null;   //音效播放器
        public volumeBG: number;                        //背景音乐音量
        public volumeEF: number;                        //音效音量
        public static play: Soundeffect = null;
        public constructor() {
            super();
            this.volumeBG = 1;
            this.volumeEF = 1;
        }

        public static getInstance() {
            if (Soundeffect.play == null) {
                Soundeffect.play = new Soundeffect();
            }
            return Soundeffect.play;
        }

        //播放背景音乐参数为资源ID
        public playBGM(str: string) {
            this.StopBGM();
            RES.getResAsync(str, this.loadmusicBGM, this);
        }


        //播放音效音乐参数为资源ID
        public playSoundEffect(str: string) {
            // this.stopEFM();
            RES.getResAsync(str, this.loadmusicEFM, this);
        }

        //停止播放当前背景音乐
        public StopBGM() {
            if (this.chanellBGM != null) {
                this.chanellBGM.stop();
            }
        }
        //停止播放当前音效
        public stopEFM() {
            if (this.chanellEFM != null) {
                this.chanellEFM.stop();
            }
        }

        //异步加载音乐回调函数
        private loadmusicBGM(data: egret.Sound, str: string) {
            //this.BGMusic=RES.
            this.BGMusic = data;
            if (this.BGMusic == null) {
                console.log(" BGM load error ");
                return;
            }
            this.chanellBGM = this.BGMusic.play(-1);
            this.chanellBGM.volume = this.volumeBG;

        }

        //异步加载音效回调函数
        private loadmusicEFM(data: egret.Sound, str: string) {
            this.EFMusic = data;
            if (this.EFMusic == null) {
                console.log(" EFM load error ");
                return;
            }
            this.chanellEFM = this.EFMusic.play(0, 1);
            this.chanellEFM.volume = this.volumeEF;
            this.EFMusic = null;
        }

        public getCardEffect(value, sex) {
            let str: string = null;
            let cd = value & 0xf;
            let type = (value >> 4) & 0x3;
            if (value == 0x80) {
                if (sex == 1) {//男
                    str = cd + "zhong2_mp3";
                }
                else {
                    str = cd + "zhong_mp3";
                }
            }
            else {
                switch (type) {
                    case 0://万
                        if (sex == 1)
                            str = cd + "wan2_mp3";
                        else {
                            str = cd + "wan_mp3";
                        }
                        break;
                    case 1://条
                        if (sex == 1)
                            str = cd + "tiao2_mp3";
                        else {
                            str = cd + "tiao_mp3";
                        }
                        break;
                    case 2://同
                        if (sex == 1)
                            str = cd + "tong2_mp3";
                        else {
                            str = cd + "tong_mp3";
                        }
                        break;
                }
            }
            this.playSoundEffect(str);
        }
        //背景音乐音量
        public setVolumeBG(num: number) {

            this.volumeBG = num;
            if (this.BGMusic == null) {
                console.log(" BGM load error ");
                return;
            }
            // this.chanellBGM = this.BGMusic.play(-1);
            this.chanellBGM.volume = this.volumeBG;

        }
        //音效音量
        public setVolumeEF(num: number) {

            this.volumeEF = num;
            if (this.EFMusic == null) {
                console.log(" EFM load error ");
                return;
            }
            this.chanellEFM = this.EFMusic.play(0, 1);
            this.chanellEFM.volume = this.volumeEF;
        }

        //操作和胡牌音效
        public operateEffect(type, sex) {
            let op = Constant.operateType;
            let str: string = null;
            let str1: string = null;
            if (sex == 1) {
                str1 = "2_mp3";
            }
            else {
                str1 = "_mp3";
            }
            switch (type) {
                case op.OPERATION_CHI:
                    str = "chi" + this.getPlayIndex(3) + str1;
                    break;
                case op.OPERATION_PENG:
                    str = "cha" + this.getPlayIndex(3) + str1;
                    break;
                case op.OPERATION_TING:
                    str = "ting" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_CTING:
                    str = "chiting" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_PTING:
                    str = "chating" + this.getPlayIndex(3) + str1;
                    break;
                case op.OPERATION_HU:
                    str = "hu" + this.getPlayIndex(5) + str1;
                    break;
                case op.OPERATION_ZHIMO:
                    str = "zimo" + this.getPlayIndex(3) + str1;
                    break;
                case op.OPERATION_JIAHU:
                    str = "jiahu" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_LOUJIA:
                    str = "zimojia" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_MOBAOHU:
                    str = "mobaohu" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_PIAOHU:
                    str = "piaohu" + this.getPlayIndex(2) + str1;
                    break;
                case op.OPERATION_BAOZBAO:
                    str = "baozhongbao" + this.getPlayIndex(3) + str1;
                    break;
                case op.OPERATION_QINGYISE:
                    str = "qingyise1" + str1;
                    break;
                case op.OPERATION_QIXIAODUI:
                    str = "qixiaodui" + str1;
                    break;
                case op.OPERATION_DAFENG:
                    str = "dafeng" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_ZHONG:
                    str = "hongzhong" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_LOU:
                    str = "loule" + this.getPlayIndex(4) + str1;
                    break;
                case op.OPERATION_HUANBAO:
                    str = "huanbao" + this.getPlayIndex(2) + str1;
                    break;
                case op.OPERATION_ZHIDUI:
                    str = "duiting" + str1;
                    break;
                case op.OPERATION_GANG:
                    str = "gang" + this.getPlayIndex(3) + str1;
                    break;
                case op.OPERATION_CHAKAI:
                    str = "chakai" + str1;
                    break;
                case op.OPERATION_PAO2:
                    str = "pao2" + str1;
                    break;
                case op.OPERATION_PAO5:
                    str = "pao5" + str1;
                    break;
            }

            this.playSoundEffect(str);
        }

        public getPlayIndex(index) {
            return Math.floor(Math.random() * index) + 1;
        }

    }
}
