import React from "react";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

import { darkTheme } from '../components/Theme';
import { lightTheme } from '../components/Theme';
import ThemeContext from '../components/Theme';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Media, MediaContextProvider } from "../utils/media";
import { ResponsiveLine } from '@nivo/line'



// Nivo theming
const theme1 = {
    crosshair: {
        line: {
            stroke: darkTheme.palette.primary.main,
            strokeWidth: 1,
            strokeOpacity: 0.35,
        },
    },
    axis: {
        legend: {
            text: {
              fontFamily: "'Roboto', sans-serif",
              fill: darkTheme.palette.primary.main,
            }
          },
      ticks: {
        line: {
          stroke: darkTheme.palette.primary.main,
          strokeWidth: 0
        },
        text: {
          fill: darkTheme.palette.primary.main,
          fontFamily: "'Roboto', sans-serif",
        }
      },
    },
    grid: {
      line: {
        stroke: darkTheme.palette.nuetral.main,
        strokeWidth: 0.5
      }
    },
    legends: {
      text: {
        fontFamily: "'Roboto', sans-serif",
        fill: darkTheme.palette.primary.main,
      }
    },
    tooltip: {
      container: {
          background: darkTheme.palette.background.default,
      },
  },
  };
  
  const theme2 = {
      crosshair: {
        line: {
            stroke: lightTheme.palette.primary.main,
            strokeWidth: 1,
            strokeOpacity: 0.35,
        },
    },
    axis: {
        legend: {
            text: {
              fontFamily: "'Roboto', sans-serif",
              fill: lightTheme.palette.primary.main,
            }
          },
      ticks: {
        line: {
          stroke: lightTheme.palette.primary.main,
          strokeWidth: 0
        },
        text: {
          fill: lightTheme.palette.primary.main,
          fontFamily: "'Roboto', sans-serif",
        }
      }
    },
    grid: {
      line: {
        stroke: lightTheme.palette.nuetral.main,
        strokeWidth: 0.5
      }
    },
    legends: {
      text: {
        fontFamily: "'Roboto', sans-serif",
        fill: lightTheme.palette.primary.main,
      }
    },
    tooltip: {
      container: {
          background: lightTheme.palette.background.default,
      },
  },
  };

  const data = [
    {
      "id": "TCA",
      "color": "hsl(241, 70%, 50%)",
      "data": [
        {
          "x": "2021-05",
          "y": 2
        },
        {
          "x": "2021-04",
          "y": 3
        },
        {
          "x": "2021-03",
          "y": 2
        },
        {
          "x": "2021-02",
          "y": 4
        },
        {
          "x": "2021-01",
          "y": 5
        },
        {
          "x": "2020-12",
          "y": 6
        },
        {
          "x": "2020-11",
          "y": 7
        },
        {
          "x": "2020-10",
          "y": 7
        },
        {
          "x": "2020-09",
          "y": 6
        },
        {
          "x": "2020-08",
          "y": 5
        },
        {
          "x": "2020-07",
          "y": 4
        },
        {
          "x": "2020-06",
          "y": 3
        }
      ]
    },
    {
      "id": "Discount",
      "color": "hsl(337, 70%, 50%)",
      "data": [
        {
          "x": "2021-05",
          "y": 2.5
        },
        {
          "x": "2021-04",
          "y": 3.15
        },
        {
          "x": "2021-03",
          "y": 2.2
        },
        {
          "x": "2021-02",
          "y": 4.5
        },
        {
          "x": "2021-01",
          "y": 5.75
        },
        {
          "x": "2020-12",
          "y": 6.1
        },
        {
          "x": "2020-11",
          "y": 4
        },
        {
          "x": "2020-10",
          "y": 2
        },
        {
          "x": "2020-09",
          "y": 1
        },
        {
          "x": "2020-08",
          "y": 2
        },
        {
          "x": "2020-07",
          "y": 3
        },
        {
          "x": "2020-06",
          "y": 4
        }
      ]
    },
    {
      "id": "TCR",
      "color": "hsl(4, 70%, 50%)",
      "data": [
        {
          "x": "2021-05",
          "y": 2.5
        },
        {
          "x": "2021-04",
          "y": 2.15
        },
        {
          "x": "2021-03",
          "y": 6.2
        },
        {
          "x": "2021-02",
          "y": 4.5
        },
        {
          "x": "2021-01",
          "y": 5.75
        },
        {
          "x": "2020-12",
          "y": 6.1
        },
        {
          "x": "2020-11",
          "y": 8
        },
        {
          "x": "2020-10",
          "y": 2
        },
        {
          "x": "2020-09",
          "y": 1.8
        },
        {
          "x": "2020-08",
          "y": 5
        },
        {
          "x": "2020-07",
          "y": 3
        },
        {
          "x": "2020-06",
          "y": 4
        }
      ]
    }
   
  ]

class Chart extends React.Component {

    static contextType = ThemeContext

    

    render() {
        let theme = theme2;
        theme = this.context ? theme2 : theme1;

        return (
            <div className="chart" >
                <React.Fragment>
                <Card >
                  <CardContent style={{height:450}}>
                  <ResponsiveLine
                        data={data}
                        theme={theme}
                        colors= {this.context ? { scheme: "dark2"} : {scheme: "pastel2"}}
                        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                        xScale={{ type: 'point' }}
                        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                        yFormat=" >-.2f"
                        axisTop={null}
                        axisRight={null}
                        axisBottom={{
                            orient: 'bottom',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'Past Year',
                            legendOffset: 36,
                            legendPosition: 'middle',
                            fill: theme.grid.line.stroke,
                        }}
                        axisLeft={{
                            orient: 'left',
                            tickSize: 5,
                            tickPadding: 5,
                            tickRotation: 0,
                            legend: 'TCR/Discount',
                            legendOffset: -40,
                            legendPosition: 'middle',
                            fill: theme.grid.line.stroke,
                        }}
                        pointSize={10}
                        pointColor={{ theme: 'background' }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: 'serieColor' }}
                        pointLabelYOffset={-12}
                        axisLabelColor= {theme.grid.line.stroke}
                        useMesh={true}
                        legends={[
                            {
                                anchor: 'bottom-right',
                                direction: 'column',
                                justify: false,
                                translateX: 100,
                                translateY: 0,
                                itemsSpacing: 0,
                                itemDirection: 'left-to-right',
                                itemWidth: 80,
                                itemHeight: 20,
                                itemOpacity: 0.75,
                                itemTextColor: theme.grid.line.stroke,
                                symbolSize: 12,
                                symbolShape: 'circle',
                                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemBackground: theme.grid.line.stroke,
                                            itemOpacity: 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                  </CardContent>
                </Card>
                {/* <Card >
                  <CardContent style={{height:450}}>
                        <ResponsivePie
                            data={data}
                            margin={{ top: 40, right: 40, bottom: 40, left: 100 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            theme={theme}
                            colors={{ scheme: 'pastel2' }}
                            borderWidth={1}
                            radialLabelsSkipAngle={10}
                            radialLabelsTextColor={theme.legends.text.fill}
                            radialLabelsLinkColor={theme.legends.text.fill}
                            sliceLabelsSkipAngle={10}
                            sliceLabelsTextColor="#333333"
                            legends={[
                                {
                                    anchor: 'left',
                                    direction: 'column',
                                    justify: false,
                                    translateX: -80,
                                    translateY: 20,
                                    itemsSpacing: 10,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                        }
                                    ]
                                }
                            ]}
                        />
                  </CardContent>
                </Card> */}

                </React.Fragment>

            </div>
        )
    }
}

export default Chart;