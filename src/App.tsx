import { Header } from './features/shared';
import { Dashboard } from './features/transactions';
import './App.scss';

/**
 * Componente principal de la aplicación
 */
function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
