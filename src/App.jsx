import React from 'react'
import Player from './Expected Structure/components/Player'
import Searchbar from './Expected Structure/components/SearchBar'

const App = () => {
  return (
    <div className = ' h-screen bg-black '>

      <Searchbar></Searchbar>

      {/* <button class=" fixed top-24 rounded-full bg-white px-4 py-2 text-sm hover:bg-orange-600 font-semibold text-black">Save Changes</button> */}

      <Player></Player>
    </div>
  )
}

export default App