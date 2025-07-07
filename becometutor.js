//Global Variables
let sliderOne, sliderTwo, displayValOne, displayValTwo, sliderTrack, sliderMaxValue;
const minGap = 0;

// On Page Load
document.addEventListener("DOMContentLoaded", () => {
  
  // Initialize global variables after DOM is ready
  sliderOne = document.getElementById("slider-1");
  sliderTwo = document.getElementById("slider-2");
  displayValOne = document.getElementById("range1");
  displayValTwo = document.getElementById("range2");
  sliderTrack = document.querySelector(".slider-track");
  sliderMaxValue = sliderOne.max;

  initToggleButtons();
  initSliders();
  handleFormSubmit();
  handleModalClose();
  initCertificateToggle();
  initEducationToggle();
});

//Toggle Buttons
function initToggleButtons() {
  const allButtons = document.querySelectorAll(
    ".select_buttons_days button, .select_buttons_times button, .select_buttons_lang button"
  );
  allButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      button.classList.toggle("selected");
    });
  });
}

//Sliders
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
  const percent1 = ((sliderOne.value - sliderOne.min) / (sliderMaxValue - sliderOne.min)) * 100;
  const percent2 = ((sliderTwo.value - sliderOne.min) / (sliderMaxValue - sliderOne.min)) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}%, #3264fe ${percent1}%, #007bff ${percent2}%, #dadae5 ${percent2}%)`;
}

//Form Submission & Modal Logic
function handleFormSubmit() {
  const form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const daysSelected = document.querySelectorAll(".select_buttons_days button.selected").length > 0;
    const timesSelected = document.querySelectorAll(".select_buttons_times button.selected").length > 0;

    if (!daysSelected || !timesSelected) {
      alert("Please fill all required selections (days and times).");
      return;
    }

    const selectedSubject = document.getElementById("select-option").value;
    const nativeLang = document.getElementById("language").value;

    const selectedExtraLangs = [];
    const selectedButtons = document.querySelectorAll(".select_buttons_lang button.selected");

    for (let i = 0; i < selectedButtons.length; i++) {
      selectedExtraLangs.push(selectedButtons[i].textContent);
    }

    let fullLanguageText = nativeLang;
    if (selectedExtraLangs.length > 0) {
      fullLanguageText += ", " + selectedExtraLangs.join(", ");
    }

    document.getElementById("selected-subject-text").textContent = selectedSubject;
    document.getElementById("selected-lang-text").textContent = fullLanguageText;

    document.getElementById("thankYouPopup").style.display = "block";
  });
}

function handleModalClose() {
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", () => {
    document.getElementById("thankYouPopup").style.display = "none";
    document.getElementById("form").reset();

    const allSelectedButtons = document.querySelectorAll(".selected");
    allSelectedButtons.forEach((btn) => btn.classList.remove("selected"));

    localStorage.removeItem("preferedLang");
    localStorage.removeItem("selectedSubject");

    window.location.href = "index.html";
  });
}

function initCertificateToggle(){
  const checkbox = document.getElementById("checkbox1");
  const certificateInput = document.getElementById("fill-certificate");
  
  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;

    certificateInput.disabled = isChecked;
    certificateInput.required = !isChecked;
    document.getElementById("tutorChoice").disabled = isChecked;
  });

}

function initEducationToggle(){
  const checkbox = document.getElementById("checkbox2");
  const university = document.getElementById("university");
  const degree = document.getElementById("degree");
  const specialization = document.getElementById("specialization");
  
  checkbox.addEventListener("change", () => {
    const isChecked = checkbox.checked;

    university.disabled = isChecked;
    degree.disabled = isChecked;
    specialization.disabled = isChecked;

    university.required = !isChecked;
    degree.required = !isChecked;
    specialization.required = !isChecked;

    document.getElementById("degreeType").disabled = isChecked;

  });
}

