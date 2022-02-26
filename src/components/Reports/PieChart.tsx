import React, { useState, useEffect } from 'react'
import { Doughnut } from "react-chartjs-2";
import { Context } from 'chartjs-plugin-datalabels';
import { Chart, registerables, ArcElement } from "chart.js";
Chart.register(...registerables);
Chart.register(ArcElement);


interface IGroupedReportsResponse {
  id: string;
  items: IGroupedReportItemProps[];
  total: number;
  name: string;
}

interface IGroupedReportItemProps {
  paymentId: string;
  amount: number;
  id: string;
  created: string;
}

interface IPieChartProps {
  data: IGroupedReportsResponse[];
}

export const PieChart = (props: IPieChartProps): JSX.Element => {

  const [data, setData] = useState<IGroupedReportsResponse[]>(props.data);
  console.log(props.data);
  useEffect(() => {
    setData(props.data);
  }, [props.data]);

  return (
    <div style={{ direction: 'ltr' }} className="DoughnutChart-containr">
      {data &&
        <Doughnut
          data={
            {
              labels: data.map(e => e.name),
              datasets: [
                {
                  data: data.map(e => e.total),
                  backgroundColor: ["#FFCE56", "#4BC0C0",]
                }
              ]
            }
          }
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              datalabels: {
                formatter: (value: number, ctx: ChartContext) => {
                  console.log(ctx);

                  // let sum = ctx.dataset.total;
                  // let percentage = (value * 100 / sum).toFixed(2) + "%";
                  return 50;
                },
                color: '#fff',
              }
            }
          }}
        />
      }
    </div>
  )
}

interface ChartContext extends Context {
  data?: number;
}