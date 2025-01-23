import React from "react";
import { Button, Form, Input, Col, Row, message, Radio } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { userRegister } from "../../api/user";

const Register = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const clearFields = () => {
    form.resetFields();
  };

  const onFinish = async (value) => {
    try {
      const data = await userRegister(value);

      if (data.success) {
        message.success(data.message, 5);
        navigate('/login');
      } else {
        message.error(data.message, 5);
      }
    } catch (error) {
      message.error(error.message, 5);
    }
  };

  return <main className="w-screen h-screen flex justify-center items-center">
    <section className="border border-gray-300 flex flex-col items-center w-1/3 rounded-sm gap-4 shadow-md py-4">
      <div className="mt-4">
        <h1 className="p-3 text-3xl font-medium">Create new account</h1>
      </div>
      <div className="w-4/5">
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {/* First Name */}
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="firstName"
                htmlFor="firstname"
                rules={[
                  { required: true, message: "First Name is required" },
                ]}
              >
                <Input type="text" placeholder="First name" />
              </Form.Item>
            </Col>

            {/* Last Name */}
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="lastName"
                htmlFor="lastname"
                rules={[
                  { required: true, message: "Last Name is required" },
                ]}
              >
                <Input type="text" placeholder="Last name" />
              </Form.Item>
            </Col>
          </Row>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            htmlFor="email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter valid email" }
            ]}
          >
            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            htmlFor="password"
            rules={[
              { required: true, message: "Password is required" },
            ]}
          >
            <Input type="password" placeholder="Enter your password" />
          </Form.Item>

          <Form.Item label="Register as a Partner" name="role" htmlFor="role" rules={[{
            required: true, message: 'Please select an option'
          }]}>
            <Radio.Group >
              <Radio value="partner">Yes</Radio>
              <Radio value="user">No</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" onClick={clearFields}>
              Create
            </Button>
          </Form.Item>

          <p>
            Already an user? Click here to <Link to="/login" className="underline">Login</Link>
          </p>
        </Form>
      </div>

    </section>
  </main>;
};

export default Register;
