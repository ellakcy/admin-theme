var isDesktop=function(){return 691<$(window).width()},sidebarDisplay=function(){return 900<$(window).width()},getElementFromIdProvidedInDataAttribute=function(element,attribute){var href=$(element).attr(attribute);return href=document.getElementById(href)},boolVal=function(value){var falseValues=["false",0,void 0,"0","no","null",null];return("string"==typeof value||value instanceof String)&&(value=value.toLowerCase()),-1==$.inArray(value,falseValues)},sidebarBootstrap=function(){$(".menu-open .open-indicator:empty").html('<span class="oppened">+</span><span class="closed">-</span>'),$(".menu-open").each(function(){var elem=$(this),hrefOfTheMenuToOpen=getElementFromIdProvidedInDataAttribute(elem,"data-sidebar-toggle");elem.attr("data-menu-open",$(hrefOfTheMenuToOpen).is(":visible"))})};$(function(){sidebarBootstrap(),$(window).on("resize orientationChange",function(event){sidebarDisplay()?($("#sidebar").show(),$(".dropdown-menu header-dropdown").addClass("dropdown-menu-right"),$("#sideber-main-nav").show(),$(".sidedar-sm").attr("data-sidebar-sm-display",!1),$("#sideber-main-nav").attr("data-sidebar-sm-display",!0)):($("#sidebar").hide(),$(".dropdown-menu header-dropdown").removeClass("dropdown-menu-right")),$(".sidebar-reveal").blur(),$(".content").removeClass("full_width")}),$(".sidebar-reveal").click(function(e){e.preventDefault(),isDesktop()?$("#sidebar").toggle("slide",function(){$("#sidebar").is(":visible")?$(".content").removeClass("full_width"):$(".content").addClass("full_width")}):$("#sidebar").toggle("blind"),$(".sidebar-reveal").blur()}),$(".menu-open").click(function(e){e.preventDefault();var self=$(this),href=self.attr("data-sidebar-toggle");href=document.getElementById(href),$(href).slideToggle("slow",function(){$(href).attr("data-menu-open",$(href).is(":visible")),$(self).attr("data-menu-open",$(href).is(":visible"))})}),$("#sidebarMenus div button").click(function(e){e.preventDefault();var href=getElementFromIdProvidedInDataAttribute(this,"data-sidebar-show");href&&!boolVal($(href).attr("data-sidebar-sm-display"))?($('.sidedar-sm[data-sidebar-sm-display="true"]').toggle("slide",function(){$(this).attr("data-sidebar-sm-display",!1)}),$(href).toggle("slide",function(){$(this).attr("data-sidebar-sm-display",!0)})):console.log("Not shown")})});