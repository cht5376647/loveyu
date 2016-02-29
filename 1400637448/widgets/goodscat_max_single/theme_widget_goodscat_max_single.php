<?php
/**
 * ShopEx licence
 *
 * @copyright  Copyright (c) 2005-2010 ShopEx Technologies Inc. (http://www.shopex.cn)
 * @license  http://ecos.shopex.cn/ ShopEx License
 */

function theme_widget_goodscat_max_single(&$setting,&$render){
     	     
     	    if( false&& base_kvstore::instance('b2c_goods')->fetch('goods_cat_ex_vertical_widget.data',$cat_list) ){
     	    	return $cat_list;
     	    }


	     $cat_mdl = app::get('b2c')->model('goods_cat');
	     $brand_mdl  = app::get('b2c')->model('brand');

	     $salesList = _max_single_getSales();
	     $brandlist = $brand_mdl->getAll();
	     $new_brandlist5 = array_slice($brandlist, 0,80,true);
	     foreach ($new_brandlist5 as $key => $value) {
	     	$brand_list[$value['brand_id']] = $value;
			//$brand_list[$value['brand_id']['brand_logo']] = $value['brand_logo'];
	     }
           // $cat_mdl->cat2json(true);
	     $cat_list =$cat_mdl->get_cat_list();
	     $_returnData['brand_list'] = $brand_list;
	     
	     foreach ($cat_list as $k=>$cat) {

	     	switch ($cat['step']) {
	     		case 1:
		     		$all_cids 	= _max_single_getAllChildAttr($cat_list,$cat['cat_id']);
		      		$all_cids[] 	= $cat['cat_id'];
		      		$all_typeids 	= _max_single_getAllChildAttr($cat_list,$cat['cat_id'],'type');
		      		$all_typeids[] 	= $cat['type'];
					//$setting['shopmax_sglgcat'];
		      		$all_brandids 	= _max_single_getLinkBrandIds($all_typeids);

		      		$cat['brand'] = $all_brandids;		  			
		      		$_returnData['lv1'][] = $cat;
	     			break;
	     		case 2:
					$all_typeids 	= _max_single_getAllChildAttr($cat_list,$cat['cat_id'],'type');
					$all_typeids[] 	= $cat['type'];
					$all_brandids 	= _max_single_getLinkBrandIds($all_typeids);
					$cat['brand'] = $all_brandids;
					//echo "<pre>";print_r ($all_brandids);
	     			$_returnData['lv2'][] = $cat;


	     			break;
	     		case 3:
	     			$_returnData['lv3'][] = $cat;
	     			break;
	     		
	     	}//end switch
	      }


	        // echo "<pre class='notice'>";
	        // var_dump($_returnData['lv1']);return;
	     // base_kvstore::instance('b2c_goods')->store('goods_cat_max_single_widget.data',$cat_list);

	     return $_returnData;
                                        
    }

function _max_single_getAllChildAttr($arr,$pid,$attribute = 'cat_id'){

	
	foreach ($arr as $item) {
		if(in_array($pid, explode(',', $item['cat_path']))){
			$_return[] = $item[$attribute];
		}
	}

	return $_return;


}


function _max_single_getLinkBrandIds($typeids){

	$sql = 'SELECT brand_id FROM '.kernel::database()->prefix.'b2c_type_brand WHERE type_id  in('.implode(',',array_unique($typeids)).')';

	$res =  app::get('b2c')->model('brand')->db->select($sql );

	foreach ($res as $key => $value) {
		$_return[] = $value['brand_id'];
	}

	return array_unique($_return);

}

function _max_single_getSales(){

	$goods_sales_mdl = app::get('b2c')->model('sales_rule_goods');
	$goods_sales_list = $goods_sales_mdl->getList('*');

	return $goods_sales_list;
}

?>






