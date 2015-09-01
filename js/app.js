//Angular Filtering
var pageNumber = 1;
var startedTyping = true;
var url = "../json/drinkslistb.json";

var drinksApp = angular.module('myApp', ['ngSanitize']);
drinksApp.controller('drinksCtrl', function($scope, $http) {
    $http.get(url)
        .success(function(response) {
            $scope.cocktails = response.drinks;
        });
});


$('#searchBarInput').keyup(function(e) {
    if ($('.card').length < 3) {
        $('#nextNav').hide();
    } else {
        $('#nextNav').show();
    }
    if (startedTyping = true) {
        $('#cards').css('padding-left', '5px');
        $('#cards').css('margin-left', '0px');
        $('#prevNav').css('display', 'none');
        pageNumber = 1;
        startedTyping = false;
    }
    if (e.which == 32 || e.which == 13) {
        var iHaveThisDrink = ($('#searchBarInput').val());
        if (iHaveThisDrink != " ") {
            $('#searchBarInput').val('');
            if (!($('#rec').hasClass('hasDrink'))) {
                $('#rec').html('');
                $('#rec').addClass('hasDrink');
            }
            $('#rec').append('<div class="enteredCrit">' + iHaveThisDrink + '</div> ');
            $('.enteredCrit:last-child').on('click', function() {
                $(this).css('font-size', '0px');
                $(this).css('padding', '0');
                $(this).addClass('tempClass');
                setTimeout(function() {
                    $('.tempClass').remove()
                }, 300);
                if ($('.enteredCrit').length < 2 && $('#rec').hasClass('hasDrink')) {
                    $("#rec").html("Tell me what ingredients you have...");
                    $(".hasDrink").removeClass("hasDrink");
                }
            });
        } else {
            $('#searchBarInput').val();
        }
    }
});

$(document).on('click', '#nextNav', function() {
    pageNumber++;
    $('.card').css('display', 'none');
    $('.card:nth-child(' + ((pageNumber * 1) + 1) + ')').css('display', 'block');
    $('.card:nth-child(' + ((pageNumber * 1) + 1) + ')').css('margin-left', '20px');
    $('.card:nth-child(' + ((pageNumber * 2) + 1) + ')').css('display', 'block');
    $('.card:nth-child(' + ((pageNumber * 2) + 1) + ')').css('margin-left', '338px');
    $('.card:nth-child(' + ((pageNumber * 3) + 1) + ')').css('display', 'block');
    $('.card:nth-child(' + ((pageNumber * 3) + 1) + ')').css('margin-left', '656px');
    $('#cards').css('padding-left', '70px');
    $('#cards').css('margin-left', '-70px');
    $('#prevNav').css('display', 'block');
    startedTyping = true;
    if ($('.card').length < (pageNumber * 3)) {
        $('#nextNav').hide();
    } else {
        $('#nextNav').show();
    }
});


$(document).on('click', '#prevNav', function() {
    $('#nextNav').show();
    pageNumber--;
    if (pageNumber == 1) {
        $('#cards').css('padding-left', '5px');
        $('#cards').css('margin-left', '0px');
        $('#prevNav').css('display', 'none');
    }
    $('.card').css('display', 'none');
    $('.card:nth-child(' + ((pageNumber * 1) + 1) + ')').css('display', 'block');
    $('.card:nth-child(' + ((pageNumber * 1) + 1) + ')').css('margin-left', '20px');
    $('.card:nth-child(' + ((pageNumber * 2) + 1) + ')').css('display', 'block');
    $('.card:nth-child(' + ((pageNumber * 2) + 1) + ')').css('margin-left', '338px');
    $('.card:nth-child(' + ((pageNumber * 3) + 1) + ')').css('display', 'block');
    $('.card:nth-child(' + ((pageNumber * 3) + 1) + ')').css('margin-left', '656px');
    startedTyping = true;
});


function showMenuItemLayer(id) {
console.log(id);
    if (id == "addDrink") {
        $('#shadowLayer').show();
        $('#addDrinkFull').show();
        $('#addDrinkFull').css('width', '500px');
        $('#addDrinkFull').css('height', '450px');
        $('#addDrinkFull').css('margin-left', '35%');
        $('#addDrinkFull').css('margin-top', '12%');
        $('#shadowLayer').on('click', function() {
            $(this).hide();
            $('#addDrinkFull').hide();
            $('.menuItem').each(function(i) {
                $(this).css('border', '');
                $(this).css('height', '0px');
                $(this).css('margin-top', '60px');
                $(this).css('margin-left', '30px');
                $(this).css('transform', 'rotate(1360deg)');
            });
            $('.ch-info-back h2 a').text('Show Menu');
            $('.contract').removeClass('contract');
        });
    }
}



$(function() {
    $(document).on('click', '.star', function() {
        if ($(this).hasClass('saved')) {
            $(this).removeClass('saved');
            $(this).parent('div').find('.ephMessage').remove();
            console.log($(this).parent('div'));
        } else {
            $(this).addClass('saved');
            $(this).before('<div class="ephMessage">saved</div>');
            setTimeout(function() {
                $('.ephMessage').remove()
            }, 2000);
        }
    });

    $(document).on("click", '#expand', function() {
        $('.menuItem').each(function(i) {
            var offsetTop = ((i + 1) * 116) + 58 + (i * 10);
            var transitionSpeed = 'all ' + ((i + 1) / 3) + 's ease-in-out';
            $(this).css('border', 'solid #fff');
            $(this).css('transition', transitionSpeed);
            $(this).css('height', '116px');
            $(this).css('margin-top', offsetTop + 'px');
            $(this).css('transform', 'rotate(0deg)');
        });
        $('.ch-info-back h2 a').text('Hide Menu');
        $('#expand').addClass('contract');
    });

    $(document).on("click", '.contract', function() {
        $('.menuItem').each(function(i) {
            $(this).css('border', '');
            $(this).css('height', '0px');
            $(this).css('margin-top', '60px');
            $(this).css('margin-left', '30px');
            $(this).css('transform', 'rotate(1360deg)');
        });
        $('.ch-info-back h2 a').text('Show Menu');
        $('.contract').removeClass('contract');
    });

    $(document).on("click", '.menuItem', function() {
        var id = $(this).attr('id');
        $('.menuItem').addClass('notClicked');
        $(this).removeClass('notClicked');
        $('.notClicked').css('border', '');
        $('.notClicked').css('height', '0px');
        $('.notClicked').css('margin-top', '60px');
        $('.notClicked').css('margin-left', '30px');
        $('.notClicked').css('transform', 'rotate(360deg)');

        $(this).css('transition', 'all 0.4s ease-out');
        $(this).css('margin-left', '45%');
        $(this).css('margin-top', '20%');
        $(this).css('transform', 'rotate(0deg)');

        setTimeout(function() {
            showMenuItemLayer(id);
        }, 400);

    });

});