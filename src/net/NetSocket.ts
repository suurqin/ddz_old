namespace net {
    export class NetSocket {

        public constructor(ip: string, port: number, id: number, flag: number) {
            this.ip = ip;
            this.port = port;
            this.socketId = id;
            this.flag = flag;
            this.initWebSocket();
        }

        //socket
        private socket: egret.WebSocket;
        /**服务器ip */
        private ip: string;
        /** 端口*/
        private port: number;

        private onConnect: Function;

        private socketId: number;

        private flag: number;

        /**初始化socket*/
        private initWebSocket(): void {
            //创建 WebSocket 对象
            this.socket = new egret.WebSocket();
            //设置数据格式为二进制，默认为字符串
            this.socket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            //添加链接打开侦听，连接成功会调用此方法
            this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //连接服务器

        }
        /**socket 连接 */
        public connect(fn: Function): void {
            this.onConnect = fn;
            this.socket.connect(this.ip, this.port);
        }
        /**发送数据 */
        private sendBinary(byte): void {
            egret.log(byte);
            this.socket.writeBytes(byte, 0, byte.bytesAvailable);
        }

        /**发送数据 */
        public sendData(data): void {
            egret.log(data);
            var bytes = ProtoMgr.getInstance().encodeData(data.msgCMD, data);
            var sendData = new egret.ByteArray(bytes);
            this.sendBinary(sendData);
        }
        /**开启连接回调*/
        private onSocketOpen(): void {
            egret.log("WebSocketOpen");

            if (this.onConnect) {
                this.onConnect();
            }
        }
        /**关闭链接回调*/
        private onSocketClose(): void {
            egret.log("WebSocketClose");
        }
        /**错误回调 */
        private onSocketError(): void {
            egret.log("WebSocketError");
        }
        /**接收数据回调 */
        private onReceiveMessage(e: egret.Event): void {
            //1.创建 ByteArray 对象
            var byte: egret.ByteArray = new egret.ByteArray();
            //2.读取数据
            this.socket.readBytes(byte);
            //3.获取cmd
            var cmd = byte.readInt();
            var event = cmd + ""
            //4.解码...
            // if (this.flag != 0) {
                event = "0x" + cmd.toString(16) + "_" + this.flag;
            // }
            var msg = ProtoMgr.getInstance().decodeData(event, byte);
            //5.回调
            var handler: Function = manager.Global.handlerMgr.getHandler(this.socketId, cmd);

            if (handler) {
                egret.log("服务器返回消息：" + event )
                handler(this.socketId, msg);
            } else {
                egret.log("服务器返回消息：" + event + "没有注册回调函数！！")
            }
        }
        /**关闭socket */
        public close() {
            console.log("关闭socket")
            this.socket.close();
        }
    }
}