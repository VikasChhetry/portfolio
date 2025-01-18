/*
  [JS Index]
  
  ---
  
  Template Name: Viex - Creative Portfolio Template
  Author:  ex-nihilo
  Version: 1.0
*/


/*
  1. init animation
  2. init elements
  3. panels
  4. forms
    4.1. contact form
  5. morphext
  6. text animation
  7. animations
  8. owl carousel slider
    8.1. owl carousel slider TESTIMONIALS
    8.2. owl news carousel slider NEWS
  9. skills bar
  10. facts counter
  11. navigation
    11.1. navigation localScroll
    11.2. navigation active state
  12. magnificPopup
    12.1. magnificPopup news gallery
  13. YouTube player
  14. slick slider
    14.1. slick fullscreen slideshow ZOOM/FADE
*/


$(function() {
    "use strict";
	
	
    $(window).on("load", function() {
        // 1. init animation
        $(initAnimation);
    });
	
    // 2. init elements
    $(initFadeInText);
    $(init);
	
    // 3. panels
    $(".open-menu-content, .close-menu-content").on("click", function() {
        if ($(".panel-left, .panel-right").hasClass("open")) {
            $(".panel-left, .panel-right").removeClass("open");
            $(".panel-left, .panel-right").addClass("close");
            $("h6, .titleOT, #navigation, #home-slides-nav").removeClass("close");
            $("h6, .titleOT, #navigation, #home-slides-nav").addClass("open");
            $("#overlay").fadeOut(1600, "easeInOutQuad");
            $(".panel-left-overlay").fadeOut(800, "easeInOutQuad");
        } else {
            $(".panel-left, .panel-right").removeClass("close");
            $(".panel-left, .panel-right").addClass("open");
            $("h6, .titleOT, #navigation, #home-slides-nav").removeClass("open");
            $("h6, .titleOT, #navigation, #home-slides-nav").addClass("close");
            $("#overlay").fadeIn(800, "easeInOutQuad");
            $(".panel-left-overlay").fadeIn(1600, "easeInOutQuad");
        }
    });
	
    // 4. forms
    // 4.1. contact form
    // $("form#form").on("submit", function() {
    //     $("form#form .error").remove();
    //     var s = !1;
    //     if ($(".requiredField").each(function() {
    //             if ("" === jQuery.trim($(this).val())) $(this).prev("label").text(), $(this).parent().append('<span class="error">This field is required</span>'), $(this).addClass(
    //                 "inputError"), s = !0;
    //             else if ($(this).hasClass("email")) {
    //                 var r = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //                 r.test(jQuery.trim($(this).val())) || ($(this).prev("label").text(), $(this).parent().append('<span class="error">Invalid email address</span>'), $(this).addClass(
    //                     "inputError"), s = !0);
    //             }
    //         }), !s) {
    //         $("form#form input.submit").fadeOut("normal", function() {
    //             $(this).parent().append("");
    //         });
    //         var r = $(this).serialize();
    //         $.post($(this).attr("action"), r, function() {
    //             $("form#form").slideUp("fast", function() {
    //                 $(this).before('<div class="success">Your email was sent successfully.</div>');
    //             });
    //         });
    //     }
    //     return !1;
    // });
    // script.js

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');

    // Form validation patterns
    const patterns = {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        subject: /^.{2,100}$/,
        message: /^[\s\S]{10,1000}$/
    };

    // Error messages
    const errorMessages = {
        name: 'Name should be 2-50 characters long and contain only letters',
        email: 'Please enter a valid email address',
        subject: 'Subject should be 2-100 characters long',
        message: 'Message should be 10-1000 characters long'
    };

    // Function to validate a single field
    function validateField(field) {
        const fieldName = field.getAttribute('name');
        const fieldValue = field.value.trim();
        const pattern = patterns[fieldName];

        if (!pattern.test(fieldValue)) {
            showError(field, errorMessages[fieldName]);
            return false;
        }

        removeError(field);
        return true;
    }

    // Function to show error message
    function showError(field, message) {
        removeError(field); // Remove any existing error

        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = message;

        field.style.borderColor = '#dc3545';
        field.parentNode.appendChild(errorDiv);
    }

    // Function to remove error message
    function removeError(field) {
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '#ddd';
    }

    // Function to show alert message
    function showAlert(message, type) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        contactForm.insertBefore(alert, contactForm.firstChild);

        // Remove alert after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }

    // Real-time validation on input
    contactForm.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });

        field.addEventListener('input', () => {
            if (field.parentNode.querySelector('.error-message')) {
                validateField(field);
            }
        });
    });

    // Form submission handler
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (!isValid) {
            showAlert('Please correct the errors before submitting.', 'error');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        try {
            const formData = new FormData(contactForm);
            const response = await fetch('send_email.php', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showAlert('Message sent successfully!', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showAlert('Failed to send message. Please try again later.', 'error');
        } finally {
            // Re-enable submit button and restore original text
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    });

    // Check URL parameters for status messages on page load
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'success') {
        showAlert('Message sent successfully!', 'success');
    } else if (status === 'error') {
        showAlert('Failed to send message. Please try again later.', 'error');
    }
});
	
    // 5. morphext
    $("#js-rotating").Morphext({
        animation: "pulse",
        separator: "|",
        speed: 4000,
        complete: function() {}
    });
	
    // 6. text animation
    function initFadeInText() {
        $(".text-animation").each(function(i) {
            $(this).addClass(".text-animation" + (i + 1));
        });
    }
	
    // 7. animations
    function initAnimation() {
        $(".grand-opening").delay(1400).animate({
            opacity: 1
        }, 600, function() {
            $(".center-space-top, .titleOT, nav, h6, #home-slides-nav").stop(true, true).delay(400).animate({
                opacity: 1
            }, 1800);
        });
    }
    function init() {
        $(".center-space-top, .titleOT, nav, h6, #home-slides-nav").css("opacity", "0");
    }
	
    // 8. owl carousel slider
    // 8.1. owl carousel slider TESTIMONIALS
    $(".testimonials-carousel").owlCarousel({
        loop: true,
        center: true,
        items: 1,
        margin: 0,
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 4000,
        smartSpeed: 450,
        nav: false
    });
    // 8.2. owl news carousel slider NEWS
    var owl = $("#news-carousel.owl-carousel");
    owl.owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        autoplay: false,
        autoplayTimeout: 4000,
        autoplaySpeed: 1000,
        autoplayHoverPause: false,
        dots: false,
        nav: true,
        navText: ["<i class='owl-custom ion-chevron-left'></i>", "<i class='owl-custom ion-chevron-right'></i>"]
    });
	
    // 9. skills bar
    $(".show-skillbar").appear(function() {
        $(".skillbar").skillBars({
            from: 0,
            speed: 4000,
            interval: 100,
            decimals: 0
        });
    });
	
    // 10. facts counter
    $(".facts-counter-number").appear(function() {
        var count = $(this);
        count.countTo({
            from: 0,
            to: count.html(),
            speed: 1200,
            refreshInterval: 60
        });
    });
	
    // 11. navigation
    // 11.1. navigation localScroll
    $.localScroll({
        target: ".panel-right",
        queue: true,
        duration: 1000,
        hash: false,
        onBefore: function(e, anchor, $target) {},
        onAfter: function(anchor, settings) {}
    });
    // 11.2. navigation active state
    $("ul.main-menu a").on("click", function() {
        $("ul.main-menu a").removeClass("active");
        $(this).addClass("active");
    });
	
    // 12. magnificPopup
    // 12.1. magnificPopup news gallery
    $(".popup-photo-gallery").each(function() {
        $(this).magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: true
            },
            removalDelay: 100,
            mainClass: "mfp-fade",
            fixedContentPos: false
        });
    });
	
	// 13. YouTube player
	$("#bgndVideo").YTPlayer();
	
	// 14. slick slider
	// 14.1. slick fullscreen slideshow ZOOM/FADE
    $(".slick-fullscreen-slideshow-zoom-fade").slick({
        arrows: false,
        initialSlide: 0,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<i class='slick-prev icon ion-chevron-left'></i>",
        nextArrow: "<i class='slick-next icon ion-chevron-right'></i>",
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "cubic-bezier(0.7, 0, 0.3, 1)",
        speed: 1600,
        draggable: true,
        dots: false,
        pauseOnDotsHover: true,
        pauseOnFocus: false,
        pauseOnHover: false
    });
	
	
});

// JavaScript for Overlay Functionality -->

    const video = document.getElementById('myVideo');
    const overlay = document.getElementById('videoOverlay');

    // Play video and hide overlay when clicked
    overlay.addEventListener('click', () => {
        video.play();
        overlay.style.display = 'none';
    });

    // Hide overlay during video play
    video.addEventListener('play', () => {
        overlay.style.display = 'none';
    });

    // Show overlay when video is paused
    video.addEventListener('pause', () => {
        overlay.style.display = 'flex';
    });

    // Show overlay when video ends
    video.addEventListener('ended', () => {
        overlay.style.display = 'flex';
    });
