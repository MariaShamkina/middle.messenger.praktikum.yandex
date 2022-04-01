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
// eslint-disable-next-line no-unused-vars
type conversation = {
  contactId: number,
  conversation: message[],
};
/* eslint-enable no-unused-vars */
