import './App.css';
import DataPreview from './components/DataPreview';

import InputSelector from './components/InputSelector';
import Instructions from './components/Instructions';

function App() {
  return (
    <div className="App">
      <Instructions />
      <InputSelector />
      <DataPreview/>
    </div>
  );
}

export default App;
