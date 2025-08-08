import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Leaderboard from './components/Leaderboard';
import NotFound from './pages/NotFound';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game/:id' element={<Game />} />
      <Route path='/leaderboard/:id' element={<Leaderboard />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
