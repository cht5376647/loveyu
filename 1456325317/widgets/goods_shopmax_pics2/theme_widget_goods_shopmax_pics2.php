<?php
/**
 * ShopMax licence
 *
 * @copyright  Copyright (c) 2005-2010 ShopMax Technologies Inc. (http://www.shopmaxmb.com)
 */

function theme_widget_goods_shopmax_pics2(&$setting,&$render){
    $_return = false;
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

        foreach (json_decode($setting['goods_select_linkobj'],1) as $obj) {
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
 foreach ($setting['goods_list'] as $key => $glist) {
                     $_returnmult[$key] = $glist;
                     $goodsFilter['mult']['goods_id'] = explode(",", $setting["goods_select_".$key]);
                     $goodsFilter['mult']['goodsNum'] = $glist['limit_m'];
                     $goodsFilter['mult']['goodsOrderBy'] = $glist['order_by_m'];
                      $_returnmult[$key] = b2c_widgets::load('Goods')->getGoodsList($goodsFilter['mult']);
                      foreach ($glist as $k => $v) {
                             if($k=='id')continue;
                            $_returnmult[$key][$k] = $v;
                      }
               foreach ($_returnmult[$key]['goodsRows'] as $k => $grow) {                  
                  /*$sql = "select t.tag_name from sdb_desktop_tag t inner join sdb_desktop_tag_rel tr on t.tag_id=tr.tag_id ".
                            " where t.tag_type='goods' and tr.rel_id=".$db->quote($grow['goodsId']);                
                  $_returnmult[$key]['goodsRows'][$k]['tags'] = $db->select($sql);                                   
                  */
                  $grow['goods_id'] = $grow['goodsId'];
                  $prds = array($grow);

                  foreach( kernel::servicelist('tags_special.add') as $services ) {
                    if ( is_object($services)) {
                        if ( method_exists( $services, 'add') ) {
                            $services->add( $grow['goodsId'], $prds );
                        }
                    }
                  }
                  $_returnmult[$key]['goodsRows'][$k]['tags'] = $prds[0]['tags'];
               }
                              			   
      }
	  return array('plist'=>$_returnmult,'prank'=>$_return);
}
?>
