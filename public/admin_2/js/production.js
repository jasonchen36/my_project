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
		$('#tax-grant-summary').toggle();
	});

	$('#option_direct_territory_sales').on('click', function() {
		$("#direct-territory-summary").toggle();
	});
})();

(function() {
	var idCount = 1;

	//Create modals for presales
	var template = Handlebars.templates['presaleModal'];
	var add = {id: "add", investor: "", amount: "0", currency: "CAD", territory: "", distributor: "", depositAdvances: "", advProd: "true", escrowAmount: "0", equity: "0"};
	var data1 = {id: "1", investor: "Concourse Media", amount: "100000", currency: "CAD", territory: "United Kingdom", distributor: "MGM", depositAdvances: "", advProd: "true", escrowAmount: "0", equity: "20"};

	$("#modalLocation")
		.append(template(add))
		.append(template(data1));

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
			idCount+=1;
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
	$("#pre-sales-add-save").on('click', function() {
		var investor = $("#pre-sales-add-investor").val();
		var territory = $("#pre-sales-add-territory").val();
		var currency = $("#pre-sales-add-currency").val();
		var amount = $("#pre-sales-add-amount").val();
		var depositAdvances = $("#pre-sales-add-depositAdvances").val();
		var escrowAmount = $("#pre-sales-add-escrow-amount").val();
		var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, depositAdvances: depositAdvances, escrowAmount: escrowAmount, type: "pre-sales" };
		$("#modalLocation").append(template(data));
		$("#pre-sales-summary-table").append(summaryTableRow(data));
		addEditListener();
		$("#pre-sales-add-form").trigger('reset');
	});

	$("#pre-sales-add-cancel").on('click', function () {
		$("#pre-sales-add-form").trigger('reset');
	});

	$("#pre-sales-add-close").on('click', function () {
		$("#pre-sales-add-form").trigger('reset');
	});

	$("#pre-sales-add-advancesProd").on('click', function() {
		$("#pre-sales-add-deposit-form").addClass("hidden")
	});

	$("#pre-sales-add-depositAdvances").on('click', function() {
		$("#pre-sales-add-deposit-form").removeClass("hidden")
	});
})();

(function() {
	var idCount = 1;
	//Create modals for presales
	var template = Handlebars.templates['directTerritoryModal'];
	var add = {id: "add", investor: "", amount: "0", currency: "CAD", territory: "", distributor: "", equity: "0", overages: "0", hasPremium: "", noPremium: "true", premium: "0", hasArrangement: "", noArrangement: "true", isFront:"", isBack: "true", arrangement: ""};
	var data1 = {id: "1", investor: "French Distributors", amount: "275000", currency: "CAD", territory: "France", distributor: "MGM", equity: "4", overages: "60", hasPremium: "", noPremium: "true", premium: "0", hasArrangement: "", noArrangement: "true", isFront:"", isBack: "true", arrangement: ""};

	$("#modalLocation")
		.append(template(add))
		.append(template(data1));

	var addEditListener = function() {
		var id = idCount;
		$("#direct-territory-"+id+"-edit").on('click', function() {
			var investor = $("#direct-territory-add-investor").val();
			var territory = $("#direct-territory-add-territory").val();
			var currency = $("#direct-territory-add-currency").val();
			var amount = $("#direct-territory-add-amount").val();
			var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, type: "direct-territory" };			// $("#pre-sales-"+id+"-modal").replaceWith(presaleModalTemplate(data));
			idCount+=1;
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
	$("#direct-territory-add-save").on('click', function() {
		var investor = $("#direct-territory-add-investor").val();
		var territory = $("#direct-territory-add-territory").val();
		var currency = $("#direct-territory-add-currency").val();
		var amount = $("#direct-territory-add-amount").val();
		var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, type: "direct-territory" };
		$("#modalLocation").append(template(data));
		$("#direct-territory-summary-table").append(summaryTableRow(data));
		addEditListener();
		$("#direct-territory-add-form").trigger('reset');
	});

	$("#direct-territory-add-cancel").on('click', function () {
		$("#direct-territory-add-form").trigger('reset');
	});

	$("#direct-territory-add-close").on('click', function () {
		$("#direct-territory-add-form").trigger('reset');
	});

	$("#direct-territory-add-has-premium").on('click', function() {
		$("#direct-territory-add-premium-form").removeClass("hidden");
	});

	$("#direct-territory-add-no-premium").on('click', function() {
		$("#direct-territory-add-premium-form").addClass("hidden");
	});

	$("#direct-territory-add-has-arrangement").on('click', function() {
		$("#direct-territory-add-arrangement-form").removeClass("hidden");
	});

	$("#direct-territory-add-no-arrangement").on('click', function() {
		$("#direct-territory-add-arrangement-form").addClass("hidden");
	});

	$("#direct-territory-add-is-front").on('click', function() {
		$("#direct-territory-add-withheld-form").removeClass("hidden");
	});

	$("#direct-territory-add-is-back").on('click', function() {
		$("#direct-territory-add-withheld-form").addClass("hidden");
	});

})();

(function() {
	var idCount = 1;
	//Create modals for presales
	var template = Handlebars.templates['taxGrantModal'];
	var add = {id: "add", investor: "", isDiscount: "true", isLoan: "", estAmount: "0", netAdvance: "0", amount:"0", interestRate:"0", loanType:"Simple", currency: "CAD"};
	var data1 = {id: "1", investor: "BC Government", isDiscount: "", isLoan: "true", estAmount: "", netAdvance: "0", amount:"2000000", interestRate:"15", loanType:"Semi-Annual", currency: "CAD"};
	var data2 = {id: "2", investor: "Government of Canada", isDiscount: "true", isLoan: "", estAmount: "100000", netAdvance: "80000", amount:"", interestRate:"", loanType:"Simple", currency: "CAD"};

	$("#modalLocation")
		.append(template(add))
		.append(template(data1))
		.append(template(data2));

	var addEditListener = function() {
		var id = idCount;
		$("#tax-grant-"+id+"-edit").on('click', function() {
			var investor = $("#tax-grant-add-investor").val();
			var territory = $("#tax-grant-add-territory").val();
			var currency = $("#tax-grant-add-currency").val();
			var amount = $("#tax-grant-add-amount").val();
			var data = {id: idCount, investor: investor, territory: territory, currency: currency, amount: amount, type: "tax-grant" };			// $("#pre-sales-"+id+"-modal").replaceWith(presaleModalTemplate(data));
			idCount+=1;
			$("#tax-grant-"+id+"-form").trigger('reset');
		});

		$("#tax-grant-"+id+"-cancel").on('click', function() {
			$("#tax-grant-"+id+"-form").trigger('reset');
		});

		$("#tax-grant-"+id+"-close").on('click', function() {
			$("#tax-grant-"+id+"-form").trigger('reset');
		});

	};

	addEditListener();
	addEditListener();
	$("#tax-grant-add-save").on('click', function() {
		var investor = $("#tax-grant-add-investor").val();
		var currency = $("#tax-grant-add-currency").val();
		var isDiscount = $("#tax-grant-add-isDiscount");
		var amount;
		if (isDiscount.checked) {
			amount = $("#tax-grant-add-net-advance").val();
		} else {
			amount = $("#tax-grant-add-amount").val();
		}
		var data = {id: idCount, investor: investor, currency: currency, amount: amount, type: "tax-grant" };
		$("#modalLocation").append(template(data));
		$("#tax-grant-summary-table").append(summaryTableRow(data));
		addEditListener();
		$("#tax-grant-add-form").trigger('reset');
	});

	$("#tax-grant-add-cancel").on('click', function () {
		$("#tax-grant-add-form").trigger('reset');
	});

	$("#tax-grant-add-close").on('click', function () {
		$("#tax-grant-add-form").trigger('reset');
	});

	$("#tax-grant-add-isDiscount").on('click', function() {
		$("#tax-grant-add-is-loan-form").addClass("hidden");
		$("#tax-grant-add-is-discount-form").removeClass("hidden");
	});

	$("#tax-grant-add-isNotDiscount").on('click', function() {
		$("#tax-grant-add-is-loan-form").removeClass("hidden");
		$("#tax-grant-add-is-discount-form").addClass("hidden");
	})
})();

(function() {
	var idCount = 1;
	//Create modals for presales
	var template = Handlebars.templates['generalEquityModal'];
	var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0" };
	var data1 = {id: "1", investor: "Investor A", amount:"500000", currency: "CAD", equity:"50"};
	var data2 = {id: "2", investor: "Investor B", amount:"300000", currency: "CAD", equity: "30"};

	$("#modalLocation")
		.append(template(add))
		.append(template(data1))
		.append(template(data2));

	var addEditListener = function() {
		var id = idCount;
		$("#general-equity-"+id+"-edit").on('click', function() {
			var investor = $("#general-equity-add-investor").val();
			var currency = $("#general-equity-add-currency").val();
			var amount = $("#general-equity-add-amount").val();
			var data = {id: idCount, investor: investor,  currency: currency, amount: amount, type: "general-equity" };
			idCount+= 1;
			$("#general-equity-"+id+"-form").trigger('reset');
		});

		$("#general-equity-"+id+"-cancel").on('click', function() {
			$("#general-equity-"+id+"-form").trigger('reset');
		});

		$("#general-equity-"+id+"-close").on('click', function() {
			$("#general-equity-"+id+"-form").trigger('reset');
		});

	};

	addEditListener();
	addEditListener();

	$("#general-equity-add-save").on('click', function() {
		var investor = $("#general-equity-add-investor").val();
		var currency = $("#general-equity-add-currency").val();
		var amount= $("#general-equity-add-amount").val();
		var equity = $("#general-equity-add-equity").val();
		var data = {id: idCount, investor: investor, currency: currency, amount: amount, type: "general-equity" };
		$("#modalLocation").append(template(data));
		$("#general-equity-summary-table").append(summaryTableRow(data));
		addEditListener();
		$("#general-equity-add-form").trigger('reset');
	});

	$("#general-equity-add-cancel").on('click', function () {
		$("#general-equity-add-form").trigger('reset');
	});

	$("#general-equity-add-close").on('click', function () {
		$("#general-equity-add-form").trigger('reset');
	});
})();

(function() {
	var idCount = 1;
	//Create modals for presales
	var template = Handlebars.templates['nonRecoupingModal'];
	var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0" };
	var data1 = {id: "1", investor: "Producer Deferrals", amount:"100000", currency: "CAD", equity:"5"};

	$("#modalLocation")
		.append(template(add))
		.append(template(data1));

	var addEditListener = function() {
		var id = idCount;
		$("#non-recouping-"+id+"-edit").on('click', function() {
			var investor = $("#non-recouping-add-investor").val();
			var currency = $("#non-recouping-add-currency").val();
			var amount = $("#non-recouping-add-amount").val();
			var data = {id: idCount, investor: investor,  currency: currency, amount: amount, type: "non-recouping" };
			idCount+= 1;
			$("#non-recouping-"+id+"-form").trigger('reset');
		});

		$("#non-recouping-"+id+"-cancel").on('click', function() {
			$("#non-recouping-"+id+"-form").trigger('reset');
		});

		$("#non-recouping-"+id+"-close").on('click', function() {
			$("#non-recouping-"+id+"-form").trigger('reset');
		});

	};

	addEditListener();

	$("#non-recouping-add-save").on('click', function() {
		var investor = $("#non-recouping-add-investor").val();
		var currency = $("#non-recouping-add-currency").val();
		var amount= $("#non-recouping-add-amount").val();
		var equity = $("#non-recouping-add-equity").val();
		var data = {id: idCount, investor: investor, currency: currency, amount: amount, type: "non-recouping" };
		$("#modalLocation").append(template(data));
		$("#non-recouping-summary-table").append(summaryTableRow(data));
		addEditListener();
		$("#non-recouping-add-form").trigger('reset');
	});

	$("#non-recouping-add-cancel").on('click', function () {
		$("#non-recouping-add-form").trigger('reset');
	});

	$("#non-recouping-add-close").on('click', function () {
		$("#non-recouping-add-form").trigger('reset');
	});
})();

(function() {
	var idCount = 1;
	//Create modals for presales
	var template = Handlebars.templates['preferredEquityModal'];
	var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0" };
	var data1 = {id: "1", investor: "Private Equity", amount:"350000", currency: "CAD", equity:"10"};

	$("#modalLocation")
		.append(template(add))
		.append(template(data1));

	var addEditListener = function() {
		var id = idCount;
		$("#preferred-equity-"+id+"-edit").on('click', function() {
			idCount+= 1;
			$("#preferred-equity-"+id+"-form").trigger('reset');
		});

		$("#preferred-equity-"+id+"-cancel").on('click', function() {
			$("#preferred-equity-"+id+"-form").trigger('reset');
		});

		$("#preferred-equity-"+id+"-close").on('click', function() {
			$("#preferred-equity-"+id+"-form").trigger('reset');
		});

	};

	addEditListener();

	$("#preferred-equity-add-save").on('click', function() {
		var investor = $("#preferred-equity-add-investor").val();
		var currency = $("#preferred-equity-add-currency").val();
		var amount= $("#preferred-equity-add-amount").val();
		var equity = $("#preferred-equity-add-equity").val();
		var data = {id: idCount, investor: investor, currency: currency, amount: amount, type: "preferred-equity" };
		$("#modalLocation").append(template(data));
		$("#preferred-equity-summary-table").append(summaryTableRow(data));
		addEditListener();
		$("#preferred-equity-add-form").trigger('reset');
	});

	$("#preferred-equity-add-cancel").on('click', function () {
		$("#preferred-equity-add-form").trigger('reset');
	});

	$("#preferred-equity-add-close").on('click', function () {
		$("#preferred-equity-add-form").trigger('reset');
	});
})();
