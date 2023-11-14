import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { selectPlotData } from '../app/slices/GASlice';
import { useMemo, useState } from 'react';
import colorLib from '@kurkle/color';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LogarithmicScale
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Genetic Algorithm Evaluation',
    },
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Generation',
      },
    },
    y: {
      display: true,
      type: 'logarithmic',
      title: {
        display: true,
        text: 'Distance',
      },
    },
  },
};

const CHART_COLORS = [
  'rgb(255, 99, 132)',
  'rgb(75, 192, 192)',
  'rgb(153, 102, 255)',
  'rgb(54, 162, 235)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
];

const Plot = () => {
  const [open, setOpen] = useState(false);

  const plotData = useSelector(selectPlotData);
  let generations: number[] = useMemo(() => [], []);

  Object.values(plotData).forEach((entry) => {
    if (entry.length > generations.length) {
      generations = entry.map((record) => record[0]);
    }
    return entry[0];
  });

  const data = useMemo(() => {
    const data = {
      labels: generations,
      datasets: Object.values(plotData).map((entry, i) => {
        const data = entry.map((record) => record[1]);

        return {
          label: `Dataset ${i}`,
          data,
          borderColor: CHART_COLORS[i % CHART_COLORS.length],
          backgroundColor: colorLib(CHART_COLORS[i % CHART_COLORS.length])
            .alpha(0.5)
            .rgbString(),
        };
      }),
    };

    return data;
  }, [generations, plotData]);

  return (
    <Box mt={1}>
      {!open ? (
        <Button variant="contained" onClick={() => setOpen(true)}>
          Open Plot
        </Button>
      ) : (
        <Button variant="contained" onClick={() => setOpen(false)}>
          Hide Plot
        </Button>
      )}
      {/* eslint-disable-next-line */}
      {open && <Line options={options as any} data={data} />}
    </Box>
  );
};

export default Plot;
