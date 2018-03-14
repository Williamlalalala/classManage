$(function(){
    var g_table = $("table.teacher-course");
    var class_table = $("#class");
    var homework_table = $("#homework");
    var student_table = $("#student");
    var url=location.search;

function parseQueryString(url) {
    var obj = {};
    var keyvalue = [];
    var key = "",
        value = "";
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    for (var i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

/*选择课程界面*/
    $.ajax({ 
            type: "GET",
            url: "/test/php/Teacher/teacher.php?action=init_teacher_course_list",
            dataType: "json",
            success: function(data) {
                    for(var i = 0;i<data.length;i++){
                        var data_dom = create_course_row(data[i]);
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

    $("#change-pswd").click(function(){
        window.location.href="../html/Changepwd.html?id=";
        return false;
    });

    $("#exit-login").click(function(){
        $.ajax({ 
            type: "GET",    
            url: "teacher.php?action=exit_login",
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

/*选择教学班界面*/
    //实现事件委托
    g_table.click(function(event){
        let target = event.target;
        const currentTarget = event.currentTarget;
        while(target !== currentTarget){
            if(target.classList.contains("select-course")){
                $(".teacher-index").hide();
                $(".classes").show();
                //var course_name = target.querySelector(".course-to-select").innerTEXT;
                $.ajax({
                    type:"GET",
                    url:"/test/php/Teacher/course.php?action=init_teacher_class_list?Cname=course_name",
                    dataType:"json",
					/*data{
						'cname':
					}*/
                    success:function(data){
                        $(".brand").val(data[0]);
                        for(var i=1;i<data.length;i++){
                            var data_dom = create_class_row(data[i]);
                            class_table.append(data_dom);
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

    function create_class_row(data_item){
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td class='select-class'></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var delButton = $("<button class='btn btn-info' type='button'>删除</button>");
        delButton.click(delClassHandler);
        var opt_td = $('<td></td>');
        opt_td.append(delButton);
        row_obj.append(opt_td);
        return row_obj;
    }

    function delClassHandler(){
        var meButton = $(this);
        var r=confirm("您确定要删除该班级吗？");
        if(r==true){
            var thisID=meButton.parent().parent().children("td:first-child").val();//获取班级编号
        $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"del_class_row",
                ClassID:thisID
            },
            success: function(data){
                if(data){
                    $(meButton).parent().parent().remove;
                    alert("删除成功！")
                }else{
                    alert("删除失败……");
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            },
        });
        }else{
            return;
        }
    }

    $("#add-class").click(function(){
        var addRow=$("<tr></tr>");
        for(var i = 0 ; i < 2 ; i++){
            var addTd = $("<td><input type='text' class='txtField'/></td>");   
            addRow.append(addTd);
        }
        var col_opt=$("<td></td>");
        var confirmBtn=$("<button class='btn btn-info' type='button'>确认</button>");
        confirmBtn.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                ClassID:input_fields[0].value,
                SNumber:input_fields[1].value,
            };
            $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"add_class_row",
                ClassID:input_fields[0].value,
                SNumber:input_fields[1].value
            },
            success: function(data){
                if(data.success){
                    var postAddRow=create_class_row(data_item);
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
        class_table.append(addRow);
    });

    $("#back-to-courses").click(function(){
        $(".teacher-index").show();
        $(".classes").hide();
    });

/*班级作业界面*/
    $(".select-class").click(function(){
        var currentTarget = $(this);
        var classId = currentTarget.parent().children("td:first-child").val();
        $(".classes").hide();
        $(".class-manage").show();
                $.ajax({
                    type:"GET",
                    url:"teacher.php?action=init_teacher_homework_list?ClassID=classId",
                    dataType:"json",
                    success:function(data){
                        $(".brand").html(data.ClassID+"班");
                        var row_items = $.parseJSON(data.homework_list);
                        for(var i=0,j=row_items.length;i<j;i++){
                            var data_dom = create_homework_row(row_items[i]);
                            homework_table.append(data_dom);
                        }
                    },
                    error:function(jqXHR){
                        alert("发生错误："+jqXHR.status);
                    },
                });
    });

    function create_homework_row(data_item){
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var check_td = $("<td><input type='submit' value='查看' class='check-btn'></td>");
        row_obj.append(check_td);
        var editButton = $("<input type='submit' value='编辑'>");
        editButton.click(editHomeworkHandler);
        var uploadButton = $("<input type='submit' value='上传文档'>");
        uploadButton.click(uploadHomeworkHandler);
        var delButton = $("<input type='submit' value='删除'>");
        delButton.click(delHomeworkHandler);
        var opt_td = $('<td></td>');
        opt_td.append(editButton);
        opt_td.append(uploadButton);
        opt_td.append(delButton);
        row_obj.append(opt_td);
        return row_obj;
    }

    function delHomeworkHandler(){
        var meButton = $(this);
        var thisName=meButton.parent().parent().children("td:first-child").val();//获取作业名称
        $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"del_homework_row",
                Hname:thisName
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

    function editHomeworkHandler(){
        var meButton = $(this);
        var meRow = $(this).parent().parent();
        var editRow = $("<tr></tr>");
        for(var i = 0 ; i < 3 ; i++){
            var editTd = $("<td><input type='text' class='txtField'/></td>");   
            var v = meRow.find('td:eq('+i+')').html();
            editTd.find('input').val(v);
            editRow.append(editTd);
        }
        var check_td=$("<td><input type='submit' value='查看' class='check-btn'></td>");
        editRow.append(check_td);
        var opt_td = $("<td></td>");
        var saveButton = $ ("<input type='submit' value='保存'>");
        saveButton.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                Hname:input_fields[0].value,
                Content:input_fields[1].value,
                Deadline:input_fields[2].value,
            };
            $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"edit_homework",
                Hname:input_fields[0].val(),
                Content:input_fields[1].val(),
                Deadline:input_fields[2].val(),
            },
            success: function(data){
                if(data.success){
                    var updateRow = create_homework_row(data_item);
                }else{
                    alert("发生错误："+data.msg);
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
        });
        var cancelButton=$("<input type='submit' value='取消'>");
        cancelButton.click(function(){
            var currentRow = $(this).parent().parent();
            meRow.find('input:eq(1)').click(editHomeworkHandler);
            meRow.find('input:eq(2)').click(delHomeworkHandler);
            meRow.find('input:eq(3)').click(uploadHomeworkHandler);
            currentRow.replaceWith(meRow);
        });
        opt_td.append(saveButton);
        opt_td.append(cancelButton);
        editRow.append(opt_td);
        meRow.replaceWith(editRow);
    }

    function uploadHomeworkHandler(){
        openNew("teacher.php","upload_homework");
        return false;
    }

    $("#add-homework").click(function(){
        var addRow=$("<tr></tr>");
        for(var i = 0 ; i < 3 ; i++){
            var addTd = $("<td><input type='text' class='txtField'/></td>");   
            addRow.append(addTd);
        }
        var col_td=$("<td><input type='submit' value='查看' class='check-btn'></td>");
        addRow.append(col_td);
        var col_opt=$("<td></td>");
        var confirmBtn=$("<input type='submit' value='确认'>");
        confirmBtn.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                Hname:input_fields[0].value,
                Content:input_fields[1].value,
                Deadline:input_fields[2].value
            };
            $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"add_homework_row",
                Hname:input_fields[0].value,
                Content:input_fields[1].value,
                Deadline:input_fields[2].value
            },
            success: function(data){
                if(data.success){
                    var postAddRow=create_homework_row(data_item);
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
        var cancelBtn=$("<input type='submit' value='取消'>");
        cancelBtn.click(function(){
            $(this).parent().parent().remove();
        });
        col_opt.append(confirmBtn);
        col_opt.append(cancelBtn);
        addRow.append(col_opt);
        homework_table.append(addRow);
    });

    $("#work-to-classes").click(function(){
        $(".classes").show();
        $(".class-manage").hide();
    });

/*学生信息界面*/
    $(".stu-info").click(function(){
        var currentTarget = $(this);
        var classId = currentTarget.parent().children("td:first-child").val();
                $.ajax({
                    type:"GET",
                    url:"teacher.php?action=init_teacher_stu_info_list?ClassID=classId",
                    dataType:"json",
                    success:function(data){
                        var row_items = $.parseJSON(data.stu_info_list);
                        for(var i=0,j=row_items.length;i<j;i++){
                            var data_dom = create_stu_info_row(row_items[i]);
                            student_table.append(data_dom);
                        }
                    },
                    error:function(jqXHR){
                        alert("发生错误："+jqXHR.status);
                    },
                });
    $(".info-div").show();
    $(".work-div").addClass("hide");
    $(".stu-info").addClass("active");
    $(".stu-work").removeClass("active");

  });

    function create_stu_info_row(data_item){
        var row_obj = $("<tr></tr>");
        for(var k in data_item){
            var col_td = $("<td></td>");
            col_td.html(data_item[k]);
            row_obj.append(col_td);
        }
        var editButton = $("<input type='submit' value='编辑'>");
        editButton.click(editStudentHandler);
        var delButton = $("<input type='submit' value='删除'>");
        delButton.click(delStudentHandler);
        var opt_td = $('<td></td>');
        opt_td.append(editButton);
        opt_td.append(delButton);
        row_obj.append(opt_td);
        return row_obj;
    }

    function editStudentHandler(){
        var meButton = $(this);
        var meRow = $(this).parent().parent();
        var editRow = $("<tr></tr>");
        for(var i = 0 ; i < 3 ; i++){
            var editTd = $("<td><input type='text' class='txtField'/></td>");   
            var v = meRow.find('td:eq('+i+')').html();
            editTd.find('input').val(v);
            editRow.append(editTd);
        }
        var opt_td = $("<td></td>");
        var saveButton = $ ("<input type='submit' value='保存'>");
        saveButton.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                SID:input_fields[0].value,
                Sname:input_fields[1].value,
                Spassword:input_fields[2].value,
            };
            $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"edit_student_info",
                SID:input_fields[0].value,
                Sname:input_fields[1].value,
                Spassword:input_fields[2].value
            },
            success: function(data){
                if(data.success){
                    var updateRow = create_stu_info_row(data_item);
                }else{
                    alert("发生错误："+data.msg);
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });
        });
        var cancelButton=$("<input type='submit' value='取消'>");
        cancelButton.click(function(){
            var currentRow = $(this).parent().parent();
            meRow.find('input:eq(1)').click(editStudentHandler);
            meRow.find('input:eq(2)').click(delStudentHandler);
            currentRow.replaceWith(meRow);
        });
        opt_td.append(saveButton);
        opt_td.append(cancelButton);
        editRow.append(opt_td);
        meRow.replaceWith(editRow);
    }

    function delStudentHandler(){
        var meButton = $(this);
        var thisID=meButton.parent().parent().children("td:first-child").val();//获取学生学号
        $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"del_student_row",
                SID:thisID
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

    //单个添加学生
    $("#add-student").click(function(){
        var addRow=$("<tr></tr>");
        for(var i = 0 ; i < 3 ; i++){
            var addTd = $("<td><input type='text' class='txtField'/></td>");   
            addRow.append(addTd);
        }
        var col_opt=$("<td></td>");
        var confirmBtn=$("<input type='submit' value='确认'>");
        confirmBtn.click(function(){
            var currentRow = $(this).parent().parent();
            var input_fields = currentRow.find("input");
            var data_item = {
                SID:input_fields[0].value,
                Sname:input_fields[1].value,
                Spswd:input_fields[2].value,
            };
            $.ajax({
            type:"POST",
            url:"teacher.php",
            dataType:"json",
            data:{
                action:"add_student",
                SID:input_fields[0].value,
                Sname:input_fields[1].value,
                Spswd:input_fields[2].value
            },
            success: function(data){
                if(data.success){
                    var postAddRow=create_stu_info_row(data_item);
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
        var cancelBtn=$("<input type='submit' value='取消'>");
        cancelBtn.click(function(){
            $(this).parent().parent().remove();
        });
        col_opt.append(confirmBtn);
        col_opt.append(cancelBtn);
        addRow.append(col_opt);
        student_table.append(addRow);
    });

    //以表格文件方式导入教师名单
    $("#import-students").click(function(){
        openNew("teacher.php","add_student_list");
        return false;
    });

$(".stu-work").click(function(){
    $(".info-div").hide();
    $(".work-div").removeClass("hide");
    $(".stu-info").removeClass("active");
    $(".stu-work").addClass("active");
  });

$("#stu-info-to-classes").click(function(){
        $(".classes").show();
        $(".class-manage").hide();
    });
});
