import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
// import DatePickerValue from '../DatePicker/DatePIcker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { getReport } from '../../API/reportAPI';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

let graphData

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
  const theme = useTheme();
  const [startDate, setStartDate] = React.useState('')
  const [endDate, setEndDate] = React.useState('')
  const [dataArray, setDataArray] = React.useState([])

  const getData = async (startDate, endDate) => {
    try {
      console.log('dates', startDate, endDate);
      const result = await getReport(startDate, endDate)
      setDataArray(result?.data?.data)
      console.log("result", result)

    } catch (error) {

    }

  }
  function createData1(date, price) {
    return { date, price };
  }
  const data1 = () => {
    console.log("dataArray",dataArray)
    graphData = dataArray?.map((value, index) => {
      // console.log('mpping', value)
      const dateFormat = value.createdAt.toString().split('T')[0]
      console.log('datefomat', dateFormat);
      return (
        createData1(dateFormat, value.sum_total)
        )
    })
  }
  React.useEffect(() => {
    data1()
    
  }, [dataArray])
  return (
    <React.Fragment>
      <Title>Sales Graph</Title>
      {/* <DatePickerValue /> */}
      <div className='flex '>
        <div className='flex items-center'>

          <div className='mx-2'>
            <TextField
              id="outlined-basic"
              label="StartDate"
              variant="outlined"
              placeholder="YYYY-MM-DD"
              className=' bg-white'

              onChange={(event) => {
                setStartDate(event.target.value);
              }} />
          </div>
          <div className='mx-2'>
            <TextField
              id="outlined-basic"
              label="EndDate"
              variant="outlined"
              placeholder="YYYY-MM-DD"
              className=' bg-white'

              onChange={(event) => {
                setEndDate(`${event.target.value}`);
              }} />
          </div>
          <div className='mx-2'>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                getData(startDate, endDate);
              }}
            >
              GET DATA
            </Button>
          </div>
        </div>
      </div>
      <ResponsiveContainer>
        <LineChart
          data={graphData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales (Rp)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="price"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>

      </ResponsiveContainer>
    </React.Fragment>
  );
}