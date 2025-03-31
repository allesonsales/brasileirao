import { useState } from 'react'
import './App.css'
import Provider from './provider'
import ModalSelect from './components/modalSelect/ModalSelect'
import Menu from './components/menu/menu'
import Home from './pages/home/home'
import Agenda from './pages/agenda/agenda'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Tabela from './pages/tabela/tabela'
import ErrorBoundary from './errourBoundary'
import Elenco from './pages/elenco/elenco'
import Estatisticas from './pages/estatisticas/estatisticas'
import Footer from './components/footer'

function App() {
  return (
    <>
    <ErrorBoundary>
      <Provider>
        <ModalSelect>
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path='/estatisticas' element={<Estatisticas />} />
            <Route path="/tabela" element={<Tabela />} />
            <Route path="/elenco" element={<Elenco />} />
          </Routes>
          <Footer />
        </BrowserRouter>
        </ModalSelect>
      </Provider>
      </ErrorBoundary>
    </>
  )
}

export default App
