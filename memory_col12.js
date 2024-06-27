// coded by Lovro Selic , C00lSch00l 2014, 2015, 2016

console.clear();
const VERSION = "1.07";
console.log("Memory V" + VERSION + " (c) 2014, 2016 C00lSch00l, coded by Lovro Selic");

//Prototypes

Array.prototype.swap = function (x, y) {
    var TMP = this[x];
    this[x] = this[y];
    this[y] = TMP;
    return this;
};
Array.prototype.shuffle = function () {
    var i = this.length,
        j;
    while (--i > 0) {
        j = rnd(0, i);
        this.swap(i, j);
    }
    return this;
};

///////////////////////////////////////////////////////////////////
/** missing: path responsive to host */
var PATH = "Sounds/";
if (window.location.hostname === "chestbook.si") {
    PATH = "https://chestbook.si/wp-content/uploads/Games/Assets/Sounds/";
}
var Sounds = { names: [] };
///////////////////////////////////////////////////////////////////

$(document).ready(function () {
    $("#version").html("Memory - Colours v" + VERSION + " &copy 2014 C00lSch00l");
    $("#play_again").click(function () {
        location.reload();
    });
    setUp();
    setBoard();
    var guesses = 0;
    var toGo = 12;
    $(".tile").click(function () {
        var clickedDiv = $(this);
        if (clickedDiv.hasClass("back")) {
            count++;
            if (count === 2) {
                if (!found) {
                    $("#" + clicked[0]).removeClass("cface");
                    $("#" + clicked[1]).removeClass("cface");
                    $("#" + clicked[0]).addClass("back");
                    $("#" + clicked[1]).addClass("back");
                    $("#" + clicked[0]).html("");
                    $("#" + clicked[1]).html("");
                }
                count = 0;
                clicked = [];
                inField = [];
            }
            if (count < 2) {
                clickedDiv.removeClass("back");
                clickedDiv.addClass("cface");
                X = clickedDiv.prop('id');
                clicked.push(X);
                X = X.slice(5);
                if (combinedArray[X].indexOf('#') === 0) {
                    clickedDiv.css("background", combinedArray[X]);
                } else {
                    temp = call.indexOf(combinedArray[X]);
                    var idx = temp;
                    temp = response[temp];
                    clickedDiv.append("<p>" + combinedArray[X] + "</p>");
                    if ($("#pronounce").prop("checked")) {
                        Sounds.names[idx].play();
                    }
                    if ($("#hint").prop("checked")) {
                        clickedDiv.find('p').css('color', temp);
                    }
                }
                inField.push(combinedArray[X]);
                if (clicked.length === 2) {
                    firstClick = getIndex(inField[0]);
                    secondClick = getIndex(inField[1]);
                    guesses++;
                    $("#clicks").text("Guesses: " + guesses + "\xA0\xA0\xA0");
                    if (firstClick === secondClick) {
                        toGo--;
                        $("#togo").text("Pairs to find: " + toGo + "\xA0\xA0\xA0");
                        $("#" + clicked[0]).removeClass("cface");
                        $("#" + clicked[1]).removeClass("cface");
                        $("#" + clicked[0]).addClass("cguessed");
                        $("#" + clicked[1]).addClass("cguessed");
                        $("#" + clicked[0]).animate({
                            opacity: 0
                        }, 1000);
                        $("#" + clicked[1]).animate({
                            opacity: 0
                        }, 1000);
                        found = true;
                        $("#what").text("Last pair: CORRECT\xA0\xA0");
                        if (toGo === 0) {
                            $("#togo").hide();
                            $("#what").hide();
                            $('.inf').append("<strong>WELL DONE! YOU HAVE FOUND ALL THE PAIRS IN " + guesses + " GUESSES.</strong> Press 'F5' to play again.");
                            $('#upd').html("You have found all the pairs in " + guesses + " guesses.");
                            $('#welldone').show();
                            $('.tile').hide(1000);
                        }
                    } else {
                        $("#what").text("Last pair: WRONG");
                        found = false;
                    }
                }
            }
        }
    });

});

function setUp() {
    call = ['RED', 'GREEN', 'BLUE', 'YELLOW', 'BLACK', 'WHITE', 'BROWN', 'ORANGE', 'GREY', 'PURPLE', 'PINK', 'TURQUOISE'];
    response = ['#FF0000', '#008000', '#0000FF', '#FFFF00', '#000000', '#FFFFFF', '#8B4513', '#FF8C00', '#777777', '#800080', '#FFC0CB', '#40E0D0'];
    var CL = call.length;
    for (var z = 0; z < CL; z++) {
        Sounds.names[z] = new Audio(PATH + call[z].toLowerCase() + ".mp3");
    }
    combinedArray = [];
    combinedArray = call.concat(response);
    combinedArray.shuffle();
    count = -1;
    clicked = [];
    inField = [];
}

function setBoard() {
    for (var i = 0; i < 24; i++) {
        var output = "<div id='field" + i + "' class='tile back'><a href='#'></a></div>";
        $("#page").append(output);
    }
}

function rnd(start, end) {
    return Math.floor(Math.random() * (++end - start) + start);
}

function getIndex(polje) {
    var idx = call.indexOf(polje);
    if (idx === -1) {
        idx = response.indexOf(polje);
    }
    return idx;
}