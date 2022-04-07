import renderDOM from './utils/renderDOM';
import LoginPage from './components/pages/login';

const loginPage = new LoginPage();

renderDOM('#app', loginPage);
