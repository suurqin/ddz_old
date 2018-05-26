module lobbyScene {
	export class PasswordLayer extends eui.Component {
		private password_password_bitmapLabel: eui.BitmapLabel;
		private input_list_password_group: eui.Group;
		private close_password_button: eui.Button;
		private ok_password_button: eui.Button;

		public passwordForParentBitmapLabel: eui.BitmapLabel = null;

		public constructor() {
			super();
			this.skinName = "resource/my_skins/PasswordLayer.exml";

			this.initUI();
			this.initEvent();
		}

		private initUI() {
			this.password_password_bitmapLabel.text = "";
		}

		private initEvent() {
			this.close_password_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickCloseBtn, this);
			for (let i = 0; i < 12; i++) {
				let jpButton = this.input_list_password_group.getChildAt(i);
				jpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickInputBtn, this);
			}
			this.ok_password_button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickOkBtn, this);
		}

		private onClickCloseBtn(event: egret.TouchEvent) {
			this.parent.removeChild(this);
		}

		private onClickInputBtn(event: egret.TouchEvent) {
			switch (event.target.name) {
				case "c":
					{	//重输
						this.password_password_bitmapLabel.text = "";
						break;
					}

				case "d":
					{	//删除
						let nowStr = this.password_password_bitmapLabel.text;
						if (nowStr.length > 1) {
							nowStr = nowStr.substr(0, nowStr.length - 1);
							this.password_password_bitmapLabel.text = nowStr;

						}
						else {
							this.password_password_bitmapLabel.text = "";
						}
						break;
					}
				default: {
					let nowStr = this.password_password_bitmapLabel.text;
					if (nowStr.length < 6) {
						//未满6位，继续输入
						this.password_password_bitmapLabel.text = nowStr + event.target.name;
					}
					else {
						//已满6位
					}
					break;
				}
			}
		}

		private onClickOkBtn(event: egret.TouchEvent) {
			if (this.passwordForParentBitmapLabel) {
				this.passwordForParentBitmapLabel.text = this.password_password_bitmapLabel.text;
			}
			else {
				//加入房间时，如果密码错误，直接弹出提示，输入后发消息加入房间
				lobbyScene.EnterRoomLayer.EnterVipRoomMsg(this.password_password_bitmapLabel.text);
			}
			this.parent.removeChild(this);
		}


	}
}