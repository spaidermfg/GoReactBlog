import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const getBlog = async () => {
      const response = await axios.get(`http://localhost:8080/blogs/${id}`);
      setBlog(response.data);
    };
    getBlog();
  }, [id]);

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default ViewBlog;
