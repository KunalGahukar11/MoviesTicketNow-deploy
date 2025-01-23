import React, { useEffect, useState } from 'react'
import { Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Button, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { addMovie, updateMovie } from '../../api/movie';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../redux/slices/loaderSlice';
import moment from "moment";

const MovieModal = ({
    isModalOpen, setIsModalOpen, formType, selectedMovie, setSelectedMovie, fetchMovies
}) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [errorMsg, setErrorMsg] = useState(null);

    if (selectedMovie) {
        selectedMovie.release_date = moment(selectedMovie.release_date).format(
            "YYYY-MM-DD"
        );
    }

    const genres = [
        { label: "action", value: "action" },
        { label: "thriller", value: "thriller" },
        { label: "adventure", value: "adventure" },
        { label: "sci-fi", value: "sci-fi" },
        { label: "romance", value: "romance" },
        { label: "mystery", value: "mystery" },
        { label: "comedy", value: "comedy" },
        { label: "horror", value: "horror" },
        { label: "animation", value: "animation" },
    ];

    const languages = [
        { label: "Hindi", value: "hindi" },
        { label: "Marathi", value: "marathi" },
        { label: "English", value: "english" },
        { label: "Pubjabi", value: "punjabi" },
        { label: "Telugu", value: "telugu" },
        { label: "Tamil", value: "tamil" },
        { label: "Kannada", value: "kannada" },
    ];

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setSelectedMovie("");
    };

    const onFinish = async (payload) => {
        try {
            dispatch(showLoader());
            let response = formType === 'add' ? await addMovie(payload) : await updateMovie({
                ...payload, movieId: selectedMovie._id
            });
            if (response.success) {
                fetchMovies();
                message.success(response.message);
                handleCancel();
            } else {
                message.error(response.error);
            }

            dispatch(hideLoader());
            setSelectedMovie(null);
        } catch (error) {
            let errMsg = error instanceof Error ? error.message : error;
            setErrorMsg(errMsg);
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        if (errorMsg) {
            message.error(errorMsg);
            setErrorMsg(null);
        }
    }, [errorMsg]);

    return (
        <>
            <Modal open={isModalOpen} title={formType === 'add' ? "Add Movie" : "Update Movie"}
                footer={null} onCancel={handleCancel} width={500} centered>
                <Form layout='vertical' onFinish={onFinish} form={form} initialValues={selectedMovie}>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Movie title" name="title" rules={[
                                { required: true, message: "Movie title required" }
                            ]}>
                                <Input placeholder='Enter movie title'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Description" name="description" rules={[
                                { required: true, message: "Movie description is required" }
                            ]}>
                                <TextArea rows={4} placeholder='Enter movie description'></TextArea>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item label="Genre" name="genre" rules={[
                                { required: true, message: "Movie genre is required" }
                            ]}>
                                <Select options={genres} placeholder="Enter genre" mode='multiple'></Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Language" name="language" rules={[
                                { required: true, message: "Movie language is required" }
                            ]}>
                                <Select options={languages} placeholder="Enter language" mode='multiple'></Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={8}>
                            <Form.Item label="Release On" name="release_date" rules={[
                                { required: true, message: "Release date is required" }
                            ]}>
                                <Input type='date'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item label="Duration" name="duration" rules={[
                                { required: true, message: "Movie duration is required" }
                            ]}>
                                <Input placeholder='Duration in min' style={{ width: '100%' }}></Input>
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Rating" name="rating" rules={[
                                { required: true, message: "Rating is required" }
                            ]}>
                                <InputNumber placeholder='1-10'></InputNumber>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item label="Poster Url" name="poster" rules={[
                                { required: true, message: "Poster url is required" }
                            ]}>
                                <Input placeholder='Enter poster url here'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justify-end'>
                            <Col span={formType === 'add' ? 4 : 5} className='self-end'>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ fontSize: "1rem", fontWeight: "600" }}
                                >
                                    {formType === 'add' ? 'Add' : 'Update'}
                                </Button>
                            </Col>
                            <Col span={5}>
                                <Button onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default MovieModal