// TypeScript file
class MyBitmapText extends egret.DisplayObjectContainer {

    private mj_table_score : egret.BitmapFont = null;

    
    private initText(fontUrl : string, tFont : egret.BitmapFont) {
        if(tFont != null){
            let onLoadFonts = function(font : egret.BitmapFont){
                tFont = font;
            }
            RES.getResByUrl(fontUrl, onLoadFonts, this,
                RES.ResourceItem.TYPE_FONT);
        }
    }


}