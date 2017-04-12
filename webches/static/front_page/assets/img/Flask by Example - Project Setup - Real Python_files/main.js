$(function() {

  setInterval(function(){
    jQuery('#testimonials .slide').filter(':visible').fadeOut(1000,function(){
      if(jQuery(this).next('.slide').size()){
        jQuery(this).next().fadeIn(1000);
      } else{
        jQuery('#testimonials .slide').eq(0).fadeIn(1000);
      }
    });
  },5000);

    $(".main-top-download").click(function() {
      mixpanel.track("Mainpage Top Download Courses");
      ga('send', 'event', { eventCategory: 'purchase',
                          eventAction: 'mainpage_top',
                          eventLabel: 'courses',
                          eventValue: 2});
    });
    $(".main-top-packages").on("click", function() {
      mixpanel.track("Mainpage Top Pricing Packages");
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'mainpage_top_pricing',
                          eventLabel: 'course_pricing',
                          eventValue: 1});
    });
    $(".main-bottom-download").on("click", function() {
      mixpanel.track("Mainpage Bottom Download Courses");
      ga('send', 'event', { eventCategory: 'purchase',
                          eventAction: 'mainpage_bottom',
                          eventLabel: 'course_bottom',
                          eventValue: 2});
    });
    $(".main-bottom-download-mentor").on("click", function() {
      mixpanel.track("Mainpage Bottom Download Courses + Mentor");
      ga('send', 'event', { eventCategory: 'purchase',
                          eventAction: 'mainpage_bottom_mentor',
                          eventLabel: 'mentor_bottom',
                          eventValue: 4});
    });
    $(".main-bottom-download-sample").on("click", function() {
      mixpanel.track("Mainpage Bottom Download Sample");
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'mainpage_sample',
                          eventLabel: 'course_sample',
                          eventValue: 1});
    });

    $("#sample_chapter_courses").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'courses_sample',
                          eventLabel: 'course_sample_course_page',
                          eventValue: 1});
    });

    $("#enterprise").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'mainpage_enterprise_info',
                          eventLabel: 'enterprise_info',
                          eventValue: 1});
    });

    $("#email_subscribe").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'mainpage_email_subscribe',
                          eventLabel: 'email_subscribe',
                          eventValue: 2});
    });

    $("#email_signup_from_blog").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'blog_email_subscribe',
                          eventLabel: 'email_subscribe',
                          eventValue: 2});
    });
    $("#toc1").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'courses_toc1_download',
                          eventLabel: 'courses_toc1',
                          eventValue: 1});
    });

    $("#toc2").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'courses_toc2_download',
                          eventLabel: 'courses_toc2',
                          eventValue: 1});
    });

    $("#toc3").on("click", function() {
      ga('send', 'event', { eventCategory: 'info',
                          eventAction: 'courses_toc3_download',
                          eventLabel: 'courses_toc3',
                          eventValue: 1});
    });

    //social mentions
    $("#cheat_sheet").on("click", function() {
      ga('send', 'event', { eventCategory: 'social',
                          eventAction: 'mainpage_cheat_sheet',
                          eventLabel: 'tweet_cheat_sheet',
                          eventValue: 1});
    });


    // simplegoods -> google analytics

    $("body").on("success", "#SGEmbed", function(e){
      trackSale(e.originalEvent.detail);
    });

    function trackSale(data) {

      ga('ecommerce:addTransaction', {
        'id': data.transaction_id,
        'name': data.product_name,
        'affiliation': 'RealPython.com',
        'revenue': data.price
      });

      ga('ecommerce:send');

      // _gaq.push(['_addTrans',
      //   data.transaction_id,
      //   'RealPython.com',
      //   data.price,
      // ]);

      // _gaq.push(['_addItem',
      //   data.transaction_id,
      //   data.product_name,
      //   data.product_price,
      //   '1'
      // ]);

      // _gaq.push(['_trackTrans']);
    }


});