import React from 'react';
import { ResponsiveBar } from "@nivo/bar";
import { darkTheme } from '../components/Theme';
import { lightTheme } from '../components/Theme'
import { ThemeProvider } from '@material-ui/core/styles';
import ThemeContext from '../components/Theme';


// Nivo theming
const theme1 = {
  axis: {
    ticks: {
      line: {
        stroke: darkTheme.palette.primary.main,
        strokeWidth: 0
      },
      text: {
        fill: darkTheme.palette.primary.main,
        fontFamily: "'Roboto', sans-serif",
      }
    }
  },
  grid: {
    line: {
      stroke: darkTheme.palette.primary.main,
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
  axis: {
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
      stroke: lightTheme.palette.primary.main,
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


class BarChart extends React.Component {

  static contextType = ThemeContext

  render() {
    const { data, keys, index, groupMode, tickValues, colorBy, customTooltip, layout } = this.props;
    
    let theme = theme2;
    theme = this.context ? theme2 : theme1;



    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <ResponsiveBar
          theme={theme}
          data={data}
          keys={keys}
          indexBy={index}
          groupMode={groupMode}
          margin={{
            top: 36,
            right: 32,
            bottom: 36,
            left: 32
          }}
          layout={layout}
          padding={0.5}
          colors={{scheme: "category10"}}
          colorBy={colorBy}
          borderColor={theme.legends.text.fill}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 36
          }}
          axisLeft={{
            tickValues: tickValues,
            orient: "left",
            tickPadding: 0,
            tickRotation: 0,
            legend: "",
            legendPosition: "start",
            legendOffset: -40
          }}
          enableGridY={true}
          gridYValues={tickValues}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={theme.legends.text.fill}
          enableLabel={false}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          tooltip={customTooltip ? customTooltip : null}
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "top-left",
        //     direction: "row",
        //     justify: false,
        //     translateX: -10,
        //     translateY: -30,
        //     itemsSpacing: 32,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     itemTextColor: "#919eab",
        //     symbolSize: 10,
        //     symbolShape: "circle",
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1
        //         }
        //       }
        //     ]
        //   }
        // ]}
        />
        </ThemeProvider>
      </React.Fragment>
      
    );
  }
}

export default BarChart;