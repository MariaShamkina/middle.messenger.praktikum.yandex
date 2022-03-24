export function activateChangingAvatarModal(){
    let callBackButton = document.querySelector('.changeAvatarButton');
    let modalWindow = document.querySelector('.modal-container-changeAvatar');
    let closeModalButton = modalWindow.querySelector('.modal-closeButton');
    
    callBackButton.onclick = function () {
        modalWindow.classList.add('modal_active');
    }
    
    closeModalButton.onclick = function () {
        modalWindow.classList.remove('modal_active');
    }

    modalWindow.onmousedown = function (e) {
        
        if (e.target.closest(".changeAvatar-wrapper") === null) {
          this.classList.remove('modal_active');
        }
      };
  };