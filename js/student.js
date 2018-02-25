$(function() {
	var g_table = $("table.student-course");
    $.ajax({ 
            type: "GET",    
            url: "student.php?action=init_student_course_list",
            dataType: "json",
            success: function(data) {
            	$("h3").html("Hello,"+data.name);
                    var row_items = $.parseJSON(data.course_info);
                    for(var i = 0,j = row_items.length;i<j;i++){
                        var data_dom = create_course_row(row_items[i]);
                        g_table.append(data_dom);
                    }
            },
            error: function(jqXHR){     
               alert("发生错误：" + jqXHR.status);  
            },     
        });

    function create_course_row(data_item){
        var row_obj = $("<tr class='select-course'></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        return row_obj;
    }

    function create_homework_row(data_item){
    	var row_obj = $("<tr></tr>");
		for(var k in data_item){
				var col_td = $("<td></td>")	
				col_td.html(data_item[k]);
				row_obj.append(col_td);
		}

		var downloadButton = $("<input type='submit' value='下载'/>");
		downloadButton.click(downloadHandler);

		var uploadButton = $("<input type='submit' value='删除'/>");
		uploadButton.click(uploadHandler);

		var download_td = $('<td></td>');
		var upload_td = $('<td></td>');

		download_td.append(downloadButton);
		upload_td.append(uploadButton);
		row_obj.append(download_td);
		row_obj.append(upload_td);
		return row_obj;
    }

    function downloadHandler(){
    	var $eleForm = $("<form method='get'></form>");
    	$eleForm.attr("action","https://bababa.com");
    	$(document.body).append($eleForm);
    	//提交表单，实现下载
    	$eleForm.submit();
    }

    function uploadHandler(){
    	openNew("student.php","upload_homework");
    	return false;
    }

    // 实现事件委托
    g_table.click(function(event){
    	let target = event.target;
    	const currentTarget = event.currentTarget;
    	while(target !== currentTarget){
    		if(target.classList.contains("select-course")){
    			$(".student-index").hide();
    			$(".homework").show();
    			var course_name = target.querySelector(".course-to-select").innerTEXT;
    			var work_table = $("#homework");
    			$.ajax({
    				type:"GET",
    				url:"findHomework.php?action=init_student_homework_list?Cname=course_name",
    				dataType:"json",
    				success:function(data){
    					$(".brand").html(data.Cname);
    					var row_items = $.parseJSON(data.homework);
    					for(var i=0,j=row_items.length;i<j;i++){
    						var data_dom = create_homework_row(row_items[i]);
    						work_table.append(data_dom);
    					}
    				},
    				error:function(jqXHR){
    					alert("发生错误："+jqXHR.status);
    				},
    			});
    		}
    		target = target.parentNode;
    	}
    });

    $("#back").click(function(){
    	$(".student-index").show();
    	$(".homework").hide();
    });
});
