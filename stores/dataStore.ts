import { IObservableArray, makeAutoObservable, observable } from "mobx"
import { Data } from './dataStore.d'

export class DataStore implements Data {
  public bids: IObservableArray = observable<string>([])
  public asks: IObservableArray = observable<string>([])
  public spread = 0
  public feed = ''

  constructor() {
    makeAutoObservable(this)
  }

  public setFeed(feed: string): void {
    this.feed = feed
  }

  public async setData(data: any): Promise<void> {
    const initialBids = data?.bids
    const initialAsks = data?.asks

    initialBids.reduce((prev:any, curr:any) => { 
      let n = prev + curr[1]
      curr.push(n)
      return n
    }, 0)
    initialAsks.reduce((prev:any, curr:any) => { 
      let n = prev + curr[1]
      curr.push(n)
      return n
    }, 0)

    this.bids = initialBids
    this.asks = initialAsks
  }
  public async amendData(data: Data): Promise<void> {
    data.bids?.map((bid: IObservableArray) => {
      let foundBid = this.bids.findIndex((element) => parseFloat(element[0]) === parseFloat(bid[0]))
        if (foundBid !== -1){
          if(!bid[1]){
            //if size 0 remove
            this.bids.splice(foundBid, 1)
          } else {
            //if has a size replace
            this.bids.splice(foundBid, 1, bid)
          }
        }
        else {
          if(bid[1]){
            this.bids.push(bid)
          }
          this.bids.sort(function(a, b) {
            return b[0] - a[0];
          });
          this.bids.reduce((prev:any, curr:any) => { 
            let n = prev + curr[1]
            curr[2] = n
            return n
          }, 0)
        }
    })
    data.asks?.map((ask: IObservableArray) => {
      let foundAsk = this.asks.findIndex((element) => parseFloat(element[0]) === parseFloat(ask[0]))
        if (foundAsk !== -1){
          if(!ask[1]){
            this.asks.splice(foundAsk, 1)
          } else {
            this.asks.splice(foundAsk, 1, ask)
          }
        }
        else {
          if(ask[1]){
            this.asks.push(ask)
          }
        }
        this.asks.sort(function(a, b) {
          return a[0] - b[0];
        });
        this.asks.reduce((prev:any, curr:any) => { 
          let n = prev + curr[1]
          curr[2] = n
          return n
        }, 0)
    })
    if(this.bids[0] && this.asks[0]) {
      this.spread = this.bids[0][0] - this.asks[0][0]
    }
  }
}

export default new DataStore()
