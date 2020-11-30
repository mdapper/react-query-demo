import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';

function useFilms() {
  return useQuery(
    'films',
    async () => {
      const response = await fetch('https://swapi.dev/api/films/');
      const films = await response.json();
      return films.results;
    },
    { refetchOnWindowFocus: true, staleTime: 0, cacheTime: 5000 }
  );
}

function Count() {
  const { data } = useFilms();
  return <h3>You are looking at {data?.length} movies</h3>;
}

function Films({ queryKey }) {
  const { data, isLoading, isError, error, isFetching } = useFilms();

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {data?.map((film) => (
            <div key={film.title}>{film.title}</div>
          ))}
          {isFetching ? <div>Updating...</div> : null}
        </div>
      )}

      {isError ? <div>{error.message}</div> : null}
      <br />
    </>
  );
}

function App() {
  return (
    <div>
      <h1>React Query Demo</h1>
      <Count />
      <Films />
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
