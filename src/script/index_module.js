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
        }
    }
});