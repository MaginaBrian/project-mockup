import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';

const initialPosts = [
  {
    id: 1,
    title: "First Post",
    content: "This is the content of the first blog post."
  },
  {
    id: 2,
    title: "Second Post",
    content: "This is the content of the second blog post."
  }
];

const App = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    try {
      setPosts(initialPosts);
      setError(null);
    } catch (error) {
      setError('Failed to fetch posts. Please try again.');
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = (post) => {
    setLoading(true);
    try {
      const newPost = {
        id: posts.length + 1,
        title: post.title,
        content: post.content
      };
      setPosts([newPost, ...posts]);
      setError(null);
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const updatePost = (id, updatedPost) => {
    setLoading(true);
    try {
      setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
      setError(null);
    } catch (error) {
      setError('Failed to update post. Please try again.');
      console.error('Error updating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = (id) => {
    setLoading(true);
    try {
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