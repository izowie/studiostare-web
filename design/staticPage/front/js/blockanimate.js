$(document).ready(function() {
	//vendor script
	$('#header')
	.css({ 'top':-50 })
	.delay(1000)
	.animate({'top': 0}, 800);
	
	$('#footer')
	.css({ 'bottom':-15 })
	.delay(1000)
	.animate({'bottom': 0}, 800);
	
	//blocksit define
	//$(window).load( function() {
		window.setTimeout(function(){$('#container').BlocksIt({
			numOfCol: 3,
			offsetX: 8,
			offsetY: 8
		});},300);
		
	//});
	
	//window resize
	var currentWidth = 1100;
	$(window).resize(function() {
		var winWidth = $(window).width();
		var warpWidth= $("#wrapper").width();
		var conWidth;
		if(winWidth < 660) {
			col = 1
		} else if(winWidth < 880) {
			col = 2
		} else if(winWidth < 1490) {
			col = 3;
		} else{
			col = 3;
		}
		conWidth = warpWidth;
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#container').width(conWidth);
			$('#container').BlocksIt({
				numOfCol: col,
				offsetX: 8,
				offsetY: 8
			});
		}
	});
});