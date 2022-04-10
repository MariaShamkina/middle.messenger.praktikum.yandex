import Component from './component';

export function validateLogin(text: string): string[] {
  const errors: string[] = [];

  if (!text.match(/^.{3,20}$/)) errors.push('Длина должна быть от 3 до 20 символов.');
  if (text.match(/^[0-9]+$/)) errors.push('Нельзя использовать только цифры.');
  if (text.includes(' ')) errors.push('Нельзя использовать пробелы.');
  if (!text.match(/^[a-zA-Z0-9\\-_]*$/)) errors.push('Можно использовать латинцу, цифры, дефис и нижнее подчёркивание.');
  return errors;
}

export function validatePassword(text: string): string[] {
  const errors: string[] = [];

  if (!text.match(/^.{8,40}$/)) errors.push('Длина должна быть от 8 до 40 символов.');
  if (!text.match(/(?=.*\d)(?=.*[A-ZА-Я]).*/)) errors.push('Обязательно использовать хотя бы одну цифру и заглавную букву');
  return errors;
}

export function validateName(text: string): string[] {
  const errors: string[] = [];
  if (!text) errors.push('Обязательное поле.');
  else if (!text.match(/^[A-ZА-Я]/)) errors.push('Первая буква должна быть заглавной.');
  if (text.match(/[0-9 ]/)) errors.push('Имя не должно содержать цифры и пробелы.');
  if (!text.match(/^[a-zA-Zа-яА-Я\\-]*$/)) errors.push('Можно использовать только буквы и дефис.');
  return errors;
}

export function validatePasswordMatch(text: string, text2: string): string[] {
  const errors: string[] = [];
  if (text !== text2) errors.push('Пароли не совпадают.');
  return errors;
}

export function validatePhoneNumber(text: string): string[] {
  const errors: string[] = [];
  if (!text) errors.push('Обязательное поле.');
  if (!text.match(/^.{10,15}$/)) errors.push('Длина номера должна быть от 10 до 15 чисел.');
  if (!text.match(/^[+0-9][0-9]*$/)) errors.push('Номер должен состоять из чисел, может начинаться с плюса.');
  return errors;
}

export function validateEmail(text: string): string[] {
  const errors: string[] = [];
  if (!text) errors.push('Обязательное поле.');
  if (!text.match(/^[a-zA-Z0-9-_.]+@[a-zA-Z]+\.[a-zA-Z]+[a-zA-Z]$/)) errors.push('Некорректный адрес. Пример подходящего: your-name8@test.ru');
  return errors;
}

export function InvalidFormData(): Component[] {
  const invalidInputs: Component[] = [];
  Object.values((this as Component).children)
    .forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          if (ch.props.isValidate && !ch.state.isValid) invalidInputs.push(ch);
        });
      } else if (child.props.isValidate && !child.state.isValid) {
        invalidInputs.push(child);
      }
    });
  return invalidInputs;
}
