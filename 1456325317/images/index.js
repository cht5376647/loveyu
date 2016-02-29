jQuery('.max-index-ad li').hover(function(){
	jQuery(this).find('img').animate({left:'-10px'},100);
},function(){
	jQuery(this).find('img').animate({left:'0'},100);
})
jQuery('.goods-shopmax-multiple dt li').each(function(i){
jQuery(this).hover(function(){
	jQuery(this).addClass('act').siblings().removeClass('act')
	jQuery('.goods-shopmax-multiple dd').eq(i).show().siblings('dd').hide()

})
	})