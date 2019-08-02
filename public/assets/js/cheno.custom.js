jQuery(document).ready(function () {
    "use strict";
    var width = $( window ).width(),
    scroll_win = $( document ).scrollTop();
    
    // fixed menu
    $( window ).scroll( function() {
        scroll_win = $( document ).scrollTop();
        console.log(scroll_win);
        if( scroll_win > 40 ) {
            $( '.header' ).addClass('scroll');
        }
        else {
            $( '.header' ).removeClass('scroll');
        }
    });
    
    // Languages
    $('.lang-flag').click(function(){
        $('.language').slideToggle('slow');
        if( width < 992 ) {
            $( '.top-social ul:last' ).hide( 'slow' );
            $('.btn-share a').removeClass( 'active' );
        }
    });
    
    // RS
    $('.list-rs li a').click(function () {
        $(".list-rs li a.active").removeClass("active");
        $(this).addClass('active');
    });
    
    // RS mobile
    $('.btn-share').click(function(){
        $( this ).children( 'a' ).toggleClass( 'active' );
        $( '.top-social ul:last' ).slideToggle( 'slow' );
        $( '.language' ).hide( 'slow' );
    });
    
    // bouton scroll to top
    $.scrollIt({
        scrollTime: 3000, // how long (in ms) the animation takes
    });
    
    // resize windows
    $(window).resize(function(){
        width = $( this ).width();
        if( width > 992 ) $( '.top-social ul:last' ).show();
        if( width < 992 ) $( '.top-social ul:last' ).hide();
    });
    
    $("#home-slider").owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true,
        pagination: true,
        navigationText: ["<img src='assets/images/left.png'>","<img src='assets/images/right.png'>"]
    });

    $("#staff-slider").owlCarousel({
        navigation: true, // Show next and prev buttons
        pagination: false,
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 3,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        navigationText: ["<img src='assets/images/arrow-left-img.png'>","<img src='assets/images/arrow-right-img.png'>"]
    });

    $("#location-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem : false,
        transitionStyle : "fade",
        pagination: true,
        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    $("#testimonial-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 3,
        transitionStyle : 'fade',
        pagination: true,
        center: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });
    
    $("#testimonial-slider").owlCarousel({
        jsonPath : 'json/customData.json',
        jsonSuccess : customDataSuccess
    });
 
    function customDataSuccess(data){
        var content = "";
        for(var i in data["items"]){
            var img = data["items"][i].img;
            var alt = data["items"][i].alt;
            content += "<img src=\"" +img+ "\" alt=\"" +alt+ "\">"
        }
        $("#testimonial-slider").html(content);
    }
    
    $("#blog-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 2,
        pagination: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    $("#store-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 1,
        pagination: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    $("#brand-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        slideSpeed: 300,
        paginationSpeed: 400,
        items: 6,
        pagination: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });

    $("#tweet-slider").owlCarousel({
        navigation: false, // Show next and prev buttons
        autoPlay:true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem : true,
        transitionStyle : "goDown",
        pagination: false,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3]
    });
    
    $('#single-room-slide').owlCarousel({
        autoPlay: false,
        pagination: false,
        navigation: true,
        items: 1,
        itemsDesktop: [1199, 1],
        itemsDesktopSmall: [992, 1],
        itemsTablet: [767, 1],
        itemsMobile: 1,
        navigationText: ["<img src='assets/images/left-white.png'>","<img src='assets/images/right-white.png'>"]
    });

    $('.more-slider').owlCarousel({
        autoPlay: false,
        pagination: false,
        navigation: true,
        items: 1,
        itemsDesktop: [1024, 3],
        itemsDesktopSmall: [768, 2],
        itemsTablet: [650, 1],
        itemsMobile: 1,
        navigationText: ["<img src='assets/images/arrow-left-img.png'>","<img src='assets/images/arrow-right-img.png'>"]
    })

    // Select Box js
    $('.select-box-menu').click(function () {
        $(this).attr('tabindex', 1).focus();
        $(this).toggleClass('active');
        $(this).find('.dropeddown').slideToggle(300);
    });
    
    $('.select-box-menu').focusout(function () {
        $(this).removeClass('active');
        $(this).find('.dropeddown').slideUp(300);
    });
    
    $('.select-box-menu .dropeddown li').click(function () {
        $(this).parents('.select-box-menu').find('span').text($(this).text());
        $(this).parents('.select-box-menu').find('input').attr('value', $(this).attr('id'));
    });

    // init Isotope
    var $container = $('.masonary-filter').isotope({
        itemSelector: '.filter-item',
        masonry: {
            gutter: 20
        }
    });
    
    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function () {
            var number = $(this).find('.number').text();
            return parseInt(number, 15) > 50;
        }
    };
    
    // bind filter button click
    $('#filters').on('click', '.filter-btn', function () {
        var filterValue = $(this).attr('data-filter');
        // use filterFn if matches value
        filterValue = filterFns[filterValue] || filterValue;
        $container.isotope({
            filter: filterValue
        });
    });
    
    // change is-checked class on buttons
    $('.button-group').each(function (i, buttonGroup) {
        var $buttonGroup = $(buttonGroup);
        $buttonGroup.on('click', '.filter-btn', function () {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $(this).addClass('is-checked');
        });
    });
    
    // Main menu
    jQuery("#menuzord").menuzord({
        align: "left"
    });
    
    // popup galerie hp
    $('.masonary-filter').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled:true
            }
        });
    });
    
    // Accordions service
    function toggleChevron(e) {
        $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('icofont-minus icofont-plus');
    }
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
    $('#accordion').on('shown.bs.collapse', toggleChevron);

});

// makes sure the whole site is loaded
jQuery(window).load(function() {
    "use strict";
    // init Isotope
    var $container = $('.masonary-filter').isotope({
        itemSelector: '.filter-item',
        masonry: {
            gutter: 20
        }
    });
    // will first fade out the loading animation
    jQuery(".site-loader").fadeOut();
    // will fade out the whole DIV that covers the website.
    jQuery(".loading").delay(1000).fadeOut("slow");
});