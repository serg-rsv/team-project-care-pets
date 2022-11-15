import SharedLayout from './components/SharedLayout';
import HomePage from './pages/HomePage';
// import NoticesPage from './pages/NoticesPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
