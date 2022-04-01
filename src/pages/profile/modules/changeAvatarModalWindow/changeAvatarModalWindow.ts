export function activateChangingAvatarModal() {
  const callBackButton = document.querySelector('.changeAvatarButton');
  const modalWindow: HTMLElement | null = document.querySelector('.modal-container-changeAvatar');
  const closeModalButton = modalWindow?.querySelector('.modal-closeButton');

  callBackButton?.addEventListener('click', () => {
    modalWindow?.classList.add('modal-active');
  });

  closeModalButton?.addEventListener('click', () => {
    modalWindow?.classList.remove('modal-active');
  });

  modalWindow?.addEventListener('mousedown', (e) => {
    if ((e.target as HTMLElement).closest('.changeAvatar-wrapper') === null) {
      this.classList.remove('modal-active');
    }
  });
}

export default activateChangingAvatarModal;
