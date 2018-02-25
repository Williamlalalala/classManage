$(function(){
	var g_table = $("table.work-list");
    $.ajax({ 
            type: "GET",    
            url: "homework.php?action=init_work_list",
            dataType: "json",
            success: function(data) {
                    var row_items = $.parseJSON(data);
                    for(var i = 0,j = row_items.length;i<j;i++){
                        var data_dom = create_work_list_row(row_items[i]);
                        g_table.append(data_dom);
                    }
            },
            error: function(jqXHR){     
               alert("发生错误：" + jqXHR.status);  
            },     
        });

    function create_work_list_row(data_item){
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        return row_obj;
    }

    $("#download-btn").click(function(){
    	var eleForm = $("<form method='get'></form>");
    	eleForm.attr("action","https://balabala.com");
    	$(document.body).append(eleForm);
    	eleForm.submit();
    });

});