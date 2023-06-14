/** @format */

import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/auth/selectors';
import axios from '../../axios';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';

export const AddPost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const imageUrlPost = `${process.env.REACT_APP_API_URL}${imageUrl}`;

  const isEditing = Boolean(id);

  const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      const file = event.target.files?.[0];
      if (file) {
        formData.append('image', file);
      }
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('File upload error');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value: string) => {
    setText(value);
  }, []);

  const onSumbit = async () => {
    try {
      setIsLoading(true);

      const fields = {
        imageUrl,
        title,
        tags,
        text,
      };
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert('Failed to create an article');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setImageUrl(data.imageUrl);
          setTitle(data.title);
          setTags(data.tags.join(','));
          setText(data.text);
        })
        .catch((error) => {
          console.log(error);
          alert('Failed to get an article');
        });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Enter text...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'my-unique-id',
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef?.current?.click()} variant="outlined" size="large">
        Upload previews
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Delete
          </Button>
          <img className={styles.image} src={imageUrlPost} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="The title of the article..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSumbit} size="large" variant="contained">
          {isEditing ? 'Save changes' : 'Publish'}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
