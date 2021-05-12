import { ResponsiveLine } from '@nivo/line'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data = [
  {
    "id": "japan",
    "color": "hsl(241, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 3
      },
      {
        "x": "helicopter",
        "y": 126
      },
      {
        "x": "boat",
        "y": 53
      },
      {
        "x": "train",
        "y": 238
      },
      {
        "x": "subway",
        "y": 197
      },
      {
        "x": "bus",
        "y": 64
      },
      {
        "x": "car",
        "y": 186
      },
      {
        "x": "moto",
        "y": 89
      },
      {
        "x": "bicycle",
        "y": 141
      },
      {
        "x": "horse",
        "y": 153
      },
      {
        "x": "skateboard",
        "y": 168
      },
      {
        "x": "others",
        "y": 82
      }
    ]
  },
  {
    "id": "france",
    "color": "hsl(337, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 231
      },
      {
        "x": "helicopter",
        "y": 292
      },
      {
        "x": "boat",
        "y": 176
      },
      {
        "x": "train",
        "y": 257
      },
      {
        "x": "subway",
        "y": 26
      },
      {
        "x": "bus",
        "y": 252
      },
      {
        "x": "car",
        "y": 267
      },
      {
        "x": "moto",
        "y": 273
      },
      {
        "x": "bicycle",
        "y": 131
      },
      {
        "x": "horse",
        "y": 156
      },
      {
        "x": "skateboard",
        "y": 125
      },
      {
        "x": "others",
        "y": 119
      }
    ]
  },
  {
    "id": "us",
    "color": "hsl(4, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 190
      },
      {
        "x": "helicopter",
        "y": 43
      },
      {
        "x": "boat",
        "y": 219
      },
      {
        "x": "train",
        "y": 290
      },
      {
        "x": "subway",
        "y": 42
      },
      {
        "x": "bus",
        "y": 2
      },
      {
        "x": "car",
        "y": 147
      },
      {
        "x": "moto",
        "y": 241
      },
      {
        "x": "bicycle",
        "y": 272
      },
      {
        "x": "horse",
        "y": 10
      },
      {
        "x": "skateboard",
        "y": 189
      },
      {
        "x": "others",
        "y": 145
      }
    ]
  },
  {
    "id": "germany",
    "color": "hsl(147, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 85
      },
      {
        "x": "helicopter",
        "y": 184
      },
      {
        "x": "boat",
        "y": 201
      },
      {
        "x": "train",
        "y": 48
      },
      {
        "x": "subway",
        "y": 240
      },
      {
        "x": "bus",
        "y": 53
      },
      {
        "x": "car",
        "y": 260
      },
      {
        "x": "moto",
        "y": 187
      },
      {
        "x": "bicycle",
        "y": 137
      },
      {
        "x": "horse",
        "y": 284
      },
      {
        "x": "skateboard",
        "y": 100
      },
      {
        "x": "others",
        "y": 143
      }
    ]
  },
  {
    "id": "norway",
    "color": "hsl(67, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": 215
      },
      {
        "x": "helicopter",
        "y": 40
      },
      {
        "x": "boat",
        "y": 167
      },
      {
        "x": "train",
        "y": 20
      },
      {
        "x": "subway",
        "y": 281
      },
      {
        "x": "bus",
        "y": 265
      },
      {
        "x": "car",
        "y": 112
      },
      {
        "x": "moto",
        "y": 85
      },
      {
        "x": "bicycle",
        "y": 220
      },
      {
        "x": "horse",
        "y": 204
      },
      {
        "x": "skateboard",
        "y": 244
      },
      {
        "x": "others",
        "y": 16
      }
    ]
  }
]

const myResponsiveLine = ({ data }) => (
    <ResponsiveLine
        data={data}
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
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
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
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)