var input = document.querySelector("input");
var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

input.addEventListener("click", () => {
    input.value = "";
})

input.addEventListener("change", () => {
    var reader = new FileReader();
    var file = input.files[0];
    if (file) {
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.onload = function () {
                // Resize the image to a fixed width
                var maxWidth = 300; // Adjust this value as needed
                var scaleFactor = maxWidth / img.width;
                var newHeight = img.height * scaleFactor;
                canvas.width = maxWidth;
                canvas.height = newHeight;
                ctx.drawImage(img, 0, 0, maxWidth, newHeight); // Draw the resized image
            }
        }
    }
});

var brightness = [" ", ".", "'", "`", "^", '"', ",", ":", ";", "I", "l", "!", "i", ">", "<", "~", "+", "_", "-", "?", "]", "[", "}", "{", "1", ")", "(", "|", "\\", "/", "t", "f", "j", "r", "x", "n", "u", "v", "c", "z", "X", "Y", "U", "J", "C", "L", "Q", "0", "O", "Z", "m", "w", "q", "p", "d", "b", "k", "h", "a", "o", "*", "#", "M", "W", "&", "8", "%", "B", "@", "$"];

function generate() {
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var grayscale = (red + green + blue) / 3;
        data[i] = grayscale;
        data[i + 1] = grayscale;
        data[i + 2] = grayscale;
    }
    ctx.putImageData(imageData, 0, 0);
}

var arr = [[]];
var cover = document.getElementById("cover");
var p = cover.querySelector("pre");

function show() {
    arr.forEach((e, i) => {
        e.forEach(ex => {
            p.innerHTML += ex;
        })
        p.innerHTML += "\n";
    })

    cover.style.display = "flex";
}


function ascii() {
    // generate();
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    var asciiArt = '';

    for (var i = 0; i < data.length; i += 4) {
        var red = data[i];
        var green = data[i + 1];
        var blue = data[i + 2];
        var grayscale = (red + green + blue) / 3;
        var asciiIndex = Math.floor(((255 - grayscale) / 255) * (brightness.length - 1));
        asciiArt += brightness[asciiIndex];
        if ((i / 4 + 1) % canvas.width === 0) {
            asciiArt += '\n';
        }

        // color
        /*
         asciiArt += '<span style="color:rgb('+red+','+green+','+blue+');">'+brightness[asciiIndex]+'</span>';
        if ((i / 4 + 1) % canvas.width === 0) {
            asciiArt += '</br>';
        }
        */
    }

    // Display ASCII art
    cover.style.display = "flex";
    p.textContent = asciiArt;
    // color
    // p.innerHTML = asciiArt;
}


var close = document.querySelector("#cover div svg");
close.addEventListener("click", ()=>{
    cover.style.display = "none";
})