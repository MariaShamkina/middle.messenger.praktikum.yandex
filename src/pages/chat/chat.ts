import contentTemplate from "./modules/content/content.hbs";
import getConversation from "../../data/contentData";
import getContactData from "../../data/contactsData";
import {stretchableTextArea, displayContactMenu} from "./modules/content/content";

function updateContent(contactId: number){
  const content = document.querySelector(".content");
  if (!content) return;
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
  const chatContactsList: HTMLElement | null = document.querySelector(".chat-contacts-list");
  chatContactsList?.addEventListener('click', function(this: HTMLElement, event) {
    const tab = (event.target as HTMLElement).closest('.tab');
    if (!tab || !this.contains(tab)) return;

    const prevActTab = this.querySelector(".tab.active");
    tab.classList.add("active");
    if (prevActTab)
      prevActTab.classList.remove("active");
    
    const idField: HTMLElement | null = tab.querySelector("#id");
    if (idField && idField.textContent){
      updateContent(parseInt(idField.textContent));
    }
  });
}