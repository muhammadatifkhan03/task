// Sample data for slider items
const sliderData = [
  {
    imageUrl: "assets/slider11.png",
    title: "Slide 1 Title",
    description: "Description for Slide 1.",
  },
  {
    imageUrl: "assets/slider12.png",
    title: "Slide 2 Title",
    description: "Description for Slide 2.",
  },
  {
    imageUrl: "assets/slider13.png",
    title: "Slide 3 Title",
    description: "Description for Slide 3.",
  },
];
let slideIndex = 1;

// Function to initialize slider with data
function initSlider() {
  const slidesContainer = document.getElementById("slides");
  const indicatorsContainer = document.getElementById("indicators");

  sliderData.forEach((item, index) => {
    // Create slide element
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
    slidesContainer.appendChild(slide);

    // Create indicator element
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.setAttribute("onclick", `currentSlide(${index + 1})`);
    indicatorsContainer.appendChild(dot);
  });

  showSlides(slideIndex);
}

// Function to show slides
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
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Function to move to next/previous slide
function moveSlide(n) {
  showSlides((slideIndex += n));
}

// Function to set current slide
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Function to toggle breadcrumb menu
function toggleMenu() {
  var breadcrumb = document.getElementById("breadcrumb-items");
  breadcrumb.classList.toggle("show");
  breadcrumbIcon.innerHTML = breadcrumbItems.classList.contains("show")
    ? "✖"
    : "☰";
}

// Function to hide breadcrumb menu
function hideMenu(event) {
  const breadcrumbItems = document.getElementById("breadcrumb-items");
  const breadcrumb = document.getElementById("breadcrumb");
  if (!breadcrumb.contains(event.target)) {
    breadcrumbItems.classList.remove("show");
    document.getElementById("breadcrumb-icon").innerHTML = "☰";
  }
}

// Initialize slider on page load
window.onload = initSlider;

// Add event listener to hide breadcrumb menu when clicking outside
document.addEventListener("click", hideMenu);

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tooltip-button");

  buttons.forEach((button) => {
    button.addEventListener("mouseover", () => {
      const tooltip = button.querySelector(".tooltip-text");
      const tooltipRect = tooltip.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      const spaceAbove = buttonRect.top;
      const spaceBelow = window.innerHeight - buttonRect.bottom;

      if (spaceBelow < tooltipRect.height && spaceAbove > tooltipRect.height) {
        tooltip.style.bottom = "auto";
        tooltip.style.top = "115%";
        tooltip.querySelector("::after").style.top = "auto";
        tooltip.querySelector("::after").style.bottom = "100%";
        tooltip.querySelector("::after").style.borderColor =
          "transparent transparent black transparent";
      } else {
        tooltip.style.bottom = "115%";
        tooltip.style.top = "auto";
        tooltip.querySelector("::after").style.top = "100%";
        tooltip.querySelector("::after").style.bottom = "auto";
        tooltip.querySelector("::after").style.borderColor =
          "black transparent transparent transparent";
      }
    });
  });
});
