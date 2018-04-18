import { observable, action } from 'mobx';

export default class Auth {
  @observable token;

  @action
  setToken(token) {
    this.token = token;
  }
}
