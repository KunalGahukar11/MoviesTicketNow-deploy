import React, { useCallback, useEffect, useState } from 'react'
import { Button, Divider, message, Spin, Table, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import TheatreModal from './TheatreModal';
import { deleteTheatre, getOwnersTheatre } from '../../api/theatre';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import ShowsDetail from './ShowsDetail';

const TheatreList = () => {
    const dispatch = useDispatch();
    const { loader } = useSelector((store) => store.loaders);
    const { user } = useSelector((store) => store.users);
    const [isTheatreModalOpen, setIsTheatreModalOpen] = useState(false);
    const [isShowsDetailModalOpen, setIsShowsDetailModalOpen] = useState(false);
    const [ownerTheatresData, setOwnerTheatresData] = useState([]);
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [formType, setFormType] = useState("add");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const columns = [
        {
            title: 'Theatre Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'PinCode',
            dataIndex: 'pincode',
            key: 'pincode'
        },
        {
            title: 'Mobile No.',
            dataIndex: 'mobile_no',
            key: 'mobile_no'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Screens',
            dataIndex: 'screens',
            key: 'screens'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (text, data) => {
                if (data.isActive) {
                    return <Tag color='green'>Approved</Tag>
                } else {
                    return <Tag color='volcano'>Block</Tag>
                }
            }
        },
        {
            title: 'Actions',
            render: (text, data) => {
                return <div className='inline-flex gap-2'>
                    <Button color='primary' variant='outlined' onClick={() => {
                        setIsTheatreModalOpen(true);
                        setSelectedTheatre(data);
                        setFormType("edit");
                    }}>
                        <EditOutlined></EditOutlined>
                    </Button>
                    <Button color='danger' variant='outlined' onClick={() => {
                        setIsDeleteModalOpen(true);
                        setSelectedTheatre(data);
                    }}>
                        <DeleteOutlined></DeleteOutlined>
                    </Button>
                    {
                        data.isActive && (
                            <Button color='primary' variant='outlined' onClick={() => {
                                setIsShowsDetailModalOpen(true);
                                setFormType("add");
                                setSelectedTheatre(data);
                            }}>
                                Shows
                            </Button>
                        )
                    }
                </div>
            }
        }
    ];

    const getAllTheatreOfOwner = useCallback(async () => {
        try {
            dispatch(showLoader());
            const response = await getOwnersTheatre(user._id);
            if (response.success) {
                const theaterData = response.data;
                // dispatch(setTheatre(response.data));

                setOwnerTheatresData(
                    theaterData.map((theatre) => {
                        return { ...theatre, key: `theatre${theatre._id}` };
                    })
                )
            } else {
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong!");
        } finally {
            dispatch(hideLoader());
        }
    }, [dispatch])

    const openModal = () => {
        setFormType("add");
        setIsTheatreModalOpen(true);
        setSelectedTheatre(null);
    };

    useEffect(() => {
        getAllTheatreOfOwner();
    }, []);

    return (
        <>
            <section>
                <div className='flex justify-end pr-3'>
                    <Button type='primary' icon={<PlusCircleOutlined></PlusCircleOutlined>} className='font-semibold' onClick={openModal}>Add Theatre</Button>
                </div>
                <Divider></Divider>
                <Spin tip="Loading" size='large' spinning={loader}>
                    <Table dataSource={ownerTheatresData} columns={columns}></Table>
                </Spin>
                {isTheatreModalOpen && (
                    <TheatreModal isTheatreModalOpen={isTheatreModalOpen}
                        setIsTheatreModalOpen={setIsTheatreModalOpen}
                        getAllTheatreOfOwner={getAllTheatreOfOwner}
                        formType={formType}
                        selectedTheatre={selectedTheatre}>
                    </TheatreModal>
                )}
                {
                    isDeleteModalOpen && (
                        <DeleteModal isDeleteModalOpen={isDeleteModalOpen}
                            setIsDeleteModalOpen={setIsDeleteModalOpen}
                            info={"theatre"}
                            deleteKey="theatreId"
                            selectedItem={selectedTheatre}
                            setSelectedItem={setSelectedTheatre}
                            fetchData={getAllTheatreOfOwner}
                            deleteFunc={deleteTheatre}>
                        </DeleteModal>
                    )
                }
                {
                    isShowsDetailModalOpen && (
                        <ShowsDetail isShowsDetailModalOpen={isShowsDetailModalOpen}
                            setIsShowsDetailModalOpen={setIsShowsDetailModalOpen}
                            selectedTheatre={selectedTheatre}
                            setSelectedTheatre={setSelectedTheatre}>
                        </ShowsDetail>
                    )
                }
            </section>
        </>
    )
}

export default TheatreList