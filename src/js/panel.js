/**
 *
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2018  Cyprus FOSS community
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

import {boolVal,getElementFromIdProvidedInDataAttribute} from './modules/utils/utils.js';

import '../saas/panel.scss';


/**
* Utility function that checks if the screen is on desktop
*/
var isDesktop = function(){
  var reg=/x?(S|s)mall/;
  return !reg.test(bsBreakpoints.detectBreakpoint());
}

/**
* Utility function that checks if the screen is on tablet
*/
var isTablet=function(){
  var reg=/x?(M|m)edium/;
  return reg.test(bsBreakpoints.detectBreakpoint());
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
  $("#sidebar").hide(function(){
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
if(isTablet()) {
    $('#sidebar').hide("slide");
    $(".sidebar-sm").attr("data-sidebar-sm-display","false");
    $("#sidebar-main-nav").attr("data-sidebar-sm-display","true")

  } else if( isDesktop() ) {
      $('#sidebar').show("slide");
      $(".sidebar-sm").attr("data-sidebar-sm-display","false");
      $("#sidebar-main-nav").attr("data-sidebar-sm-display","true")

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
    console.log("Resized");
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
    console.log($(href).attr('data-sidebar-sm-display'),revealed);

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
    if ($(this).scrollTop()>0) {
        $('.gotoTop').fadeIn();
    } else {
      $('.gotoTop').fadeOut();
    }
 });

});
