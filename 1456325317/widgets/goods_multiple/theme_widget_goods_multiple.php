<?php

function theme_widget_goods_multiple(&$setting,&$render){
      $_return = false;
      foreach ($setting['goods_list'] as $key => $glist) {
                     $_return[$key] = $glist;
                     $goodsFilter['goods_id'] = explode(",", $setting["goods_select_".$key]);
                     $goodsFilter['goodsNum'] = $glist['limit'];
					 $goodsFilter['bn'] = $glist['bn'];
                     $goodsFilter['goodsOrderBy'] = $glist['order_by'];
                      $_return[$key] = b2c_widgets::load('Goods')->getGoodsList($goodsFilter);
                      foreach ($glist as $k => $v) {
                             if($k=='id')continue;
                            $_return[$key][$k] = $v;
                      }

			   foreach ($_return[$key]['goodsRows'] as $k => $grow) {                  
                  $grow['goods_id'] = $grow['goodsId'];
                  $prds = array($grow);

                  foreach( kernel::servicelist('tags_special.add') as $services ) {
                    if ( is_object($services)) {
                        if ( method_exists( $services, 'add') ) {
                            $services->add( $grow['goodsId'], $prds );
                        }
                    }
                  }
                  $_return[$key]['goodsRows'][$k]['tags'] = $prds[0]['tags'];
               }
      }
    return $_return ;
}
?>
