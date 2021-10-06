import { makeAutoObservable } from "mobx"
import { Data } from './dataStore.d'

export class DataStore implements Data {

  public asks = []
  public bids = []

  constructor() {
    makeAutoObservable(this)
  }
  public async setData(data: any): Promise<void> {
    const initialAsks = data?.asks
    const initialBids = data?.bids

    initialAsks.map((ask: Number[]) => ask.push(ask[1]))
    initialBids.map((bid: Number[]) => bid.push(bid[1]))

    this.asks = initialAsks
    this.bids = initialBids
  }
}

export default new DataStore()
