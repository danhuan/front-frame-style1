/*  使用说明:
 1 css样式在commom.css样式表中  ==信息提示tip 样式==
 <link href="../css/common.css" rel="stylesheet">
 2 在*.html文件中引用该js文件
 <script src="../js/msg-tip.js"></script>
 3 引用方法: msgtip.addTi(type,msg);
 例如:     msgtip.addTip('success','网络连接成功!');
 msgtip.addTip('error','网络连接失败!');
 */

function MsgTip() {};
MsgTip.prototype = {
    addTipTop: function(type, msg, top ) { //type的取值有success/error
        var time = new Date().getTime();
        var html = '';
        html += '<div id="' + time + '" class="msgtip animated fadeInDownBig">';
        html += '<span class="msgtip-loader"></span>';
        html += '<span class="msgtip-close-btn">×</span>';
        html += '<h2 class="msgtip-heading"></h2>';
        html += '<p>' + msg + '</p>';
        html += '</div>';
        $('body').append(html);
        $('.msgtip').css('top',top);
        if (type == 'success') {
            $('#' + time + '.msgtip').addClass('js-success-msgtip');
            //$('h2.tip-heading').append('<span class="fa fa-check-circle"></span>');
            /*console.log("success!");*/

        } else if (type == 'error') {
            $('#' + time + '.msgtip').addClass('js-error-msgtip');
            //$('h2.tip-heading').append('<span class="fa fa-times-circle"></span>');
            /*  console.log("error!");*/

        } else {
            console.log('调用msgtip()函数参数可能有错,请检查')
        }

        setTimeout(function() {
            $('#' + time + ' .msgtip-loader').addClass('msgtip-loaded');
        }, 1);
        setTimeout(function() {
            $('#' + time + '.msgtip').remove();
        }, 3000);

        $('#' + time + ' .msgtip-close-btn').click(function() {
            $('#' + time + '.msgtip').remove();
        });
    },

    addTip: function(type, msg ) { //type的取值有success/error
        var time = new Date().getTime();
        var html = '';
        html += '<div id="' + time + '" class="msgtip animated fadeInDownBig">';
        html += '<span class="msgtip-loader"></span>';
        html += '<span class="msgtip-close-btn">×</span>';
        html += '<h2 class="msgtip-heading"></h2>';
        html += '<p>' + msg + '</p>';
        html += '</div>';
        $('body').append(html);
        if (type == 'success') {
            $('#' + time + '.msgtip').addClass('js-success-msgtip');
            //$('h2.tip-heading').append('<span class="fa fa-check-circle"></span>');
            /*console.log("success!");*/

        } else if (type == 'error') {
            $('#' + time + '.msgtip').addClass('js-error-msgtip');
            //$('h2.tip-heading').append('<span class="fa fa-times-circle"></span>');
            /*  console.log("error!");*/

        } else {
            console.log('调用msgtip()函数参数可能有错,请检查')
        }

        setTimeout(function() {
            $('#' + time + ' .msgtip-loader').addClass('msgtip-loaded');
        }, 1);
        setTimeout(function() {
            $('#' + time + '.msgtip').remove();
        }, 3000);

        $('#' + time + ' .msgtip-close-btn').click(function() {
            $('#' + time + '.msgtip').remove();
        });
    },

};

//生成FunManage类实例
var msgtip = null;
jQuery(document).ready(function() {
    msgtip = new MsgTip();
    //引用方法
    //msgtip.addTip('success', '网络连接成功!'); //type的取值有success / error 两种取值
    //msgtip.addTip('error','网络连接失败!');

});
