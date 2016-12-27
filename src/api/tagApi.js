import { TAGS_URL, displayNetworkError } from './apiHelpers';

class TagApi {
  static getTags() {
    return fetch(TAGS_URL).then(response =>
      response.json().then(tags =>
        ({ tags, response })
      )
    ).catch(displayNetworkError);
  }
}

export default TagApi;
