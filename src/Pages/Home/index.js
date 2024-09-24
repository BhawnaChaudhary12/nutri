

const Home = () => <h1>Home Page</h1>;

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Other routes */}
      </Routes>
    </Router>
  );
};
