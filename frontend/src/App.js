import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Pages/Home";
import BookContextProvider from "./BookContextProvider";

function App() {
  return (
    <BookContextProvider>
      <div className="App">
        <Home />
      </div>
    </BookContextProvider>
  );
}

export default App;
