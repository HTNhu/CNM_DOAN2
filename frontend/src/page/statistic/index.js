
import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { DEFAULT_DEPRECATION_REASON } from 'graphql';

const chartData = {
    labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
    datasets: [
        {
            label: 'Số hóa đơn thanh toán',
            data: [
                617594,
                181065,
                153060,
                106519,
                105162,
                95072,
                505162
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(0, 168, 255, 0.6)',
            ]
        }
    ]
}


function Statistic(props) {
    console.log('props payment company', props)
    const { statistic } = props
    return (
        <div className='chart'>
            <Bar
                data={chartData}
                options={{
                    title: {
                        display: true,
                        text: 'THỐNG KÊ HÓA ĐƠN CỦA CÁC CÔNG TY',
                        fontSize: 25
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    }
                }}
            >
            </Bar>


        </div>
    )
}
export default Statistic
