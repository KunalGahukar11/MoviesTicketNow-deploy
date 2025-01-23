import React, { useEffect } from "react";
import { getCurrentUser } from "../../api/user";
import { Layout, message, Menu, Flex, Spin, Alert } from "antd";
import { ProfileOutlined, HomeOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader } from "../../redux/slices/loaderSlice";
import { setUser } from "../../redux/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.users);
  const { loader } = useSelector((store) => store.loaders);
  const dispatch = useDispatch();

  const { Header, Footer, Sider, Content } = Layout;

  const menuItem = [
    {
      label: 'Home',
      key: 'home',
      icon: <HomeOutlined />,
      onClick: () => {
        navigate('/');
      },
    },
    {
      label: `${user ? user.firstName : "Guest"}`,
      key: 'user',
      icon: <UserOutlined />,
      children: [
        {
          label: 'My Profile',
          key: 'profile',
          icon: <ProfileOutlined />,
          onClick: () => {
            if (user.role === 'partner') {
              navigate('/partner');
            } else if (user.role === 'admin') {
              navigate('/admin');
            } else {
              navigate('/user');
            }
          },
        },
        {
          label: (<Link to={'/login'}
            onClick={() => {
              localStorage.removeItem("token");
            }}>Logout</Link>),
          key: 'logout',
          icon: <LoginOutlined />,
        }
      ]
    }
  ];

  const getUserData = async () => {
    try {
      dispatch(showLoader());
      const data = await getCurrentUser();

      if (data) {
        dispatch(setUser(data.data));
      }
    } catch (error) {
      message.error("Please login again");
      dispatch(setUser(null));
      dispatch(hideLoader());
    } finally {
      dispatch(hideLoader());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  // if (loader) {
  //   return (
  //     <div className="w-screen h-screen flex justify-center items-center">
  //       <Spin size="large"></Spin>
  //     </div>
  //   )
  // }

  return (
    user && (
      <>
        <Layout>
          <Header className="flex gap-1 md:justify-between md:gap-0 items-center sticky top-0     w-full z-10 pl-3 md:px-6">
            <h2 className="text-yellow-100 text-lg md:text-2xl font-bold">MovieTicketsNow</h2>
            <Menu theme="dark" mode="horizontal" items={menuItem} className="justify-center w-full md:w-1/3">
            </Menu>
          </Header>
          <Content className="p-[24px] bg-white">
            <Spin tip="Loading" size="large" spinning={loader}>{children}</Spin>
          </Content>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
