export function displayContactMenu(){
    let contactMenuImg = document.querySelector('.contactMenu-img');
    if (!contactMenuImg) return;        
    let contactMenuPanel = document.querySelector('.contactMenu-panel');
    contactMenuImg.onclick = function(){
        contactMenuPanel.hidden = !contactMenuPanel.hidden;
    }
    document.onclick = function(event) { 
        let target = event.target;
        if(!target.closest('.contactMenu-wrapper') &&
        !contactMenuPanel.hidden) {
            contactMenuPanel.hidden = true;
        }
    };
}

export function stretchableTextArea(){
    let textarea = document.querySelector('.new-message-textarea');
    if (!textarea) return;
    textarea.addEventListener('keyup', function(e){
        let styles = getComputedStyle(textarea);
        this.style.height = 0;
        let minHeightArea = parseInt(styles.minHeight);
        let newHeight = this.scrollHeight;
        this.style.height = ((newHeight > minHeightArea)?newHeight:minHeightArea) + 'px';
    });
}