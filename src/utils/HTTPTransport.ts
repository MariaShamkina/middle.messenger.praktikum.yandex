enum METHODS {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum STATUS {
  OK = 'OK',
  UNAUTH = 'UNAUTH',
  ERROR = 'ERROR',
}

export type ResponseResult<T = undefined> = {
  status: STATUS,
  data?: T,
  errorText?: string,
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

  get = <TResponse = undefined>(shortUrl: string, options: OptionsWithoutMethod = {}) => {
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

  post = <TResponse = undefined>(
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
  ): Promise<ResponseResult<TResponse>> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + shortUrl);

      xhr.onload = () => {
        try {
          const responseData = JSON.parse(xhr.response);
          if (xhr.status === 200) {
            resolve({ status: STATUS.OK, data: responseData as TResponse });
          } else {
            if (xhr.status === 401) {
              resolve({
                status: STATUS.UNAUTH,
                errorText: responseData.reason ?? '',
              });
            }
            resolve({
              status: STATUS.ERROR,
              errorText: responseData.reason ?? 'Произошла неизвестная ошибка. Обратитесь в службу поддержки.',
            });
          }
        } catch (error) {
          if (xhr.status === 200) resolve({ status: STATUS.OK });
          else reject(new Error('Не удалось получить данные'));
        }
      };

      xhr.onabort = () => reject(new Error('Запрос был отменен.'));
      xhr.onerror = () => reject(new Error('Запрос завершился с ошибкой. Обратитесь в службу поддержки.'));
      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error('Сервер не отвечает. Попробуйте повторить попытку позже.'));
      xhr.withCredentials = true;

      xhr.setRequestHeader('accept', 'application/json');
      if (method === METHODS.GET || !data) {
        xhr.setRequestHeader('Content-Type', 'text/plain');
        xhr.send();
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
