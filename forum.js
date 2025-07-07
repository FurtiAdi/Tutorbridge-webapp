$(document).ready(function () {
  // Global variables
  let sliderOne = document.getElementById("slider-1");
  let sliderTwo = document.getElementById("slider-2");
  let displayValOne = document.getElementById("range1");
  let displayValTwo = document.getElementById("range2");
  let sliderTrack = document.querySelector(".slider-track");
  let sliderMaxValue = sliderOne.max;
  let minGap = 0;

  // Iniatiate the methods

  initToggleButtons();
  initSliders();
  handleFormSubmit();
  handleModalClose();

  //Functions

  function initToggleButtons() {
    $('.select_buttons_days button, .select_buttons_times button, .select_buttons_lang button').on('click', function (e) {
      e.preventDefault();
      $(this).toggleClass('selected');
    });
  }

  function initSliders() {
    sliderOne.addEventListener("input", slideOne);
    sliderTwo.addEventListener("input", slideTwo);
    slideOne();
    slideTwo();
  }

  function slideOne() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderOne.value = parseInt(sliderTwo.value) - minGap;
    }
    displayValOne.textContent = sliderOne.value;
    fillSliderTrack();
  }

  function slideTwo() {
    if (parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
      sliderTwo.value = parseInt(sliderOne.value) + minGap;
    }
    displayValTwo.textContent = sliderTwo.value;
    fillSliderTrack();
  }

  function fillSliderTrack() {
    let percent1 = ((sliderOne.value - sliderOne.min) / (sliderMaxValue - sliderOne.min)) * 100;
    let percent2 = ((sliderTwo.value - sliderOne.min) / (sliderMaxValue - sliderOne.min)) * 100;
    sliderTrack.style.background = `linear-gradient(to right
                                  , #dadae5 ${percent1}%
                                  , #3264fe ${percent1}%
                                  , #007bff ${percent2}%
                                  , #dadae5 ${percent2}%)`;
  }

  function handleFormSubmit() {
    $('#form').on('submit', function (e) {
      const goalSelected = $('input[name="goal"]:checked').length > 0;
      const levelSelected = $('input[name="level"]:checked').length > 0;
      const daysSelected = $('.select_buttons_days button.selected').length > 0;
      const timesSelected = $('.select_buttons_times button.selected').length > 0;

      if (!goalSelected || !levelSelected || !daysSelected || !timesSelected) {
        alert('Please fill all required selections (goal, level, days, and times).');
        e.preventDefault();
        return;
      }

      e.preventDefault(); // Prevent actual submission

      const lang = localStorage.getItem("preferedLang") || "your selected language";
      const subject = localStorage.getItem("selectedSubject") || "your chosen subject";

      $('#selected-lang-text').text(lang);
      $('#selected-subject-text').text(subject);
      $('#thankYouPopup').fadeIn();
    });
  }

  function handleModalClose() {
    $('.close').on('click', function () {
      $('#thankYouPopup').fadeOut(() => {
        $('#form')[0].reset();
        $('.select_buttons_days button, .select_buttons_times button, .select_buttons_lang button').removeClass('selected');
        localStorage.removeItem("preferedLang");
        localStorage.removeItem("selectedSubject");
        window.location.href = 'index.html';
      });
    });
  }
});
