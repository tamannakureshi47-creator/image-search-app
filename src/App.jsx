import "./App.css";
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (!value.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=jKEVpSH8J_bd3IDY_EJVosfynoSuw5XfUS_d7DlfigM&query=${value}&orientation=squarish`
      );

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="App min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark shadow">
        <div className="container">
          <span className="navbar-brand fw-bold fs-4">
            📸 Image Search
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container py-5">

        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">
            Search Beautiful Images
          </h1>

          <p className="text-muted">
            Find amazing photos using Unsplash
          </p>

          {/* Search Box */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-8 col-lg-7">

              <div className="input-group input-group-lg shadow-sm">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search images... e.g. nature"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      fetchImages();
                    }
                  }}
                />

                <button
                  className="btn btn-dark px-4"
                  onClick={fetchImages}
                >
                  🔍 Search
                </button>

              </div>

            </div>
          </div>
        </div>


        {/* Loading */}
        {loading && (
          <div className="text-center my-5">
            <div
              className="spinner-border text-dark"
              role="status"
            ></div>

            <p className="mt-2 text-muted">
              Searching images...
            </p>
          </div>
        )}


        {/* Images */}
        <div className="row g-4">

          {results.map((image) => (

            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              key={image.id}
            >

              <div className="card image-card border-0 shadow-sm h-100">

                <img
                  src={image.urls.small}
                  className="card-img-top"
                  alt={image.alt_description || "Unsplash image"}
                />

                <div className="card-body">

                  <p className="card-text text-muted small mb-0">
                    📷 {image.user.name}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* No Results */}
        {!loading && value && results.length === 0 && (
          <div className="text-center mt-5">
            <h5>No images found 😔</h5>
            <p className="text-muted">
              Try searching for something else.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;