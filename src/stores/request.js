import { observable, action } from 'mobx';
import { uniqueId } from 'lodash';

export default class Request {
  @observable state;
  @observable response;
  @observable httpCode = 0;
  @observable method;
  @observable url;
  @observable body;
  @observable query;

  constructor(props) {
    this.state = 'pending';
    this.url = props.url;
    this.body = props.body;
    this.method = props.method;
    this.id = uniqueId('requests');
  }

  @action
  setResponse(httpCode, response) {
    this.state = 'resolved';
    this.httpCode = httpCode;
    this.response = response;
  }
}
