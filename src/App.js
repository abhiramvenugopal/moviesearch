import './App.css';
import { useSelector ,useDispatch } from "react-redux";
import { increment } from "./actions";
import SearchBar from "./components/SearchBar/searchBar";

function App() {
  const counter=useSelector(state =>state.counter)
  const dispatch=useDispatch()
  return (
    <div className="App">
      <h1>counter {counter}</h1>
      <button onClick={()=>{dispatch(increment(5))}}>+</button>
      <button>-</button>
      <SearchBar/>
      
    </div>
  );
}

export default App;
