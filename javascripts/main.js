$(function () {

    var contentBaseUrl = 'content/';// 'https://c0901e6dae268d1d3023e19225e875d0794d7fc2.googledrive.com/host/0B-97c_xa0AumY002cnJ1U1FueGc/';

    var layers = ['home', 'about', 'portfolio'];
    var activeLayer = layers[0];
    layers.forEach(function(layer) {
        $('#' + layer + '-link').click(function() {
            if(activeLayer != layer) {
                $('.' + activeLayer).fadeOut(300, function() {
                    $('.' + layer).fadeIn(300);
                    $('#' + layer + '-link').addClass('active-layer');
                    $('#' + activeLayer + '-link').removeClass('active-layer');
                    activeLayer = layer;
                });
            }
        });
    });



    $.ajax({
        type: 'GET',
        url: contentBaseUrl + 'about.txt',
        complete: function(response){
            $('#about-text').html(response.responseText.replace(/\n/g, '<br>'));
        }
    });

    var categories = ['location', 'studio', 'editorial', 'lifestyle'];
    categories.forEach(function(category) {
        loadImages(category, 1);
    });

    function loadImages(category, i) {
        var url = contentBaseUrl + category + '/' + i.toString() + '.jpg';
        fetchImage(url, function(img) {
            loadImages(category, i + 1);
            displayImage(img, category, i);
        });
    }

    function fetchImage(url, success, error) {
        var img = $("<img />").attr('src', url)
            .load(function() {
                if(!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
                    if(error) error(this);
                } else {
                    success(img);
                }
            });
    }

    function displayImage(img, category, i) {
        var indicator = $('<li data-target="#carousel-' + category + '" data-slide-to="' + (i - 1).toString() + '"' + (i == 1 ? ' class="active"' : '') + '></li>');
        $('#carousel-' + category).find('.carousel-indicators').append(indicator);
        var item = $('<div class="item' + (i == 1 ? ' active' : '') + '"></div>');
        item.append(img);
        $('#carousel-' + category).find('.carousel-inner').append(item);
    }

});
