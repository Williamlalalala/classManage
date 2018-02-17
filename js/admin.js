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