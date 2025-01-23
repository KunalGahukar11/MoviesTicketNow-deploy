import React from "react";
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from "../../api/user";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (value) => {
    try {
      const response = await userLogin(value);
      if (response.success) {
        message.success(response.message, 5);
        localStorage.setItem("token", response.data);
        navigate("/");
      } else {
        message.error(response.message, 5);
      }
    } catch (error) {
      message.error(error.message, 5);
    }
  };

  return <main className="w-screen h-screen flex justify-center items-center">
    <section className="border border-gray-300 flex flex-col items-center w-1/3 rounded-sm gap-4 shadow-md">
      <div className="mt-4">
        <h1 className="p-3 text-3xl font-medium">Login to your account</h1>
      </div>
      <div className="w-4/5 h-full pb-6 px-4">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            htmlFor="Email"
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Please enter valid email" }
            ]}>

            <Input type="email" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            htmlFor="Password"
            rules={[
              { required: true, message: "Password is required" },
            ]}>

            <Input type="password" placeholder="Enter your pasword" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Login
            </Button>
          </Form.Item>
          <p>Not an user? click here to <Link to={'/register'} className="underline">Register</Link></p>
        </Form>
      </div>
    </section>
  </main>;
};

export default Login;
