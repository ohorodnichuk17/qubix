import React from 'react';
import { Card, Col, Row, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const friends = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  name: 'John Doe',
  avatar: 'https://via.placeholder.com/150', 
}));

const FriendPage = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>People you may know</h2>
      <Row gutter={[16, 16]}>
        {friends.map((friend) => (
          <Col span={6} key={friend.id}>
            <Card
              cover={<img alt="example" src={friend.avatar} />}
              actions={[
                <Button type="primary" key="add">Add friend</Button>,
              ]}
            >
              <Card.Meta
                avatar={<UserOutlined />}
                title={friend.name}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FriendPage;
