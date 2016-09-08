$(document).ready(function() {

	var formatMoneyString = function(number) {
		return "$"+number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var total_ask = 400000;
	var total_take = 166000;
	var total_actual = 180000;
	$('#total').append('<th>Total:</th>'+
	'<th>'+formatMoneyString(total_ask)+'</th>'+
	'<th>'+formatMoneyString(total_take)+'</th>'+
	'<th>'+formatMoneyString(total_actual)+'</th>'+
	'<th></th>');



	(function() {
		var row;

		$("#foreign-sales-summary-table").on('click', '.edit-btn', function() {
			row = this.parentNode.parentNode;
			$("#foreign-sales-add-country").val(row.children[0].textContent);
			$("#foreign-sales-add-ask").val(row.children[1].textContent.replace(/\$|,/g, ''));
			$("#foreign-sales-add-take").val(row.children[2].textContent.replace(/\$|,/g, ''));
			$("#foreign-sales-add-actual").val(row.children[3].textContent.replace(/\$|,/g, ''));
		});

		$("#foreign-sales-add-save").click(function(){
			var country = $("#foreign-sales-add-country").val();
			var ask = $("#foreign-sales-add-ask").val();
			var take = $("#foreign-sales-add-take").val();
			var actual = $("#foreign-sales-add-actual").val();
			total_ask = total_ask + parseInt(ask, 10);
			total_take = total_take + parseInt(take, 10);
			if (isNaN(parseInt(actual, 10))){
			total_actual = total_actual;
		  }else{
			total_actual = total_actual + parseInt(actual, 10);
		  };
			$('#total').html('')
			$('#total').append('<th>Total:</th>'+
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
          '<button class="btn btn-icon btn-document action-btn" data-toggle="modal" data-target="#document-modal"><i class="fa ion-link"></i></button>'+
					'</td>'+
					'</tr>');
				row = 0;
				$("#foreign-sales-add-form").trigger('reset');
			} else {
				$("#foreign-sales-summary-table").append(
					'<tr class="default" >'+
					'<td>'+country+'</td>'+
					'<td>'+formatMoneyString(ask)+'</td>'+
					'<td>'+formatMoneyString(take)+'</td>'+
					'<td>'+actual+'</td>'+
					'<td class="actions">'+
					'<button class="btn btn-icon btn-primary edit-btn action-btn" data-toggle="modal" data-target="#add-modal" ><i class="fa ion-eye"></i></button>'+' '+
          '<button class="btn btn-icon btn-danger delete-btn action-btn" data-toggle="modal" data-target="#delete-modal"><i class="fa fa-trash-o"></i></button>'+' '+
          '<button class="btn btn-icon btn-document action-btn" data-toggle="modal" data-target="#document-modal"><i class="fa ion-link"></i></button>'+
					'</td>'+
					'</tr>');
			}

		});

		$("#foreign-sales-add-cancel").click(function() {
			row = 0;
			$("#foreign-sales-add-form").trigger('reset');
		});

		$("#foreign-sales-add-close").click(function() {
			row = 0;
			$("#foreign-sales-add-form").trigger('reset');
		})
	})();

	(function() {
		var row;
		$("#foreign-sales-summary-table").on('click', '.delete-btn', function() {
			row = this.parentNode.parentNode ;
		});

		$("#delete-confirm").on('click', function() {
			row.parentNode.removeChild(row);
			row = 0;
		});

		$("#delete-cancel").on('click', function() {
			row = 0;
		});

		$("#delete-close").on('click', function() {
			row = 0;
		});
	})();
});
