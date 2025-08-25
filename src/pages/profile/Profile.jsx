import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Card,
  Avatar,
  message,
  Divider,
  Spin,
  Dropdown,
  Menu,
} from 'antd';
import { User, Mail, Phone, Save, Edit, LogOut, Settings } from 'lucide-react';
import { updateProfileApi, getProfileApi } from '../../api/userApi';
import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatarHover, setAvatarHover] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setFetching(true);
      const response = await getProfileApi();
      setUserData(response.data);
      form.setFieldsValue({
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
      });
    } catch (error) {
      message.error('Failed to fetch profile data');
    } finally {
      setFetching(false);
    }
  };

  const handleLogout = () => {
    // Implement your logout logic here
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');
    navigate('/login');
    message.success('Logged out successfully');
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await updateProfileApi(values);
      message.success('Profile updated successfully!');
      setUserData(response.data.user);
      setEditing(false);

      // Update localStorage with new user details
      const updatedUserDetails = {
        ...JSON.parse(localStorage.getItem('userDetails') || '{}'),
        name: values.name,
        phone: values.phone,
      };
      localStorage.setItem('userDetails', JSON.stringify(updatedUserDetails));

      // Trigger a custom event to notify header about the update
      window.dispatchEvent(new Event('userDataUpdated'));
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const menu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogOut size={16} />,
          onClick: handleLogout,
          style: { color: '#e74c3c' },
        },
      ]}
    />
  );

  if (fetching) {
    return (
      <>
        <Header />
        <div className="profile-page-container">
          <div className="profile-page-content">
            <Card className="profile-page-card">
              <div className="profile-page-loading">
                <Spin size="large" />
                <p>Loading your profile...</p>
              </div>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-page-container">
        <div className="profile-page-content">
          <Card className="profile-page-card">
            <div className="profile-page-header">
              <div className="profile-page-avatar-section">
                <Dropdown
                  overlay={menu}
                  trigger={['click']}
                  placement="bottomRight"
                >
                  <Avatar
                    size={100}
                    className="profile-page-avatar-large"
                    style={{
                      backgroundColor: avatarHover ? '#3a5a40' : '#588157',
                      color: avatarHover ? 'white' : '#2c2c2c',
                      fontSize: '40px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={() => setAvatarHover(true)}
                    onMouseLeave={() => setAvatarHover(false)}
                  >
                    {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                  </Avatar>
                </Dropdown>
                <h2 className="profile-page-name">{userData?.name || 'User'}</h2>
                <p className="profile-page-email">{userData?.email || ''}</p>
              </div>

              <Button
                type={editing ? 'default' : 'primary'}
                icon={editing ? <Edit size={16} /> : <Edit size={16} />}
                onClick={() => setEditing(!editing)}
                className="profile-page-edit-button"
                style={{ backgroundColor: editing ? '' : '#588157', borderColor: '#588157' }}
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <Divider />

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="profile-page-form"
            >
              <div className="profile-page-form-section">
                <h3 className="profile-page-section-title">Personal Information</h3>

                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[
                    { required: true, message: 'Please enter your name' },
                  ]}
                >
                  <Input
                    prefix={<User size={16} />}
                    disabled={!editing}
                    className="profile-page-input"
                    placeholder="Enter your full name"
                  />
                </Form.Item>

                <Form.Item name="email" label="Email Address">
                  <Input
                    prefix={<Mail size={16} />}
                    disabled={true}
                    className="profile-page-input profile-page-disabled-input"
                    placeholder="Your email address"
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input
                    prefix={<Phone size={16} />}
                    disabled={!editing}
                    className="profile-page-input"
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              </div>

              {editing && (
                <div className="profile-page-form-actions">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<Save size={16} />}
                    className="profile-page-save-button"
                    style={{ backgroundColor: '#3a5a40', borderColor: '#3a5a40' }}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;