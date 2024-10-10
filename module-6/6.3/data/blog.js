//Dummy Blog Posts
export var blogs = [
    {id: 1, title: 'Blog 1', content: 'This is the Blog 1 content'},
    {id: 2, title: 'Blog 2', content: 'This is the Blog 2 content'},
    {id: 3, title: 'Blog 3', content: 'This is the Blog 3 content'},
    {id: 4, title: 'Blog 4', content: 'This is the Blog 4 content'}
];

export const toInt = (id) => parseInt(id, 10);

// Return the current max blog ID
const blogsMaxId = (id) => Math.max(...blogs.map((b) => b.id));

// Check if blog with a given ID exists
const blogExists = (id) => !!blogs.find((x) => x.id === id);


// Find a single blog by ID
export function blogsFindById (blogId) {
    blogId = toInt(blogId);
    return blogs.find((x) => x.id.toString() === id);
}

// Get the ID of the last blog entry
export function blogsLastId () {
    return blogs[blogs.length - 1]?.id || 0;
};

// Create a new blog object with ID
export function newBlog({ id, title, content }) {
    const blogId = id || blogsLastId() + 1;
    return {
        id: blogId,
        title,
        content,
    }
}

//Add new entry to array
export function addBlog({ id, title, content }) {
    const blog = newBlog ({ title, content });
    blogs.push(blog);
}

//Update blog post
export function updateBlog (updatedBlog) {
    const id = toInt(updatedBlog.id);
    const exist = blogsFindById;
    if (!exist) {
        throw new Error(`blog with id ${id} is not found`)
    }
    const filtered = blogs.filter((x) => x.id !== id);
    blogs = { ...filtered, updatedBlog}.sort((a,b) => a.id - b.id);
}

//Delete a single blog
export function deleteBlog (blogId) {
    blogId = toInt(blogId);
    blogs = blogs.filter((x) => x.id !==blogId);
}