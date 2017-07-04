var $ = jQuery.noConflict();

$(document).foundation();

$(function() {
	tanya.init();
	$('iframe').wrap('<div class="responsive-embed"></div>');
});

var urls= {
	'json': 'http://tanyaschristmas.test.gridhosted.co.uk/wp-json/wp/v2/posts/',
	'page': 'http://tanyaschristmas.test.gridhosted.co.uk/wp-json/wp/v2/pages/36',
}

var tanya = {
	init: function() {
		$('.qube-perspective').each(function(){
			if($(this).data('date') <= $(this).data('today')){
				$(this).addClass('current');
			} else {
				$(this).addClass('inactive');
			}
		});
		$('.contentBoxes').on('click', '.current', function(){
			var post = $(this).data('id'),
				title = $(this).data('title');
			$('.qube-perspective').addClass('up');
			tanya.boxContent(post, title);
		});
		$('#mainStuff').on('click', '.button', function(){
			var post = $(this).data('key');
			tanya.pageContent(post);
		});
		$('.leftPane .close-button').on('click', function(){
			tanya.closeLeftBox();
		});
		$('.rightPane .close-button').on('click', function(){
			tanya.closeRightBox();
		});
	},
	boxContent: function(post, title) {
		$.getJSON(urls.json+post, function(data) {
			$('.callout.leftPane').attr('style', 'background: ' +data.cmb2.post._post_bg+'; color: '+data.cmb2.post._post_col+'; box-shadow: 0 0 7px ' +data.cmb2.post._post_bg+';');
			$('.leftPane .close-button').attr('style', 'color: '+data.cmb2.post._post_col+';');
			$('#leftContent').append('<div id="leftTitle" class="opened"><div class="number">'+title+'.</div><div class="post-title">'+data.cmb2.post._post_title+'</div></div>').fadeIn();
			$('#leftContent').append('<div id="stuff">'+data.cmb2.post._post_stuff+'</div><div class="animated infinite pulse"><i class="fa fa-chevron-down"></i></div>').fadeIn();
			$('#leftContent').on('click', 'i', function(){
				$('#stuff').hide();
				$('#leftContent .pulse').hide();
				$('#leftContent').append(data.content.rendered);
				$('#leftTitle').addClass('open');
				$('iframe').wrap('<div class="responsive-embed"></div>');
			});
		}).done(function(){
			$('.callout.leftPane').addClass('opened');
		});
	},
	pageContent: function(post) {
		$.getJSON(urls.page, function(data) {
			$('.callout.rightPane').attr('style', 'background: ' +data.cmb2.home._home_home[post]._home_bg+'; color: '+data.cmb2._home_home[post]._home_col+'; box-shadow: 0 0 7px ' +data.cmb2.post._post_bg+';');
			//$('.rightPane .close-button').attr('style', 'color: '+data.cmb2.post._post_col+';');
			$('#rightContent').append('<div id="leftTitle" class="opened"><div class="number">'+data.cmb2.home._home_home[post]._home_header+'.</div></div>').fadeIn();
			//$('#leftContent').append('<div id="stuff">'+data.cmb2.post._post_stuff+'</div><div class="animated infinite pulse"><i class="fa fa-chevron-down"></i></div>').fadeIn();
			$('#leftContent').on('click', 'i', function(){
				$('#stuff').hide();
				$('#leftContent .pulse').hide();
				$('#leftContent').append(data.content.rendered);
				$('#leftTitle').addClass('open');
				$('iframe').wrap('<div class="responsive-embed"></div>');
			});
		}).done(function(){
			$('.callout.rightPane').addClass('opened');
		});
	},
	closeLeftBox: function() {
		$('#leftContent').empty().removeClass('open');
		$('.qube-perspective').toggleClass('up');
	},
	closeRightBox: function() {
		$('#rightContent').empty().removeClass('open');
	}
}
