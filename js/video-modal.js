import { qySel } from "./functions.js";

qySel('.video-modal .close').addEventListener('click', e => {
  qySel('.video-modal iframe').src = ''
  qySel('.video-modal').style.display='none'
})//click

export const videoResize = () => {
  let videoWidth = qySel('.youtube-ratio').clientWidth
  let videoHeight = qySel('.youtube-ratio').clientHeight
  qySel('.video-modal iframe').style.width = `${videoWidth}px`
  qySel('.video-modal iframe').style.height = `${videoHeight}px`
}//videoResize

window.addEventListener('resize',()=>{
  videoResize()
})




