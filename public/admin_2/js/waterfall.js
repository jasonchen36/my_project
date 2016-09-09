$(document).ready(function() {
	$("#waterfall-financiers-split").on('input', function() {
		$("#waterfall-producers-split").val(100-$(this).val());
	});
	$("#waterfall-producers-split").on('input', function() {
		$("#waterfall-financiers-split").val(100-$(this).val());
	});
})();
