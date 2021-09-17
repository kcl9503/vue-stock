<template>
  <div>
    <highcharts v-if="showChart" class="stock" :constructor-type="'stockChart'" :options="stockOptions" ref="mystock"></highcharts>
  </div>
</template>
<script>
import stockDetail from '../store/index'
import Highcharts from 'highcharts'
// import { data } from './stockData.js'
// const stockDataddd = data.map(d => d.slice(0.2))
export default {
  computed:{
    stockDataDetail(){
      return stockDetail.state.companyStockData
    },
    chartSwitch(){
      return stockDetail.state.chartBoolean
    }
  },
  watch:{
    stockDataDetail(newD){
      this.processData = newD
      this.createData(this.processData)
    },
    chartSwitch(booleanType){
      console.log(booleanType)
      this.showChart = booleanType
    }
  },
  data() {
    return {
      showChart: false,
      processData: [],
      stockOptions: {
        exporting: {
          enabled: false
        },
        navigator: {
          enabled: true 
        },
        scrollbar: {
          enabled: true 
        },
        rangeSelector: {
          selected: 1,
          inputDateFormat: '%Y-%m-%d'
        },
        title: {
          text: ""
        },
        plotOptions: {
            series: {
                states: {
                    hover: {
                        enabled: false
                    }
                },
            }
        },
        xAxis: {
          dateTimeLabelFormats: {
            millisecond: "%H:%M:%S.%L",
            second: "%H:%M:%S",
            minute: "%H:%M",
            hour: "%H:%M",
            day: "%m-%d",
            week: "%m-%d",
            month: "%y-%m",
            year: "%Y"
          },
          minRange:30*24 *3600000,
          min: null,
          max: null,
        },
        tooltip: {
          split: false,
          shared: true,
        },
        yAxis: [
          {
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "股價(元)"
            },
            height: "65%",
            resize: {
              enabled: true
            },
            lineWidth: 0,
            showLastLabel: true,
            showFirstLabel: true,
            tickPositioner: function(){
              var positions = [],
              tick = 0,
              increment = (this.dataMax - this.dataMin) / 5,
              min = this.dataMin;
              if(increment > 1) {
                increment = Math.ceil(increment);
                tick = Math.floor(this.dataMin);
                for (tick; tick - increment <= this.dataMax; tick += increment) {
                  positions.push(tick);
                }
              } else {
                tick = Number(min.toFixed(1))
                increment = Number(increment.toFixed(3))
                for (tick; tick - increment <= this.dataMax; tick += increment) {
                  positions.push(Number(tick.toFixed(2)));
                }
              }
              return positions;
            }
          },
          {
            labels: {
              align: "right",
              x: -3
            },
            title: {
              text: "指数"
            },
            height: "65%",
            resize: {
              enabled: true
            },
            gridLineWidth:0,
            lineWidth: 0,
            showLastLabel: true,
            showFirstLabel: true,
            opposite: false,
            visible: false,
            // tickPositioner: function(){
            //   var positions = [],
            //   tick = 0,
            //   increment = (this.dataMax - this.dataMin) / 5,
            //   max = this.dataMax,
            //   min = this.dataMin;
            //        console.log(max, min)
            //   if(increment > 1) {
            //     increment = Math.ceil(increment);
            //     tick = Math.floor(this.dataMin);
            //     for (tick; tick - increment <= this.dataMax; tick += increment) {
            //       positions.push(tick);
            //     }
            //   } else {
            //     tick = Number(min.toFixed(1))
            //     increment = Number(increment.toFixed(3))
            //     for (tick; tick - increment <= this.dataMax; tick += increment) {
            //       positions.push(Number(tick.toFixed(2)));
            //     }
            //   }
            //   return positions;
            // }
          },
          {
            labels: {
              align: "left",
              x: -3
            },
            title: {
              text: "成交量(億)"
            },
            top: "65%",
            height: "35%",
            offset: 0,
            lineWidth: 2
          }
        ],
        series: [
          {
            type: "candlestick",
            name: "價格",
            color: "red",
            lineColor: "red",
            upColor: "green",
            upLineColor: "green",
            tooltip: {},
            navigatorOptions: {
              color: Highcharts.getOptions().colors[0]
            },
            data: [],
            dataGrouping:[],
            yAxis: 0,
            maxPointWidth: 5,
          },
          {
            type: "column",
            name: "成交量(億)",
            data: [],
            yAxis: 2,
            dataGrouping: [],
            maxPointWidth: 7,
            turboThreshold: 9999
          },
          {
            type:'line',
            name:'ma7' ,
            data: [],
            color: "#000000",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          },{
            type:'line',
            name:'ma10' ,
            data: [],
            color: "#ffc349",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          },{
            type:'line',
            name:'ma30' ,
            data: [],
            color: "#ff8796",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          },{
            type:'line',
            name:'ma99' ,
            data: [],
            color: "#97c068",
            yAxis: 0,
            dataGrouping:[],
            lineWidth: 1,
          }
        ],
      }, 
      code: "",
      stockname: "",
      dailyStockData: [],
      dayk:[],
    };
  },

  methods: {
    createData(data) {
      const stockData = data.map(d => d.slice(0.2))
      let dataLength = stockData.length;
      // set the allowed units for data grouping
      // let groupingUnits = [
      //   [
      //     "week", // unit name
      //     [1] // allowed multiples
      //   ],
      //   ["month", [1, 2, 3, 4, 6]]
      // ];
      let i = 0;
      let timeStamp = 0;
      // let amountv = 0;
      let ohlc = [];
      let ohlc2 = [];
      // let dayday = [];
      // let reladayday = [];
      let volume = [];
      let maset = [7,10,30,99];
			let ma = [];
      for (i = 0; i < dataLength; i += 1) {
        timeStamp = stockData[i][0];
        ohlc.push([
          timeStamp, // the date
          stockData[i][1], // open
          stockData[i][2], // high
          stockData[i][3], // low
          stockData[i][4] // close
        ]);
        ohlc2.push([
          timeStamp, // the date
          stockData[i][4]  // close
        ]);
        volume.push({
          x: timeStamp,
          y: stockData[i][5], // the date
          color: stockData[i][1] > stockData[i][4] ? 'red' : 'green'
        });
        for (let j = 0; j < maset.length; j++) {
          let value = maset[j];
          if(typeof ma['ma'+value] == "undefined"){
            ma['ma'+value]=[];
          }
          if(typeof ma[value+'total'] == "undefined"){
            ma[value+'total']=0;
          }
          if(i < value)
          {
            ma[value+'total'] += stockData[i][4];
            ma['ma'+value].push([timeStamp,null]);
          } else {
            ma[value+'total'] += (stockData[i][4] - stockData[i - value][4]);
            let kk = Number((ma[value+'total']/value).toFixed(2))
            ma['ma'+value].push([timeStamp, kk]);
          }   
        }
      }

      this.stockOptions.series[0].data = ohlc;
      this.stockOptions.series[1].data = volume;
      this.stockOptions.series[2].data = ma['ma7'];
      this.stockOptions.series[3].data = ma['ma10'];
      this.stockOptions.series[4].data = ma['ma30'];
      this.stockOptions.series[5].data = ma['ma99'];

     if(dataLength < 20) {
        var latesttime = ohlc[dataLength - 1][0]
        for(i = dataLength; i < 20; i+=1) {
          latesttime += 24 *3600000
          volume.push({
            x: latesttime,
            y: null,
            color: 'white'
          });
        }
        this.stockOptions.series[1].data = volume;
        this.stockOptions.xAxis.min = ohlc[0][0];
        this.stockOptions.xAxis.max = ohlc[0][0] + 20*24 *3600000;
        this.stockOptions.xAxis.minRange = 30*24 *3600000;
      } 
      else {
        this.stockOptions.xAxis.min = null;
        this.stockOptions.xAxis.max = null;
        this.stockOptions.xAxis.minRange = 30*24 *3600000;
      }
      this.showChart = true
    }
  },
  
};
</script>

<style scoped>
div{
  margin-bottom: 2rem;
}
.stock {
  width: 90%;
  margin: 0 auto;
}
</style>