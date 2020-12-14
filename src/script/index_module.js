// define([], () => {
//     return {
//         init: function() {
//             //代码实现
//             //1.鼠标移入左侧的li元素，显示右侧的大盒子。
//             const $list = $('.menu li');
//             const $cartlist = $('.cartlist');
//             const $items = $('.item');
//             $list.hover(function() {
//                 $cartlist.show();
//                 $(this).addClass('active').siblings('li').removeClass('active');
//                 //切换内容发生改变，不同的li对应不同的内容块。
//                 $items.eq($(this).index()).show().siblings('.item').hide();

//                 //改变右侧的大盒子的位置
//                 let $scrolltop = $(window).scrollTop();
//                 let $bannertop = $('.banner').offset().top;
//                 if ($scrolltop > $bannertop) {
//                     $cartlist.css({
//                         top: $scrolltop - $bannertop
//                     });
//                 } else {
//                     $cartlist.css({
//                         top: 0
//                     });
//                 }
//             }, function() {
//                 $cartlist.hide();
//             });

//             //2.鼠标移入右侧的大盒子，大盒子依然显示隐藏
//             $cartlist.hover(function() {
//                 $(this).show();
//             }, function() {
//                 $(this).hide();
//             });


//             //检测是否用户已经登录
//             if (localStorage.getItem('loginname')) {
//                 $('.admin').show();
//                 $('.login').hide();
//                 $('.admin span').html(localStorage.getItem('loginname'));
//             }

//             //退出登录 - 删除本地存储
//             $('.admin a').on('click', function() {
//                 $('.admin').hide();
//                 $('.login').show();
//                 localStorage.removeItem('loginname');
//             });

//         }
//     }
// });

define(['jlazyload'], () => {
    return {
        init: function() {
            //渲染+懒加载
            const $list = $('.sectionBot');
            $.ajax({
                url: 'http://localhost/dashboard/you163/php/index.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <div class="product1">
                            <a href="#">
                                <!-- 商品图片 -->
                                <div class="productpic">
                                    <img src="${value.urlago}" class="img-lazyload img1">
                                    <img src="${value.urlnow}" class="img-lazyload img2">
                                    <div class="protitle">
                                        <span>年终底价</span>
                                        <span class="nowprice">¥16.9</span>
                                    </div>
                                    <div class="procontent">
                                        <span>仅剩13小时</span>
                                    </div>
                                </div>
                                <!-- 商品详情 -->
                                <div class="bd">
                                    <div class="prdtag">
                                        <span>年终底价</span>
                                        <span>每满200减25券</span>
                                    </div>
                                    <h4><a href="#"><span>${value.title}</span></a></h4>
                                    <p class="price">
                                        <span>¥${value.priceago}</span>
                                        <span class="counterprice">¥${value.pricenow}</span>
                                    </p>
                                </div>
                            </a>
                        </div>
                    `;
                });
                $list.html($strhtml);
                //渲染的下面进行懒加载操作
                $(function() { //页面加载完成
                    $("img.lazy").lazyload({
                        effect: "fadeIn" //显示方法：谈入
                    });
                });
            });


            // 轮播图效果
            var $banner = $('.banner1'); // 最大的容器
            var $picList = $('.banner1 ul li') // 图片
            var $btnList = $('.banner1 ol li') // 小点
            var $left = $('.leftbtn1'); // 左箭头
            var $right = $('.rightbtn1'); // 右箭头
            var $num = 0;
            var $timer = null;

            function lunbo() {
                $picList.css({
                    "display": "none"
                });
                // $(this).index():当前移入小点的索引
                // 将移入小点的对应的图片显示出来,并且将对应的小点的样式改掉
                $btnList.eq($num).addClass('active').siblings().removeClass('active');
                $picList.eq($num).css({
                    "display": "block"
                });
            }

            // 移入对应的小点，显示对应的图片
            $btnList.on('mouseover', function() {
                console.log($(this).index());
                // 在找之前将所有的图片隐藏
                // $picList.css({
                //     "display": "none"
                // });
                // // $(this).index():当前移入小点的索引
                // // 将移入小点的对应的图片显示出来,并且将对应的小点的样式改掉
                // $btnList.eq($(this).index()).addClass('active').siblings().removeClass('active');
                // $picList.eq($(this).index()).css({
                //     "display": "block"
                // });


                // 将当前索引给$num
                $num = $(this).index();
                lunbo();
            });

            // 将向右轮播封装
            function rightfun() {
                $num++;
                if ($num > $btnList.length - 1) {
                    $num = 0;
                }
                lunbo();
            }

            // 点击右箭头，图片向右轮播
            $right.on('click', function() {
                // $num++;
                // if ($num > $btnList.length - 1) {
                //     $num = 0;
                // }
                // $picList.css({
                //     "display": "none"
                // });
                // $btnList.eq($num).addClass('active').siblings().removeClass('active');
                // $picList.eq($num).css({
                //     "display": "block"
                // });
                // lunbo();
                rightfun();
            });

            // 点击左箭头，图片向左轮播
            $left.on('click', function() {
                $num--;
                if ($num < 0) {
                    $num = $btnList.length - 1;
                }
                // $picList.css({
                //     "display": "none"
                // });
                // $btnList.eq($num).addClass('active').siblings().removeClass('active');
                // $picList.eq($num).css({
                //     "display": "block"
                // });
                lunbo();
            });

            // 定时器
            $timer = setInterval(function() {
                rightfun();
            }, 1000);

            // 移入最大的盒子，停止定时器
            $banner.on('mouseover', function() {
                clearInterval($timer);
            })

            // 移出盒子，开启定时器
            $banner.on('mouseout', function() {
                $timer = setInterval(function() {
                    rightfun();
                }, 1000);
            })


            // 最外面左侧的导航栏
            const $leftnav = $('.leftnav');
            $(window).on('scroll', () => {
                let $scrolltop = $(window).scrollTop();
                if ($scrolltop >= 592) {
                    $leftnav.css({
                        "position": "fixed",
                        "top": "62px",
                        "left": "50%",
                        "margin-left": "-680px"
                    });
                } else {
                    $leftnav.css({
                        "position": "absolute",
                        "top": 0,
                        "left": "-136px",
                        "margin-left": 0
                    });
                }
            });

        }
    }
});