new DataLazyLoad({
    textarea: 'textarea-lazyload-block'
});
var AutoSize = AutoSize || (new Class({
    initialize: function(elements, hw) {
        this.elements = $$(elements);
        this.doAuto(hw)
    },
    doAuto: function(hw) {
        if (!hw) {
            hw = 'height'
        };
        var max = 0,
        prop = (!Browser.ie6 ? 'min-': '') + hw,
        offset = 'offset' + hw.capitalize();
        this.elements.each(function(element, i) {
            var calc = element[offset];
            if (calc > max) {
                max = calc
            }
        },
        this);
        this.elements.each(function(element, i) {
            element.setStyle(prop, max - (element[offset] - element.getStyle(hw).toInt()))
        });
        return max
    }
}));
window.addEvent('domready', 
function() {
    function hoverevent(hobjname, hobjclass) {
        hobjname.addEvents({
            'mouseenter': function() {
                if (hobjname == $('maxDropbox')) {
                    this.getElement('.maxContent').tween('max-height', 800)
                };
                this.addClass(hobjclass)
            },
            'mouseleave': function() {
                if (hobjname == $('maxDropbox')) {
                    this.getElement('.maxContent').tween('max-height', '0')
                };
                this.removeClass(hobjclass)
            }
        });
        if (hobjname == $('maxDropbox')) {
            var maxContentL = hobjname.getElement('.maxContentL'),
            maxContentR = hobjname.getElement('.maxContentR'),
            maxContento = $$('#maxDropbox .cat-shopmax-rela .lv1:odd'),
            maxContente = $$('#maxDropbox .cat-shopmax-rela .lv1:even');
            maxContento.each(function(item) {
                maxContentL.adopt(item)
            });
            maxContente.each(function(item) {
                maxContentR.adopt(item)
            })
        }
    };
    try {
        new hoverevent($$('.maxService'), 'maxsHover')
    } catch(e) {};
    try {
        new hoverevent($$('.goods-shopmax-multiple  .item'), 'enter')
    } catch(e) {};
    try {
        new hoverevent($$('.goods-item'), 'enter')
    } catch(e) {};
    try {
        new hoverevent($$('.maxwIn .brand-wrap dl'), 'enter')
    } catch(e) {};
    try {
        new hoverevent($('maxDropbox'), 'maxHover')
    } catch(e) {};
    try {
        new hoverevent($$('.maxMenu li'), 'enter')
    } catch(e) {};

    $$('.goods-shopmax-multiple').each(function(item) {
        new Tabs(item, {
            eventType: 'mouse',
            triggersBox: 'dt ul',
            panels: '.goods-shopmax-multiple-body'
        });
        var items = item.getElements('.item');
        new AutoSize(items, 'height');
    });
   
    var findend = function(needle, str) {
        var pos;
        if ((pos = (str + '').lastIndexOf(needle))) {
            return str.substr(pos + needle.length)
        }
    };
    var findext = function(src) {
        if (!src) return '';
        return findend('/', src).replace(/[,._]/g, '-')
    };
    var furl = function(url) {
        var pros = findext(url).split('-');
        if (pros.length > 1) return pros[1]
    };
    var local = u = location.href,
    n;
    if (u.indexOf('product') != -1) {
        u = (n = $$('.basic-ex-breadcrumbs a')) && n.length ? findext(n[n.length - 1].href) : u
    };
    var u = furl(u);
    var active = false;
    var getHandle = function(depth, sign) {
        depth = depth.getElement('dt');
        var span = new Element('span');
        if (!sign) {
            span.setHTML('&nbsp;').addClass('nosymbols').inject($(depth),'top');
            return depth
        };
        span.setHTML('+').addClass('symbols').inject($(depth),'top');
        return depth
    };
    try {
        var catbox = $$('.cat-shopmax-rela')[0],
        cats = $$('.cat-shopmax-rela li.lv1'),
        depthroots = $$('.cat-shopmax-rela li.lv1 dl');
        depthroots.each(function(root, index) {
            if (!root) return false;
            var depth2 = root.getElement('dd');
            if (depth2) {
                var handle = getHandle(root, true);
                handle.addEvent('click', 
                function(e) {
                    if (depth2.style.display != 'none') {
                        depth2.style.display = 'none';
                        this.getElement('span').setHTML('+');
                    } else {
                        depth2.style.display = 'block';
                        this.getElement('span').setHTML('-');
                    }
                })
            }
        });
        cats.each(function(cat, l) {
            var a = cat.getElements('a');
            if (u == furl(a[0].href)) {
                cat.store('active', cat.addClass('active'));
                a[0].getParent('li.lv1').getElement('dd').setStyle('display', 'block');
				a[0].getParent('li.lv1').getElement('dt').addClass('activedt');
                a[0].getParent('li.lv1').getElement('dt').getElement('span').setHTML('-')
            };
            for (var k = 1; k < a.length; k++) {
                var a1 = a[k];
                if (!active && (local == a1.href || u == furl(a1.href))) {
                    a1.addClass('now');
                    cat.store('active', cat.addClass('active'));
                    active = true;
                    a1.getParent('dl').getElement('.symbols').setHTML('-');
					a1.getParent('dl').getElement('dt').addClass('activedt');
                    a1.getParent('dl').getElement('dd').setStyle('display', 'block')
                }
            }
        })
    } catch(e) {};
    var ranks = $$('.maxProw-index .maxpRank,.goods-shopmax-rank');
    ranks.each(function(item) {
        if (item) {
            var rank = item.getElements('.item'),
            rankimg = rank.getElement('.p');
            rank.each(function(rankj, j) {
                if (j == 0) {
                    rankj.addClass('active');
                    rankj.getElement('.p').style.display = ""
                };
                rankj.addEvent('mouseenter', 
                function() {
                    rank.removeClass('active');
                    rankimg.setStyle('display', 'none');
                    this.addClass('active');
                    this.getElement('.p').style.display = ""
                })
            })
        }
    });
    try {
        var channelSAD = $$('.maxProw-channel .maxpAD').each(function(item) {
            new Switchable(item, {
                effect: 'scrollx',
                hasTriggers: true,
                triggers: 'dt span',
                panels: 'dd a',
                steps: 1,
                haslrbtn: false,
                lazyDataType: 'img',
                autoplay: true,
                eventType: 'mouse',
                pauseOnHover: true
            })
        })
    } catch(e) {};
    try {
        var channelHAD = $$('.maxChannel3 ul li').addEvents({
            'mouseenter': function() {
                this.getElement('span').tween('bottom', 0).show()
            },
            'mouseleave': function() {
                this.getElement('span').tween('bottom', -64).show()
            }
        })
    } catch(e) {};
	if ($('siderIMchat_hiddenbar_shopmax')){		
    $('siderIMchat_hiddenbar_shopmax').addEvents({
        'mouseenter': function() {
            $('siderIMchat_main_shopmax').setStyles({
                'display': 'block',
                'top': 0 + 'px'
            });
            var siderh1 = $('siderIMchat_main_shopmax').offsetHeight - 188;
            if (siderh1 > 0) $('siderIMchat_main_shopmax').setStyle('top', ( - siderh1) + 'px')
        },
        'mouseleave': function() {
            $('siderIMchat_main_shopmax').setStyle('display', 'none')
        }
    })
	};
	if ($('sideGotop')){
    $('sideGotop').addEvent('click', 
    function() {
        window.scrollTo(0, 0)
    })};
    function siderIMchatWidgetsetGoTop() {
        if (Browser.ie6) {
            window.addEvent('scroll', 
            function() {
                $('siderIMchat_shopmax').setStyle('top', (window.getSize().y + window.getScrollTop() - 200) + 'px').set('Opacity', '.9')
            })
        } else {
            $('siderIMchat_shopmax').setStyles({
                'position': 'fixed',
                'bottom': '50px'
            }).set('Opacity', '.9')
        }
    };
	if ($('siderIMchat_shopmax'))
	{ siderIMchatWidgetsetGoTop();
	};
   
    try {
        var maxcopya = $$('.fbody a[href=http://www.shopex.cn]')[0].getParent('div');
        $$('.maxCopyright')[0].adopt(maxcopya)
    } catch(e) {};
});
function AddFavorite(sURL, sTitle) {
    try {
        window.external.addFavorite(sURL, sTitle)
    } catch(e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "")
        } catch(e) {
            alert("您的浏览器不支持此操作，请使用Ctrl+D进行添加")
        }
    }
};
function SetHome(obj, vrl) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(vrl)
    } catch(e) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect")
            } catch(e) {
                alert("您的浏览器不支持此操作！\n请在浏览器地址栏输入about:config并回车\n然后将[signed.applets.codebase_principal_support]设置为'true'")
            }
            var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
            prefs.setCharPref('browser.startup.homepage', vrl)
        }
    }
};