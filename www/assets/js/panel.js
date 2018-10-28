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
* Logic That Hides Sidebar on Small Screens
*/
var hideSidebarOnSmall=function(){
  $("#sidebar").hide("blind",function(){
    if($(window).scrollTop()>0){
      $('#toolboxScroll').fadeIn();
    }
  });
}

/**
* Bootstraping Sidebar and add missing html elements & Attributes
*/
var sidebarBootstrap=function(){

  //Add Missing Menu Open or close Indicators
  $(".menu-open .open-indicator:empty").html("<span class=\"oppened\">-</span><span class=\"closed\">+</span>");
  $(".menu-open").each(function() {
    var elem=$(this);
    var hrefOfTheMenuToOpen=getElementFromIdProvidedInDataAttribute(elem,"data-sidebar-toggle");
    elem.attr("data-menu-open",$(hrefOfTheMenuToOpen).is(":visible"));
  });

  // Boostrap Sidebar
  $(".sidebar-sm").each(function(){
    var isShown=boolVal($(this).attr("data-sidebar-sm-display"));
    console.log(this,isShown);
    if(!isShown){
      $(this).attr("data-sidebar-sm-display","false")
    }
  });

  if( !isDesktop() ){
    hideSidebarOnSmall();
  }
}

/**
* Code that runs when the resize is complete
*/
var onResizeComplete=function(){
  if( isDesktop() ) {
    $('#sidebar').show("slide");

    $(".sidebar-sm").each(function(){
      if( !boolVal($(this).attr("data-sidebar-sm-display")) ){
         $(this).attr("data-sidebar-sm-display","false");
      }
    });

  } else {
    hideSidebarOnSmall();
  }


  $("#sidebar-main-nav").attr('data-sidebar-sm-display',true);

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
    var revealed=boolVal($(href).attr('data-sidebar-sm-display'));

    $('.sidebar-sm').hide("slide",function(){
      $(this).attr('data-sidebar-sm-display',"false");
    });

    if(href){

      var callback=function(){
        $(this).attr('data-sidebar-sm-display',"true");
      };
      $(href).show("slide",callback);

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
        $('#toolboxScroll').fadeIn();
    } else {
      $('#toolboxScroll').fadeOut();
    }
 });

});
