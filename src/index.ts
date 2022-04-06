import SubmitButton from './components/submitButton/submitButton';
import renderDOM from './utils/renderDOM';

const button = new SubmitButton({
  name: 'test',
  hidden: false,
  title: 'test',
  events: {
    click: () => console.log('Click'),
  },
});

renderDOM('#app', button);

setTimeout(() => {
  button.setProps({
    title: 'Wow',
  });
}, 5000);
