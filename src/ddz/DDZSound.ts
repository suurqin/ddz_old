namespace ddz{
	// 斗地主声音处理类
	export class DDZSound {

		private sound:egret.Sound;
		private channel:egret.SoundChannel;

		public constructor() {
		}

		//播放
		private play(nameStr:string):void {
			if(this.sound){
				this.sound = null;
			}
			if(this.channel){
				this.stop();
			}
			RES.getResAsync(nameStr, this.loadMusic, this);
		}

        // 加载
        private loadMusic(data:egret.Sound, str:string) {
            this.sound = data;
            if (this.sound == null || this.sound == undefined) {
                console.log(" ddz load music error ");
                return;
            }
            this.channel = this.sound.play(0, 1);
        }

		// 停止
		private stop():void {
			if (this.channel) {
				this.channel.stop();
				this.channel = null;
			}
			this.sound = null;
		}

		// 发牌声音
		public playSendCardSound():void {

			this.play("ddz_xipai_mp3");
		}

		/**
		 * actionType 1表示不出，2表示不叫，3表示叫1分，4表示叫2分，5表示叫3分，6表示明牌, 7加倍, 8不加倍
		 */
		public playPlayerOperationSound(ddzRoomScene:ddz.DDZRoomScene, currPos:number, actionType:number){
			let isType:boolean = true;
			let tabPos = ddz.getTablePos(ddzRoomScene.$selfTablePos, currPos);
			let result:ddz.DDZPlayerInfo = ddzRoomScene.getPlayerInfoByPos(tabPos);
			let sex:number = result.$playerSex;
			if(sex == null || sex == undefined){
				sex = 0;
			}
			let soundName:string = "";
			if(sex == 0){// 女
				soundName = "ddz_female_";
			}else{// 男
				soundName = "ddz_man_";
			}
			switch(actionType) { 
				// 不出
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BC: { 
					let num = ddz.getRandNumber(1, 4);
					soundName = soundName + "no" + num;//ddz_female_no1_mp3
					break; 
				} 
				// 不叫
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BJ: { 
					soundName = soundName + "not_call";//ddz_man_not_call_mp3
					break; 
				} 
				// 1分
				case ddz.DDZActionType.DDZ_ACTION_TYPE_F1: { 
					soundName = soundName + "1_point";//ddz_man_1_point_mp3
					break; 
				} 
				// 2分
				case ddz.DDZActionType.DDZ_ACTION_TYPE_F2: { 
					soundName = soundName + "2_point";//ddz_man_2_point_mp3
					break; 
				} 
				// 3分
				case ddz.DDZActionType.DDZ_ACTION_TYPE_F3: { 
					soundName = soundName + "3_point";//ddz_man_3_point_mp3
					break; 
				} 
				// 明牌
				case ddz.DDZActionType.DDZ_ACTION_TYPE_MP: { 
					soundName = soundName + "mingpai";//ddz_man_mingpai_mp3
					break; 
				} 
				// 加倍
				case ddz.DDZActionType.DDZ_ACTION_TYPE_JB: { 
					let num = ddz.getRandNumber(1, 4);
					soundName = soundName + "jiabei" + num;//ddz_man_jiabei1_mp3
					break; 
				} 
				// 不加倍
				case ddz.DDZActionType.DDZ_ACTION_TYPE_BJB: { 
					let num = ddz.getRandNumber(1, 2);
					soundName = soundName + "bujiabei" + num;//ddz_man_bujiabei1_mp3
					break; 
				} 
				default: { 
					isType = false;
					break; 
				} 
			} 
			if(soundName == ""){
				soundName = soundName + "_mp3";
				this.play(soundName);
			}
		}


		/**
		 * 出牌动画声音
		 */
		public playPushCardSound(cardType:number){
			let soundName:string = "";
			switch(cardType) { 
				// 王炸
				case ddz.DDZPushCardType.DDZ_PUSH_CARD_WZ: { 
					soundName = "ddz_anim_feiji_mp3";
					break; 
				} 
				// 炸弹
				case ddz.DDZPushCardType.DDZ_PUSH_CARD_ZD: { 
					soundName = "ddz_anim_zhadan_mp3";
					break; 
				} 
				// 飞机
				case ddz.DDZPushCardType.DDZ_PUSH_CARD_FJ: { 
					soundName = "ddz_anim_feiji_mp3";
					break; 
				} 
				// 春天
				case ddz.DDZPushCardType.DDZ_PUSH_CARD_CT: { 
					soundName = "ddz_chuntian_mp3";
					break; 
				} 
				// 连对
				case ddz.DDZPushCardType.DDZ_PUSH_CARD_LD: { 
					soundName = "ddz_anim_zhadan_mp3";
					break; 
				} 
				// 顺子
				case ddz.DDZPushCardType.DDZ_PUSH_CARD_SZ: { 
					soundName = "ddz_anim_shunzi_mp3";
					break; 
				} 
				default: { 
					break; 
				} 
			} 
			if(soundName == ""){
				return;
			}
			this.play(soundName);
		}

		/**
		 * 出牌动画声音
		 */
		public playPushCardSoundBySex(cardData:ddz.DDZCardData, sex:number, bHas:number){
			let isType:boolean = true;
			let soundName:string = "";
			if (sex == 0){
				soundName = "ddz_female_";
			}else{
				soundName = "ddz_man_";
			}
			switch(cardData.type) { 
				case ddz.DDZCardType.CARD_TYPE_SINGLE: { 
					if (cardData.typeCount ==1){
						if (bHas){// 不是首出
							if (sex == 1){
								let id:number = ddz.getRandNumber(1,5);
								soundName = soundName+"dani"+id;// ddz_man_dani1_mp3
							}else{
								let id1:number = ddz.getRandNumber(1,2);
								if (id1 == 1){
									soundName = soundName+"dani";// ddz_man_dani_mp3
								}else{
									soundName = soundName+"guanshang";// ddz_man_guanshang_mp3
								}
							}
						}else{
							let id:number = cardData.cardCountList[0].num-3;
							soundName = soundName+""+id;// ddz_female_10_mp3
						}
					}else{
						soundName = soundName+"shunzi";// ddz_female_shunzi_mp3
					}
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_DOUBBLE: { 
					if (cardData.typeCount == 1){
						if (bHas){// 不是首出
							if (sex == 1){
								let id:number = ddz.getRandNumber(1,5);
								soundName = soundName+"dani"+id;// ddz_man_dani1_mp3
							}else{
								let id1:number = ddz.getRandNumber(1,2);
								if (id1 == 1){
									soundName = soundName+"dani";// ddz_man_dani_mp3
								}else{
									soundName = soundName+"guanshang";// ddz_man_guanshang_mp3
								}
							}
						}else{
							let id:number = cardData.cardCountList[0].num-3;
							soundName = soundName+"pair"+id;// ddz_female_pair1_mp3
						}
					}else{
						soundName = soundName+"continuous_pair";// ddz_female_continuous_pair_mp3
					}
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_THREE: { 
					if (cardData.typeCount == 1){
						let id:number = cardData.cardCountList[0].num-3;
						soundName = soundName+"three_one"+id;// ddz_female_three_one1_mp3
					}else{
						soundName = soundName+"airplane";// ddz_female_airplane_mp3
					}
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_THREE_ONE: { 
					if (cardData.typeCount == 1){
						soundName = soundName+"three_with_one";// ddz_female_three_with_one_mp3
					}else{
						soundName = soundName+"aircraft_with_wings";// ddz_man_aircraft_with_wings_mp3
					}
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_THREE_TWO: { 
					if (cardData.typeCount == 1){
						soundName = soundName+"three_with_one_pair";// ddz_female_three_with_one_pair_mp3
					}else{
						soundName = soundName+"aircraft_with_wings";// ddz_female_aircraft_with_wings_mp3
					}
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_FOUR: { 
					soundName = soundName+"bomb";// ddz_female_bomb_mp3
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_FOUR_ONE: { 
					soundName = soundName+"four_with_two";// ddz_female_four_with_two_mp3
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_FOUR_TWO: { 
					soundName = soundName+"four_with_two";// ddz_female_four_with_two_mp3
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_FOUR_ONE_PAIR: { 
					soundName = soundName+"four_with_two";// ddz_female_four_with_two_mp3
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_FOUR_TWO_PAIR: { 
					soundName = soundName+"four_with_two_pair";// ddz_female_four_with_two_pair_mp3
					break; 
				} 
				case ddz.DDZCardType.CARD_TYPE_ROCKET: { 
					soundName = soundName+"rocket";// ddz_female_rocket_mp3
					break; 
				} 
				default: { 
					isType = false;
					break; 
				} 
			} 
			if(isType){
				soundName = soundName+"_mp3";
				this.play(soundName);
			}
		}
	}
}