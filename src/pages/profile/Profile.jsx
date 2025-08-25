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
} from 'antd';
import { User, Mail, Phone, Save, Edit } from 'lucide-react';
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

  if (fetching) {
    return (
      <>
        <Header />
        <div className="profile-container">
          <div className="profile-content">
            <Card className="profile-card">
              <div className="loading-spinner">
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
      <div className="profile-container">
        <div className="profile-content">
          <Card className="profile-card">
            <div className="profile-header">
              <div className="avatar-section">
                <Avatar
                  size={100}
                  className="profile-avatar-large"
                  style={{
                    backgroundColor: '#1890ff',
                    fontSize: '40px',
                    fontWeight: 'bold',
                  }}
                >
                  {userData?.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                <h2 className="profile-name">{userData?.name || 'User'}</h2>
                <p className="profile-email">{userData?.email || ''}</p>
              </div>

              <Button
                type={editing ? 'default' : 'primary'}
                icon={editing ? <Edit size={16} /> : <Edit size={16} />}
                onClick={() => setEditing(!editing)}
                className="edit-button"
              >
                {editing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <Divider />

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="profile-form"
            >
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>

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
                    className="profile-input"
                    placeholder="Enter your full name"
                  />
                </Form.Item>

                <Form.Item name="email" label="Email Address">
                  <Input
                    prefix={<Mail size={16} />}
                    disabled={true}
                    className="profile-input disabled-input"
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
                    className="profile-input"
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              </div>

              {editing && (
                <div className="form-actions">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    icon={<Save size={16} />}
                    className="save-button"
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
