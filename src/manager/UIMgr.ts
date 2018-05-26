namespace manager {
	export class UIMgr {
		public constructor() {
		}
		//手牌
		public getHandCardImage(pos, num): HandCardRender {
			let card = new HandCardRender(pos, num);
			return card;
		}
		//吃碰牌
		public getDownCardImage(pos, num, pc) {
			let card = new PengCardRender(pos, num, pc);
			return card;
		}
		//打出去的牌
		public getTableCardImage(pos, num): SendCardRender {
			let card = new SendCardRender(pos, num);
			return card;
		}

		public getBFPengCardGroup(pos, num, type): BFPengCardGroup {
			let operation = new BFPengCardGroup(pos, num, type);
			return operation;
		}
		public getRLPengCardGroup(pos, num, type): RLPengCardGroup {
			let operation = new RLPengCardGroup(pos, num, type);
			return operation;
		}
	}


	//手牌单张麻将 构造函数pos为方位 num为牌上的字
	export class HandCardRender extends eui.ItemRenderer {

		public cardbg: eui.Image;       //牌背面
		public cardfront: eui.Image;    //牌正面
		public pos: number;				//牌的方位
		public num: number;				//牌的面值
		public isSelect: boolean;
		public isMoving: boolean;
		constructor(pos: number, num: number) {
			super();
			this.pos = pos;
			this.num = num;
			this.isSelect = false;
			this.isMoving = false;
			if (pos == Constant.position.EPT_OPPISITE) {
				this.skinName = "resource/my_skins/BFCardskin.exml";
				this.cardbg.source = RES.getRes("mjback_png");
				this.scaleX = 0.45;
				this.scaleY = 0.45;
			}
			else if (pos == Constant.position.EPT_UP) {
				this.skinName = "resource/my_skins/RLMJHandCard.exml";
				this.cardbg.skewY = 180;
				this.scaleX = 0.53;
				this.scaleY = 0.53;
			}
			else if (pos == Constant.position.EPT_DOWN) {
				this.skinName = "resource/my_skins/RLMJHandCard.exml";
				this.scaleX = 0.53;
				this.scaleY = 0.53;
			}
			else if (pos == Constant.position.EPT_MYSELF) {
				this.skinName = "resource/my_skins/BFCardskin.exml";
				var str = "mjCard_json." + num;
				this.cardfront.source = RES.getRes(str);
			}
			else if (pos == Constant.position.ERROR) {
				console.log("HandCardRender  ERROR ");

			}

		}


	}

	//出牌单张麻将 构造函数pos为方位 num为牌上的字
	export class SendCardRender extends eui.ItemRenderer {

		public cardbg: eui.Image;       //牌背面
		public cardfront: eui.Image;    //牌正面
		public pos: number;				//牌的方位
		public num: number;				//牌的面值
		constructor(pos: number, num: number) {
			super();
			this.pos = pos;
			this.num = num;

			if (pos == Constant.position.EPT_OPPISITE || pos == Constant.position.EPT_MYSELF) {
				this.skinName = "resource/my_skins/BFCardskin.exml";
				this.cardbg.source = RES.getRes("sendcard1_png");
				this.cardfront.top = 0;

			}
			else if (pos == Constant.position.EPT_UP) {

				this.skinName = "resource/eui_skins/RLMJCard.exml";
				this.cardfront.rotation = 90;

			}
			else if (pos == Constant.position.EPT_DOWN) {
				this.skinName = "resource/eui_skins/RLMJCard.exml";
				this.cardfront.rotation = 270;
			}
			else if (pos == Constant.position.ERROR) {
				console.log("SendCardRender  ERROR");

			}
			var str = "mjCard_json." + num;
			console.log(str);

			this.cardfront.source = RES.getRes(str);
		}

	}
	//吃碰杠单张麻将 构造函数pos为方位 num为牌上的字，pc为是否翻面
	export class PengCardRender extends eui.ItemRenderer {

		public cardbg: eui.Image;       //牌背面
		public cardfront: eui.Image;    //牌正面
		public pos: number;				//牌的方位
		public num: number;				//牌的面值
		public pc: number;				//暗杠标志 //1为明，2为暗
		constructor(pos: number, num: number, pc: number) {
			super();
			this.pos = pos;
			this.num = num;
			this.pc = pc;
			if (pos == 0 || pos == 3) {
				this.skinName = "resource/eui_skins/BFMJCard.exml";
				if (pc == 1) {
					this.cardbg.source = RES.getRes("sendcard1_png");
					this.cardfront.top = 0;
				}
				else if (pc == 2) {
					this.cardbg.source = RES.getRes("bfpeng_png");
					this.cardfront.visible = false;
					return;
				}


			}
			else if (pos == 1 || pos == 2) {
				this.skinName = "resource/eui_skins/RLMJCard.exml";
				if (pc == 1) {
					this.cardbg.source = RES.getRes("sendcard1_png");
					if (pos == 1) {
						this.cardfront.rotation = 90;
					}
					else if (pos == 2) {
						this.cardfront.rotation = 270;
					}
				}
				else if (pc == 2) {
					this.cardbg.source = RES.getRes("rlpeng_png");
					this.cardfront.visible = false;
				}
			}

			let str = "mjCard_json." + num;
			console.log(str);
			this.cardfront.source = RES.getRes(str);
		}

	}

}

//对家和自己碰杠组件
class BFPengCardGroup extends eui.Component implements eui.UIComponent {

	public MJCard1: BFMJCard;     //
	public MJCard2: BFMJCard;     //
	public MJCard3: BFMJCard;     //
	public MJCard4: BFMJCard;     // 顶上的牌
	public constructor(pos: number, num: number, type: number) {
		super();
		this.skinName = "resource/eui_skins/BFPengCardGroup.exml";
		let pc = 1;
		let value = num % 16;
		switch (type) {
			case Constant.PlayerOperationType.OP_CHI://吃
				if (value > 1 && value < 9) {
					if (pos != 1) {
						this.changeImg(this.MJCard1, pos, num - 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num + 1, pc);
					} else {
						this.changeImg(this.MJCard1, pos, num + 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num - 1, pc);
					}
				} else if (value == 1) {
					if (pos != 1) {
						this.changeImg(this.MJCard1, pos, num + 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num + 2, pc);
					} else {
						this.changeImg(this.MJCard1, pos, num + 2, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num + 1, pc);
					}
				} else {
					if (pos != 1) {
						this.changeImg(this.MJCard1, pos, num - 2, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num - 1, pc);
					} else {
						this.changeImg(this.MJCard1, pos, num - 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num - 2, pc);
					}
				}
				this.MJCard4.visible = false;
				break;
			case Constant.PlayerOperationType.OP_PENG://碰
			case Constant.PlayerOperationType.OP_GANG://明杠
				this.changeImg(this.MJCard1, pos, num, pc);
				this.changeImg(this.MJCard2, pos, num, pc);
				this.changeImg(this.MJCard3, pos, num, pc);
				this.changeImg(this.MJCard4, pos, num, pc);
				if (type == Constant.PlayerOperationType.OP_PENG)
					this.MJCard4.visible = false;
				break;
			case Constant.PlayerOperationType.OP_ANGANG://暗杠
				pc = 2;
				this.changeImg(this.MJCard1, pos, num, pc);
				this.changeImg(this.MJCard2, pos, num, pc);
				this.changeImg(this.MJCard3, pos, num, pc);
				if (pos == 3)
					pc = 1;
				this.changeImg(this.MJCard4, pos, num, pc);
				break;
		}
	}

	public changeImg(MJCard: BFMJCard, pos: number, num: number, pc: number) {
		if (pos == 0 || pos == 3) {
			if (pc == 1) {
				MJCard.cardbg.source = RES.getRes("sendcard1_png");
				MJCard.cardfront.top = 0;
			}
			else if (pc == 2) {
				MJCard.cardbg.source = RES.getRes("bfpeng_png");
				MJCard.cardfront.visible = false;
				return;
			}
		}
		if (num != undefined) {
			let str = "mjCard_json." + num;
			console.log(str);
			MJCard.cardfront.source = RES.getRes(str);
		}
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}


//上家下家碰杠组件
class RLPengCardGroup extends eui.Component implements eui.UIComponent {

	public MJCard1: RLMJCard;     //
	public MJCard2: RLMJCard;     //
	public MJCard3: RLMJCard;     //
	public MJCard4: RLMJCard;     // 顶上的牌
	public constructor(pos: number, num: number, type: number) {
		super();
		this.skinName = "resource/eui_skins/RLPengCardGroup.exml";
		let pc = 1;
		let value = num % 16;
		switch (type) {
			case Constant.PlayerOperationType.OP_CHI://吃
				if (value > 1 && value < 9) {
					if (pos != 1) {
						this.changeImg(this.MJCard1, pos, num - 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num + 1, pc);
					} else {
						this.changeImg(this.MJCard1, pos, num + 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num - 1, pc);
					}
				} else if (value == 1) {
					if (pos != 1) {
						this.changeImg(this.MJCard1, pos, num + 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num + 2, pc);
					} else {
						this.changeImg(this.MJCard1, pos, num + 2, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num + 1, pc);
					}
				} else {
					if (pos != 1) {
						this.changeImg(this.MJCard1, pos, num - 2, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num - 1, pc);
					} else {
						this.changeImg(this.MJCard1, pos, num - 1, pc);
						this.changeImg(this.MJCard2, pos, num, pc);
						this.changeImg(this.MJCard3, pos, num - 2, pc);
					}
				}
				this.MJCard4.visible = false;
				break;
			case Constant.PlayerOperationType.OP_PENG://碰
			case Constant.PlayerOperationType.OP_GANG://明杠
				this.changeImg(this.MJCard1, pos, num, pc);
				this.changeImg(this.MJCard2, pos, num, pc);
				this.changeImg(this.MJCard3, pos, num, pc);
				this.changeImg(this.MJCard4, pos, num, pc);
				if (type == Constant.PlayerOperationType.OP_PENG)
					this.MJCard4.visible = false;
				break;
			case Constant.PlayerOperationType.OP_ANGANG://暗杠
				pc = 2;
				this.changeImg(this.MJCard1, pos, num, pc);
				this.changeImg(this.MJCard4, pos, num, pc);
				this.changeImg(this.MJCard3, pos, num, pc);
				this.changeImg(this.MJCard2, pos, num, pc);
				break;
		}
	}
	public changeImg(MJCard: RLMJCard, pos: number, num: number, pc: number) {
		if (pos == 1 || pos == 2) {
			if (pc == 1) {
				MJCard.cardbg.source = RES.getRes("sendcard1_png");
				if (pos == 1) {
					MJCard.cardfront.rotation = 90;
				}
				else if (pos == 2) {
					MJCard.cardfront.rotation = 270;
				}
			}
			else if (pc == 2) {
				MJCard.cardbg.source = RES.getRes("rlpeng_png");
				MJCard.cardfront.visible = false;
			}
		}
		if (num != undefined) {
			let str = "mjCard_json." + num;
			console.log(str);
			MJCard.cardfront.source = RES.getRes(str);
		}
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}
//对家和自己吃碰单张组件
class BFMJCard extends eui.Component implements eui.UIComponent {
	public cardbg: eui.Image;               //背景
	public cardfront: eui.Image;            //字
	constructor(pos: number, num: number, pc: number) {
		super();
		this.skinName = "resource/eui_skins/BFMJCard.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

}

//上家和下家吃碰单张组件
class RLMJCard extends eui.Component implements eui.UIComponent {
	public cardbg: eui.Image;               //背景
	public cardfront: eui.Image;            //字
	public constructor(pos: number, num: number, pc: number) {
		super();
		this.skinName = "resource/eui_skins/RLMJCard.exml";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}
}

//聊天气泡组件
class MJBubble extends eui.Component implements eui.UIComponent {

	private msgBubblebg: eui.Image; 			//气泡背景
	private msgText: eui.Label; 				//标签

	public constructor() {
		super();
		this.skinName = "resource/eui_skins/MJBubble.exml"

	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}


	public bubbleBgShape(img: any) {
		if (RES.getRes(img)) {
			this.msgBubblebg.source = RES.getRes(img);

		}
		return;
	}


	public setMsgText(str: string) {

		// let LblNum = str.length;   //Label内容长度
		// let RowNum = 20;           //每行显示的字数

		this.msgText.text = "" + str;
		// let FontWidth = this.msgText.textWidth / LblNum;    //每个字符的宽度  
		// this.msgText.width = FontWidth * RowNum < this.msgText.textWidth ? FontWidth * RowNum : this.msgText.textWidth;          //设置显示宽度
		this.msgBubblebg.width = this.msgText.width + 20;
		this.msgBubblebg.height = 55;
	}

	public setMsgIcon(iconStr: string) {

	}

}




class playAnimation extends eui.Component {

	private str: string;  				//播放动画的名称
	private mcFactory: egret.MovieClipDataFactory; //播放工厂
	private mc1: egret.MovieClip;

	constructor(str: string) {
		super();

		this.width=1280;
		this.height=720;
		this.x=0;
		this.y=0;
		this.str = str;
		var data = RES.getRes(this.str + "_json");
		var txtr = RES.getRes(this.str + "_png");
		this.mcFactory = new egret.MovieClipDataFactory(data, txtr);
		this.mc1 = new egret.MovieClip(this.mcFactory.generateMovieClipData(this.str));
		switch (this.str) {
			case ("dafeng"):
			case ("baozhongbao"):
			case ("hongzhongfei"):
			case ("zha"):
			case ("paio"):
			case ("kaipaizha"):{
				this.setEffectScale(1.4);
				break;
			}
			case ("qixiaodui"):
			case ("qingyise"):
				{
					this.setEffectScale(1.2);
					break;
				}
			case ("mobaohu"): {
				this.setEffectScale(1.1);
				break;
			}
			case ("chi"):
			case ("peng"):
			case ("ting"):
			case ("gang"):
			case ("hu") :{
				this.setEffectScale(1.5);
				break;
			}
			default: {
				break;
			}
		}
		//添加监听 完成后执行
		this.mc1.addEventListener(egret.Event.COMPLETE, this.playcomplete, this);
		this.addChild(this.mc1);

		
	}


	//播放次数
	public playMovieEffect(num: number = 1) {
		if (this.mc1) {
			this.mc1.play(num);
		}
	}

	//设置位置
	public setEffectPosition(x: number, y: number) {
		this.mc1.x = x;
		this.mc1.y = y;

	}
	//设置大小
	public setEffectScale(x: number) {
		this.mc1.scaleX = x;
		this.mc1.scaleY = x;
	}

	//删除动画
	private playcomplete() {

		this.removeChild(this.mc1);
	}


	public getAnimationmc() {
		return this.mc1
	}
}

//提示窗口
class TipsModule extends eui.Component {

	public tipsLable:eui.Label;  	//提示内容
	public tipsBg:  eui.Image;
	public tipsBtnGroup:eui.Group;	//按钮

	public tipsEnsureBtn:eui.Button;
	public tipsUndoBtn: eui.Button;


	constructor(){
		super();
		this.skinName = "resource/my_skins/TipsMoudle.exml";
		this.tipsBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeTips,this);
	}

	public closeTips(){
		if(this.parent){
			this.parent.removeChild(this);
		}
	}

}