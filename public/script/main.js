$(document).ready(function () {
    
    //trigger the hidden checkbox to close when a link is clicked
    $('#hamOne').click(function () {
        console.log(this);
        $('.check').click();
    });

    $('#hamTwo').click(function () {
        console.log(this);
        $('.check').click();
    });

    $('#hamThree').click(function () {
        console.log(this);
        $('.check').click();
    });
});