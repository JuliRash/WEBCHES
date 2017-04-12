
/* Merged Plone Javascript file
 * This file is dynamically assembled from separate parts.
 * Some of these parts have 3rd party licenses or copyright information attached
 * Such information is valid for that section,
 * not for the entire composite file
 * originating files are separated by - filename.js -
 */

/* - ag_common.js - */
function msieversion()
{
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf ( "MSIE " );

    if ( msie > 0 )      // If Internet Explorer, return version number
        return parseInt (ua.substring (msie + 5, ua.indexOf (".", msie )));
    else                 // If another browser, return 0
        return 0;

}


function getElement(theId, vPadding, IEvPadding)
{
    var theElement = document.getElementById(theId) ? document.getElementById(theId) : document.createElement("div");
    theElement.elementHeight = theElement.offsetHeight ? theElement.offsetHeight : theElement.pixelHeight;
    theElement.style.height = "auto";

    if (!vPadding)
    {
        vPadding = 0;
    }

    if (document.all && IEvPadding)
    {
        theElement.vPadding = IEvPadding;
    }
    else
    {
        theElement.vPadding = vPadding;
    }

    return theElement;
}


/* Hide Short Name from Add screen */

jq(document).ready( function () {

    if (jq("#archetypes-fieldname-id input").val())
    {
        jq("#archetypes-fieldname-id").show();
    }
    else
    {
        jq("body.template-atct_edit #archetypes-fieldname-title label.formQuestion").dblclick(function() {
            if (confirm("Only set the short name if you absolutely have to."))
            {
                jq("body.template-atct_edit #archetypes-fieldname-id").show();
            }
        });
    }

} );


/*
   if body custom css class includes 'semicolon-delimited', then split the description into separate lines delimited by semicolon
*/

jq(document).ready(
    function () {
        jq('body.custom-semicolon-delimited #content .description, body.custom-semicolon-delimited #content .documentDescription, body.custom-semicolon-delimited #content .tileDescription p').each(

            function()
            {
                var lines = this.innerHTML.split(";");

                var new_html =  "<ul>";

                for (var i=0; i<lines.length; i++)
                {
                    var line_text = lines[i];

                    if (line_text.match(":"))
                    {
                        list = line_text.split(":");
                        line_text = "<strong>" + list[0] + ":</strong>" + list[1];
                    }

                    new_html = new_html + "<li>" + line_text + "</li>";
                }

                new_html = new_html + "</ul>";

                this.innerHTML = new_html
            }
        );

    }
)


/* For folders with the 'two_column' property set, split the folder listing into two columns */

jq(document).ready(
    function () {

        if (msieversion() <= 6 && msieversion() > 0)
        {
            return false;
        }


        isTwoColumn = jq('body.custom-two-column').length;

        if (isTwoColumn)
        {
            // Grab items from Summary View

            summary_items = jq('body.custom-two-column #content>div>.tileItem');
            insert_after = jq('body.custom-two-column #content>div>.tileItem:last');

            if (summary_items.length == 0)
            {
                summary_items = jq('body.custom-two-column #content>div>.tileItem');
                insert_after = jq('body.custom-two-column #content>div>.tileItem:last');
            }


            // Grab items from Standard View

            listing_items = jq('body.custom-two-column #content .tileTitle');

            // Process Summary Items

            if (summary_items.length >= 1)
            {

                first_column_items = Math.ceil(summary_items.length/2)

                two_column_left = jq('<div class="two-column-left"></div>');
                two_column_right = jq('<div class="two-column-right"></div>');

                insert_after.after('<div class="visualClear">&nbsp;</div>');
                insert_after.after(two_column_right);
                insert_after.after(two_column_left);

                item_count = 0;

                summary_items.each(

                    function()
                    {
                        item_count++;

                        if (item_count <= first_column_items)
                        {
                            two_column_left.append(this);
                        }
                        else
                        {
                            two_column_right.append(this);
                        }

                    }
                );

            }

            else if (listing_items.length >= 1)
            {
                first_column_items = Math.ceil(listing_items.length/2)

                two_column_left = jq('<dl class="two-column-left"></dl>');
                two_column_right = jq('<dl class="two-column-right"></dl>');

                theList = jq('body.custom-two-column #content dl:not(#history)');

                theList.before(two_column_left);
                theList.before(two_column_right);
                theList.before('<div class="visualClear">&nbsp;</div>');

                item_count = 0;

                jq('body.custom-two-column #content .tileTitle').each(
                    function()
                    {
                        if (this.nodeName == 'H3')
                        {
                            item_count++;
                        }

                        if (item_count <= first_column_items)
                        {
                            two_column_left.append(this);
                        }
                        else
                        {
                            two_column_right.append(this);
                        }

                    }
                );

            }
        }
    }
)

/*
   Makes event dates easier to work with.
   From: https://weblion.psu.edu/trac/weblion/wiki/EventDates
*/

function getEventDate(dateType) {
    // validate the dateType
    if (dateType == "startDate") {
        dateType += "_0";
    } else if (dateType == "endDate") {
        dateType += "_1";
    } else {
        dateType = "";
    }

    if (dateType != "") {
        // grab all the fields for the date
        year = jq("#edit_form_" + dateType + "_year").val();
        month = jq("#edit_form_" + dateType + "_month").val();
        day = jq("#edit_form_" + dateType + "_day").val();
        hour = jq("#edit_form_" + dateType + "_hour").val();
        minute = jq("#edit_form_" + dateType + "_minute").val();
        ampm = jq("#edit_form_" + dateType + "_ampm").val();

        // handle the ampm
        if (hour == 12 && ampm == "AM") {
            hour = 0;
        } else if (hour < 12 && ampm == "PM") {
            hour = parseInt(hour) + 12;
        }
        // convert the date fields to a javascript date object and return it
        // Decrement month by 1, because JavaScript months run from 0-11
        return new Date(year, month-1, day, hour, minute, 0, 0);

    } else {
        return "";
    }
}


function setEventDate(dateType, dateObj) {
    // validate the dateType
    if (dateType == "startDate") {
        dateType += "_0";
    } else if (dateType == "endDate") {
        dateType += "_1";
    } else {
        dateType = "";
    }

    if (dateType != "") {
        // set the fields
        jq("#edit_form_" + dateType + "_year").val( dateObj.getFullYear() );
        jq("#edit_form_" + dateType + "_month").val( formatNumberForSelectBox(dateObj.getMonth() + 1) );
        jq("#edit_form_" + dateType + "_day").val( formatNumberForSelectBox(dateObj.getDate()) );
        jq("#edit_form_" + dateType + "_minute").val( formatNumberForSelectBox(dateObj.getMinutes()) );

        // handle the ampm
        var hours = dateObj.getHours();
        if (hours == 0) {
            jq("#edit_form_" + dateType + "_hour").val("12");
            jq("#edit_form_" + dateType + "_ampm").val("AM");
        } else if (hours == 12) {
            jq("#edit_form_" + dateType + "_hour").val("12");
            jq("#edit_form_" + dateType + "_ampm").val("PM");
        } else if (hours > 12) {
            jq("#edit_form_" + dateType + "_hour").val( formatNumberForSelectBox(hours - 12) );
            jq("#edit_form_" + dateType + "_ampm").val("PM");
        } else {
            jq("#edit_form_" + dateType + "_hour").val( formatNumberForSelectBox(hours) );
            jq("#edit_form_" + dateType + "_ampm").val("AM");
        }
    }
}


function formatNumberForSelectBox(aNumber) {
    // if the number is less than 10, add a 0 in front
    if (aNumber < 10) {
        aNumber = "0" + aNumber;
    }

    return aNumber;
}


function roundUpDateToNearestHour(dateObj) {
    if (dateObj.getMinutes() != 0) {
        dateObj.setMinutes(0);
        dateObj.setTime(dateObj.getTime() + (60*60*1000));
    }

    return dateObj;
}


function onStartDateChange () {
    if (okToChangeEventEndDate) {
        var currentEndDate = getEventDate("endDate");
        if (eventOriginalEndDate.getTime() == currentEndDate.getTime()) {
            currentEndDate.setTime(getEventDate("startDate").getTime() + (60*60*1000));
            setEventDate("endDate", currentEndDate);
            eventOriginalEndDate = currentEndDate;
        } else {
            okToChangeEventEndDate = false;
        }
    }
}


var okToChangeEventEndDate = false;
var eventOriginalEndDate = new Date();

jq(document).ready(
    function () {

        // If we're in edit mode, don't do anything.
        if (jq("#archetypes-fieldname-id input").val())
        {
            return false;
        }

        // get the start date from the form
        var eventStartDate = getEventDate("startDate");

        // does the start date match the end date (aka are we adding an event?)
        if (eventStartDate.getTime() == getEventDate("endDate").getTime()) {

            // Our convention is that if both dates are set to Midnight, (12:00am)
            // and both dates are the same, then we leave the hours part off of
            // any display.  Making an exception for this case so we don't accidentally
            // set midnight to 1am events.

            if (eventStartDate.getHours() == 0 && eventStartDate.getMinutes() == 0)
            {
                return false;
            }

            // the start date is the current date, so it's ok to mess with them
            okToChangeEventEndDate = true;

            // round up the start date to the nearest whole hour
            eventStartDate = roundUpDateToNearestHour( eventStartDate );
            setEventDate("startDate", eventStartDate);

            // set the end date to be one hour from now
            eventOriginalEndDate.setTime(eventStartDate.getTime() + (60*60*1000));
            setEventDate("endDate", eventOriginalEndDate);

            // assign change events for all the start date fields
            jq("#edit_form_startDate_0_year").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_month").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_day").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_hour").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_minute").change( function () { onStartDateChange(); } );
            jq("#edit_form_startDate_0_ampm").change( function () { onStartDateChange(); } );
        }
    }
);


/* Add an 'Are you SURE you want to delete your data?' prompt to the 'Clear Saved Input' box on the save data adapter. */
jq(document).ready(
    function () {

        jq('body.portaltype-formsavedataadapter #content form input[name="clearSavedFormInput"]').parent().submit(
            function(event) {
                return confirm('Are you sure you want to clear the saved data?');
            }
        );

    }
);

/* Top navigation equalizer */

jq(document).ready(
    function() {
        equalizeTopNav();
        
        if (msieversion() <= 8 && msieversion() > 0)
        {
            return false;
        }
    }
);

jq(window).resize(
    function() {

        equalizeTopNav();
        
        if (msieversion() <= 8 && msieversion() > 0)
        {
            return false;
        }

    }
);

function equalizeTopNav() {

    if (window.innerWidth <= 768)
    {
        return false;
    }

    topnav = jq('#portal-top > .top-navigation ul');
    topnavitems = jq('#portal-top > .top-navigation li a');
    min_padding = 4;
    
    if (topnav && topnavitems)
    {
        topnav_width = topnav.width();

        /* Commented these out 6/13/2013. Appears that this breaks Webkit if we
           try to compensate for the padding/margin/border.  And it doesn't make
           a bit of difference in Firefox. */
           
        //topnav_width += Number(topnav.css('padding-left').replace('px', ''));
        //topnav_width += Number(topnav.css('padding-right').replace('px', ''));
        //topnav_width += Number(topnav.css('margin-left').replace('px', ''));
        //topnav_width += Number(topnav.css('margin-right').replace('px', ''));
        //topnav_width += Number(topnav.css('border-left-width').replace('px', ''));
        //topnav_width += Number(topnav.css('border-right-width').replace('px', ''));

        total_item_width = 0;

        topnavitems.each(
            function() {
                item_width = jq(this).width();
                item_width += Number(jq(this).css('padding-left').replace('px', ''));
                item_width += Number(jq(this).css('padding-right').replace('px', ''));
                item_width += Number(jq(this).css('margin-left').replace('px', ''));
                item_width += Number(jq(this).css('margin-right').replace('px', ''));
                item_width += Number(jq(this).css('border-left-width').replace('px', ''));
                item_width += Number(jq(this).css('border-right-width').replace('px', ''));
                total_item_width += item_width;
            }
        );

        additional_item_padding = Number( ((topnav_width - total_item_width)/topnavitems.size())/2  );

        max_padding = 50;

        if (additional_item_padding > max_padding)
        {
            additional_item_padding = max_padding;
        }

        topnavitems.each(
            function() {
                new_left_padding  = Math.max(min_padding, parseInt(Number(jq(this).css('padding-left').replace('px', '')) + additional_item_padding)) - 0.5;
                new_right_padding = Math.max(min_padding, parseInt(Number(jq(this).css('padding-left').replace('px', '')) + additional_item_padding)) - 0.5;
                jq(this).css('padding-left', new_left_padding + 'px');
                jq(this).css('padding-right', new_right_padding + 'px');
            }
        );

    }
}

// From:  http://james.padolsey.com/javascript/sorting-elements-with-jquery/

/**
 * jQuery.fn.sortElements
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode;
 *   })
 *
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jq.fn.sortElements = (function(){

    var sort = [].sort;

    return function(comparator, getSortable) {

        getSortable = getSortable || function(){return this;};

        var placements = this.map(function(){

            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,

                // Since the element itself will change position, we have
                // to have some way of storing its original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );

            return function() {

                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }

                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);

            };

        });

        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });

    };

})();


/* Add IE Warning */
jq(document).ready(
    function() {
        
        if (msieversion() <= 0)
        {
            // not IE
            return false;
        }
        else if (jq("body.icons-on").size() && jq("#portal-personaltools").size() && jq("#content form[name=edit_form]").size())
        {
            jq('<div id="iewarning"><img src="/warning.png" alt="" /><h2>Browser Warning</h2><p>You are using Internet Explorer to edit content within Plone.</p><p>The AgSci Web team recommends using <strong><a href="http://www.mozilla.org/en-US/firefox/new/">Mozilla Firefox</a></strong> to edit Plone content because it generally provides a smoother experience.</p><p>If you do not have permission to install Firefox, please <a href="http://agsci.psu.edu/it/help-request">submit a ticket to the IT group</a> and request that Firefox be installed on your machine.</p></div>').hide().prependTo("#portal-column-content").slideDown();
        }
    }
);


/* Add Google Analytics campaign codes to links within a selector */

function getUTM(source, medium, campaign, content)
{
    var data = []

    if (source)
    {
        data.push("utm_source=" + encodeURIComponent(source))
    }
    
    if (medium) 
    {
        data.push("utm_medium=" + encodeURIComponent(medium))
    }
    
    if (campaign) 
    {
        data.push("utm_campaign=" + encodeURIComponent(campaign))
    }
    
    if (content) 
    {
        data.push("utm_content=" + encodeURIComponent(content))
    }
    
    return data.join("&")
}

function applyUTM(selector, utm)
{
    jq(selector).each(
        function () {
            var href = jq(this).attr('href');

            if (href)
            {
                if (href.indexOf('?') >= 0)
                {
                    href = href + "&" + utm;
                }
                else
                {
                    href = href + "?" + utm;
                }

                jq(this).attr('href', href);
            }
        }
    );
}

/* Apply the tags to the footer */

jq(document).ready(
    function () {
        if (! jq('#portal-personaltools').size())
        {
            utm = getUTM(document.location.hostname, "footer navigation", undefined, undefined);
            applyUTM('#portlets-footer a', utm);

            utm = getUTM(document.location.hostname, "below content", undefined, undefined);
            applyUTM('#portlets-below a', utm);

        }
    }
);


/* Add tableWrapper div to tables for logged out view. */

jq(document).ready(
    function () {
        if (! jq('#portal-personaltools').size())
        {
            jq('#content table').each(
                function () {
                    var tableWrapper = jq('<div class="tableWrapper"></div>');
                    tableWrapper.insertBefore(jq(this));
                    jq(this).appendTo(tableWrapper);
                }  
            );
        }
    }
);


/* Duplicate registration button on event */

jq(document).ready(
    function () {
        jq('form.event-registration-public').clone().attr('class', 'event-registration-button').insertBefore("#content-core .eventBodyText");
        jq('form.event-registration-button input[type=submit]').attr('value', 'Register');
    }
);

/* Flexslider Load and Event Tracking */

jq(window).load(function() {
    if (! jq('#portal-personaltools').size())
    {
        function getPortletManager(el)
        {
            if (jq(el).parents("#portal-column-one").size())
            {
                return "Left Column";
            }
            else if (jq(el).parents("#portal-column-two").size())
            {
                return "Right Column";
            }
            else if (jq(el).parents("#centercolumn").size())
            {
                return "Center Column";
            }
            else if (jq(el).parents("#rightcolumn").size())
            {
                return "Right Column (Homepage)";
            }
            else if (jq(el).parents("#portlets-above").size())
            {
                return "Content Well (Above Content)";
            }
            else if (jq(el).parents("#portlets-below").size())
            {
                return "Content Well (Below Content)";
            }
            else if (jq(el).parents("#portlets-footer").size())
            {
                return "Footer";
            }
            else
            {
                return "Other";
            }

        }
        
        function getPortletTitle(el)
        {
            var pm = getPortletManager(el);
            var pw = jq(el).parents(".portletWrapper");
            if (pw.size())
            {
                var ph = pw.children(".portletHeader");
                
                if (ph.children("span").size())
                {
                    ph = ph.children("span");
                }

                if (ph.children("a").size())
                {
                    ph = ph.children("a");
                }
                
                var ph_text = ph.html();

                if (ph_text)
                {
                    return pm + ": " + ph_text.trim().replace("&amp;", "&");
                }
            }
            
            return pm;
                
        }

        function getButtonTitle(el)
        {
            el = jq(el);
            if (el.children("span").size())
            {
                el = el.children("span");
            }

            var el_text = el.html();

            if (el_text)
            {
                return el_text.trim().replace("&amp;", "&");
            }
            else
            {
                return "";
            }
        }
            
        
        // Track Pageview for Thank You page for forms
        
        if (jq('body.template-fg_register_thankspage_view_p3, body.fg_thankspage_view_p3').size())
        {
            _gaq.push(['send', 'pageview', window.location.pathname + '/thank-you']);
        }

        // Top navigation tracking
        jq('#portal-top > .top-navigation li a').click(
            function() {
                var button_title = getButtonTitle(this);
                
                ga('send', 'event', 'Top Navigation', button_title, 'Top Navigation');
            }
        );

        // Navigation Portlet Header tracking
        jq('.portletNavigationHeader a').click(
            function() {
                var button_title = getButtonTitle(this);
                button_title = button_title + " (Navigation Heading)";
                var portlet_title = getPortletTitle(this);

                ga('send', 'event', 'Navigation Portlet', button_title, portlet_title);
            }
        );

        jq('.portletNavigationSubHeader a').click(
            function() {
                var button_title = getButtonTitle(this);
                button_title = button_title + " (Navigation Subheading)";
                var portlet_title = getPortletTitle(this);

                ga('send', 'event', 'Navigation Portlet', button_title, portlet_title);
            }
        );


        // Navigation Portlet tracking
        jq('.portletNavigationTree li a').click(
            function() {
                var button_title = getButtonTitle(this);
                var portlet_title = getPortletTitle(this);
                
                ga('send', 'event', 'Navigation Portlet', button_title, portlet_title);
            }
        );



        // Feedmixer Portlet Tracking
        jq('.portletfeedmixer .portletItem a, .portletfeedmixer .portletItem img').click(
            function() {
                var button_title = getButtonTitle(this);
                var portlet_title = getPortletTitle(this);
                
                ga('send', 'event', 'Feedmixer Portlet', button_title, portlet_title);
            }
        );

        // Collection Portlet Tracking
        jq('.portletCollection .portletItem a').click(
            function() {
                var button_title = getButtonTitle(this);
                var portlet_title = getPortletTitle(this);
                
                ga('send', 'event', 'Collection Portlet', button_title, portlet_title);
            }
        );

        // Feedmixer Portlet Tracking (More)
        jq('.portletfeedmixer .portletFooter a').click(
            function() {
                var button_title = "More...";
                var portlet_title = getPortletTitle(this);
                
                ga('send', 'event', 'Feedmixer Portlet', button_title, portlet_title);
            }
        );

        // Collection Portlet Tracking (More)
        jq('.portletCollection .portletFooter a').click(
            function() {
                var button_title = "More...";
                var portlet_title = getPortletTitle(this);
                
                ga('send', 'event', 'Collection Portlet', button_title, portlet_title);
            }
        );
        
        // Image Portlet Tracking
        jq('.imagePortlet a').click(
            function() {
                var button_title = jq(this).children('img').attr('alt');            
                var portlet_title = getPortletTitle(this);
                    
                if (! button_title)
                {
                    button_title = getButtonTitle(this);
                }

                ga('send', 'event', 'Image Portlet', button_title, portlet_title);
            }
        );
    
        // Link Icon Tracking
        jq('.portletLinkIcon a').click(
            function() {
                var icon_title = getButtonTitle(this);
                var portlet_title = getPortletTitle(this);
                                    
                ga('send', 'event', 'Link Icon', icon_title, portlet_title);
            }
        );
        
        // Link Button Tracking
        jq('.portletLinkButton a').click(
            function() {
                var button_title = getButtonTitle(this);
                var portlet_title = getPortletTitle(this);

                if (! button_title)
                {
                    button_title = jq(this).children('img').attr('alt');
                }
                    
                ga('send', 'event', 'Link Button', button_title, portlet_title);
            }
        );
        
        // PDF tracking
        jq('#addthis .pdf a').click(
            function() {
                ga('send', 'event', 'AddThis', 'Download PDF', 'Download PDF');
            }
        );
    }
    
    // flexslider load and tracking
   
    var fs = jq('.flexslider')
   
    if (fs.size())
    {
        var randomize = true;
        
        if (fs.attr('data-random') == 'sequential')
        {
            randomize = false;
        }
        
        fs.flexslider(
            {
                randomize: randomize,
                slideshow : false,
                start: function(slider) {
                    // Mark non-screen reader friendly items as aria-hidden.
                    jq('.flexslider .clone').attr('aria-hidden', 'true');
                    jq('.flexslider .flex-control-nav').attr('aria-hidden', 'true');
                    jq('.flexslider .flex-direction-nav').attr('aria-hidden', 'true');
                }

            }
        );

        if (! jq('#portal-personaltools').size())
        {
            jq('.flexslider .flex-control-nav li a').click(
                function() {
                    ga('send', 'event', 'Homepage Slider', 'Dot Navigation', 'Dot ' + jq(this).html().trim());
                }
            );
        
            jq('.flexslider .flex-direction-nav li a.next').click(
                function() {
                    ga('send', 'event', 'Homepage Slider', 'Next/Previous Navigation', 'Next');
                }
            );
        
            jq('.flexslider .flex-direction-nav li a.prev').click(
                function() {
                    ga('send', 'event', 'Homepage Slider', 'Next/Previous Navigation', 'Previous');
                }
            );
        
            jq('.flexslider .tileHeadline a').click(
                function() {
                    var article_title = jq(this).html().trim();
                    ga('send', 'event', 'Homepage Slider', 'Headline Click', article_title);
                }
            );
        
            jq('.flexslider .tileFooter a').click(
                function() {
                    var article_title = jq(this).parents('li.tileItem').find('.tileHeadline a').html().trim()
                    ga('send', 'event', 'Homepage Slider', 'Footer Click', article_title);
                }
            );
    
            jq('.flexslider .contentLeadImageContainer a').click(
                function() {
                    var article_title = jq(this).parents('li.tileItem').find('.tileHeadline a').html().trim()
                    ga('send', 'event', 'Homepage Slider', 'Image Click', article_title);
                }
            );
        }        
    }
});

/* Blur contents on submit of local search form. */

jq(document).ready(

    function() {

        jq('#plonelocalsearchform').submit(
            function() {
                jq("#content-core").fadeTo(0,0.25);
            }
        )
    }

);

/* Dynamically add 'data-title' property to responsive tables */

jq(document).ready(

    function() {

        jq('#content table.responsive').each(
        
            function() {
        
                var column_headers = [];
        
                jq(this).find('th').each(
                    function() {
                        column_headers.push(jq(this).html());
                    }
                )
        
                jq(this).find('tr').each(
                    function() {
        
                        var children = jq(this).children('td');
                        if (children.size())
                        {
                            for (var i=0; (i<column_headers.length && i < children.size()); i++)
                            {
                                jq(children[i]).attr('data-title', column_headers[i]);
                            }
                        }
                    }
                )
            }
        )
    }

);

/* Add custom-h2-as-h3 class to body in post. */
jq(document).ready(

    function() {
        jq("body:not(.custom-h2-as-h3)").each( 
            function () {
                var body = jq(this);
                var h2 = body.find("#content-text h2");
                var h3 = body.find("#content-text h3");
                if (h2.size() && ! h3.size())
                {
                    body.addClass("custom-h2-as-h3");
                }
            }
        );
    }
);

/* Add onclick event to feedmixer lead image that goes to the item, so we don;t
   have two links. */

jq(document).ready(

    function() {
        jq(".portletfeedmixer .portletItem").each( 
            function () {
                var portletItem = jq(this);
                var img = portletItem.find(".rssImage img");
                var title = portletItem.find("a.title");

                img.addClass("link");
                
                if (img.size())
                {
                    img.click(function () {
                            window.location = title.attr('href');
                        }
                    );
                }
            }
        );
    }
);

/* Remove 'icons-on' class if we have a custom class of 'no-icons' */

jq(document).ready(

    function() {
        jq("body.custom-no-icons").each( 
            function () {
                jq(this).removeClass('icons-on');
            }
        );
    }
);


/*  Add a 'Mobile Portlets' div and copy portal-column-one portlets to it */

jq(document).ready(

    function() {
        var pcm = jq('<div id="portal-column-mobile"></div>');
        
        jq("#portal-column-one").find('.portletWrapper').each(
            function () {
                if ( ! (jq(this).find('.portletNavigationTree').size() || jq(this).hasClass('portlet-mobile-navigation'))) {
                    jq(this).clone().appendTo(pcm);
                }
            }
        );
        
        jq("#portal-columns").append(pcm);
    }
);


/* - drilldown.js - */
jq(document).ready(
    function() {
        jq(".portletDropdown").each(
            function() {
                var dl = jq(this);
                var select_id = dl.parent("div.portletWrapper").attr('id').replace('portletwrapper-', 'select-dropdown-');
                var select_el = jq('<select id="' + select_id + '"></select>');
                select_el.append('<option value="">Select ' + dl.attr('data-select-type') + '...</option>');
                label_el = jq('<label for="'  + select_id + '"></label>"');
                label_el.html(dl.attr('data-select-label'));
                label_el.attr('class', 'hiddenStructure');
                
                dl.find("a").each(
                    function () {
                        var a = jq(this);
                        var option = jq('<option value="' + a.attr('href') + '"></option>');
                        option.html(a.html());
                        select_el.append(option);
                    }
                );

                dl.children("dd").hide();
                dl.prepend(select_el);
                dl.prepend(label_el);

                select_el.change(
                    function () {
                        var selected_value = jq(this).val();
                        if (selected_value)
                        {
                            document.location.href = selected_value;
                        }
                    }
                );
            }
        );
    }
);
