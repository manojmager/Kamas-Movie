import './header.css';

function Header({ genres, selectedGenre, setSelectedGenre }) {
    return (
        <header className="App-header">
            <img 
                className="header-img" 
                src="https://images.pexels.com/photos/12616961/pexels-photo-12616961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Red Courtion"
            />
            <div className='dropbox-container'>
                <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)} className="genre-dropdown">
                    <option value="All">All</option>
                    {genres.map((genre, index) => (
                        <option key={index} value={genre}>{genre}</option>
                    ))}
                </select>
            </div>
        </header>
    );
}

export default Header;
