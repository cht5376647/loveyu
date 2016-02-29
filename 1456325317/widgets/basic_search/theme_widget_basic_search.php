<?php
/**
 * ShopEx licence
 *
 * @copyright  Copyright (c) 2005-2010 ShopEx Technologies Inc. (http://www.shopex.cn)
 * @license  http://ecos.shopex.cn/ ShopEx License
 */

function theme_widget_basic_search(&$setting,&$smarty){
    $data['def_key'] = app::get('search')->getConf('search_key');

    foreach($setting['top_link_title'] as $tk=>$tv){
        $data['search'][$tk]['top_link_title'] = $tv;
        $data['search'][$tk]['top_link_url'] = $setting['top_link_url'][$tk];
    }

    /*$obj = kernel::service('autocomplete.associate_keys');
    if ($obj && method_exists($obj, 'get_widgets_top_html')){
        $data['top_html'] = $obj->get_widgets_top_html();
    }
    if ($obj && method_exists($obj, 'get_widgets_bottom_html')){
        $data['bottom_html'] = $obj->get_widgets_bottom_html();
    }*/
    return $data;
}
?>
