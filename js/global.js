/* 01 - Variables */
/* 02 - page calculations */
/* 03 - function on document ready */
/* 04 - function on page load */
/* 05 - function on page resize */
/* 06 - function on page scroll */
/* 07 - swiper sliders */
/* 08 - buttons, clicks, hovers */

var _functions = {};

jQuery(function($) {

	"use strict";

	/*================*/
	/* 01 - VARIABLES */
	/*================*/
	var swipers = [], winW, winH, winScr,pizzaValue, removeProductId = 0, contentOverflow, _isIE = window.navigator.msPointerEnabled, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i), _isFF = 'MozAppearance' in document.documentElement.style;

	/*========================*/
	/* 02 - page calculations */
	/*========================*/
	_functions.pageCalculations = function(){
		winW = $(window).width();
		winH = $(window).height();
	};

	/*=================================*/
	/* 03 - function on document ready */
	/*=================================*/

	// Check if mobile mobile device
	if(_ismobile) $('body').addClass('mobile');

	// Main set time out for content loaded
	setTimeout( function() {
		// Add class after page loaded
		$('body').addClass('loaded');

		// Page calculations functuin
		_functions.pageCalculations();

		// Delate main page loader
		$('#loader-wrapper').fadeOut(200);

		if ( $('.SelectBox').length ) $('.SelectBox').SumoSelect();
		
		// Swiper init function
		_functions.initSwiper();

		if( $('.moreInfoContent').length ) contentOverflow = document.querySelector('.moreInfoContent').style.height;

		sectionCoordinates();

		if ( $('.textAnimation').length ) {
			$('.textAnimation').each( function() {
				var splitString = $(this).html();
			    var object = '';
			    
				for ( var i = 0; i < splitString.length; i++ ) {
					object += '<i>' + splitString.charAt(i) + '</i>';
					if ( splitString.length -1 ) {
						$(this).html(object);
					}
				}	
			});
		}

		_functions.scrollCall();

	}, 500);


	$(document).ready( function() { // product mobile images

		if ( $('.sliderPreview').length ) {
			if ( $(window).width() < 768 ) {
				$('.sliderPreview').each( function() {
					$(this).find('img').attr('src', $(this).attr("data-preview"));
					$(this).addClass('preloaded');
				});
			}
		}

		if ( $(window).width() > 767 ) {
			if ( !$('.mobilePreload').length ) return false;

			$('.preview').each( function() {
				$(this).css({'background-image': 'url(' + $(this).attr("data-preview") + ')'});
				$(this).addClass('preloaded');
			} );

		} else {
			if ( !$('.mobilePreload').length ) return false;

			$('.mobilePreload').each( function() {
				$(this).closest('.productThumbnail').find('.productImage').css({'background-image': 'url(' + $(this).attr("data-mobile-preview") + ')'});
				$(this).css({'background-image': ''});
				$(this).addClass('preloaded');
			} );
		}
		
	});

	/*==============================*/
	/* 04 - function on page resize */
	/*==============================*/
	_functions.resizeCall = function(){
		_functions.pageCalculations();
	};
	
	if(!_ismobile){
		$(window).resize(function(){
			_functions.resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			_functions.resizeCall();
		}, false);
	}

	/*==============================*/
	/* 05 - function on page scroll */
	/*==============================*/
	$(window).scroll(function(){
		_functions.scrollCall();
	});

	_functions.scrollCall = function(){
		winScr = $(window).scrollTop();

		winScr > 50 ? $('header').addClass('scrolled') : $('header').removeClass('scrolled');

		animateSections();

		if ( !_isIE && $('.scrollParallax').length && $('.scrollParallax').closest('.mainBanner').outerHeight() > winScr ) {
			$('.scrollParallax').css({'transform': 'translate3d('+ '0,' + '' + winScr * 0.02 + '%' +',' + '0'});
			$('.scrollParallax').css({'-webkit-transform': '-webkit-translate3d('+ '0,' + '' + winScr * 0.02 + '%' +',' + '0'});
		}

		if ( $('.productItemAnimate').length ) {
			$('.productItemAnimate').each(function () {
		        var t = $(this);

		        if ( t.offset().top < winScr + winH / 1.3  ) {
		            t.addClass('animated');
		        }
		    });
		}

		if ( winScr + winH >= ( $(document).height() - $('footer').outerHeight() /2.2 ) ) {
			$('footer').addClass('footerAnimated');
		}
		
	};

	/*=====================*/
	/* 06 - swiper sliders */
	/*=====================*/
	var initIterator = 0;
	_functions.initSwiper = function(){
		$('.swiper-container').not('.initialized').each(function(){								  
			var $t = $(this);								  

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index+' initialized').attr('id', index);
			$t.find('>.swiper-pagination').addClass('swiper-pagination-'+index);
			$t.parent().find('>.swiper-button-prev').addClass('swiper-button-prev-'+index);
			$t.parent().find('>.swiper-button-next').addClass('swiper-button-next-'+index);

			var slidesPerViewVar = ($t.data('slides-per-view'))?$t.data('slides-per-view'):1;
			if(slidesPerViewVar!='auto') slidesPerViewVar = parseInt(slidesPerViewVar, 10);

			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				pagination: '.swiper-pagination-'+index,
		        paginationClickable: true,
		        nextButton: '.swiper-button-next-'+index,
		        prevButton: '.swiper-button-prev-'+index,
		        slidesPerView: slidesPerViewVar,
		        lazyLoading: true,
		        autoHeight:($t.is('[data-auto-height]'))?parseInt($t.data('auto-height'), 10):0,
		        loop: ($t.is('[data-loop]'))?parseInt($t.data('loop'), 10):0,
				autoplay: ($t.is('[data-autoplay]'))?parseInt($t.data('autoplay'), 10):0,
		        breakpoints: ($t.is('[data-breakpoints]'))? { 
		        	767: { slidesPerView: parseInt($t.attr('data-xs-slides'), 10) }, 
		        	991: { slidesPerView: parseInt($t.attr('data-sm-slides'), 10) }, 
		        	1199: { slidesPerView: parseInt($t.attr('data-md-slides'), 10) }, 
		        	1500: {slidesPerView: parseInt($t.attr('data-lt-slides'), 10)} } : {},
		        initialSlide: ($t.is('[data-ini]'))?parseInt($t.data('ini'), 10):0,
		        speed: ($t.is('[data-speed]'))?parseInt($t.data('speed'), 10):500,
		        mousewheelControl: ($t.is('[data-mousewheel]'))?parseInt($t.data('mousewheel'), 10):0,
		        mousewheelReleaseOnEdges: true,
		        direction: ($t.is('[data-direction]'))?$t.data('direction'):'horizontal',
				spaceBetween: ($t.is('[data-space]'))?parseInt($t.data('space'), 10):0,
				parallax: (_ismobile) ? 0 : ($t.is('[data-parallax]'))?parseInt($t.data('parallax'), 10):0,
				centeredSlides: ($t.is('[data-centered]'))?parseInt($t.data('centered'), 10):0
			});
			swipers['swiper-'+index].update();
			initIterator++;
		});

		$('.swiper-container.swiper-control-top').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.coupleSwiperWrapper').find('.swiper-control-bottom').attr('id')];
		});
		$('.swiper-container.swiper-control-bottom').each(function(){
			swipers['swiper-'+$(this).attr('id')].params.control = swipers['swiper-'+$(this).closest('.coupleSwiperWrapper').find('.swiper-control-top').attr('id')];
		});
	};

	$('.swiper-control-bottom .swiper-slide').on('click', function(){
		swipers['swiper-'+$(this).closest('.coupleSwiperWrapper').find('.swiper-control-top').attr('id')].slideTo($(this).index());
	});

	/*==============================*/
	/* 07 - buttons, clicks, hovers */
	/*==============================*/

	//open and close popup
	$(document).on('click', '.open-popup', function(e){
		e.preventDefault();

		if ( $(this).hasClass('delateProduct') ) {
			removeProductId = +$(this).attr('data-product');
		}

		$('.popupContent').removeClass('active');
		$('.popupWrapper, .popupContent[data-rel="'+$(this).data('rel')+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	});

	$(document).on('click', '.popupWrapper .buttonClose, .popupWrapper .layerClose, .popupWrapper .reject', function(){
		$('.popupWrapper, .popupContent').removeClass('active');
		$('html').removeClass('overflow-hidden');
		return false;
	});
	
	//Function OpenPopup
	function openPopup(foo){
		$('.popup-content').removeClass('active');
		$('.popup-wrapper, .popup-content[data-rel="'+foo+'"]').addClass('active');
		$('html').addClass('overflow-hidden');
		return false;
	}

	//Tabs
	var tabsFinish = 0;
	$('.tabMenu').on('click', function() {
		if($(this).hasClass('active') || tabsFinish) return false;
		tabsFinish = 1;
        var tabsWrapper = $(this).closest('.tabsBlock'),
        	tabsMenu = tabsWrapper.find('.tabMenu'),
        	tabsItem = tabsWrapper.find('.tabEntry'),
        	index = tabsMenu.index(this);
        
        tabsItem.filter(':visible').fadeOut(function(){
        	tabsItem.eq(index).fadeIn(function(){
        		tabsFinish = 0;
        	});
        });
        tabsMenu.removeClass('active');
        $(this).addClass('active');
    });

	//Accordeon
	$('.accordeonTitle').on('click', function(){
		$(this).closest('.accordeon').find('.accordeonTitle').not(this).removeClass('active').next().slideUp();
		$(this).addClass('active').next().slideDown();
	});

	// Pizza item counter
	var productLeng = 0;

	$('.productCount').on('click', function() {
		// if ( $('.payItems').length ) return false;

		pizzaValue = +$(this).parent().find('input').val();

		var currentPrice = +$(this).closest('.productOrder').find('.productPrice span').html(),
			productPrice = +$(this).closest('.productOrder').find('.productPrice span').attr('data-product-price'),
			fullPriceValue = 0;

		if ( $(this).hasClass('moreProduct') ) {
			pizzaValue++;

			if ( pizzaValue !== 1 ) {

				if( $(this).closest('.productOrder').hasClass('orderPrizeSection') ) { // for detail page count price 
					var currntIngPrize = 0;
					$('.ingredientItem.active').each(function() {
						currntIngPrize += +$(this).find('[data-ing-price]').attr('data-ing-price');
					});
		
					$('.ingTotalPrice').html( currntIngPrize * pizzaValue );

						if ( $('.ingTotalPrice').length ) {
							$(this).closest('.productDetailContent').find('.productPrice span').html( productPrice * pizzaValue + +$('.ingTotalPrice').html());
						} else {
							$(this).closest('.productDetailContent').find('.productPrice span').html( productPrice * pizzaValue );
						}

				} else {
					$(this).closest('.productOrder').find('.productPrice span').html(currentPrice + productPrice);
				}
			}
			
		} else {
			if ( pizzaValue > 1 ) {
		
				if( $(this).closest('.productOrder').hasClass('orderPrizeSection') ) { // for detail page count price 
					var currntIngPrize = 0;
					$('.ingredientItem.active').each(function() {
						currntIngPrize += +$(this).find('[data-ing-price]').attr('data-ing-price');
					});
					
					$('.ingTotalPrice').html( +$('.ingTotalPrice').html() - currntIngPrize );

					$(this).closest('.productDetailContent').find('.productPrice span').html( currentPrice - productPrice - currntIngPrize);
				} else {
					$(this).closest('.productOrder').find('.productPrice span').html(currentPrice - productPrice);
				}
			}

			if ( pizzaValue !== 0 ) pizzaValue--;
			
		}
		$(this).parent().find('input').val(pizzaValue);

		if ( $(this).closest('.payItems') ) payPrice(pizzaValue, fullPriceValue);		
	});

	$('.productCountWrapper input').on('change', function() {
		// if ( $('.payItems').length ) return false;
		
		var pricePath = $(this).closest('.productOrder').find('.productPrice span'),
			currentValue = +$(this).val(),
			fullPriceValue = 0,
			currntIngPrize = 0;

		if ( currentValue === 0 || currentValue < 0 ) { //Set price and input value if selected was 0 or less
			pricePath.html( $(this).closest('.productOrder').find('.productPrice span').attr('data-product-price') );
			$(this).val(0);
		} else {

			if ( $(this).closest('.productOrder').hasClass('orderPrizeSection')	) {//product detail page
				if ( +$('.ingTotalPrice').html() > 0 ) {

					$('.ingredientItem.active').each(function() {
						currntIngPrize += +$(this).find('[data-ing-price]').attr('data-ing-price');
					});
					$('.productDetailPrice').html( +$('.productDetailPrice').attr('data-product-price') * +$(this).val() + currntIngPrize * +$(this).val() );
					$('.ingTotalPrice').html( currntIngPrize * +$(this).val() );

				} else {
					$('.productDetailPrice').html( +$('.productDetailPrice').attr('data-product-price') * +$(this).val() );
				}
				
				pizzaValue = +$(this).val();
			} else {
				$(this).closest('.productOrder').find('.productPrice span').html($(this).closest('.productOrder').find('.productPrice span').attr('data-product-price') * currentValue);
			}
			
		}

		if ( $(this).closest('.payItems') ) payPrice(pizzaValue, fullPriceValue); // pay page
		
	});

	// remove product from pay page
	$('.button.confirm').on('click', function() {
		var fullPriceValue = 0;
		$('.delateProduct[data-product="'+ removeProductId  +'"]').closest('.productOrder').remove();
		$('.popupWrapper, .popupContent').removeClass('active');
		$('html').removeClass('overflow-hidden');
		if ( $('.productOrder').length === 0 ) $('.payMainWrapper').addClass('emptyBas');
		payPrice(0, fullPriceValue);
	});

	//pizza ingredient
	$('.ingredientItem').on('click', function() {
		if ( $(this).hasClass('active')) return false;

		var ths = $(this),
			thxWeight = +ths.find('*[data-ing-weight]').attr('data-ing-weight'),
			thxPrice = +ths.find('*[data-ing-price]').attr('data-ing-price'),
			totalWeight = +$('.productDetailContent .totalWeight').html(),
			totalPrice = +$('.productDetailContent .productDetailPrice').html(),
			totaIngPrice = +$('.productDetailContent .ingTotalPrice').html(),
			thsIngName = ths.find('p').html(),
			thsIngCount = ths.attr('data-ing-count');
		
		$('.productDetailContent .totalWeight').html(totalWeight + thxWeight);
		if ( pizzaValue >= 1 ) {
			$('.productDetailContent .ingTotalPrice').html(totaIngPrice + ( thxPrice * pizzaValue ));
		} else {
			$('.productDetailContent .ingTotalPrice').html(totaIngPrice + thxPrice);
		}

		if ( !pizzaValue || pizzaValue === 0 ) { // check if zero items count
			$('.productDetailContent .productDetailPrice').html(totalPrice + ( thxPrice * 1 ));
		} else {
			$('.productDetailContent .productDetailPrice').html(totalPrice + ( thxPrice * pizzaValue ));
		}

		$('.newIngredientWrapper').append('<div class="newIngredient" data-ing-count="' + thsIngCount + '"><span></span><p>' + thsIngName + '</p></div>');
		ths.addClass('active');
		
	});
	$('.removeIng').on('click', function(e) {
		e.stopPropagation();
		if ( !$(this).closest('.ingredientItem').hasClass('active')) return false;

		var ths = $(this),
			thxWeight = +ths.closest('.ingredientItem').find('*[data-ing-weight]').attr('data-ing-weight'),
			thxPrice = +ths.closest('.ingredientItem').find('*[data-ing-price]').attr('data-ing-price'),
			totalWeight = +$('.productDetailContent .totalWeight').html(),
			totalPrice = +$('.productDetailContent .productDetailPrice').html(),
			totaIngPrice = +$('.productDetailContent .ingTotalPrice').html(),
			thsIngName = ths.closest('.ingredientItem').find('p').html(),
			thsIngCount = ths.closest('.ingredientItem').attr('data-ing-count');

		$('.productDetailContent .totalWeight').html(totalWeight - thxWeight);
		if ( pizzaValue >= 1 ) {
			$('.productDetailContent .ingTotalPrice').html(totaIngPrice - ( thxPrice * pizzaValue ) );
		} else {
			$('.productDetailContent .ingTotalPrice').html(totaIngPrice - thxPrice );
		}

		if ( !pizzaValue || pizzaValue === 0 ) {
			$('.productDetailContent .productDetailPrice').html(totalPrice - thxPrice );
		} else {
			$('.productDetailContent .productDetailPrice').html(totalPrice - ( thxPrice * pizzaValue) );
		}

		$('.newIngredientWrapper').find('[data-ing-count="' + thsIngCount + '"]').remove();
		$(this).closest('.ingredientItem').removeClass('active');

	});

	$('body').on('click', '.newIngredient', function() {
		var thsIngCount = $(this).attr('data-ing-count');
		$('.ingredientsWrapper' ).find('[data-ing-count="' + thsIngCount + '"]').find('.removeIng').trigger("click");
		$(this).remove();
	});

	// Product detail add to cart 
	$('.addToCart').on('click', function() {
		$(this).toggleClass('added');

		if ( $(this).hasClass('added') ) {
			$(this).html($(this).attr('data-delate-title'));
			$('.basketPrice span').html( +$('.basketPrice span').html() + +$('.productDetailPrice').html());
		} else {
			$(this).html($(this).attr('data-added-title'));
			$('.basketPrice span').html( +$('.basketPrice span').html() - +$('.productDetailPrice').html());
		}
		
	});

	// More content toggle
	$('.moreContentToggle').on('click', function() {
		$(this).toggleClass('hideMoreInfo');

		if ( $(this).hasClass('hideMoreInfo') ) { // show 
			$(this).closest('.moreInfoBlock').find('.moreInfoContent').animate({'height': $(this).closest('.moreInfoBlock').find('.moreInfoContent .simpleArticle').outerHeight()}, 777);
			$(this).html($(this).attr('data-text-hide'));
		} else { // hide
			$(this).closest('.moreInfoBlock').find('.moreInfoContent').animate({'height': contentOverflow}, 777);
			$(this).html($(this).attr('data-text-show'));
		}
		
	});

	// Input focus
    $('.simpleInput').focus(function() {
    	$(this).closest('label').addClass('active');
    });

    // Input blur
    $('.simpleInput').blur(function() {
    	$(this).closest('label').removeClass('active');
    });

    // Mobile hamburger
    $('.hamburger').on('click', function() {
    	$(this).toggleClass('active');
    	$('.navWrapper').toggleClass('active');
    	$('.languages').removeClass('active');
    	$('.languages ul').slideUp();
    });

    // Mobile switch languages
    $('.languages > span').on('click', function() {
    	var ths = $(this).closest('.languages');
		if ( !$('.hamburger').is(':visible') ) return false;
		if ( ths.hasClass('active') ) {
			ths.toggleClass('active');
			setTimeout(function() {
				ths.find('ul').slideToggle(100, function(){
			});
			}, 375);
		} else {
			ths.find('ul').slideToggle(100, function(){
				ths.toggleClass('active');
				$('.navWrapper').animate({scrollTop: $('.languages ul').outerHeight() + 30}, 777);
			});
		}
		
	});

    // Scroll to
	$('.scrollTo').on('click', function(e){
		e.preventDefault();

		if ( !$($(this).attr('href')).length ) return false;
		
		$('body, html').animate({scrollTop: $($(this).attr('href')).offset().top}, 888);
	});

	// Comments stars rank
	$('.selectStars:not(.starsSelected) .selectS').hover( function() {

		var starsIndex = $(this).index(),
			$icons = $(this).parent().find('.selectS'),
		    starSlice = $icons.slice(0,starsIndex+1);

		$icons.removeClass('icon-star').addClass('icon-star-empty');
		$(starSlice).removeClass('icon-star-empty');
		$(starSlice).addClass('icon-star');	

	});



	// Page animations
	function sectionCoordinates(){
		$('.animateSection').each(function(){
			$(this).data('top', $(this).offset().top );
		});
	}
	function animateSections() {
		$('.animateSection').each(function(){

			if ($(this).data('top') <= $(window).scrollTop() + $(window).height() / 1.25 ){
				$(this).hasClass('mainBanner') ? $(this).addClass('banerAnimated') : $(this).addClass('animated');
			} 

		});
	}

	//Pay page price 
	function payPrice(pizzaValue, fullPriceValue) {
		$('.productOrder .productPrice').each(function() {
			var ths = $(this);
				
			if ( pizzaValue !== 1 || pizzaValue <= 0) {
				fullPriceValue += +ths.find('span').html();
				$('.fullPrice span').html(fullPriceValue);
			}

		});
	}

	//Smooth Scroll
    // if(!_ismobile) SmoothScroll({ stepSize: 100 });

});