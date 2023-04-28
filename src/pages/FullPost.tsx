/** @format */

import React from 'react';

import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { useParams } from 'react-router-dom';
import axios from '../axios';

type PostProps = {
  title: string;
  _id: string;
  text: string;
  tags: string[];
  viewsCount: number;
  createdAt: string;
  user: {
    fullName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
  };
  imageUrl: string;
};

export const FullPost: React.FC = () => {
  const [data, setData] = React.useState<PostProps | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();
  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => setData(res.data))
      .catch((error) => {
        console.warn(error);
        alert('Failed to get an article');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  if (data === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        createdAt={new Date(data.createdAt)}
        viewsCount={data.viewsCount}
        commentsCount={3}
        tags={data.tags}
        isFullPost>
        <p>
          Hey there! 👋 I'm starting a new series called "Roast the Code", where I will share some
          code, and let YOU roast and improve it. There's not much more to it, just be polite and
          constructive, this is an exercise so we can all learn together. Now then, head over to the
          repo and roast as hard as you can!!
        </p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: 'Van Vong',
              avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'This is a test commentary',
          },
          {
            user: {
              fullName: 'Ivan Ivanov',
              avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}>
        <Index />
      </CommentsBlock>
    </>
  );
};
