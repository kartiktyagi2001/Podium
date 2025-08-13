import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blogs } from './pages/blogs'
import { Blog } from './pages/blog'
import { Publish } from './pages/publish'
import { Home } from './pages/home'
import { About } from './pages/about'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App