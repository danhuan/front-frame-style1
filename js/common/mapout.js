// Descript: Cord Library
// ReferTo : jquery.js
(function( $ , window ) {
	$.mapout = $.extend($.mapout, {
		ERROR_PAGE : '/mobile/error' ,
		basedir : '/' ,
		ajax : {
			/**防止url 过长，进行url拆分*/
	        getUrlArray : function(/*string*/url, /*string*/params) {
	            var returnArray = new Array(url,"");
	        	var theRequest=""; 
				if (url.indexOf("?") != -1) { 
					var str = url.substr(url.indexOf("?"));
				    var strs = str.split("&");
				    url=url.substr(0,url.indexOf("?"))+strs[0];
				    for(var i = 1; i < strs.length; i++) {
				    	if(strs[i].indexOf("=") != -1){
				      		theRequest=theRequest+"&"+strs[i];
				    	}
				    } 
				    if(null!=params&&''!=params){
				     	theRequest=theRequest+"&"+params;
				    }
					returnArray[0]=url;
				    if(theRequest.length>1)
				      	theRequest = theRequest.substring(1) ;
				    returnArray[1]=theRequest;
				 } 
	            return returnArray;
	        },
	        
			/**
			 * 发送AJAX请求动作
			 * params.url 请求地址
			 * params.data 请求参数 如： '&userId=1'
			 * params.loading 是否需要加载效果 
			 * callback.callback 回调函数
			 */
			req : function( params) {
				
				if( !params.loading){
					params.loading = false;
				}
				if(params.loading == true){
					window.top.loading.show();
				}
				var allUrl = params.url + ("&reqTemp="+new Date().getTime()) ;
				if(params.data!=undefined)
					allUrl += params.data ;
				allUrl = encodeURI(allUrl);
				//构造url，防止url过长
				var returnArray = $.mapout.ajax.getUrlArray(allUrl,"");			
				$.mapout.utils.buttonAvailable(true) ;		
				$.ajax({
					type: "POST",
					url: returnArray[0],
					data: returnArray[1],
					success: function(result){
						if(params.loading == true){
							window.top.loading.hide();
						}
						$.mapout.utils.buttonAvailable(false) ;	
						if(result && result.sessionTimeOut){
							jQuery.mapout.form.replace(window.top.getContextPath()+"/web/home.do?action=index",'');
							return;
						}
						if(params.callback)
							params.callback(result);
					},
					error: function(result){
						if(params.loading == true){
							window.top.loading.hide();
						}
						$.mapout.utils.buttonAvailable(false) ;
						msgtip.addTip('error','出现未知异常，操作失败！');
					},
					dataType: 'json'
				});
			},
			
			
			
			/**
			 * 发送AJAX请求动作
			 * url 请求地址
			 */
			searchLoad : function(/*string*/url, /*string*/showId, /*int*/currentPage) {
				currentPage = currentPage == undefined ? 1 : currentPage;
				
				//================== 检查参数 =======================//
				if(currentPage && !$.mapout.utils.checkInteger(currentPage)){
					window.top.tip('error','请输入大于0的正整数！');
					return;
				}
				
				var pageCount = $('#pageCount').val();
				if((currentPage - pageCount) > 0){
					window.top.tip('error','跳转页不能大于总页数！');
					return;
				}
				//=================================================//
				if(!params.loading){
					params.loading = false;
				}
				if(params.loading == true){
					window.top.loading.show();
				}
				
				var allUrl ;
				if(url.indexOf("&currentPage=")==-1){//加上分页参数
					if(url.indexOf("?")==-1){
						allUrl=url+"?currentPage="+currentPage;
					}else{
						allUrl=url+"&currentPage="+currentPage;
					}
				}else{//已经存在page参数，需要把page参数清空
					allUrl=url.substring(0,url.indexOf("&currentPage="));
					if(url.indexOf("?")==-1){
						allUrl=allUrl+"?currentPage="+currentPage;
					}else{
						allUrl=allUrl+"&currentPage="+currentPage;
					}
				}
				allUrl = allUrl + ("&reqTemp="+new Date().getTime()) ;
				allUrl = encodeURI(allUrl);
				//构造url，防止url过长
				var returnArray = $.mapout.ajax.getUrlArray(allUrl, "");	
				$.mapout.utils.buttonAvailable(true) ;		
				$.ajax({
					type: "POST",
					url: returnArray[0],
					data: returnArray[1],
					success: function(result){
						if(params.loading == true){
							window.top.loading.hide();
						}
						if(result && result.indexOf('{"sessionTimeOut":true}') != -1){
							jQuery.mapout.form.replace(window.top.getContextPath()+"/web/home.do?action=index",'');
							return;
						}
						$('#'+showId).html(result);
						$.mapout.utils.buttonAvailable(false) ;
						/*
						注：处理列表页面输入页码按回车，出现异常BUG
						$('#currentPage').keydown(function(e){//添加回车事件
							if(e.keyCode==13){
								if(!$.mapout.utils.checkInteger(this.value)){
									window.top.tip('error','请输入大于0的正整数！');
									return;
								}
								var pageCount=$('#pageCount').val();
								if((this.value-pageCount)>0){
									window.top.tip('error','跳转页不能大于总页数！');
									return;
								}
								$.mapout.ajax.searchLoad(url, showId, this.value);
							}
						});
						*/
					},
					error: function(result){
						$.mapout.utils.buttonAvailable(false) ;		
						window.top.tip('error','出现未知异常，操作失败！');
					}
				});
			}
		},
		utils : {
			containKey : function(params , key){
				if(!params || typeof(params)!=='object')return false;
				return (params[key]!==undefined);
			},
			json : function(/*string*/jsonString) {
				try {
					var isjson = typeof(jsonString) == "object" && Object.prototype.toString.call(jsonString).toLowerCase() == "[object object]" && !jsonString.length;
					return isjson? jsonString:eval('(' + jsonString + ')');
				} catch (ex) {
					return null;
				}
			},
			
			/**
			 * 退出登录
			 */
			exit:function(contextPath){
				if(window.confirm('确定要退出？')){
					url = contextPath + "/web/main.do?action=logout";
					jQuery.mapout.form.replace(url,'');
				}
			},
			
		 	/**
			 * 返回页面顶部
			 */
			goToTop : function(){
				$("body").prepend("<input type='text' id='goToTop' value='' />");
					var _top = $("#goToTop");
					_top.focus();
					_top.remove();
			},
	
			checkInteger : function (val){
				var re = /^[1-9]\d{0,8}?$/;
					if (!re.test($.trim(val))){
					    return false;
					}else{
					   return true;
					} 
			},
			
			/**
			 * 过滤脚本攻击字段
			 * @param data
			 */
			filterData : function(data){
				if(data){
					data = data.replace(/\&/g, "%26");
				}
				return data;
			},
			
			/**
		 	 * 修改按钮状态
			 */
		 	buttonAvailable : function(state){
		 		 $("input:button").each(function(){
		    		 $(this).attr("disabled", state);
		    	}); 
		 		 $("input:submit").each(function(){
		    		 $(this).attr("disabled", state);
		    	}); 
		 		 $("input:reset").each(function(){
		    		 $(this).attr("disabled", state);
		    	});
		 		 $("input:radio").each(function(){
		    		 $(this).attr("disabled", state);
		    	}); 
		 		 $("button").each(function(){
		    		 $(this).attr("disabled", state);
		    	}); 
		 		$("select").each(function(){
		 	   		 $(this).attr("disabled", state);
		 	 	}); 
		 		$("a").each(function(){
		 	   		 $(this).attr("disabled", state);
		 	 	}); 
			},
			
			/**
			 * name : 复选框名称
			 */
			checkAll : function(name, e){
				var checked = e.checked ;
				if(name==undefined || name==''){
					$(":checkbox:enabled").each(function (){
						$(this)[0].checked = checked ;	
					}) ;	
				} else {
					$(":checkbox[name^='"+name+"']:enabled").each(function (){
						$(this)[0].checked = checked ;	
					}) ;	
				}
			},
			
			/**
			 * name : 复选框名称
			 */
			checkedCount : function(name) {
				
				var count = 0 ;
				if(name==undefined || name==''){
					$(":checkbox:enabled").each(function (){
						if($(this)[0].checked)
							count ++ ;
					}) ;
				} else {
					$(":checkbox[name^='"+name+"']:enabled").each(function (){
						if($(this)[0].checked)
							count ++ ;
					}) ;
				}
				return count ;
			},
			
			/**
			 * name : 复选框名称
			 */
			getCheckedValues : function(name) {
				var values = "" ;
				if(name==undefined || name==''){
					$(":checkbox:enabled").each(function (){
						if($(this)[0].checked)
							values += "," + $(this).val() ;
					}) ;
				} else {
					$(":checkbox[name^='"+name+"']:enabled").each(function (){
						if($(this)[0].checked)
							values += "," + $(this).val() ;
					}) ;
				}
				if(values.length > 1)
					return values.substring(1) ;
				else 
					return "" ;	
			},
			
			/**
			 *设置文本域自适应增高
			 */
			setTareaAutoHeight : function(id) { 
				var textarea= document.getElementById(id); 
				textarea.style.height = textarea.scrollHeight+"px"; 
			},
			
			//是否为空
			isEmpty : function (xValue){
			  if (xValue == null || xValue == "null" || xValue == "undefined" || xValue == "NaN" || xValue == "")
			    return true;
			  return false;
			},
			
			//判断日期格式是否正确
			checkDate : function(date) {
				var a=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})/ 
				if (!a.test(date)){ 
					window.top.tip('error',"日期格式不正确!");
					return false;
				}else {
					return true ;
				}
			},			
			
			/**
			 * 查询输入框，过滤特殊字符
			 * @param str 要过滤的字符串 
			  */
			filterVerify : function (str){ 
				//var pattern = new RegExp("[']","g");
				//str = str.replace(pattern,"") ;
				str = str.replace(/\&/g,"&amp;") ;
				str = str.replace(/\</g,"&lt;") ;
				str = str.replace(/\>/g,"&gt;");
				str = str.replace(/\"/g,"&quot;");
				str = str.replace(/\'/g,"&apos;");
				//str = str.replace(/\n\r/g,"&#10;");
				//str = str.replace(/\r\n/g,"&#10;");
				//str = str.replace(/\n/g,"&#10;");
				return encodeURIComponent(str);
			} ,
			
			/* 邮箱格式检验 */
			checkEmail : function (mail) {
				var maill ;
				maill="";
				for (i = 0;  i < mail.length;  i++)	{
					str = mail.charAt(i);
   					strNm=str.charCodeAt(0);
					if (strNm!=32) {
						maill=maill+str;
					}
				}
  				var strr;
  				re=/([a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+)(\.{0,1}[a-zA-Z0-9_-]*)(\.{0,1}[a-zA-Z0-9_-]*)/i;
  				re.exec(maill);
  				if (RegExp.$3!=""&&RegExp.$3!="."&&RegExp.$2!=".") {
  					strr=RegExp.$1+RegExp.$2+RegExp.$3
  				} else if (RegExp.$2!=""&&RegExp.$2!="."){
  					strr=RegExp.$1+RegExp.$2
  				} else {
  					strr=RegExp.$1
  				}
  				//window.top.tip('error',strr);
  				if (strr!=maill)
  					return false ;
  				return true ;
			},
			
			/* 检测是否是数字组成 */
			checkNum : function(num) {
			    var reg = /^\d/g;
			    if(reg.test(num)) return true;
			    return false;
			},
			
			checkPhone: function(num) {
			    var reg = /^0{0,1}(13[0-9]|15[0-9])[0-9]{8}$/;
			    if(reg.test(num)) return true;
			    return false;
			},
			//检查密码
			checkPsd : function(v) {
				var numasc = 0;
		        var charasc = 0;
		        var otherasc = 0;
		        if(0==v.length){
		            return "密码不能为空";
		        }else if(v.length<8||v.length>12){
		            return "密码至少8个字符,最多12个字符";
		        }else{
		            for (var i = 0; i < v.length; i++) {
		                var asciiNumber = v.substr(i, 1).charCodeAt();
		                if (asciiNumber >= 48 && asciiNumber <= 57) {
		                    numasc += 1;
		                }
		                if ((asciiNumber >= 65 && asciiNumber <= 90)||(asciiNumber >= 97 && asciiNumber <= 122)) {
		                    charasc += 1;
		                }
		                if ((asciiNumber >= 33 && asciiNumber <= 47)||(asciiNumber >= 58 && asciiNumber <= 64)||(asciiNumber >= 91 && asciiNumber <= 96)||(asciiNumber >= 123 && asciiNumber <= 126)) {
		                    otherasc += 1;
		                }
		            }
		            if(0==numasc)  {
		                return "密码必须含有数字";
		            }else if(0==charasc){
		                return "密码必须含有字母";
		            }else if(0==otherasc){
		                return "密码必须含有特殊字符";
		            }else{
		                return true;
		            }
		        }
			},
			
			/**
			 *阻止事件冒泡
			 */
			cancelBubble : function (e) {  
				//一般用在鼠标或键盘事件上     
				if(e && e.stopPropagation){  
					//W3C取消冒泡事件   
					e.stopPropagation();   
				} else {    
					//IE取消冒泡事件    
					window.event.cancelBubble = true;   
				} 
			}
			
			
			
			
		},
		
		
		form:{
			/**
			 *使表单处于不可编辑状态
			 */
			readOnly:function(){
				$(".form-group input").attr("readOnly",true);
			},
			

			/**
			 *使表单处于查看状态
			 */
			editable:function(){
				$(".form-group input").attr("readOnly",false);
			},
			/**
			 *链接跳转
			 */
			replace:function(url,args){
		        var body = $(document.body),
		            form = $("<form method='post' id='paramForm'></form>"),
		            input;
		        form.attr({"action":url});
		        if(args){
		        	if(typeof args=='string'){
		        		var strs = args.split("&");
					    for(var i = 1; i < strs.length; i++) {
					    	var str = strs[i];
					    	if(str && str.indexOf("=") != -1){
					    		input = $("<input type='hidden'>");
					            input.attr({"name":str.split("=")[0]});
					            input.val(str.split("=")[1]);
					            form.append(input);
					    	}
					    } 
		        	}else{
		        		$.each(args,function(key,value){
				            input = $("<input type='hidden'>");
				            input.attr({"name":key});
				            input.val(value);
				            form.append(input);
				        });
		        	}
		        }
		        form.appendTo(document.body);
		        form = $("#paramForm");
		        form.submit();
		        //document.body.removeChild(form);
		    }
			
		},

		
		
		dialog : {
			/**
			 * 显示弹出框
			 */
			show : function(options) {
				//默认不最大化
				if(options.maximization == null)options.maximization = false;
				var win = options.opener ? options.opener: window.top;
				win.$.FrameDialog.create({
							width : options.width,
							height : options.height,
							url : options.url,
							args : options.args,
							title : options.title,
							maximization: options.maximization,//是否最大化
							maximized: true, // 支持放大缩小
							position : "center"
							//zIndex: 3000
						}).bind('dialogclose', function(event, ui) {
							if (options.close) {
								window.top.loading.hide();
								options.close(event.result);
							}
						});
			},
			/**
			 * 设置返回值并关闭窗口
			 */
			doReturn : function(result) {
				$.FrameDialog.setResult(result);
				$.FrameDialog.closeDialog();
			},

			doExit : function(result) {
				$.FrameDialog.closeDialog();
			},

			doClear : function() {
				$.FrameDialog.setResult('');
				$.FrameDialog.closeDialog();
			},

			/**
			 * 获取弹出框参数
			 */
			getArgs : function() {
				return $.FrameDialog.getArguments();
			},

			/**
			 * 调整弹出框高度宽度, 小于等于-1表示不更改
			 */
			resize : function(width, height) {
				//var cWidth = window.top.document.body.scrollWidth ;
				//var cHeight = window.top.document.body.scrollHeight;
				var cWidth ;
				var cHeight ;
				if($.browser.msie){
					cWidth = window.top.document.body.offsetWidth ;
					cHeight = window.top.document.body.offsetHeight;
				}else{
					cWidth = window.top.document.body.offsetWidth ;
					cHeight = window.top.document.body.offsetHeight;
				}
				if (width <= 0 && width > (cWidth - 20)) {
					width = cWidth - 20;
				}
				if (height <= 0 || height > (cHeight - 20)) {
					height = cHeight - 20;
				}
				var left = parseInt(parseFloat(cWidth - width) / 2);
				var top = parseInt(parseFloat(cHeight - height) / 2)+$(document).scrollTop();
				$.FrameDialog.resize(width, height, left, top);
			}
		}
	},$.mapout);
}( jQuery , this ));


(function($){
	var methods = {};
	$.fn.mapout = function(){
		var method = arguments[0];
		arguments = Array.prototype.slice.call(arguments, 1); 
		if(methods[method]){
			method = methods[method];
		}else{
			$.error( 'Method [' +  method + '] does not exist on $.mapout' );
			return this;
		}
		return method.apply(this, arguments); 
	};

})(jQuery);