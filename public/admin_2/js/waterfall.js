$(document).ready(function() {
	var usdToCad = 1.3096;

	var formatMoneyString = function(number) {
		return "CAD "+number.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	var formatMoneyStringToNumber = function(number) {
		return number.replace(/CAD|,|\s/g, '');
	};

	(function() {
		$("#waterfall-financiers-split").on('input', function() {
			$("#waterfall-producers-split").val(100-$(this).val());
		});
		$("#waterfall-producers-split").on('input', function() {
			$("#waterfall-financiers-split").val(100-$(this).val());
		});

		$("#waterfall-cam-expenses").on('input', function() {
			$("#waterfall-otp-cam-expenses").text(formatMoneyString($(this).val()*usdToCad));
		});

		$("#waterfall-sales-expenses").on('input', function() {
			var sellingExpense = $(this).val()*usdToCad;
			var sellingExpensePercent = sellingExpense/88.5;

			var telefilm1 = sellingExpensePercent*7.5;
			var telefilm2 = formatMoneyStringToNumber($("#waterfall-2-telefilm").text());
			var telefilm3 = formatMoneyStringToNumber($("#waterfall-3-telefilm").text());
			var telefilm4 = 1500000 - telefilm1 - telefilm2 - telefilm3;

			var nohfc1 = sellingExpensePercent*2.5;
			var nohfc2 = formatMoneyStringToNumber($("#waterfall-2-nohfc").text());
			var nohfc3 = formatMoneyStringToNumber($("#waterfall-3-nohfc").text());
			var nohfc4 = 500000 - nohfc1 - nohfc2 - nohfc3;

			var omdc1 = sellingExpensePercent*1.5;
			var omdc2 = formatMoneyStringToNumber($("#waterfall-2-omdc").text());
			var omdc3 = formatMoneyStringToNumber($("#waterfall-3-omdc").text());
			var omdc4 = 300000 - omdc1 - omdc2 - omdc3;

			$("#waterfall-1-selling-expense").text(formatMoneyString(sellingExpense));
			$("#waterfall-1-telefilm").text(formatMoneyString(telefilm1));
			$("#waterfall-1-nohfc").text(formatMoneyString(nohfc1));
			$("#waterfall-1-omdc").text(formatMoneyString(omdc1));

			$("#waterfall-4-nohfc").text(formatMoneyString(nohfc4));
			$("#waterfall-4-omdc").text(formatMoneyString(omdc4));
			$("#waterfall-4-telefilm").text(formatMoneyString(telefilm4));
		});
	})();

});
