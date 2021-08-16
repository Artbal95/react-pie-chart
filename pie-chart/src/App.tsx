import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Pie, PieChart, Sector, ResponsiveContainer } from 'recharts'
import { useState } from 'react'

type PieDataType = {
  name: string;
  value: number;
  color: string;
  z: number
}



const PieMainChart = (): JSX.Element => {

  const data: PieDataType[] = [
    {
      name: 'Abat',
      value: 32.54,
      color: '#45bc45',
      z: 5
    },
    {
      name: 'Doge',
      value: 24.55,
      color: '#25AF65',
      z: 2
    },
    {
      name: 'Bitcoin',
      value: 17.24,
      color: '#25AF65',
      z: 10
    },
    {
      name: 'vazgen',
      value: 14.32,
      color: '#25AF65',
      z: 8
    },
    {
      name: 'poxos',
      value: 11.35,
      color: '#25AF65',
      z: 4
    }
  ]

  const dataPercent: number[] = []
  data.map((d) => {
    dataPercent.push(360 * d.value / 100)
  })
  let start = 0

  const [isActiveShape, setActiveShape] = useState<number>(0)
  const [isMouseEnter, setMouseEnter] = useState<number>(-1)

  const handlerClick = (name: string) => {
    const customIndex = data.findIndex((d) => d.name === name)
    setActiveShape(customIndex)
  }

  const handlerMouseEnter = (name: string) => {
    const customIndex = data.findIndex((d) => d.name === name)
    setMouseEnter(customIndex)
  }

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight="300px">
      <PieChart width={300} height={300} >
        {data.map((d: PieDataType, i: number, all: PieDataType[]) => {
          if(i > 0){
            start += dataPercent[i - 1]
          }
          return (
            <Pie 
              key={uuidv4()} 
              data={[d]} 
              dataKey={"value"}
              fill={d.color}
              fillOpacity={isMouseEnter === i ? "1" : ".4"}
              isAnimationActive={false}
              startAngle={i === 0 ? 0 : start} 
              endAngle={i === 0 ? dataPercent[i] : start + dataPercent[i]}
              innerRadius={40}
              outerRadius={80 + d.z * 2}
              activeIndex={isActiveShape === i ? 0 : -1}
              activeShape={CustomActiveShape}
              onClick={(options: any) => handlerClick(options.name)}
              onMouseEnter={(options: any) => handlerMouseEnter(options.name)}
              onMouseLeave={() => setMouseEnter(-1)}
            />
          )
        })}
      </PieChart>
    </ResponsiveContainer>
  )
}

interface iCustomActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  midAngle: number;
  fill: string;
  payload: any;
  value: number;
  index: number;
}


const CustomActiveShape = (activeShapeProps: iCustomActiveShapeProps): JSX.Element => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = activeShapeProps;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius + 5}
        outerRadius={outerRadius + 5}
        startAngle={startAngle + 2}
        endAngle={endAngle - 2}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle + 5}
        endAngle={endAngle - 5}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 10.5}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(payload.value).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default PieMainChart