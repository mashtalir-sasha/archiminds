$(function() {

	// Отправка формы
	$('form').submit(function() {
		var goal = $(this).data('goal');
		var data = $(this).serialize();
		data += '&ajax-request=true';
		$.ajax({
			type: 'POST',
			url: 'mail.php',
			dataType: 'json',
			data: data,
			success: (function() {
				$.fancybox.close();
				$.fancybox.open("<div class='thn'><h3>Заявка відправлена!</h3><p>З Вами зв'яжуться найближчим часом.</p></div>");
				dataLayer.push({'event': goal});

			})()
		});
		return false;
	});

	// Инит фансибокса
	$('.fancybox').fancybox({
		margin: 0,
		padding: 0,
		touch: false
	});
	$('.project-fancy').fancybox({
		margin: 0,
		padding: 0,
		touch: false,
		afterLoad: function( instance, slide ) {
			$('.project-slider').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: true,
				arrows: true,
				adaptiveHeight: true
			});
		},
		afterClose: function( instance, slide ) {
			$('.project-slider').slick('unslick');
		}
	});

	// Инит слайдера Slick
	$('.gallery-slider1, .gallery-slider2, .gallery-slider3, .gallery-slider4, .gallery-slider5').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
				}
			}
		]
	});

	$('.about-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true,
		arrows: true,
	});

	$('.height').matchHeight();

	$('.reviews-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		responsive: [
			{
				breakpoint: 1200,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 1,
					adaptiveHeight: true
				}
			}
		]
	});

	/*$('.projects-item__btn').click(function() {
		$('.project-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true,
			arrows: true,
		});
	});*/

	// Cache selectors
	var lastId,
	    topMenu = $("#top-menu"),
	    topMenuHeight = topMenu.outerHeight()+15,
	    // All list items
	    menuItems = topMenu.find("a"),
	    // Anchors corresponding to menu items
	    scrollItems = menuItems.map(function(){
	      var item = $($(this).attr("href"));
	      if (item.length) { return item; }
	    });

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e){
	  var href = $(this).attr("href"),
	      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
	  $('html, body').stop().animate({ 
	      scrollTop: offsetTop
	  }, 300);
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
	   // Get container scroll position
	   var fromTop = $(this).scrollTop()+topMenuHeight;
	   
	   // Get id of current scroll item
	   var cur = scrollItems.map(function(){
	     if ($(this).offset().top < fromTop)
	       return this;
	   });
	   // Get the id of the current element
	   cur = cur[cur.length-1];
	   var id = cur && cur.length ? cur[0].id : "";
	   
	   if (lastId !== id) {
	       lastId = id;
	       // Set/remove active class
	       menuItems
	         .parent().removeClass("active")
	         .end().filter("[href='#"+id+"']").parent().addClass("active");
	   }                   
	});

	$('.projects-menu').on('click', 'p:not(.active)', function() {
	$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('.projects').find('.projects-tab').removeClass('active').eq($(this).index()).addClass('active');
	});

	$('.gallery-menu').on('click', 'p:not(.active)', function() {
	$(this)
		.addClass('active').siblings().removeClass('active')
		.closest('.gallery').find('.gallery-tab').removeClass('active').eq($(this).index()).addClass('active');
	});

});
