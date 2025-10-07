function addToCartWithOption(product_id, quantity, option_id, option_value) {
    var data = {
        product_id: product_id,
        quantity: quantity
    };
    
    // Добавляем опцию
    data['option[' + option_id + ']'] = option_value;
    
    $.ajax({
        url: 'index.php?route=checkout/cart/add',
        type: 'post',
        data: data,
        dataType: 'json',
        beforeSend: function() {
            $('#button-cart').button('loading');
        },
        complete: function() {
            $('#button-cart').button('reset');
        },
        success: function(json) {
            $('.alert-dismissible').remove();
            
            if (json['redirect']) {
                location = json['redirect'];
            }
            
            if (json['success']) {
                $('.breadcrumb').after('<div class="alert alert-success alert-dismissible">' + json['success'] + '<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                
                // Обновляем корзину
                $('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
                
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                $('#cart > ul').load('index.php?route=common/cart/info ul li');
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
        }
    });
}
