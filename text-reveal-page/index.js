// querySelectorAll() return as an array
const contents = document.querySelectorAll(".content");

document.addEventListener("scroll", showContent);

function showContent() {
    // for each elements of "contents" and give the name as "section"
  contents.forEach((section) => {
    const imageElement = section.querySelector("img");
    const textElement = section.querySelector(".text");

    // return pixels in Y axis of window (up to page scrolling)
    const scrollPosition = window.pageYOffset;

    // this is staitc or read-only
    // offsetTop & Left include only position and margin
    // offsetHeight & Width include all of Box Model
    const textPosition =
      imageElement.offsetTop + imageElement.offsetHeight / 50;

    if (scrollPosition > textPosition) {
      textElement.classList.add("show-reveal");
    } else {
      textElement.classList.remove("show-reveal");
    }
  });
}
