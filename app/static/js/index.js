/**
This is to print the tool tip
**/

$(document).ready(function(){


    $(".tooltip_object").hover(function(){
        $(this).find(".tooltip_box").fadeIn(50,"swing");
    },function(){
    	 $(this).find(".tooltip_box").fadeOut(50,"swing");
    });


  });
