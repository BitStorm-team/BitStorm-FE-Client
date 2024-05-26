import React from 'react';
import { Card, Avatar, Space } from 'antd';
import { UserOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const { Meta } = Card;

const ProfileCard = ({ name, avatar, facebookLink, instagramLink, linkedinLink }) => {
  return (
    <Card style={{ width: 300 }}>
      <Meta
        avatar={<Avatar src={avatar} icon={<UserOutlined />} />}
        title={name}
        description={
          <Space>
            <a href={facebookLink}><FacebookOutlined /></a>
            <a href={instagramLink}><InstagramOutlined /></a>
            <a href={linkedinLink}><LinkedinOutlined /></a>
          </Space>
        }
      />
    </Card>
  );
}

export default ProfileCard;
