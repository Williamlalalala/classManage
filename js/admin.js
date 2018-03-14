$(function() {
    var g_table = $("table.teacher-data");
    var course_table = $("#course-table");
    $.ajax({ 
            type: "GET",    
            url: "admin.php?action=init_data_list",
            dataType: "json",
            success: function(data) {
                $(".brand").val(data.Aname);//管理员名称
                    for(var i = 0,j = data.row_items.length;i<j;i++){
                        var data_dom = create_row(data.row_items[i]);
                        g_table.append(data_dom);
                    }
            },
            error: function(jqXHR){     
               alert("发生错误：" + jqXHR.status);  
            },     
        });

    function checkCourseHandler(){
        $("#light").show();
        $("#fade").show();
        $.ajax({ 
            type: "GET",    
            url: "admin.php?action=check_teacher_courses",
            dataType: "json",
            success: function(data){
                $("#show-Tname").val(data.Tname);
                $("#show-TID").val(data.TID);
                    for(var i = 0,j = data.row_items.length;i<j;i++){
                        var data_dom = create_courses_row(data.row_items[i]);
                        course_table.append(data_dom);
                    }
            },
            error: function(jqXHR){     
               alert("发生错误：" + jqXHR.status);  
            },     
        });
    }

    function create_courses_row(data_item) {
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var delButton = $("<input type='submit' value='删除'>");
        delButton.click(delCourseHandler);
        var opt_td = $('<td></td>');
        opt_td.append(delButton);
        row_obj.append(opt_td);
        return row_obj;
    }

    function delCourseHandler(){
        var meButton = $(this);
        var thisID=meButton.parent().parent().children("td:first-child").val();//课程ID
        var r=confirm("您确定要删除该课程吗？");
        if(r==true){
            $.ajax({
            type:"POST",
            url:"admin.php",
            dataType:"json",
            data:{
                action:"del_course_row",
                CID:thisID
            },
            success: function(data){
                if(data){
                    alert("删除课程成功！")
                    $(meButton).parent().parent().remove;
                }else{
                    alert("删除失败……");
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
        }else{
            return;
        }
    }

    //添加课程
    $("#add-course").click(function(){
        var addRow=$("<tr></tr>");
        for(var i = 0 ; i < 3 ; i++){
            var addTd = $("<td><input type='text' class='txtField input-change'/></td>");   
            addRow.append(addTd);
        }
        var col_opt=$("<td></td>");
        var confirmBtn=$("<button class='btn btn-info' type='button'>确认</button>");
        confirmBtn.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                CID:input_fields[0].value,
                Cname:input_fields[1].value,
                Clog:input_fields[2].value
            };
            $.ajax({
            type:"POST",
            url:"admin.php",
            dataType:"json",
            data:{
                action:"add_course_row",
                CID:input_fields[0].value,
                Cname:input_fields[1].value,
                Clog:input_fields[2].value
            },
            success: function(data){
                if(data){
                    var postAddRow=create_courses_row(data_item);
                    currentRow.replaceWith(postAddRow);
                }else{
                    alert("插入失败！");
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
        course_table.append(addRow);
    });

    function delHandler(){
        var meButton = $(this);
        var thisID=meButton.parent().parent().children("td:first-child").val();//这一行教师数据中的工号
        var r=confirm("您确定要删除该教师吗？");
        if(r==true){
            $.ajax({
            type:"POST",
            url:"admin.php",
            dataType:"json",
            data:{
                action:"del_row",
                TID:thisID
            },
            success: function(data){
                if(data){
                    alert("删除教师成功！")
                    $(meButton).parent().parent().remove;
                }else{
                    alert("删除失败……");
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
        }else{
            return;
        }
    }

    function editHandler(){
        var meButton = $(this);
        var meRow = $(this).parent().parent();
        var editRow = $("<tr></tr>");
        for(var i = 0 ; i < 3 ; i++){
            var editTd = $("<td><input type='text' class='txtField input-change'/></td>");   
            var v = meRow.find('td:eq('+i+')').html();
            editTd.find('input').val(v);
            editRow.append(editTd);
        }
        var check_td = $("<td></td>");
        var checkButton = $("<input type='submit' value='查看'>");
        checkButton.click(checkCourseHandler);
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
            url:"admin.php",
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

    function resetPswdHandler(){
        var meButton = $(this);
        var thisID=meButton.parent().parent().children("td:first-child").val();//这一行教师数据中的工号
        $.ajax({
            type:"POST",
            url:"admin.php",
            dataType:"json",
            data:{
                action:"reset_teacher_pswd",
                TID:thisID
            },
            success: function(data){
                if(data){
                    alert("密码重置成功！");
                }else{
                    alert("重置失败……");
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
    }

    function create_row(data_item){
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var resetButton = $("<input type='submit' value='重置'>");
        resetButton.click(resetPswdHandler);//上次写到这里1
        var checkButton = $("<input type='submit' value='查看'>");
        checkButton.click(checkCourseHandler);
        var editButton = $("<input type='submit' value='编辑''>");
        editButton.click(editHandler);
        var delButton = $("<input type='submit' value='删除'>");
        delButton.click(delHandler);
        var check_td = $('<td></td>');
        check_td.append(checkButton);
        row_obj.append(check_td);
        var opt_td = $('<td></td>');
        opt_td.append(editButton);
        opt_td.append(delButton);
        row_obj.append(opt_td);
        return row_obj;
    }

    //单个添加老师
    $("#add-teacher").click(function(){
        var addRow=$("<tr></tr>");
        for(var i = 0 ; i < 2 ; i++){
            var addTd = $("<td><input type='text' class='txtField input-change'/></td>");   
            addRow.append(addTd);
        }
        var reset_td = $("<td></td>");
        var resetButton = $("<input type='submit' value='重置'>");
        reset_td.append(resetButton);
        var check_td = $("<td></td>");
        var checkButton = $("<input type='submit' value='查看'>");
        check_td.append(checkButton);
        addRow.append(reset_td);
        addRow.append(check_td);
        var col_opt=$("<td></td>");
        var confirmBtn=$("<button class='btn btn-info' type='button'>确认</button>");
        confirmBtn.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                TID:input_fields[0].value,
                Tname:input_fields[1].value
            };
            $.ajax({
            type:"POST",
            url:"admin.php",
            dataType:"json",
            data:{
                action:"add_row",
                TID:input_fields[0].value,
                Tname:input_fields[1].value
            },
            success: function(data){
                if(data){
                    var postAddRow=create_row(data_item);
                    currentRow.replaceWith(postAddRow);
                }else{
                    alert("添加失败！");
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
        openNew("addTeacher.php","add_list");
        return false;
    });

    $("#change-pswd").click(function(){
        window.location.href="../html/Changepwd.html?id=";
        return false;
    });

    $("#exit-login").click(function(){
        $.ajax({ 
            type: "GET",    
            url: "admin.php?action=exit_login",
            dataType: "json",
            success: function(data) {
                window.location.href="../index.html";
                return false;
            },
            error: function(jqXHR){     
               alert("发生错误：" + jqXHR.status);  
            },     
        });
    });

    $("#close-course").click(function(){
        $("#light").hide();
        $("#fade").hide();
    });
});