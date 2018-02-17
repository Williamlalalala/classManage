$(".stu-info").click(function(){
    $(".info-div").show();
    $(".work-div").addClass("hide");
    $(".stu-info").addClass("active");
    $(".stu-work").removeClass("active");

  });

$(".stu-work").click(function(){
    $(".info-div").hide();
    $(".work-div").removeClass("hide");
    $(".stu-info").removeClass("active");
    $(".stu-work").addClass("active");
  });

$(".select").click(function(){
	$(".course").hide();
	$(".class-manage").show();
});

$(".select-course").click(function(){
	$(".teacher-index").hide();
	$(".course").show();
});