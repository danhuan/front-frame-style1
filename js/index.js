$(function() {
    //左侧滚动条优化,初始化代码
    function setScroll() {
        $(".j-side-menu").slimScroll({
            height: "100%",
            railOpacity: .4,
            wheelStep: 10
        });
    }
    setScroll();
    $(window).on("resize", setScroll);

    /*返回左侧导航栏初始化状态*/
    function NavbarSideInit() {
        $('.j-side-menu>li').removeClass('active');
        $('.group-title>.arrow').removeClass('fa-angle-down').addClass("fa-angle-left");
    }

    /*左侧导航展开事件*/
    $(".navbar-side").on("click", ".j-side-menu .group-title", function() {
        if (!$(this).parent().hasClass("active")) {
            NavbarSideInit();
            $(this).parent().addClass('active');
            $(this).children(".arrow").removeClass('fa-angle-left').addClass("fa-angle-down");

        } else if ($(this).next().is('ul')) {
            $(this).children(".arrow").removeClass('fa-angle-down').addClass("fa-angle-left");
            $(this).parent().removeClass('active');
        } else {
            console.log("没有二级菜单,不展开,不去除.active");
        }
    });

    /*收缩左侧导航栏为.mini-navbar事件*/
    $('.navbar-minimalize').click(function() {
        NavbarSideInit();
        $('.main').toggleClass('mini-navbar');
    });

    /*点击左侧导航展开,去除.mini-navbar,恢复正常左侧菜单事件*/
    $(".navbar-side").on("click", ".j-side-menu .group-title", function() {
        if ($('.main').hasClass('mini-navbar')) {
            $('.main').removeClass('mini-navbar');
        }
    });
    /**
     * 退出登录
     */
    $('.J_tabExit').click(function() {
    	logout();
    });
    /**
     * 监听enter事件
     */
    $('body').keydown(function(event){
		if(event.keyCode==13){   
			
		}
	});

    // 加载菜单
    contabs.Menu(visualMuneJson);
});

function initMenu(){
	
}
var visualMuneJson = [{
    "name": "仪表板",
    "cssClass": "fa-home",
    "state": "active",
    "url": contextPath+"/web/report/dashboard.do?action=index"

}, {
    "name": "人口统计",
    "cssClass": "fa-bar-chart",
    "url": contextPath+"/page/demographics/demographics.html",
}, {
    "name": "建筑",
    "cssClass": "fa-building-o",
    "items": [{
        "name": "建筑地理分布",
        "url": contextPath+"/web/report/build.do?action=buildMapCountry"
    }, {
        "name": "品牌统计",
        "url": contextPath+"/web/report/poi.do?action=brandTreemap"
    }, {
        "name": "学区房",
        "url": contextPath+"/page/building/schoolRoomMap.html"
    }, {
        "name": "地铁房",
        "url": contextPath+"/page/building/subwayRoomMap.html"
    }, {
        "name": "酒店分布",
        "url": contextPath+"/web/report/build.do?action=hotelDistribution"
    }, {
        "name": "公交线路图",
        "url": contextPath+"/page/building/busRouteMap.html"
    }]
}, {
    "name": "POI",
    "cssClass": "fa-map-marker",
    "items": [{
        "name": "标签分布",
        "url": contextPath+"/web/report/poi.do?action=tagPoi"
    }, {
        "name": "品牌分布",
        "url": contextPath+"/web/report/poi.do?action=brandPoi"
    }, {
        "name": "人均办公面积",
        "url": contextPath+"/page/poi/officeArea.html"
    }]
}, {
    "name": "行为",
    "cssClass": "fa-heartbeat",
    "items": [{
        "name": "社交指标",
        "url": contextPath+"/page/activity/socialIndex.html"
    }, {
        "name": "线下到访指标",
        "url": contextPath+"/page/activity/offlineVisitIndex.html"
    }]
}, {
    "name": "数据日历",
    "cssClass": "fa-calendar",
    "url": contextPath+"/page/dataCalender/dataCalender.html"
},{
    "name": "ETL任务管理",
    "cssClass": "fa-tasks",
    "items": [{
        "name": "计划中的任务",
        "url": contextPath+"/page/etl/planningTask.html"
    }, {
        "name": "运行中的任务",
        "url": contextPath+"/page/etl/runningTask.html"
    }, {
        "name": "编辑任务",
        "url": contextPath+"/page/etl/editTask.html"
    }]
}];

/**
 * 退出登录
 */
function logout(){
	jQuery.mapout.form.replace(contextPath +'/web/main.do?action=logout','');
}
