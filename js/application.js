var updateTotal = function () {
  var total = 0;
  $('tbody tr').each(function (i, ele) {
    var qty = $(ele).find('.quantity').val();
    var price = parseFloat($(ele).children('.price').text());
    var itemTotal = Math.round(qty * price * 100) / 100;
    total += itemTotal;
    $(ele).find('.item-total').html(itemTotal.toFixed(2));
  });
  $('#total').html('Total: $' + total.toFixed(2));
}

$(document).ready(function () {
  updateTotal();
  $('tbody tr').each(function (i, ele) {
    var price = parseFloat($(ele).children('.price').text());
    $(document).on('keyup', '.quantity', function (event) {
      event.preventDefault();
      var qty = $(ele).find('.quantity').val();
      var itemTotal = qty * price;
      $(ele).find('.item-total').html(itemTotal);
      updateTotal();
    });
    $(document).on('click', '.btn-cancel', function (event) {
      event.preventDefault();
      $(this).closest('tr').remove();
      updateTotal();
    });
  });
  $('#add').on('submit', function (event) {
    event.preventDefault();
    var itemName = $(this).children('#item-name').val();
    var itemPrice = $(this).children('#item-price').val();
    var itemQty = $(this).children('#item-qty').val();
    var itemTotal = itemQty * itemPrice;
    $('tbody').append('<tr>' + 
      '<td class="name">' + itemName + '</td>' +
      '<td class="price">' + itemPrice + '</td>' +
      '<td>' +
        '<label>QTY' +
          '<input class="quantity" name="quantity" type="text" placeholder="0" value="' + itemQty + '"></td>' +
        '</label>' +
      '</td>' +
      '<td><button class="btn btn-primary btn-cancel" name="cancel" type="submit">Cancel</button></td>' +
      '<td class="item-total">' + itemTotal + '</td>' +
    '</tr>');
    updateTotal();
    $(this).children('#item-name').val('');
    $(this).children('#item-price').val('');
  });
});
