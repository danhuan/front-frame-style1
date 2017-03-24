/**
 * 初始化 
 */
$(function() {
	//获取验证码
    refreshValCode();
	/*获取验证码事件*/
    $('.btn-valCode').click(function() {
    	refreshValCode();
    });
    /*获取登录事件*/
    $('.btn-submit').click(function() {
    	login();
    });
    /**
     * 监听enter事件
     */
    $('body').keydown(function(event){
		if(event.keyCode==13){   
			login();
		}
	});
});

/**
 * 刷新验证码
 * @returns
 */
function refreshValCode() {
	var obj = document.getElementById("valCodeImg");
	obj.src = contextPath + '/web/home.do?action=valCode&math='+Math.random();
}

/**
 * 登陆
 */
function login(){
	
	var account = jQuery('#account').val();
	var password = jQuery('#password').val();
	var valCode = jQuery('#valCode').val();
	
	var params = new Object();
	params.url = contextPath + '/web/home.do?action=login' ;
	params.data = '&account=' + account + '&password=' + password+ '&valCode=' + valCode ;
	params.loading = false;
	params.callback = function(data) {
		if(data) {
	        if(data.success){
	        	jQuery.mapout.form.replace(contextPath +'/web/main.do?action=index','');
	        }else{
	        	//加载验证码
	    		refreshValCode();
	        	$('#password').val("");
	        	$('#valCode').val("");
	        	msgtip.addTip("error",data.message);
	        } 
		} else {
			msgtip.addTip("error",'未知异常！');
		}
	};		
	jQuery.mapout.ajax.req(params) ;	
}