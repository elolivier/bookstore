$(function () {

  $.getJSON("https://api.myjson.com/bins/udbm5", function(booksData) {
    var books = booksData.books;
    uploadBooks(books);
  
    //-----------------Search Engine----------------

    var qsRegex;

    // init Isotope
    var $grid = jQuery('.grid').isotope({
      itemSelector: '.grid-item',     
      masonry: {
        columnWidth: 0,
        isFitWidth: true
      },
      filter: function() {
        return qsRegex ? jQuery(this).text().match( qsRegex ) : true;
      }
    });

    // use value of search field to filter
    var $quicksearch = jQuery('.quicksearch').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      $grid.isotope();
    }, 200 ) );

    // debounce so filtering doesn't happen every millisecond
    function debounce( fn, threshold ) {
      var timeout;
      return function debounced() {
        if ( timeout ) {
          clearTimeout( timeout );
        }
        function delayed() {
          fn();
          timeout = null;
        }
        timeout = setTimeout( delayed, threshold || 100 );
      }
    }
  });
});

//-----------------Upload books----------------
function uploadBooks(books) {
  $(books).each(function(index, book) {
    var divBook = '';
    divBook += '<div class="flip-container grid-item"><div class="flipper">';
    
    divBook += '<div class="front p-imagen"><a href="' + book.detalle + 
    '" data-fancybox="group1" data-type="image"><img class="image" src="' + book.portada + '"/></a></div>';
    
    divBook += '<div class="back"><p><b>Title: </b>' + book.titulo + 
    '<br><b> Description: </b>' + book.descripcion + '</p>';

    divBook += '<div id="buttons" class="row"><input id="more-info" class="col-xs-5 pull-bottom-l" type="submit" value="More info">';
    divBook += '<input id="add-product" class="col-xs-5 pull-bottom-r" type="submit" value="Add To Cart"></div>';

    divBook += '</div></div></div>';
    $('.grid').append(divBook);
  });
}
