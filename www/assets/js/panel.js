/**
* Utility function that checks if the screen is on desktop
*/
function isDesktop(){
  return $(window).width() > 700
}

$(function(){

  $('.sidebar-reveal').click(function(e) {
    e.preventDefault();
    if($(window).width() > 700){
      $('#sidebar').toggle("slide");
    } else {
      $('#sidebar').slideToggle("slow");
    }
    $('.sidebar-reveal').blur();
  });

  $(window).on('resize orientationChange', function(event) {
    if(isDesktop()){
        $('#sidebar').show();
        //Further add stull ot get shown on large screen
    }
    $('.sidebar-reveal').blur();
  });

  $('.menu-open').click(function(e){
    e.preventDefault();
    var href=$(this).attr("data-sidebar-toggle");
    console.log(href);
    href=document.getElementById(href);
    console.log(href);
    $(href).slideToggle("slow");
  });

});
