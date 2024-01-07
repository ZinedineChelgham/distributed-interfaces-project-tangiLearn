import "./style.css";
import { TUIOManager } from "@dj256/tuiomanager";
import { HTMLElementWidget } from "@dj256/tuiomanager/widgets";

new TUIOManager().start();

const tokenSlotContainer = document.getElementById("token-slot-container");
const tokenInfoElement = document.getElementById("token-info");
const tokenIdElement = document.getElementById("token-id");
// tokenSlotContainer.addEventListener("click", () => {
//   tokenSlotContainer.classList.toggle("active");
// });
const widget = new HTMLElementWidget(tokenSlotContainer);

widget.addOnTagDownListener((tag) => {
  tokenSlotContainer.classList.add("active");
  tokenIdElement.innerText = tag.id;
  tokenInfoElement.style.visibility = "visible";
  console.log("Tag down on widget", tag);
});

widget.addOnTagUpListener((tag) => {
  tokenSlotContainer.classList.remove("active");
  console.log("Tag up on widget", tag);
});
