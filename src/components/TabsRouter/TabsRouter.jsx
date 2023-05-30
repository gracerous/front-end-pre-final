import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Tabs,
  Tab,
  Container,
  List,
  ListItem,
  ListItemText,
  Drawer,
  ListItemButton
} from '@mui/material';
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  matchPath,
  useLocation,
  NavLink,
} from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import MainPage from '../../pages/MainPage/MainPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import CategoryPage from '../../pages/CategoryPage/CategoryPage';
import CartPage from '../../pages/CartPage/CartPage';
import { useState, useEffect } from 'react';
import { getCategories } from '../../redux/productsMiddleware';
import { setCategory } from '../../redux/actions/categoriesActions';
import { useSelector, useDispatch } from "react-redux";
import ProductPage from '../../pages/ProductPage/ProductPage';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonalAccountPage from '../../pages/PersonalAccountPage/PersonalAccountPage';
import CartBadge from '../CartBadge/CartBadge';
import CheckoutPage from '../../pages/CheckoutPage/CheckoutPage';

function Router(props) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location='/main-page'>{children}</StaticRouter>;
  }
  return (
    <MemoryRouter initialEntries={['/main-page']} initialIndex={0}>
      {children}
    </MemoryRouter>
  );
}

Router.propTypes = {
  children: PropTypes.node,
};

function useRouteMatch(patterns) {
  const { pathname } = useLocation();
  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }
  return null;
}

function MyTabs() {
  const routeMatch = useRouteMatch(['/main-page', '/categories', '/personal-account', '/cart']);
  const currentTab = routeMatch?.pattern?.path;
  const categories = useSelector(state => state.categories.data);


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  const [state, setState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };

  const handleCategoryLinkCLick = (category) => () => {
    dispatch(setCategory(category));
  }

  return (
    <Container sx={{ marginBottom: '30px' }}>
      <Tabs value={currentTab}>
        <Tab label='Main Page' value='/main-page' to='/main-page' component={NavLink} />
        <Tab label='Categories' value='/categories' to='/categories' onClick={toggleDrawer(true)} />
        <Tab sx={{ marginLeft: 'auto' }} value='/personal-account' to='/personal-account' component={NavLink} icon={<AccountCircleIcon />} />
        <Tab value='/cart' to='/cart' component={NavLink} icon={<CartBadge />} />
      </Tabs>
      <Drawer
        anchor='left'
        open={state}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {categories.map((category) => (
              <ListItemButton >
                <ListItem
                  variant='h4'
                  key={category}
                  component={NavLink}
                  color='primary'
                  to={`/categories/${category}`}
                  onClick={handleCategoryLinkCLick(category)}
                  sx={{
                    color: '#3c3c3c',
                    textTransform: 'uppercase'
                  }}
                >
                  <ListItemText primary={category} />
                </ListItem>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Container>
  );
}

export default function TabsRouter() {
  return (
    <BrowserRouter>
      <Box sx={{ width: '100%' }}>
        <MyTabs />
        <Routes>
          <Route path='/main-page' element={<MainPage />} />
          <Route path='/categories/:categoryName' element={<CategoryPage />} />
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/personal-account' element={<PersonalAccountPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

