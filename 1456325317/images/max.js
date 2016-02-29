jQuery('.maxwx').hover(function(){
jQuery(this).find('span').css('display','block')
},function(){
jQuery(this).find('span').hide()
})
	
try{
    $$('.step-item').each(function(item){
	
	new Element('div.stpdiv',{html:item.getElement('i').get('html')}).inject(item)
	
	})



} catch (e) {}
    
$$('.theme-footer')[0].getNext('div').set('html',' ')
   