import PopularMovies from "./components/PopularMovies";
import Routes from "./Routes";

function App() {
  return (
    <div>
      <Routes />;
      <p className="text-center text-sm text-gray-400 p-5">
        "This website uses TMDB and the TMDB APIs but is not endorsed,
        certified, or otherwise approved by TMDB."
      </p>
    </div>
  );
}

export default App;
