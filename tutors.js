document.addEventListener("DOMContentLoaded", () => {
  const selectedLang = localStorage.getItem("selectedTutorLanguage");
  const tutorLangChoice = document.getElementById("tutorChoice1");
  const subjectDropdown = document.getElementById("tutorChoice");

  
  const tutorChoiceDisplay = document.getElementById("tutorChoiceDisplay");
  const tutorLangDisplay = document.getElementById("tutor_lang");
  const getStartedBtn = document.querySelector(".get-started");
  
  if (selectedLang) {
    // Show selected language in title
    if (tutorLangDisplay) {
      tutorLangDisplay.textContent = selectedLang;
    }
    if (tutorChoiceDisplay) {
      tutorChoiceDisplay.style.display = "none";
    }
  } else {
    // Show dropdown if no language is selected
    if (tutorLangDisplay) tutorLangDisplay.textContent = "";
    if (tutorChoiceDisplay) tutorChoiceDisplay.style.display = "";
  }
  // Get Started button behavior
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      const selectedSubject = subjectDropdown.value.trim();
       //save selected lang and subject
      if(selectedLang){
        localStorage.setItem("preferedLang", selectedLang);
        localStorage.removeItem("selectedTutorLanguage");
      } else{
        const selectedLanguage = tutorLangChoice.value.trim();
        localStorage.setItem("preferedLang", selectedLanguage);
      }
      localStorage.setItem("selectedSubject", selectedSubject);
      window.location.href = "forum.html";
    });
  }
});
