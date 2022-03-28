import contentTemplate from "./modules/content";
import getConversation from "../../data/contentData";
import getContactData from "../../data/contactsData";
import {stretchableTextArea, displayContactMenu} from "./modules/content/content";

function updateContent(contactId){
  const content = document.querySelector(".content");
  const conversationData = getConversation(contactId);
  const contentHtml = contentTemplate({
    contactInfo: getContactData(contactId), 
    content: conversationData, 
    fileIconSrc: new URL("../../img/add_file.svg", import.meta.url),
    sendMessIconSrc: new URL("../../img/send-comment.svg", import.meta.url),
    contactMenuSrc: new URL("../../img/contactMenu.svg", import.meta.url),
  });
  content.innerHTML = contentHtml;
  stretchableTextArea();
  displayContactMenu();
}

export function activateTab(){
  let chatContactsList = document.querySelector(".chat-contacts-list");
  if (!chatContactsList) return;
  chatContactsList.onclick = function(event){
    let tab = event.target.closest('.tab');    
    if (!tab) return;
    if (!chatContactsList.contains(tab)) return;

    const prevActTab = this.querySelector(".tab.active");
    tab.classList.add("active");
    if (prevActTab)
      prevActTab.classList.remove("active");
    updateContent(parseInt(tab.querySelector("#id").textContent));
  }
}