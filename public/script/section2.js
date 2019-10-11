$(document).ready(function () {

    let category_value;
    let canvas = document.getElementById('quoteCanvas');
    ctx = canvas.getContext('2d');

    // core drawing function
    const drawQuote = function () {
        var img = document.getElementById('start-image');
        var fontSize = parseInt($('#text_top_font_size').val());
        var canvasSize = $(".canvas-container").width();

        $('#text_top_offset').attr('max', canvasSize);
        $('#text_bottom_offset').attr('max', canvasSize);

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // calculate minimum cropping dimension
        var croppingDimension = img.height;
        if (img.width < croppingDimension) {
            croppingDimension = img.width;
        }

        ctx.drawImage(img, 0, 0, croppingDimension, croppingDimension, 0, 0, canvasSize, canvasSize);

        ctx.lineWidth = parseInt($('#text_stroke_width').val());
        ctx.lineJoin = 'round';
        ctx.font = fontSize + 'pt Arial';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        var textTop = '" ' + $('#text_top').val() + ' "';
        var x = canvasSize / 2;
        var y = parseInt($('#text_top_offset').val());

        var lineHeight = fontSize + parseInt($('#text_line_height').val());
        var maxTextAreaWidth = canvasSize * 0.85;

        wrapText(ctx, textTop, x, y, maxTextAreaWidth, lineHeight, false);

        ctx.textBaseline = 'bottom';
        var textBottom = '— ' + $('#text_bottom').val();
        y = parseInt($('#text_bottom_offset').val());

        wrapText(ctx, textBottom, x, y, maxTextAreaWidth, lineHeight, true);

    };


    //inner canvas for wrapping text
    const wrapText = function (context, text, x, y, maxWidth, lineHeight, fromBottom) {
        var pushMethod = (fromBottom) ? 'unshift' : 'push';

        lineHeight = (fromBottom) ? -lineHeight : lineHeight;

        var lines = [];
        var y = y;
        var line = '';
        var words = text.split(' ');

        for (var n = 0; n < words.length; n++) {
            var testLine = line + ' ' + words[n];
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;

            if (testWidth > maxWidth) {
                lines[pushMethod](line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines[pushMethod](line);

        for (var k in lines) {
            if (fromBottom) {
                var fontSize = parseInt($('#text_bottom_font_size').val());
                context.font = fontSize + 'pt sans-serif';
            }
            context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
        }
    };

    // read random image from upload field and display it in browser
    const randomImage = function () {
        var randomNum = Math.floor(Math.random() * 999);

        var source = 'https://picsum.photos/id/' + randomNum + '/500.jpg';

        var image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = source;
        image.onerror = function () {
            randomImage();
        };
        image.onload = function () {
            $('.canvas-container').css('position', 'relative');
            $('.canvas-container').css('z-index', 1000);
            $('#start-image').attr('src', this.src);
            drawQuote();
        };


        console.log(image.src);
    }


    //====================
    // Register event listeners
    //==================== 

    $(document).on('change keydown keyup', '#text_top', function () {
        $('#text_top2').val($(this).val());
        drawQuote();
    });

    $(document).on('change keydown keyup', '#text_bottom', function () {
        $('#text_bottom2').val($(this).val());
        drawQuote();
    });

    $(document).on('change keydown keyup', '#text_top2', function () {
        $('#text_top').val($(this).val());
        drawQuote();
    });

    $(document).on('change keydown keyup', '#text_bottom2', function () {
        $('#text_bottom').val($(this).val());
        drawQuote();
    });

    $(document).on('input change', '#text_top_offset', function () {
        $('#text_top_offset__val').text($(this).val());
        drawQuote();
    });

    $(document).on('input change', '#text_bottom_offset', function () {
        $('#text_bottom_offset__val').text($(this).val());
        drawQuote();
    });

    $(document).on('input change', '#text_top_font_size', function () {
        $('#text_top_font_size__val').text($(this).val());
        drawQuote();
    });

    $(document).on('input change', '#text_bottom_font_size', function () {
        $('#text_bottom_font_size__val').text($(this).val());
        drawQuote();
    });

    $(document).on('input change', '#text_line_height', function () {
        $('#text_line_height__val').text($(this).val());
        drawQuote();
    });

    $(document).on('input change', '#text_stroke_width', function () {
        $('#text_stroke_width__val').text($(this).val());
        drawQuote();
    });

    // get selected value from dropdown
    $("#category-select").change(function () {
        category_value = this.value;
    });

    // get a random image
    $('#random-image').click(function (e) {
        randomImage();
    });

    // save to server
    $('#save_quote').click(function (e) {
        if($("#category-select").value === undefined){
            // set ALERT to remind user to select a category
        }else{
            // api POST ---> apicall(category_value)
        }
    });

    // canvas save drawing as an image and download
    download_quote = function (e) {
        var image = canvas.toDataURL();
        e.href = image;
    };

    // read selected input image from upload field and display it in browser
    $("#image-upload").change(function () {
        var input = this;

        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#start-image').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }

        window.setTimeout(function () {
            drawQuote();
        }, 500);
    });

    //====================
    // Init at startup
    //==================== 
    window.setTimeout(function () {
        // drawQuote();
    }, 100);

});
