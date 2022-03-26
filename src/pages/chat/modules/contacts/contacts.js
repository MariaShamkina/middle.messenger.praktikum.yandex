export function switchScrollbar(className){
    if (!className) return;
    let chatContactsList = document.querySelector(`.${className}`);
    chatContactsList.onmouseenter = function(){
        chatContactsList.classList.add("showScrollbar");
    }            
    chatContactsList.onmouseleave = function(){
        chatContactsList.classList.remove("showScrollbar");
    }
}