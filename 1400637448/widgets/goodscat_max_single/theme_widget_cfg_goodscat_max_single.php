<?php 
	
	function theme_widget_cfg_goodscat_max_single(&$setting,&$render){
	 $data = b2c_widgets::load('GoodsCat')->getGoodsCatMap('',true); //新数据接口
      return $data;
	}
?>