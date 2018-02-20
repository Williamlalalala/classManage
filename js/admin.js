$(function() {
    $(".teacher-information").click(function(){
        $(".teacher-info").show();
        $(".course-info").addClass("hide");
        $(".teacher-information").addClass("active");
        $(".course-information").removeClass("active");
    });
    $(".course-information").click(function(){
        $(".teacher-info").hide();
        $(".course-info").removeClass("hide");
        $(".teacher-information").removeClass("active");
        $(".course-information").addClass("active");
    });

    var g_table = $("table.teacher-data");
    $.ajax({ 
            type: "GET",    
            url: "http://127.0.0.1:8080/ajaxdemo/serverjson2.php?action=init_data_list",
            dataType: "json",
            success: function(data) {
                    var row_items = $.parseJSON(data);
                    for(var i = 0,j = row_items.length;i<j;i++){
                        var data_dom = create_row(row_items[i]);
                        g_table.append(data_dom);
                    }
            },
            error: function(jqXHR){     
               alert("发生错误：" + jqXHR.status);  
            },     
        });

    function delHandler(){
        var meButton = $(this);
        var thisID=meButton.parent().parent().children("td:first-child").val();//这一行教师数据中的工号
        $.ajax({
            type:"POST",
            url:"addTeacher.php",
            dataType:"json",
            data:{
                action:"del_row",
                TID:thisID
            },
            success: function(data){
                if(data.success){
                    $(meButton).parent().parent().remove;
                }else{
                    alert("删除失败……");
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            },
        });
    }

    function editHandler(){
        var meButton = $(this);
        var meRow = $(this).parent().parent();
        var editRow = $("<tr></tr>");
        var col_td=$("<td><input type='text' /></td>");
        col_td.find('input').val(meRow.find('td:eq(0)').html());
        editRow.append(col_td);
        col_td=$("<td><input type='text' /></td>");
        col_td.find('input').val(meRow.find('td:eq(1)').html());
        editRow.append(col_td);
        col_td=$("<td><input type='text' /></td>");
        col_td.find('input').val(meRow.find('td:eq(2)').html());
        editRow.append(col_td);
        col_td=$("<td><input type='text' /></td>");
        col_td.find('input').val(meRow.find('td:eq(3)').html());
        editRow.append(col_td);
        col_td=$("<td><button type='button' class='btn btn-info reset-pwd'>重置</button></td>");
        editRow.append(col_td);
        var opt_td = $("<td></td>");
        var saveButton = $ ("<button class='btn btn-info' type='button'>保存</button>");
        saveButton.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            //课程可能不止一门，所以用逗号分隔输入内容存到数组里
            var courses= new Array();  
            courses=input_fields[3].value.split(",");
            var data_item = {
                TID:input_fields[0].value,
                Tname:input_fields[1].value,
                Tpswd:input_fields[2].value,
                Course:courses
            };
            $.ajax({
            type:"POST",
            url:"addTeacher.php",
            dataType:"json",
            data:{
                action:"edit_row",
                TID:input_fields[0].val(),
                Tname:input_fields[1].val(),
                Tpswd:input_fields[2].val(),
                Course:courses
            },
            success: function(data){
                if(data.success){
                    var updateRow = create_row(data_item);
                }else{
                    alert("发生错误："+data.msg);
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
        });
        var cancelButton=$("<button class='btn btn-info' type='button'>取消</button>");
        cancelButton.click(function(){
            var currentRow = $(this).parent().parent();
            meRow.find('button:eq(1)').click(delHandler);
            meRow.find('button:eq(2)').click(editHandler);
            currentRow.replaceWith(meRow);
        });
        opt_td.append(saveButton);
        opt_td.append(cancelButton);
        editRow.append(opt_td);
        meRow.replaceWith(editRow);
    }

    function create_row(data_item){
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var delButton = $("<button class='btn btn-info' type='button'>删除</button>");
        delButton.click(delHandler);
        var editButton = $("<button class='btn btn-info' type='button'>编辑</button>");
        editButton.click(editHandler);
        var opt_td = $('<td></td>');
        opt_td.append(delButton);
        opt_td.append(editButton);
        row_obj.append(opt_td);
        return row_obj;
    }

    //单个添加老师
    $("#add-teacher").click(function(){
        var addRow=$("<tr></tr>");
        var col_td=$("<td><input type='text' value='' /></td>");
        addRow.append(col_td);
        col_td=$("<td><input type='text' value='' /></td>");
        addRow.append(col_td);
        col_td=$("<td><input type='text' value='' /></td>");
        addRow.append(col_td);
        col_td=$("<td><input type='text' value='' /></td>");
        addRow.append(col_td);
        col_td=$("<td><button type='button' class='btn btn-info reset-pwd'>重置</button></td>")
        addRow.append(col_td);
        var col_opt=$("<td></td>");
        var confirmBtn=$("<button class='btn btn-info' type='button'>确认</button>");
        confirmBtn.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var courses= new Array();  
            courses=input_fields[3].value.split(",");
            var data_item = {
                TID:input_fields[0].value,
                Tname:input_fields[1].value,
                Tpswd:input_fields[2].value,
                Course:courses
            };
            $.ajax({
            type:"POST",
            url:"addTeacher.php",
            dataType:"json",
            data:{
                action:"add_row",
                TID:input_fields[0].value,
                Tname:input_fields[1].value,
                Tpswd:input_fields[2].value,
                Course:courses
            },
            success: function(data){
                if(data.success){
                    var postAddRow=create_row(data_item);
                    currentRow.replaceWith(postAddRow);
                }else{
                    alert("发生错误："+data.msg);
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
        });
        var cancelBtn=$("<button class='btn btn-info' type='button'>取消</button>");
        cancelBtn.click(function(){
            $(this).parent().parent().remove();
        });
        col_opt.append(confirmBtn);
        col_opt.append(cancelBtn);
        addRow.append(col_opt);
        g_table.append(addRow);
    });

    //以表格文件方式导入教师名单
    $("#import-teachers").click(function(){
        var teacherList = new FormData();
        teacherList.append("upfile", $("#btn-file").get(0).files[0]);
        if (typeof teacherList === 'undefined') {
            alert('请选择一个文件！');
            return;
        }
            $.ajax({
                url: "addTeacher?action=add_list.php",
                type: "POST",
                data: teacherList,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: function(data){
                if(data.success){
                    window.location.reload();//由于后端已根据传入文件更改数据库，所以重新加载即可看到新的教师数据
                }else{
                    alert("发生错误："+data.msg);
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
            });        
    });
});