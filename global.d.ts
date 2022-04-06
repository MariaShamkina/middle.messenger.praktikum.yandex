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

type handler = (...args: unknown[]) => void;

/* eslint-enable no-unused-vars */
