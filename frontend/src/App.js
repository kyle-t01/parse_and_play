import './App.css';
import DataPreview from './components/DataPreview';

import InputSelector from './components/InputSelector';
import Instructions from './components/Instructions';
import TonePlayer from './components/TonePlayer';
import ReportForm from './components/ReportForm';

function App() {
  return (
    <div className="App">
      <h1>Parse and Play! Write down music notes as text and listen to it!</h1>
      <Instructions />
      <InputSelector />
      <DataPreview />
      <TonePlayer />
      <ReportForm />
    </div>
  );
}

export default App;
