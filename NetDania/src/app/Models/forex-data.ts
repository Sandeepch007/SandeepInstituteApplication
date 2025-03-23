export class ForexData {
    symbol: string='';
    bid: number=0;
    ask: number=0;
    change: number=0;
    percentChange: number=0;
    high: number=0;
    low: number=0;
    volume: number=0;
    time: string=new Date().toLocaleTimeString();
}
