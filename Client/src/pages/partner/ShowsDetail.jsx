import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Divider, Modal, Button, message, Table, Spin } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'
import ShowsModal from './ShowsModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import moment from "moment";
import { deleteShowById, getShowByTheatre } from '../../api/show';

const ShowsDetail = ({ isShowsDetailModalOpen, setIsShowsDetailModalOpen, selectedTheatre }) => {
    const [isAddShowModalOpen, setIsAddShowModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [formType, setFormType] = useState("add");
    const [allShows, setAllShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);
    const dispatch = useDispatch();
    const { loader } = useSelector((store) => store.loaders);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Show time",
            dataIndex: "show_time",
            key: "show_time",
            render: (text, data) => {
                return moment(text, "HH:mm").format("hh:mm A");
            },
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (text, data) => {
                return moment(text).format("MMM Do YYYY");
            },
        },
        {
            title: "Movie name",
            dataIndex: "movie_name",
            key: "movie_name",
            render: (text, data) => {
                return text.title;

            }
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Total seats",
            dataIndex: "total_seats",
            key: "total_seats",
        },
        {
            title: "Available seats",
            dataIndex: "available_seats",
            render: (text, data) => {
                return data.total_seats - data.booked_seats;

            }
        },
        {
            title: "Actions",
            render: (text, data) => {
                return <div className='inline-flex gap-2'>
                    <Button color='primary' variant='outlined'
                        onClick={() => {
                            setIsAddShowModalOpen(true);
                            setSelectedShow({
                                ...data,
                                date: moment(data.date).format("YYYY-MM-DD"),
                            });
                            setFormType("edit");
                        }}>
                        <EditOutlined></EditOutlined>
                    </Button>
                    <Button color='danger' variant='outlined'
                        onClick={() => {
                            setIsDeleteModalOpen(true);
                            setSelectedShow(data);
                        }}>
                        <DeleteOutlined></DeleteOutlined>
                    </Button>
                </div>
            }
        }
    ];

    const handleClose = () => {
        setIsShowsDetailModalOpen(false);
    };

    const getShows = useCallback(async (theatreId) => {
        try {
            dispatch(showLoader());
            const shows = await getShowByTheatre(theatreId);
            if (shows.success) {
                console.log(shows.data);
                setAllShows(shows.data);
            } else {
                message.error(shows.message);
            }
        } catch (error) {
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    }, [dispatch]); // Dependencies


    useEffect(() => {
        console.log(selectedTheatre);

        getShows(selectedTheatre._id);
    }, []);

    return (
        <>
            <Modal title={selectedTheatre.name}
                open={isShowsDetailModalOpen}
                onCancel={handleClose}
                centered
                footer={null}
                width="1000px">
                <div className='flex justify-end'>
                    <Button type='primary'
                        icon={<PlusCircleOutlined></PlusCircleOutlined>}
                        onClick={() => {
                            setIsAddShowModalOpen(true);
                            setFormType("add");
                        }}>
                        Add Shows
                    </Button>
                </div>
                <Divider></Divider>
                <Spin tip="Loading" spinning={loader}>
                    <Table columns={columns} dataSource={allShows}
                        pagination={{
                            pageSize: 5
                        }}></Table>
                </Spin>
            </Modal>
            {
                isAddShowModalOpen && (
                    <ShowsModal isAddShowModalOpen={isAddShowModalOpen}
                        setIsAddShowModalOpen={setIsAddShowModalOpen}
                        formType={formType}
                        setFormType={setFormType}
                        selectedTheatre={selectedTheatre}
                        getShows={getShows}
                        setSelectedShow={setSelectedShow}
                        selectedShow={selectedShow}
                    >
                    </ShowsModal>
                )
            }
            {
                isDeleteModalOpen && (
                    <DeleteModal setIsDeleteModalOpen={setIsDeleteModalOpen}
                        isDeleteModalOpen={isDeleteModalOpen}
                        fetchData={() => { getShows(selectedTheatre._id) }}
                        info={"show"}
                        deleteKey={"showId"}
                        selectedItem={selectedShow}
                        setSelectedItem={setSelectedShow}
                        deleteFunc={deleteShowById}
                    >
                    </DeleteModal>
                )
            }
        </>
    )
}

export default ShowsDetail