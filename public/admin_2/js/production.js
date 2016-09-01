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
		$("#pre-sales-"+idCount+"-edit").on('click', function() {
			var investor = $("#pre-sales-"+idCount+"-investor").val();
			var territory = $("#pre-sales-"+idCount+"-territory").val();
			var currency = $("#pre-sales-"+idCount+"-currency").val();
			var amount = $("#pre-sales-"+idCount+"-amount").val();
			var depositAdvances = $("#pre-sales-"+idCount+"-depositAdvances").val();
			var escrowAmount = $("#pre-sales-"+idCount+"-escrow-amount").val();
			var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, depositAdvances: depositAdvances, escrowAmount: escrowAmount };
			$("#pre-sales-"+idCount+"-modal").replaceWith(presaleModalTemplate(data));
			$("#pre-sales-table-row-"+idCount).replaceWith(summaryTableRow(data));
			$("#pre-sales-"+idCount+"-modal").hide();
			$(".modal-backdrop").hide();
			$("#pre-sales-"+idCount+"-form").trigger('reset');
		});

		$("#pre-sales-"+idCount+"-cancel").on('click', function() {
			$("#pre-sales-"+idCount+"-form").trigger('reset');
		});

		$("#pre-sales-"+idCount+"-close").on('click', function() {
			$("#pre-sales-"+idCount+"-form").trigger('reset');
		});

	};

	addEditListener();
	idCount+=1;
	$("#pre-sales-add-save").on('click', function() {
		$("#pre-sales-add-modal").hide();
		$(".modal-backdrop").hide();
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

