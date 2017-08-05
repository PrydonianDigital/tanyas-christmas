var $ = jQuery.noConflict();

$(document).foundation();

$(function() {
	tanya.init();
	if ($(window).width() <= 800) {
		$('.row.expanded').flip({
			trigger: 'manual'
		});
	}
	$('.turn').on('click', function(){
		$('.row.expanded').flip('toggle');
	});
	function checkWidth() {
		 var windowSize = $(window).width();
		 if (windowSize <= 800) {
			$('.row.expanded').flip({
				trigger: 'manual'
			});
		 } else if (windowSize >= 801) {
			$('.row.expanded').off('.flip');
			$('.row.expanded, .front, .back').attr('style', '');
        }
	 }
	$(window).resize(checkWidth);
});

var urls= {
	'json': 'http://tanyaschristmas.test.gridhosted.co.uk/wp-json/wp/v2/posts/',
	'page': 'http://tanyaschristmas.test.gridhosted.co.uk/wp-json/wp/v2/pages/',
}

var tanya = {
	init: function() {
		atvImg();
		$('.atvImg').each(function(){
			if($(this).data('date') <= $(this).data('today')){
				$(this).addClass('current');
			} else {
				$(this).addClass('inactive');
			}
		});
		$('.contentBoxes').on('click', '.current', function(){
			var post = $(this).data('id'),
				title = $(this).data('title');
			tanya.boxContent(post, title);
		});
		$('.contentBoxes').on('click', '.inactive', function(){
			var post = $(this).data('id'),
				title = $(this).data('title');
			tanya.comingSoon(post, title);
		});
		$('.pageTitle').on('click', function(e){
			e.preventDefault();
			var page = $(this).data('page');
			tanya.pageContent(page);
		});
	},
	boxContent: function(post, title) {
		var $modal = $('#boxModal');
		$.ajax(urls.json+post)
			.done(function(resp){
				$modal.attr('style', 'background: ' +resp.cmb2.post._post_bg+'; color: '+resp.cmb2.post._post_col+'; box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';').html('<h2 class="modalTitle">'+title+'. '+resp.cmb2.post._post_title+'<button class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true" style="color: '+resp.cmb2.post._post_col+';box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';)">&times;</span></button></h2><div class="row"><div class="small-12 columns"><div id="excerpt">'+resp.cmb2.post._post_stuff+'<div class="row"><div class="small-12 columns text-right"><br/><button class="hollow button secondary" id="showhidebutton">Read <i class="fa fa-chevron-right"></i></button></div></div></div></div></div></div><div id="content"><div class="row contentScroll"><div class="small-12 columns">'+resp.content.rendered+'</div></div></div></div>').foundation('open');
				$('iframe').wrap('<div class="responsive-embed"></div>');
				$('body').on('click','#showhidebutton', function() {
					Foundation.Motion.animateOut($('#excerpt'), 'scale-out-down', function() {
						Foundation.Motion.animateIn($('#content'), 'scale-in-up');
					});
				})
		});

	},
	comingSoon: function(post, title) {
		var $modal = $('#boxModal');
		$.ajax(urls.json+post)
			.done(function(resp){
				$modal.attr('style', 'background: ' +resp.cmb2.post._post_bg+'; color: '+resp.cmb2.post._post_col+'; box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';').html('<h2 class="modalTitle">'+title+'. '+resp.cmb2.post._post_title+'<button class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true" style="color: '+resp.cmb2.post._post_col+';box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';)">&times;</span></button></h2><div class="row"><div class="small-12 columns"><div id="excerpt">'+resp.cmb2.post._post_coming+'</div></div></div></div></div>').foundation('open');
				$('iframe').wrap('<div class="responsive-embed"></div>');
				$('body').on('click','#showhidebutton', function() {
					Foundation.Motion.animateOut($('#excerpt'), 'scale-out-down', function() {
						Foundation.Motion.animateIn($('#content'), 'scale-in-up');
					});
				})
		});

	},
	pageContent: function(page) {
		var $modal = $('#boxModal');
		$.ajax(urls.page+page)
			.done(function(resp){
				$modal.attr('style', 'background: ' +resp.cmb2.home._home_bg+'; color: '+resp.cmb2.home._home_col+'; box-shadow: 0 0 7px ' +resp.cmb2.home._home_bg+'; text-shadow: 1px 1px 2px rgba(0,0,0,0.5)').html('<h2 class="modalTitle">'+resp.cmb2.home._home_title+'<button class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true" style="color: '+resp.cmb2.home._home_col+';box-shadow: 0 0 7px ' +resp.cmb2.home._home_bg+';)">&times;</span></button></h2><div id="excerpt"><style>.reveal a, .reveal a:hover{color:'+resp.cmb2.home._home_col+'; text-decoration: underline;} .reveal label {color:'+resp.cmb2.home._home_col+' !important;}</style><div class="row contentScroll"><div class="small-12 columns">'+resp.content.rendered+'</div></div></div>').foundation('open');
$('#mc-embedded-subscribe-form').submit(function(e) {
  var $this = $(this);
  $.ajax({
      type: "GET", // GET & url for json slightly different
      url: "http://blinkpublishing.us8.list-manage.com/subscribe/post-json?c=?",
      data: $this.serialize(),
      dataType    : 'json',
      contentType: "application/json; charset=utf-8",
      error       : function(err) { alert("Could not connect to the registration server."); },
      success     : function(data) {
          if (data.result != "success") {
	          $('#mce-success-response').hide();
              $('#mce-error-response').html(data.msg).show();
          } else {
	          $('#mce-error-response').hide();
              $('#mce-success-response').html(data.msg).show();
          }
      }
  });
  return false;
});
		});

	}
}

function ajaxMailChimpForm($form, $resultElement){
            // Hijack the submission. We'll submit the form manually.
            $form.submit(function(e) {
                e.preventDefault();
                if (!isValidEmail($form)) {
                    var error =  "A valid email address must be provided.";
                    $resultElement.html(error);
                    $resultElement.css("color", "red");
                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html("Subscribing...");
                    submitSubscribeForm($form, $resultElement);
                }
            });
        }
        // Validate the email address in the form
        function isValidEmail($form) {
            // If email is empty, show error message.
            // contains just one @
            var email = $form.find("input[type='email']").val();
            if (!email || !email.length) {
                return false;
            } else if (email.indexOf("@") == -1) {
                return false;
            }
            return true;
        }
        // Submit the form with an ajax/jsonp request.
        // Based on http://stackoverflow.com/a/15120409/215821
        function submitSubscribeForm($form, $resultElement) {
            $.ajax({
                type: "GET",
                url: $form.attr("action"),
                data: $form.serialize(),
                cache: false,
                dataType: "jsonp",
                jsonp: "c", // trigger MailChimp to return a JSONP response
                contentType: "application/json; charset=utf-8",
                error: function(error){
                    // According to jquery docs, this is never called for cross-domain JSONP requests
                },
                success: function(data){
                    if (data.result != "success") {
                        var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                        $resultElement.css("color", "red");
                        if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                            message = "You're already subscribed. Thank you.";
                            $resultElement.css("color", "black");
                        }
                        $resultElement.html(message);
                    } else {
                        $resultElement.css("color", "black");
                        $resultElement.html("Thank you!<br>You must confirm the subscription in your inbox.");
                    }
                }
            });
        }

function atvImg(){function e(e,t,a,r,n,o){var i=l.scrollTop||s.scrollTop,d=l.scrollLeft,c=t?e.touches[0].pageX:e.pageX,m=t?e.touches[0].pageY:e.pageY,v=a.getBoundingClientRect(),f=a.clientWidth||a.offsetWidth||a.scrollWidth,g=a.clientHeight||a.offsetHeight||a.scrollHeight,h=320/f,u=.52-(c-v.left-d)/f,p=.52-(m-v.top-i)/g,y=m-v.top-i-g/2,E=c-v.left-d-f/2,C=(u-E)*(.07*h),I=(y-p)*(.1*h),N="rotateX("+I+"deg) rotateY("+C+"deg)",x=Math.atan2(y,E),b=180*x/Math.PI-90;0>b&&(b+=360),-1!=a.firstChild.className.indexOf(" over")&&(N+=" scale3d(1.07,1.07,1.07)"),a.firstChild.style.transform=N,o.style.background="linear-gradient("+b+"deg, rgba(255,255,255,"+(m-v.top-i)/g*.4+") 0%,rgba(255,255,255,0) 80%)",o.style.transform="translateX("+u*n-.1+"px) translateY("+p*n-.1+"px)";for(var L=n,S=0;n>S;S++)r[S].style.transform="translateX("+u*L*(2.5*S/h)+"px) translateY("+p*n*(2.5*S/h)+"px)",L--}function t(e,t){t.firstChild.className+=" over"}function a(e,t,a,r,n){var l=t.firstChild;l.className=l.className.replace(" over",""),l.style.transform="",n.style.cssText="";for(var s=0;r>s;s++)a[s].style.transform=""}var r=document,n=r.documentElement,l=r.getElementsByTagName("body")[0],s=r.getElementsByTagName("html")[0],o=window,i=r.querySelectorAll(".atvImg"),d=i.length,c="ontouchstart"in o||navigator.msMaxTouchPoints;if(!(0>=d))for(var m=0;d>m;m++){var v=i[m],f=v.querySelectorAll(".atvImg-layer"),g=f.length;if(!(0>=g)){for(;v.firstChild;)v.removeChild(v.firstChild);var h=r.createElement("div"),u=r.createElement("div"),p=r.createElement("div"),y=r.createElement("div"),E=[];v.id="atvImg__"+m,h.className="atvImg-container",u.className="atvImg-shine",p.className="atvImg-shadow",y.className="atvImg-layers";for(var C=0;g>C;C++){var I=r.createElement("div"),N=f[C].getAttribute("data-img");I.className="atvImg-rendered-layer",I.setAttribute("data-layer",C),I.style.backgroundImage="url("+N+")",y.appendChild(I),E.push(I)}h.appendChild(p),h.appendChild(y),h.appendChild(u),v.appendChild(h);var x=v.clientWidth||v.offsetWidth||v.scrollWidth;v.style.transform="perspective("+3*x+"px)",c?(o.preventScroll=!1,function(r,n,l,s){v.addEventListener("touchmove",function(t){o.preventScroll&&t.preventDefault(),e(t,!0,r,n,l,s)}),v.addEventListener("touchstart",function(e){o.preventScroll=!0,t(e,r)}),v.addEventListener("touchend",function(e){o.preventScroll=!1,a(e,r,n,l,s)})}(v,E,g,u)):!function(r,n,l,s){v.addEventListener("mousemove",function(t){e(t,!1,r,n,l,s)}),v.addEventListener("mouseenter",function(e){t(e,r)}),v.addEventListener("mouseleave",function(e){a(e,r,n,l,s)})}(v,E,g,u)}}}

(function($,sr){

  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;

      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null;
          };

          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);

          timeout = setTimeout(delayed, threshold || 100);
      };
  }
  // smartresize
  jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

})(jQuery,'smartresize');

(function($){"use strict";$.ajaxChimp={responses:{"We have sent you a confirmation email":0,"Please enter a value":1,"An email address must contain a single @":2,"The domain portion of the email address is invalid (the portion after the @: )":3,"The username portion of the email address is invalid (the portion before the @: )":4,"This email address looks fake or invalid. Please enter a real email address":5},translations:{en:null},init:function(selector,options){$(selector).ajaxChimp(options)}};$.fn.ajaxChimp=function(options){$(this).each(function(i,elem){var form=$(elem);var email=form.find("input[type=email]");var label=form.find("label[for="+email.attr("id")+"]");var settings=$.extend({url:form.attr("action"),language:"en"},options);var url=settings.url.replace("/post?","/post-json?").concat("&c=?");form.attr("novalidate","true");email.attr("name","EMAIL");form.submit(function(){var msg;function successCallback(resp){if(resp.result==="success"){msg="We have sent you a confirmation email";label.removeClass("error").addClass("valid");email.removeClass("error").addClass("valid")}else{email.removeClass("valid").addClass("error");label.removeClass("valid").addClass("error");var index=-1;try{var parts=resp.msg.split(" - ",2);if(parts[1]===undefined){msg=resp.msg}else{var i=parseInt(parts[0],10);if(i.toString()===parts[0]){index=parts[0];msg=parts[1]}else{index=-1;msg=resp.msg}}}catch(e){index=-1;msg=resp.msg}}if(settings.language!=="en"&&$.ajaxChimp.responses[msg]!==undefined&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]){msg=$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]}label.html(msg);label.show(2e3);if(settings.callback){settings.callback(resp)}}var data={};var dataArray=form.serializeArray();$.each(dataArray,function(index,item){data[item.name]=item.value});$.ajax({url:url,data:data,success:successCallback,dataType:"jsonp",error:function(resp,text){console.log("mailchimp ajax submit error: "+text)}});var submitMsg="Submitting...";if(settings.language!=="en"&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language]["submit"]){submitMsg=$.ajaxChimp.translations[settings.language]["submit"]}label.html(submitMsg).show(2e3);return false})});return this}})(jQuery);