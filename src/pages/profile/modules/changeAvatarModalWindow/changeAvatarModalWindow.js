export function activateChangingAvatarModal(){
  let callBackButton = document.querySelector(".changeAvatarButton");
  let modalWindow = document.querySelector(".modal-container-changeAvatar");
  let closeModalButton = modalWindow.querySelector(".modal-closeButton");
  
  callBackButton.onclick = function () {
    modalWindow.classList.add("modal-active");
  }
  
  closeModalButton.onclick = function () {
    modalWindow.classList.remove("modal-active");
  }

  modalWindow.onmousedown = function (e) {
    if (e.target.closest(".changeAvatar-wrapper") === null) {
      this.classList.remove("modal-active");
    }
  };
};