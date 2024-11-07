import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// If a text string content is over 50 characters, shorten it and add a '...'.
const shortenContent = (content) => {
  if (content.length > 100) {
    return content.substring(0, 100) + '...';
  }
  return content;
};

// A single item in the blogs list
function BlogItem({ blog }) {
  const blogId = blog.id;
  const preview = shortenContent(blog.content); // Short preview of the blog content
  return (
    <li key={`blog-${blogId}`} className="blog-item">
      <Link to={`/blogs/${blogId}`}>
        <div className="font-semibold text-2xl">{blog.title}</div>
      </Link>
      <span>{preview}</span>
    </li>
  );
}

// List of all the blogs
function BlogsList({ data, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data?.length) {
    return <p>No blogs data</p>;
  }
  return (
    <div id="all-blogs">
      <ul className="blogs-list grid grid-cols-3 gap-4 pb-20 gap-y-20">
        {data.map((row) => (
          <BlogItem blog={row} key={row._id} />
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
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setIsLoading(false);
        if (result && result.status === 200) {
          console.log('=== debug: data returned: ', result.data);
          setBlogs(result.data);
        } else {
          console.error('Fetch data error: ' + result.status);
        }
      } catch (error) {
        setIsLoading(false);
        console.error('Fetch data error: ', error);
      }
    }
    getBlogs();
  }, []);

  return (
    <div>
      <h2 className="text-white text-7xl font-semibold leading-tight pb-8">Tech Insights Hub</h2>
      <p className="text-white pb-8">Explore our tech blog collection to stay updated with the latest innovations, expert opinions, and practical advice.</p>
      <BlogsList data={blogs} isLoading={isLoading} />
    </div>
  );
}

export default Blogs;

console.log('API URL:', process.env.REACT_APP_API_URL);