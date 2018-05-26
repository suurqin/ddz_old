namespace ddz{

	/**
	 * 斗地主纸牌基类
	 */
	export class DDZCard extends eui.Group{

		public cardWidth:number;// 纸牌宽度
		public cardHeight:number;// 纸牌高度
		public isSeleted:boolean = false;// 纸牌点击标记
		public isRemoved:boolean = false;// 纸牌删除标记

		public cardCode:number;// 纸牌编码
		private cardImageStr:string;// 纸牌图片名称
		private cardImage:egret.Bitmap;// 纸牌图片
		private cardShape:egret.Shape;// 纸牌遮罩
		
		private startX:number;
		private startY:number;

		public constructor(cardCode:number) {
			super();
			
			this.cardCode = cardCode;
			this.cardImageStr = "ddzCard_json.p"+cardCode+"_png";

			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickCardTap, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickCardBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.clickCardEnd, this);

			this.initCard();
		}

		/**
		 * 初始化纸牌
		 */
		public initCard() {
			
			this.cardImage = ddz.createBitmapByName(this.cardImageStr);
			this.cardImage.x = 0;
			this.cardImage.y = 0;
			this.addChild(this.cardImage);
			this.cardWidth = this.cardImage.width;
			this.cardHeight = this.cardImage.height;
			this.width = this.cardWidth;
			this.height = this.cardHeight;

			this.cardShape = new egret.Shape();
			var shapeW:number = this.cardWidth;
			var shapeH:number = this.cardHeight;
			this.cardShape.graphics.beginFill(0x696969, 0.5);
			this.cardShape.graphics.drawRoundRect(2, 2, shapeW-4, shapeH-4, 20, 20);
			this.cardShape.graphics.endFill();
			this.cardShape.$setVisible(false);
			this.addChild(this.cardShape);
		}

		/**
		 * 纸牌点击事件
		 */
		public clickCardTap() {
			// console.log("-----------clickCardTap----------");
			if(this.isSeleted){
				this.isSeleted = false;
				this.moveCardDown();
			}else{
				this.isSeleted = true;
				this.moveCardUp();
			}
		}

		/**
		 * 纸牌点击事件
		 */
		public clickCardBegin() {
			// // console.log("-----------clickCardBegin----------");
			this.cardShape.$setVisible(true);
		}

		/**
		 * 纸牌点击事件
		 */
		public clickCardEnd() {
			// // console.log("-----------clickCardEnd----------");
			this.cardShape.$setVisible(false);
		}

		/**
		 * 纸牌点击向上移动
		 */
		private moveCardUp() {

			ddz.twMoveToPositionY(this, -20, 5);
		}

		/**
		 * 纸牌点击向下移动
		 */
		private moveCardDown() {

			ddz.twMoveToPositionY(this, 0, 5);
		}

		/**
		 * 纸牌点击出牌
		 */
		private moveCardOut() {
			
		}

		/**
		 * 设置纸牌位置
		 */
		public setPositionX(newX:number) {

			this.x = newX;
		}

		/**
		 * 设置纸牌位置
		 */
		public mvPositionNewX(newX:number, needTime:number) {

			ddz.twMoveToPositionX(this, newX, needTime);
		}

		/**
		 * 设置纸牌位置
		 */
		public mvPositionNewY(newY:number, needTime:number) {

			ddz.twMoveToPositionY(this, newY, needTime);
		}
	}
}