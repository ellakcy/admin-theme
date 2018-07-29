/**
* Utility function that checks if the screen is on desktop
*/
var isDesktop = function(){
  return $(window).width() > 700
}

/**
* In many cases we want to retrieve an element that
*/
var getElementFromIdProvidedInDataAttribute = function(parentElement, dataAttribute){

}

$(function(){

  $('.sidebar-reveal').click(function(e) {
    e.preventDefault();
    if($(window).width() > 700){
      $('#sidebar').toggle("slide",function(){
        if($('#sidebar').is(":visible")){
          $('.content').removeClass('full_width');
        } else {
          $('.content').addClass('full_width');
        }
      });
    } else {
      $('#sidebar').toggle("blind");
    }
    $('.sidebar-reveal').blur();
  });

  $(window).on('resize orientationChange', function(event) {
    if(isDesktop()){
        $('#sidebar').show();
        $('.dropdown-menu header-dropdown').addClass('dropdown-menu-right');
        //Further add stull ot get shown on large screen
    } else {
        $('#sidebar').hide();
        $('.dropdown-menu header-dropdown').removeClass('dropdown-menu-right');
    }
    $('.sidebar-reveal').blur();
    $('.content').removeClass('full_width');
  });

  $('.menu-open').click(function(e){
    e.preventDefault();
    var href=$(this).attr("data-sidebar-toggle");
    console.log(href);
    href=document.getElementById(href);
    console.log(href);
    $(href).slideToggle("slow");
  });

  $("#sidebarMenus div button").click(function(e){
    e.preventDefault();
    console.log("Item Clicked");
    var href=$(this).attr("data-sidebar-show");
    href=document.getElementById(href);
    console.log(href);
  })

});
