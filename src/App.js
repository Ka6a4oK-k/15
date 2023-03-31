import './App.css';
import GameField from './components/GameField/GameField';
import OptionsBar from './components/OptionsBar/OptionsBar';

function App() {
  return (
    <div className="App">
      <OptionsBar/>
      <GameField rows={4} cols={4}/>
    </div>
  );
}

export default App;
