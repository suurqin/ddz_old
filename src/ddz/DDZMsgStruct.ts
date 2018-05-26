namespace ddz {

    //游戏房间
    export class GameRoom {
        public roomID: number;
        public price: number;
        public minGold: number;
        public maxGold: number;
        public roomType: number;
        public playerNum: number;
        public fixedGold: number;
    }

    export class SimplePlayer {
        public playerID: string;
        public playerName: string;
        public headImg: number;
        public sex: number;
        public palyerIndex: number;
        public gold: number;
        public tablePos: number;
        public desc: string;
        public gameResult: number;
        public canFriend: number;
        public inTable: number;
        public zhuangCount: number;
        public winCount: number;
        public winGoldNum: number;
        public ip: string;
    }
    
    export class DDZGameOpertaionAckMsg {
        public playerID: string;
        public opertaionID: number;
        public cards: number[];
        public self_cards: number[];
        public tablePos: number;
        public callPoint: number;
        public multiPie: number;
        public playerIndex: number;
        public gold: number;
        public player0Card: number[];
        public player1Card: number[];
        public player2Card: number[];
        public player0Size: number;
        public player1Size: number;
        public player2Size: number;
        public winGold0: number;
        public winGold1: number;
        public winGold2: number;
        public winnerPos: number[];
        public losePos: number[];
        public isSpring: number;
        public isBright: string;
        public bombCount: string;
        public gameState: number;
        public brightPos: number[];
        public lordPos: number;
        public curreOpIndex: number;
        public lastPushPos: number;
        public lastPushCard: number[];
        public doublePie: number;
        public pieData: number;
        public quanCount: number;
        public double_follow: number;
        public double_pie_count: number;
        public countingCards: number[];
        public totalNum: number;
        public maxPie: number;
        public cardCounting: number;
        public player0TongCount: number;
        public player1TongCount: number;
        public player0BaoCount: number;
        public player1BaoCount: number;
        public player0AllScore: number;
        public player1AllScore: number;
        public winScore0: number;
        public winScore1: number;
        public roundScore0: number;
        public roundScore1: number;
    }
}