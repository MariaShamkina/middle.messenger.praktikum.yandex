import ContentInfo from './contentInfo';

export default ContentInfo;

export function hideMenuOnClickOutsideThePanel() {
  document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.closest('.contactMenu-wrapper')) return;
    const contactMenuPanel = document.querySelector('.contactMenu-panel');
    contactMenuPanel?.setAttribute('hidden', '');
  });
}
