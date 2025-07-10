import { Routes, Route } from 'react-router-dom';
import Offense from './Offense';
import Defense from './Defense';
import More from './More';

function RootRoute() {
  return (
    <Routes>
      {/* <Route path="/" element={<Offense />} /> */}
      <Route path="/:lang" element={<Offense />} />
      <Route path="/:lang/defense" element={<Defense />} />
      <Route path="/:lang/more" element={<More />} />
    </Routes>
  );
}

export default RootRoute;
