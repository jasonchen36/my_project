$(function(){
  $("#Submit").on('click', function(e){
    .alert('it works')
    e.preventDefault
    if($("#car").is(":checked")) {
      $(".panel-body").append("<b>Appended text</b>");
    } else {
      $(".panel-body").append("<b>Appended text</b>");
    }
  });
