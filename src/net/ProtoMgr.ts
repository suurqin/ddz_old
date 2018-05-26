namespace net {
	export class ProtoMgr {
		public constructor() {
			this.init();
		}
		
        private protoFileMap={};
        private netMessageMap={};
        private packageMap={};
        private cmdMap={};
        private cmdStrMap={};
		private conf = ProtoConf.confMj.concat(ProtoConf.confLobby, ddz.DDZProtoConf.conf);

		private static instance:ProtoMgr;

		public static getInstance():ProtoMgr{
			if(!this.instance){
				this.instance = new ProtoMgr();
			}
			return this.instance;
		}

		private init(){
			egret.log("消息数量："+this.conf.length + "   ----大厅服消息数量：" + ProtoConf.confLobby.length + "   ----麻将服消息数量：" + ProtoConf.confMj.length + "   ----斗地主消息数量：" + ddz.DDZProtoConf.conf.length);
			for(var i = 0; i < this.conf.length ; i++ ){
				this.protoFileMap[this.conf[i].cmd] = this.conf[i].fileName;
				this.netMessageMap[this.conf[i].cmd] = this.conf[i].messageName;
				this.packageMap[this.conf[i].cmd] =this.conf[i].package;
			}
		}
		/**发送数据编码 */
		public encodeData(cmd,msg){
			var cmdBuf = net.CodeUtils.int2ByteArray(cmd);
			var buffer = this.encodeObject(cmd ,msg)

			var dataBuf = new Uint8Array(buffer);

			var allBuff = new Uint8Array(cmdBuf.length+dataBuf.length);
			var allIndex = 0;
			for(var i = 0 ; i < cmdBuf.length ; i++,allIndex++ ){
				allBuff[allIndex] = cmdBuf[i];
			}
			for(var i = 0 ; i < dataBuf.length ; i++,allIndex++ ){
				allBuff[allIndex] = dataBuf[i];
			}
			
			return allBuff;
		}
		/**接受数据解码 */
		public decodeData(cmd ,uint8ArrayNew){
			var msg = null;
			var allBuf = uint8ArrayNew.bytes;
			var dataBuf = allBuf.subarray(4,allBuf.length);
			msg = this.decodeBuffer(cmd,dataBuf);
			return msg;
		}

		public hexToString(x):string{
		
			return "0x"+x.toString(16);
	　　}
		/**
		* 将js对象转成protobuf的二进制数据
		* msgName 对应proto里面的消息名称
		* obj是msgName对应的js对象
		**/
		private encodeObject(msgCmd, obj):ArrayBuffer{
			// if(obj.flag){
				msgCmd = this.hexToString(msgCmd)+"_"+obj.flag;
			// }
			delete obj.flag;
			var fileName = this.protoFileMap[msgCmd];
			var pkgName = this.packageMap[msgCmd];
			var msgName = this.netMessageMap[msgCmd];
			var file = RES.getRes(fileName);
			var builder = dcodeIO.ProtoBuf.loadProto(file);
			var pbc = builder.build(pkgName);

			var buffer;
			try {
				var msgObj = new pbc[msgName](obj);
				buffer = msgObj.encode().toBuffer();
				return buffer;
			} catch (e) {
				egret.log(e);
			}
			return buffer;
		}
		/**
		* 将protobuf的二进制数据 转成js对象
		* msgName 对应proto里面的消息名称
		* buffer
		**/
		private decodeBuffer(msgCmd, buffer ){
			var msgName = this.netMessageMap[msgCmd];
			var fileName = this.protoFileMap[msgCmd];
			var file = RES.getRes(fileName);
			var builder = dcodeIO.ProtoBuf.loadProto(file);
			var pbc = builder.build(this.packageMap[msgCmd]);
			
			try {
				var message = pbc[msgName].decode(buffer)
				return message;
			} catch (e) {
				console.log(e);
				return {};
			}
		}
	}
}