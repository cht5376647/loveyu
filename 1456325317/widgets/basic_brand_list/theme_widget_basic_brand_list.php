<?php
/**
 * ShopEx licence
 *
 * @copyright  Copyright (c) 2005-2010 ShopEx Technologies Inc. (http://www.shopex.cn)
 * @license  http://ecos.shopex.cn/ ShopEx License
 */

function theme_widget_basic_brand_list(&$setting,&$render){
         $limit = ($setting['limit'])?$setting['limit']:6;
	     $brand_list = app::get('b2c')->model('brand')->getList('*',array(),0,$limit,'ordernum desc');
	return $brand_list;
}
?>






