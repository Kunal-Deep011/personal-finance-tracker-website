import { Line, Pie } from '@ant-design/charts';
import React from 'react';

function ChartComponent({sortedTransactions}) {
    const data = sortedTransactions.map((item)=>{
        return {date:item.date, amount: item.amount};
    });
    
    const spendingData = sortedTransactions.filter((transaction) => {
        if(transaction.type == "expense"){
            return{
                tag: transaction.tag,
                amount: transaction.amount
            };
        }
    });

    let finalSpendings = spendingData.reduce((acc,obj)=>{
        let key = obj.tag;
        if(!acc[key]){
            acc[key] = {tag: obj.tag, amount: obj.amount};//create a new object with the same properties
        }else{
            acc[key].amount += obj.amount;
        }
        return acc;
    },{});
      const config = {
        data: data,
        width: 770,
        height: 400,
        autoFit: true,
        xField: 'date',
        yField: 'amount'
        };

        const spendingConfig = {
            data: Object.values(finalSpendings),
            width: 500,
            height: 400,
            angleField: "amount",
            colorField: "tag"
            };

    let chart;
    let pieChart;
    return (
        <div className='charts-wrapper'>
            <div className='chart-box'>
                <h2>Financial Analytics</h2>
                <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
            </div>
            <div className='chart-box1'>
                <h2>Total Spendings</h2>
                {spendingData.length != 0 ? (
                <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
                ) : (
                    <p className='spend-box'>It seems that you haven't spend yet</p>
                )}
                
            </div>
        </div>
    )
}
export default ChartComponent;