import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://project-mockup-dbjson.vercel.app/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPosts(data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch posts. Please try again.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (post) => {
    setLoading(true);
    try {
      const response = await fetch('https://project-mockup-dbjson.vercel.app/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      if (!response.ok) {
        throw new Error('Failed to create post');
      }
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
      setError(null);
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, updatedPost) => {
    setLoading(true);
    try {
      const response = await fetch(`https://project-mockup-dbjson.vercel.app/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      const updated = await response.json();
      setPosts(posts.map(post => (post.id === id ? updated : post)));
      setError(null);
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://project-mockup-dbjson.vercel.app/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter(post => post.id !== id));
      setError(null);
    } catch (error) {
      setError('Failed to delete post. Please try again.');
      console.error('Error deleting post:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Blog App</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            {error}
          </div>
        )}
        {loading && (
          <div className="text-center mb-6">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <BlogForm onSubmit={createPost} loading={loading} />
        <BlogList posts={posts} onUpdate={updatePost} onDelete={deletePost} />
      </div>
    </div>
  );
};

export default App;