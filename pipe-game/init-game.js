document.addEventListener("DOMContentLoaded", () => {
  const innerCircle = document.querySelector(".container");
  const outerCircle = document.querySelector(".outer-circle");

  let isGreen = false;

  innerCircle.addEventListener("click", () => {
    if (isGreen) {
      outerCircle.style.backgroundColor = "grey";
      isGreen = false;
    } else {
      outerCircle.style.backgroundColor = "green";
      isGreen = true;
    }
  });
});
