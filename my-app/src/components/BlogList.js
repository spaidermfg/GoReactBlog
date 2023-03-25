import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/blogs')
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Blog List</h1>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-6" key={blog.id}>
            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p className="card-text">{blog.body}</p>
                <Link to={`/blogs/${blog.id}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
