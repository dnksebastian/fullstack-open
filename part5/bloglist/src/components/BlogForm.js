import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
  });

  const addBlog = (e) => {
    e.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
      likes: "",
    });
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <span>title</span>
        <input
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
      </div>
      <div>
        <span>author</span>
        <input
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
        />
      </div>
      <div>
        <span>url</span>
        <input
          value={newBlog.url}
          onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
        />
      </div>
      <div>
        <span>likes</span>
        <input
          value={newBlog.likes}
          onChange={(e) => setNewBlog({ ...newBlog, likes: e.target.value })}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
