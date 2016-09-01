var summaryTableRow = Handlebars.templates["summaryTableRow"];

(function () {
	$('.toggle').toggles({on: true});
	$('#option_presales').on('click', function() {
		$("#pre-sales-summary").toggle();
	});
	$('#option_equity').on('click', function() {
		$("#general-equity-summary").toggle();
	});

	$('#option_senior_debt').on('click', function() {
		$("#senior-debt-summary").toggle();
	});
	$('#option_preferred-equity').on('click', function() {
		$("#preferred-equity-summary").toggle();
	});

	$('#option_non_recouping_production_capital').on('click', function() {
		$("#non-recouping-summary").toggle();
	});

	$('#option_corridor_equity').on('click', function() {
		$("#corridor-equity-summary").toggle();
	});

	$('#option_grants_and_tax_breaks').on('click', function() {
		$('#tax-grants-summary').toggle();
	});

	$('#option_direct_territory_sales').on('click', function() {
		$("#direct-territory-summary").toggle();
	});
})();

(function() {
	var idCount = 1;

	//Create modals for presales
	var presaleModalTemplate = Handlebars.templates['presaleModal'];
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
			var data = {id: id, investor: investor, territory: territory, currency: currency, amount: amount, depositAdvances: depositAdvances, escrowAmount: escrowAmount, type: "pre-sales" };
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
		var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, depositAdvances: depositAdvances, escrowAmount: escrowAmount, type: "pre-sales" };
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

(function() {
	var idCount = 1;
	//Create modals for presales
	var directTerritoryModalTemplate = Handlebars.templates['directTerritoryModal'];
	var directTerritoryAdd = {id: "add", investor: "", amount: "0", currency: "CAD", territory: "", equity: "0", overages: "0", hasPremium: "", premium: "0", hasArrangement: "", isFront:"", arrangement: ""};
	var directTerritoryData1 = {id: "1", investor: "French Distributors", amount: "275000", currency: "CAD", territory: "France", equity: "4", overages: "60", hasPremium: "", premium: "0", hasArrangement: "", isFront:"", arrangement: ""};

	$("#modalLocation")
		.append(directTerritoryModalTemplate(directTerritoryAdd))
		.append(directTerritoryModalTemplate(directTerritoryData1));

	var addEditListener = function() {
		var id = idCount;
		$("#direct-territory-"+id+"-edit").on('click', function() {
			var investor = $("#direct-territory-add-investor").val();
			var territory = $("#direct-territory-add-territory").val();
			var currency = $("#direct-territory-add-currency").val();
			var amount = $("#direct-territory-add-amount").val();
			var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, type: "direct-territory" };			// $("#pre-sales-"+id+"-modal").replaceWith(presaleModalTemplate(data));
			// $("#pre-sales-table-row-"+id).innerHTML = "HIIII";
			$("#direct-territory-"+id+"-form").trigger('reset');
		});

		$("#direct-territory-"+id+"-cancel").on('click', function() {
			$("#direct-territory-"+id+"-form").trigger('reset');
		});

		$("#direct-territory-"+id+"-close").on('click', function() {
			$("#direct-territory-"+id+"-form").trigger('reset');
		});

	};

	addEditListener();
	idCount+=1;
	$("#direct-territory-add-save").on('click', function() {
		var investor = $("#direct-territory-add-investor").val();
		var territory = $("#direct-territory-add-territory").val();
		var currency = $("#direct-territory-add-currency").val();
		var amount = $("#direct-territory-add-amount").val();
		var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, type: "direct-territory" };
		$("#modalLocation").append(directTerritoryModalTemplate(data));
		$("#direct-territory-summary-table").append(summaryTableRow(data));
		addEditListener();
		idCount+= 1;
		$("#direct-territory-add-form").trigger('reset');
	});

	$("#direct-territory-add-cancel").on('click', function () {
		$("#direct-territory-add-form").trigger('reset');
	});

	$("#direct-territory-add-close").on('click', function () {
		$("#direct-territory-add-form").trigger('reset');
	});
})();


