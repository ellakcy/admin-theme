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
* Bootstraping empty sidebar indicators
*/
var sidebarBootstrap=function(){
  $(".menu-open .open-indicator:empty").html("<span class=\"oppened\">-</span><span class=\"closed\">+</span>");
  $(".menu-open").each(function(){
    var elem=$(this);
    var hrefOfTheMenuToOpen=getElementFromIdProvidedInDataAttribute(elem,"data-sidebar-toggle");
    elem.attr("data-menu-open",$(hrefOfTheMenuToOpen).is(":visible"));
  })
}

$(document).ready(function(){
  bsBreakpoints.init();
  sidebarBootstrap();

  $(window).on('init.bs.breakpoint', function (e) {
    console.log(e);
  })

  // Events on screen change
  $(window).on('resize orientationChange', function(event) {
    if(isDesktop()){
      $('#sidebar').show("slide");
    }else{
      $("#sidebar").hide("blind");
    }
    $('.sidebar-reveal').blur();
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
      $('.sidedar-sm[data-sidebar-sm-display="true"]').toggle("slide",function(){
        $(this).attr('data-sidebar-sm-display',false);
      });

      $(href).toggle("slide",function(){
        $(this).attr('data-sidebar-sm-display',true);
      })
    } else {
      console.log("Not shown");
    }

  })
});
