import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// If a text string content is over 50 characters, shorten it and add a '...'.
const shortenContent = (content) => {
  if (content.length > 50) {
    return content.substring(0, 50) + '...';
  }
  return content;
};

// A single item in the blogs list
function BlogItem({ blog }) {
  const blogId = blog._id;
  const preview = shortenContent(blog.content); // Short preview of the blog content
  return (
    <li key={`blog-${blogId}`} className="blog-item">
      <Link to={`/blogs/${blogId}`}>
        <span>{blog.title}</span>
      </Link>
      <span>{preview}</span>
    </li>
  );
}

// List of all the blogs
function BlogsList({ data, isLoading }) {
  if (isLoading) {
    return <p>loading</p>;
  }
  if (!data?.length) {
    return <p> No blogs data </p>;
  }
  return (
    <div id="all-blogs">
      <h3>All blogs:</h3>
      <ul className="blogs-list">
        {data.map((row) => (
          <BlogItem blog={row} />
        ))}
      </ul>
    </div>
  );
}

function Blogs() {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    console.log('=== debug: fetching blogs data...');
    async function getBlogs() {
      const result = await axios.get('/api/blogs');
      setIsLoading(false);
      if (result && result.status === 200) {
        console.log('=== debug: data returned: ', result.data);
        setBlogs(result.data);
      } else {
        console.error('fetch data error: ' + result.status);
      }
    }
    getBlogs();
  }, []);

  return (
    <div>
      <h2>Blogs</h2>
      <p>This is the Blogs page</p>
      <BlogsList data={blogs} isLoading={isLoading} />
    </div>
  );
}

export default Blogs;