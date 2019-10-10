$(document).ready(function () {

    var canvas = document.getElementById('quoteCanvas');
    ctx = canvas.getContext('2d');

    // core drawing function
    var drawQuote = function () {
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

        var textTop = '" '+ $('#text_top').val() + ' "';
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
    var wrapText = function (context, text, x, y, maxWidth, lineHeight, fromBottom) {
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
            if(fromBottom){
                var fontSize = parseInt($('#text_bottom_font_size').val());
                context.font = fontSize + 'pt sans-serif';
            }
            context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
        }
    };

    // read random image from upload field and display it in browser
    var randomImage = function () {
        var randomNum = Math.floor(Math.random() * 999);

        var source = 'https://picsum.photos/id/'+randomNum+'/500.jpg';

        var image = new Image();
        image.onerror = function () {
            randomImage();
        };
        image.onload = function () {
            $('#start-image').attr('src', this.src);
            drawQuote();
        };
        
        image.src = source;
        console.log(source);
    }

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

    $('#random-image').click(function (e) {
        randomImage();
    });

    $('#download_quote').click(function (e) {
        $(this).attr('href', canvas.toDataURL());
        $(this).attr('download', 'quote.png');
    });


    //====================
    // Init at startup
    //==================== 
    window.setTimeout(function () {
        drawQuote();
    }, 100);

});
