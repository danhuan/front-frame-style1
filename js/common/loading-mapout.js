/*=========== 加载loading蒙版动画 by danhuan 2016/8/18 14:00

消息提示需要引用msg-tip.js
使用方法:
	1.消息提示需要引用 msg-tip.js 
		msgtip.addTip('error','数据加载超时!');
	2.引用该插件loading-mapout.js  
	3.准备好 加载动图.gif ,在该插件 loading-mapout.js 可以修改图片路径
		<img class="loading-img" src="../../images/common/loading.gif" alt="loading.gif">
	4.调用方法
	loading.show();  //显示  加载loading ,没有传入时间参数,默认10s自动隐藏
	loading.show(5000); //传入时间参数,自定义隐藏时间
    loading.hide();  //隐藏  加载loading

    注:项目中,一般把该插件的引用放在外框架中,
    iframe页面调用loading方法时用 
    window.top.loading.show();
    window.top.loading.hide();

*/


var timeoutloading;
function Loading() {};
Loading.prototype = {
	init: function() {
		var html = '';
		html += '<div class="cover loading">';
		html += '<img class="loading-img" src="../img/loading-mapout.gif" alt="loading.gif">';
		html += '</div>';
		$('body').append(html);
		$('.cover.loading').css({
			"display": "none",
			"position": "fixed",
			"left": "0",
			"right": "0",
			"top": "0",
			"bottom": "0",
			"background-color": "#fff",
			"opacity": "0.7",
			"filter": "alpha(opacity=80)",
			"z-index": "100000000000000000000000000"
		})
		$('.cover.loading .loading-img').css({
			"position": "absolute",
			"top": "35%",
			"left": "45%"
		})
	},
	// 显示  加载loading
	
	show: function(time) {
		$('.cover.loading').fadeIn("fast");
		if (time == null) {
			// 无传参数  超时隐藏
			timeoutloading = setTimeout(loading.timeouthide, 30000);
		} else {
			// 有传时间参数  超时隐藏
			timeoutloading = setTimeout(loading.timeouthide, time);
		}
	},

	// 隐藏  加载loading
	hide: function() {
		$('.cover.loading').fadeOut("fast");
		clearTimeout(timeoutloading);

	},

	//隐藏loading并提醒超时
	timeouthide: function() {
		loading.hide();
		msgtip.addTip('error', '数据加载超时!'); //需要引用msg-tip.js
	}
}

//生成FunManage类实例
var loading = null;
jQuery(document).ready(function() {
	loading = new Loading();
	loading.init(); //初始化
	//引用方法
	//loading.show();    //显示  加载loading
	//loading.hide();  // 隐藏  加载loading

});