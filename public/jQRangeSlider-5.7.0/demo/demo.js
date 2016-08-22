
(function($, undefined){

	function createDemos(){
		var simple = $("<div id='slider' />").appendTo("body"),
			date = $("<div id='date' />").appendTo("body"),
			modifiable = $("<div id='modifiable' />").appendTo("body");

		simple.sliderDemo();

	}


	$(document).ready(function(){
		createDemos();
		initTheme();
	});

})(jQuery);