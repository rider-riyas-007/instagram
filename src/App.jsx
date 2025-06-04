import { Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Suggestions from './Suggestions';
import Profile from './Profile';
import Reels from './Reels';
import Explore from './Explore';
import Search from './Search';
import ViewStory from './ViewStory';

function App() {
  return (
    <div className="d-flex vh-100">
      <div className="w-20"><Sidebar /></div>
      <div className="w-50">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reels" element={<Reels />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/search" element={<Search />} />
          <Route path="/story/:id/:tot" element={<ViewStory />} />
        </Routes>
      </div>
      <div className="w-30"><Suggestions /></div>
    </div>
  );
}

export default App;
