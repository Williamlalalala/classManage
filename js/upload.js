function openNew(filename,action){
//获取页面的高度和宽度
var sWidth=document.body.scrollWidth;
var sHeight=document.body.scrollHeight;
    
    //获取页面的可视区域高度和宽度
    var wHeight=document.documentElement.clientHeight;
    
    var oMask=$("<div id='mask'></div>");
        oMask.height(sHeight);
        oMask.width(sWidth);
        $(document.body).append(oMask);
    var upLoad=$("<div id='upload-wraper'><div class='uploadCon'><div id='close'>点击关闭</div><div id='btn-file-div'><input type='file' id='btn-file'></div><button class='btn btn-info' type='button' id='confirmUploadBtn'>确认</button></div></div>");
        $(document.body).append(upLoad);
    //点击关闭按钮
    var oClose=$("#close");
    oClose.click(function(){
        $("#upload-wraper").remove();
        $("#mask").remove();
    });
    $("#confirmUploadBtn").click(function(){
        var list = new FormData();
        list.append("upfile", $("#btn-file").get(0).files[0]);
        if (typeof list === 'undefined') {
            alert('请选择一个文件！');
            return;
        }
            $.ajax({
                url: "${filename}.php?action=${action}",
                type: "POST",
                data: list,
                processData: false,  // 告诉jQuery不要去处理发送的数据
                contentType: false,   // 告诉jQuery不要去设置Content-Type请求头
                success: function(data){
                if(data.success){
                    window.location.reload();
                }else{
                    alert("发生错误："+data.msg);
                }
            },
            error: function(jqXHR){
                alert("发生错误：" + jqXHR.status);
            }
        });        
    });
}
