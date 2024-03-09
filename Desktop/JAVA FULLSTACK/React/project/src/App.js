import { useEffect, useState } from 'react';
import './App.css';
import Header from './Header';
import Nav from './Nav';
import Home from './Home';
import Newpost from './Newpost';
import { format} from 'date-fns';
import Footer from './Footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from "./api/Post1";
import About from './About';
import Missing from './Missing';
import PostPage from './Postpage';
import EditPost from './Editpost';
import { Dataprovider } from './Context/Datacontext';

function App() {

  let [posts, setposts] = useState([])
  let [search, setSearch] = useState('')
  let [searchResult, setSearchResult] = useState('')
  let [postBody, setPostBody] = useState('')
  let [postTitle, setPostTitle] = useState('')
  let navigate = useNavigate()
  let [editBody,setEditBody] = useState('')
  let [editTitle,setEditTitle] = useState('')
  useEffect(() => {
    let fetchpost = async () => {
      try {
        let response = await api.get("/posts")
        setposts(response.data)
      }
      catch (error) {
        console.log(error.message)
      }
    }
    fetchpost()
  }, [])

  let handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let id = posts.length ? posts[posts.length - 1].id + 1 : 1
      //  npm i date-fns
      let datetime = format(new Date(), 'MMMM dd, yyyy pp')
      let newPost = { id, title: postTitle, datetime, body: postBody }
      let response = await api.post("/posts", newPost)
      let allposts = [...posts, newPost]
      setposts(allposts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
      
    }
    catch (error) {
      console.log(error.message)
    }
  }
  let handledelete = async(id) => {
    try{ 
    let response = await api.delete(`/posts/${id}`)
    let postlist = posts.filter((post) => post.id !== id)
    setposts(postlist)
    navigate('/')
       }
       catch (error) {
        console.log(error.message)
      }
  }
  
  let handleEdit=async(id)=>{
    let datetime = format(new Date(), 'MMMM dd, yyyy pp')
    let editPost = { id, title: editTitle, datetime, body: editBody }
    try{
      let response = await api.put(`/posts/${id}`,editPost)
      setposts(posts.map (post=>post.id===id ? { ...response.data }:post))
      setEditTitle("")
      setEditBody('')
      navigate('/')
    }
    catch(error){
      console.log(error.message)
   }
  }
  useEffect(() => {
    let filterResults = posts.filter((post) =>
      ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
      ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filterResults.reverse())
  }, [posts, search])


  return (
    <div className="App">
      <Dataprovider>
      <Header title='Project' />
      <Nav
        search={search}
        setSearch={setSearch}
      />
      <Routes>
        <Route path='/' element={
          <Home
            posts={searchResult}
          />} />
        <Route path='post'>
          <Route index element={<Newpost
            handleSubmit={handleSubmit}
            postBody={postBody}
            setPostBody={setPostBody}
            setPostTitle={setPostTitle}
            postTitle={postTitle}
          />}
          />
          <Route path=':id' element={<PostPage posts={posts} handledelete={handledelete} />} />
        </Route>
            <Route path='edit/:id' element={<EditPost
             posts={posts}
            handleEdit={handleEdit}
            editBody={editBody}
            editTitle={editTitle}
            setEditBody={setEditBody}
            setEditTitle={setEditTitle}
            />}/>
        <Route path='/about' element={<About />}></Route>
        <Route path='*' element={<Missing />}></Route>
      </Routes>n 
      <Footer
      />
      </Dataprovider>
    </div>
  );
}
//<home posts={posts} />
export default App;
