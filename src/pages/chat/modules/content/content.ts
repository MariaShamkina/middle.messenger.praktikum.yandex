export function displayContactMenu() {
  const contactMenuImg: HTMLElement | null = document.querySelector('.contactMenu-button');
  const contactMenuPanel: HTMLElement | null = document.querySelector('.contactMenu-panel');
  if (!contactMenuImg || !contactMenuPanel) return;
  contactMenuImg.addEventListener('click', () => contactMenuPanel.toggleAttribute('hidden'));
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.contactMenu-wrapper') && !contactMenuPanel.hidden) {
      contactMenuPanel.hidden = true;
    }
  });
}

export function stretchableTextArea() {
  const textarea = document.querySelector('.new-message-textarea');
  if (!textarea) return;
  textarea.addEventListener('keyup', () => {
    const styles = getComputedStyle(textarea);
    this.style.height = 0;
    const minHeightArea = parseInt(styles.minHeight, 10);
    const newHeight = this.scrollHeight;
    this.style.height = `${(newHeight > minHeightArea) ? newHeight : minHeightArea}px`;
  });
}
