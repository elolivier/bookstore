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
    
    divBook += '<div class="front"><img src="' + book.portada + '" alt="book cover"></div>';
    
    divBook += '<div class="back"><p><b>Title: </b>' + book.titulo + 
    '<br><b> Description: </b>' + book.descripcion + '</p>';

    divBook += '<div id="buttons" class="row"><a id=' + index + ' href="javascript:;" class="btn col-xs-5 pull-bottom-l">More info</a>';
    divBook += '<input id="add-product" class="btn col-xs-5 pull-bottom-r" type="submit" value="Add To Cart"></div>';

    divBook += '</div></div></div>';
    $('.grid').append(divBook);
    var id = '#'+index;
    $(id).on('click', function() {
      $.fancybox.open(
        {
          src  : book.detalle,
          opts : {
            caption : 'Title: ' + book.titulo + '. Description: ' + book.descripcion,
            thumb   : book.detalle
          }
        }
      );
    });
  });
}
