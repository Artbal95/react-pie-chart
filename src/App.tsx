import React, { useState } from 'react'

import PieMainChart from './components/PieChart/PieMainChart'

import c from './App.module.css'
import PieLoading from './components/Loading/PieLoading/PieLoading'
import { useEffect } from 'react'

type PieDataType = {
  name: string;
  value: number;
  color: string;
  z: number
}



const App = (): JSX.Element => {

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

  const [isLoading, setLoading] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 5000)
  })

  const [isActiveShape, setActiveShape] = useState<number>(0)
  const [isMouseEnter, setMouseEnter] = useState<number>(-1)

  const handlerClick = (name: string) => {
    const customIndex = data.findIndex((d) => d.name === name)
    if (isActiveShape === customIndex) return setActiveShape(-1)
    setActiveShape(customIndex)
  }

  const handlerMouseEnter = (name: string) => {
    const customIndex = data.findIndex((d) => d.name === name)
    setMouseEnter(customIndex)
  }

  return (
    <div className={c.Wrapper}>
      <div className={c.ChartContainer}>
        <h4 className={c.ChartTitle}>Pie Chart Section</h4>
        <div className={c.ChartContainerItem}>
          <div className={isLoading ? c.ChartContainerItemLoading : c.LoadingFinished}>
            <PieLoading />
          </div>  
          <div className={isLoading ? c.ChartContainerItemChart : c.ChartOpen}>
            <PieMainChart
              data={data}
              isActiveShape={isActiveShape}
              isMouseEnter={isMouseEnter}
              setMouseEnter={setMouseEnter}
              handlerClick={handlerClick}
              handlerMouseEnter={handlerMouseEnter}
            />
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default App