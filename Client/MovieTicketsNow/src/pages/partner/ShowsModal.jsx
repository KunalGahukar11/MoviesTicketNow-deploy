import React, { useEffect, useMemo, useState } from 'react'
import { Form, Modal, Row, Col, Button, Input, Select, message } from 'antd'
import { addShow, updateShowById } from '../../api/show';
import { getAllMovies } from '../../api/movie';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';

const ShowsModal = ({ isAddShowModalOpen, setIsAddShowModalOpen, formType, selectedTheatre, getShows, selectedShow }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [movieNames, setMovieNames] = useState([]);
    const [allMovies, setAllMovies] = useState([]);

    const handleClose = () => {
        form.resetFields();
        setIsAddShowModalOpen(false);
    };

    const onFinish = async (payload) => {
        try {
            dispatch(showLoader());
            let response = formType === "add" ? await addShow({ ...payload, theatre: selectedTheatre._id }) : await updateShowById(selectedShow._id, payload)

            if (response.success) {
                getShows(selectedTheatre._id);
                message.success(response.message);
                form.resetFields();
                handleClose();
            } else {
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    const getAllMoviesDetail = async () => {
        try {
            dispatch(showLoader());
            const response = await getAllMovies();
            if (response.success) {
                setAllMovies(response.data);
            } else {
                console.log(response);
                message.error(response.error);
            }
        } catch (error) {
            message.error("Something went wrong");
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        getAllMoviesDetail();
    }, []);

    const allMoviesName = useMemo(() => {
        if (allMovies.length > 0) {
            return allMovies.map((movie) => {
                return {
                    key: movie._id,
                    value: movie._id,
                    label: movie.title,
                }
            })
        }
        return [];
    }, [allMovies])


    return (
        <>
            <Modal title={formType === "add" ? "Add Show" : "Edit Show"} open={isAddShowModalOpen} centered footer={null} onCancel={handleClose}>
                <Form layout='vertical' form={form} onFinish={onFinish} initialValues={formType === 'edit' ? selectedShow : ""}>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Show name" name="name" rules={[{
                                required: true, message: "Show name is required"
                            }]}>
                                <Input type="text" placeholder="Enter name"></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item label="Show time" name="show_time" rules={[{
                                required: true, message: "Show time is required"
                            }]}>
                                <Input type="text" placeholder="Enter time"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Show date" name="date" rules={[{
                                required: true, message: "Show date is required"
                            }]}>
                                <Input type="date" placeholder="Enter date"></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={15}>
                            <Form.Item label="Select movie" name="movie_name" rules={[{
                                required: true, message: "Movie is required"
                            }]}>
                                <Select placeholder='Select movie' options={allMoviesName}
                                    style={{ width: '100%' }}></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item label="Price" name="price" rules={[{
                                required: true, message: "Price is required"
                            }]}>
                                <Input type='text' placeholder='Enter price'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Total seats" name="total_seats" rules={[{
                                required: true, message: "Total seats is required"
                            }]}>
                                <Input type='text' placeholder='Enter seats'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justify-end'>
                        <Col span={formType === 'add' ? 4 : 3}>
                            <Button type='primary' htmlType='submit'>
                                {formType === "add" ? "Add" : "Edit"}
                            </Button>
                        </Col>
                        <Col span={5}>
                            <Button onClick={handleClose}>Cancel</Button>
                        </Col>
                    </Row>
                </Form>
            </Modal >
        </>
    )
}

export default ShowsModal