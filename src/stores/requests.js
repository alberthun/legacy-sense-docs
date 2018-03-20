import { observable, action } from 'mobx';
import Request from './request';

export default class Requests {
  @observable items = [];

  @action add(options) {
    const request = new Request(options);

    fetch(options.url, {
      body: JSON.stringify(JSON.parse(options.body)),
      headers: options.header,
      method: options.method,
    })
      .then(res => {
        if (!res.ok) {
          res.text().then((data) => {
            let d;
            try {
              d = JSON.parse(data);
            } catch (e) {
              d = {};
            }
            request.setResponse(res.status, d);
          });
        }
        if ([200, 201].includes(res.status)) {
          res.json().then((response) => {
            request.setResponse(res.status, response);
          });
        }
      })
      .catch(c => {
        request.setResponse(c.code, c, c.headers);
      });

    this.items.unshift(request);
  }
}