enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

type Options = {
    method: METHODS;
    data?: ModelData;
    timeout?: number;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

function queryStringify(data: ModelData) {
  return Object.entries(data)
    .reduce((prev, pair) => `${prev}${pair[0]}=${pair[1]}&`, '?')
    .slice(0, -1);
}

export class HTTPTransport {
  private baseUrl = '';

  constructor(baseUrl:string) {
    this.baseUrl = baseUrl;
  }

  get = <TResponse>(shortUrl: string, options: OptionsWithoutMethod = {}) => {
    const { data } = options;
    return this.request<TResponse>(
      shortUrl + ((data) ? queryStringify(data) : ''),
      { ...options, method: METHODS.GET },
      options.timeout,
    );
  };

  put = (shortUrl: string, options: OptionsWithoutMethod = {}) => this.request(
    shortUrl,
    { ...options, method: METHODS.PUT },
    options.timeout,
  );

  post = <TResponse>(
    shortUrl: string,
    options: OptionsWithoutMethod = {}) => this.request<TResponse>(
      shortUrl,
      { ...options, method: METHODS.POST },
      options.timeout,
    );

  delete = (shortUrl: string, options: OptionsWithoutMethod = {}) => this.request(
    shortUrl,
    { ...options, method: METHODS.DELETE },
    options.timeout,
  );

  private request<TResponse>(
    shortUrl: string,
    options: Options = { method: METHODS.GET },
    timeout = 5000,
  ): Promise<TResponse> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + shortUrl);

      xhr.onload = () => {
        resolve(xhr as unknown as TResponse);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (method === METHODS.GET || !data) {
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('accept', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

// new HTTPTransport().get('https://chats');

// request<{ id: string }>('https://chats', {
//   method: METHOD.POST,
//   data: JSON.stringify({
//     title: 'Мой чат',
//   }),
// }).then(({ id }) => {
//   // Здесь id имеет тип string
// });
