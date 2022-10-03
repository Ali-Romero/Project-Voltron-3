function initSliderMain() {
  $('[data-slider-main]').slick({
    arrows: false,
    variableWidth: true,
    slidesToShow: 3,
    dots: false,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          adaptiveHeight: true,
        }
      }
    ]
  })
}

function faqToggle() {
  $('.js-faq-click').on('click', function () {
    if ($(this).hasClass('faq-active')) {
      return
    }
    $('.js-faq-click').removeClass('faq-active')
    $('.js-faq-click').next('.js-faq-content').slideUp(400)
    $(this).toggleClass('faq-active')
    $(this).next('.js-faq-content').slideToggle(400)
  })
}

function setCurrentYear() {
  $('[data-current-year]').text(new Date().getFullYear())
}

function initAnimate() {
  var $elems = $('.animateBlockUp, .animateBlockDown, .animateBlockLeft, .animateBlockRight, .animateBlockIn');
  var winheight = $(window).height();

  $(window).scroll(function () {
    animate_elems();
  });

  function animate_elems() {
    wintop = $(window).scrollTop(); // calculate distance from top of window

    // loop through each item to check when it animates
    $elems.each(function () {
      $elm = $(this);

      if ($elm.hasClass('animated')) { return true; } // if already animated skip to the next item

      topcoords = $elm.offset().top; // element's distance from top of page in pixels

      if (wintop > (topcoords - (winheight * .75))) {
        // animate when top of the window is 3/4 above the element
        $elm.addClass('animated');
      }
    });
  } // end animate_elems()
}

$(document).ready(function() {
  setCurrentYear()
  initAnimate()
  initSliderMain()
  faqToggle()

  $("input").inputmask()
});
