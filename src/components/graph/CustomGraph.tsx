import { ResponsiveLine } from "@nivo/line";

export const CustomGraph = ({ data = [
    {
        "id": "japan",
        "color": "hsl(65, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 274,
            },
            {
                "x": "helicopter",
                "y": 40,
            },
            {
                "x": "boat",
                "y": 147,
            },
            {
                "x": "train",
                "y": 14,
            },
            {
                "x": "subway",
                "y": 214,
            },
            {
                "x": "bus",
                "y": 78,
            },
            {
                "x": "car",
                "y": 41,
            },
            {
                "x": "moto",
                "y": 69,
            },
            {
                "x": "bicycle",
                "y": 61,
            },
            {
                "x": "horse",
                "y": 64,
            },
            {
                "x": "skateboard",
                "y": 137,
            },
            {
                "x": "others",
                "y": 147,
            },
        ],
    },
    {
        "id": "france",
        "color": "hsl(18, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 10,
            },
            {
                "x": "helicopter",
                "y": 211,
            },
            {
                "x": "boat",
                "y": 150,
            },
            {
                "x": "train",
                "y": 293,
            },
            {
                "x": "subway",
                "y": 243,
            },
            {
                "x": "bus",
                "y": 275,
            },
            {
                "x": "car",
                "y": 291,
            },
            {
                "x": "moto",
                "y": 294,
            },
            {
                "x": "bicycle",
                "y": 76,
            },
            {
                "x": "horse",
                "y": 272,
            },
            {
                "x": "skateboard",
                "y": 173,
            },
            {
                "x": "others",
                "y": 177,
            },
        ],
    },
    {
        "id": "us",
        "color": "hsl(181, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 276,
            },
            {
                "x": "helicopter",
                "y": 276,
            },
            {
                "x": "boat",
                "y": 46,
            },
            {
                "x": "train",
                "y": 297,
            },
            {
                "x": "subway",
                "y": 220,
            },
            {
                "x": "bus",
                "y": 246,
            },
            {
                "x": "car",
                "y": 122,
            },
            {
                "x": "moto",
                "y": 61,
            },
            {
                "x": "bicycle",
                "y": 194,
            },
            {
                "x": "horse",
                "y": 171,
            },
            {
                "x": "skateboard",
                "y": 158,
            },
            {
                "x": "others",
                "y": 169,
            },
        ],
    },
    {
        "id": "germany",
        "color": "hsl(183, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 154,
            },
            {
                "x": "helicopter",
                "y": 204,
            },
            {
                "x": "boat",
                "y": 266,
            },
            {
                "x": "train",
                "y": 19,
            },
            {
                "x": "subway",
                "y": 26,
            },
            {
                "x": "bus",
                "y": 205,
            },
            {
                "x": "car",
                "y": 240,
            },
            {
                "x": "moto",
                "y": 134,
            },
            {
                "x": "bicycle",
                "y": 172,
            },
            {
                "x": "horse",
                "y": 296,
            },
            {
                "x": "skateboard",
                "y": 83,
            },
            {
                "x": "others",
                "y": 181,
            },
        ],
    },
    {
        "id": "norway",
        "color": "hsl(348, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 95,
            },
            {
                "x": "helicopter",
                "y": 227,
            },
            {
                "x": "boat",
                "y": 22,
            },
            {
                "x": "train",
                "y": 22,
            },
            {
                "x": "subway",
                "y": 87,
            },
            {
                "x": "bus",
                "y": 106,
            },
            {
                "x": "car",
                "y": 279,
            },
            {
                "x": "moto",
                "y": 169,
            },
            {
                "x": "bicycle",
                "y": 210,
            },
            {
                "x": "horse",
                "y": 65,
            },
            {
                "x": "skateboard",
                "y": 108,
            },
            {
                "x": "others",
                "y": 30,
            },
        ],
    },
] }) => {
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{ type: "linear", stacked: true, min: -13, max: "auto" }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 1,
                legend: "transportation",
                legendOffset: 36,
                legendPosition: "middle",
            }}
            axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "count",
                legendOffset: -40,
                legendPosition: "middle",
            }}
            enableGridX={false}
            colors={{ scheme: "purple_orange" }}
            pointSize={5}
            pointColor={{ from: "color", modifiers: [] }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor", modifiers: [] }}
            pointLabel="y"
            pointLabelYOffset={-12}
            enableArea={true}
            areaOpacity={0.05}
            enableCrosshair={false}
            useMesh={true}
            legends={[
                {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                        {
                            on: "hover",
                            style: {
                                itemBackground: "rgba(0, 0, 0, .03)",
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};
