import './modules/contacts/contacts.css';
import "./chat.css";

import contactsTemplate from './modules/contacts';
import contentTemplate from './modules/content';
import {contactsData} from './data/contactsData';

document.addEventListener('DOMContentLoaded', () => {
    let contacts = document.querySelector(".wrapper-chat-contacts-list");
    let contactsHtml = contactsTemplate({contacts: contactsData});
    contacts.innerHTML = contactsHtml;

    let content = document.querySelector(".content");
    // let activeContact = document.querySelector(".active");
    // let contactName = (activeContact) ? activeContact

    let conversationData = getConversationData("Тайное общество");
    let contentHtml =  contentTemplate({contactName: "", conversation: conversationData});
    content.innerHTML = contentHtml;
});

function getConversationData(contactName) {
    if (contactName == "Тайное общество"){
        let profileName = "Мария";
        return [
            {
                author: "",
                message: `Подёрнутое туманной дымкой солнце клонилось за горизонт, там, на 
                западном краю небосвода, чуть пониже огромного тёмного облака – сейчас оно было похоже на голову, - 
                зияла широкая, червонного золота, резаная рана.`,
                dataTime: "02.02.22 11:15"
            },
            {
                author: contactName,
                message: `“Вот оно, з-знамение! Само небо пред-достерегает!.. 
                Воистину, не сносить мне г-головы, если вылезу из-под од-деяла, - причитал, стуча зубами, человек
                 (очень уж он простуды боялся, и чем дальше, тем больше). – Н-на ночь глядя и зелёный юнец – хлебнул
                  бы он с моё! – поостережётся высовывать нос на улицу-цу…”`,
                dataTime: "02.02.22 11:30"
            },
            {
                author: contactName,
                message: `И он обречённо уставился на туманную дымку, нижний край которой, 
                насквозь пропитанный закатной кровью, вселял в его разочарованную душу смутную тревогу.`,
                dataTime: "02.02.22 12:22"
            },
            {
                author: profileName,
                message: `Тёмное облако между тем быстро меняло свои очертания, становясь 
                каким-то перистым, лёгким, стремительным… Крыло на взмахе, да и только!.. Всё дальше уносилось оно на запад…
                И тут в мозг человека стало вкрадчиво вползать что-то мягкое, округлое – нежный пушок плесени скрывал истинную
                его форму, но, похоже, это было воспоминание, таившееся до сих пор в глубине сознания, в какой-то укромной и 
                сырой норе… Воспоминание об одном сне… А приснился ему тогда ворон, который высиживал человеческие сердца.`,
                dataTime: "02.02.22 15:41"
            },
            {
                author: contactName,
                message: `Эта чёрная птица ещё преследовала его всю ночь, и, как он ни старался, 
                прогнать наваждение не мог… Да, да, так оно и было, теперь он точно припомнил.`,
                dataTime: "02.02.22 20:11",
                imgsrc: "https://pics.livejournal.com/max_verg/pic/00001k5d/s320x240"
            },
            {
                author: profileName,
                message: `“Необходимо во что бы то ни стало выяснить, кому принадлежит это крыло”, - 
                сказал себе человек, поднялся с постели и сошёл по лестнице на улицу… Так он брёл в одной ночной рубашке, босиком, 
                стараясь не терять из виду зловещее крыло, которое улетало всё дальше на запад…`,
                dataTime: "02.02.22 22:07",
            },
        ]
    }
}

// import {switchScrollbar, activateTab, stretchableTextArea} from "./chat.js"
// switchScrollbar('wrapper-chat-contacts-list');
// activateTab();
// stretchableTextArea();
