import './App.css';
import DataPreview from './components/DataPreview';

import InputSelector from './components/InputSelector';
import Instructions from './components/Instructions';
import TonePlayer from './components/TonePlayer';

function App() {
  return (
    <div className="App">
      <Instructions />
      <InputSelector />
      <DataPreview />
      <TonePlayer />
    </div>
  );
}

export default App;
