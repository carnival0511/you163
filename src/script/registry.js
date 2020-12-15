! function($) {
    const $username = $('#username');
    const $hint = $('.hint');

    $username.on('blur', function() {
        $.ajax({
            type: 'post',
            url: 'http://10.31.161.129/dashboard/you163/php/reg.php',
            data: {
                xingming: $username.val()
            }
        }).done(function(data) { //data就是后端返回的结果
            if (!data) { //不存在
                $hint.css('color', 'green').html('√');
            } else { //存在
                $hint.css('color', 'red').html('该用户名已存在');
            }
        });
    });

}(jQuery);