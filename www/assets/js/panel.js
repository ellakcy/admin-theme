/**
* Utility function that checks if the screen is on desktop
*/
var isDesktop = function(){
  return $(window).width() > 700
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

  // Events on screen change
  $(window).on('resize orientationChange', function(event) {
    if(isDesktop()){
        $('#sidebar').show();
        $('.dropdown-menu header-dropdown').addClass('dropdown-menu-right');

        //Show Main sidebar content
        $('#sideber-main-nav').show();
        $('.sidedar-sm').attr('data-sidebar-sm-display',false);
        $('#sideber-main-nav').attr('data-sidebar-sm-display',true);

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
