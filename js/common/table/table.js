function Table() {};
Table.prototype = {

	/*===================使表格每一列对齐th和td对齐=================*/
	init: function() {
		table.tableAlignment();
		// 点击选中行变成背景绿色
		$('.table-bbox table tr').click(function() {
			$('.table-bbox table tr').removeClass('success');
			$(this).addClass('success');
		});
	},


	//使每一列对齐th和td对齐
	tableAlignment: function() {
		//为了达到列对齐,设置tablehead的总宽度和tablebod的总宽度一致
		var w = $('.table-bbox > table').width();
		$('.table-hbox > table').width(w);
		//每一列头部和内容的宽度相同
		$("tbody tr:first-child td").each(function(index) {
			var tdwidth = $(this).outerWidth();
			$("thead .gheadrow th:eq(" + index + ")").outerWidth(tdwidth);
		});
	},



	/*=================分页工具条  begin==============*/
	//	分页工具条调用入口
	paginationInit: function(page, totalRows, pageSize,url) {
		/*this.page = page;
		this.totalRows=totalRows;
		this.pageSize=pageSize;
		this.showdivId=showdivId;
		this.url=url;
		this.pageInit();
		this.pagination();*/
		//this.totalRows = totalRows;
		var pageStartRow = 0; // 当前页显示数据的起始数
		var pageEndRow = 0; // 当前页显示数据的终止数
		var hasNextPage = false; // 是否有下一页
		var hasPreviousPage = false; // 是否有前一页
		var totalPages ;
		if (!page || page <= 0) {
			page = 1; // 当前页
		}
		
		if (!totalRows || totalRows < 0) {
			totalPages = 0; // 总页数
		}
	

		if (!pageSize || pageSize <= 0) {
			pageSize = 20; // 每页20条数据
		}
		/*if (!showdivId || showdivId == '') {
			showdivId = 'data_list'; //显示在html对应标签的id
		}*/
		if (!url || url == '') {
			console.log("没有传url"); //显示在html对应标签的id
		}


		///
		// 求总页数
		if ((totalRows % pageSize) == 0) {
			if (totalRows == 0) {
				totalPages =parseInt( totalRows / pageSize )+ 1;
			} else {
				totalPages = parseInt( totalRows / pageSize);
			}
		} else {
			totalPages =parseInt(totalRows / pageSize) + 1;
		}

		if (page > totalPages) {
			page = 1;
		}

		// 判断是否有前一页
		if (page <= 1) {
			hasPreviousPage = false;
		} else {
			hasPreviousPage = true;
		}
		// 判断是否有下一页
		if (page >= totalPages) {
			hasNextPage = false;
		} else {
			hasNextPage = true;
		}


		// 当前页显示数据的起始数
		this.pageStartRow = (page - 1) * pageSize + 1;

		// 当前页显示数据的终止数
		if (totalPages - page < 1) {
			this.pageEndRow = totalRows;
		} else {
			this.pageEndRow = page * pageSize;
		}

		///
		var pre = page > 1;
		var end = page < totalPages;
		
		var html = "<ul class=\"pagination-tool\">";
		if (pre) {
			html += "<li>";
			html += "<a href=\"javascript:jQuery.mapout.ajax.searchLoad('"+url+"','data_list',1);jQuery.mapout.utils.goToTop();\" class=\"glyphicon glyphicon-step-backward\"></a>";
			
			//roll.append(table.getHrefString(1, "glyphicon glyphicon-step-backward"));
			html += "</li>";

			html += "&nbsp;&nbsp;";
			html += "<li>";
			html += "<a href=\"javascript:jQuery.mapout.ajax.searchLoad('"+url+"','data_list',"+ (page-1) +");jQuery.mapout.utils.goToTop();\" class=\"glyphicon glyphicon-backward\"></a>";

			//roll.append(table.getHrefString(page-1, "glyphicon glyphicon-backward"));
			html += "</li>";
			html += "<li><a href=\"#\">|</a></li>";
		}
		html += "<li>";
		
		html += "<input type='hidden' name='totalPages' id='totalPages' value='" + totalPages + "' /> <input type='text' maxlength='7'  title='点回车键跳转' name='currentPage' id='currentPage' value='" + page + "'/> 共 <span id=\"\">" + totalPages + "</span> 页";
		html += "</li>";

		if (end) {
			html += "<li><a href=\"#\">|</a></li>";
			html += "<li>";
			html += "<a href=\"javascript:jQuery.mapout.ajax.searchLoad('"+url+"','data_list',"+ (page+1) +");jQuery.mapout.utils.goToTop();\" class=\"glyphicon glyphicon-forward\"></a>";


			//roll.append(this.getHrefString(page + 1, "glyphicon glyphicon-forward"));
			html += "</li>";
			html += "&nbsp;&nbsp;";
			html +="<li>";
			html += "<a href=\"javascript:jQuery.mapout.ajax.searchLoad('"+url+"','data_list',"+ totalPages +");jQuery.mapout.utils.goToTop();\" class=\"glyphicon glyphicon-step-forward\"></a>";
			//roll.append(this.getHrefString(totalPages, "glyphicon glyphicon-step-forward"));
			html +="</li>";

		}

		html +="</ul>";
		html +="<span class=\"total-page\">" + this.pageStartRow + "-" + this.pageEndRow + " 共 " + totalRows + " 条记录</span>";
		$(".grid-tool").append(html);
	},


	/**
	 * 复选框全选
	 * @param name 进行全选的复选框名字
	 * @param e 当前复选框
	 */
	checkAll: function(name, e) {
		var checked = e.checked;
		var $spanBox = $(e).parent();

		if (checked) {
			$spanBox.addClass("checked");
		} else {
			$spanBox.removeClass("checked");
		}

		if (name == undefined || name == '') {
			$(":checkbox:enabled").each(function() {
				$spanBox = $(this).parent();
				if (checked) {
					$spanBox.addClass("checked");
					$(this)[0].checked = true;
				} else {
					$spanBox.removeClass("checked");
					$(this)[0].checked = false;
				}
			});
		} else {
			$(":checkbox[name='" + name + "']:enabled").each(function() {
				$spanBox = $(this).parent();
				if (checked) {
					$spanBox.addClass("checked");
					$(this)[0].checked = true;
				} else {
					$spanBox.removeClass("checked");
					$(this)[0].checked = false;
				}
			});
		}
	},

	/**
	 * 复选框单选
	 * @param e 当前复选框
	 */
	check: function(e) {
		var checked = e.checked;
		var $spanBox = $(e).parent();
		if (checked) {
			$spanBox.addClass("checked");
			$(e).attr("checked", "checked");
		} else {
			$spanBox.removeClass("checked");
			$(e).removeAttr("checked");
		}
	},

	/**
	 * 获取复选框值
	 * @param name 复选框名称
	 */
	getCheckedValues: function(name) {
		var values = "";
		if (name == undefined || name == '') {
			$(":checkbox:enabled").each(function() {
				if ($(this)[0].checked) {
					values += "," + $(this).val();
				}
			});
		} else {
			$(":checkbox[name='" + name + "']:enabled").each(function() {
				if ($(this)[0].checked) {
					values += "," + $(this).val();
				}
			});
		}
		if (values.length > 1) {
			values = values.substring(1);
		}

		return values;
	},

	/**
	 * 包装复选框
	 * @param name 进行包装的复选框名字
	 */
	wrapCheckbox: function(name) {
		if (name == undefined || name == '') {
			$("input[type='checkbox']").each(function() {
				$(this).wrap(function() {
					return '<div class="checker"><span/>';
				});
				if ($(this).attr("onclick") == undefined || $(this).attr("onclick") == '') {
					$(this).attr("onclick", "table.check(this)");
				}
			});
		} else {
			$("input[type='checkbox'][name='" + name + "']").each(function() {
				$(this).wrap(function() {
					return '<div class="checker"><span/>';
				});
				if ($(this).attr("onclick") == undefined || $(this).attr("onclick") == '') {
					$(this).attr("onclick", "table.check(this)");
				}
			});
		}
	}
};

var table = null;
$(function() {
	table = new Table();
	table.init();
	$(window).resize(function() {
		table.tableAlignment();
	});

	//table.paginationInit(page,totalRows,pageSize,showdivId,url);
	//table.paginationInit(1,5,4,"abc");//表格分页工具条调用示例
});