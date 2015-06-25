
var agentUrl = "http://robotcos.local:8081/digitalwrite/"

function setLED(pin, state) {
    $.ajax({
        url: agentUrl + pin + "/" + state,
        method: "GET",
        success: function(response) {
            console.log("Success");
        },
        error: function (request, status, error) {
            console.log("Whoops! Something went horribly wrong: " + error);
        }
    });
};

(function () {
    'use strict';
    var pad = document.getElementById('dpad'),
        i = 0,
        padbuttons = pad.getElementsByClassName('button'),
        click = function () {
            pad.className = this.id;
            document.onmouseup = function () {
                console.log(pad.className + " :: Up");

                if (pad.className == "up") {
                    setLED(16,0);
                }
                else if (pad.className == "right") {
                    setLED(11,0);
                }
                else if (pad.className == "down") {
                    setLED(15,0);
                }
                else if (pad.className == "left") {
                    setLED(12,0);
                }

                pad.className = '';
            };
            document.onmousedown = function () {
                console.log(pad.className + " :: Down");

                if (pad.className == "up") {
                    setLED(16,1);
                }
                else if (pad.className == "right") {
                    setLED(11,1);
                }
                else if (pad.className == "down") {
                    setLED(15,1);
                }
                else if (pad.className == "left") {
                    setLED(12,1);
                }
            };
        };

    for (i = 0; i < padbuttons.length; i += 1) {
        padbuttons[i].onmousedown = click;
        console.log(i);
    }
}());

(function () {
    'use strict';
    var canvas = document.getElementById('dpad-body');
    function angularShape(canvas, coords) {
        var shape = canvas.getContext('2d'), i = 0;
        shape.beginPath();
        shape.moveTo(coords[0][0], coords[0][1]);
        coords.slice(1);
        for (i = 0; i < coords.length; i += 1) {
            shape.lineTo(coords[i][0], coords[i][1]);
        }
        shape.closePath();
        return shape;
    }
    function linearFill(shape, color1, color2, coords) {
        var bg = shape.createLinearGradient(coords[0], coords[1], coords[2], coords[3]);
        bg.addColorStop(0, color1);
        bg.addColorStop(1, color2);
        shape.fillStyle = bg;
        shape.fill();
    }
    function ySide(canvas, y, xFrom, xTo) {
        var shape = angularShape(canvas, [
            [
                y,
                xFrom
            ],
            [
                y + 5,
                xFrom + 3.5
            ],
            [
                y + 5,
                xTo + 3.5
            ],
            [
                y,
                xTo
            ]
        ]);
        linearFill(shape, '#666', '#000', [
            y,
            xFrom,
            y + 15,
            xFrom
        ]);
    }
    function xSide(canvas, x, yFrom, yTo) {
        var shape = angularShape(canvas, [
            [
                yFrom,
                x
            ],
            [
                yFrom + 5,
                x + 3.5
            ],
            [
                yTo + 5,
                x + 3.5
            ],
            [
                yTo,
                x
            ]
        ]);
        linearFill(shape, '#666', '#000', [
            yFrom,
            x,
            yFrom,
            x + 15
        ]);
    }

    xSide(canvas, 63.5, 0, 100);
    xSide(canvas, 100, 36.5, 63.5);
    ySide(canvas, 63.5, 0, 36.5);
    ySide(canvas, 63.5, 63.5, 100);
    ySide(canvas, 100, 36.5, 63.5);

    var plus = angularShape(canvas, [
        [
            0,
            36.5
        ],
        [
            36.5,
            36.5
        ],
        [
            36.5,
            0
        ],
        [
            63.5,
            0
        ],
        [
            63.5,
            36.5
        ],
        [
            100,
            36.5
        ],
        [
            100,
            63.5
        ],
        [
            63.5,
            63.5
        ],
        [
            63.5,
            100
        ],
        [
            36.5,
            100
        ],
        [
            36.5,
            63
        ],
        [
            0,
            63.5
        ]
    ]);
    plus.fillStyle = '#1a1a1a';
    plus.shadowColor = 'rgba(0, 0, 0, 0.6)';
    plus.shadowBlur = 15;
    plus.shadowOffsetX = 20;
    plus.shadowOffsetY = 10;
    plus.fill();
}());


// Keypress Event
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            //alert('left');
	    setLED(12,1);
            break;
        case 38:
            //alert('up');
	    setLED(16,1);
            break;
        case 39:
            //alert('right');
	    setLED(11,1);
            break;
        case 40:
            //alert('down');
	    setLED(15,1);
            break;
    }
};

document.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:
            //alert('left');
            setLED(12,0);
            break;
        case 38:
            //alert('up');
            setLED(16,0);
            break;
        case 39:
            //alert('right');
            setLED(11,0);
            break;
        case 40:
            //alert('down');
            setLED(15,0);
            break;
    }
};