var template = Handlebars.templates['presaleModal'];
var presales = {id: "add", investor: "", amount: "", territory: "", inEscrow: "false", escrowAmount: ""};
$("#modalLocation").append(template(presales));
