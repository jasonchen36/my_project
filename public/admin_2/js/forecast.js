$(document).ready(function() {

	var formatMoneyString = function(number) {
		return "$"+number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var moneyStringToNumber = function(money) {
		return money.replace(/\$|,/g, '');
	};

var total_ask2 = 0;
var total_take2 = 0;
var total_actual2 = 0;

$('.ask2').each(function(){
  total_ask2 += parseFloat($(this).text().substr(1));  // Or this.innerHTML, this.innerText
});
total_ask2 = total_ask2 * 1000
$('.take2').each(function(){
  total_take2 += parseFloat($(this).text().substr(1));  // Or this.innerHTML, this.innerText
});
total_take2 = total_take2 * 1000
$('.actual2').each(function(){
  if (isNaN(parseInt($(this).text().substr(1)))){
    total_actual2 = total_actual2;
  } else {
    total_actual2 += parseFloat($(this).text().substr(1));  // Or this.innerHTML, this.innerText
  };
});
total_actual2 = total_actual2 * 1000
$('#total2').append('<th>Total:</th>'+
'<th>'+formatMoneyString(total_ask2)+'</th>'+
'<th>'+formatMoneyString(total_take2)+'</th>'+
'<th>'+formatMoneyString(total_actual2)+'</th>'+
'<th></th>');

(function() {
  var row;
$("#foreign-sales-summary-table2").on('click', '.edit-btn', function() {
  $('#foreign-sales-add-country2').attr('disabled','disabled');
  row = this.parentNode.parentNode;
  $("#foreign-sales-add-country2").val(row.children[0].textContent);
  $("#foreign-sales-add-ask2").val(row.children[1].textContent.replace(/\$|,/g, ''));
  $("#foreign-sales-add-take2").val(row.children[2].textContent.replace(/\$|,/g, ''));
  $("#foreign-sales-add-actual2").val(row.children[3].textContent.replace(/\$|,/g, ''));
});

$("#foreign-sales-add-save2").click(function(){
  $('#foreign-sales-add-country2').removeAttr('disabled');
  var country = $("#foreign-sales-add-country2").val();
  var ask = $("#foreign-sales-add-ask2").val();
  var take = $("#foreign-sales-add-take2").val();
  var actual = $("#foreign-sales-add-actual2").val();
  if (total_ask = ask){
    total_ask = total_ask
  }else if (total_take = take){
    total_take = total_take
  }else if (total_actual = actual){
    total_actual = total_actual
  }else {
    total_ask = total_ask + parseInt(ask, 10);
    total_take = total_take + parseInt(take, 10);
    if (isNaN(parseInt(actual, 10))){
      total_actual = total_actual;
    } else {
      total_actual = total_actual + parseInt(actual, 10);
    };
  }
  $('#total2').html('')
  $('#total2').append('<th>Total:</th>'+
  '<th>'+formatMoneyString(total_ask)+'</th>'+
  '<th>'+formatMoneyString(total_take)+'</th>'+
  '<th>'+formatMoneyString(total_actual)+'</th>'+
  '<th></th>');
  if (row) {

    $(row).replaceWith(	'<tr class="default">'+
      '<td>'+country+'</td>'+
      '<td>'+formatMoneyString(ask)+'</td>'+
      '<td>'+formatMoneyString(take)+'</td>'+
      '<td>'+actual+'</td>'+
      '<td class="actions">'+
      '<button class="btn btn-icon btn-primary edit-btn action-btn" data-toggle="modal" data-target="#add-modal" ><i class="fa ion-eye"></i></button>'+ ' '+
      '<button class="btn btn-icon btn-danger delete-btn action-btn" data-toggle="modal" data-target="#delete-modal"><i class="fa fa-trash-o"></i></button>'+ ' '+
      '<button class="btn btn-icon btn-document action-btn" data-toggle="modal" data-target="#document-modal"><i class="fa ion-document"></i></button>'+
      '</td>'+
      '</tr>');
    row = 0;
    $("#foreign-sales-add-form2").trigger('reset');
  } else {

    $("#foreign-sales-summary-table2").append(
      '<tr class="default" >'+
      '<td>'+country+'</td>'+
      '<td>'+formatMoneyString(ask)+'</td>'+
      '<td>'+formatMoneyString(take)+'</td>'+
      '<td>'+formatMoneyString(actual)+'</td>'+
      '<td class="actions">'+
      '<button class="btn btn-icon btn-primary edit-btn action-btn" data-toggle="modal" data-target="#add-modal" ><i class="fa ion-eye"></i></button>'+' '+
      '<button class="btn btn-icon btn-danger delete-btn action-btn" data-toggle="modal" data-target="#delete-modal"><i class="fa fa-trash-o"></i></button>'+' '+
      '<button class="btn btn-icon btn-document action-btn" data-toggle="modal" data-target="#document-modal"><i class="fa ion-document"></i></button>'+
      '</td>'+
      '</tr>');
  }

});

$("#foreign-sales-add-cancel2").click(function() {
  $('#foreign-sales-add-country2').removeAttr('disabled');
  row = 0;
  $("#foreign-sales-add-form2").trigger('reset');
});

$("#foreign-sales-add-close2").click(function() {
  $('#foreign-sales-add-country2').removeAttr('disabled');
  row = 0;
  $("#foreign-sales-add-form2").trigger('reset');
})
})();

(function() {
var row;
var country = $("#foreign-sales-add-country2").val();
var ask = $("#foreign-sales-add-ask2").val();
var take = $("#foreign-sales-add-take2").val();
var actual = $("#foreign-sales-add-actual2").val();
$("#foreign-sales-summary-table2").on('click', '.delete-btn', function() {
  row = this.parentNode.parentNode ;
});

$("#delete-confirm2").on('click', function() {
  ask = moneyStringToNumber($(row).find('.ask').text());
  take = moneyStringToNumber($(row).find('.take').text());
  actual = moneyStringToNumber($(row).find('.actual').text());
  row.parentNode.removeChild(row);
  row = 0;
  total_ask = total_ask - ask;
  total_take = total_take - ask;
  if (isNaN(actual)){
    total_actual = total_actual;
  } else {
    total_actual = total_actual - actual;
  };
  $('#total2').html('')
  $('#total2').append('<th>Total:</th>'+
  '<th>'+formatMoneyString(total_ask)+'</th>'+
  '<th>'+formatMoneyString(total_take)+'</th>'+
  '<th>'+formatMoneyString(total_actual)+'</th>'+
  '<th></th>');
});

$("#delete-cancel2").on('click', function() {
  row = 0;
});

$("#delete-close2").on('click', function() {
  row = 0;
});
})();
});
