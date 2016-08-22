/**
* Theme: Montran Admin Template
* Author: Coderthemes
* Component: Ion Slider
* 
*/
$(document).ready(function () {
    $("#range_01").ionRangeSlider();
    
    $("#range_02").ionRangeSlider({
        min: 100,
        max: 1000,
        from: 550
    });
    
    $("#range_03").ionRangeSlider({
       // type: "double",
        grid: true,
        min: 0,
        max: 25000000,
        from: 25000000,
        to: 100,
        prefix: "$"
    });

    $("#range_11").ionRangeSlider({
       // type: "double",
        grid: true,
        min: 0,
        max: 1000000,
        from: 1000000,
        to: 100,
        prefix: "$"
    });

     $("#range_12").ionRangeSlider({
       // type: "double",
        grid: true,
        min: 0,
        max: 500000,
        from: 180000,
        to: 100,
        prefix: "$"
    });

     $("#range_13").ionRangeSlider({
       // type: "double",
        grid: true,
        min: 0,
        max: 500000,
        from: 80000,
        to: 100,
        prefix: "$"
    });
   
    $("#range_04").ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500
    });
    
    $("#range_05").ionRangeSlider({
        type: "double",
        grid: true,
        min: -1000,
        max: 1000,
        from: -500,
        to: 500,
        step: 250
    });
    
    $("#range_06").ionRangeSlider({
        grid: true,
        from: 3,
        values: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    });
    
    $("#range_07").ionRangeSlider({
        grid: true,
        min: 0,
        max: 100,
        from: 100,
        step: 1,
        prettify_enabled: true
    });
    
    $("#range_08").ionRangeSlider({
        min: 100,
        max: 1000,
        from: 550,
        disable: true
    });
});