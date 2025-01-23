import React from 'react'
import { Tabs } from 'antd';
import { ShopOutlined } from '@ant-design/icons';
import TheatreList from './TheatreList';

const index = () => {
    const tabItems = [
        {
            key: 1,
            label: <span className='text-xl'>Theatres</span>,
            icon: <ShopOutlined className='text-xl' />,
            children: <TheatreList></TheatreList>
        }
    ];

    return (
        <>
            <section className='m-3 border border-gray-300 rounded-md'>
                <div className='flex justify-center items-center bg-slate-100'>
                    <h1 className='text-2xl font-bold p-2'>Partner Page</h1>
                </div>
                <div className='p-3'>
                    <Tabs defaultActiveKey='1' items={tabItems}></Tabs>
                </div>
            </section>
        </>
    )
}

export default index