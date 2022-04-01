export function switchScrollbar(className:string) {
  if (!className) return;
  const elementWithClass = document.querySelector(`.${className}`);
  if (elementWithClass) {
    elementWithClass.addEventListener('mouseenter', () => {
      elementWithClass.classList.add('showScrollbar');
    });
    elementWithClass.addEventListener('mouseleave', () => {
      elementWithClass.classList.remove('showScrollbar');
    });
  }
}

export default switchScrollbar;
