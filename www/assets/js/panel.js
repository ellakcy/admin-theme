/**
* Utility function that checks if the screen is on desktop
*/
var isDesktop = function(){
  var reg=/x?(S|s)mall/;
  return !reg.test(bsBreakpoints.detectBreakpoint());
}

/**
* In many cases we want to retrieve an element that has an id defined in an attribute.
* @param {Element} element The element to retrieve the id.
* @param {String} attribute the attribute containing the id.
*/
var getElementFromIdProvidedInDataAttribute = function(element, attribute){
  var href=$(element).attr(attribute);
  href=document.getElementById(href);
  return href;
}

/**
* Convert a value into a boolean
* @param {Mixed} value The value to check convert into boolean
* @return {Boolean}
*/
var boolVal=function(value){
  var falseValues=['false',0,undefined,'0','no','null',null];

  if (typeof value === 'string' || value instanceof String){
      value=value.toLowerCase();
  }

  return $.inArray(value, falseValues) == -1
}

/**
* Shiow abd Hide sidebar
*/
var toggleSidebar=function(){
  if(isDesktop()){
    $('#sidebar').toggle("slide",function(e){
      $('#main_content').toggleClass('full_width');
    });
  } else {
    $('#sidebar').toggle("blind");
  }
  $('.sidebar-reveal').blur();
}

/**
* Bootstraping Sidebar and add missing htl elements
*/
var sidebarBootstrap=function(){

  //Indicators
  $(".menu-open .open-indicator:empty").html("<span class=\"oppened\">-</span><span class=\"closed\">+</span>");
  $(".menu-open").each(function(){
    var elem=$(this);
    var hrefOfTheMenuToOpen=getElementFromIdProvidedInDataAttribute(elem,"data-sidebar-toggle");
    elem.attr("data-menu-open",$(hrefOfTheMenuToOpen).is(":visible"));
  });

  if( !$(".sidebar-sm").attr("data-sidebar-sm-display") ){
     $(".sidebar-sm").attr("data-sidebar-sm-display",false);
 }

}

/**
* Code that runs when the resize is complete
*/
var onResizeComplete=function(){
  if(isDesktop()){
    console.log("Switched to Desktop");
    $('#sidebar').show("slide");
    $(".sidebar-sm").attr('data-sidebar-sm-display',false);
    $("#sidebar-main-nav").attr('data-sidebar-sm-display',true);
  }else{
    $("#sidebar").hide("blind");
  }
  $('.sidebar-reveal').blur();
}

// Glolal use indicator whether the window has been resized
var resizeId=null;

$(document).ready(function(){

  //Intial Bootstraping code
  bsBreakpoints.init();
  sidebarBootstrap();
  $('.gotoTop').fadeOut();

  // Events on screen change
  $(window).on('resize orientationChange', function(event) {
    if(resizeId){
      clearTimeout(resizeId);
    }
    resizeId = setTimeout(onResizeComplete, 500);
  });

  //SIDEBAR
  $('.sidebar-reveal').click(function(e) {
    e.preventDefault();
    toggleSidebar();
  });

  //Opening submenu
  $('.menu-open').click(function(e){

    e.preventDefault();
    var self=$(this);
    var href=self.attr("data-sidebar-toggle");
    console.log(href);
    href=document.getElementById(href);

    $(href).slideToggle("slow",function(){
      $(href).attr("data-menu-open",$(href).is(":visible"));
      $(self).attr("data-menu-open",$(href).is(":visible"));
    });

  });


  $("#sidebarMenus div button").click(function(e){
    e.preventDefault();
    var href=getElementFromIdProvidedInDataAttribute(this,"data-sidebar-show");

    if(href && !boolVal($(href).attr('data-sidebar-sm-display'))){

      $('.sidebar-sm').hide("slide",function(){
        $(this).attr('data-sidebar-sm-display',false);
      });

      $(href).toggle("slide",function(){
        $(this).attr('data-sidebar-sm-display',true);
      });

    } else {
      console.log("Not shown");
    }
  });


  // Go to top Button
  $(".gotoTop").on('click',function(e){
    e.preventDefault();
    $("body,html").animate({scrollTop:0},800,function(){
      console.log($(this).scrollTop());
    });
  });

  $(window).scroll(function() {
    if ($(this).scrollTop()>0 && isDesktop()) {
        $('.gotoTop').fadeIn();
    } else {
      $('.gotoTop').fadeOut();
    }
 });

});
