function AutoComplete() {};
AutoComplete.prototype = {

	init: function(id,url,data,callback) {
		$("#"+id+"Name").autocomplete({
		     source: function( request, response ) {
		          	var params = new Object();
		  			params.url = url ;
		  			params.data = "&qName="+request.term+data;
		  			params.callback = function(result) {
			  			if(result) {
			  				if(result.success){
			  					response( result.list );
			  				}else{
			  		        	msgtip.addTip("error",result.message);
			  		        } 
			  			} else {
			  				msgtip.addTip("error",'未知异常！');
			  			}
			  		};		
			  		$.mapout.ajax.req(params) ;	
		       },
		      minLength: 1,
		      focus: function (event, ui) {
		          return false;
		      },
		      select: function( event, ui ) {
		    	  if(callback){
						callback(event, ui);
		      	  }else{
		      		$("#"+id+"Id").val(ui.item.id);
		      		$("#"+id+"Name").val(ui.item.name);
		      	  }
		          return false;
		      }
		 }) 
		 .data( "autocomplete" )._renderItem = function( ul, item ) {  
	           return $( "<li></li>" )  
	           .data( "item.autocomplete", item )  
	           .append( "<a>" + item.name + "</a>" )  
	           .appendTo( ul );  
	   };
	}
};
