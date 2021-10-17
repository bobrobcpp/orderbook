import { makeAutoObservable ,toJS } from "mobx"
import { Data } from './dataStore.d'

export class DataStore implements Data {
  public bids = []
  public asks = []
  public spread = 0


  constructor() {
    makeAutoObservable(this)
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
  public async amendData(data: any): Promise<void> {
    data.bids?.map((bid: any) => {
      console.log(toJS(this.bids), 'thisbids')
      let foundBid = this.bids.findIndex((element) => parseFloat(element[0]) === parseFloat(bid[0]))
      console.log(foundBid, 'foundbid')
        if (foundBid !== -1){
          if(!bid[1]){
            console.log(bid, 'bid1')
            //if size 0 remove
            this.bids.splice(foundBid, 1)
          } else {
            console.log(bid, 'bid')
            //if has a size replace
            this.bids.splice(foundBid, 1, bid)
          }
        }
        else {
          if(bid[1]){
            // const pos =  this.bids.findIndex((element) => parseFloat(element[0]) > parseFloat(bid[0]))
            // this.bids.splice(pos, 0, bid)
            this.bids.push(bid)
            console.log(bid, 'putting bid')
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
    data.asks?.map((ask: any) => {
      let foundAsk = this.asks.findIndex((element) => parseFloat(element[0]) === parseFloat(ask[0]))
        if (foundAsk !== -1){
          if(!ask[1]){
            this.asks.splice(foundAsk, 1)
          } else {
            console.log(ask, 'ask')
            this.asks.splice(foundAsk, 1, ask)
          }
        } 
        else {
          if(ask[1]){
            // const pos =  this.asks.findIndex((element) => parseFloat(element[0]) > parseFloat(ask[0])) - 1
            // this.asks.splice(pos, 0, ask)
            this.asks.push(ask)
            console.log(ask, 'putting ask')
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
    // console.log(toJS(this.bids[0][0]), 'bbb')
    if(this.bids[0] && this.asks[0]) {
      this.spread = this.bids[0][0] - this.asks[0][0]
    }
  }
}

export default new DataStore()
