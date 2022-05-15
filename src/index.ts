import renderDOM from './utils/renderDOM';
import './index.scss';
import ChatPage from './components/pages/chat';

const chatPage = new ChatPage();

renderDOM('#app', chatPage);
