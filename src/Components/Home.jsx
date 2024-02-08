import React, { useEffect, useState } from 'react'
import LeftMainCont from './LeftMainCont';

const Home = () => {
    const [apiData, setApiData] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('episode');
    const [selectedItem, setSelectedItem] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://swapi.dev/api/films/?format=json");
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                // console.log(data.results); 
                setApiData(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filteredData = apiData.filter(data =>
        data.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort data based on sortBy value
    const sortedData = filteredData.slice().sort((a, b) => {
        if (sortBy === 'episode') {
            return a.episode_id - b.episode_id;
        } else if (sortBy === 'year') {
            return parseInt(a.release_date.substring(0, 4)) - parseInt(b.release_date.substring(0, 4));
        }
        return 0;
    });

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="container">
            <div className="navbar">
                <select name="filter" id="filter" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="episode">Episode</option>
                    <option value="year">Year</option>
                </select>
                <div className="search-box">
                    <i className="fas fa-search"></i>
                    <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>

            </div>
            <div className="maincontainer">
                <div className="leftmain-container">
                    {sortedData.map((data) => (
                        <LeftMainCont key={data.episode_id} data={data} onClick={() => handleItemClick(data)} />
                    ))}
                </div>
            
            <div className="right-main-container">
                {selectedItem?(
                    <div className="selected-item">
                        <h2>{selectedItem.title}</h2>
                        <p>Episode {selectedItem.episode_id}</p>
                        <p>{selectedItem.opening_crawl}</p>
                        <p>Directed By: {selectedItem.director}</p>
                    </div>
                ):(
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <p style={{fontSize:"18px"}}>No Movie Selected</p>
                    </div>
                )}
            </div>
</div>
        </div>
    )
}

export default Home