/* eslint-disable no-unused-vars */

declare module '*.hbs';

type contactData = {
  id: number,
  name: string,
  imgSrc: string
};

type message = {
  authorId: number,
  isAuthorMe?: boolean,
  message: string,
  dateTime: string,
  imgSrc?: string,
}

type conversation = {
  contactId: number,
  conversation: message[],
};

type eventHandler = (...args: unknown[]) => void;
type validationHandler = (value: string) => string[];

/* eslint-enable no-unused-vars */
