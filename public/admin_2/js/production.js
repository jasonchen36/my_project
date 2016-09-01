(function() {

	//Turn toggles into on state
	$('.toggle').toggles({on: true});
	$('#option_presales').on('click', function() {
		$("#pre-sales-summary").toggle();
	});

	var idCount = 1;

	//Create modals for presales
	var presaleModalTemplate = Handlebars.templates['presaleModal'];
	var summaryTableRow = Handlebars.templates["summaryTableRow"];
	var presalesAdd = {id: "add", investor: "", amount: "0", currency: "CAD", territory: "", depositAdvances: "1", escrowAmount: "0", equity: "0"};
	var presalesData1 = {id: "1", investor: "Concourse Media", amount: "100000", currency: "CAD", territory: "United Kingdom", depositAdvances: "0", escrowAmount: "0", equity: "20"};

	$("#modalLocation")
		.append(presaleModalTemplate(presalesAdd))
		.append(presaleModalTemplate(presalesData1));

	var addEditListener = function() {
		var id = idCount;
		$("#pre-sales-"+id+"-edit").on('click', function() {
			var investor = $("#pre-sales-"+id+"-investor").val();
			var territory = $("#pre-sales-"+id+"-territory").val();
			var currency = $("#pre-sales-"+id+"-currency").val();
			var amount = $("#pre-sales-"+id+"-amount").val();
			var depositAdvances = $("#pre-sales-"+id+"-depositAdvances").val();
			var escrowAmount = $("#pre-sales-"+id+"-escrow-amount").val();
			var data = {id: id, investor: investor, territory: territory, currency: currency, amount: amount, depositAdvances: depositAdvances, escrowAmount: escrowAmount };
			// $("#pre-sales-"+id+"-modal").replaceWith(presaleModalTemplate(data));
			// $("#pre-sales-table-row-"+id).innerHTML = "HIIII";
			$("#pre-sales-"+id+"-form").trigger('reset');
		});

		$("#pre-sales-"+id+"-cancel").on('click', function() {
			$("#pre-sales-"+id+"-form").trigger('reset');
		});

		$("#pre-sales-"+id+"-close").on('click', function() {
			$("#pre-sales-"+id+"-form").trigger('reset');
		});

	};

	addEditListener();
	idCount+=1;
	$("#pre-sales-add-save").on('click', function() {
		var investor = $("#pre-sales-add-investor").val();
		var territory = $("#pre-sales-add-territory").val();
		var currency = $("#pre-sales-add-currency").val();
		var amount = $("#pre-sales-add-amount").val();
		var depositAdvances = $("#pre-sales-add-depositAdvances").val();
		var escrowAmount = $("#pre-sales-add-escrow-amount").val();
		var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, depositAdvances: depositAdvances, escrowAmount: escrowAmount };
		$("#modalLocation").append(presaleModalTemplate(data));
		$("#pre-sales-summary-table").append(summaryTableRow(data));
		addEditListener();
		idCount+= 1;
		$("#pre-sales-add-form").trigger('reset');
	});

	$("#pre-sales-add-cancel").on('click', function () {
		$("#pre-sales-add-form").trigger('reset');
	});

	$("#pre-sales-add-close").on('click', function () {
		$("#pre-sales-add-form").trigger('reset');
	});


})();

