/**
* Utility function that checks if the screen is on desktop
*/
function isDesktop(){
  return $(window).width() > 576
}

$(function(){

  $('.sidebar-reveal').click(function(e) {
    e.preventDefault();
    if($(window).width() > 576){
      $('#sidebar').toggle("slide");
    } else {
      $('#sidebar').slideToggle("slow");
    }
  });

  $(window).on('resize orientationChange', function(event) {
    if(isDesktop()){
        $('#sidebar').show();
        $('.sidebar-reveal').blur();
        //Further add stull ot get shown on large screen
    }
  });

});
