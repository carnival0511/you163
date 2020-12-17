! function($) {
    // 获取表单
    const $oForm = $('#registry');
    // 获取username框
    const $username = $('#username');
    // 获取password框
    const $password = $('#password');
    // 获取email框
    const $email = $('#email');
    // 获取span标签，单数用做输入时的判断，双数用做判断条件
    const $span = $('form span');

    // 赋值userflag,passflag,emailflag
    var $userflag = true;
    var $passflag = true;
    var $emailflag = true;

    // 在输入的时候对username的格式进行判断
    $username.on('focus', function() {
        $span.eq(1).css('color', '#333').html('中英文，最长长度为16');
    });

    // 当username框失去焦点时，将值和数据库中的数据进行比较
    $username.on('blur', function() {
        $.ajax({
            type: 'post',
            url: 'http://10.31.161.129/dashboard/you163/php/reg.php',
            data: {
                xingming: $username.val()
            }
        }).done(function(data) { //data就是后端返回的结果
            // 在数据库中不存在的话,使用表单验证进一步判断
            if (!data) {
                // var $str = $username.val().replace(/[\u4e00-\u9fa5]/g, '**').length; // username输入框内容的长度
                var $val = $username.val(); // username输入框内容
                var $str = $val.replace(/[\u4e00-\u9fa5]/g, '**').length; // username输入框内容的长度
                // console.log($str);
                if ($val !== '') { // 数据不为空
                    if ($str >= 3 && $str <= 16) {
                        var $reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/; // jquery中的username判断正则表达式
                        if ($reg.test($val)) { // 使用test方法判断
                            // 判断正确，将第一个span内容变成√，将第二个span(也就是提示文本)置空
                            $span.eq(0).css('color', '#0f0').html('√');
                            $span.eq(1).css('color', '#0f0').html('');
                            $userflag = true;
                        } else {
                            $span.eq(0).css('color', '#f00').html('提示：用户名格式有误!'); // 输入其他不满足正则表达式的内容提示用户名格式有误
                            $userflag = false;
                        }
                    } else {
                        $span.eq(0).css('color', '#f00').html('提示：用户名长度有误!'); // 输入长度不满足条件提示长度有误
                        $userflag = false;
                    }
                } else {
                    $span.eq(0).css('color', '#f00').html('提示：用户名不能为空!'); //什么都不输入直接提示用户名不能为空
                    $userflag = false;
                }
            } else {
                // 存在的话输出提示文本
                $span.eq(0).css('color', 'red').html('提示：该用户名已存在！');
                $userflag = false;
            }
        });
    });

    // 对password进行判断
    $password.on('focus', function() {
        $span.eq(3).css('color', '#333').html('请输入密码,长度为6-18个字符!');
    });

    // 正在输入的时候的判断
    $password.on('input', function() {
        var $passstr = $password.val().length; // password输入框内容的长度
        var $passval = $password.val(); // password输入框内容
        if ($passstr >= 6 && $passstr <= 18) {
            let $regnum = /\d+/;
            let $reguppercase = /[A-Z]+/;
            let $reglowercase = /[a-z]+/;
            let $other = /[\W_]+/; //特殊字符%&^
            let $count = 0; //字符种类的统计结果
            if ($regnum.test($passval)) {
                $count++;
            }
            if ($reguppercase.test($passval)) {
                $count++;
            }
            if ($reglowercase.test($passval)) {
                $count++;
            }
            if ($other.test($passval)) {
                $count++;
            }

            //根据统计的种类输出弱中强
            switch ($count) {
                case 1:
                    $span.eq(2).css('color', 'red').html('弱');
                    $passflag = false;
                    break;
                case 2:
                case 3:
                    $span.eq(2).css('color', 'orange').html('中');
                    $passflag = true;
                    break;
                case 4:
                    $span.eq(2).css('color', 'green').html('强');
                    $passflag = true;
                    break;
            }
        } else {
            $span.eq(2).css('color', 'red').html('提示：密码长度有误');
            $passflag = false;
        }
    });

    // 失去焦点的判断
    $password.on('blur', function() {
        // 输入框里面的值不为空时
        if ($(this).val() !== '') {
            // $passflag为真
            if ($passflag) {
                $span.eq(2).css('color', '#0f0').html('√');
                $span.eq(3).css('color', '#0f0').html('');
            }
        } else {
            // 输入框里面的内容为空
            $span.eq(2).css('color', '#f00').html('用户密码不能为空!');
            $passflag = false;
        }
    });

    // 电子邮箱判断
    $email.on('focus', function() {
        $span.eq(5).css('color', '#333').html('提示：请输入正确的邮箱地址');
    });

    // 当email框失去焦点时，对电子邮箱的格式进行判断
    $email.on('blur', function() {
        var $emailval = $email.val();
        if ($emailval !== '') { // 数据不为空
            var $emailreg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/; // jquery中的email判断正则表达式
            if ($emailreg.test($emailval)) { // 使用test方法判断
                $span.eq(4).css('color', '#0f0').html('√');
                $span.eq(5).css('color', '#0f0').html('');
                $emailflag = true;
            }
        } else {
            $span.eq(4).css('color', '#f00').html('提示：邮箱不能为空!');
            $emailflag = false;
        }
    });

    // 阻止表单跳转
    $oForm.on('submit', function() {
        if ($username.val() === '') {
            $span.eq(0).css('color', '#f00').html('提示：用户名不能为空!');
            $userflag = false;
        }
        if ($password.val() === '') {
            $span.eq(2).css('color', '#f00').html('提示：密码不能为空!');
            $passflag = false;
        }
        if ($email.val() === '') {
            $span.eq(4).css('color', '#f00').html('提示：邮箱不能为空!');
            $emailflag = false;
        }
        if (!$userflag || !$passflag) {
            return false;
        }
    });

}(jQuery);