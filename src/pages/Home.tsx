/** @format */

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../redux/slices/asyncActions';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectPostsData } from '../redux/slices/posts';
import { PostSkeleton } from '../components/Post/Skeleton';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, status } = useSelector(selectPostsData);
  React.useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const skeletons = [...new Array(5)].map((_, index) => <PostSkeleton key={index} />);
  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="New" />
        <Tab label="Popular" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {status === 'loading'
            ? skeletons
            : items.map((obj, index) => (
                <Post
                  key={index}
                  _id={obj.user._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={new Date('June 12, 2022')}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'notes']} isLoading={false} />
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
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
