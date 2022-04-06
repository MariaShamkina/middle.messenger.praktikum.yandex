import Component from './component';

export default function renderDOM(rootSelector: string, component: Component) {
  const root = document.querySelector(rootSelector);

  if (!root) {
    throw new Error('Root not found');
  }

  root.innerHTML = '';

  root.append(component.getContent());
}
