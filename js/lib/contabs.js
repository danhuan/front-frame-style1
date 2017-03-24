function Contabs() {};
Contabs.prototype = {

    /*菜单生成功能,传入json对象menus*/
    Menu: function(menus) {
        var html = '';
        for (var i = 0; i < menus.length; i++) {
            var tmenu = menus[i];
            //默认为active
            if (tmenu.state == "active") {
                html += '<li class="active">';
                
            } else {
                html += '<li class="">';
            }
            //
            if (tmenu.url != undefined) {
                html += '<a href="'+tmenu.url+'" class="J_menuItem group-title">';
            } else {
                html += '<a class="group-title">';
            }

            
            html += '<i class="fa ' + tmenu.cssClass + '"></i><span class="nav-label">' + tmenu.name + '</span>';
            if (tmenu.items != undefined) {
                html += '<i class="fa fa-angle-left arrow"></i>';
            } else {
                //无二级菜单
                html += '';
            }
            html += '</a>';
            if (tmenu.items != undefined) {
                html += '<ul class="nav nav-second-level">';

                for (var x = 0; x < tmenu.items.length; x++) {
                    var menu = tmenu.items[x];
                    html += '<li><a class="J_menuItem" href="' + menu.url + '">' + menu.name + '</a></li>';
                }

                html += '</ul>';
            } else {
                html += '';
            }
            html += '</li>';

        }
        //$('.j-side-menu>li:not(.nav-header)').html("");
        $('.j-side-menu').append(html);
        
        $('.j-side-menu li.active .group-title').addClass('current');

        $(".J_menuItem").on("click", contabs.NewIframe);
        $(".J_tabShowActive").on("click", contabs.RollActive); //定位当前选项
        $(window).on("resize", contabs.RollActive); //屏幕变化定位当前选项

        $(".J_menuItem").each(function(k) {
            if (!$(this).attr("data-index")) {
                $(this).attr("data-index", k);
            }
        });
        $(".J_menuTabs").on("click", ".J_menuTab i", contabs.DoIframe);
        $(".J_menuTabs").on("click", ".J_menuTab", contabs.ShowIframe);
        $(".J_menuTabs").on("dblclick", ".J_menuTab", contabs.IframeSrc);
        $(".J_tabLeft").on("click", contabs.TabsPrev);
        $(".J_tabRight").on("click", contabs.TabsNext);
        $(".J_tabCloseOther").on("click", contabs.tabCloseOther);
        $(".J_tabCloseAll").on("click", contabs.tabCloseAll);
    },


    //OuterWidth(l):返回所有匹配元素外部宽度和（默认包括补白和边框）。
    OuterWidth: function(l) {
        var k = 0;
        $(l).each(function() {
            k += $(this).outerWidth(true);
        });
        return k;
    },

    TabRoll: function(n) {
        var o = contabs.OuterWidth($(n).prevAll()),
            q = contabs.OuterWidth($(n).nextAll());
        var l = contabs.OuterWidth($(".content-tabs").children().not(".J_menuTabs")); //获取工具按钮的总宽度
        var k = $(".content-tabs").outerWidth(true) - l; //nav.J_menuTabs的可占宽度
        var p = 0;
        if ($(".page-tabs-content").outerWidth() < k) {
            p = 0;
        } else {
            if (q <= (k - $(n).outerWidth(true) - $(n).next().outerWidth(true))) {
                if ((k - $(n).next().outerWidth(true)) > q) {
                    p = o;
                    var m = n;
                    while ((p - $(m).outerWidth()) > ($(".page-tabs-content").outerWidth() - k)) {
                        p -= $(m).prev().outerWidth();
                        m = $(m).prev();
                    }
                }
            } else {
                if (o > (k - $(n).outerWidth(true) - $(n).prev().outerWidth(true))) {
                    p = o - $(n).prev().outerWidth(true);
                }
            }
        }
        $(".page-tabs-content").animate({
            marginLeft: 0 - p + "px"
        }, "fast");
    },

    RollActive: function() {
        contabs.TabRoll($(".J_menuTab.active"));
    },

    //选项卡向左滚动
    TabsPrev: function() {
        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
        var l = contabs.OuterWidth($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").width() < k) {
            return false;
        } else {
            var m = $(".J_menuTab:first");
            var n = 0;
            while ((n + $(m).outerWidth(true)) <= o) {
                n += $(m).outerWidth(true);
                m = $(m).next();
            }
            n = 0;
            if (contabs.OuterWidth($(m).prevAll()) > k) {
                while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
                    n += $(m).outerWidth(true);
                    m = $(m).prev();
                }
                p = contabs.OuterWidth($(m).prevAll());
            }
        }
        $(".page-tabs-content").animate({
            marginLeft: 0 - p + "px"
        }, "fast");
    },

    //选项卡向右滚动
    TabsNext: function() {
        var o = Math.abs(parseInt($(".page-tabs-content").css("margin-left")));
        var l = contabs.OuterWidth($(".content-tabs").children().not(".J_menuTabs"));
        var k = $(".content-tabs").outerWidth(true) - l;
        var p = 0;
        if ($(".page-tabs-content").width() < k) {
            return false;
        } else {
            var m = $(".J_menuTab:first");
            var n = 0;
            while ((n + $(m).outerWidth(true)) <= o) {
                n += $(m).outerWidth(true);
                m = $(m).next();
            }
            n = 0;
            while ((n + $(m).outerWidth(true)) < (k) && m.length > 0) {
                n += $(m).outerWidth(true);
                m = $(m).next();
            }
            p = contabs.OuterWidth($(m).prevAll());
            if (p > 0) {
                $(".page-tabs-content").animate({
                    marginLeft: 0 - p + "px"
                }, "fast");
            }
        }
    },


    NewIframe: function() {
        var o = $(this).attr("href"),
            m = $(this).data("index"),
            l = $.trim($(this).text()),
            k = true;
        //改变样式
        $('.J_menuItem').removeClass('current');
        $(this).addClass('current');

        if (o == undefined || $.trim(o).length == 0) {
            return false;
        }
        $(".J_menuTab").each(function() {
            if ($(this).data("id") == o) {
                if (!$(this).hasClass("active")) {
                    $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
                    contabs.TabRoll(this);
                    $(".J_mainContent .J_iframe").each(function() {
                        if ($(this).data("id") == o) {
                            $(this).show().siblings(".J_iframe").hide();
                            return false;
                        }
                    });
                }
                k = false;
                return false;
            }
        });
        if (k) {
            var p = '<a href="javascript:;" class="active J_menuTab" data-id="' + o + '">' + l + ' <i class="fa fa-times-circle fa-lg"></i></a>';
            $(".J_menuTab").removeClass("active");
            var n = '<iframe class="J_iframe" name="iframe' + m + '" width="100%" height="100%" src="' + o + '" frameborder="0" data-id="' + o + '" seamless></iframe>';
            $(".J_mainContent").find("iframe.J_iframe").hide().parents(".J_mainContent").append(n);
            $(".J_menuTabs .page-tabs-content").append(p);
            contabs.TabRoll($(".J_menuTab.active"));
        }
        return false;
    },


    DoIframe: function() {
        var m = $(this).parents(".J_menuTab").data("id");
        var l = $(this).parents(".J_menuTab").width();
        if ($(this).parents(".J_menuTab").hasClass("active")) {
            if ($(this).parents(".J_menuTab").next(".J_menuTab").size()) {
                var k = $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").data("id");
                $(this).parents(".J_menuTab").next(".J_menuTab:eq(0)").addClass("active");
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".J_iframe").hide();
                        return false;
                    }
                });
                var n = parseInt($(".page-tabs-content").css("margin-left"));
                if (n < 0) {
                    $(".page-tabs-content").animate({
                        marginLeft: (n + l) + "px"
                    }, "fast");
                }
                $(this).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false;
                    }
                });
            }
            if ($(this).parents(".J_menuTab").prev(".J_menuTab").size()) {
                var k = $(this).parents(".J_menuTab").prev(".J_menuTab:last").data("id");
                $(this).parents(".J_menuTab").prev(".J_menuTab:last").addClass("active");
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == k) {
                        $(this).show().siblings(".J_iframe").hide();
                        return false;
                    }
                });
                $(this).parents(".J_menuTab").remove();
                $(".J_mainContent .J_iframe").each(function() {
                    if ($(this).data("id") == m) {
                        $(this).remove();
                        return false;
                    }
                });
            }
        } else {
            $(this).parents(".J_menuTab").remove();
            $(".J_mainContent .J_iframe").each(function() {
                if ($(this).data("id") == m) {
                    $(this).remove();
                    return false;
                }
            });
            contabs.TabRoll($(".J_menuTab.active"));
        }
        return false;
    },


    //关闭其他选项卡
    tabCloseOther: function() {
        $(".page-tabs-content").children("[data-id]").not(":first").not(".active").each(function() {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
            $(this).remove();
        });
        $(".page-tabs-content").css("margin-left", "0");
    },


    ShowIframe: function() {
        if (!$(this).hasClass("active")) {
            var k = $(this).data("id");
            $(".J_mainContent .J_iframe").each(function() {
                if ($(this).data("id") == k) {
                    $(this).show().siblings(".J_iframe").hide();
                    return false;
                }
            });
            $(this).addClass("active").siblings(".J_menuTab").removeClass("active");
            contabs.TabRoll(this);
        }
    },


    IframeSrc: function() {
        var l = $('.J_iframe[data-id="' + $(this).data("id") + '"]');
        var k = l.attr("src");
        console.log(k);
    },

    /*关闭所有标签,除了首页*/
    tabCloseAll: function() {
        $(".page-tabs-content").children("[data-id]").not(":first").each(function() {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').remove();
            $(this).remove();
        });
        $(".page-tabs-content").children("[data-id]:first").each(function() {
            $('.J_iframe[data-id="' + $(this).data("id") + '"]').show();
            $(this).addClass("active");
        });
        $(".page-tabs-content").css("margin-left", "0");
    }
};

//生成FunManage类实例
var contabs = null;
jQuery(document).ready(function() {
    contabs = new Contabs();
});
