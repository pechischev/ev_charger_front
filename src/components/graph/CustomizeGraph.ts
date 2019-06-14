export namespace CustomizeGraph {
    export const legendParams = [
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
    ];

    export const axisLeft = {
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
    };

    export const axisBottom = {
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 1,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
    };
}
