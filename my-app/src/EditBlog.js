import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EditBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    const result = await axios.get(`http://localhost:8080/blogs/${id}`);
    setTitle(result.data.title);
    setContent(result.data.content);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/blogs/${id}`, { title, content });
    history.push('/');
  };

  return (
    <div className="container mt-3">
      <h2>Edit Blog</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter content" value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}

export default EditBlog;
