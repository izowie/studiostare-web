(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

if ($.event.fixHooks) {
    for ( var i=types.length; i; ) {
        $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
    }
}

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
    if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return ($.event.dispatch || $.event.handle).apply(this, args);
}

})(jQuery);
/**
* Provides requestAnimationFrame in a cross browser way.
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
*/
if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (function (id) {
    	return window.cancelAnimationFrame ||
    	window.webkitCancelRequestAnimationFrame ||
    	window.mozCancelRequestAnimationFrame ||
    	window.oCancelRequestAnimationFrame ||
    	window.msCancelRequestAnimationFrame ||
    	clearTimeout(id);
    })();
}

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function (callback, element, time) {
    	return window.webkitRequestAnimationFrame ||
    	window.mozRequestAnimationFrame ||
    	window.oRequestAnimationFrame ||
    	window.msRequestAnimationFrame ||
    	function (/* function */callback, /* DOMElement */element) {
    		return window.setTimeout(callback, 1000 / 60);
    	};
    })();
}

/**
 * adevLo - light
 * A preloader which just preload images with a callback for each images a final callback
 * http://www.adevby.me
 *
 * Copyright 2011 Maxime Sarri / adevby.me
 */

(function($){
	$.fn.adevLo = function(options){
		
		var 
			$this 	= 	this,
			ua		=	navigator.userAgent.toLowerCase();
	
		// ParamÃ¨tres par dÃ©faut
		var defaults = {
			datas : 'none'
		};		
		
		// On charge les nouveaux paramÃ¨tres
		var options = $.extend(defaults, options); 
		
		// CrÃ©ation du contenu
		
		if (!ua.match('msie')){
			if (typeof(options.datas) == 'string'){	
			    var datasLength = 1;
			    preloadImage(options.datas, false);
			}
			else{
			    var datasLength = options.datas.length;
			    preloadImage(options.datas[0], true,datasLength);
			}
		}
		else {
			if (typeof options.success == 'function') { 
			    options.success.call(this);
			}
		}
		
		
		/////////////////////////////////////////////////
		// On prÃ©charge les images
		var i = 1;
		var currentWidth = 0;
		var dims = [];
		var src = '';
		var response = [];
		
		function preloadImage(url, array, datasLength){  
			var img = new Image();
			img.src = url;
			
			img.onload = function(){
				dims = {height:img.height,width:img.width};
				src = img.src;
				
				if (!array){
					if (typeof options.success == 'function') { 
						options.success.call(this, dims);
					}
				}
				else {		
					var response = [];
						
					response[0] = img.src;
					response[1] = dims;				
					
					if (typeof options.each == 'function') { 
						options.each.call(this, response); 
					}
					
					if (i < datasLength){
						preloadImage(options.datas[i], true, datasLength);
						i++;
					}
					else {
						if (typeof options.success == 'function') { 
							options.success.call(this);
						}
					}
				}
			}
			
			img.onerror = function(){
				if (i < datasLength){
					preloadImage(options.datas[i], true, datasLength);
					options.error.call(this);
				    i++;
				}
				else {
				    if (typeof options.success == 'function') { 
				    	options.success.call(this);
				    }
				}
			}
		}
		
	};
})(jQuery);
"use strict";

/**
 * PlayerAnalytics
 * @constructor
 */
function PlayerAnalytics()
{
}

PlayerAnalytics.PLAY = "play";
PlayerAnalytics.PAUSE = "pause";
PlayerAnalytics.STOP = "stop";
PlayerAnalytics.DOWNLOAD = "download";
PlayerAnalytics.UPDATE = "update";

/**
 * evt: play, pause, stop, download, update
 * visitId: id given on page load
 * videoTime: video time for the given event
 * mediaId: media id for the given event
 */
PlayerAnalytics.sendEvent = function (evt,videoTime,mediaId)
{
	if (PlayerAnalytics.ID) 
	{
		$.ajax({
			url: BASEPATH+'/services/pluginplayer/create/event/' + evt + '/' + PlayerAnalytics.ID,
			data: {video_time:videoTime,media_id:mediaId},
			success: function(result) 
			{
				console.log(result);
			}
		})
	}
};


/**
 * 
 * 
 */
PlayerAnalytics.init = function ()
{
	
	var url = document.location.href;
	var fwd = false;
	
	url = url.split('?');
	if (url[url.length - 1] == 'fwd=true'){
		fwd = true;
	}
	
	$.ajax({
		url: BASEPATH+'/services/pluginplayer/create/visit/' + idPlayer + '/' + idRecipient + '?fwd=' + $fwd,
		success: function(result) 
		{
			if (result.success) {
				PlayerAnalytics.ID = result.result
			}
		}
	})
};



var 
	anonymous = {};
	
anonymous.video = {};
anonymous.utils = {};
/**
 * Simple slider where we can drop a button to sort a value from 0 to 1
 * 
 * @authors Sarri Maxime
 * 
 * @constructor
 *
 * @param	datas
 * 
 * Object which contains the following parameters 
 *
 *		@param	item: jQuery Object
 *
 *		@param 	startValue: int
 *
 *		@param	start: function
 *
 *		@param change: function
 *
 *		@param end: function
 */

anonymous.utils.carousel = function(container, updateTime, animationTime){
	
	var self = this;
	
	this.container = container;
	this.slides = container.children('li');
	this.length = this.slides.length;
	
	this.updateTime = updateTime;
	this.animationTime = animationTime;
	
	this.numb = [];
	this.rand = [];
		
	this.slides.css({'display':'none', 'opacity':0});
	this.slides.eq(0).css({'display':'block', 'opacity':1});
	
	this.current = 0;
	
	window.setInterval(function(){
		self.routine();
	}, self.updateTime);
	
};

/**
 * Display the left colored size and the button
 *
 */

anonymous.utils.carousel.prototype.routine = function(){
	
	var 
		self 	= this,
		toHide 	= this.slides.eq(this.current),
		rand;
			
	if (self.slides.eq(self.current).children('img')[0].complete){
		
		if (self.rand.length == 0){
			
			for (var i = 0; i < self.length; i++){
				self.numb[i] = i;
			}
			
			for (var j = 0; j < self.length; j++){
				rand = parseInt(Math.random() * self.numb.length);
				self.rand[j] = self.numb[rand];
				self.numb.splice(rand, 1);
			}
			
		}
		
		self.current = self.rand[0];
		self.rand.shift();
		
		toHide.css('opacity',0);
		
		self.slides.eq(self.current).css('display','block');
		
		setTimeout(function(){
			toHide.css('display','none');
		}, self.animationTime);
		
		setTimeout(function(){
			self.slides.eq(self.current).css('opacity',1);
		}, 10);
	}
	
}
/**
 * Simple slider where we can drop a button to sort a value from 0 to 1
 * 
 * @authors Sarri Maxime
 * 
 * @constructor
 *
 * @param	datas
 * 
 * Object which contains the following parameters 
 *
 *		@param	item: jQuery Object
 *
 *		@param 	startValue: int
 *
 *		@param	start: function
 *
 *		@param change: function
 *
 *		@param end: function
 */

anonymous.utils.slider = function(datas){
	
	datas.startValue = (datas.startValue) ? datas.startValue : 0;
	
	this.datas = datas;
	this.bar = datas.item;
	this.klass = this.bar.prop('class');
	this.initX = 0;
	this.x = 0;
	this.moveX = 0;
	this.leftSide = 0;
	
	this.display();
	
	this.bar.on('mousedown', {self: this}, this.start);
	
};

/**
 * Display the left colored size and the button
 *
 */

anonymous.utils.slider.prototype.display = function(){
	
	this.progress			=	$('<div class="progress">');
	this.button				=	$('<div class="button">');
	
	this.bar
		.append(this.progress)
		.append(this.button);
		
	this.buttonWidth = this.button.width();
	this.barWidth = this.bar.width();
	
	this.button.css('left', (this.barWidth - this.buttonWidth) * this.datas.startValue);
	this.progress.css('width', this.barWidth * this.datas.startValue);
	
};

anonymous.utils.slider.prototype.start = function(e, datas){

	var self = e.data.self;
	
	self.leftSide = self.bar.offset().left;
	self.initX = e.pageX - self.leftSide;
	self.moveX = self.initX;
	self.x = self.moveX;
	
	if (self.moveX > self.barWidth - self.buttonWidth){
	    self.moveX = self.barWidth - self.buttonWidth;
	}
	
	self.button.css('left', self.moveX);
	self.progress.css('width', self.moveX);
	
	$(document).on('mousemove', {self: self}, self.change);
	$(document).on('mouseup', {self: self}, self.stop);
	
	if (typeof self.datas.start == 'function'){
		self.datas.start.call(this, self.moveX / (self.barWidth - self.buttonWidth));
	}
	
};

anonymous.utils.slider.prototype.change = function(e){

	var self = e.data.self;
	
	self.moveX = self.x + (e.pageX - self.leftSide) - self.initX;
	
	if (self.moveX < 0){
	    self.moveX = 0;
	}
	else if (self.moveX > self.barWidth - self.buttonWidth){
	    self.moveX = self.barWidth - self.buttonWidth;
	}
	
	self.button.css('left', self.moveX);
	
	self.progress.css('width', self.moveX);
		
	if (typeof self.datas.change == 'function'){
		self.datas.change.call(this, self.moveX / (self.barWidth - self.buttonWidth));
	}

};

anonymous.utils.slider.prototype.stop = function(e){

	var self = e.data.self;
	
	self.x = self.moveX;		
	$(document).off('mousemove', self.slideChange);
	$(document).off('mouseup', self.stop);
	
	if (typeof self.datas.end == 'function'){
		self.datas.end.call(this, self.moveX / (self.barWidth - self.buttonWidth), $(e.target));
	}

};

/**
 * Video player for playing all types of videos with Flash (HTML5 Fallback without custom controls)
 * 
 * @authors Leo Cheron, Sarri Maxime
 * 
 * @constructor
 * 
 * @param 	container: jQuery Object
 * 
 * Element to transform into a video player
 *
 * @param	autoplay: init OR boolean
 *
 * Set the video to autoplay or not
 */

anonymous.video.player = function(container, autoplay){
	
	var self = this;
	
	this.container = container;
	this.autoplay = autoplay;
		
	this.src = this.container.attr('data-src');
	
	if (!this.autoplay){
		this.thumb = this.container.attr('data-thumb');
	}
	else {
		this.thumb = '';
	}
	
	this.type = (swfobject && swfobject.getFlashPlayerVersion().major == 0) ? 'html5' : 'flash';

	console.log(this.type);
	
	this.playing = false;
	this.bufffering = false;
	this.mute = false;
	this.fullscreen = false;

	this.container.attr('class','anonPlayer pre');
	this.container.attr('webkitallowfullscreen', '');
	this.container.attr('mozallowfullscreen', '');
	this.container.attr('allowfullscreen', '');
	
	this.display();
	
}

/**
 * Display the Flash Player if it's possible, 
 * or fallback to HTML5 player 
 * (for mobile and tablets devices for now)
 *
 */
		

anonymous.video.player.prototype.display = function(){
	
	var self = this;
	
	var playerId = this.container.attr('id') + '_anonPlayer';
	this.container.append('<div id="' + playerId + '">');
	
	if (this.type == 'flash'){
	
		var 
			params 			= 	{
									menu: 'false', 
									allowFullScreen: 'true', 
									allowScriptAccess: 'always', 
									wmode: 'direct',
									bgcolor:'#000000'
								},
			attributes 		= 	{
									id : playerId, 
									name : 'flashname',
									'class': 'anonVideo'
								},
			flashvars 		= 	{
									src: this.src,
									autoplay: this.autoplay,
									scope: this.container.prop('id')
								};
			
		
   		flashvars.scope = this.container.prop('id');
   		flashvars.url = this.url;
		
		swfobject.embedSWF("swf/Main.swf" ,playerId, '100%', '100%', "10.0.0", "swf/expressInstall.swf", flashvars, params, attributes);
		
		setTimeout(function(){
			self.player = document.getElementById(playerId);
			self.displayControls();
			self.manageControls();
		}, 100);		
		
	}
	else {
		
		var
			autoplay		=	(this.autoplay) ? 'autoplay="autoplay"' : '';
			content 		= 	'<video controls src="'+this.src+'" controls="controls" '+autoplay+'></video>';
			
		this.container.html(content);	
		
	}
	
}

/**
 * Display the controls which can be custom by the user
 * All customs are in CSS to be more flexible
 *
 */

anonymous.video.player.prototype.displayControls = function(){
	
	var self = this;
	
	this.controls			=	$('<div class="controls">');
	
	this.playButton 		= 	$('<div class="playButton">');
	this.pauseButton 		= 	$('<div class="pauseButton">');
	this.stopButton 		= 	$('<div class="stopButton">');
	
	this.timeline			=	$('<div class="timeline">');
	this.buffer				=	$('<div class="buffer">');
	
	this.volume				=	$('<div class="volume">');
	
	this.fullscreenButton	=	$('<div class="fullscreenButton">');
	this.muteButton			=	$('<div class="muteButton">');
	
	this.shield				=	$('<div class="shield">');
	
	this.loader				=	$('<div class="loader">Loading...</div>');
	
	if (this.thumb != '' || !this.autoplay){
		this.thumb			=	$('<img class="thumb" src="'+this.thumb+'" />');
		this.container.append(this.thumb);	
	}
	else {
		this.thumb = '';
	}
	
	this.container
		.append(this.shield)
		.append(this.controls)
		.append(this.loader);
	
	this.controls
		.append(this.playButton)
		.append(this.pauseButton)
		.append(this.stopButton)
		.append(this.muteButton)
		.append(this.volume)
		.append(this.fullscreenButton)
		.append(this.timeline);
	

	(this.autoplay) ? this.container.addClass('play').removeClass('pre') : '';
	
	/**
	* Call anonymous.utils.slider({
	* 	item: jQuery Object,
	*	initValue: int,
	*	start: function,
	*	change: function,
	*	end: function
	* });
	*
	*/
	
	var 
		volumeSlide = new anonymous.utils.slider({
			item: this.volume,
			startValue: 0,
			change: function(val){
				self.player.volume(val);
				self.volumeVal = val;
			}
		}),
		
		progressSlide = new anonymous.utils.slider({	
			item: this.timeline,
			startValue: 0,
			start:function(val){
				self.player.pause();
				self.player.progress(val);
				self.timeline.addClass('sliding');
			},
			change: function(val){
				self.player.progress(val);
			},
			end: function(val, target){
				if (target.parents('.anonPlayer').length){
					self.playButton.trigger('click');
					setTimeout(function(){
						self.player.progress(val);
					}, 100);
				}
				self.timeline.removeClass('sliding');
			}
		});
	
	this.timeline.prepend(this.buffer);
	
}

/**
 * Add listeners to each button for their respective roles
 * (play, pause, stop, fullscreen)
 *
 */

anonymous.video.player.prototype.manageControls = function(){
	
	
	var 
		self = this,
		moveTimer;
	
	this.playButton.on('click', function(){		
		self.container.removeClass('pre');
		
		if (self.thumb){
			self.thumb.remove();
			self.thumb = '';
		}
		
		self.container.removeClass('pause').addClass('play');
		
		self.player.play();
		
		if (self.container.attr('class').match('loading')){
			self.container.removeClass('loading');	
		}
		
		setTimeout(function(){
			//self.player.volume(self.volumeVal);
		}, 100);
		
	});
	
	this.pauseButton.on('click', function(){
		
		self.container.removeClass('play').addClass('pause');
		self.player.pause();
		
	});
	
	this.stopButton.on('click', function(){
		
		self.container.removeClass('pause').addClass('play');
		self.player.stop();
		
	});
	
	this.shield
		.on('click', function(){
			
			if (self.container.attr('class').match('play')){
				self.pauseButton.trigger('click');
			}
			else {
				self.playButton.trigger('click');
			}
			
		})
		.on('mousemove', function(){
			self.container.addClass('move');
			clearTimeout(moveTimer);
			console.log('test');
			moveTimer = setTimeout(function(){
				self.container.removeClass('move');
			}, 1000);
			
		});
		
	this.container
		.on('mouseenter', function(){
			self.container.addClass('hover');
		})
		.on('mouseleave', function(){
			self.container.removeClass('hover');
		});
		
	
	this.manageFullscreen();
	
}

/**
 * Add a listener to the fullscreen button
 * If we are in modern browsers which allow HTML5 fullscreen,
 * we use it to display the video in a entire fullscreen,
 * with controls on it.
 * If we are in old browsers, we put the video in a fixed position,
 * with size and height equals to navigator dimensions. Controls can
 * then be on it too.
 *
 */

anonymous.video.player.prototype.manageFullscreen = function(){
	
	var 
		self = this,
		container = self.container;
		
	document.cancelFullScreen = document.webkitExitFullscreen || document.mozCancelFullScreen || document.exitFullscreen || oldFullscreen;	
	
	if (document.cancelFullScreen.toString().match('oldFullscreen')){
		container.attr({
			'data-height': container.height(),
			'data-width': container.width()
		});
	}
	
	this.fullscreenButton.on('click', function(){
		(self.container.attr('class').match('fullscreenMode')) ? cancelFullScreen() : enterFullscreen();
	});
	
	function enterFullscreen(){
		
		if (container[0].webkitRequestFullscreen) {
			container[0].webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		} 
		else if (container[0].mozRequestFullScreen) {
		    container[0].mozRequestFullScreen();
		} 
		else if (container[0].requestFullscreen) {
		    container[0].requestFullscreen();
		}
		else {
		    oldFullscreen('on');
		}
		    		
		container.addClass('fullscreenMode');
		
	}
	
	function cancelFullScreen(){
		
		document.cancelFullScreen();
		container.removeClass('fullscreenMode');
		
	}
	
	function oldFullscreen(mode){
			
		if (mode == 'on'){
			
			container.css({
				'position':'fixed',
				'top':0,
				'left':0,
				'height': $(window).height(),
				'width': $(window).width()
			});
			
		}
		else {
			container.css({
				'position':'static',
				'height':container.attr('data-height'),
				'width':container.attr('data-width')
			});
		}
		
	}
	
	// GERER LE LEAVE DU FULLSCREEN QUAND ON CLIQUE SUR ESCAP

	if (document.webkitExitFullscreen || document.mozCancelFullScreen || document.exitFullscreen){
		document.addEventListener("fullscreenchange", function () {
		    if (!document.fullscreen){
		    	cancelFullScreen();
		    }
		}, false);
		 
		document.addEventListener("mozfullscreenchange", function () {
		    if (!document.mozFullScreen){
		    	cancelFullScreen();
		    }
		}, false);
		 
		document.addEventListener("webkitfullscreenchange", function () {
		    if (!document.webkitIsFullScreen){
		    	cancelFullScreen();
		    }
		}, false);
	}
}

/**
 * Proxy for communicate between the flash player and the HTML controls
 * 
 * @authors Leo Cheron, Sarri Maxime
 * 
 * @constructor
 */

anonymous.video.proxy = function(){
	
}

/**
 * Get datas from flash player for the progress of the video and the buffering
 * 
 * @param	id: string
 * 
 * A string refering to the id of the progress bar
 *
 * @param	response: array
 *
 * Contains datas for modify the length of the progress bar and the buffering bar
 *		0 - currentTime
 *		1 - duration
 *		2 - currentTime / duration
 *		3 - percents of buffering
 */
 
anonymous.video.proxy.onUpdate = function(id, response){
		
	var
		container 			=	$('#'+id),
		bar					=	container.find('.timeline'),
		playButton			=	container.find('.playButton'),
		pauseButton			=	container.find('.pauseButton'),
		buffer				=	bar.children('.buffer'),
		progress			=	bar.children('.progress'),
		button				=	bar.children('.button'),
		buttonWidth			=	button.width(),
		barWidth			=	bar.width(),
		loaded				=	response[3] * response[1];
		
	// PROGRESS	
	if (!bar.prop('class').match('sliding')){
		progress.width(response[2] * (barWidth - buttonWidth));
		button.css('left', response[2] * (barWidth - buttonWidth));
	}
	
	if (parseInt(progress.width()) == barWidth - buttonWidth){
		container.find('.stopButton').trigger('click');
	}
	
	
	// BUFFERING
	buffer.width(response[3] * barWidth);
		
	if (response[0] > loaded ){
		if (!container.attr('class').match('loading')){
			container.addClass('loading');
			pauseButton.trigger('click');
		}
	}
	else if (loaded > response[0] + 5){
		if (container.attr('class').match('loading')){
			container.removeClass('loading');
			playButton.trigger('click');
		}
	}
}

$(function(){
	
	functions.global 					= 	['main', 'ajax', 'control'];
	functions.init();

});

/************************************************************************
*
*			INITIALIZE FUNCTIONS
*			- get attribute data-tpl of the body
*
*/

var functions = {};
functions.launched = false;
functions.ajaxCall = false;
functions.video = '';

functions.init = function(){
	
	var 
		tpl 			=	$('body').attr('data-tpl'),
		fcts			=	[];
				
	if (!fcts){
		fcts = [];
	}
	
	if (functions[tpl]){
		fcts = functions[tpl].slice();
	}
				
	if (this.launched == false){	
		$.each(this.global, function(key, fct){
		    fcts.push(fct);
		});
	}
	else {
		fcts.push('init');
	}
	
	if (fcts){
		$.each(fcts, function(key, fct){
		
			var fn = window[fct];
			
			if (typeof fn === 'function'){
				fn();
			}
			else if (typeof fn === 'object'){
				fn.init();
			}
			else {
				//console.log('init: function doesn\'t exist :		'+fct);
			}
			
		});
	}
}
	
	
	

/************************************************************************
*
*			MAIN OJBECT
*			- contains main actions (resize, init, ...)
*
*/

var main = {
	
	ww:0,
	hh:0,
	has3d:false,
	hasTouch:false,
	browser: {
		name: '',
		version:0
	},
	ev: {
		start:'',
		move:'',
		end:''
	},
	video:true,
	screenBand:0,
	mobile:'',
	
	init: function(){
		
		if (!main.launched){
	
		    main.launched = true;
		}
		
		this.detectFeatures();
		this.resizeWindow();
		this.loadSocialPlugins();
		
		$(window).on('load resize', main.resizeWindow);
		
		if (main.browser.name == 'ie' && main.browser.version <= 8){
			$('body').addClass('ie');
		}
		else if (main.mobile){
			$('body').addClass('body_mobile');
		}
		
	},
	
	resizeWindow: function(e){
		
		main.hh = $(window).height();
		main.ww = $(window)[0].innerWidth;
		console.log(main.ww);
		main.screenBand = (main.ww - 960) / 2;
					
		$('#splashscreen .container img').each(function(){
			main.resizeBloc($('#splashscreen .container'), $(this));
		});
		
		$('#splashscreen:not(.off)').height(main.hh);
		
		main.resizeFlash($('#main_video'));
		
		if (main.browser.name == 'ie' && main.browser.version <= 8){
			if (main.ww > 1020){
				$('body').addClass('large');
			}
			else {
				$('body').removeClass('large');
			}
		}
		
		$('#video video').css({
			'height': main.hh - main.hh / 100 * 20,
			'width': main.ww - main.ww / 100 * 20
		});

		/*if (main.ww < 1021){
		if ($('#main_nav ul').height() > 0){
				$('#main_nav ul').height(main.hh - 90).css('display','none');
					}
		else {
			$('#main_nav ul').height('auto').css('display','block');
	}*/
		
		// DISPLAY MOBILE VIDEO
		
		
		/*if (main.mobile){
			if (!$('.project_thumb').eq(0).find('.mobile').length){
				$('.project_thumb').each(function(){
					var $this = $(this);
					var mobile 	= 	'<div class="mobile">'
								+	'<video src="'+$this.attr('data-src')+'" poster="'+$this.find('img').attr('src')+'" controls data-width="510" data-height="286"></video>'
								+	'</div>';
							
					$this.find('.infos').before(mobile);
				});
			}
			$('.project_thumb').each(function(){
				$(this).find('video').width(main.ww - 20).height( 286 / 510 * (main.ww - 20) );
			});
			
			if ($('video').length){
				$('video').width(main.ww - 80).height(main.hh - 80);
			}
			
		}
		else {
			if ($('.project_thumb').eq(0).find('.mobile').length){
				$('.project_thumb').each(function(){
					var $this = $(this);
					$this.find('.mobile').remove();
				});
			}
		}*/
		
		$('.project_thumb figure').each(function(){
			
			var
				$this		=	$(this);
				
			$this.height(286 / 510 * $this.width());
			
		});
				
	},
	
	resizeFlash: function(container){
		
		var
			pic			=	container,
			pH			=	container.attr('data-height'),
			pW			=	container.attr('data-width'),
			cW			=	container.parent().width(),
			r			=	1280 / 720;
				
        pic
            .css({
            	'width':cW,
            	'height':cW / r
            });
	    
	    
		
	},
	
	resizeBloc: function(container, elm){
		
		var
	        pic			=	(elm) ? elm : container.children('img'),
	        cW			=	container.width(),
	        cH			=	container.height(),
	        pH			=	parseInt(pic.attr('data-height')),
	        pW			=	parseInt(pic.attr('data-width')),
	        cR			=	cH / cW,
	        pR			=	pH / pW,
	        top			=	(cH / 2 - (pH / pW * cW) / 2) + 1,
	        left		=	(cW / 2 - (pW / pH * cH) / 2) + 1;
	   		   						
	    if (cR < pR){
	        pic
	            .css({
	            	'width':cW,
	            	'height':'auto',
	            	'top': top,
	            	'left':0
	            });
	    }
	    else {
	        pic
	        	.css({
	        	    'height':cH,
	        	    'width':'auto',
	        	    'left':left,
	        	    'top':0
	        	});
	    }
		
	},
	
	detectFeatures: function(){
		// TOUCH EVENTS
		main.hasTouch = ('ontouchstart' in window) ? true : false;
		
		main.ev.start = main.hasTouch ? 'touchstart' : 'mousedown';
		main.ev.move = main.hasTouch ? 'touchmove' : 'mousemove';
		main.ev.end = main.hasTouch ? 'touchend' : 'mouseup';
		
		if (navigator.userAgent.match('MSIE')){
			main.browser.name = 'ie';
			main.browser.version = parseInt(navigator.userAgent.split('MSIE ')[1].substr(0, 3));
		}
		
		var 
			video = document.createElement( "video" ),
		    mpeg4, h264, ogg, webm;
		if ( video.canPlayType ) {
		    mpeg4 = "" !== video.canPlayType( 'video/mp4; codecs="mp4v.20.8"' );
		    h264 = "" !== ( video.canPlayType( 'video/mp4; codecs="avc1.42E01E"' )
		        || video.canPlayType( 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"' ) );
		    ogg = "" !== video.canPlayType( 'video/ogg; codecs="theora"' );
		    webm = "" !== video.canPlayType( 'video/webm; codecs="vp8, vorbis"' );
		}
		
		if (mpeg4){
			main.video = 'mpeg4';
		}
		else if (h264){
			main.video = 'h264';
		}
		else if (ogg){
			main.video = 'ogg';
		}
		else if (webm){
			main.video = 'webm';
		}
		
		if (navigator.userAgent.match('iPhone')){
			
			main.mobile = 'iphone';
		}
		else if (navigator.userAgent.match('iPad')){
			main.tablet = 'ipad';
		}
		else if (navigator.userAgent.match('Android') && $(window).width() < 900){
			main.mobile = 'android';
		}
		
	},
	
	loadSocialPlugins: function(){
		
		// LOAD Facebook
		/*(function(d, s, id) {
		  var js, fjs = d.getElementsByTagName(s)[0];
		  if (d.getElementById(id)) return;
		  js = d.createElement(s); js.id = id;
		  js.src = "//connect.facebook.net/fr_FR/all.js#xfbml=1&appId=368326643244692";
		  fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
		
		// LOAD Twitter
		!function(d,s,id){
		    var js,fjs=d.getElementsByTagName(s)[0];
		    if(!d.getElementById(id)){
		    	js=d.createElement(s);js.id=id;
		    	js.src="//platform.twitter.com/widgets.js";
		    	fjs.parentNode.insertBefore(js,fjs);
		    }
		}(document,"script","twitter-wjs");*/
		
	}
	
}



/************************************************************************
*
*			AJAX CALL
*			-	for ajax calls, transitions & urls
*
*/

var ajax = {

	sent: false,
	content: '',
	tpl: [],
	first:true,
		
	init: function(){
		
		ajax.tpl = ['', $('.ajaxContainer').attr('id')];
		
		$(document).on('click', 'a:not(.noAjax, .project_thumb)', function(e){
			
			var
				$this			=	$(this);
				
			ajax.call($this.attr('href'), $this, e);
			
		});
		
	},
	
	call: function(href, $this, e){
		
		var
			klass			=	($this && $this.attr('class')) ? $this.attr('class') : true;
				
		(e) ? e.preventDefault() : '';
		
		if (ajax.first){
  		    
  		    window.onpopstate = function(event, extra) {
  		    	ajax.call(document.location.href, '', event);
  		    }
  		    ajax.first = false;
  		}
		
		if (href != document.location.href || e.type == 'popstate'){
						
		/*	$('#main_nav .active').removeClass('active');
			
			if (href.match('directors')){
				if ($this)
					$('#main_nav ul li:eq('+$this.parent().index()+') a').addClass('active');
				main.resizeWindow();
			}
		
			if (main.mobile){
				$('#main_nav ul').css({'height':0, 'padding': 0});
				$('#body').css('display','block');
				main.resizeWindow();
			}*/
			
		    $.ajax({
		        url: href,
		        success: function(response){
		        	
		        	ajax.content = $(response).find('.ajaxContainer');
		        	ajax.tpl = [ajax.tpl[1], ajax.content.attr('id')];
		        	
		        	ajax.anim.Dfault();
		        	ajax.changeUrl(href);
		        	
		        	$('title').text($(response).filter('title')[0].innerText);
		        	
		        	if ($this && $this.parents('footer').length){
			        	$('html, body').animate({'scrollTop': 0}, 1000);
		        	}
		        			        	
		        }
		    });
		}
	},
	
	endCall: function(dataType, klass){
		
		
		
	},
	
	anim: {
	
		Dfault: function(){
		
			var
				container		=	$('.ajaxContainer');
			
			container.addClass('noAnim').css('opacity',0);
			
			setTimeout(function(){
				
				container.attr('id', ajax.content.attr('id'));
				container.html(ajax.content.html());
				container.removeClass('noAnim').css('opacity',1);
				control.director();
				control.displayHover();
				if (main.mobile){
					main.resizeWindow();
				}
				
			}, 10);
											
		}
		
	},
	
	changeUrl: function(href){
		
		var
	   		state		=	{};
	
	    if (window.history.pushState){
	    	window.history.pushState(state, null, href);
	    }
	    else{
	    	href = (href) ? '#!/'+href : '';
	    	window.location.hash = href;
	    }
		
	}
	
}


/************************************************************************
*
*			RESIZE WINDOW
*			-	Resize elements when the window is resizing
*
*/

var control = {
	init: function(){
		if ($('#splashscreen').length){
			this.splashscreen.init();
		}
		this.events();		
		//window.requestAnimationFrame(dd.animationFrame, $('body'));
		
		var
			header		=	$('#main_header');
		$('#directors_nav').height(0);
		this.loadImg();
		this.displayHover();
		this.loadDirector();
		this.director();
		if (main.mobile){
			$('body').css('min-height', window.screen.height + 60);
		}
		
		
		//this.video = new anonymous.video.player($('#splash_video'), false);
		
	},
	
	animationFrame: function(){
		
		window.requestAnimationFrame(dd.animationFrame, $('body'));
		
	},
	
	events: function(){
		
		$('#main_header .open_splash').on('click', function(){
			$('#splashscreen').height(main.hh);
			setTimeout(function(){
				$('#splashscreen').removeClass('off');
				$('html, body').animate({'scrollTop': 0}, 300);
				main.resizeBlog($('#splashscreen .container'), $('#splash_video'));
				control.splashscreen.init();
			}, 700);
		});
		
		$('.directors_button').on('click', function(){
			
			var
				nav			=	$('#directors_nav');
			
			var
				header		=	$('#main_header'),
				klass		=	(nav.attr('class')) ? nav.attr('class') : 'none';
			
			if (klass.match('opened')){
				nav.height(0).removeClass('opened');
			}
			else {
				nav.height(nav.children('ul').height() + 12).addClass('opened');
			}
			
		});
		
		// CHANGE VIDEO WHEN WE CLICK ON A PROJECT
		$(document).on('click', '.project_thumb', function(e){
			
			var
				$this		=	$(this),
				lower		=	$this.attr('data-lower').replace(/-/g,'_'),
				thumb		=	$this.attr('data-preview'),
				src			=	$this.attr('data-src'),
				main_video	=	$('#main_video'),
				push		=	$('#home .push'),
				delay		=	0;
			
			if (!main.mobile){		
				
				$('html, body').animate({'scrollTop': ((main.mobile) ? 0 : 86)}, 500);

				main_video.html('');
				main_video.replaceWith('<div id="main_video" data-thumb="'+thumb+'" data-src="'+src+'" data-width="1280" data-height="720" style="'+$('#main_video').attr('style')+'"></div>');
				var video = new anonymous.video.player($('#main_video'), true);
				main.resizeFlash($('#main_video'));
								
				$('.current .infos, .push .infos').html($this.find('.infos').html());
				
				if ($this.attr('data-color') == 'black'){
					$('.push, .current').addClass('black');
				}
				else {
					$('.push, .current').removeClass('black');
				}
										
				if (push.length){
					push.height(push.children('.overview').height());
				}
				
			}
			else {
				
				var
					content = '',
					video = null;
					
				content 		=	'<div id="video">'
								+	'	<video width="100%" controls="controls"><source src="' + src + '" type="video/mp4" /></video>'
								+	'	<span class="close"></span>'
								+	'</div>';
								
				
				$('body').append(content);
				
				video = $('#video video')[0];
				
				video.play();
				
				if (main.mobile == 'iphone'){
					video.addEventListener('pause', function(){
						
						$('#video').remove();
						
					});
				}
				
				main.resizeWindow();
				
				$('.close').on('touchend', function(){
					$('#video').remove();
				});
				
			}
			
			var 
				path = document.location.pathname.split('/'),
				url = $this.attr('href');
			
			if (path[3]){	
				if (window.history && window.history.pushState){
					ajax.changeUrl(url);
				}
				else {
					document.location.href = url;
				}
			}
			//document.location.hash = $this.attr('data-lower');
			
			e.preventDefault();
			
		});
		
		// CLICK MOBILE
		
		/*var
				nav		=	$('#main_nav ul');
		
		$('.ourDirectors').on('click', function(){			
							
			if (nav.height() == 0){
				nav.css({'height': main.hh - 90, 'padding': '20px 0'});
				$('#body').css('display','none');
			}
			else {
				nav.css({'height':0, 'padding': 0});
				$('#body').css('display','block');
			}
			
		});*/
			
	},
	
	displayHover: function(){
		
		if (main.browser.name != 'ie' && !main.browser.version && !main.hasTouch){
		
			$(document)
				.on('mouseenter', '.project_thumb', function(){
					
					var $this = $(this);
					var video = $this.find('video')[0];

					if (video)
						$(video).css('display','block');
						video.play();
				
				})
				.on('mouseleave', '.project_thumb', function(){
					var video = $(this).find('video')[0];
					if (video){
						$(video).css('display','none');
						video.currentTime = 0;
						video.pause();
					}
					
				});
				
			$('.project_thumb').each(function(){
				
				var 
					$this		=	$(this),
					src			=	$this.attr('data-lower'),
					video 		= 	'';

				if (src){
					
					video = '<video preload="none" autobuffer="false" class="video" poster="'+$this.find('img').attr('src')+'" loop >'
						  +	'	<source src="' + $this.attr('data-hover-mpf') + '" type="video/mp4" />'
						  +	'	<source src="' + $this.attr('data-hover-ogv') + '" type="video/ogg" />'
						  +	'</video>';
					
					$this.find('figure').append(video);
					
					
					video		=	$this.find('video')[0];
															
					//if (main.video == 'mpeg4' || main.video == 'h264' || main.video == 'ogv'){
					//	video.addEventListener('timeupdate', function(){
					//							
					//		if (Math.floor(this.currentTime * 10) > Math.floor(this.duration * 10) - 2){
					//			this.currentTime = 0;
					//		}
					//		
					//	});
					//}
				}
								
			});
		}
		
	},
	
	loadImg: function(){
		
		$('.project_thumb img, #splashscreen img').each(function(){
			
			var
				$this			=	$(this);
			
			$this.addClass('noAnim').css('opacity',0);
			
			if (!$this[0].complete){
				$this[0].onload = function(){
					$this.removeClass('noAnim').css('opacity', 1);
				}
			}
			else {
				$this.removeClass('noAnim').css('opacity', 1);
			}
			
			main.resizeBloc($('#splashscreen .container'), $('#splashscreen .container img'));
			
		});
			
	},
	
	/*loadDirector: function(){
		
		if ($('.ajaxContainer').attr('id') == 'director' && $('.part').length == 0){
			$.ajax({
		        url: $('#main_nav .active').attr('href'),
		        success: function(response){
		        	
		        	var content = $(response).find('.content');
		        	$('.current').after(content);
		        	
		        	if ($('.content .active').length == 0){
			        	control.director(true);
		        	}
		        			        	
		        }
		    });
		}
		
	},*/
	
	splashscreen: {
	
		scrolling: false,
		
		init: function(){
		
			var self = this;
			
			$('#splashscreen').removeClass('noAnim');
			if (!main.mobile){	
				window.scrollTo(1, 0);
				$(document).on('scroll', this.leave);
				if ($(document).data('events') && !$(document).data('events').leave){
					$('body').on('mousewheel touchmove', this.leave);
				}
				this.launching();
			
				$('#splashscreen .infos').css('margin-bottom', - $('#splashscreen .infos').height() / 2);
				
				var carousel = new anonymous.utils.carousel($('#splashscreen .container'), 3000, 500);
				
				
			}
			else {
				window.scrollTo(1, 0);
				$('#splashscreen').css('min-height', window.screen.height + 60);
				$('#splashscreen').on('touchmove', function(){
					if (!self.scrolling){
						$('#splashscreen').css({'min-height':0, 'height':0});
						setTimeout(function(){
							$('#splashscreen').off('touchmove');
							$('#splashscreen').remove();
						}, 600);
						self.scrolling = true;
					}
					return false;
				});
			}
			
		},
		
		launching: function(){
			setTimeout(function(){
				$('#splashscreen').addClass('launched');
			}, 2000);	
			
		},
		
		leave: function(e, delta, deltaX, deltaY){
			
			var 
			    self = control.splashscreen,
			    splash = $('#splashscreen');
				
			if (!self.scrolling){
			
				splash.addClass('off');
				
				splash.height(0);
				self.scrolling = true;
				
				setTimeout(function(){
					$('body').off('mousewheel leave');
				}, 1000);
				
				e.preventDefault();
			}
		}
		
	},
	
	director: function(display_video){
		
		var
			container		=	$('#director .content'),
			nav				=	container.children('nav'),
			button			=	nav.find('li'),
			part			=	container.children('.part');
		
		// DISPLAY VIDEO
		
		if (!display_video){
			var video = new anonymous.video.player($('#main_video'), false);
			main.resizeFlash($('#main_video'));
		}
		// ADD INITIAL HEIGHT TO EACH PART
			
		button.eq(0).addClass('active');
		
		// ACTION TO DISPLAY PART		
		
		nav.on('click', 'li', function(){
			
			var
				$this			=	$(this),
				klass			=	($this.attr('class')) ? $this.attr('class') : '',
				name			=	$this.text().toLowerCase();
			
			$('#main_video .pauseButton').trigger('click');
			
			if (!klass.match('active')){
			
				$this.siblings().removeClass('active');
				part.css('opacity',0);
				$this.addClass('active');
				setTimeout(function(){
					container.children('.'+name).css({'display':'block'}).siblings('.part').css('display','none');
					setTimeout(function(){
						container.children('.'+name).css({'opacity':1});
					}, 10);
				}, 310);
			}
			
		});	
		
		part.each(function(key){
			
			var
				$this		=	$(this);
			
			(key == 0) ? $this.css('opacity', 1) : $this.css({'opacity':0, 'display':'none'});
			
		});
		
	}
	
};