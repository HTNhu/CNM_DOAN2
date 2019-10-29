
import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2';
import { DEFAULT_DEPRECATION_REASON } from 'graphql';

const chartData = {
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    datasets: [
        {
            label: 'Số hóa đơn thanh toán',
            data: [
                400,
                200,
                600,
                150,
                700,
                200,
                500,
                650,
                500,
                300,
                500,
                100
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(0, 168, 255, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
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
