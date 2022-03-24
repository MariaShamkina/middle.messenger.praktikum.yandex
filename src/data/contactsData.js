export let contactsData = [
        {id:1, name: "Тайное общество", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/825.png"},
        {id:2, name: "Илья", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/844.jpg"},
        {id:3, name: "Хористка Наташа", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/4081.jpg"},
        {id:4, name: "Design Destroyer", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/833.jpg"},
        {id:5, name: "Андрей", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/928.jpg"},
        {id:6, name: "Мама", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/3014.jpg"},
        {id:7, name: "Родня из Екатеринбурга", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/3967.jpg"},
        {id:8, name: "Стив Тайлер", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/4434.jpg"},
        {id:9, name: "Дискуссионный клуб", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/765.jpg"},
        {id:10, name: "Бойцовский клуб", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/3354.jpg"},
        {id:11, name: "Лена", imgSrc: "https://cspromogame.ru//storage/upload_images/avatars/4169.jpg"},
    ]

export default function getContactData(contactId){
    return contactsData.find(contact => contact.id === contactId);
}