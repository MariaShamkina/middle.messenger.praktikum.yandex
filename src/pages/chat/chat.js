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

export function activateTab(){
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.onclick = function(){
            let prevActTab = document.querySelector(".active");
            tab.classList.add("active");
            if (prevActTab)
                prevActTab.classList.remove("active");
        }
    });
}

export function stretchableTextArea(){
    let textarea = document.querySelector('.new-message-textarea');
    textarea.addEventListener('keyup', function(e){
        let styles = getComputedStyle(textarea);
        this.style.height = 0;
        let minHeightArea = parseInt(styles.minHeight);
        let newHeight = this.scrollHeight;
        this.style.height = (newHeight > minHeightArea)?newHeight:minHeightArea + 'px';
    });
}