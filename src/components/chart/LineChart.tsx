import { ResponsiveLine, LineSerieData } from "@nivo/line";
import * as React from "react";
import { Component } from "react";

interface ILineChartProps {
    data: LineSerieData[];

    area?: boolean;
}

export class LineChart extends Component<ILineChartProps> {
    render() {
        const { area = false, data } = this.props;
        return (
            <ResponsiveLine
                data={data}
                enableArea={area}

                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", stacked: true, min: 0, max: "auto" }}

                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 1,
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legendOffset: -40,
                    legendPosition: "middle",
                }}

                colors={["#6574cd", "#45aaf2"]}
                enableGridX={false}
                pointSize={5}
                pointColor={{ from: "color", modifiers: [] }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor", modifiers: [] }}
                areaOpacity={0.05}
                enableCrosshair={true}
                enableSlices="x"
                useMesh={true}

                legends={[
                    {
                        anchor: "right",
                        direction: "column",
                        justify: false,
                        translateX: 90,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: "left-to-right",
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: "circle",
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
    }
}
