import './App.css'
import Header from './components/Header'
import Feed from './components/Feed'
import Profile from './components/Profile'

function App() {
  return (
    <>
    <Header/>
    <div className='flex'>
      <Feed/>
      <Profile/>
    </div>
    </>
  )
}

export default App
