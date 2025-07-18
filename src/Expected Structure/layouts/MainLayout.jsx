import { Panel, PanelGroup } from 'react-resizable-panels'
import { Outlet } from 'react-router-dom' // ✅ Import Outlet
import Sidebar from '../components/layout_components/Sidebar'
import Searchbar from '../components/layout_components/SearchBar'
import ChatPanel from '../components/layout_components/ChatPanel'
import Player from '../components/layout_components/Player'
import Friends from '../components/layout_components/Friends'

export default function MainLayout() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Top Search Bar */}
      <Searchbar />

      {/* Middle Resizable Panels */}
      <div className="pt-[70px] pb-[100px] h-full">
        <PanelGroup direction="horizontal" className="h-full gap-2 px-2 ">
          
          {/* Sidebar (Left Panel) */}
          <Panel defaultSize={20} minSize={15} maxSize={25}>
            <div className="h-full bg-neutral-950 border border-neutral-700 rounded-md p-4">
              <Sidebar />
            </div>
          </Panel>

          {/* Main Content (Center Panel) */}
          <Panel defaultSize={60} minSize={40}>
            <div className="h-full bg-neutral-950 border border-neutral-700 rounded-md p-4 overflow-y-auto [&::-webkit-scrollbar]:hidden">
              <Outlet /> {/* ✅ This replaces <MainContent /> */}
            </div>
          </Panel>

          {/* Chat Panel (Right Panel) */}
          <Panel defaultSize={20} minSize={15} maxSize={25}>
            <div className="h-full bg-neutral-950 border border-neutral-700 rounded-md p-4">
              <Friends />
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Bottom Player */}
      <Player />
    </div>
  )
}
