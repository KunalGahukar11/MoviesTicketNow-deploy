import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Col, Row, Form, Input, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { showLoader, hideLoader } from '../../redux/slices/loaderSlice';
import { createTheatre, updateTheatre } from '../../api/theatre';

const TheatreModal = ({ isTheatreModalOpen, setIsTheatreModalOpen, getAllTheatreOfOwner, formType, selectedTheatre }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((store) => store.users);
    const [form] = Form.useForm();

    const [errMsg, setErrMsg] = useState("");

    const closeModal = () => {
        form.resetFields();
        setIsTheatreModalOpen(false);
    };

    const onFinish = async (payload) => {
        try {
            dispatch(showLoader());
            let response = null;
            if (formType === "add") {
                response = await createTheatre({ ...payload, owner: user._id });
            } else {
                response = await updateTheatre({ ...payload, theatreId: selectedTheatre._id });
            }

            if (response.success) {
                message.success(response.message);
                getAllTheatreOfOwner();
                closeModal();
            } else {
                message.error(response.error);
            }
        } catch (error) {
            const err = error instanceof Error ? error.message : error;

            setErrMsg(err);
        } finally {
            dispatch(hideLoader());
        }
    };

    useEffect(() => {
        if (errMsg) {
            message.error(errMsg);
        }
    }, []);

    return (
        <>
            <Modal title={formType === "add" ? "Add theatre" : "Edit theatre"} centered open={isTheatreModalOpen} onCancel={closeModal} footer={null}>
                <Form layout='vertical' onFinish={onFinish} form={form} initialValues={selectedTheatre}>
                    <Row >
                        <Col span={24}>
                            <Form.Item label="Theatre Name" name="name" rules={[{
                                required: true, message: "Theatre name required"
                            }]}>
                                <Input type='text' placeholder='Enter theatre name'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={16}>
                            <Form.Item label="Theatre Address" name="address" rules={[{
                                required: true, message: "Theatre address required"
                            }]}>
                                <TextArea rows={4} type='text' placeholder='Enter theatre address'></TextArea>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Pin code" name="pincode" rules={[{
                                required: true, message: "Pincode required"
                            }]}>
                                <Input type='text' placeholder='Enter pincode'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                        <Col span={12}>
                            <Form.Item label="Mobile no." name="mobile_no" rules={[{
                                required: true, message: "Mobile no. required"
                            }]}>
                                <Input type='text' placeholder='Enter mobile no.'></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Email" name="email" rules={[{
                                required: true, message: "Email is required"
                            }]}>
                                <Input type='email' placeholder='Email address'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="No. of screens" name="screens" rules={[{
                                required: true, message: "No. of screens required"
                            }]}>
                                <Input type='text' placeholder='No. of screens'></Input>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className='justify-end'>
                        <Col span={4} className='self-end'>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ fontSize: "1rem", fontWeight: "600" }}
                            >
                                {formType === "add" ? "Add" : "Edit"}
                            </Button>
                        </Col>
                        <Col span={5}>
                            <Button onClick={closeModal}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default TheatreModal