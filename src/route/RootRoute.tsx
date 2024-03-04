import { Routes, Route } from 'react-router-dom';
import Offense from '../pages/Offense';
import Defense from '../pages/Defense';
import More from '../pages/More';
// import Title from '../components/Title';

function RootRoute() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="/" Component={Offense} />
      <Route path="/pages/defense" Component={Defense} />
      <Route path="/pages/more" Component={More} />
    </Routes>
    // </BrowserRouter>
  );
}

export default RootRoute;
