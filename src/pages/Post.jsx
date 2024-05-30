import React, { useState } from 'react';
import { CommentOutlined, HeartTwoTone, LikeOutlined, UserOutlined } from '@ant-design/icons';
import { Gird,Input, Button, List, Avatar, Row, Col } from 'antd';
import styled from 'styled-components';
import Comment from '../components/posts/Comment';
import moment from 'moment';
const { Search } = Input;
const posts= [
  {
    "id": 1,
    "user_id": 3,
    "content": "Totam quisquam nisi itaque totam non. Omnis exercitationem accusantium repellat ea omnis. Totam amet ipsam dolor veritatis nam error. Provident ut veniam ducimus ratione non delectus harum. Possimus qui possimus eveniet. Culpa sequi impedit omnis repellendus ducimus fugit. Accusantium iure vel repellendus pariatur omnis quasi. Rerum ducimus enim in ea dolorum atque illo. Qui laborum deleniti reiciendis officiis dolore voluptas. Accusamus similique aliquam harum laudantium.",
    "is_anonymous": 1,
    "like_count": 0,
    "comment_count": 1,
    "status": 1,
    "created_at": "2024-05-26T04:28:15.000000Z",
    "updated_at": "2024-05-26T04:28:25.000000Z",
    "user": {
        "id": 3,
        "role_id": 2,
        "name": "Prof. Rosalia Howell",
        "email": "timmy66@example.org",
        "email_verified_at": "2024-05-26T04:28:04.000000Z",
        "address": "15260 Effertz Hollow\nLangchester, AR 25906",
        "profile_picture": null,
        "date_of_birth": "1994-06-28",
        "phone_number": "229.460.5620",
        "gender": "female",
        "status": 1,
        "deleted_at": null,
        "created_at": "2024-05-26T04:28:05.000000Z",
        "updated_at": "2024-05-26T04:28:05.000000Z"
    },
    "comments": [
        {
            "id": 4,
            "post_id": 1,
            "user_id": 9,
            "parent_id": null,
            "content": "Quia perferendis aut porro corrupti amet nostrum. Ut rerum modi aliquam adipisci laboriosam velit.",
            "status": 1,
            "deleted_at": null,
            "created_at": "2024-05-26T04:28:25.000000Z",
            "updated_at": "2024-05-26T04:28:25.000000Z"
        }
    ]
},
{
    "id": 2,
    "user_id": 7,
    "content": "Voluptatem fuga eum ipsa qui laudantium. Animi quas sit alias consectetur est. Aut officiis omnis placeat aliquam. Qui beatae sunt rerum blanditiis quasi illo voluptates expedita. Voluptatem expedita culpa facere dolor. Deserunt reprehenderit dolores doloribus. Non tempore eveniet aliquid saepe. Eaque voluptatibus quia consequatur voluptatum exercitationem itaque fugiat.",
    "is_anonymous": 0,
    "like_count": 0,
    "comment_count": 2,
    "status": 1,
    "created_at": "2024-05-26T04:28:15.000000Z",
    "updated_at": "2024-05-26T04:28:28.000000Z",
    "user": {
        "id": 7,
        "role_id": 2,
        "name": "Angelica Watsica",
        "email": "jefferey43@example.com",
        "email_verified_at": "2024-05-26T04:28:04.000000Z",
        "address": "3244 Clara Drive\nDoyleview, WI 82207-4045",
        "profile_picture": null,
        "date_of_birth": "1981-01-23",
        "phone_number": "678.972.0923",
        "gender": "male",
        "status": 1,
        "deleted_at": null,
        "created_at": "2024-05-26T04:28:05.000000Z",
        "updated_at": "2024-05-26T04:28:05.000000Z"
    },
    "comments": [
        {
            "id": 3,
            "post_id": 2,
            "user_id": 5,
            "parent_id": null,
            "content": "Ut vero quam culpa hic accusamus. Qui hic quis et architecto iure et.",
            "status": 1,
            "deleted_at": null,
            "created_at": "2024-05-26T04:28:25.000000Z",
            "updated_at": "2024-05-26T04:28:25.000000Z"
        },
        {
            "id": 14,
            "post_id": 2,
            "user_id": 10,
            "parent_id": null,
            "content": "Aut omnis et beatae id aliquid temporibus vero. Numquam vel voluptatem vitae odit.",
            "status": 1,
            "deleted_at": null,
            "created_at": "2024-05-26T04:28:28.000000Z",
            "updated_at": "2024-05-26T04:28:28.000000Z"
        }
    ]
}
]
const PostContent = styled.div`
  margin-left: 10px;
`;
function PostCart({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = post.content;

  const words = content.split(' ');
  const isLongContent = words.length > 50;
  const displayedContent = isExpanded ? content : words.slice(0, 50).join(' ') + '...';
  const comments = post.comments;
  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)', marginBottom: '20px' }}>
      <div 
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
      >
        <Avatar style={{ backgroundColor: '#87d068', marginRight: '1rem' }} icon={<UserOutlined />} />
        <p><strong>{post.is_anonymous ? 'Ẩn danh' : post.user.name}</strong></p>
      </div>
      <PostContent>
        <p style={{marginBottom:'0', }}>{displayedContent}</p>
        {isLongContent && (
        <Button stye={{padding:'0'}} type="link" onClick={() => setIsExpanded(!isExpanded)}> {isExpanded ? 'Thu gọn' : 'Read More'}</Button>
        )}
      </PostContent>
      <div style={{ marginTop: '20px', display:'flex', gap:'10px' }}>
          <HeartTwoTone style={{
            fontSize: '32px',
          }} twoToneColor="#eb2f96"/>
          <CommentOutlined style={{
            fontSize: '32px',
          }}/>
      </div>
      <span style={{ marginLeft: '8px' }}>{post.like_count} lượt thích</span>
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} />
       ))}
    </div>
  );
}
export default function Post(){
    return (
        <>  
          <Row style={{margin:'10px 50px'}} justify="center">
              <Col span={24}>
                <Search placeholder="input search text" enterButton />
              </Col>
              <Col>
              <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                <Col xs={3} lg={1}>
                  <Avatar 
                    size={50} 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8MwAVp8j5cueeBAhZ0Q7x3TWw5Q67VDCD8bmzpQ6vw&s" 
                    alt="avatar" 
                  />
                </Col>
                  <Col xs={21} lg={23}>
                    <Input 
                      placeholder="Hôm nay, bạn ổn không?" 
                      style={{borderRadius: '40px', flex: 1 }}  
                    />
                  </Col>
                </Row>
                <Row>
                  {posts.map(post => (
                  <Col span={24} key={post.id}>
                    <PostCart post={post} />
                  </Col>
                  ))}
                </Row>
              </Col>
          </Row>
        </>
    )
}