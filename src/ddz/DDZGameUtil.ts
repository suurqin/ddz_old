namespace ddz
{
    /**
	 * 创建位图
	 */
    export function createBitmapByName(name:string):egret.Bitmap{
        let result:egret.Bitmap = new egret.Bitmap();
        let texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
	 * 计算手牌位置
	 */
	export function cardPositionUtil(cardNum:number, cardIndex:number, cardWidth:number, stageWidth:number):number {
		let cardWidthSum = cardWidth * cardNum;
		if(cardWidthSum <= stageWidth){
			let startX = (stageWidth-cardWidthSum)/2;
			let cardX = startX + cardWidth*cardIndex;
			return cardX;
		}else{
			if(cardIndex == (cardNum-1)){
				let cardX = stageWidth - cardWidth;
				return cardX;
			}else{
				let startX = 0;
				let cardX = startX + ((stageWidth-cardWidth)/(cardNum-1))*cardIndex;
				return cardX;
			}
		}
	}

	/**
	 * 计算出牌位置
	 */
	export function getSendCardPositionX(groupWidth:number, diffWidth:number, cardNum:number, 
										 cardIndex:number, cardWidth:number):number {
		let widthSum = diffWidth*(cardNum-1)+cardWidth;
		let startX = (groupWidth-widthSum)/2;
		let returnX = startX+diffWidth*cardIndex;
		return returnX;
	}

	/**
	 * 计算出牌位置
	 */
	export function getLeftOrRightPushCardXAndY(card:ddz.DDZCard, pushCardNum:number, cardSpace:number, 
												cardWidth:number, i:number, isRight:boolean){
		if(pushCardNum > 9){
			cardSpace = ddz.DDZCardSpace.DDZ_CARD_SPACE_20;
			cardWidth = card.width*ddz.DDZCardScale.DDZ_CARD_SCALE_SMALL;
			card.y = 0;
			if(pushCardNum > 14){
				if(isRight){
					card.x = cardSpace*i;
				}else{
					card.x = -cardSpace*(13-i);
				}
			}else{
				if(isRight){
					card.x = cardSpace*i;
				}else{
					card.x = -cardSpace*(pushCardNum-1-i);
				}
			}
			if(i > 13){
				card.y = card.height*ddz.DDZCardScale.DDZ_CARD_SCALE_SMALL/2;
				if(isRight){
					card.x = cardSpace*(i-14);
				}else{
					card.x = -cardSpace*(27-i);
				}
			}
			card.scaleX = ddz.DDZCardScale.DDZ_CARD_SCALE_SMALL;
			card.scaleY = ddz.DDZCardScale.DDZ_CARD_SCALE_SMALL;
		}else{
			cardSpace = ddz.DDZCardSpace.DDZ_CARD_SPACE_30;
			cardWidth = card.width*ddz.DDZCardScale.DDZ_CARD_SCALE_BIG;
			card.y = 0;
			if(isRight){
				card.x = cardSpace*i;
			}else{
				card.x = -cardSpace*(pushCardNum-1-i);
			}
			card.scaleX = ddz.DDZCardScale.DDZ_CARD_SCALE_BIG;
			card.scaleY = ddz.DDZCardScale.DDZ_CARD_SCALE_BIG;
		}
	}
	
	/**
	 * 根据roomId获取房间信息
	 */
	export function getGameRoomByRoomId(roomId:number):ddz.GameRoom {

		manager.global.mGameRoomList.forEach(element => {
			if(element.roomID == roomId){
				return element;
			}
		});
		return null;
	}

	/**
	 * 获取玩家位置
	 */
	export function getTablePos(selfPos:number, pos:number){
		if (pos == selfPos){
			return ddz.TablePosition.POS_CENTER;
		}
		if (selfPos == pos + 1 || selfPos + 3 == pos + 1){
			return ddz.TablePosition.POS_LEFT;
		}
		return ddz.TablePosition.POS_RIGHT;
	}

	/**
	 * 获取随机数
	 */
	export function getRandNumber(min:number, max:number):number{
		let random = min;
		random = Math.round(Math.random() * (max - min) + min);
		return random;
	}


	/**
	 * 获取牌编码
	 */
	export function getCardNum(cardNum:number){

		return cardNum % 100;
	}

	/**
	 * 比较牌编码(升序排序)
	 */
	export function compareCardNumAsc(card1:number, card2:number):number{

		if (ddz.getCardNum(card1) < ddz.getCardNum(card2)) {
			return -1;
		} else if (ddz.getCardNum(card1) > ddz.getCardNum(card2)) {
			return 1;
		} else {
			return 0;
		}
	}

	/**
	 * 比较牌编码(降序排序)
	 */
	export function compareCardNumDesc(card1:number, card2:number):number{

		if (ddz.getCardNum(card1) < ddz.getCardNum(card2)) {
			return 1;
		} else if (ddz.getCardNum(card1) > ddz.getCardNum(card2)) {
			return -1;
		} else {
			return 0;
		}
	}

	/**
	 * 比较牌编码
	 */
	export function compareCardCountInfo(cardCount1:ddz.DDZCardCountInfo, cardCount2:ddz.DDZCardCountInfo):number{

		// count数量降序, num数字升序
		if(cardCount1.count != cardCount2.count){
			return ddz.compareCardNumAsc(cardCount1.count, cardCount2.count);
		}
		return ddz.compareCardNumDesc(cardCount1.num, cardCount2.num);
	}

	/**
	 * 获取牌码和牌数
	 */
	export function getCountInfo(cardList:number[], cardInfoList:ddz.DDZCardCountInfo[]){

		// 按大小排序
		cardList.sort(ddz.compareCardNumAsc);
		let lastNum:number = -1;
		let cInfo:ddz.DDZCardCountInfo;
		cardList.forEach(element => {
			let num = ddz.getCardNum(element);
			if (num != lastNum){
				lastNum = num;
				let newInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(num, 0);
				cardInfoList.push(newInfo);
				cInfo = cardInfoList[cardInfoList.length-1];
			}
			if(cInfo){
				cInfo.count++;
			}
		});

	}

	/**
	 * 创建牌数据结构体
	 */
	export function createCardData(cardList:number[]):ddz.DDZCardData{
		let cData = new ddz.DDZCardData();
		cData.cardList = cardList;
		getCountInfo(cardList, cData.cardCountList);
		return cData;
	}

	/**
	 * 检测出牌类型
	 */
	export function refreshCardData(ddzRoomScene:ddz.DDZRoomScene, cardData:ddz.DDZCardData, isGuanPai:boolean){
		let cardListLength = cardData.cardList.length;
		let cardCountList:ddz.DDZCardCountInfo[] = cardData.cardCountList;
		if (cardCountList.length == 0){
			cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
		}else {
			ddz.getCardHint(ddzRoomScene, cardData.cardList, cardData, isGuanPai);
			if (cardData.cardList.length != cardListLength){
				cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
			}else{
				console.log("success verify");
			}
		}
	}

	/**
	 * 检测出牌类型
	 */
	export function getCardHint(ddzRoomScene:ddz.DDZRoomScene, cardList:number[], cardData:ddz.DDZCardData, isGuanPai:boolean){
		let countList:ddz.DDZCardCountInfo[] = [];
		let cpList:number[] = cardList;
		ddz.getCountInfo(cpList, countList);
		let countSortedList:number[][] = ddz.getCardsByCount(countList);

		let max:number = 0;
		let cur:number = 0;
		let maxData:ddz.DDZCardData = null;
		console.log("rocketData");//王炸
		let rocketData:ddz.DDZCardData = new ddz.DDZCardData();
		cur = ddz.pushRocketList(countList, countSortedList, rocketData);
		if (cur > max){
			maxData = rocketData;
			max = cur;
		}
		console.log("fourData");// 炸弹
		let fourData:ddz.DDZCardData = new ddz.DDZCardData();
		if(isGuanPai){
			cur = ddz.pushGuanPaiFourList(countList, countSortedList, fourData);
		}else{
			cur = ddz.pushFourList(countList, countSortedList, fourData);
		}
		if (cur > max){
			maxData = fourData;
			max = cur;
		}
		console.log("threeData");// 三张
		let threeData:ddz.DDZCardData = new ddz.DDZCardData();
		if(isGuanPai){
			cur = pushGuanPaiThreeList(countList, countSortedList, threeData);
		}else{
			cur = pushThreeList(countList, countSortedList, threeData);
		}
		if (cur > max){
			maxData = threeData;
			max = cur;
		}
		console.log("doubleData");// 两张
		let doubleData:ddz.DDZCardData = new ddz.DDZCardData();
		cur = pushDoubleList(countList, countSortedList, doubleData, isGuanPai);
		if (cur > max){
			maxData = doubleData;
			max = cur;
		}
		console.log("singleData");// 单张
		let singleData:ddz.DDZCardData = new ddz.DDZCardData();
		cur = pushSingleList(countList, countSortedList, singleData);
		if (cur > max){
			maxData = singleData;
			max = cur;
		}

		if (maxData != null){
			ddz.findCardListByCountInfo(maxData.cardCountList, cpList, cardData.cardList);
			cardData.type = maxData.type;
			cardData.typeCount = maxData.typeCount;
			cardData.cardCountList = maxData.cardCountList;
			if(ddzRoomScene.$m_firstsend){
				let size = cardData.cardList.length;
				for(let i = 0; i < size; i++){
					if(cardData.cardList[i] == ddzRoomScene.$m_firstsend){
						cardData.type = maxData.type;
						break;
					}else{
						cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
					}
				}
			}
		}
		maxData = null;
	}

	/**
	 * 0:单牌数组;1:对子;....4为小王,5为大王
	 */
	export function getCardsByCount(countList:ddz.DDZCardCountInfo[]):number[][]{
		let list:number[][] = [];
		for (let i = 0; i < 5; i++){
			let cList:number[] = [];
			list.push(cList);
		} 
		countList.forEach(element => {
			list[element.count].push(element.num);
		});
		return list;
	}

	/**
	 * 王炸
	 */
	export function pushRocketList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData):number{
		let size = countList.length;
		if (size>1 && countList[size-2].num == ddz.DDZCardCode.CJOCKER_BLACK%100 && countList[size-1].num == ddz.DDZCardCode.CJOCKER_RED%100){
			cardData.type = ddz.DDZCardType.CARD_TYPE_ROCKET;
			let c1:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(ddz.DDZCardCode.CJOCKER_BLACK%100, 1);
			let c2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(ddz.DDZCardCode.CJOCKER_RED%100, 1);
			cardData.cardCountList.push(c1);
			cardData.cardCountList.push(c2);
			return 2;
		}
		return 0;
	}

	/**
	 * 炸弹
	 */
	export function pushFourList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData):number{
		let count:number = 0;
		let otherCount:number = 0;
		let fourList:number[] = countSortedList[4];
		if (fourList.length > 0){
			cardData.typeCount = 1;
			let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(fourList[0] ,4);
			cardData.cardCountList.push(cInfo);
			count += 4;
			let other:number[] = countSortedList[2];
			if (other.length > 0){
				otherCount = other.length< 2 ? other.length:2;
				for (let i = 0; i < otherCount; i++){
					let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(other[i], 2);
					cardData.cardCountList.push(cInfo2);
					count += 2;
				}
				cardData.type = other.length;
				if(cardData.type == 1)
					return 0;
				cardData.type = other.length == 1 ? ddz.DDZCardType.CARD_TYPE_FOUR_ONE_PAIR : ddz.DDZCardType.CARD_TYPE_FOUR_TWO_PAIR;
			}else{
				other = countSortedList[1];
				if (other.length > 1){
					otherCount = other.length< 2 ? other.length : 2;
					for (let i = 0; i < otherCount; i++){
						let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(other[i], 1);
						cardData.cardCountList.push(cInfo2);
						count += 1;
					}
					cardData.type = other.length == 1 ? ddz.DDZCardType.CARD_TYPE_FOUR_ONE : ddz.DDZCardType.CARD_TYPE_FOUR_TWO;
				}else{
					cardData.type = ddz.DDZCardType.CARD_TYPE_FOUR;
				}
			}
		}
		return count;
	}

	/**
	 * 关牌
	 */
	export function pushGuanPaiFourList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData):number{
		let count:number = 0;
		let otherCount:number = 0;
		let fourList:number[] = countSortedList[4];
		if (fourList.length > 0){
			cardData.typeCount = 1;
			let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(fourList[0],4);
			cardData.cardCountList.push(cInfo);
			count += 4;
			let other:number[] = countSortedList[3];
			if(other.length > 0){
				otherCount = other.length < 2 ? other.length : 2;
				for (let i = 0; i < otherCount; i++){
					let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(other[i], 3);
					cardData.cardCountList.push(cInfo2);
					count += 3;
				}
				cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
			}else{
				other = countSortedList[2];
				if (other.length > 0){
					otherCount = other.length ? other.length : 2;
					for (let i = 0; i < otherCount; i++){
						let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(other[i], 2);
						cardData.cardCountList.push(cInfo2);
						count += 2;
					}
					cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
				}else{
					other = countSortedList[1];
					if (other.length > 0){
						otherCount = other.length < 2 ? other.length : 2;
						for (let i = 0; i < otherCount; i++){
							let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(other[i], 1);
							cardData.cardCountList.push(cInfo2);
							count += 1;
						}
						cardData.type = other.length == 1 ? ddz.DDZCardType.CARD_TYPE_FOUR : ddz.DDZCardType.CARD_TYPE_ERROR;
					}else{
						cardData.type = ddz.DDZCardType.CARD_TYPE_FOUR;
					}
				}
			}
		}
		return count;
	}

	/**
	 * 三张
	 */
	export function pushThreeList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData):number{
		let count:number = 0;
		let allNumList:number[] = [];
		for (let i = 3; i < 5; i++){
			let tempCountList:number[] = countSortedList[i];
			let jlength = tempCountList.length
			for (let j = 0; j<jlength; j++){
				let num:number = tempCountList[j];
				allNumList.push(num);
			}
		}
		allNumList.sort(ddz.compareCardNumAsc);
		if (allNumList.length > 0){
			let linkList:number[] = ddz.findMaxLink(allNumList);
			let size = linkList.length;
			if (size > 0){
				cardData.typeCount = size;
				if (countSortedList[2].length >= size){
					for (let i = 0; i < size; i++){
						let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
						cardData.cardCountList.push(cInfo);
						let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(countSortedList[2][i], 2);
						cardData.cardCountList.push(cInfo2);
						count += 5;
					}
					cardData.type = ddz.DDZCardType.CARD_TYPE_THREE_TWO;
				}else if (countSortedList[1].length >= size){
					for (let i = 0; i < size; i++){
						let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
						cardData.cardCountList.push(cInfo);
						let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(countSortedList[1][i], 1);
						cardData.cardCountList.push(cInfo2);
						count += 4;
					}
					cardData.type = ddz.DDZCardType.CARD_TYPE_THREE_ONE;
				}else{
					let otherNumList:number[] = [];
					let isFind:boolean = false;
					for (let i = 1; i < 5; i++){
						for (let j = 0; j < countSortedList[i].length; j++){
							for (let k = 0; k < size; k++){
								if (countSortedList[i][j] != linkList[k]){
									for (let l = 0; l < i; l++){
										otherNumList.push(countSortedList[i][j]);
										if (otherNumList.length == size){
											isFind = true;
											break;
										}
									}
								}
								if (isFind)break;
							}
							if (isFind)break;
						}
						if (isFind)break;
					}
					if (!isFind){
						for (let i = 0; i < size; i++){
							let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
							cardData.cardCountList.push(cInfo);
							if (otherNumList.length > 0){
								let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(otherNumList[i], 1);
								cardData.cardCountList.push(cInfo2);
							}else {
								count += 4;
								cardData.type = ddz.DDZCardType.CARD_TYPE_THREE;
								return count;
							}
							count += 4;
						}
						cardData.type = ddz.DDZCardType.CARD_TYPE_THREE_ONE;
					}else{
						for (let i = 0; i < size; i++){
							let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
							cardData.cardCountList.push(cInfo);
							count += 3;
						}
						cardData.type = ddz.DDZCardType.CARD_TYPE_THREE;
					}
				}
			}
		}
		return count;
	}

	/**
	 * 关牌
	 */
	export function pushGuanPaiThreeList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData):number{
		let count:number = 0;
		let allNumList:number[] = [];
		for (let i = 3; i < 5; i++){
			let tempCountList:number[] = countSortedList[i];
			let jlength = tempCountList.length
			for (let j = 0; j<jlength; j++){
				let num:number = tempCountList[j];
				allNumList.push(num);
			}
		}
		allNumList.sort(ddz.compareCardNumAsc);
		if (allNumList.length > 0){
			let linkList:number[] = ddz.findMaxLink(allNumList);
			let size = linkList.length;
			if (size > 0){
				cardData.typeCount = size;
				if(5 == size){//暂时先分情况穷举
					for (let i = 0; i<size; i++){
						let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
						cardData.cardCountList.push(cInfo);
						count += 3;
					}
					cardData.type = ddz.DDZCardType.CARD_TYPE_FIVE_THREE;
				}else if(4 == size){
					for (let i = 0; i<size; i++){
						let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
						cardData.cardCountList.push(cInfo);
						count += 3;
					}
					cardData.type = ddz.DDZCardType.CARD_TYPE_FOUR_THREE;
				}else if(3 == size){
					if (countSortedList[3].length == 3){
						if(countSortedList[2].length == 3){//对子飞机
							if((countSortedList[2][0]+1 == countSortedList[2][1] )&&(countSortedList[2][1]+1 == countSortedList[2][2] )){
								for (let i = 0; i<size; i++){
									let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
									cardData.cardCountList.push(cInfo);
									let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(countSortedList[2][i], 2);
									cardData.cardCountList.push(cInfo2);
								}
								count += 15;
								cardData.type = ddz.DDZCardType.CARD_TYPE_THREE_THREE_TWO;
							}else{
								cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
							}
						}else if (countSortedList[1].length == 0 && countSortedList[2].length == 0 && countSortedList[4].length == 0){
							for (let i = 0; i<size; i++){
								let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
								cardData.cardCountList.push(cInfo);
								count += 3;
							}
							cardData.type = ddz.DDZCardType.CARD_TYPE_THREE_THREE;
						}
					}
				}else if(2 == size){
					if(countSortedList[3].length == 2){
						if (countSortedList[2].length == size){
							if(countSortedList[2][0]+1 == countSortedList[2][1]){
								for (let i = 0; i<size; i++){
									let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
									cardData.cardCountList.push(cInfo);
									let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(countSortedList[2][i], 2);
									cardData.cardCountList.push(cInfo2);
									count += 5;
								}
								cardData.type = ddz.DDZCardType.CARD_TYPE_TWO_THREE_TWO;
							}else{
								cardData.type = ddz.DDZCardType.CARD_TYPE_ERROR;
							}
						}else if (countSortedList[1].length == 0 && countSortedList[2].length == 0 && countSortedList[4].length == 0){
							for (let i = 0; i<size; i++){
								let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
								cardData.cardCountList.push(cInfo);
							}
							count += 6;
							cardData.type = ddz.DDZCardType.CARD_TYPE_TWO_THREE;
						}
					}
				}else if(1 == size){
					if(countSortedList[3].length == 1){
						for (let i = 0; i < size; i++){
							let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 3);
							cardData.cardCountList.push(cInfo);
							count += 3;
						}
						if(countSortedList[3][0] == ddz.DDZCardCode.CA && (countSortedList[1].length == 0||countSortedList[1].length == 1)&&countSortedList[2].length == 0&&countSortedList[4].length == 0){
							if(countSortedList[1].length == 1){
								let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(countSortedList[1][0], 1);
								cardData.cardCountList.push(cInfo2);
								count += 1;
							}
							cardData.type = ddz.DDZCardType.CARD_TYPE_FOUR;
						}else if((countSortedList[1].length == 0)&&(countSortedList[2].length == 1 )&&(countSortedList[4].length == 0)){
							let cInfo2:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(countSortedList[2][0], 2);
							cardData.cardCountList.push(cInfo2);
							count += 2;
							cardData.type = ddz.DDZCardType.CARD_TYPE_THREE_TWO;
						}else{
							cardData.type = ddz.DDZCardType.CARD_TYPE_THREE;
						}
					}
				}
			}
		}
		return count;
	}

	export function pushDoubleList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData, isGuanPai:boolean){
		let count:number = 0;
		let allNumList:number[] = [];
		for (let i = 2; i < 5; i++){
			let tempCountList:number[] = countSortedList[i];
			let jlength = tempCountList.length;
			for (let j = 0; j<jlength; j++){
				let num:number = tempCountList[j];
				allNumList.push(num);
			}
		}
		allNumList.sort(ddz.compareCardNumAsc);
		if (allNumList.length> 0){
			let linkList:number[] = ddz.findMaxLink(allNumList);
			let size = linkList.length;
			if (size > 0){
				cardData.type = ddz.DDZCardType.CARD_TYPE_DOUBBLE;
				let sizecount:number = 0;
				if(isGuanPai)
					sizecount = 1;
				else
					sizecount = 2;
				if (size > sizecount){
					cardData.typeCount = size;
					for (let i = 0; i < size; i++){
						let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 2);
						cardData.cardCountList.push(cInfo);
						count += 2;
					}
				}else{
					cardData.typeCount = 1;
					let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[0], 2);
					cardData.cardCountList.push(cInfo);
					count += 2;
				}
			}
		}
		return count;
	}

	export function pushSingleList(countList:ddz.DDZCardCountInfo[], countSortedList:number[][], cardData:ddz.DDZCardData){
		let count:number = 0;
		let allNumList:number[] = [];
		for (let i = 1; i < 5; i++){
			let tempCountList:number[] = countSortedList[i];
			let jlength = tempCountList.length;
			for (let j = 0; j<jlength; j++){
				let num:number = tempCountList[j];
				allNumList.push(num);
			}
		}
		allNumList.sort(ddz.compareCardNumAsc);
		if (allNumList.length> 0){
			let linkList:number[] = ddz.findMaxLink(allNumList);
			let size = linkList.length;
			if (size > 0){
				cardData.type = ddz.DDZCardType.CARD_TYPE_SINGLE;
				if (size > 4){
					cardData.typeCount = size;
					for (let i = 0; i < size; i++){
						let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[i], 1);
						cardData.cardCountList.push(cInfo);
						count += 1;
					}
				}else{
					cardData.typeCount = 1;
					let cInfo:ddz.DDZCardCountInfo = new ddz.DDZCardCountInfo(linkList[0], 1);
					cardData.cardCountList.push(cInfo);
					count += 1;
				}
			}
		}
		return count;
	}

	export function findCardListByCountInfo(countList:ddz.DDZCardCountInfo[], cardList:number[], resultList:number[]){
		resultList = [];
		console.log("findCardListByCountInfo::get card");
		countList.sort(ddz.compareCardCountInfo);
		let countListLength:number = countList.length;
		let cardListLength:number = cardList.length;
		let resultListLegth:number = resultList.length;
		for (let i = 0; i < countListLength; i++){
			let cardCount:ddz.DDZCardCountInfo = countList[i];
			let count:number = 0;
			for (let j = 0; j < cardListLength; j++){
				let cardCode:number = cardList[j];
				if(ddz.getCardNum(cardCode) == cardCount.num){
					let flag:boolean = false;
					for (let k = 0; k < resultListLegth; k++){
						let element:number = resultList[k];
						if (element == cardCode){
							flag = true;
							break;
						}
					}
					if (flag){
						continue;
					}
					count++;
					let num:number = cardCode;
					resultList.push(num);
					if (count == cardCount.count){
						break;
					}
				}
			}
		}
		console.log("sort card");
	}

	export function findMaxLink(numList:number[]):number[]{
		let resultList:number[] = [];
		let max:number = 1;
		let startIndex:number = 0;
		let length:number = numList.length;
		let isEnd:boolean = false;
		let erhaslink:boolean = false;//是否二可以进行连续
		let yihaslink:boolean = false;//是否一可以进行连续
		// if(ddz.MAHJONG_OPERTAION_GUAN){
		// 	for(let i = 0;i < length;i++){
		// 		if(numList[i] == ddz.DDZCardCode.C2)
		// 			erhaslink = true;
		// 		if(numList[i] == ddz.DDZCardCode.CA)
		// 			yihaslink = true;
		// 	}
		// }

		for (let i = 0; i < length; i++){
			let start = numList[i];
			let curNum = start;
			for (let j = i + 1; j < length; j++){
				if (curNum + 1 == numList[j] && curNum < ddz.DDZCardCode.CA){
					curNum = numList[j];
					//连续
					if(curNum == ddz.DDZCardCode.C3 && erhaslink){
						if(yihaslink){
							if (max < j - i+1+1+1){
								max = j - i+1+1+1;
								startIndex = i;
							}
						}else if (max < j - i+1+1){
							max = j - i+1+1;
							startIndex = i;
						}
					}else if (max < j - i+1){
						max = j - i+1;
						startIndex = i;
					}
				}else{
					i = j - 1;
					break;
				}
				isEnd = (j == length - 1);
			}
			if (isEnd)break;
		}
		resultList = [];
		console.log("findMaxLink::length=%d,start=%d,max=%d", length, startIndex, max);
		let once:boolean = false;
		for (let i = 0; i < max; i++){
			if(erhaslink&&numList[startIndex] == ddz.DDZCardCode.C3){
				if(yihaslink&&!once){
					resultList.push(ddz.DDZCardCode.CA);
				}
				if(!once){
					resultList.push(ddz.DDZCardCode.C2);
				}
				resultList.push(numList[i+startIndex]);
				once = true;
			}else {
				resultList.push(numList[i+startIndex]);
			}
		}
		return resultList;
	}
}