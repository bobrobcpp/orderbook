import { makeAutoObservable, makeObservable, autorun, runInAction, reaction, observable, action } from "mobx"
import { Data } from './dataStore.d'

export class DataStore implements Data {

  public data = null

  constructor() {
    makeAutoObservable(this)
}
  public async setData(data: any): Promise<void> {
    this.data = data
  }
}

export default new DataStore()