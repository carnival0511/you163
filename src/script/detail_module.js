define(['jcookie'], () => {
    return {
        init: function() {
            //1.通过地址栏获取列表页面传入的sid。
            let $sid = location.search.substring(1).split('=')[1];
            if (!$sid) {
                $sid = 1;
            }
            //2.将sid传给后端，后端根据对应的sid返回不同的数据。
            $.ajax({
                url: 'http://10.31.161.129/dashboard/you163/php/detail.php',
                data: {
                    sid: $sid
                },
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                // console.log(data.urls);
                //获取数据，将数据放入对应的结构中。
                $('#smallpic').attr('src', data.url);
                $('.loadtitle').html(data.title);
                $('.loadpcp').html(data.price);

                //渲染放大镜下面的小图
                let $picurl = data.urls.split(','); //将数据转换成数组。
                let $strhtml = '';
                const $list = $('#list ul');
                console.log($picurl);
                $.each($picurl, function(index, value) {
                    $strhtml += `
                        <li>
                            <img src="${value}"/>
                        </li>
                    `;
                });
                $list.html($strhtml);
            });



            //五.购物车：(商品sid、商品数量)
            //1.设置存储cookie的变量。
            let arrsid = []; //存储商品的sid
            let arrnum = []; //存储商品的数量
            //2.判断是第一次存储，多次存储。
            //获取cookie才能判断，每存储一个商品对应的cookie就会发生变化。
            //提前预判cookie设置时的key值(cookiesid/cookienum)
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                }
            }
            //上面的函数获取cookie值，并且转换成数组，方便判断是否是第一次。
            //第一次存储添加sid进入arrsid，存储数量
            //第二次以上，直接修改数量。
            $('.p-btn a').on('click', function() {
                getcookietoarray(); //获取cookie，变成数组，判断是否存在。
                if ($.inArray($sid, arrsid) === -1) { //不存在
                    arrsid.push($sid);
                    $.cookie('cookiesid', arrsid, { expires: 10, path: '/' });
                    arrnum.push($('#count').val());
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                } else { //存着
                    //通过$sid获取商品的数量所在的位置。
                    let $index = $.inArray($sid, arrsid);
                    // arrnum[$index]//原来的数组
                    // $('#count').val()//新添加的数量
                    arrnum[$index] = parseInt(arrnum[$index]) + parseInt($('#count').val()); //重新赋值
                    $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
                }
                alert('按钮被点击了');
            });

            // 放大镜效果
            let $ul = $('#list ul'); // 小图片的父元素ul
            const $bpic = $('#bpic'); // 大图片
            const $spic = $('#spic'); // 小图的框
            const $smallpic = $('#smallpic') // 小图
            const $bf = $('#bf'); // 大的放大镜
            const $sf = $('#sf'); // 小的放大镜
            // 首先获取小图的src属性
            // let $attr = $smallpic.attr('src');

            // $bpic.attr('src', $ul.find('li').find('img').eq(0).attr('src'));
            // console.log($spic.find('img').attr('src'));
            // $bpic.attr('src', $attr);
            // 使用事件委托抓取移入的li的索引
            $ul.on('mouseover', 'li', function() {
                let $index = $(this).index(); // 存取这个li的索引
                let $src = $ul.find('li').find('img').eq($index).attr('src'); // 找到索引对应的图片的src进行存取
                $smallpic.attr('src', $src);
                $bpic.attr('src', $spic.find('img').attr('src'));
            });
            // 1. 移入spic， 将右边的放大镜显现出来
            $spic.hover(function() {
                $bpic.attr('src', $spic.find('img').attr('src'));
                // 2.获取鼠标在图片中的位置(鼠标的坐标减去spic的offset().top)
                $(this).on('mousemove', function(event) {
                    // 小的放大镜显现
                    $sf.css('visibility', 'visible');
                    // 大的放大镜显现
                    $bf.css('visibility', 'visible');
                    // 小放尺寸
                    // $sf.width() = $bf.width() * $smallpic.width() / $bpic.width();
                    // $sf.height() = $bf.height() * $smallpic.height() / $bpic.height();
                    // console.log($sf.width() + '小放尺寸' + $sf.width());
                    // 缩放比例
                    let $ratio = ($bpic.width() - $bf.width()) / ($smallpic.width() - $sf.width());
                    // console.log($ratio);
                    let $top = event.pageY - $(this).offset().top - $sf.height() / 2;
                    let $left = event.pageX - $(this).offset().left - $sf.width() / 2;
                    // console.log($top);
                    if ($left <= 0) {
                        $left = 0;
                    } else if ($left >= $smallpic.width() - $sf.width()) {
                        $left = $smallpic.width() - $sf.width();
                    }
                    if ($top <= 0) {
                        $top = 0;
                    } else if ($top >= $smallpic.height() - $sf.height()) {
                        $top = $smallpic.height() - $sf.height();
                    }
                    // console.log($top);
                    $sf.css({
                        'top': $top,
                        'left': $left
                    });
                    $bpic.css({
                        'top': (-$top * $ratio),
                        'left': (-$left * $ratio)
                    });
                    console.log($bpic.offset().top);
                });
            }, function() {
                // 小的放大镜隐藏
                $sf.css('visibility', 'hidden');
                // 大的放大镜隐藏
                $bf.css('visibility', 'hidden');
            });
        }
    }
});