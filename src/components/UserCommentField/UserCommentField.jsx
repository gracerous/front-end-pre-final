import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Textarea } from '@mui/joy';
import { setComments } from '../../redux/actions/commentsActions';
import { useSelector, useDispatch } from 'react-redux';

export default function UserCommentField() {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comments.comments);

  const handleSendComment = () => {
    if (!comment.trim()) {
      return;
    }
    const userComment = {
      id: Date.now(),
      body: comment,
      user: {
        username: 'You'
      }
    }
    const updatedComments = [userComment, ...comments];
    dispatch(setComments(updatedComments));
    setComment('');
  };

  const handleCommentChange = event => {
    setComment(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Your comment</FormLabel>
      <Textarea
        placeholder='Type something here…'
        minRows={3}
        value={comment}
        onChange={handleCommentChange}
        sx={{
          minWidth: 300,
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Button onClick={handleSendComment}>Send</Button>
      </Box>
    </FormControl>
  );
}
