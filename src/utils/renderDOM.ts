import Component from './component';

export default function renderDOM(rootSelector: string, component: Component) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Root not found');
  }

  component.dispatchComponentDidMount();

  // const chat = new ChatAPI();
  // const login = new AuthAPI();
  // login.logIn({ login: 'string', password: 'string' }).then((res1) => {
  //   console.log(res1);
  //   chat.create({ title: 'Valera' }).then((r) => {
  //     console.log(r);
  //     chat.request().then((res) => console.log(res));
  //   });
  // });

  root.innerHTML = '';

  root.append(component.getContent());
}
