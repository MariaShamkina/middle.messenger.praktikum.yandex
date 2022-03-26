export function activateTab(){
    let tabs = document.querySelectorAll(".tab");
    tabs.forEach(tab => {
        tab.onclick = function(){
            let prevActTab = document.querySelector(".active");
            tab.classList.add("active");
            if (prevActTab)
                prevActTab.classList.remove("active");
            updateContent(parseInt(tab.querySelector('#id').textContent));
        }
    });
}

import contentTemplate from './modules/content';
import getConversation from '../../data/contentData';
import getContactData from '../../data/contactsData';
import {stretchableTextArea, displayContactMenu} from "./modules/content/content"

function updateContent(contactId){
    let content = document.querySelector(".content");
    let conversationData = getConversation(contactId);
    let contentHtml = contentTemplate({
        contactInfo: getContactData(contactId), 
        content: conversationData, 
        fileIconSrc: require("../../img/add_file.svg"),
        sendMessIconSrc: require("../../img/send-comment.svg"),
        contactMenuSrc: require("../../img/contactMenu.svg")
    });
    content.innerHTML = contentHtml;
    stretchableTextArea();
    displayContactMenu();
}

