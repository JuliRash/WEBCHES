
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - ++resource++jquery.watermarkinput.js - */
/*
 * Copyright (c) 2007 Josh Bush (digitalbush.com)
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE. 
 */
 
/*
 * Version: Beta 1
 * Release: 2007-06-01
 */ 


(function(jQuery) {
	var map=new Array();
	jQuery.Watermark = {
		ShowAll:function(){
			for (var i=0;i<map.length;i++){
				if(map[i].obj.val()==""){
					map[i].obj.val(map[i].text);					
					map[i].obj.css("color",map[i].WatermarkColor);
				}else{
				    map[i].obj.css("color",map[i].DefaultColor);
				}
			}
		},
		HideAll:function(){
			for (var i=0;i<map.length;i++){
				if(map[i].obj.val()==map[i].text)
					map[i].obj.val("");					
			}
		}
	}
	
	jQuery.fn.Watermark = function(text,color) {
		if(!color)
			color="#767676";
		return this.each(
			function(){		
				var input=jQuery(this);
				var defaultColor=input.css("color");
				map[map.length]={text:text,obj:input,DefaultColor:defaultColor,WatermarkColor:color};
				function clearMessage(){
					if(input.val()==text)
						input.val("");
					input.css("color",defaultColor);
				}

				function insertMessage(){
					if(input.val().length==0 || input.val()==text){
						input.val(text);
						input.css("color",color);	
					}else
						input.css("color",defaultColor);				
				}

				input.focus(clearMessage);
				input.blur(insertMessage);								
				input.change(insertMessage);
				
				insertMessage();
			}
		);
	};
})(jQuery);

/* - ++resource++searchpulldown.js - */
jQuery(document).ready(function($) {

    var input_searchstring_focus = function() {
        $('ul#search').addClass('show');
        $('input#searchString').unbind('focus.searchstring');  // unbind ourself to avoid looping
        $('ul#search.show li label input:checked').focus(); // allows the user to arrow through the options 
    };

    $('ul#search li label input').keypress(function(event) {
        if (event.keyCode == 13) {  // If 'Enter' is clicked go to the searchbox input and not submit the form
            // Stop the default Enter. IE doesn't understand 'preventDefualt' but does 'returnValue'
            (event.preventDefault) ? event.preventDefault() : event.returnValue = false; 
            focus_to_searchbox();
        }
    });
    $('ul#search li label').keyup(function(event) {
        if (event.keyCode == 32) {  // If the 'space bar' is pressed, go to the searchbox input
            focus_to_searchbox();
        }
    });
    $('body').keydown(function(e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if (code == 27) { // if the ESC key is pressed, close the searchbox
            close_searchbox();
        }
    });

    // initial bind
    $('input#searchString').bind('focus.searchstring', input_searchstring_focus);

    $('input#searchString').click(click_open_search_options);
    
    $('div#portal-searchbox').click(function(e) {
        // keep click events from leaving the searchbox to avoid clicks triggering the close below if the clicks are also in the searchbox
        e.stopPropagation();
    });

    $('html').click(close_searchbox); // allow the user to click anywhere else and close the search selections

    $('ul#menu').removeClass('show'); // prove they can do javascript.. if not let the css option takes over
    
    // FUNCTIONS   
    function clear_searchString() {
        // Clear the box if it has the default 'Search' only. Don't want to erase it if there is already a search term
        var searchValue = $('input#searchString').val();
        if (searchValue == 'Search...') {
            $('input#searchString').val('');
        }  
    }

    function focus_to_searchbox() {
        $('input#searchString').select();
        clear_searchString();
    }
    
    function close_searchbox() {
        $('ul#search').removeClass('show');
        $('ul#search li label input').blur();
        // rebind so the box can re-open
        $('input#searchString').bind('focus.searchstring', input_searchstring_focus);
    }
     
    function click_open_search_options() {
        //$('ul#search').addClass('show');
        clear_searchString()
        $('input#searchString').select();
    }

});

/* - ++resource++watermarksettings.js - */
jQuery(document).ready(function($) {
     $("input#searchString").Watermark("Search...");({

          
         });
});

/* - responsivemobilemenu.js - */
/*

Responsive Mobile Menu v1.0
Plugin URI: responsivemobilemenu.com

Author: Sergio Vitov
Author URI: http://xmacros.com

License: CC BY 3.0 http://creativecommons.org/licenses/by/3.0/

*/

/*
    Modifications by trs22:

        * Replaced $ with jq for Plone
        * Replaced show/hide with remove/add class of '.hiddenStructure' for accessibility.
        * Removed automagic width CSS
        * Removed adaptMenu function (handling with responsive CSS)
        * Combined getMobileMenu into responsiveMobileMenu function
        * Hard set 'minimal' class
*/

function responsiveMobileMenu() {    
        jq('.rmm').each(function() {
            
            var main_list = jq("<div class='rmm-main-list'></div>");
            
            jq(this).children().appendTo(main_list);    // mark main menu list
            
            jq(this).append(main_list);
            
            jq(this).addClass('minimal'); // set minimal class
            
            /* build toggled dropdown menu list */
    
            var menutitle = jq(this).attr("data-menu-title");

            if ( menutitle == "" ) {
                menutitle = "Menu";
            }
            else if ( menutitle == undefined ) {
                menutitle = "Menu";
            }

            var $menulist = jq(this).children().detach();

            var menu_icon = jq(this).attr("data-menu-icon");
            
            if ( menu_icon != "" && menu_icon != undefined) {
                menubutton = "<div class='rmm-button'><img src='" + menu_icon + "' alt='Search' /></div>";
            }
            else {
                menubutton = "<div class='rmm-button'><span>&nbsp;</span><span>&nbsp;</span><span>&nbsp;</span></div>";
            }

            var $menucontrols ="<div class='rmm-toggled-controls'>" + menubutton + "<h2 class='rmm-toggled-title'>" + menutitle + "</h2></div>";

            jq(this).prepend("<div class='rmm-toggled rmm-closed'>"+$menucontrols+"</div>")
            jq(this).children('.rmm-toggled').append($menulist);

        }
    );
}

jq(document).ready(function() {

    // dynamically add .rmm class
    jq('#portal-searchbox').addClass('rmm');
    jq('#document-toc').addClass('rmm');
    
    // Add 'rmm-multi-menu' class to portal-header.  This allows only one open
    // menu per multi-menu object.
    
    jq('#portal-header').addClass('rmm-multi-menu');
    
    // Move the 'main' navigation items into one menu area
    var mobile_nav = jq('<div id="mobile-navigation" class="rmm"></div>');
    
    // Add the left and top nav to the menu.  
    // Show the left nav before the top nav
    jq('body:not(.navigation-mobile) #portal-column-one .portlet-mobile-navigation').addClass('rmm-main').clone().removeClass('rmm-main').appendTo(mobile_nav)  

    jq('.top-navigation').addClass('rmm-main').clone().removeClass('rmm-main').appendTo(mobile_nav)   

    
    mobile_nav.find('.left-column-navigation .hiddenStructure, .top-navigation .hiddenStructure').each(
        function() {
            jq(this).removeClass('hiddenStructure');
        }
    );
    
    
    if (mobile_nav.children().size()) {
        mobile_nav.appendTo('#portal-header');
    }

    responsiveMobileMenu();
    
    /* slide down mobile menu on click */
    
    jq('.rmm-toggled').click(function(){
                
        if ( jq(this).is(".rmm-closed")) {

            /* Close all open menus before opening a new one */

            jq(this).parents('.rmm-multi-menu').each(
                function () {
                    jq(this).find('.rmm-toggled').addClass('rmm-closed');
                }
            );

            jq(this).removeClass("rmm-closed");
        }
        else {
            jq(this).addClass("rmm-closed");
        }
        
    });    


    /* 
        Prevent clicks inside menu from toggling menu 
        
        https://api.jquery.com/event.stoppropagation/
    */    
    jq('.rmm-toggled .rmm-main-list').click(function(event){
        event.stopPropagation();
    });   

});
