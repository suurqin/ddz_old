// TypeScript file
//转换在这里
namespace gmConvert {
    
    //方位转换
    export class getPosition {
        public static getPos(pos, type) {
            var upPos = 4;
            var oppositePos = 4;
            var downPos = 4;
            var mySeatIndex = manager.global.mPlayer.tablePos;
            if (type == 4) {
                upPos = (mySeatIndex + 3) % 4;
                oppositePos = (mySeatIndex + 2) % 4;
                downPos = (mySeatIndex + 1) % 4;
            } else if (type == 3) {
                oppositePos = (mySeatIndex + 2) % 3;
                downPos = (mySeatIndex + 1) % 3;
            } else {
                oppositePos = (mySeatIndex + 1) % 2;
            }

            if (pos == mySeatIndex)
                return Constant.position.EPT_MYSELF;
            else if (pos == downPos)
                return Constant.position.EPT_DOWN;
            else if (pos == oppositePos)
                return Constant.position.EPT_OPPISITE;
            else if (pos == upPos)
                return Constant.position.EPT_UP;
            else
                return Constant.position.ERROR;
        }
        
    }
}