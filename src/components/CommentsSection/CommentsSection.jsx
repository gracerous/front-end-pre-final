import * as React from 'react';
import { FormControl, FormLabel, Textarea } from '@mui/joy';
import Avatar from '@mui/material/Avatar';
import { Box, useTheme } from '@mui/material';



export default function CommentsSection({ comments }) {
  const theme = useTheme();
  return (
    comments.map((comment) => (
      <FormControl
        sx={{
          '&:not(:last-child)': {
            marginBottom: 3
          },
        }}
      >
        <Box sx={{ display: 'flex', marginBottom: '10px' }}>
          <Avatar src="/broken-image.jpg" sx={{ marginRight: '10px' }} />
          <FormLabel sx={{ color: theme.palette.primary.main, alignSelf: 'flex-end' }}>{comment.user.username}</FormLabel>
        </Box>
        <Textarea readOnly minRows={2} value={comment.body}
          sx={{
            '--Textarea-focusedHighlight': 'transparent'
          }} />
      </FormControl>
    ))
  );
}