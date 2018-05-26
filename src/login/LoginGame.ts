// TypeScript file

class LoginGame extends eui.Component {

	public LoginGroup:eui.Group;    	 //登录界面
	public LoginAccountGroup:eui.Group;  //第二登录界面
	public LoginAccountBg :eui.Image;	 //登陆背景2
	public LoginBtn :eui.Button;	 	 //登录按钮 
	public FindPasswordBtn:eui.Button;   //找回密码按钮
	public QuickLoginBtn:eui.Button;	 //快速登录按钮
	public BackBtn:eui.Button;			 //返回按钮
    public KeepPassword:eui.CheckBox;	 //保存密码复选框
	public CountInput:eui.TextInput;	 //账号输入框
	public PasswordInput:eui.TextInput; //密码输入框
	public mc1:egret.MovieClip;			 //动画（测试）

	public LoginSelectGroup:eui.Group; 		 //第一登录界面
	public LoginSelectBg:eui.Image;		 //登录背景1
	public AccountBtn:eui.Button;		 //账号登录按钮
	public MinLoginBtn:eui.Button;		 //微信登录按钮
	public RadioCek:eui.CheckBox;		 //同意条约复选框
	public AgreeBtn:eui.Button;		 //查看条约按钮
	// public updateSocket : egret.WebSocket = new egret.WebSocket();
	// public centerSocket : egret.WebSocket = new egret.WebSocket();
	// public gameSocket : egret.WebSocket = new egret.WebSocket();
	

	public lobby:lobbyScene.LobbyMainLayer; 		//大厅

	public constructor(){
		super();
		//给当前场景添加皮肤
		this.skinName = "resource/my_skins/LoginGroup.exml";
		//给按钮添加回调函数
        this.LoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnclickLogin, this);
		this.FindPasswordBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnclickFindPassword, this);
		this.QuickLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnclickQuickLogin, this);
        this.BackBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.OnclickBack, this);
		this.MinLoginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnclcikMinLogin,this);
		this.AccountBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnclickAccount,this);
		this.AgreeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.OnclickAgreebtn,this);
		this.CountInput.text = "bisai000";
		this.PasswordInput.text = "123456";
	}


	//账号登录
	public OnclickAccount()
	{
		this.LoginSelectGroup.visible = false;

	}

	//微信登录
	public OnclcikMinLogin()
	{

	}


	//查看条约
	public OnclickAgreebtn()
	{

	}

	//登录
	public OnclickLogin()
	{
		//帐号登录
		manager.global.dUser = new manager.User();


		manager.global.dUser.account = this.CountInput.text;
		manager.global.dUser.password = this.PasswordInput.text;

		centerHdl.CenterLobbyHdl.login();
		
	}


	//找回密码
	public OnclickFindPassword()
	{
		
	}

	//快速登录
	public OnclickQuickLogin()
	{

	}


	//返回
	public OnclickBack()
	{
		this.LoginSelectGroup.visible = true;
		

	}

}