import React from 'react'


import c from './PieLoading.module.css'

const PieLoading = (): JSX.Element => {
    return (
        <div className={c.Radar}>
            <div className={c.Sweep} />
        </div>
    )
}


export default PieLoading