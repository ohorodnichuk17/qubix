import { Card, Avatar, Divider, Flex, Carousel } from 'antd';
import { avatar } from '../../../../utils/images';
import { dummy } from '../../../../utils/images';
import Arrow from '../../../featured/Arrow/Arrow';

const dummyPosts = [
   {
      id: '1',
      user: {
         id: '0',
         firstName: 'Qubix Team',
         lastName: '',
         avatar: avatar,
      },
      content: 'Welcome to Qubix! We are excited to have you here. Explore the platform, connect with friends, and share your experiences.',
      images: [dummy],
      createdAt: new Date().toISOString(),
   },
   {
      id: '2',
      user: {
         id: '0',
         firstName: 'Qubix Team',
         lastName: '',
         avatar: avatar,
      },
      content: 'Discover new communities and interests. Follow hashtags and people to see content you care about.',
      images: [dummy],
      createdAt: new Date().toISOString(),
   },
   {
      id: '3',
      user: {
         id: '0',
         firstName: 'Qubix Team',
         lastName: '',
         avatar: avatar,
      },
      content: 'Share your thoughts, experiences, and ideas with the Qubix community. Create posts, comment on others\' posts, and join in the conversation.',
      images: [dummy],
      createdAt: new Date().toISOString(),
   },
];

const DummyPosts = () => {
   return (
      <>
         {dummyPosts.map((post) => (
            <Card key={post.id} style={{ width: '100%', marginBottom: 16 }}>
               <Flex align="center" gap="small">
                  <Avatar size={40} src={post.user.avatar} />
                  <span style={{ fontWeight: 600 }}>{post.user.firstName}</span>
               </Flex>
               <Divider style={{ margin: '0 16px' }} />
               <p>{post.content}</p>
               {post.images.length > 0 && (
                  <Carousel
                     arrows
                     draggable
                     infinite
                     nextArrow={<Arrow direction="right" />}
                     prevArrow={<Arrow direction="left" />}
                  >
                     {post.images.map((image, index) => (
                        <div key={index} style={{ width: 30, height: 30, overflow: 'hidden' }}>
                           <img
                              src={image}
                              alt={`Post Image ${index + 1}`}
                              style={{ width: '40%', height: '40%', objectFit: 'cover', display: 'block' }}
                           />
                        </div>
                     ))}
                  </Carousel>
               )}
            </Card>
         ))}
      </>
   );
};

export default DummyPosts;
