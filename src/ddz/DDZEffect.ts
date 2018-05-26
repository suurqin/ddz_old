namespace ddz{

	/**
	 * 发牌动画1
	 * @param ddzRoomScene 
	 * @param interval
	 * @param callBack
	 */
	export function sendCardEffect1(ddzRoomScene:ddz.DDZRoomScene, 
									interval:number, 
									callBack:Function){

		let cardNum = ddzRoomScene.$ddzSendCardEffectCardList1.length;
		let groupWidth = ddzRoomScene.$ddz_send_card_effect_group1.width;
		for (let i = 0; i < cardNum; i++){
			let cardImage:egret.Bitmap = ddzRoomScene.$ddzSendCardEffectCardList1[i];  
			let trueWidth = groupWidth - ddzRoomScene.$cardW;
			let diff = trueWidth/(cardNum - 1);
			let newX = trueWidth-diff*i;
			let needTime = interval*(cardNum-1-i);
			egret.setTimeout(function(){
				if(i == cardNum-1){
					sendCardEffect2(ddzRoomScene, interval, callBack);
				}else{
					ddz.twMoveToPositionX(cardImage, newX, needTime);
				}
			}, cardImage, interval*i);        
		}	
		ddzRoomScene.$sound.playSendCardSound();
    }

	/**
	 * 发牌动画2
	 * @param ddzRoomScene 
	 * @param interval
	 * @param callBack
	 */
	export function sendCardEffect2(ddzRoomScene:ddz.DDZRoomScene, 
									interval:number, 
									callBack:Function){

		ddzRoomScene.$ddz_send_card_effect_group1.$setVisible(false);
		ddzRoomScene.$ddz_send_card_effect_group2.$setVisible(true);
		let cardNum = ddzRoomScene.$ddzSendCardEffectCardList2.length;
		let posCenter = ddzRoomScene.$ddz_hand_card_group.y-ddzRoomScene.$ddz_send_card_effect_group2.y;
		let posLeft = -ddzRoomScene.$cardW;
		let posRight = ddzRoomScene.$ddz_send_card_effect_group2.width;
		let listLength:number = ddzRoomScene.$ddzSelfHandCardList.length;
		let centerIndex = Math.floor(listLength/2);
		for (let i = 0; i < cardNum; i++) {
			let state:number = 0;
			let cardImage:egret.Bitmap = ddzRoomScene.$ddzSendCardEffectCardList2[i]; 
			let cardName = cardImage.name;
			if(cardName == "ddzCard_json.ddz_center_png"){// 中
				state = 0;
			}else if(cardName == "ddzCard_json.ddz_left_png"){// 左
				state = 1;
			}else if(cardName == "ddzCard_json.ddz_right_png"){// 右
				state = 2;
			}else{
				state = 4;
			}

			let needTime = interval*(cardNum-1-i)/2;

			let currIndex = Math.floor(i/3);
			let isMove:boolean  = false;
			let cardLeft:ddz.DDZCard = null;
			let cardright:ddz.DDZCard = null;
			let mvNeedTime = 0;
			let newLeftX = 0;
			let newRightX = 0;
			if(currIndex < centerIndex){
				isMove = true;
				let leftIndex = currIndex;
				let rightIndex = listLength-1-leftIndex;
				cardLeft = ddzRoomScene.$ddzSelfHandCardList[leftIndex];
				cardright = ddzRoomScene.$ddzSelfHandCardList[rightIndex];
				mvNeedTime = interval*(centerIndex-1-leftIndex);		
				newLeftX = ddz.cardPositionUtil(listLength, Number(leftIndex), cardLeft.cardWidth, ddzRoomScene.$stageW);
				newRightX = ddz.cardPositionUtil(listLength, Number(rightIndex), cardright.cardWidth, ddzRoomScene.$stageW);
			}
			
			egret.setTimeout(function(){
				if(i == cardNum-1){
					egret.setTimeout(function(){
						revertSendCardGroup(ddzRoomScene.$ddzSendCardEffectCardList1, 
											ddzRoomScene.$ddzSendCardEffectCardList2, 
											ddzRoomScene.$ddz_send_card_effect_group1, 
											ddzRoomScene.$ddz_send_card_effect_group2);
						ddzRoomScene.clearTimeout();
				}, i, interval); 
				}else{
					if(state == 0){// 中
						if(isMove){
							egret.setTimeout(function(){
								if(!ddzRoomScene.$ddz_hand_card_group.visible){
									ddzRoomScene.$ddz_hand_card_group.$setVisible(true);
								}
								ddz.twMoveToPositionXAndEase(cardLeft, newLeftX, needTime*2+interval, egret.Ease.circOut);
								ddz.twMoveToPositionXAndEase(cardright, newRightX, needTime*2+interval, egret.Ease.circOut);	
							}, i, needTime/2); 	
						}
						ddz.twMoveToPositionYAndFadeOut(cardImage, posCenter, needTime, 10, 20);
					}else if(state == 1){// 左
						ddz.twMoveToPositionXAndFadeOut(cardImage, posLeft, needTime, 10, 20);
					}else if(state == 2){// 右
						ddz.twMoveToPositionXAndFadeOut(cardImage, posRight, needTime, 10, 20);
					}
				}
			}, cardImage, interval*i); 
		}
    }

	/**
	 * 还原发牌动画组
	 * @param cardList1
	 * @param cardList2
	 * @param group1
	 * @param group2
	 */
	export function revertSendCardGroup(cardList1:egret.Bitmap[], 
										cardList2:egret.Bitmap[], 
										group1:eui.Group, 
										group2:eui.Group) {
											
		group1.$setVisible(false);
		group2.$setVisible(false);
		let list1Length = cardList1.length;
		for (let i = 0; i < list1Length; i++) {
			let cardImage:egret.Bitmap = cardList1[i];
			cardImage.x = 0;
			cardImage.y = 0;
			cardImage.$setVisible(true);
		}

		let list2Length = cardList2.length;		
		for (let i = 0; i < list2Length; i++) {
			let cardImage:egret.Bitmap = cardList2[i];
			cardImage.x = (group2.width - cardImage.width)/2;
			cardImage.y = (group2.height - cardImage.height)/2;
			cardImage.$setAlpha(1);
			cardImage.$setVisible(true);			
		}
	}

	/**
	 * 手牌进牌动画
	 * @param ddzSelfHandCardList
	 * @param interval
	 * @param stageW
	 */
	export function handCardInEffect(ddzSelfHandCardList:ddz.DDZCard[], 
									 interval:number, 
									 stageW:number) {

		let listLength:number = ddzSelfHandCardList.length;
		let centerIndex = Math.floor(listLength/2);
		for (let i = 0; i < centerIndex; i++){
			let leftIndex = i;
			let rightIndex = listLength-1-leftIndex;
			let cardLeft:ddz.DDZCard = ddzSelfHandCardList[leftIndex];
			let cardright:ddz.DDZCard = ddzSelfHandCardList[rightIndex];
			let needTime = interval*(centerIndex-1-leftIndex);
			let newLeftX = ddz.cardPositionUtil(listLength, Number(leftIndex), cardLeft.cardWidth, stageW);
			let newRightX = ddz.cardPositionUtil(listLength, Number(rightIndex), cardright.cardWidth, stageW);
			egret.setTimeout(function(){
				ddz.twMoveToPositionX(cardLeft, newLeftX, needTime);
				ddz.twMoveToPositionX(cardright, newRightX, needTime);
			}, i, interval*i); 		
		}
	}

	/**
	 * 手牌出牌动画
	 * @param card
	 * @param stageW
	 * @param stageH
	 * @param diffWidth
	 * @param removedNum
	 * @param index
	 * @param groupY
	 * @param needTime
	 */
	export function handCardOutEffect(card:ddz.DDZCard, stageW:number, stageH:number, diffWidth:number, 
									removedNum:number, index:number, groupY:number, needTime:number) {
		
		let cardScale = ddz.DDZCardScale.DDZ_CARD_SCALE_BIG;
		let newX = ddz.getSendCardPositionX(stageW, diffWidth, removedNum, index, card.width*cardScale);
		let newY = (stageH-card.height*cardScale)/2-groupY-20;		
		let tw = egret.Tween.get(card);
		tw.to({ x:newX, y: newY, scaleX: cardScale, scaleY: cardScale}, needTime, egret.Ease.circInOut);
	}

	/**
	 * 玩家手牌出牌动画
	 * @param cardGroup
	 * @param newX
	 * @param newY
	 * @param needTime
	 */
	export function leftOrRightHandCardOutEffect(cardGroup:eui.Group, newX:number, newY:number, needTime:number) {
		
		let tw = egret.Tween.get(cardGroup);
		tw.to({ x:newX, y: newY}, needTime, egret.Ease.circInOut);
	}

	/**
	 * 会话泡泡淡进淡出效果
	 * @param object
	 * @param fadeInTime
	 * @param waitTime
	 * @param fadeOutTime
	 */
	export function fadeInOutEffect(object:eui.Group, fadeInTime:number, waitTime:number, fadeOutTime:number) {
		object.$setAlpha(0);
		object.$setVisible(true);
		let tw = egret.Tween.get(object);
		tw.to({ alpha: 1}, fadeInTime).wait(waitTime).to({ alpha: 0}, fadeOutTime);	
		tw.call(callBackFunc, this, [object]);
		function callBackFunc(obj:eui.Image){
			obj.$setVisible(false);
		}
	}

	/**
	 * 在X轴移动对象
	 */
	export function twMoveToPositionX(obj:any, newX:number, needTime:number) {
		let tw = egret.Tween.get(obj);
		tw.to({ x: newX}, needTime);	
	}

	/**
	 * 在y轴移动对象
	 */
	export function twMoveToPositionY(obj:any, newY:number, needTime:number) {
		let tw = egret.Tween.get(obj);
		tw.to({ y: newY}, needTime);	
	}

	/**
	 * 在X轴移动对象
	 */
	export function twMoveToPositionXAndFadeOut(obj:any, newX:number, needTime:number, waitTime:number, fadeOutTime:number) {
		let tw = egret.Tween.get(obj);
		tw.to({ x: newX}, needTime).wait(waitTime).to({ alpha: 0}, fadeOutTime);	
	}

	/**
	 * 在y轴移动对象
	 */
	export function twMoveToPositionYAndFadeOut(obj:any, newY:number, needTime:number, waitTime:number, fadeOutTime:number) {
		let tw = egret.Tween.get(obj);
		tw.to({ y: newY}, needTime).wait(waitTime).to({ alpha: 0}, fadeOutTime);	
	}

	/**
	 * 在X轴移动对象
	 */
	export function twMoveToPositionXAndEase(obj:any, newX:number, needTime:number, easeType) {
		let tw = egret.Tween.get(obj);
		tw.to({ x: newX}, needTime, easeType);	
	}

	/**
	 * 在y轴移动对象
	 */
	export function twMoveToPositionYAndEase(obj:any, newY:number, needTime:number, easeType) {
		let tw = egret.Tween.get(obj);
		tw.to({ y: newY}, needTime, easeType);		
	}

	/**
	 * 成为地主动画
	 */
	export function toBeDiZhuEffect(obj:any, needTime:number, easeType) {
		let tw = egret.Tween.get(obj);
		tw.to({ scaleX: 2, scaleY: 2}, needTime, easeType).wait(20).to({ scaleX: 1, scaleY: 1}, needTime, easeType);		
	}

	/**
	 * 播放出牌动画
	 */
	export function playCardAnimation(parent:ddz.DDZRoomScene, animType:number, tablePos:number) {
		
		switch(animType) { 
			// 王炸
			case ddz.DDZPushCardType.DDZ_PUSH_CARD_WZ: { 
				let x = (parent.$stageW-320)/2;
				let y = (parent.$stageH-340)/2;
				ddz.playRocketAnimation(parent, x, y);
				break; 
			} 
			// 炸弹
			case ddz.DDZPushCardType.DDZ_PUSH_CARD_ZD: { 
				let x = (parent.$stageW-320)/2;
				let y = (parent.$stageH-340)/2;
				ddz.playBombAnimation(parent, x, y);
				break; 
			} 
			// 飞机
			case ddz.DDZPushCardType.DDZ_PUSH_CARD_FJ: { 
				let x = parent.$stageW;
				let y = (parent.$stageH-200)/2;
				ddz.playPlaneAnimation(parent, x, y);
				break; 
			} 
			// 春天
			case ddz.DDZPushCardType.DDZ_PUSH_CARD_CT: { 
				let x = (parent.$stageW-250)/2;
				let y = (parent.$stageH-128)/2;
				ddz.playSpringAnimation(parent, x, y);
				break; 
			} 
			// 连对
			case ddz.DDZPushCardType.DDZ_PUSH_CARD_LD: { 
				let x = (parent.$stageW-320)/2;
				let y = (parent.$stageH-340)/2;
				ddz.playLianDuiAnimation(parent, x, y);
				break; 
			} 
			// 顺子
			case ddz.DDZPushCardType.DDZ_PUSH_CARD_SZ: { 
				let x = parent.$stageW;
				let y = (parent.$stageH-240)/2;
				ddz.playShunZiAnimation(parent, x, y);
				break; 
			} 
			default: { 
				break; 
			} 
		} 
	}

	/**
	 * 出牌动画王炸
	 */
	export function playRocketAnimation(parent:ddz.DDZRoomScene, x:number, y:number) {
		parent.$sound.playPushCardSound(ddz.DDZPushCardType.DDZ_PUSH_CARD_WZ);
	}

	/**
	 * 出牌动画炸弹
	 */
	export function playBombAnimation(parent:ddz.DDZRoomScene, x:number, y:number) {
		let data = RES.getRes("ddzBombAnim_json");
		let txtr = RES.getRes("ddzBombAnim_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("ddzBombAnim"));
		mc.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
			parent.removeChild(mc);
		}, this);
		mc.x = x;
		mc.y = y;
		parent.addChild(mc);
		mc.gotoAndPlay("bomb", 1);
		parent.$sound.playPushCardSound(ddz.DDZPushCardType.DDZ_PUSH_CARD_ZD);
	}

	/**
	 * 出牌动画飞机
	 */
	export function playPlaneAnimation(parent:ddz.DDZRoomScene, x:number, y:number) {
		let data = RES.getRes("ddzPlaneAnim_json");
		let txtr = RES.getRes("ddzPlaneAnim_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("ddzPlaneAnim"));
		mc.x = x;
		mc.y = y;
		parent.addChild(mc);
		mc.gotoAndPlay("start", -1);
		let tw = egret.Tween.get(mc);
		tw.to({x: -356}, 1000);	
		tw.call(callBackFunc, this, [parent, mc]);
		function callBackFunc(parent:ddz.DDZRoomScene, mc:egret.MovieClip){
			parent.removeChild(mc);
		}
		parent.$sound.playPushCardSound(ddz.DDZPushCardType.DDZ_PUSH_CARD_FJ);
	}

	/**
	 * 出牌动画春天
	 */
	export function playSpringAnimation(parent:ddz.DDZRoomScene, x:number, y:number) {
		let data = RES.getRes("ddzChunTianAnim_json");
		let txtr = RES.getRes("ddzChunTianAnim_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("ddzChunTianAnim"));
		mc.addEventListener(egret.Event.COMPLETE, (e:egret.Event)=>{
			parent.removeChild(mc);
		}, this);
		mc.x = x;
		mc.y = y;
		parent.addChild(mc);
		mc.gotoAndPlay("start", 1);
		parent.$sound.playPushCardSound(ddz.DDZPushCardType.DDZ_PUSH_CARD_CT);
	}

	/**
	 * 出牌动画连对
	 */
	export function playLianDuiAnimation(parent:ddz.DDZRoomScene, x:number, y:number) {
		parent.$sound.playPushCardSound(ddz.DDZPushCardType.DDZ_PUSH_CARD_LD);
	}

	/**
	 * 出牌动画顺子
	 */
	export function playShunZiAnimation(parent:ddz.DDZRoomScene, x:number, y:number) {
		let data = RES.getRes("ddzShunZiAnim_json");
		let txtr = RES.getRes("ddzShunZiAnim_png");
		let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		let mc:egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData("ddzShunZiAnim"));
		mc.x = x;
		mc.y = y;
		parent.addChild(mc);
		mc.gotoAndPlay("start", -1);
		let tw = egret.Tween.get(mc);
		tw.to({x: -260}, 1000);	
		tw.call(callBackFunc, this, [parent, mc]);
		function callBackFunc(parent:ddz.DDZRoomScene, mc:egret.MovieClip){
			parent.removeChild(mc);
		}
		parent.$sound.playPushCardSound(ddz.DDZPushCardType.DDZ_PUSH_CARD_SZ);
	}
}