import { Routes, Route } from 'react-router-dom';
import Offense from './Offense';
import Defense from './Defense';
import More from './More';

function RootRoute() {
  return (
    <Routes>
      <Route path="/" Component={Offense} />
      <Route path="/pages/defense" Component={Defense} />
      <Route path="/pages/more" Component={More} />
    </Routes>
  );
}

export default RootRoute;
