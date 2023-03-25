import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const result = await axios.get('http://localhost:8080/blogs');
    setBlogs(result.data);
  };

  const createBlog = async () => {
    await axios.post('http://localhost:8080/blogs', { title, content });
    fetchBlogs();
  };

  const deleteBlog = async (id) => {
    await axios.delete(`http://localhost:8080/blogs/${id}`);
    fetchBlogs();
  };

  const updateBlog = async (id) => {
    await axios.put(`http://localhost:8080/blogs/${id}`, { title, content });
    fetchBlogs();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBlog();
    setTitle('');
    setContent('');
  };

  return (
    <Router>
  <div className="container mt-3">
      <h2>Min Blog</h2>
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
          Create
        </Button>
      </Form>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead> 
        <tbody>
  {blogs.map((blog) => (
    <tr key={blog.id}>
      <td>
        <Link to={`/edit/${blog.id}`}>{blog.title}</Link>
         </td>
         <td>{blog.content}</td>
           <td>
              <Button variant="warning" onClick={() => updateBlog(blog.id)}>
                Update
              </Button>{' '}
              <Button variant="danger" onClick={() => deleteBlog(blog.id)}>
                Delete
              </Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </Router>
  );
}

export default App;
