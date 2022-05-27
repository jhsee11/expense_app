import './App.css';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="App relative">
      <div className="bg-[url('/img/budget_image.png')] absolute left-0 top-[-40px] opacity-20 blur-sm h-[102%] w-screen z-[-100] "></div>
      <Main className="relative" />
    </div>
  );
}

export default App;
