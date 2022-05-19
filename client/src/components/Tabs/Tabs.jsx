import React from 'react';
import DailyExpense from '../Main/DailyExpense';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  PieChart,
  Pie,
  Legend,
  Sector,
  Cell,
  ResponsiveContainer,
} from 'recharts';

const Tabs = ({ color, monthYear }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [data, setData] = useState([]);

  // Sample data
  // const data = [
  //   { name: 'Food', value: 400 },
  //   { name: 'Apparels', value: 300 },
  //   { name: 'Transport', value: 300 },
  //   { name: 'Others', value: 200 },
  // ];

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/transaction/group/month/2022-06')
      .then((response) => {
        console.log(`response is ${JSON.stringify(response.data)}`);
        console.log(`type is ${typeof data}`);
        setData(response.data);

        console.log(`data is ${JSON.stringify(data)}`);
      });
  }, [monthYear]);

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
  ];
  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * 1.5 * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * 1.5 * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={'middle'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    );
  };

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-3/5">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1
                    ? 'text-white bg-pink-600'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Expense Details
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2
                    ? 'text-white bg-pink-600'
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Expense Stats
              </a>
            </li>
          </ul>
          <div className="border-solid border-2 border-pink-600 relative flex flex-col min-w-0 break-words bg-blue w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <DailyExpense monthYear={monthYear} />
                </div>
                <button>Test</button>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  <PieChart width={700} height={700}>
                    <Legend layout="vertical" verticalAlign="top" align="top" />
                    <Pie
                      data={data}
                      cx="45%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      nameKey="category"
                      dataKey="total"
                      outerRadius={210}
                      fill="#8884d8"
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
