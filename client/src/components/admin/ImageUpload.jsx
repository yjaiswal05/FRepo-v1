import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

const ImageUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('display_order', 1); // You might want to make this dynamic
    formData.append('image', file);

    try {
      await axios.post('http://localhost:5000/api/hero-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Clear form
      setTitle('');
      setDescription('');
      setFile(null);
      
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>Upload Hero Image</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: '16px', display: 'block' }}
        />
        <Button 
          variant="contained" 
          type="submit"
          disabled={!file || !title}
        >
          Upload Image
        </Button>
      </form>
    </Box>
  );
};

export default ImageUpload;
