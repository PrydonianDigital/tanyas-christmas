var $ = jQuery.noConflict();

$(document).foundation();

var tanyaMusic = $('#bgmusic');

$(function() {

	tanya.init();

	var hashValue = location.hash;
	if(hashValue != '') {
		hashValue = hashValue.replace(/^#/, '');
		console.log(hashValue);
		var title = $('body').find('[data-title="'+hashValue+'"]').data('id');
		var $modal = $('#boxModal');
		$.ajax(urls.json+title)
		.done(function(resp){
			$modal.attr('style', 'background: ' +resp.cmb2.post._post_bg+'; color: '+resp.cmb2.post._post_col+'; box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';').html('<h2 class="modalTitle">'+hashValue+'. '+resp.cmb2.post._post_title+'</h2><div id="contentStuff"><style>.reveal #excerpt a, .reveal #content a {color: '+resp.cmb2.post._post_link+';}.reveal #excerpt a:hover, .reveal #content a:hover, .reveal #excerpt a:visited, .reveal #content a:visited {color: '+resp.cmb2.post._post_linkv+';}</style><div id="content"><div class="row contentScroll"><div class="small-12 columns">'+resp.content.rendered+'</div></div></div></div></div><button class="close-button" data-close aria-label="Close reveal" type="button" style="color: '+resp.cmb2.post._post_col+';border-color: '+resp.cmb2.post._post_col+';"><span aria-hidden="true" style="color: '+resp.cmb2.post._post_col+';box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';)">&times;</span></button>').foundation('open');
			$('iframe').wrap('<div class="responsive-embed"></div>');
		});
	}

	if ($(window).width() <= 800) {
		$('.row.expanded').flip({
			trigger: 'manual'
		});
		$('.row.expanded').on('flip:done',function(){
			$('#soundBack').toggleClass('right');
		});
		$('#calendar').removeClass('align-middle').addClass('align-top');
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
	'json': '/wp-json/wp/v2/posts/',
	'page': '/wp-json/wp/v2/pages/',
}

var tanya = {
	init: function() {
		atvImg();
		$('#christmasCountdown').countdown('2017/12/25', {elapse: true})
		.on('update.countdown', function(event) {
			if (event.elapsed) {
				$(this).html('It\'s Christmas!')
			} else {
				$(this).html(event.strftime('Days to Christmas: %D'));
			}
		});
		tanyaMusic.get(0).play();
		if (tanyaMusic.get(0).currentTime  || !tanyaMusic.get(0).paused) {
			$('#soundBack').removeClass('paused').addClass('playing');
			$('#soundBack i').removeClass('fa-volume-off').addClass('fa-volume-up');
		} else {
			$('#soundBack').removeClass('playing').addClass('paused');
			$('#soundBack i').removeClass('fa-volume-up').addClass('fa-volume-off');
		}
		$('body').on('click', '.playing', function(){
			$(this).removeClass('playing').addClass('paused').children().removeClass('fa-volume-up').addClass('fa-volume-off');
			tanyaMusic.get(0).pause();
		});
		$('body').on('click', '.paused', function(){
			$(this).removeClass('paused').addClass('playing').children().removeClass('fa-volume-off').addClass('fa-volume-up');
			tanyaMusic.get(0).play();
		});
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
		$('body').on('click', '.close-button', function(){
			var $modal = $('#boxModal');
			$modal.empty();
			$modal.foundation('close');
				if(window.history.pushState) {
					window.history.pushState('', '/', window.location.pathname)
				} else {
					window.location.hash = '';
				}
		})
		$(document).on('keyup',function(evt) {
		    if (evt.keyCode == 27) {
				var $modal = $('#boxModal');
				$modal.empty();
				$modal.foundation('close');
				if(window.history.pushState) {
					window.history.pushState('', '/', window.location.pathname)
				} else {
					window.location.hash = '';
				}
		    }
		});
	},
	boxContent: function(post, title) {
		var $modal = $('#boxModal');
		$.ajax(urls.json+post)
		.done(function(resp){
			$modal.attr('style', 'background: ' +resp.cmb2.post._post_bg+'; color: '+resp.cmb2.post._post_col+'; box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';').html('<h2 class="modalTitle">'+title+'. '+resp.cmb2.post._post_title+'</h2><div id="contentStuff"><style>.reveal #excerpt a, .reveal #content a {color: '+resp.cmb2.post._post_link+';}.reveal #excerpt a:hover, .reveal #content a:hover, .reveal #excerpt a:visited, .reveal #content a:visited {color: '+resp.cmb2.post._post_linkv+';}</style><div id="content"><div class="row contentScroll"><div class="small-12 columns">'+resp.content.rendered+'</div></div></div></div></div><button class="close-button" data-close aria-label="Close reveal" type="button" style="color: '+resp.cmb2.post._post_col+';border-color: '+resp.cmb2.post._post_col+';"><span aria-hidden="true" style="color: '+resp.cmb2.post._post_col+';box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';)">&times;</span></button>').foundation('open');
			$('iframe').wrap('<div class="responsive-embed"></div>');
		});

	},
	comingSoon: function(post, title) {
		var $modal = $('#boxModal');
		$.ajax(urls.json+post)
			.done(function(resp){
				$modal.attr('style', 'background: ' +resp.cmb2.post._post_bg+'; color: '+resp.cmb2.post._post_col+'; box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';').html('<h2 class="modalTitle">'+title+'. '+resp.cmb2.post._post_title+'</h2><div class="row"><div class="small-12 columns"><style>.reveal #excerpt a, .reveal #content a {color: '+resp.cmb2.post._post_link+';}.reveal #excerpt a:hover, .reveal #content a:hover, .reveal #excerpt a:visited, .reveal #content a:visited {color: '+resp.cmb2.post._post_linkv+';}</style><div id="excerpt">'+resp.cmb2.post._post_coming+'</div></div></div></div></div><button class="close-button" data-close aria-label="Close reveal" type="button" style="color: '+resp.cmb2.post._post_col+';border-color: '+resp.cmb2.post._post_col+';"><span aria-hidden="true" style="color: '+resp.cmb2.post._post_col+';box-shadow: 0 0 7px ' +resp.cmb2.post._post_bg+';)">&times;</span></button>').foundation('open');
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
				$modal.attr('style', 'background: ' +resp.cmb2.home._home_bg+'; color: '+resp.cmb2.home._home_col+'; box-shadow: 0 0 7px ' +resp.cmb2.home._home_bg+';').html('<h2 class="modalTitle">'+resp.cmb2.home._home_title+'</h2><div id="contentStuff"><div id="excerpt"><style>.reveal a, .reveal a:hover{color:'+resp.cmb2.home._home_col+'; text-decoration: underline;} .reveal label {color:'+resp.cmb2.home._home_col+' !important;}</style><style>.reveal #excerpt a, .reveal #content a {color: '+resp.cmb2.home._home_link+';}.reveal #excerpt a:hover, .reveal #content a:hover, .reveal #excerpt a:visited, .reveal #content a:visited {color: '+resp.cmb2.home._home_linkv+';}</style><div class="row contentScroll"><div class="small-12 columns">'+resp.content.rendered+'</div></div></div></div><button class="close-button" data-close aria-label="Close reveal" type="button"><span aria-hidden="true" style="color: '+resp.cmb2.home._home_col+';box-shadow: 0 0 7px ' +resp.cmb2.home._home_bg+';)">&times;</span></button>').foundation('open');
			$('iframe').wrap('<div class="responsive-embed"></div>');
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

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
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

function element_exists(id){
	if(jQuery(id).length > 0){
		return true;
	}
	return false;
}

(function($){"use strict";$.ajaxChimp={responses:{"We have sent you a confirmation email":0,"Please enter a value":1,"An email address must contain a single @":2,"The domain portion of the email address is invalid (the portion after the @: )":3,"The username portion of the email address is invalid (the portion before the @: )":4,"This email address looks fake or invalid. Please enter a real email address":5},translations:{en:null},init:function(selector,options){$(selector).ajaxChimp(options)}};$.fn.ajaxChimp=function(options){$(this).each(function(i,elem){var form=$(elem);var email=form.find("input[type=email]");var label=form.find("label[for="+email.attr("id")+"]");var settings=$.extend({url:form.attr("action"),language:"en"},options);var url=settings.url.replace("/post?","/post-json?").concat("&c=?");form.attr("novalidate","true");email.attr("name","EMAIL");form.submit(function(){var msg;function successCallback(resp){if(resp.result==="success"){msg="We have sent you a confirmation email";label.removeClass("error").addClass("valid");email.removeClass("error").addClass("valid")}else{email.removeClass("valid").addClass("error");label.removeClass("valid").addClass("error");var index=-1;try{var parts=resp.msg.split(" - ",2);if(parts[1]===undefined){msg=resp.msg}else{var i=parseInt(parts[0],10);if(i.toString()===parts[0]){index=parts[0];msg=parts[1]}else{index=-1;msg=resp.msg}}}catch(e){index=-1;msg=resp.msg}}if(settings.language!=="en"&&$.ajaxChimp.responses[msg]!==undefined&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]){msg=$.ajaxChimp.translations[settings.language][$.ajaxChimp.responses[msg]]}label.html(msg);label.show(2e3);if(settings.callback){settings.callback(resp)}}var data={};var dataArray=form.serializeArray();$.each(dataArray,function(index,item){data[item.name]=item.value});$.ajax({url:url,data:data,success:successCallback,dataType:"jsonp",error:function(resp,text){console.log("mailchimp ajax submit error: "+text)}});var submitMsg="Submitting...";if(settings.language!=="en"&&$.ajaxChimp.translations&&$.ajaxChimp.translations[settings.language]&&$.ajaxChimp.translations[settings.language]["submit"]){submitMsg=$.ajaxChimp.translations[settings.language]["submit"]}label.html(submitMsg).show(2e3);return false})});return this}})(jQuery);

!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(a){if(a instanceof Date)return a;if(String(a).match(g))return String(a).match(/^[0-9]*$/)&&(a=Number(a)),String(a).match(/\-/)&&(a=String(a).replace(/\-/g,"/")),new Date(a);throw new Error("Couldn't cast `"+a+"` to a date object.")}function c(a){var b=a.toString().replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");return new RegExp(b)}function d(a){return function(b){var d=b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);if(d)for(var f=0,g=d.length;g>f;++f){var h=d[f].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),j=c(h[0]),k=h[1]||"",l=h[3]||"",m=null;h=h[2],i.hasOwnProperty(h)&&(m=i[h],m=Number(a[m])),null!==m&&("!"===k&&(m=e(l,m)),""===k&&10>m&&(m="0"+m.toString()),b=b.replace(j,m.toString()))}return b=b.replace(/%%/,"%")}}function e(a,b){var c="s",d="";return a&&(a=a.replace(/(:|;|\s)/gi,"").split(/\,/),1===a.length?c=a[0]:(d=a[0],c=a[1])),1===Math.abs(b)?d:c}var f=[],g=[],h={precision:100,elapse:!1};g.push(/^[0-9]*$/.source),g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source),g=new RegExp(g.join("|"));var i={Y:"years",m:"months",n:"daysToMonth",w:"weeks",d:"daysToWeek",D:"totalDays",H:"hours",M:"minutes",S:"seconds"},j=function(b,c,d){this.el=b,this.$el=a(b),this.interval=null,this.offset={},this.options=a.extend({},h),this.instanceNumber=f.length,f.push(this),this.$el.data("countdown-instance",this.instanceNumber),d&&("function"==typeof d?(this.$el.on("update.countdown",d),this.$el.on("stoped.countdown",d),this.$el.on("finish.countdown",d)):this.options=a.extend({},h,d)),this.setFinalDate(c),this.start()};a.extend(j.prototype,{start:function(){null!==this.interval&&clearInterval(this.interval);var a=this;this.update(),this.interval=setInterval(function(){a.update.call(a)},this.options.precision)},stop:function(){clearInterval(this.interval),this.interval=null,this.dispatchEvent("stoped")},toggle:function(){this.interval?this.stop():this.start()},pause:function(){this.stop()},resume:function(){this.start()},remove:function(){this.stop.call(this),f[this.instanceNumber]=null,delete this.$el.data().countdownInstance},setFinalDate:function(a){this.finalDate=b(a)},update:function(){if(0===this.$el.closest("html").length)return void this.remove();var b,c=void 0!==a._data(this.el,"events"),d=new Date;b=this.finalDate.getTime()-d.getTime(),b=Math.ceil(b/1e3),b=!this.options.elapse&&0>b?0:Math.abs(b),this.totalSecsLeft!==b&&c&&(this.totalSecsLeft=b,this.elapsed=d>=this.finalDate,this.offset={seconds:this.totalSecsLeft%60,minutes:Math.floor(this.totalSecsLeft/60)%60,hours:Math.floor(this.totalSecsLeft/60/60)%24,days:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToWeek:Math.floor(this.totalSecsLeft/60/60/24)%7,daysToMonth:Math.floor(this.totalSecsLeft/60/60/24%30.4368),totalDays:Math.floor(this.totalSecsLeft/60/60/24),weeks:Math.floor(this.totalSecsLeft/60/60/24/7),months:Math.floor(this.totalSecsLeft/60/60/24/30.4368),years:Math.abs(this.finalDate.getFullYear()-d.getFullYear())},this.options.elapse||0!==this.totalSecsLeft?this.dispatchEvent("update"):(this.stop(),this.dispatchEvent("finish")))},dispatchEvent:function(b){var c=a.Event(b+".countdown");c.finalDate=this.finalDate,c.elapsed=this.elapsed,c.offset=a.extend({},this.offset),c.strftime=d(this.offset),this.$el.trigger(c)}}),a.fn.countdown=function(){var b=Array.prototype.slice.call(arguments,0);return this.each(function(){var c=a(this).data("countdown-instance");if(void 0!==c){var d=f[c],e=b[0];j.prototype.hasOwnProperty(e)?d[e].apply(d,b.slice(1)):null===String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i)?(d.setFinalDate.call(d,e),d.start()):a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi,e))}else new j(this,b[0],b[1])})}});