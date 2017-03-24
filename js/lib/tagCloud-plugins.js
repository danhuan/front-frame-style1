/*云标签插件  2016.11.29*/
/*样式见layout.css中说"标签云  样式s"*/
/*数据格式:
 var data = [{
 "name":"菜单",
 "url":"http://sc.chinaz.com",
 "target":"_blank",
 "size":1
 },{
 "name":"浮动层",
 "url":"http://sc.chinaz.com",
 "target":"_blank",
 "size":8
 },{
 "name":"无缝滚动",
 "url":"http://sc.chinaz.com",
 "target":"_blank",
 "size":2
 }];

 调用方法:   tagcloud.creat(".ibox",data);  //参数:(容器,数据)
            tagcloud.url('tagIndex.html');//传入标签参数并跳转到参数页面


 */

function tagCloud() {
};
tagCloud.prototype = {
    creat: function (container, data) {
    	$(container).empty();
        var html = '';
        html += '<div class="taglist">';
        for (var i = 0; i < data.length; i++) {
            html += '<a target="' + data[i].target + '" class="size' + data[i].size + '">' + data[i].name + '</a>';
        }
        html += '</div>';
        $(container).append(html);
    },

    /*点击跳转到参数页面并传入点击的标签名*/
    url: function(url){
        $('.taglist a').on('click',function(){
            var tagName = $(this).text();
            window.location.href = ''+url+'?tagName=' + tagName ;
        });
    }






}
//生成FunManage类实例
var tagcloud = null;
$(function () {
    tagcloud = new tagCloud();
    //tagcloud.creat(".ibox", data);
    //tagcloud.url();
});

