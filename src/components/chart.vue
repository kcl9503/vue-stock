<template>
    <div>
        <highcharts constructorType="stockChart" class="hc" :options="chartOptions" ref="chart"></highcharts>
    </div>
</template>

<script>
const data = [[1416182400000, 7.204, 7.232, 7.037, 7.072, 889594.5],
    [1416268800000, 7.072, 7.107, 6.933, 6.968, 930296.44],
    [1416355200000, 6.968, 7.232, 7.037, 7.072, 889594.5],
    [1416441600000, 7.072, 7.107, 6.933, 3.968, 930296.44],
    [1416538000000, 3.968, 7.232, 7.037, 7.072, 889594.5],
    [1416624400000, 7.072, 7.107, 6.933, 6.968, 930296.44],
    [1416710800000, 6.968, 7.107, 6.933, 6.968, 930296.44],
    [1416797200000, 6.968, 7.107, 6.933, 6.968, 930296.44],
    [1416883600000, 6.968, 7.107, 6.933, 6.968, 930296.44],]
    const stockData = data.map(d => d.slice(0.2))
export default{
    data(){
      return {
        chartOptions: {
          title: {
          text: 'Company'
          },
          // legend: {
          //   layout: 'vertical',
          //   align: 'right',
          //   verticalAlign: 'middle'
          // },
          series: [{
            type: 'candlestick',
            data: [],
            color: 'green',
            lineColor: 'green',
            upColor: 'red',
            upLineColor: 'red',
            maxPointWidth: 10,
          },
          {
            type: "column",
            name: "成交量(亿)",
            data: [],
            maxPointWidth: 7,
          }]
        }
      }
    },
    created(){
      let dataLength = stockData.length
      let i = 0
       let ohlc = []
       let volume = []
        for (i; i < dataLength; i += 1) {
            let timeStamp = stockData[i][0];
            ohlc.push([
              timeStamp, // the date
              stockData[i][1], // open
              stockData[i][2], // high
              stockData[i][3], // low
              stockData[i][4] // close
            ]);
            volume.push({
              x: stockData[i][0],
              y: stockData[i][5],
                         color: stockData[i][1] > stockData[i][4] ? 'green' : 'red'
            })
        }
        
        this.chartOptions.series[0].data = ohlc;
        this.chartOptions.series[1].data = volume
      console.log(this.chartOptions.series)
    }
}
</script>

<style lang="scss" scoped>

</style>