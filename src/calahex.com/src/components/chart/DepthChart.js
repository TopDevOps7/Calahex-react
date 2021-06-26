// import { width } from '@material-ui/system';
import React, { Component } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class DepthChart extends Component {
  render() {

    let dataPoint1 = this.props.data.asks.reverse().map(ask => ({ x: Number(ask.price), y: ask.sum_amount }));
    let dataPoint2 = this.props.data.bids.map(bid => ({ x: Number(bid.price), y: bid.sum_amount }));
    const options = {
      theme: "light2",
      animationEnabled: true,
      height: 350,
      title: {
        // text: "Comparison of Exchange Rates - 2017"
      },
      subtitles: [{
        // text: "GBP & USD to INR"
      }],
      axisY: {
        includeZero: true,
        // prefix: "Price: "
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: "area",
          name: "BTC",
          // showInLegend: true,
          // xValueFormatString: "MMM YYYY",
          // yValueFormatString: "₹#,##0.##",
          dataPoints: dataPoint1
        },
        {
          type: "area",
          name: "USD",
          // showInLegend: true,
          // xValueFormatString: "MMM YYYY",
          // yValueFormatString: "#,###.##",
          dataPoints: dataPoint2
        }
      ]
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <CanvasJSChart options={options}
        /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

export default DepthChart;