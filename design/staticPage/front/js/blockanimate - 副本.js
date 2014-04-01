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
		window.setTimeout(window_change,300)
		//window_change();
	//});
	
	//window resize
	var str_int=0;
	var currentWidth = 1980;
	$(window).resize(function(){window_change()});
	function window_change() {
		var winWidth = $(window).width();
		var conWidth;
		if(winWidth < 640) {
			col = 1
			str_int=1;
		} else if(winWidth < 768) {
			col = 2
		} else if(winWidth < 1024) {
			col = 3;
		} else {
			col = 3;
			str_int=1;
		}
		
		if(conWidth != currentWidth) {
			currentWidth = conWidth;
			$('#container').width(conWidth);
			$('#container').BlocksIt({
				numOfCol: col,
				offsetX: 8,
				offsetY: str_int
			});
			
		}
		window.setTimeout(recount_height,200)
	}
	var str1 = 0,str2 = 0,str3 = 0,stra = 0,height_top = 20;  //height_top 距离上一个图片的间距
	function recount_height(){
		str1 = $(".reheight1").length;
		str2 = $(".reheight2").length;
		str3 = $(".reheight3").length;
		for(i=0;i<str1;i++){
			if(i==0){
				stra =  parseInt($(".reheight1").eq(i).css('top'));
			}
			else{
				stra = stra + $(".reheight1").eq(i-1).height() + height_top;
				$(".reheight1").eq(i).css('top',stra+"px");
			}
		}
		for(i=0;i<str2;i++){
			if(i==0){
				stra = parseInt($(".reheight2").eq(i).css('top'));
			}
			else{
				stra = stra + $(".reheight2").eq(i-1).height() + height_top;
				$(".reheight2").eq(i).css('top',stra+"px");
			}
		}
		for(i=0;i<str3;i++){
			if(i==0){
				stra =  parseInt($(".reheight3").eq(i).css('top'));
			}
			else{
				stra = stra + $(".reheight3").eq(i-1).height() + height_top;
				$(".reheight3").eq(i).css('top',stra+"px");
			}
		}
		window.setTimeout(recount_warp_height,1000);
	}
	function recount_warp_height()
	{//alert(parseInt($(".reheight1").eq(str1-1).css('top'))+"  "+$(".reheight1").eq(str1-1).height());
		str1 = parseInt($(".reheight1").eq(str1-1).css('top'))+$(".reheight1").eq(str1-1).height();
		if(str2){
		str2 = parseInt($(".reheight2").eq(str2-1).css('top'))+$(".reheight2").eq(str2-1).height();}
		if(str3){
		str3 = parseInt($(".reheight3").eq(str3-1).css('top'))+$(".reheight3").eq(str3-1).height();}
		var new_height=str3;
		if(str1>str2&&str1>str3){
			new_height = str1;
		}else if(str2>str1&&str2>str3){
			new_height = str2;
		}
		$("#container").height(new_height+5)
	}
});