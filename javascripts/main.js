$(function () {

    var categories = ['location', 'studio', 'editorial', 'lifestyle'];
    categories.forEach(function(category) {
        loadImages(category, 1);
    });

    function loadImages(category, i) {
        var url = 'https://c0901e6dae268d1d3023e19225e875d0794d7fc2.googledrive.com/host/0B-97c_xa0AumY002cnJ1U1FueGc/' + category + '/' + i.toString() + '.jpg';
        fetchImage(url, function(img) {
            loadImages(category, i + 1);
            deployImage(img, category, i);
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

    function deployImage(img, category, i) {
        var indicator = $('<li data-target="#carousel-' + category + '" data-slide-to="' + (i - 1).toString() + '"' + (i == 1 ? ' class="active"' : '') + '></li>');
        $('#carousel-' + category).find('.carousel-indicators').append(indicator);
        var item = $('<div class="item' + (i == 1 ? ' active' : '') + '"></div>');
        item.append(img);
        $('#carousel-' + category).find('.carousel-inner').append(item);
    }

});
