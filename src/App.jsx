import React from 'react'
import Player from './Expected Structure/components/layout_components/Player'
import Searchbar from './Expected Structure/components/layout_components/SearchBar'
import TextButton from './Expected Structure/components/TextButton'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Expected Structure/pages/HomePage'
import MainLayout from './Expected Structure/layouts/MainLayout'
import ChatPanel from './Expected Structure/components/layout_components/ChatPanel'

const App = () => {
  return (
    <div className = ' h-screen bg-black '>

      <Routes>
        <Route element = {<MainLayout/>}>

          <Route path = '/' element = {<HomePage/>}></Route>
          <Route path = '/chat' element = {<ChatPanel/>}></Route>

        </Route>
      </Routes>

      {/* <Searchbar></Searchbar>

      <Player></Player> */}

      {/* <MainLayout></MainLayout> */}

    </div>
  )
}

export default App