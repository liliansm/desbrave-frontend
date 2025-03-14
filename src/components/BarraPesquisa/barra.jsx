import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./barra.css";

function Barra({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query); 
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            handleSearch(); 
        }
    };

    return (
        <div className="bar-pesquisa">
            <input
                type="text"
                placeholder="Pesquisar..."
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress} 
            />
            <button onClick={handleSearch} className="search-button">
                <FaSearch className="search-icon" /> 
            </button>
        </div>
    );
}

export default Barra;