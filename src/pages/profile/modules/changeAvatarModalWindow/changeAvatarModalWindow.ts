export function activateChangingAvatarModal(){
  let callBackButton = document.querySelector(".changeAvatarButton");
  let modalWindow: HTMLElement | null = document.querySelector(".modal-container-changeAvatar");
  let closeModalButton = modalWindow?.querySelector(".modal-closeButton");
  
  callBackButton?.addEventListener('click', function () {
    modalWindow?.classList.add("modal-active");
  });
  
  closeModalButton?.addEventListener('click', function () {
    modalWindow?.classList.remove("modal-active");
  });

  modalWindow?.addEventListener('mousedown', function (e) {
    if ((e.target as HTMLElement).closest(".changeAvatar-wrapper") === null) {
      this.classList.remove("modal-active");
    }
  });
};