import Home from '../features/home/Home';

import { useSelector } from 'react-redux';

import { selectPage } from '../redux/pageSlice';

const Routes = (route) => {
  const currentPage = useSelector(selectPage);
  const pageInfoId = currentPage.split("-")[1] || ""

  const routes = {
    "home": (<Home />)
  }

  return routes[route]
}

export default Routes;