export function switchScrollbar(className){
  if (!className) return;
  const chatContactsList = document.querySelector(`.${className}`);
  if (chatContactsList){
    chatContactsList.onmouseenter = function(){
      chatContactsList.classList.add("showScrollbar");
    }            
    chatContactsList.onmouseleave = function(){
      chatContactsList.classList.remove("showScrollbar");
    }
  }
}