<?php
/**
* Power By ShopEx Jxwinter
* Time  2012-04-10  NO.193

*/

function theme_widget_goods_comment($setting,&$smarty){

    $data = b2c_widgets::load('Comment')->getTopComment($setting['limit']);    //通过数据接口取数据

    $imageDefault = app::get('image')->getConf('image.set');
    foreach($data as $k=>$v){
      if(!$v['goodsPic']){
       $data[$k]['goodsPic'] = $imageDefault['M']['default_image'];
      }
    }

    return $data;
}
?>
