import React from 'react';
import ApiDataList from './components/ApiDataList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Ejemplo de Consumo de API con fetch()</h1>
      </header>
      <main>
        <ApiDataList />
      </main>
    </div>
  );
}

export default App;