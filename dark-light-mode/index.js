const switchToggle = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById("toggle-icon");
const nav = document.getElementById("nav");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

// this function call all required functions
function switchMode(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
    imageSwitchMode("dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
    imageSwitchMode("light");
  }
}
function darkMode() {
  // change "text content" for children of toogleIcon
  toggleIcon.children[0].textContent = "Light Mode";
  // replace "class" for children of toogleIcon
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
  // change background color of nav via "style" attribute
  nav.style.backgroundColor = "rgb(0 0 0 / 50%)";
}

function lightMode() {
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  nav.style.backgroundColor = "rgb(255 255 255 / 50%)";
}

function imageSwitchMode(mode) {
  // change path of "src" attribute for image
  image1.src = `./image/undraw_Projections_${mode}.svg`;
  image2.src = `./image/undraw_Raining_${mode}.svg`;
  image3.src = `./image/undraw_Freelancer_${mode}.svg`;
}

// parse event (change) as argument to "switchMode" function
switchToggle.addEventListener("change", switchMode);
