import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function BlogItem() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Fetched blog:', response.data); // Log the response
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error.response ? error.response.data : error.message);
        setError('Failed to fetch blog.'); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetch failed
  }

  return (
    <div className="blog-post">
      <Link to="/blogs" className="backlink">
        &#8592; back to all blogs
      </Link>
      {blog ? (
        <div>
          <h2 className="text-2xl my-12 font-semibold text-white">{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ) : (
        <p>Blog not found.</p> // Handle case where blog is null
      )}
    </div>
  );
}

export default BlogItem;