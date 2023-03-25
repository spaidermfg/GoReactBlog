import { useState, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import axios from "axios";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    // fetch blog data by id
    axios.get(`http://localhost:8080/blogs/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // update blog by id
    axios.put(`http://localhost:8080/blogs/${id}`, { title, content })
      .then(res => {
        history.push(`/blogs/${id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea className="form-control" id="content" rows="10" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditBlog;
