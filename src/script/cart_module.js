// define(['jcookie'], () => {
//     return {
//         init: function() {
//             //1.获取cookie
//             function getcookietoarray() {
//                 if ($.cookie('cookiesid') && $.cookie('cookienum')) {
//                     let $arrsid = $.cookie('cookiesid').split(','); //[1,3,5]
//                     let $arrnum = $.cookie('cookienum').split(','); //[10,33,50]
//                     $.each($arrsid, function(index, value) {
//                         rendergoods($arrsid[index], $arrnum[index]); //index:数组的索引
//                     });
//                 }
//             }
//             getcookietoarray();
//             //2.渲染商品列表
//             function rendergoods(sid, num) { //sid:商品的编号    num:商品的数量
//                 //获取所有的接口数据
//                 $.ajax({
//                     url: 'http://10.31.161.129/dashboard/you163/php/alldata.php',
//                     dataType: 'json'
//                 }).done(function(pagedata) {
//                     $.each(pagedata, function(index, value) {
//                         if (sid === value.sid) { //通过sid的对比找到对应的数据。
//                             //:hidden:匹配所有不可见元素，或者type为hidden的元素
//                             //clone([Even[,deepEven]]) 克隆匹配的DOM元素并且选中这些克隆的副本。
//                             let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆
//                             $clonebox.find('.goods-pic img').attr('src', value.url);
//                             $clonebox.find('.goods-d-info a').html(value.title);
//                             $clonebox.find('.b-price strong').html(value.price);
//                             $clonebox.find('.quantity-form input').val(num);
//                             $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
//                             $clonebox.css('display', 'block'); //显示
//                             $('.item-list').append($clonebox); //追加
//                         }
//                     });

//                 });
//             }

//             //3.计算总价--使用次数很多--函数封装
//             function calcprice() {
//                 let $sum = 0; //商品的件数
//                 let $count = 0; //商品的总价
//                 $('.goods-item:visible').each(function(index, ele) {
//                     if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框勾选
//                         $sum += parseInt($(ele).find('.quantity-form input').val());
//                         $count += parseFloat($(ele).find('.b-sum strong').html());
//                     }
//                 });
//                 $('.amount-sum').find('em').html($sum);
//                 $('.totalprice').html($count.toFixed(2));
//             }

//             calcprice();
//             //4.全选
//             $('.allsel').on('change', function() {
//                 $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked'));
//                 $('.allsel').prop('checked', $(this).prop('checked'));
//                 calcprice(); //计算总价
//             });
//             let $inputs = $('.goods-item:visible').find(':checkbox');
//             $('.item-list').on('change', $inputs, function() {
//                 //$(this):被委托的元素，checkbox
//                 if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
//                     $('.allsel').prop('checked', true);
//                 } else {
//                     $('.allsel').prop('checked', false);
//                 }
//                 calcprice(); //计算总价
//             });

//             //5.数量的改变
//             $('.quantity-add').on('click', function() {
//                 let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
//                 $num++;
//                 $(this).parents('.goods-item').find('.quantity-form input').val($num);

//                 $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
//                 calcprice(); //计算总价
//                 setcookie($(this));
//             });


//             $('.quantity-down').on('click', function() {
//                 let $num = $(this).parents('.goods-item').find('.quantity-form input').val();
//                 $num--;
//                 if ($num < 1) {
//                     $num = 1;
//                 }
//                 $(this).parents('.goods-item').find('.quantity-form input').val($num);
//                 $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
//                 calcprice(); //计算总价
//                 setcookie($(this));
//             });


//             $('.quantity-form input').on('input', function() {
//                 let $reg = /^\d+$/g; //只能输入数字
//                 let $value = $(this).val();
//                 if (!$reg.test($value)) { //不是数字
//                     $(this).val(1);
//                 }
//                 $(this).parents('.goods-item').find('.b-sum strong').html(calcsingleprice($(this)));
//                 calcprice(); //计算总价
//                 setcookie($(this));
//             });

//             //计算单价
//             function calcsingleprice(obj) { //obj元素对象
//                 let $dj = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
//                 let $num = parseInt(obj.parents('.goods-item').find('.quantity-form input').val());
//                 return ($dj * $num).toFixed(2)
//             }


//             //将改变后的数量存放到cookie中
//             let arrsid = []; //存储商品的编号。
//             let arrnum = []; //存储商品的数量。
//             function cookietoarray() {
//                 if ($.cookie('cookiesid') && $.cookie('cookienum')) {
//                     arrsid = $.cookie('cookiesid').split(','); //获取cookie 同时转换成数组。[1,2,3,4]
//                     arrnum = $.cookie('cookienum').split(','); //获取cookie 同时转换成数组。[12,13,14,15]
//                 } else {
//                     arrsid = [];
//                     arrnum = [];
//                 }
//             }

//             function setcookie(obj) {
//                 cookietoarray();
//                 let $sid = obj.parents('.goods-item').find('img').attr('sid');
//                 arrnum[$.inArray($sid, arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val();
//                 $.cookie('cookienum', arrnum, { expires: 10, path: '/' });
//             }


//             //6.删除
//             function delcookie(sid, arrsid) { //sid:当前删除的sid  arrsid:存放sid的数组[3,5,6,7]
//                 let $index = -1; //删除的索引位置
//                 $.each(arrsid, function(index, value) {
//                     if (sid === value) {
//                         $index = index;
//                     }
//                 });
//                 arrsid.splice($index, 1);
//                 arrnum.splice($index, 1);

//                 $.cookie('cookiesid', arrsid, { expires: -1, path: '/' });
//                 $.cookie('cookienum', arrnum, { expires: -1, path: '/' });
//             }
//             $('.b-action a').on('click', function() {
//                 cookietoarray();
//                 if (window.confirm('你确定要删除吗?')) {
//                     $(this).parents('.goods-item').remove();
//                     delcookie($(this).parents('.goods-item').find('img').attr('sid'), arrsid);
//                     calcprice(); //计算总价
//                 }
//             });

//             $('.operation a').on('click', function() {
//                 cookietoarray();
//                 if (window.confirm('你确定要全部删除吗?')) {
//                     $('.goods-item:visible').each(function() {
//                         if ($(this).find(':checkbox').is(':checked')) { //判断复选框是否选中
//                             $(this).remove();
//                             delcookie($(this).find('img').attr('sid'), arrsid);
//                         }
//                     });
//                     calcprice(); //计算总价
//                 }
//             });

//             if ($('.allsel:checked')) {
//                 calcprice();
//             }
//         }
//     }
// });

define(['jcookie'], () => {
    return {
        init: function() {
            // 1.获取cookie - 主要是来自于详情页。
            function getcookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    let $arrsid = $.cookie('cookiesid').split(','); //[1,2] 
                    let $arrnum = $.cookie('cookienum').split(','); //[10,20] 
                    $.each($arrsid, function(index, value) {
                        rendergoods($arrsid[index], $arrnum[index]); //index:数组的索引
                    });
                }
            }
            getcookietoarray();

            // 2.渲染购物车列表(隐藏一块布局，对隐藏的进行克隆，传值)
            function rendergoods(sid, num) { //sid:商品的编号    num:商品的数量
                $.ajax({
                    url: 'http://10.31.161.129/dashboard/you163/php/alldata.php',
                    dataType: 'json'
                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (sid === value.sid) { //确定当前的数据。克隆隐藏的盒子，进行赋值
                            let $clonebox = $('.goods-item:hidden').clone(true, true); //克隆
                            $clonebox.find('.goods-pic img').attr('src', value.url);
                            $clonebox.find('.goods-pic img').attr('sid', value.sid);
                            $clonebox.find('.goods-d-info a').html(value.title);
                            $clonebox.find('.b-price strong').html(value.price);
                            $clonebox.find('.quantity-form input').val(num);
                            $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2)); //计算小计
                            $clonebox.css('display', 'block');
                            $('.item-list').append($clonebox);
                            calcprice(); //计算总价
                        }
                    });
                });
            }

            // 3.计算总价和总的商品件数 - 单独计算，不同的地方进行调用。
            // 核心：可视的visible  选中的
            // each():jquery遍历元素对象   $.each():遍历数组和对象的
            function calcprice() {
                let $sum = 0; //商品的件数
                let $count = 0; //商品的总价
                $('.goods-item:visible').each(function(index, ele) {
                    if ($(ele).find('.cart-checkbox input').prop('checked')) { //复选框是否勾选
                        $sum += parseInt($(ele).find('.quantity-form input').val());
                        $count += parseFloat($(ele).find('.b-sum strong').html());
                    }
                });
                //赋值
                $('.amount-sum').find('em').html($sum);
                $('.totalprice').html($count.toFixed(2));
            }

            // 4.全选 - 事件委托。

            $('.allsel').on('click', function() {
                $('.goods-item:visible').find(':checkbox').prop('checked', $(this).prop('checked')); //将全选的值给下面的几个input
                $('.allsel').prop('checked', $(this).prop('checked')); //将自己的值赋值给自己。2个allsel复选框
                calcprice(); //计算总价
            });

            //获取克隆的商品列表里面的checkbox,添加事件
            //克隆的商品列表里面：选中的复选框的长度等于存在的复选框的长度
            // let $inputs = $('.goods-item:visible').find(':checkbox'); //查找复选框
            $('.cart-checkbox input').on('click', function() {
                //$(this):被委托的元素，checkbox
                if ($('.goods-item:visible').find(':checkbox').length === $('.goods-item:visible').find('input:checked').size()) {
                    $('.allsel').prop('checked', true);
                } else {
                    $('.allsel').prop('checked', false);
                }
                calcprice(); //计算总价
            });

            // 5.改变数量 - 增加减少数量 - cookie有关
            $('.quantity-add').on('click', function() {
                //parents():获取当前元素的所有的父级(祖先元素)
                //parent():获取当前元素的父级
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val(); //取值
                $num++; //累加
                if ($num > 99) { //防止数据过大，Bigint：js新增的数据类型，大整型。
                    $num = 99;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num); //赋值
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); //计算单个商品的总价，进行赋值
                calcprice(); //计算总价
                addcookie($(this)); //数量发生改变，重新存储cookie
            });


            $('.quantity-down').on('click', function() {
                let $num = $(this).parents('.goods-item').find('.quantity-form input').val(); //取值
                $num--; //累加
                if ($num <= 0) {
                    $num = 1;
                }
                $(this).parents('.goods-item').find('.quantity-form input').val($num); //赋值
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); //计算单个商品的总价，进行赋值
                calcprice(); //计算总价
                addcookie($(this)); //数量发生改变，重新存储cookie
            });

            $('.quantity-form input').on('input', function() {
                let $reg = /^\d+$/;
                let $value = $(this).val(); //当前的值
                if (!$reg.test($value)) { //不是数字
                    $(this).val(1);
                }
                if ($value > 99) {
                    $(this).val(99);
                }

                if ($value <= 0) {
                    $(this).val(1);
                }
                $(this).parents('.goods-item').find('.b-sum strong').html(singlegoodsprice($(this))); //计算单个商品的总价，进行赋值
                calcprice(); //计算总价
                addcookie($(this)); //数量发生改变，重新存储cookie
            });

            //封装函数实现计算单个商品的总价
            function singlegoodsprice(obj) { //当前调用函数的元素对象，那条列表进行计算
                let $singleprice = parseFloat(obj.parents('.goods-item').find('.b-price strong').html());
                let $num = parseFloat(obj.parents('.goods-item').find('.quantity-form input').val());
                return ($singleprice * $num).toFixed(2); //保留2位小数。
            }

            //将改变后的值存放cookie中 - 获取商品的sid,通过sid找到商品的数量。
            let $arrsid = [];
            let $arrnum = [];

            function cookietoarray() { //cookie转换成数组
                if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                    $arrsid = $.cookie('cookiesid').split(','); //[4,5,6] 
                    $arrnum = $.cookie('cookienum').split(','); //[10,50,60] 
                }
            }

            function addcookie(obj) {
                cookietoarray() //cookie转换成数组
                let $sid = obj.parents('.goods-item').find('img').attr('sid'); //获取sid
                $arrnum[$.inArray($sid, $arrsid)] = obj.parents('.goods-item').find('.quantity-form input').val(); //赋值
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });

            }


            //6.删除 - 结构+cookie
            //删除当个商品
            $('.b-action a').on('click', function() {
                cookietoarray(); //cookie转换成数组
                if (window.confirm('你确定要删除吗?')) {
                    $(this).parents('.goods-item').remove();
                    calcprice(); //计算总价
                    delcookie($(this).parents('.goods-item').find('img').attr('sid'), $arrsid);
                    //传入当前的sid 和 cookiesid的值
                    if ($arrsid.length === 0) {
                        alert(1);
                        $.cookie('cookiesid', $arrsid, { expires: -1, path: '/' });
                        $.cookie('cookienum', $arrnum, { expires: -1, path: '/' });
                    }
                }
            });
            //删除选中商品
            $('.operation a').on('click', function() {
                cookietoarray(); //cookie转换成数组
                if (window.confirm('你确定要删除吗?')) {
                    $('.goods-item:visible').each(function() {
                        console.log($(this)); //表示当前遍历的goods-item
                        if ($(this).find(':checkbox').is(':checked')) { //当前的复选框是否选中
                            $(this).remove();
                            delcookie($(this).find('img').attr('sid'), $arrsid)
                        }
                    });
                    calcprice(); //计算总价
                }
            });

            //删除商品对应的sid和num
            //例如：delcookie(5,[4,5,6]);
            function delcookie(sid, $arrsid) { //sid:删除商品的sid   arrsid:数组，cookie里面的值
                let $sidindex = -1; //假设接收索引的值
                $.each($arrsid, function(index, value) {
                    if (sid === value) {
                        $sidindex = index; //接收删除项的索引值
                    }
                });

                //删除
                $arrsid.splice($sidindex, 1);
                $arrnum.splice($sidindex, 1);

                //重新设置cookie
                $.cookie('cookiesid', $arrsid, { expires: 10, path: '/' });
                $.cookie('cookienum', $arrnum, { expires: 10, path: '/' });
            }

        }
    }
});