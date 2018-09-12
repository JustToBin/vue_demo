<style lang="less" scoped>
.fee-manage-total-tab-container {
  height: 100%;
  .fee-manage-total-tab-item {
    height: 50%; 
    width: 100%;
  }
}
</style>


<template>
  <div class="fee-manage-total-tab-container">
    <div class="fee-manage-total-tab-item">
      <ECharts :extend-option="option1" :cust-render="custRender"></ECharts>
    </div>
    <div class="fee-manage-total-tab-item">
      <ECharts :extend-option="option2"></ECharts>
    </div>
  </div>
</template>

<script>
let dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149];
let yMax = 500;
let dataShadow = [];

for (let i = 0; i < data.length; i++) {
  dataShadow.push(yMax);
}
export default {
  data() {
    return {
      option1: {
        color: ['#03befd', '#ff8804', '#88e6fb', '#218ffd', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        title: {
          // text: '南丁格尔玫瑰图',
          // subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: 'center',
          y: 'bottom',
          data: ['住院收入', '门诊收入', '科研收入', '其他收入']
        },
        // toolbox: {
        //     show: true,
        //     feature: {
        //         mark: {show: true},
        //         dataView: {show: true, readOnly: false},
        //         magicType: {
        //             show: true,
        //             type: ['pie', 'funnel']
        //         },
        //         restore: {show: true},
        //         saveAsImage: {show: true}
        //     }
        // },
        calculable: true,
        series: [
          {
            name: '半径模式',
            type: 'pie',
            radius: [50, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: [
              { value: 240, name: '门诊收入' },
              { value: 210, name: '科研收入' },
              { value: 90, name: '其他收入' },
              { value: 460, name: '住院收入' }
            ]
          }
        ]
      },
      option2: {
        // title: {
        //   text: '特性示例：渐变色 阴影 点击缩放',
        //   subtext: 'Feature Sample: Gradient Color, Shadow, Click Zoom'
        // },
        xAxis: {
          data: dataAxis,
          axisLabel: {
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        series: [
          { // For shadow
            type: 'bar',
            itemStyle: {
              normal: { color: 'rgba(0,0,0,0.05)' }
            },
            barGap: '-100%',
            barCategoryGap: '70%',
            data: dataShadow,
            animation: false
          },
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#00a5f9' },
                    { offset: 1, color: '#356af5' }
                  ]
                )
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#fc8a0a' },
                    { offset: 1, color: '#fc8a0a' }
                  ]
                )
              }
            },
            data: data
          }
        ]
      }
    };
  },
  methods: {
    custRender(_zr) {
      _zr.add(new echarts.graphic.Text(
        {
          style: {            
            x: _zr.getWidth() / 2,
            y: _zr.getHeight() / 2 - 8,
            color: '#666', 
            text: '836.5万元',
            textAlign: 'center', 
            textFont: 'bold 16px verdana'
          }
        }
      ));
    }
  }
};
</script>

