import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  public forexData: any[] = [
    { symbol: 'EUR/USD', bid: 1.04805, ask: 1.04807, change: -0.00065, percentChange: -0.06, high: 1.05063, low: 1.04668, volume: 1.12138, time: '17:18:02' },
    { symbol: 'BTC/USD', bid: 95550.00, ask: 95551.00, change: -707, percentChange: -0.73, high: 97163.00, low: 95307.00, volume: 109590, time: '17:18:02' },
    { symbol: 'GBP/USD', bid: 1.26201, ask: 1.26205, change: 0.00407, percentChange: 0.32, high: 1.26264, low: 1.25730, volume: 1.34342, time: '17:18:00' },
    { symbol: 'USD/JPY', bid: 151.4, ask: 151.405, change: -0.74, percentChange: -0.49, high: 152.389, low: 151.337, volume: 161.95, time: '17:18:00' },
    { symbol: 'USD/CHF', bid: 0.9009, ask: 0.90096, change: 0.00291, percentChange: 0.32, high: 0.90180, low: 0.89643, volume: 0.92243, time: '17:18:00' },
    { symbol: 'USD/CAD', bid: 1.41821, ask: 1.41830, change: 0.0009, percentChange: 0.06, high: 1.41940, low: 1.41536, volume: 1.47928, time: '17:17:23' },
    { symbol: 'AUD/USD', bid: 0.63648, ask: 0.63653, change: 0.00221, percentChange: 0.35, high: 0.63738, low: 0.63428, volume: 0.69421, time: '17:18:00' },
    { symbol: 'USD/CNY', bid: 7.2624, ask: 7.26340, change: 0.0099, percentChange: 0.14, high: 7.26370, low: 7.24330, volume: 7.3327, time: '17:16:12' },
    { symbol: 'USD/SGD', bid: 1.34124, ask: 1.34139, change: 0.00486, percentChange: 0.36, high: 1.34192, low: 1.33738, volume: 1.37511, time: '17:17:56' },
    { symbol: 'NZD/USD', bid: 0.57397, ask: 0.57402, change: 0.00419, percentChange: 0.74, high: 0.57501, low: 0.57132, volume: 0.63785, time: '17:18:02' },
    { symbol: 'EUR/GBP', bid: 0.83045, ask: 0.83049, change: -0.00227, percentChange: -0.27, high: 0.83387, low: 0.83026, volume: 0.86445, time: '17:17:46' },
    { symbol: 'EUR/JPY', bid: 158.675, ask: 158.685, change: -0.958, percentChange: -0.60, high: 159.826, low: 158.529, volume: 175.425, time: '17:18:00' },
    { symbol: 'EUR/CHF', bid: 0.94422, ask: 0.94428, change: 0.00157, percentChange: 0.17, high: 0.94501, low: 0.93927, volume: 0.99305, time: '17:18:00' },
    { symbol: 'EUR/CAD', bid: 1.4863, ask: 1.48642, change: -0.00005, percentChange: 0.00, high: 1.48852, low: 1.48330, volume: 1.5227, time: '17:18:02' },
    { symbol: 'EUR/AUD', bid: 1.64654, ask: 1.64665, change: -0.00272, percentChange: -0.16, high: 1.65207, low: 1.64465, volume: 1.71844, time: '17:18:00' },
    { symbol: 'EUR/NZD', bid: 1.82585, ask: 1.82615, change: 0.00712, percentChange: 0.39, high: 1.83255, low: 1.82540, volume: 1.86489, time: '17:18:02' },
    { symbol: 'GBP/JPY', bid: 191.069, ask: 191.083, change: -0.379, percentChange: -0.20, high: 191.734, low: 190.628, volume: 208.109, time: '17:18:01' },
    { symbol: 'AUD/JPY', bid: 96.364, ask: 96.374, change: -0.167, percentChange: -0.17, high: 96.841, low: 96.319, volume: 109.37, time: '17:18:00' },
    { symbol: 'AUD/CAD', bid: 0.90264, ask: 0.90274, change: 0.00357, percentChange: 0.40, high: 0.90347, low: 0.89765, volume: 0.93767, time: '17:17:50' }
  ];
  constructor() { }
  getdata(){
    return this.forexData;
  }
}
