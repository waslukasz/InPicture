import './App.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Profile from './components/Profile'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Album from './components/Album'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header/>
          <div className='flex justify-center'>
            <Routes>
              <Route path='/' element={<Feed />} />
              <Route path='/profile/:id' element={<Profile />}/>
              <Route path='/album/:id' element={<Album />} />
            </Routes>
          </div>
      </BrowserRouter>
    </>
  )
}

export default App
