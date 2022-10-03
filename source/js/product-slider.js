$(function() {
  var MAX_SLIDES = 7

  var slide = 1
  var interval = null
  var progress = false
  var $counter = $('.js-product-slider-counter')
  var $slider = $('.js-product-slider');

  function startInterval() {
    interval = setInterval(next, 4000)
  }

  function stopInterval() {
    clearInterval(interval)
  }

  function decrement() {
    slide = slide - 1 < 1 ? MAX_SLIDES : slide - 1

    $counter.text(String(slide).padStart(2, '0'))
  }

  function increment() {
    slide = slide + 1 > MAX_SLIDES ? 1 : slide + 1

    $counter.text(String(slide).padStart(2, '0'))
  }

  function getSlides(filter) {
    if (filter) {
      return $slider.find('.js-product-slider-slide').filter(filter)
    } else {
      return $slider.find('.js-product-slider-slide')
    }
  }

  function setPosition($target, $relative) {
    $target.css({
      position: 'absolute',
      top: $relative.offset().top - $target.offsetParent().offset().top,
      left: $relative.offset().left - $target.offsetParent().offset().left,
    })
  }

  function resetPosition($target) {
    $target.css({ position: '', top: '', left: '' })
  }

  function moveSlides(type) {
    getSlides(':not([data-slide-index="current"])').each(function(index, el) {
      var $el = $(el)
      var index = Number($el.attr('data-slide-index'))
      var indexes = { left: index - 1, right: index + 1 }
  
      $el.attr('data-slide-index', indexes[type])
    })
  }

  function replaceSlidesToLeft() {
    var $first = getSlides().first().remove()

    $first.attr('data-slide-index', MAX_SLIDES - 1)
    $first.removeClass('expanded')
    $first.removeClass('old')

    $slider.append($first)
  }

  function replaceSlidesToRight() {
    var $last = getSlides().last().remove()

    $last.attr('data-slide-index', 'current')
    $last.addClass('expanded')
    $last.addClass('old')

    $slider.prepend($last)
  }

  function next() {
    if (progress) {
      return
    }

    progress = true;

    var $currentSlide = getSlides('[data-slide-index="current"]')
    var $nextSlide = getSlides('[data-slide-index="1"]')
    var $image = $nextSlide.find('.js-product-slider-image')

    $('.js-product-info').removeClass('active')

    setPosition($image, $image);

    $image.one('transitionend', function() {
      increment()
      moveSlides('left')
      replaceSlidesToLeft()

      $('.js-product-info[data-info-index=' + slide + ']').addClass('active')

      progress = false
    })

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $currentSlide.addClass('old')
        $nextSlide.attr('data-slide-index', 'current')
        $nextSlide.addClass('expanded')
        resetPosition($image)
      })
    })
  }

  function prev() {
    if (progress) {
      return
    }

    progress = true

    var $currentSlide = getSlides('[data-slide-index="current"]')
    var $nextSlide = getSlides('[data-slide-index="1"]')
    var $currentImage = $currentSlide.find('.js-product-slider-image')
    var $nextImage = $nextSlide.find('.js-product-slider-image')

    $('.js-product-info').removeClass('active')

    setPosition($currentImage, $nextImage)
    $currentSlide.removeClass('expanded')

    replaceSlidesToRight()
    moveSlides('right')

    $currentImage.one('transitionend', function() {
      decrement()
      resetPosition($currentImage)

      $('.js-product-info[data-info-index=' + slide + ']').addClass('active')

      progress = false
    })

    requestAnimationFrame(function () {
      getSlides('.old').removeClass('old')
      $currentSlide.attr('data-slide-index', 1)
    })
  }

  $('.js-product-slider-next').on('click', next)
  $('.js-product-slider-prev').on('click', prev)

  $('.js-product-slider-next, .js-product-slider-prev').on('mouseenter', function () {
    stopInterval()
  })

  $('.js-product-slider-next, .js-product-slider-prev').on('mouseleave', function () {
    startInterval()
  });

  startInterval()
});
