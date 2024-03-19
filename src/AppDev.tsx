import './assets/scss/app.scss';
import WisemappingEditor from './components/WisemappingEditor.tsx';
import { useState } from 'react';

function App() {
  const {} = import.meta.env;

  const [leave, setLeave] = useState<boolean>(false);
  const [render, setRender] = useState<boolean>(false);

  const toggleRender = () => {
    if (render) {
      setLeave(true);
      setTimeout(() => setLeave(false), 200);
    }
    setTimeout(() => setRender(!render), 150);
  };

  return (
    <>
      <div className="settings">
        <div>
          <div>
            <b>Actions</b>
          </div>
          <button type="button" onClick={toggleRender}>
            {render ? 'Unmount' : 'Mount'}
          </button>
        </div>
      </div>
      <main>
        <div className="app-container">
          <WisemappingEditor />
        </div>
      </main>
    </>
  );
}

export default App;
