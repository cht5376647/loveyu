<?php
/**
 * ShopMax licence
 *
 * @copyright  Copyright (c) 2005-2010 ShopMax Technologies Inc. (http://www.shopmaxmb.com)
 */

function theme_widget_goods_shopmax_pics2(&$setting,&$render){
    $_return = false;
	$_returnmult = false;
	$_dependApp = app::get('b2c');
    $db = kernel::database();

    switch ($setting['selector']) {
    case 'filter':
        parse_str($setting['goods_filter'],$goodsFilter['single']);
        $goodsFilter['single']['goodsOrderBy'] = $setting['goods_order_by'];
        $goodsFilter['single']['goodsNum'] = ($setting['limit'])?$setting['limit']:8;
        $_return = b2c_widgets::load('Goods')->getGoodsList($goodsFilter['single']);
        //$_return = array_values($_return['goodsRows']);
        break;

    case 'select':

        $goodsFilter['single']['goods_id'] = explode(",", $setting["goods_select"]);
        $goodsFilter['single']['goodsNum'] = ($setting['limit'])? $setting['limit'] : count($goodsFilter['single']['goods_id']);
        $_return = b2c_widgets::load('Goods')->getGoodsList($goodsFilter['single']);

        foreach (json_decode($setting['goods'],1) as $obj) {
            if(trim($obj['pic'])!=""){
                $_return['goodsRows'][$obj['id']]['goodsPicL'] = 
                    $_return['goodsRows'][$obj['id']]['goodsPicM'] = 
                    $_return['goodsRows'][$obj['id']]['goodsPicS'] = $obj['pic'];
            }
            if(trim($obj['nice'])!=""){
                $_return['goodsRows'][$obj['id']]['goodsName'] = $obj['nice'];
            }
        }

        break;

    }
	$gids = array_keys($_return['goodsRows']);
    $mdl_product = $_dependApp->model('products');
    $products = $mdl_product ->getList('product_id, spec_info, price, freez, store, marketable, goods_id',array('goods_id'=>$gids,'marketable'=>'true'));
    foreach ($products as $product) {
            $_return['goodsRows'][$product['goods_id']]['product_id'] = $product['product_id'];
	}
	switch ($setting['selector_r']) {
    case 'filter_r':
        parse_str($setting['goods_filter_r'],$goodsFilter['rank']);
        $goodsFilter['rank']['goodsOrderBy'] = $setting['goods_order_by_r'];
        $goodsFilter['rank']['goodsNum'] = ($setting['limit_r'])?$setting['limit_r']:8;
        $_returnmult = b2c_widgets::load('Goods')->getGoodsList($goodsFilter['rank']);
        //$_returnmult = array_values($_returnmult['goodsRows']);
        break;

    case 'select_r':

        $goodsFilter['rank']['goods_id'] = explode(",", $setting["goods_select"]);
        $goodsFilter['rank']['goodsNum'] = ($setting['limit_r'])? $setting['limit_r'] : count($goodsFilter['rank']['goods_id']);
        $_returnmult = b2c_widgets::load('Goods')->getGoodsList($goodsFilter['rank']);

        foreach (json_decode($setting['goods_r'],1) as $obj) {
            if(trim($obj['pic'])!=""){
                $_returnmult['goodsRows'][$obj['id']]['goodsPicL'] = 
                    $_returnmult['goodsRows'][$obj['id']]['goodsPicM'] = 
                    $_returnmult['goodsRows'][$obj['id']]['goodsPicS'] = $obj['pic'];
            }
            if(trim($obj['nice'])!=""){
                $_returnmult['goodsRows'][$obj['id']]['goodsName'] = $obj['nice'];
            }
        }

        break;

    }
	$gids2 = array_keys($_returnmult['goodsRows']);
    $products2 = $mdl_product ->getList('product_id, spec_info, price, freez, store, marketable, goods_id',array('goods_id'=>$gids2,'marketable'=>'true'));
    foreach ($products2 as $product) {
            $_returnmult['goodsRows'][$product['goods_id']]['product_id'] = $product['product_id'];
	}
// print_r($_return);
    return array('prank'=>$_returnmult,'plist'=>$_return);
}
?>
