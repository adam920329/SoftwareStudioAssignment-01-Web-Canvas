var mode = "";
var fillmode = false;
var canvas = document.getElementById("Canvas1");
var frame = document.getElementById("mycanvas");
var tool = document.getElementById("tool");
canvas.width = window.innerWidth / 2 + 250;
canvas.height = window.innerHeight - 30;
var ctx = canvas.getContext('2d');
var x1, y1;
var x2, y2;
var x_fit, y_fit;
var saved = new Image();
var redo = new Array();
var undo = new Array();


function change_mode(value) {
    if (value != "fill") canvas.style.cursor = "url('pic/" + value + "_cmp.png'),auto";
    if (mode == "") {
        var change1 = document.getElementById(value);
        change1.style.backgroundColor = "gray";
        mode = value;
    } else if (value == "fill") {
        var change = document.getElementById("fill");
        if (fillmode == false) {
            change.style.backgroundColor = "gray";
        } else {
            change.style.backgroundColor = "transparent";
        }
        fillmode = !fillmode;
    } else {
        var change1 = document.getElementById(value);
        var change2 = document.getElementById(mode);
        change2.style.backgroundColor = "transparent";
        change1.style.backgroundColor = "gray";
        mode = value;
    }
    //mode = value;
}
function click_mode(value) {
    switch (value) {
        case "clear":
            clear();
            break;
        case "reset":
            reset();
            break;
        case "undo":
            myundo();
            break;
        case "redo":
            myredo();
            break;
        case "image_upload":
            //console.log("upload and save");
            image_upload();
            break;
        case "download":
            download();
            break;
        default:
    }
}
//mode


var ismousedown = false;
canvas.addEventListener("mousedown", function (e) {
    ismousedown = true;
    saved.src = canvas.toDataURL();
    x1 = e.offsetX;
    y1 = e.offsetY;
    x_fit = e.offsetX;
    y_fit = e.offsetY;
    if (ismousedown) {
        draw(e);
    }
})
canvas.addEventListener("mousemove", function (e) {
    if (ismousedown) {
        draw(e);
    }
    x1 = e.offsetX;
    y1 = e.offsetY;
})
canvas.addEventListener("mouseup", function () {
    if (ismousedown) {
        if (mode != "text" && mode != "upload_image" && mode != "picker") {
            //console.log("mouseup and save")
            var tmp = new Image;
            tmp.src = canvas.toDataURL();
            undo.push(tmp);
            redo = new Array();
        }
    }
    ismousedown = false;
})

canvas.addEventListener("mouseout", function () {
    if (ismousedown) {
        if (mode != "text" && mode != "upload_image" && mode != "picker") {
            //console.log("mouseout and save")
            var tmp = new Image;
            tmp.src = canvas.toDataURL();
            undo.push(tmp);
            redo = new Array();
        }
    }
    ismousedown = false;
})
var haveinput = false;
var input;
ctx.textBaseline = 'top';
ctx.textAlign = 'left';
canvas.addEventListener("click", function (e) {
    if (mode == "text") {
        if (haveinput == true) {
            document.body.removeChild(input);
            haveinput = false;
        }
        input = document.createElement('input');
        input.type = 'text';
        input.style.position = 'fixed';
        input.style.left = e.clientX + "px";
        input.style.top = e.clientY + "px";
        var nowx = e.offsetX;
        var nowy = e.offsetY;
        document.body.appendChild(input);
        haveinput = true;
        input.focus();
        input.addEventListener("keydown", function (e) {
            if (e.keyCode === 13) {
                ctx.font = document.getElementById("fontSize").value + "px " + document.getElementById("fontSelect").value;
                ctx.fillText(input.value, nowx, nowy);
                var tmp = new Image;
                tmp.src = canvas.toDataURL();
                undo.push(tmp);
                redo = new Array();
                document.body.removeChild(input);
                haveinput = false;
            }
        })
        tool.addEventListener("click", function () {
            if (haveinput == true) document.body.removeChild(input);
            haveinput = false;
        })
    } else if (mode == "picker") {
        pickernow(e);
    }
})


//event
function draw(e) {
    x2 = e.offsetX;
    y2 = e.offsetY;
    ctx.lineWidth = document.getElementById("Rangechange").value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color.style.backgroundColor;
    ctx.fillStyle = color.style.backgroundColor;
    switch (mode) {
        case "pencil":
            pencil();
            break;
        case "eraser":
            eraser();
            break;
        case "rainbow":
            rainbow();
            break;
        case "ruler":
            ruler();
            break;
        case "circle":
            circle();
            break;
        case "rectangle":
            rectangle();
            break;
        case "triangle":
            triangle();
            break;
        default:
    }
}

function pencil() {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
var hue = 0;
function rainbow() {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `hsl(${hue}, 100%,  50%)`;
    if (hue >= 360) hue = 0;
    hue = hue + 3;
    ctx.stroke();
}
function eraser() {
    var len = document.getElementById("Rangechange").value;
    dx = (x2 - x1) / 1000;
    dy = (y2 - y1) / 1000;
    for (var i = 0; i < 1000; i++) {
        ctx.clearRect(x1 + dx * i, y1 + dy * i, len, len);
    }
}

function ruler() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(saved, 0, 0);
    ctx.beginPath();
    ctx.moveTo(x_fit, y_fit);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
function circle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(saved, 0, 0);
    ctx.beginPath();
    var r = Math.sqrt(Math.abs(x2 - x_fit) * Math.abs(x2 - x_fit) + Math.abs(y2 - y_fit) * Math.abs(y2 - y_fit));
    ctx.ellipse(x_fit, y_fit, r, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    if (fillmode) {
        ctx.fill();
    }
    ctx.stroke();
}
function rectangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(saved, 0, 0);
    ctx.beginPath();
    ctx.rect(x_fit, y_fit, x2 - x_fit, y2 - y_fit);
    ctx.closePath();
    if (fillmode) {
        ctx.fill();
    }
    ctx.stroke();
}
function triangle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(saved, 0, 0);
    ctx.beginPath();
    ctx.moveTo(x_fit, y_fit);
    ctx.lineTo(x2, y2);
    ctx.lineTo(2 * x_fit - x2, y2);
    ctx.lineTo(x_fit, y_fit);
    ctx.closePath();
    if (fillmode) {
        ctx.fill();
    }
    ctx.stroke();
}
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var tmp = new Image;
    tmp.src = canvas.toDataURL();
    undo.push(tmp);
    redo = new Array();
}
function reset() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undo = new Array();
    redo = new Array();
}
function myundo() {
    if (undo.length > 0) {
        var p = new Image;
        p = undo[undo.length - 1];
        redo.push(p);
        undo.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (undo.length > 0) {
            var tmp = new Image;
            tmp = undo[undo.length - 1];
            ctx.drawImage(tmp, 0, 0);
        }
    }
}
function myredo() {
    if (redo.length > 0) {
        var n = new Image;
        n = redo[redo.length - 1];
        undo.push(n);
        redo.pop();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(n, 0, 0);
    }
}
function download() {
    var link = document.createElement('a');
    link.download = 'my.png';
    link.href = canvas.toDataURL();
    link.click();
}
function image_upload() {
    var imgInput = document.getElementById('imageInput');
    imgInput.addEventListener('change', function (e) {
        if (e.target.files) {
            var imageFile = e.target.files[0];
            //console.log('imageFile', imageFile);
            var reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = function (ev) {
                var myImage = new Image();
                myImage.src = ev.target.result;
                myImage.onload = function () {
                    var width = myImage.width;
                    var height = myImage.height;
                    while (width > canvas.width || height > canvas.height) {
                        width = width * 0.8;
                        height = height * 0.8;
                    }
                    ctx.drawImage(myImage, 0, 0, width, height);
                    var tmp = new Image;
                    tmp.src = canvas.toDataURL();
                    undo.push(tmp);
                    redo = new Array();
                }
            }
        }
    });
    imgInput.value = "";
}//undo redo修一下



var block = document.getElementById('colorselect');
var ctx1 = block.getContext('2d');
block.width = 200;
block.height = 200;
var width1 = block.width;
var height1 = block.height;

var line = document.getElementById('colorline');
var ctx2 = line.getContext('2d');
line.width = 20;
line.height = 200;
var width2 = line.width;
var height2 = line.height;

var color = document.getElementById('colornow');
var ctx3 = color.getContext('2d');
color.width = 75;
color.height = 75;
color.style.backgroundColor = "black";


var x = 0;
var y = 0;
var rgbaColor = 'rgba(255,0,0,1)';


ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height2);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.84, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();



ctx1.rect(0, 0, width1, height1);
gradient();

function gradient() {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width1, width1);

    var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);

    var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
}

line.addEventListener("click", function (e) {
    x = e.offsetX;
    y = e.offsetY;
    var data = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',1)';
    gradient();
})

block.addEventListener("mousedown", function (e) {
    ismousedown = true;
    colornow(e);
})

block.addEventListener("mousemove", function (e) {
    if (ismousedown) {
        colornow(e);
    }
})

block.addEventListener("mouseup", function (e) {
    ismousedown = false;
})

function colornow(e) {
    x = e.offsetX;
    y = e.offsetY;
    var data = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',1)';
    color.style.backgroundColor = rgbaColor;
}

var range = document.getElementById("Rangechange");
range.addEventListener("mousemove", function () {
    document.getElementById('show').innerHTML = range.value;
})

function pickernow(e) {
    x = e.offsetX;
    y = e.offsetY;
    var data = ctx.getImageData(x, y, 1, 1).data;
    var tmp = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + ',1)';
    color.style.backgroundColor = tmp;
    //console.log("123");
}