document.addEventListener("DOMContentLoaded", function () {

  const fullNameEl = document.getElementById("full-name");
  const ageEl = document.getElementById("age");
  const emailLinkEl = document.getElementById("email-link");
  const ratingVotesEl = document.getElementById("rating-votes");
  const profileTextEl = document.getElementById("profile-text");
  const profilePhotoEl = document.getElementById("profile-photo");

  fetch("cv-data.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("cv-data.json ei leitud");
      }
      return response.json();
    })
    .then(data => {

      // Nimi
      const fullName = `${data.firstName} ${data.lastName}`;
      if (fullNameEl) {
        fullNameEl.textContent = fullName;
      }

      // Vanus
      if (ageEl && typeof data.age === "number") {
        ageEl.textContent = `${data.age} aastane`;
      }

      // E-post
      if (emailLinkEl && data.email) {
        emailLinkEl.textContent = data.email;
        emailLinkEl.href = `mailto:${data.email}`;
      }

      // Reitingu häälte arv
      if (ratingVotesEl && data.rating && data.rating.votes) {
        ratingVotesEl.textContent = `(${data.rating.votes})`;
      }

      // Profiilitekst
      if (profileTextEl && data.profileText) {
        profileTextEl.textContent = data.profileText;
      }

      // Pildikarusselli andmed
      let images = [];
      if (Array.isArray(data.images) && data.images.length > 0) {
        images = data.images;
      } else {
        images = ["img/sethrogen.png"];
      }

      let currentIndex = 0;

      if (profilePhotoEl) {

        profilePhotoEl.src = images[currentIndex];

      
        profilePhotoEl.style.cursor = "pointer";

        profilePhotoEl.addEventListener("click", function () {
          currentIndex = (currentIndex + 1) % images.length;
          profilePhotoEl.src = images[currentIndex];
        });
      }
    })
    .catch(error => {
      console.error("Viga JSON-i laadimisel:", error);
    });
});
