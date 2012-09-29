// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.masonry
//= require jquery.infinitescroll
//= require foundation
//= require foundation/app.js
//= jquery.foundation.topbar.js
//= require_tree .


$(function(){
  $(document).foundationTopBar();

  var $container = $('#container');

  $container.imagesLoaded(function(){
      $container.masonry({
         itemSelector: '.box',
         columnWidth: 100
       });
     });

  $container.masonry({
       itemSelector : '.box',
      isAnimated: true
   });

  $container.infinitescroll(
    {
      navSelector  : '#page-nav',    // selector for the paged navigation
      nextSelector : '#page-nav a',  // selector for the NEXT link (to page 2)
      itemSelector : '.box',     // selector for all items you'll retrieve
      animate      : true,
      debug        : true,
      loadingText  : "loading..."
    },

    function( newElements ) {
      var $newElems = $( newElements ).css({ opacity: 0 });
      $newElems.animate({ opacity: 1 });
      $container.masonry( 'appended', $newElems, true );
    }
  );



});


/*
 * jQuery Foundation Top Bar 2.0.1
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
    'use strict';

    var settings = {
            index : 0,
            initialized : false
        },
        methods = {
            init : function (options) {
                return this.each(function () {
                    settings = $.extend(settings, options);
                    settings.$w = $(window),
                        settings.$topbar = $('nav.top-bar');
                    settings.$titlebar = settings.$topbar.children('ul:first');
                    var breakpoint = $("<div class='top-bar-js-breakpoint'/>").appendTo("body");
                    settings.breakPoint = breakpoint.width();
                    breakpoint.remove();

                    if (!settings.initialized) {
                        methods.assemble();
                        settings.initialized = true;
                    }

                    if (!settings.height) {
                        methods.largestUL();
                    }

                    $('.top-bar .toggle-topbar').live('click.fndtn', function (e) {
                        e.preventDefault();

                        if (methods.breakpoint()) {
                            settings.$topbar.toggleClass('expanded');
                            settings.$topbar.css('min-height', '');

                        }
                    });

                    // Show the Dropdown Levels on Click
                    $('.top-bar .has-dropdown>a').live('click.fndtn', function (e) {
                        e.preventDefault();

                        if (methods.breakpoint()) {
                            var $this = $(this),
                                $selectedLi = $this.closest('li'),
                                $nextLevelUl = $selectedLi.children('ul'),
                                $section = $this.closest('section'),
                                $nextLevelUlHeight = 0,
                                $largestUl;

                            settings.index += 1;
                            $selectedLi.addClass('moved');
                            $section.css({'left': -(100 * settings.index) + '%'});
                            $section.find('>.name').css({'left': 100 * settings.index + '%'});

                            $this.siblings('ul').height(settings.height + settings.$titlebar.outerHeight(true));
                            settings.$topbar.css('min-height', settings.height + settings.$titlebar.outerHeight(true) * 2)
                        }
                    });

                    // Go up a level on Click
                    $('.top-bar .has-dropdown .back').live('click.fndtn', function (e) {
                        e.preventDefault();

                        var $this = $(this),
                            $movedLi = $this.closest('li.moved'),
                            $section = $this.closest('section'),
                            $previousLevelUl = $movedLi.parent();

                        settings.index -= 1;
                        $section.css({'left': -(100 * settings.index) + '%'});
                        $section.find('>.name').css({'left': 100 * settings.index + '%'});

                        if (settings.index === 0) {
                            settings.$topbar.css('min-height', 0);
                        }

                        setTimeout(function () {
                            $movedLi.removeClass('moved');
                        }, 300);
                    });
                });
            },
            breakpoint : function () {
                return settings.$w.width() < settings.breakPoint;
            },
            assemble : function () {
                var $section = settings.$topbar.children('section');

                // Pull element out of the DOM for manipulation
                $section.detach();

                $section.find('.has-dropdown>a').each(function () {
                    var $link = $(this),
                        $dropdown = $link.siblings('.dropdown'),
                        $titleLi = $('<li class="title back js-generated"><h5><a href="#"></a></h5></li>');

                    // Copy link to subnav
                    $titleLi.find('h5>a').html($link.html());
                    $dropdown.prepend($titleLi);
                });

                // Put element back in the DOM
                $section.appendTo(settings.$topbar);
            },
            largestUL : function () {
                var uls = settings.$topbar.find('section ul ul'),
                    largest = uls.first(),
                    total = 0;

                uls.each(function () {
                    if ($(this).children('li').length > largest.children('li').length) {
                        largest = $(this);
                    }
                });

                largest.children('li').each(function () { total += $(this).outerHeight(true); });

                settings.height = total;
            }
        };

    $.fn.foundationTopBar = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.foundationTopBar');
        }
    };

}(jQuery, this));

;(function ($, window, undefined) {
    'use strict';

    $.fn.foundationNavigation = function (options) {

        var lockNavBar = false;
        // Windows Phone, sadly, does not register touch events :(
        if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
            $(document).on('click.fndtn touchstart.fndtn', '.nav-bar a.flyout-toggle', function (e) {
                e.preventDefault();
                var flyout = $(this).siblings('.flyout').first();
                if (lockNavBar === false) {
                    $('.nav-bar .flyout').not(flyout).slideUp(500);
                    flyout.slideToggle(500, function () {
                        lockNavBar = false;
                    });
                }
                lockNavBar = true;
            });
            $('.nav-bar>li.has-flyout', this).addClass('is-touch');
        } else {
            $('.nav-bar>li.has-flyout', this).hover(function () {
                $(this).children('.flyout').show();
            }, function () {
                $(this).children('.flyout').hide();
            });
        }

    };

})( jQuery, this );

