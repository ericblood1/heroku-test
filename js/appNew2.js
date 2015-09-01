//Angular Filtering
var pageNumber = 1;
var startedTyping = true;
var url = "../json/drinkslistb.json";
var cardsPerRow = 4;
var showClicks = 0;
var originalShowMoreHeight = '370px';
var originalCardsHeight = '420px'



var drinksApp = angular.module('myApp', ['ngSanitize','firebase']);

drinksApp.controller('drinksCtrl', function ($scope, $firebaseArray) {
   var ref = new Firebase('https://dapperdrinks.firebaseio.com/drinks');
   $scope.graphData = $firebaseArray(ref);
    $scope.search = function (row) {
        return (angular.lowercase(row.name).indexOf($scope.searchFor|| '') !== -1 || angular.lowercase(row.ingredients).indexOf($scope.searchFor|| '') !== -1);
    };
});










$('#searchBarInput').keyup(function(e) {
if (!($('#nrf').html("no drinks found"))) {
$('#nrf').html("no drinks found");
}
$('.moreCard').hide();
$('.moreCard').removeClass('moreCard');
$('#showMore').css('margin-top',originalShowMoreHeight);
$('#showMore').show();
$('#cards').css('height',originalCardsHeight);
showClicks = 0;
if ($('.card').length > 4)
   $('#showMore').show();
else
   $('#showMore').hide();


    if ($('.card').length < 1) {
        $('#showMoreResults').hide();
    } else {
        $('#showMoreResults').show();
    }
    if (e.which == 32 || e.which == 13) {
        var iHaveThisDrink = ($('#searchBarInput').val());
        if (iHaveThisDrink != " ") {
            $('#searchBarInput').val('');
            $('#rec').show();
            $('#rec').append('<span class="enteredCrit">' + iHaveThisDrink + '</span> ');
        } else {
            $('#searchBarInput').val('');
        }
    }
});

$(function() {

setTimeout(function(){ $('#nrf').append('..'); }, 500);



    $(document).on('click','.enteredCrit',function(){
     //add a way to update the search results
     $(this).remove();
     if ($('.enteredCrit').length < 1) {
      $('#rec').hide();
     }
});


    var newRows = 0;
    $('#showMore').on('click', function(){
      showClicks++;
      var cardRows = Math.ceil($('.card').length / cardsPerRow);
      if (cardRows > (4 * (showClicks + 1))) {
         newRows = 5;
         newRowsHeight = 4;
      }
      else {
        newRows = ((4 * (showClicks + 1) - cardRows) - 5) + 1;
        newRowsHeight = (newRows - 1)
        $('#showMore').hide();
      }
       //counts the first item in a row (+1 to account for first row)
       var visibleRowCounter = ($('.rowStart').length) + 1;

       for (i = 1; i < newRows; i++) {

        col1 = (4 * i) + ((showClicks - 1) * (4 * (newRows - 1)));
console.log('showClicks ' + showClicks);
console.log('newRows ' + newRows);
console.log('col1 ' + col1);
        col2 = (4 * i) + ((showClicks - 1) * (4 * (newRows - 1))) + 1;
        col3 = (4 * i) + ((showClicks - 1) * (4 * (newRows - 1))) + 2;
        col4 = (4 * i) + ((showClicks - 1) * (4 * (newRows - 1))) + 3;
        colTop = 375 * (i) + ((showClicks - 1) * (375 * (newRows - 1)));


        $('.card').eq(col1).css('margin-left','20px')
        $('.card').eq(col1).css('margin-top',colTop)
        $('.card').eq(col1).show();
        $('.card').eq(col1).addClass('moreCard');
        $('.card').eq(col1).addClass('rowStart');
        $('.card').eq(col2).css('margin-left','338px')
        $('.card').eq(col2).css('margin-top',colTop)
        $('.card').eq(col2).show();
        $('.card').eq(col2).addClass('moreCard');
        $('.card').eq(col3).css('margin-left','656px')
        $('.card').eq(col3).css('margin-top',colTop)
        $('.card').eq(col3).show();
        $('.card').eq(col3).addClass('col3');
        $('.card').eq(col3).addClass('moreCard');
        $('.card').eq(col4).css('margin-left','974px')
        $('.card').eq(col4).css('margin-top',colTop)
        $('.card').eq(col4).show();
        $('.card').eq(col4).addClass('col4');
        $('.card').eq(col4).addClass('moreCard');
       }
        var newHeightShowBtn = Number($('#showMore').css('margin-top').replace('px','')) + (375 * (newRows - 1));
        $('#showMore').css('margin-top',newHeightShowBtn + 'px');

        var newHeightCards = Number($('#cards').css('height').replace('px','')) + (375 * (newRowsHeight));
        $('#cards').css('height',newHeightCards + 'px');


    });

    $(document).on('click', '.star', function() {
        if ($(this).hasClass('saved')) {
            $(this).removeClass('saved');
            $(this).parent('div').find('.ephMessage').remove();
        } else {
            $(this).addClass('saved');
            $(this).before('<div class="ephMessage">saved</div>');
            setTimeout(function() {
                $('.ephMessage').remove()
            }, 2000);
        }
    });

});