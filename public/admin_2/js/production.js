$(document).ready(function() {
	var summaryTableRow = Handlebars.templates["summaryTableRow"];

	var addCloseListeners = function (type, id) {
		$("#"+type+"-"+id+"-cancel").on('click', function() {
			$("#"+type+"-"+id+"-form").trigger('reset');
		});

		$("#"+type+"-"+id+"-close").on('click', function() {
			$("#"+type+"-"+id+"-form").trigger('reset');
		});
	};

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
		var type = "pre-sales";
		var add = {id: "add", investor: "", amount: "0", currency: "CAD",
			territory: "", distributor: "", depositAdvances: "", advProd: "true",
			escrowAmount: "0", equity: "0"};
		var data1 = {id: "1", investor: "Concourse Media", amount: "200000", currency: "CAD",
			territory: "United Kingdom", distributor: "MGM", depositAdvances: "", advProd: "true",
			escrowAmount: "0", equity: "20"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-advancesProd").on('click', function() {
				$(typeid+"-deposit-form").addClass("hidden")
			});

			$(typeid+"-depositAdvances").on('click', function() {
				$(typeid+"-deposit-form").removeClass("hidden")
			});

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var territory = $(typeid+"-territory").val();
				var currency = $(typeid+"-currency").val();
				var distributor = $(typeid+"-distributor").val();
				var amount = $(typeid+"-amount").val();
				var advProd;
				var escrowAmount = $(typeid+"-escrow-amount").val();
				var radio = $('input[name="pre-sales-'+id+'-radio-stacked"]:checked').val();
				if (radio === "true") {
					advProd=true
				} else {
					advProd=false;
				}
				var data = {id: idCount, investor: investor, territory: territory, currency: currency,
					amount: amount, escrowAmount: escrowAmount, distributor: distributor, advProd: advProd,
					type: type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#pre-sales-summary-table").append(summaryTableRow(data));
					$(typeid+"-deposit-form").addClass("hidden");
					$(typeid+"-advancesProd").prop("checked", true);
					$(typeid+"-depositAdvances").prop("checked", false);
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					data.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-territory").attr("value",territory);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-distributor").attr("value",distributor);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-escrow-amount").attr("value",escrowAmount);
					if (advProd) {
						$(typeid+"-advancesProd").attr("value", true);
						$(typeid+"-depositAdvances").attr("value", false);
						$(typeid+"-deposit-form").addClass("hidden");
					} else {
						$(typeid+"-advancesProd").attr("value", false);
						$(typeid+"-depositAdvances").attr("value", true);
						$(typeid+"-deposit-form").removeClass("hidden");
					}
					$(typeid+"-table-row").replaceWith(summaryTableRow(data));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("add", 1);
	})();

	(function() {

		var idCount = 1;

		var template = Handlebars.templates['directTerritoryModal'];
		var type = "direct-territory";
		var add = {id: "add", investor: "", amount: "0", currency: "CAD",
			territory: "", distributor: "", equity: "0", overages: "0",
			hasPremium: false, premium: "0", hasArrangement: false, isBack: true,
			arrangement: ""};
		var data1 = {id: "1", investor: "French Distributors", amount: "275000", currency: "CAD",
			territory: "France", distributor: "MGM", equity: "4", overages: "60",
			hasPremium: false, premium: "0", hasArrangement: false, isBack: true,
			arrangement: ""};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-has-premium").on('click', function() {
				$(typeid+"-premium-form").removeClass("hidden");
			});

			$(typeid+"-no-premium").on('click', function() {
				$(typeid+"-premium-form").addClass("hidden");
			});

			$(typeid+"-has-arrangement").on('click', function() {
				$(typeid+"-arrangement-form").removeClass("hidden");
			});

			$(typeid+"-no-arrangement").on('click', function() {
				$(typeid+"-arrangement-form").addClass("hidden");
			});

			$(typeid+"-is-front").on('click', function() {
				$(typeid+"-withheld-form").removeClass("hidden");
			});

			$(typeid+"-is-back").on('click', function() {
				$(typeid+"-withheld-form").addClass("hidden");
			});

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var territory = $(typeid+"-territory").val();
				var currency = $(typeid+"-currency").val();
				var distributor = $(typeid+"-distributor").val();
				var amount = $(typeid+"-amount").val();
				var equity = $(typeid+"-equity").val();
				var overages = $(typeid+"-overages").val();
				var premium = $(typeid+"-premium").val();
				var amountWithheld = $(typeid+"-arrangement").val();

				var radioHasPremium = $('input[name="direct-territory-'+id+'-premium-radio"]:checked').val();
				var radioHasArrangement = $('input[name="direct-territory-'+id+'-arrangement-radio"]:checked').val();
				var radioIsFront= $('input[name="direct-territory-'+id+'-position-radio"]:checked').val();
				var hasPremium, hasArrangement, isBack;
				if (radioHasPremium === "true") {
					hasPremium = true;
				} else {
					hasPremium = false;
				}
				if (radioHasArrangement === "true") {
					hasArrangement = true;
				} else {
					hasArrangement = false;
				}
				if (radioIsFront === "true") {
					isBack = false;
				} else {
					isBack = true;
				}

				var data = {id: idCount, investor: investor, amount: amount, currency: currency,
					territory: territory, distributor: distributor, equity: equity, overages: overages,
					hasPremium: hasPremium, premium: premium, hasArrangement: hasArrangement, isBack: isBack,
					arrangement: amountWithheld, type: "direct-territory"};

				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#direct-territory-summary-table").append(summaryTableRow(data));
					$(typeid+"-withheld-form").addClass("hidden");
					$(typeid+"-arrangement-form").addClass("hidden");
					$(typeid+"-premium-form").addClass("hidden");
					$(typeid+"-has-premium").prop("checked", false);
					$(typeid+"-no-premium").prop('checked', true);
					$(typeid+"-has-arrangement").prop('checked', false);
					$(typeid+"-no-arrangement").prop('checked', true);
					$(typeid+"-is-back").prop('checked', false);
					$(typeid+"-is-front").prop('checked', true);
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					data.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-territory").attr("value",territory);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-distributor").attr("value",distributor);
					$(typeid+"-amount").attr("value", amount);
					$(typeid+"-equity").attr("value", equity);
					$(typeid+"-overages").attr("value", overages);
					$(typeid+"-premium").attr("value", premium);
					$(typeid+"-arrangement").attr("value", amountWithheld);

					if (hasPremium) {
						$(typeid+"-has-premium").attr("value", true);
						$(typeid+"-no-premium").attr("value", false);
						$(typeid+"-premium-form").removeClass("hidden");
					} else {
						$(typeid+"-has-premium").attr("value", false);
						$(typeid+"-no-premium").attr("value", true);
						$(typeid+"-premium-form").addClass("hidden");
					}

					if (hasArrangement) {
						$(typeid+"-has-arrangement").attr("value", true);
						$(typeid+"-no-arrangement").attr("value", false);
						$(typeid+"-arrangement-form").removeClass("hidden");
					} else {
						$(typeid+"-has-arrangement").attr("value", false);
						$(typeid+"-no-arrangement").attr("value", true);
						$(typeid+"-arrangement-form").addClass("hidden");
					}

					if (!isBack) {
						$(typeid+"-is-front").attr("value", true);
						$(typeid+"-is-back").attr("value", false);
						$(typeid+"-withheld-form").removeClass("hidden");
					} else {
						$(typeid+"-is-front").attr("value", false);
						$(typeid+"-is-back").attr("value", true);
						$(typeid+"-withheld-form").addClass("hidden");
					}
					$(typeid+"-table-row").replaceWith(summaryTableRow(data));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 2;
		//Create modals for presales
		var template = Handlebars.templates['taxGrantModal'];
		var type = "tax-grant";
		var add = {id: "add", investor: "", isDiscount: "true", isLoan: "",
			estAmount: "0", netAdvance: "0", amount:"0", interestRate:"0",
			loanType:"Simple", currency: "CAD"};
		var data1 = {id: "1", investor: "BC Government", isDiscount: "", isLoan: "true",
			estAmount: "", netAdvance: "0", amount:"2000000", interestRate:"15",
			loanType:"Semi-Annual", currency: "CAD"};
		var data2 = {id: "2", investor: "Government of Canada", isDiscount: "true", isLoan: "",
			estAmount: "100000", netAdvance: "80000", amount:"", interestRate:"",
			loanType:"Simple", currency: "CAD"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1))
			.append(template(data2));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-isDiscount").on('click', function() {
				$(typeid+"-is-loan-form").addClass("hidden");
				$(typeid+"-is-discount-form").removeClass("hidden");
			});

			$(typeid+"-isNotDiscount").on('click', function() {
				$(typeid+"-is-loan-form").removeClass("hidden");
				$(typeid+"-is-discount-form").addClass("hidden");
			});

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var currency = $(typeid+"-currency").val();
				var amount = $(typeid+"-amount").val();
				var estimatedAmount = $(typeid+"-estimated-amount").val();
				var netAdvance = $(typeid+"-net-advance").val();
				var loanType = $(typeid+"-loan-type").val();
				var interestRate = $(typeid+"-interest-rate").val();
				var radio = $('input[name="tax-grant-'+id+'-radio-stacked"]:checked').val();
				var isDiscount = radio === "true";

				var data = {id: idCount, investor: investor, isDiscount: isDiscount, estAmount: estimatedAmount,
					netAdvance: netAdvance, amount:amount, interestRate:interestRate, loanType:loanType,
					currency: currency, type: type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					if (isDiscount) {
						data.amount = data.netAdvance;
					}
					$("#tax-grant-summary-table").append(summaryTableRow(data));
					$(typeid+"-is-loan-form").addClass("hidden");
					$(typeid+"-is-discount-form").removeClass("hidden");
					$(typeid+"-isDiscount").prop("checked", true);
					$(typeid+"-isNotDiscount").prop("checked", false);
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					data.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-estimated-amount").attr("value", estimatedAmount);
					$(typeid+"-net-advance").attr("value", netAdvance);
					$(typeid+"-loan-type").attr("value", loanType);
					$(typeid+"-interest-rate").attr("value", interestRate);
					if (isDiscount) {
						$(typeid+"-is-loan-form").addClass("hidden");
						$(typeid+"-is-discount-form").removeClass("hidden");
						$(typeid+"-isDiscount").prop("checked", true);
						$(typeid+"-isNotDiscount").prop("checked", false);
						data.amount = data.netAdvance;
					} else {
						$(typeid+"-is-loan-form").removeClass("hidden");
						$(typeid+"-is-discount-form").addClass("hidden");
						$(typeid+"-isDiscount").prop("checked", false);
						$(typeid+"-isNotDiscount").prop("checked", true);
					}
					$(typeid+"-table-row").replaceWith(summaryTableRow(data));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("2",0);
		addModalListeners("add", 1);
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

	(function() {
		var idCount = 1;
		//Create modals for presales
		var template = Handlebars.templates['corridorEquityModal'];
		var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0" , presaleCorridor: "0", recoupmentCorridor: "0"};
		var data1 = {id: "1", investor: "Telefilm", amount:"500000", currency: "CAD", equity:"50", presaleCorridor:"0", recoupmentCorridor:"5"};
		var data2 = {id: "2", investor: "NOHFC", amount:"200000", currency: "CAD", equity:"20", presaleCorridor:"5", recoupmentCorridor:"0"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1))
			.append(template(data2));

		var addEditListener = function() {
			var id = idCount;
			$("#corridor-equity-"+id+"-edit").on('click', function() {
				idCount+= 1;
				$("#corridor-equity-"+id+"-form").trigger('reset');
			});

			$("#corridor-equity-"+id+"-cancel").on('click', function() {
				$("#corridor-equity-"+id+"-form").trigger('reset');
			});

			$("#corridor-equity-"+id+"-close").on('click', function() {
				$("#corridor-equity-"+id+"-form").trigger('reset');
			});

		};

		addEditListener();
		addEditListener();

		$("#corridor-equity-add-save").on('click', function() {
			var investor = $("#corridor-equity-add-investor").val();
			var currency = $("#corridor-equity-add-currency").val();
			var amount= $("#corridor-equity-add-amount").val();
			var equity = $("#corridor-equity-add-equity").val();
			var presaleCorridor = $("#corridor-equity-add-presale-corridor").val();
			var recoupCorridor = $("#corridor-equity-add-recoupment-corridor").val();
			var data = {id: idCount, investor: investor, currency: currency, amount: amount, presaleCorridor: presaleCorridor, recoupmentCorridor: recoupCorridor, type: "corridor-equity" };
			$("#modalLocation").append(template(data));
			$("#corridor-equity-summary-table").append(summaryTableRow(data));
			addEditListener();
			$("#corridor-equity-add-form").trigger('reset');
		});

		$("#corridor-equity-add-cancel").on('click', function () {
			$("#corridor-equity-add-form").trigger('reset');
		});

		$("#corridor-equity-add-close").on('click', function () {
			$("#corridor-equity-add-form").trigger('reset');
		});
	})();

	(function() {
		var idCount = 1;
		//Create modals for presales
		var template = Handlebars.templates['seniorDebtModal'];
		var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0", financeSource:"Budget", loanType: "Simple", interest: "0" };
		var data1 = {id: "1", investor: "Productivity Media", amount:"150000", currency: "CAD", equity:"10", financeSource: "Budget", loanType:"Simple", interest: "15"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1));

		var addEditListener = function() {
			var id = idCount;
			$("#senior-debt-"+id+"-edit").on('click', function() {
				idCount+= 1;
				$("#senior-debt-"+id+"-form").trigger('reset');
			});

			$("#senior-debt-"+id+"-cancel").on('click', function() {
				$("#senior-debt-"+id+"-form").trigger('reset');
			});

			$("#senior-debt-"+id+"-close").on('click', function() {
				$("#senior-debt-"+id+"-form").trigger('reset');
			});

		};

		addEditListener();

		$("#senior-debt-add-save").on('click', function() {
			var investor = $("#senior-debt-add-investor").val();
			var currency = $("#senior-debt-add-currency").val();
			var amount= $("#senior-debt-add-amount").val();
			var equity = $("#senior-debtadd-equity").val();
			var data = {id: idCount, investor: investor, currency: currency, amount: amount, type: "senior-debt" };
			$("#modalLocation").append(template(data));
			$("#senior-debt-summary-table").append(summaryTableRow(data));
			addEditListener();
			$("#senior-debt-add-form").trigger('reset');
		});

		$("#senior-debt-add-cancel").on('click', function () {
			$("#senior-debt-add-form").trigger('reset');
		});

		$("#senior-debt-add-close").on('click', function () {
			$("#senior-debt-add-form").trigger('reset');
		});
	})();
});

