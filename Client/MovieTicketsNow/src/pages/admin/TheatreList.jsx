import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, message, Table, Tag } from 'antd';
import { getAllTheatresForAdmin, updateTheatre } from '../../api/theatre';

const TheatreList = () => {
    const dispatch = useDispatch();
    const [allTheatres, setAllTheatres] = useState([]);

    const getAllTheatres = async () => {
        try {
            const response = await getAllTheatresForAdmin();
            if (response.success) {
                const data = response.data;
                setAllTheatres(
                    data.map((theatre) => {
                        return { ...theatre, key: `theatre${theatre._id}` }
                    })
                )
            } else {
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    const updateStatus = async (payload) => {
        try {
            let values = {
                ...payload,
                theatreId: payload._id,
                isActive: !payload.isActive,
            }
            const response = await updateTheatre(values);
            if (response.success) {
                getAllTheatres();
            } else {
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong");
        }
    };

    const columns = [
        {
            title: "Theatre Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Owner Name",
            dataIndex: "owner",
            render: (text, data) => {
                return data.owner && data.owner.firstName;
            }
        },
        {
            title: "Owner email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Mobile No.",
            dataIndex: "mobile_no",
            key: "mobile_no"
        },
        {
            title: "Screens",
            dataIndex: "screens",
            key: "screens"
        },
        {
            title: "Status",
            render: (text, data) => {
                if (data.isActive) {
                    return <Tag color='green'>Approved</Tag>
                } else {
                    return <Tag color='red'>Block</Tag>
                }
            }
        },
        {
            title: "Action",
            render: (text, data) => {
                if (!data.isActive) {
                    return <Button color='primary' variant='solid' onClick={() => { updateStatus(data) }}>Allow Access</Button>
                } else {
                    return <Button color='danger' variant='solid' onClick={() => { updateStatus(data) }}>Block Access</Button>
                }
            }
        }
    ];



    useEffect(() => {
        getAllTheatres();
    }, []);

    return (
        <>
            <section>
                <Table columns={columns} dataSource={allTheatres}></Table>
            </section>
        </>
    )
}

export default TheatreList