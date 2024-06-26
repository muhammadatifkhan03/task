// Sample data for slider items
const sliderData = [
  {
    imageUrl: "assets/slider1.png",
    title: "Abbie Harvey 1",
    description:
      "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
  },
  {
    imageUrl: "assets/slider2.png",
    title: "Abbie Harvey 2",
    description:
      "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
  },
  {
    imageUrl: "assets/slider3.png",
    title: "Abbie Harvey 3",
    description:
      "I have been caring for my mom & dad off and on for about 10 years now, and I know the importance of me being there for appointments. Older people need attention, love and care that they truly deserve.",
  },
];

let slideIndex = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("businessEmail");
  const companyInput = document.getElementById("company");
  const countrySelect = document.getElementById("country");

  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const emailError = document.getElementById("emailError");
  const companyError = document.getElementById("companyError");
  const countryError = document.getElementById("countryError");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let isValid = true;

    hideAllErrors();

    if (!validateField(firstNameInput, firstNameError, "First Name")) {
      isValid = false;
    } else if (!validateField(lastNameInput, lastNameError, "Last Name")) {
      isValid = false;
    } else if (!validateField(emailInput, emailError, "Business Email")) {
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      showError(emailInput, emailError, "Please enter a valid Business Email");
      isValid = false;
    } else if (!validateField(companyInput, companyError, "Company")) {
      isValid = false;
    } else if (!validateField(countrySelect, countryError, "Country")) {
      isValid = false;
    }

    if (isValid) {
      showThankYouModal();
      form.reset();
    } else {
      showPopupMessage("Please fill out all required fields correctly.");
    }
  });

  function validateField(input, errorElement, fieldName) {
    if (!input.value.trim()) {
      showError(
        input,
        errorElement,
        `This field can’t be empty. Please fill it in.`
      );
      input.classList.add("error");
      input.focus();
      return false;
    } else {
      hideError(errorElement);
      input.classList.remove("error");
      return true;
    }
  }
  function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
    input.classList.add("error");
  }

  function hideError(errorElement) {
    errorElement.style.display = "none";
  }

  function hideAllErrors() {
    hideError(firstNameError);
    hideError(lastNameError);
    hideError(emailError);
    hideError(companyError);
    hideError(countryError);

    firstNameInput.classList.remove("error");
    lastNameInput.classList.remove("error");
    emailInput.classList.remove("error");
    companyInput.classList.remove("error");
    countrySelect.classList.remove("error");
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function showThankYouModal() {
    window.location.href = "thankyou.html";
  }

  function showPopupMessage(message) {
    const popupMessage = document.createElement("div");
    popupMessage.classList.add("custom-popup-message");
    popupMessage.textContent = message;
    document.body.appendChild(popupMessage);

    setTimeout(() => {
      popupMessage.remove();
    }, 3000);
  }

  document.getElementById("country").addEventListener("change", function () {
    if (this.value) {
      this.classList.add("selected");
    } else {
      this.classList.remove("selected");
    }
  });

  const inputs = [
    firstNameInput,
    lastNameInput,
    emailInput,
    companyInput,
    countrySelect,
  ];

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const errorElement = document.getElementById(`${input.id}Error`);
      hideError(errorElement);
      input.classList.remove("error");
    });
  });
});

function initSlider() {
  const slidesContainer = document.getElementById("slides");
  const indicatorsContainer = document.getElementById("indicators");

  sliderData.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide", "hidden-slide");
    slide.innerHTML = `
      <img class='user_img' src="${item.imageUrl}" alt="${item.title}">
      <div class='img-slide'>
        <div class='quotes_div'>
          <h3>${item.title}</h3>
          <img class='quotes_img' src="assets/quotes.png" alt="sliderQuotes">
        </div>
        <p>${item.description}</p>
      </div>`;
    slidesContainer.appendChild(slide);

    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("onclick", `currentSlide(${index + 1})`);
    indicatorsContainer.appendChild(dot);
  });

  showSlides(slideIndex);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add("hidden-slide");
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].classList.remove("hidden-slide");
  dots[slideIndex - 1].className += " active";
}

function moveSlide(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function toggleMenu() {
  var breadcrumb = document.getElementById("breadcrumb-items");
  breadcrumb.classList.toggle("show");
  breadcrumbIcon.innerHTML = breadcrumbItems.classList.contains("show")
    ? "✖"
    : "☰";
}

function hideMenu(event) {
  const breadcrumbItems = document.getElementById("breadcrumb-items");
  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb.contains(event.target)) {
    breadcrumbItems.classList.remove("show");
    document.getElementById("breadcrumb-icon").innerHTML = "☰";
  }
}

document.addEventListener("click", hideMenu);

let timer;

document.addEventListener("input", (e) => {
  const el = e.target;
  console.log("el", el);
  if (el.matches("[data-color]")) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      document.documentElement.style.setProperty(
        `--color-${el.dataset.color}`,
        el.value
      );
    }, 100);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll("#nav-items li a");
  const breadcrumbItems = document.querySelectorAll("#breadcrumb-items li a");

  function setActiveClassBasedOnHash() {
    const hash = window.location.hash || "#home";
    navItems.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
    breadcrumbItems.forEach((link) => {
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  setActiveClassBasedOnHash();

  navItems.forEach((link) => {
    link.addEventListener("click", () => {
      navItems.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  breadcrumbItems.forEach((link) => {
    link.addEventListener("click", () => {
      breadcrumbItems.forEach((link) => link.classList.remove("active"));
      link.classList.add("active");
    });
  });

  document.getElementById("breadcrumb-icon").addEventListener("click", () => {
    const breadcrumbItems = document.getElementById("breadcrumb-items");
    breadcrumbItems.classList.toggle("hidden");
  });

  window.addEventListener("hashchange", setActiveClassBasedOnHash);
});

// document.addEventListener("DOMContentLoaded", () => {
//   const buttons = document.querySelectorAll(".tooltip-button");

//   buttons.forEach((button) => {
//     button.addEventListener("mouseover", () => {
//       const tooltip = button.querySelector(".tooltip-text");
//       const tooltipRect = tooltip.getBoundingClientRect();
//       const buttonRect = button.getBoundingClientRect();
//       const spaceAbove = buttonRect.top;
//       const spaceBelow = window.innerHeight - buttonRect.bottom;

//       if (spaceBelow < tooltipRect.height && spaceAbove > tooltipRect.height) {
//         tooltip.style.bottom = "auto";
//         tooltip.style.top = "115%";
//         tooltip.querySelector("::after").style.top = "auto";
//         tooltip.querySelector("::after").style.bottom = "100%";
//         tooltip.querySelector("::after").style.borderColor =
//           "transparent transparent black transparent";
//       } else {
//         tooltip.style.bottom = "115%";
//         tooltip.style.top = "auto";
//         tooltip.querySelector("::after").style.top = "100%";
//         tooltip.querySelector("::after").style.bottom = "auto";
//         tooltip.querySelector("::after").style.borderColor =
//           "black transparent transparent transparent";
//       }
//     });
//   });
// });

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tooltip-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      const tooltip = button.querySelector(".tooltip-text");
      if (tooltip) {
        // const tooltipRect = tooltip.getBoundingClientRect();
        // const buttonRect = button.getBoundingClientRect();
        // const spaceAbove = buttonRect.top;
        // const spaceBelow = window.innerHeight - buttonRect.bottom;

        // // if (
        // //   spaceBelow < tooltipRect.height &&
        // //   spaceAbove > tooltipRect.height
        // // ) {
        // //   tooltip.style.bottom = "auto";
        // //   tooltip.style.top = "115%";
        // // } else {
        tooltip.style.bottom = "auto";
        tooltip.style.top = "120%";
        // }
      }
    });
  });
});

const video = document.getElementById("videoPlayer");
const playButton = document.getElementById("playButton");

video.addEventListener("click", () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

playButton.addEventListener("click", () => {
  video.play();
});

video.addEventListener("play", () => {
  playButton.style.display = "none";
});

video.addEventListener("pause", () => {
  playButton.style.display = "flex";
});

video.addEventListener("ended", () => {
  video.currentTime = 0;
  video.play();
});

window.onload = initSlider;
