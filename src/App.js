import './App.css';
import { Container } from '@mui/material';
import TabsRouter from './components/TabsRouter/TabsRouter';


function App() {
  return (
    <Container sx={{ paddingBottom: 5 }}>
      <TabsRouter />
    </Container>
  );
}

export default App;