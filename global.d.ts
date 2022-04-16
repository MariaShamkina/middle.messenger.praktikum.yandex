/* eslint-disable no-unused-vars */

declare module '*.hbs';

type ContactData = {
  id: number,
  name: string,
  imgSrc: string
};

type Message = {
  authorId: number,
  isAuthorMe?: boolean,
  message: string,
  dateTime: string,
  imgSrc?: string,
}

type Conversation = {
  contactId: number,
  conversation: Message[],
};

type EventHandler = (...args: unknown[]) => void;
type ValidationHandler = (value: string) => string[];

/* eslint-enable no-unused-vars */
