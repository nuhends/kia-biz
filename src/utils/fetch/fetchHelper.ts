/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export const request = (url: string, options: RequestInit) => {
  const apiUrl = getApiUrl(url, options);
  try {
    url = apiUrl + url;
    const newOptions = { ...options };
    const config = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    };
    if (url.indexOf('recruitFile') > 0) {
      delete config.headers.accept;

      config.headers['content-type'] = 'multipart/form-data';

      const encodeName = encodeURI(newOptions.body.file.name);
      const filename =
        encodeName.substring(0, encodeName.lastIndexOf('.')).substring(0, 96) +
        encodeName.substring(encodeName.lastIndexOf('.'));

      const formData = new FormData();
      formData.append('file', newOptions.body.file);

      newOptions.body = formData;
    } else if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    }

    return axios({
      url,
      method: newOptions.method,
      data: newOptions.body,
      headers: config.headers,
      ...newOptions,
    });
  } catch (e) {
    Sentry.addBreadcrumb({
      category: 'api',
      message: 'Error for api call',
      data: {
        error: e,
      },
      level: 'error',
    });
    handleAxiosError(e);
  }
};
