"use client"
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/components/fonts';
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';

export default async function LineCharts() {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490,2345,3456,1234,3456,2345];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300,9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
      Kullanıldığı Alanlar      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">

        <div className="bg-white px-6">
        <LineChart
      width={500}
      height={300}
      series={[
        { data: pData, label: 'Amerika', id: 'pvId', color: 'rgb(255, 193, 7)' },
        { data: uData, label: 'Asya', id: 'uvId', color: 'rgb(0, 171, 85)' },
      ]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      sx={{
        [`.${lineElementClasses.root}, .${markElementClasses.root}`]: {
          strokeWidth: 1,
        },
        '.MuiLineElement-series-pvId': {
          stroke: 'rgb(255, 193, 7)',
          strokeDasharray: '5 5',
        },
        '.MuiLineElement-series-uvId': {
          stroke: 'rgb(0, 171, 85)',
          strokeDasharray: '3 4 5 2',
        },
        [`.${markElementClasses.root}.pvId rect`]: {
          fill: 'rgb(255, 193, 7)',
        },
        [`.${markElementClasses.root}.uvId rect`]: {
          fill: 'rgb(0, 171, 85)',
        },
        [`.${markElementClasses.root}:not(.${markElementClasses.highlighted})`]: {
          fill: '#fff',
        },
        [`& .${markElementClasses.highlighted}`]: {
          stroke: 'none',
        },

    
      }}
    />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
