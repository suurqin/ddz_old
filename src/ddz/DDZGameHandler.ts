namespace ddz {

    // 斗地主游戏服消息处理逻辑类
    export class DDZGameMsgProcess {

        // 进入游戏
        public static requestStartGameMsgAck: Function = (socketId, msg) => {

            console.log("--------断线重连处理逻辑--------");
            if(msg == null){
                return;
            }
            sceneMgr.runScene.loadingAniHide();

            // 房卡不足
            if (msg.result == ddz.StartGameResultType.FANGKA_NOT_FOUND) {
                
            }
            // 金币低于下限
            else if (msg.result == ddz.StartGameResultType.GOLD_LOW_THAN_MIN_LIMIT) {
                
            }
            // 金币高于上限
            else if (msg.result == ddz.StartGameResultType.GOLD_HIGH_THAN_MAX_LIMIT) {
                
            }
            // 可以进入VIP房间,在这进入创建vip房间
            else if (msg.result == ddz.StartGameResultType.CAN_ENTER_VIP_ROOM) {
                
    
            }
            // vip桌子已经满座了
            else if (msg.result == ddz.StartGameResultType.VIP_TABLE_IS_FULL) {
                
            }
            // VIP桌子已经结束了
            else if (msg.result == ddz.StartGameResultType.VIP_TABLE_IS_GAME_OVER) {
                
            }
            // 正在游戏中不能进入其他房间
            else if (msg.result == ddz.StartGameResultType.IS_PLAYING_CAN_NOT_ENTER_ROOM) {
                
            }

            if (msg.result != Constant.CenterControl.CMD_EXE_OK) return;

            // 进入房间成功
            let roomId = msg.roomID;
            let gameRoom:ddz.GameRoom = ddz.getGameRoomByRoomId(roomId);
            let roomType = gameRoom.roomType;
            // appGetGlobal()->gameType = roomType;
	        // appGetGlobal()->setEnterSetFromGame(true);

            switch (roomType) {
                case ddz.DDZRoomType.GAME_TYPE_SDY:
                {
                    console.log("GAME_TYPE_SDY");
                    break;
                }
                case ddz.DDZRoomType.GAME_TYPE_DDZ:
                {
                    console.log("GAME_TYPE_DDZ");
                    // 2020-2030 二人斗地主
                    if (roomId >= ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_MIN && roomId < ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_MAX)
                    {
                        break;
                    } 
                    // 2030-2040 关牌
                    else if (roomId >= ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_MAX && roomId < ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_GUANMAX)
                    {
                        break;
                
                    } 
                    // 2110-2120 关牌
                    else if (roomId >= ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_GUANNORMALSTR && roomId < ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_GUANNORMALEND)
                    {
                        break;
                    }
                    // 2100-2110 二人斗地主
                    else if (roomId >= ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_DDZNORMALSTR && roomId < ddz.DDZRoomType.ERREN_DDZ_ROOM_ID_DDZNORMALEND)
                    {
                        break;
                    }
                    // 三人斗地主
                    else
                    {
                        break; 
                    }
                }
                default:{
                    break;
                }
            }

            sceneMgr.runScene.loadScene(sceneMgr.TAG_DDZ_SCENE);
            let ddzRoomScene = <ddz.DDZRoomScene>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_DDZ_SCENE);
            ddzRoomScene.initTable(msg);
        }

        // 进入游戏
        public static gameStartMsg: Function = (socketId, msg) => {

            console.log("--------开始游戏--------");
            
        }

        // 操作结果
        public static ddzGameOpertaionAckMsg: Function = (socketId, msg) => {

            let ddzRoomScene:ddz.DDZRoomScene = <ddz.DDZRoomScene>sceneMgr.runScene.getRunSceneByTag(sceneMgr.TAG_DDZ_SCENE);
            let operationMsg:ddz.DDZGameOpertaionAckMsg = <ddz.DDZGameOpertaionAckMsg>msg;
            let operationId = ddz.PlayerOperationType;
            if (ddzRoomScene == null || operationMsg == null) return;

            // 发牌
            if (msg.operation == operationId.SEND_CARD) {
                console.log("DDZGameOpertaionAckMsg-----发牌");
                ddzRoomScene.operationSendCard(operationMsg);
                
            }
            // 叫地主
            else if (msg.operation == operationId.CALL_LANDLORD) {
                console.log("DDZGameOpertaionAckMsg-----叫地主");
                ddzRoomScene.operationCallLandLord(operationMsg);
           
            }
            // 出牌
            else if (msg.operation == operationId.PUSH_CARD) {
                console.log("DDZGameOpertaionAckMsg-----出牌");
                ddzRoomScene.operationPushCard(operationMsg);
           
            }
            // 明牌
            else if (msg.operation == operationId.BRIGHT_CARD) {
           
            }
            // 托管
            else if (msg.operation == operationId.AUTO) {
           
            }
            // 进入房间
            else if (msg.operation == operationId.ENTER_TABLE) {
           
            }
            // 离开房间
            else if (msg.operation == operationId.LEAVE_TABLE) {
           
            }
            // 叫完地主开始打牌
            else if (msg.operation == operationId.START_PUSH_CARD) {
           
            }
            // 轮到xx叫地主
            else if (msg.operation == operationId.NEXT_CALL_LANDLORD) {
                console.log("DDZGameOpertaionAckMsg-----轮到xx叫地主");
                ddzRoomScene.operationNextCallLandLord(operationMsg);
           
            }
            // 下一个出牌的人
            else if (msg.operation == operationId.NEXT_PUSH_CARD) {
           
            }
            // 结算
            else if (msg.operation == operationId.GAME_OVER_CAL) {
           
            }
            // 取消托管
            else if (msg.operation == operationId.CANCEL_AUTO) {
           
            }
            // 断线重连
            else if (msg.operation == operationId.RECOVER) {
           
            }
            // 玩家加倍
            else if (msg.operation == operationId.DOUBLE_PIE) {
           
            }
            // 开始加倍阶段
            else if (msg.operation == operationId.START_DOUBLE_PIE) {
           
            }
            
        }
    }
}