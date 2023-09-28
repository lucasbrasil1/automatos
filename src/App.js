import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home';
import Finito from './components/Finito';
import Com2Pilhas from './components/Com2Pilhas';
import Com1Pilha from './components/Com1Pilha';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/afd' element={<Finito />} />
        <Route path='/a1p' element={<Com1Pilha />} />
        <Route path='/a2p' element={<Com2Pilhas />} />
      </Route>
    </Routes>
  );
}

export default App;
