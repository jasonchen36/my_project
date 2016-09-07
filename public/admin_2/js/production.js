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

	var formatMoneyString = function(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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
		var row;

		$("#summary-table").on('click', '.btn-danger', function() {
			row = this.parentNode.parentNode;
		});

		$("#delete-confirm").on('click', function() {
			row.parentNode.removeChild(row);
			row = {};
		});

		$("#delete-cancel").on('click', function() {
			row = {};
		});

		$("#delete-close").on('click', function () {
			row = {};
		})
	})();

	(function() {
		var idCount = 1;

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
					amount: amount, escrowAmount: escrowAmount, distributor: distributor, advProd: advProd,};
				var summaryData = {id:idCount, investor: investor, amount: formatMoneyString(amount-escrowAmount), type: type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#pre-sales-summary-table").append(summaryTableRow(summaryData));
					$(typeid+"-deposit-form").addClass("hidden");
					$(typeid+"-advancesProd").prop("checked", true);
					$(typeid+"-depositAdvances").prop("checked", false);
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
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
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
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
				var hasPremium = radioHasPremium === "true";
				var hasArrangement = radioHasArrangement === "true";
				var isBack = radioIsFront !== "true";

				var data = {id: idCount, investor: investor, amount: amount, currency: currency,
					territory: territory, distributor: distributor, equity: equity, overages: overages,
					hasPremium: hasPremium, premium: premium, hasArrangement: hasArrangement, isBack: isBack,
					arrangement: amountWithheld};
				var summaryData = {id:idCount, investor: investor, amount: formatMoneyString(amount-amountWithheld), type: type}

				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#direct-territory-summary-table").append(summaryTableRow(summaryData));
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
					summaryData.id = $(typeid+"-table-row-id").text();
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
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 1;
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
					currency: currency};
					var summaryData = {id:idCount, investor: investor, amount: formatMoneyString(isDiscount ? netAdvance : amount), type: type}
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#tax-grant-summary-table").append(summaryTableRow(summaryData));
					$(typeid+"-is-loan-form").addClass("hidden");
					$(typeid+"-is-discount-form").removeClass("hidden");
					$(typeid+"-isDiscount").prop("checked", true);
					$(typeid+"-isNotDiscount").prop("checked", false);
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
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
					} else {
						$(typeid+"-is-loan-form").removeClass("hidden");
						$(typeid+"-is-discount-form").addClass("hidden");
						$(typeid+"-isDiscount").prop("checked", false);
						$(typeid+"-isNotDiscount").prop("checked", true);
					}
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		idCount++;
		addModalListeners("2",0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 1;
		var template = Handlebars.templates['generalEquityModal'];
		var type = "general-equity";
		var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0" };
		var data1 = {id: "1", investor: "Investor A", amount:"500000", currency: "CAD", equity:"50"};
		var data2 = {id: "2", investor: "Investor B", amount:"300000", currency: "CAD", equity: "30"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1))
			.append(template(data2));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var currency = $(typeid+"-currency").val();
				var amount = $(typeid+"-amount").val();
				var equity = $(typeid+"-equity").val();
				var data = {id: idCount, investor: investor, amount:amount, currency: currency,
					equity: equity};
				var summaryData = {id:idCount, investor:investor, amount: formatMoneyString(amount), type:type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#general-equity-summary-table").append(summaryTableRow(summaryData));
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-equity").attr("value", equity);
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		idCount++;
		addModalListeners("2", 0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 1;
		var template = Handlebars.templates['nonRecoupingModal'];
		var type = "non-recouping";
		var add = {id: "add", investor: "", amount:"0", currency: "CAD",
			equity: "0" };
		var data1 = {id: "1", investor: "Producer Deferrals", amount:"100000", currency: "CAD",
			equity:"5"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var currency = $(typeid+"-currency").val();
				var amount = $(typeid+"-amount").val();
				var equity = $(typeid+"-equity").val();
				var data = {id: idCount, investor: investor, amount:amount, currency: currency,
					equity: equity };
				var summaryData = {id: idCount, investor:investor, amount: formatMoneyString(amount), type:type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#non-recouping-summary-table").append(summaryTableRow(summaryData));
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-equity").attr("value", equity);
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 1;
		var template = Handlebars.templates['preferredEquityModal'];
		var type = "preferred-equity";
		var add = {id: "add", investor: "", amount:"0", currency: "CAD", equity: "0" };
		var data1 = {id: "1", investor: "Private Equity", amount:"350000", currency: "CAD", equity:"10"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var currency = $(typeid+"-currency").val();
				var amount = $(typeid+"-amount").val();
				var equity = $(typeid+"-equity").val();
				var data = {id: idCount, investor: investor, amount:amount, currency: currency,
					equity: equity};
				var summaryData = {id: idCount, investor: investor, amount: formatMoneyString(amount), type:type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#preferred-equity-summary-table").append(summaryTableRow(summaryData));
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-equity").attr("value", equity);
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 1;
		var template = Handlebars.templates['corridorEquityModal'];
		var type = "corridor-equity";
		var add = {id: "add", investor: "", amount:"0", currency: "CAD",
			equity: "0" , presaleCorridor: "0", recoupmentCorridor: "0"};
		var data1 = {id: "1", investor: "Telefilm", amount:"500000", currency: "CAD",
			equity:"50", presaleCorridor:"0", recoupmentCorridor:"5"};
		var data2 = {id: "2", investor: "NOHFC", amount:"200000", currency: "CAD",
			equity:"20", presaleCorridor:"5", recoupmentCorridor:"0"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1))
			.append(template(data2));

		var addModalListeners = function(id, isAdd) {
			var typeid = "#"+type+"-"+id;
			addCloseListeners(type, id);

			$(typeid+"-save").on('click', function() {
				var investor = $(typeid+"-investor").val();
				var currency = $(typeid+"-currency").val();
				var amount = $(typeid+"-amount").val();
				var equity = $(typeid+"-equity").val();
				var presaleCorridor = $(typeid+"-presale-corridor").val();
				var recoupmentCorridor = $(typeid+"-recoupment-corridor").val();
				var data = {id: idCount, investor: investor, amount:amount, currency: currency,
					equity: equity, presaleCorridor: presaleCorridor, recoupmentCorridor: recoupmentCorridor,};
				var summaryData = {id: idCount, investor: investor, amount: formatMoneyString(amount), type: type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#corridor-equity-summary-table").append(summaryTableRow(summaryData));
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-equity").attr("value", equity);
					$(typeid+"-presale-corridor").attr("value", presaleCorridor);
					$(typeid+"-recoupment-corridor").attr("value", recoupmentCorridor);
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		idCount++;
		addModalListeners("2", 0);
		addModalListeners("add", 1);
	})();

	(function() {
		var idCount = 1;
		var template = Handlebars.templates['seniorDebtModal'];
		var type="senior-debt";
		var add = {id: "add", investor: "", amount:"0", currency: "CAD",
			equity: "0", financeSource:"Budget", loanType: "Simple", interestRate: "0" };
		var data1 = {id: "1", investor: "Productivity Media", amount:"150000", currency: "CAD",
			equity:"10", financeSource: "Budget", loanType:"Simple", interestRate: "15"};

		$("#modalLocation")
			.append(template(add))
			.append(template(data1));

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
				var equity = $(typeid+"-equity").val();
				var loanType = $(typeid+"-loan-type").val();
				var interestRate = $(typeid+"-interest-rate").val();
				var financeSource = $(typeid+"finance-source").val();

				var data = {id: idCount, investor: investor, amount:amount, equity: equity,
					interestRate:interestRate, loanType:loanType, currency: currency, financeSource: financeSource,};
				var summaryData = {id: idCount, investor:investor, amount: formatMoneyString(amount), type:type};
				if (isAdd) {
					$(typeid+"-form").trigger('reset');
					$("#modalLocation").append(template(data));
					$("#senior-debt-summary-table").append(summaryTableRow(summaryData));
					addModalListeners(idCount, 0);
					idCount++;
				} else {
					summaryData.id = $(typeid+"-table-row-id").text();
					$(typeid+"-investor").attr("value",investor);
					$(typeid+"-currency").attr("value",currency);
					$(typeid+"-amount").attr("value",amount);
					$(typeid+"-loan-type").attr("value", loanType);
					$(typeid+"-interest-rate").attr("value", interestRate);
					$(typeid+"-equity").attr("value", equity);
					$(typeid+"-finance-source").attr("value", financeSource);
					$(typeid+"-table-row").replaceWith(summaryTableRow(summaryData));
				}
			});
		};
		idCount++;
		addModalListeners("1", 0);
		addModalListeners("add", 1);
	})();
});

