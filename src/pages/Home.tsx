/** @format */

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts } from '../redux/posts/asyncActionsPosts';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { selectPostsData } from '../redux/posts/slice';
import { PostSkeleton } from '../components/Post/Skeleton';
import { fetchTags } from '../redux/tags/asyncActionsTags';
import { selectTagsData } from '../redux/tags/slice';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, statusPosts } = useSelector(selectPostsData);
  const { tags, statusTags } = useSelector(selectTagsData);

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
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
          {statusPosts === 'loading'
            ? skeletons
            : posts.map((obj, index) => (
                <Post
                  key={index}
                  id={obj._id}
                  title={obj.title}
                  imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                  user={obj.user}
                  createdAt={new Date(obj.createdAt)}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={statusTags} />
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
