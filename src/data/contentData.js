import profileId from "./profileData";

let conversationsData = [
  {
    contactId: 1,
    conversation:[
      {
        authorId: 0,
        message: `Подёрнутое туманной дымкой солнце клонилось за горизонт, там, на 
        западном краю небосвода, чуть пониже огромного тёмного облака – сейчас оно было похоже на голову, - 
        зияла широкая, червонного золота, резаная рана.`,
        dateTime: "02.02.22 11:15",
      },
      {
        authorId: 1,
        message: `“Вот оно, з-знамение! Само небо пред-достерегает!.. 
        Воистину, не сносить мне г-головы, если вылезу из-под од-деяла, - причитал, стуча зубами, человек
            (очень уж он простуды боялся, и чем дальше, тем больше). – Н-на ночь глядя и зелёный юнец – хлебнул
            бы он с моё! – поостережётся высовывать нос на улицу-цу…”`,
        dateTime: "02.02.22 11:30",
      },
      {
        authorId: 1,
        message: `И он обречённо уставился на туманную дымку, нижний край которой, 
        насквозь пропитанный закатной кровью, вселял в его разочарованную душу смутную тревогу.`,
        dateTime: "02.02.22 12:22",
      },
      {
        authorId: 0,
        message: `Тёмное облако между тем быстро меняло свои очертания, становясь 
        каким-то перистым, лёгким, стремительным… Крыло на взмахе, да и только!.. Всё дальше уносилось оно на запад…
        И тут в мозг человека стало вкрадчиво вползать что-то мягкое, округлое – нежный пушок плесени скрывал истинную
        его форму, но, похоже, это было воспоминание, таившееся до сих пор в глубине сознания, в какой-то укромной и 
        сырой норе… Воспоминание об одном сне… А приснился ему тогда ворон, который высиживал человеческие сердца.`,
        dateTime: "02.02.22 15:41",
      },
      {
        authorId: 1,
        message: `Эта чёрная птица ещё преследовала его всю ночь, и, как он ни старался, 
        прогнать наваждение не мог… Да, да, так оно и было, теперь он точно припомнил.`,
        dateTime: "02.02.22 20:11",
        imgSrc: "https://pics.livejournal.com/max_verg/pic/00001k5d/s320x240",
      },
      {
        authorId: 0,
        message: `“Необходимо во что бы то ни стало выяснить, кому принадлежит это крыло”, - 
        сказал себе человек, поднялся с постели и сошёл по лестнице на улицу… Так он брёл в одной ночной рубашке, босиком, 
        стараясь не терять из виду зловещее крыло, которое улетало всё дальше на запад…`,
        dateTime: "02.02.22 22:07",
      },
    ],
  },
  {
    contactId: 11,
    conversation: [
      {
          authorId: 0,
          message: `рано-рано встала`,
          dateTime: "02.02.22 11:15",
      },
      {
          authorId: 0,
          message: `очень я устала`,
          dateTime: "02.02.22 11:30",
      },
      {
          authorId: 1,
          message: `отдохни`,
          dateTime: "02.02.22 12:22",
      },
      {
          authorId: 1,
          message: `тест коротких строк`,
          dateTime: "02.02.22 12:22",
      }
    ],
  },
];

export default function getConversation(contactId){
  let conversation = conversationsData.find(conversationData => conversationData.contactId === contactId)?.conversation;
  conversation?.map(massage => massage.isAuthorMe = massage.authorId === profileId);
  return conversation;
};