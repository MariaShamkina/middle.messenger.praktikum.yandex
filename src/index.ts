import renderDOM from './utils/renderDOM';
import LoginPage from './components/pages/login';
import './index.scss';

const loginPage = new LoginPage();

renderDOM('#app', loginPage);
