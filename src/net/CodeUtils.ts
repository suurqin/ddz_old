namespace net {
	export class CodeUtils {
		/**int转byte[]方法 */
		public static int2ByteArray(i) {
			var buf = new Uint8Array(4);  
			buf[0] = i >> 24;
			buf[1] = i >> 16;
			buf[2] = i >> 8;  
			buf[3] = i;
			return buf;  
		}
		/**byte[]转int方法 */
		public static byteArray2Int(cmdBuf){
			var cmd = (cmdBuf[3] & 0xff) 
				| ((cmdBuf[2] << 8) & 0xff00) 
				| ((cmdBuf[1] << 16) & 0xff0000) 
				| ((cmdBuf[0] << 24) & 0xff000000) ;
			return cmd;
		}

		/**short转byte[]方法 */
		public static short2ByteArray(i) {
			var buf = new Uint8Array(2);  
			buf[0] = i >> 8;  
			buf[1] = i;
			return buf;  
		}
		/**byte[]转short方法 */
		public static byteArray2Short(cmdBuf){
			var cmd = (cmdBuf[1] & 0xff) | ((cmdBuf[0] << 8) & 0xff00) ;
			return cmd;
		}
	}
}