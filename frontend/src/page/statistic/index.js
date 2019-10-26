import React from 'react'

function Statistical(){
    return (
        <div className='chart'>
            <Bar
                data={chartData}
                height ='450'
                options={{
                    maintainAspectRatio: false
                }}
            >
            </Bar>
        </div>
    )
}
export default Statistical