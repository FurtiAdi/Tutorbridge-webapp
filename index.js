document.addEventListener ("DOMContentLoaded", ()=>{
  const getStartedbutton = document.querySelector(".get-started");
  const becomeTutorbutton = document.querySelector(".become_tutor_button");
  const findTutorBtn = document.querySelectorAll(".tutor-list-item a");

  // Clear previous ssaving when navigating back happens
  localStorage.removeItem("selectedTutorLanguage");
  localStorage.removeItem("selectedSubject");
  
   // Get Started button click
   if (getStartedbutton) {
    getStartedbutton.addEventListener("click", () => {
      window.location.href = "tutors.html";
    });
  }

   // Become a tutor button click
   if (becomeTutorbutton) {
    becomeTutorbutton.addEventListener("click", () => {
      window.location.href = "becometutor.html";
    });
  }

  // Find Tutor link clicks
  findTutorBtn.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const language = link.textContent.trim().split(" ")[0];
      localStorage.setItem("selectedTutorLanguage", language);
      window.location.href = "tutors.html";
    });
  });
});