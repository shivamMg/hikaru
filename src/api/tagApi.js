const URL = 'http://localhost:8000/api';
const TAGS_URL = URL + '/tags';

class TagApi {
  static getTags() {
    return fetch(TAGS_URL).then(response =>
      response.json().then(tags =>
        ({ tags, response })
      )
    );
  }
}

export default TagApi;
