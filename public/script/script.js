$(document).ready(function () {

    var canvas = document.getElementById('quoteCanvas');
    ctx = canvas.getContext('2d');

    // core drawing function
    var drawQuote = function () {
        var img = document.getElementById('start-image');

        var fontSize = parseInt($('#text_font_size').val());
        var canvasSize = 500;

        $('#text_top_offset').attr('max', canvasSize);
        $('#text_bottom_offset').attr('max', canvasSize);

        // initialize canvas element with desired dimensions
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
        ctx.font = fontSize + 'pt sans-serif';
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';

        var text1 = $('#text_top').val();
        text1 = text1.toUpperCase();
        x = canvasSize / 2;
        y = parseInt($('#text_top_offset').val());

        var lineHeight = fontSize + parseInt($('#text_line_height').val());
        var maxTextAreaWidth = canvasSize * 0.85;

        wrapText(ctx, text1, x, y, maxTextAreaWidth, lineHeight, false);

        ctx.textBaseline = 'bottom';
        var text2 = $('#text_bottom').val();
        text2 = text2.toUpperCase();
        y = parseInt($('#text_bottom_offset').val());

        wrapText(ctx, text2, x, y, maxTextAreaWidth, lineHeight, true);

    };


    // build inner container for wrapping text inside
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
            context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
        }
    };

    // read random image from upload field and display it in browser
    var randomImage = function () {
        var rnum = Math.floor(Math.random() * 999);

        var source = 'https://picsum.photos/id/'+rnum+'/350.jpg';

        var image = new Image();
        image.onerror = function () {
            randomImage();
        };
        image.onload = function () {
            // $('#start-image').replaceWith(this);
            $('#start-image').attr('src', this.src);
            drawQuote();
        };
        
        image.src = source;
        console.log(source);
    }

    // read selected input image from upload field and display it in browser
    $("#imgInp").change(function () {
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
        drawQuote();
    });

    $(document).on('change keydown keyup', '#text_bottom', function () {
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

    $(document).on('input change', '#text_font_size', function () {
        $('#text_font_size__val').text($(this).val());
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

    $(document).on('click', '#randomImage', function () {
        randomImage();
    });



    // TODO: replace this with a server-side processing method 
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
