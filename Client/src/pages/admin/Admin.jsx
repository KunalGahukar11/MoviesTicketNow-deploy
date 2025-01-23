import React from 'react'
import { Tabs } from "antd";
import { VideoCameraOutlined, ShopOutlined } from '@ant-design/icons';
import MoviesList from './MoviesList';
import TheatreList from './TheatreList';

const Admin = () => {
    const tabItems = [
        {
            key: 1,
            label: <span className='text-xl'>Movies</span>,
            icon: <VideoCameraOutlined className='text-xl' />,
            children: <MoviesList></MoviesList>
        },
        {
            key: 2,
            label: <span className='text-xl'>Theatres</span>,
            icon: <ShopOutlined className='text-xl' />,
            children: <TheatreList></TheatreList>
        }
    ];

    return (
        <>
            <section className='m-3 border border-gray-300 rounded-md shadow-md'>
                <div className='flex justify-center items-center bg-slate-100'>
                    <h1 className='text-2xl font-bold p-2'>Admin Panel</h1>
                </div>
                <div className='p-3'>
                    <Tabs defaultActiveKey='1' items={tabItems}></Tabs>
                </div>
            </section>
        </>
    )
}

export default Admin