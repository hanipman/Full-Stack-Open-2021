import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs )
    })  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      console.log('wrong credentials')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}  
            />
          </div>
          <div>
            password
            <input
              type='text'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <div>
          <h2>blogs</h2>
        </div>
        <div>
          {user.name} logged in
          <button type='button' onClick={handleLogout}>logout</button>
        </div>
        <br/>
        <div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog}/>)}
        </div>
      </div>
    )
  }

  return (
    <div>
      {user === null ? loginForm() : blogForm()}
    </div>
  )
}

export default App