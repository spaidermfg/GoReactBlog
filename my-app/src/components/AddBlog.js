import React, { useState } from 'react';
import axios from 'axios';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:8080/blogs', { title, content });
      alert('博客已添加成功');
      setTitle('');
      setContent('');
    } catch (error) {
      alert('添加博客失败，请稍后再试');
    }
  };

  return (
    <div>
      <h2>添加博客</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">标题</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">内容</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          添加博客
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
