// setInterval(function () { time() }, 1000);
var sec = -1;
let timeout;

// function time() {
//     if (sec > -1 && sec <= timeNumber) {
//         if (sec == timeNumber) {
//             $('#time').html("Koniec czasu").css('color', 'red');
//         }
//         else {

//             $('#time').html(sec++);
//         }
//     }
// }



function getId(strId) {
    arr = new Array(2);
    arr[0] = strId.substring(3, strId.indexOf('_'));
    arr[1] = strId.substring(strId.indexOf('_') + 1, strId.length);
    return arr
}

function Picture(accept) {
    this.val;
    do {
        rand = Math.floor(Math.random() * accept.length);
    } while (accept[rand] == 2);
    accept[rand]++;
    this.val = rand;
}



function GameBoard(n, m) {
    this.n = n;
    this.m = m;

    score = 0;

    //n*m%2==0

    picBoard = new Array(n);
    last = -1;

    accepTab = new Array(n * m / 2);
    for (var i = 0; i < accepTab.length; i++) {
        accepTab[i] = 0;
    }

    for (var i = 0; i < picBoard.length; i++) {
        picBoard[i] = new Array(m);
        for (var j = 0; j < picBoard[i].length; j++) {
            picBoard[i][j] = new Picture(accepTab);
        }
    }

    function getPicture(id) {
        return picBoard[id[0]][id[1]].val;
    }

    function show(obj) {
        val = getPicture(getId(obj.id));
        $(obj).html(val);
        if (last == -1) {
            last = val;
            lastId = getId(obj.id);
        } else {
            if (last == val) {

                $('#score').html(++score);
                if (score == rowNumber * columNumber / 2) {
                    clearInterval(timeout);
                    $('#time').html('Wygrałeś w czasie ' + sec + ' sekund').css('color', 'red');
                }

            } else {
                setTimeout(function () {
                    $(obj).html("X");
                    $("#col" + lastId[0] + "_" + lastId[1]).html("X");
                }, 1000);

            }
            last = -1;
        }
    }

    for (var i = 0; i < n; i++) {
        $("#board").append("<div class=row id=row" + i + "> ");
        for (var j = 0; j < m; j++) {
            $("#board #row" + i).append("<span class=col id=col" + i + "_" + j + ">X");
            $("#col" + i + "_" + j).bind("click", function () {
                show(this);
            });

        }

    }

}

let rowNumber, columNumber, timeNumber;

function start() {
    $('#score').html('0').css('color', 'inherit');;
    $('#time').html('0').css('color', 'inherit');
    document.getElementById("board").innerHTML = ''; //czyszczenie obecnej planszy
    clearInterval(timeout); //bez tego po każdym kliknięciu przyspieszałoby czas

    rowNumber = document.getElementById('rowNumber').value;
    columNumber = document.getElementById("columNumber").value;
    timeNumber = document.getElementById("timeNumber").value;

    rowNumber = Number(Math.floor(rowNumber));
    columNumber = Number(Math.floor(columNumber));
    timeNumber = Number(Math.floor(timeNumber));

    if (typeof (rowNumber) == "number" && typeof (columNumber) == "number" && typeof (timeNumber) == "number" && rowNumber < 50 && columNumber < 50 &&
        rowNumber >= 2 && columNumber >= 2 && (rowNumber * columNumber) % 2 == 0 && timeNumber > 10 && timeNumber < 1800) {

        board = new GameBoard(rowNumber, columNumber);
        sec = 0;

    }
    else {
        alert("Podałeś złe wartości. Liczby muszą być z przedziału 2-50 oraz parzyste.");
    }

    timeout = setInterval(() => {
        if (sec > -1 && sec <= timeNumber) {

            if (sec == timeNumber) {
                clearInterval(timeout);
                $('.col').unbind('click');
                $('.row').unbind('click');
                $('#time').html("Koniec czasu").css('color', 'red');
            }
            else {
                $('#time').html(sec++);
            }
        }
    }, 1000)

}

$().ready(function () {
    $("#start").bind("click", function () {
        start();
    });
});


// $().ready(function () {
//     $("#start").bind("click", function () {

//         start();
//     });
// });
