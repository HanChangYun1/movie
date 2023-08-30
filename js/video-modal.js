import { qySel, videoResize } from "./functions.js";

qySel(".video-modal .close").addEventListener("click", (e) => {
  qySel(".video-modal iframe").src = "";
  qySel(".video-modal").style.display = "none";
}); //click

window.addEventListener("resize", () => {
  videoResize();
});
