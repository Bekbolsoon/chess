document.addEventListener('DOMContentLoaded', function () {

  function slide(wrapper, items, prev, next) {
    let posInitial,
      slides = items.querySelectorAll('.parts-slider__slide'),
      slidesLength = slides.length,
      gapSlides = parseInt(getComputedStyle(items)['row-gap']),
      slideSize = slides[0].offsetWidth + gapSlides,
      index = 0,
      allowShift = true;

    cloneSlides(items, slides, 2);

    items.style.left = (-slidesLength * slideSize) + "px";
    wrapper.classList.add('loaded');

    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    function shiftSlide(dir, action) {
      items.classList.add('shifting');

      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }

        if (dir == 1) {
          items.style.left = (posInitial - slideSize) + "px";
          index++;
        } else if (dir == -1) {
          items.style.left = (posInitial + slideSize) + "px";
          index--;
        }
      };

      allowShift = false;
    }

    function checkIndex() {
      items.classList.remove('shifting');
      currentSlideNumber.textContent = index + 1;

      if (index == -1) {
        items.style.left = -((slidesLength - 1) * slideSize) + "px";
        index = slidesLength - 1;
        currentSlideNumber.textContent = index + 1;
      }

      if (index == slidesLength) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = 0;
        currentSlideNumber.textContent = index + 1;
      }

      allowShift = true;
    }

    function cloneSlides(items, slidesArray, times) {
      for (let i = 0; i < times; i++) {
        slidesArray.forEach(slide => {
          const clone = slide.cloneNode(true);
          clone.classList.add('clone');
          items.appendChild(clone);
        });
      }
    }
  }

  let slider = document.getElementById('parts-slider'),
    sliderItems = document.getElementById('parts-slider__slides'),
    prevButton = document.getElementById('parts-slider__arrow-left'),
    nextButton = document.getElementById('parts-slider__arrow-right'),
    currentSlideNumber = document.querySelector('.parts-slider__current-slide');
  slide(slider, sliderItems, prevButton, nextButton);

  function initSlider() {
    slider = document.getElementById('parts-slider');
    sliderItems = document.getElementById('parts-slider__slides');
    prevButton = document.getElementById('parts-slider__arrow-left');
    nextButton = document.getElementById('parts-slider__arrow-right');
    currentSlideNumber = document.querySelector('.parts-slider__current-slide');

    const clones = sliderItems.querySelectorAll('.parts-slider__slide.clone');
    clones.forEach(clone => clone.remove());

    slide(slider, sliderItems, prevButton, nextButton);
  }

  initSlider();

  window.addEventListener('resize', function () {
    initSlider();
  });

  if (window.innerWidth <= 566) {
    let sliderStages = document.getElementById('stages-slider'),
      sliderItemsStages = document.getElementById('stages-slider__slides'),
      prevButtonStages = document.getElementById('stages-slider__arrow-left'),
      nextButtonStages = document.getElementById('stages-slider__arrow-right'),
      paginationStages = document.getElementById('stages-slider__pagination');

    slideStages(sliderStages, sliderItemsStages, prevButtonStages, nextButtonStages, paginationStages);

    function slideStages(wrapper, items, prev, next, pagination) {
      let posInitial,
        slides = items.querySelectorAll('.stages-slider__slide'),
        slidesLength = slides.length,
        gapSlides = parseInt(getComputedStyle(items)['row-gap']),
        slideSize = slides[0].offsetWidth + gapSlides,
        index = 0,
        allowShift = true,
        dotsPagination = pagination.querySelectorAll('.stages-slider__dot-pag');

      items.style.left = 0 + "px";
      wrapper.classList.add('loaded');

      // Click events
      prev.addEventListener('click', function () { shiftSlide(-1); });
      next.addEventListener('click', function () { shiftSlide(1); });

      // Transition events
      items.addEventListener('transitionend', checkIndex);

      function shiftSlide(dir, action) {
        if (allowShift) {
          posInitial = items.offsetLeft;

          if (dir == 1) {
            if (index == slidesLength - 1) {
              return;
            }
            dotsPagination[index].classList.remove('active');
            items.style.left = (posInitial - slideSize) + "px";
            index++;
          } else if (dir == -1) {
            if (index == 0) {
              return;
            }
            dotsPagination[index].classList.remove('active');
            items.style.left = (posInitial + slideSize) + "px";
            index--;
          }
        }

        items.classList.add('shifting');
        allowShift = false;
      }

      function checkIndex() {
        prev.classList.remove('disable');
        next.classList.remove('disable');
        items.classList.remove('shifting');

        if (index == 0) {
          prev.classList.add('disable');
        }
        if (index == slidesLength - 1) {
          next.classList.add('disable');
        }

        if (index == -1) {
          items.style.left = "0px";
          index = 0;
          dotsPagination[index].classList.add('active');
        }

        if (index == slidesLength) {
          items.style.left = -((slidesLength - 1) * slideSize) + "px";
          index = slidesLength - 1;
          dotsPagination[index].classList.add('active');
        }

        dotsPagination[index].classList.add('active');
        allowShift = true;
      }
    }
  }
});