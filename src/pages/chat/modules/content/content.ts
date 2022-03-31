export function displayContactMenu(){
  const contactMenuImg: HTMLElement | null = document.querySelector(".contactMenu-button");
  const contactMenuPanel: HTMLElement | null = document.querySelector(".contactMenu-panel");
  if (!contactMenuImg || !contactMenuPanel) return;        
  contactMenuImg.onclick = function(){
    contactMenuPanel.hidden = !contactMenuPanel.hidden;
  }
  document.addEventListener('click', function(event) { 
    const target = event.target as HTMLElement;
    if(!target.closest(".contactMenu-wrapper") && !contactMenuPanel.hidden) {
      contactMenuPanel.hidden = true;
    }
  });
}

export function stretchableTextArea(){
  const textarea = document.querySelector(".new-message-textarea");
  if (!textarea) return;
  textarea.addEventListener("keyup", function(){
    let styles = getComputedStyle(textarea);
    this.style.height = 0;
    let minHeightArea = parseInt(styles.minHeight);
    let newHeight = this.scrollHeight;
    this.style.height = ((newHeight > minHeightArea)?newHeight:minHeightArea) + "px";
  });
}