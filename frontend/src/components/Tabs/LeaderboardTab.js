import React, { useState } from 'react';
import './Tabs.css';

const LeaderboardTab = () => {
  const [friendSearch, setFriendSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Mock data for friends' productivity
  const [friends, setFriends] = useState([
    { id: 1, username: 'Jas42', status: 'Studying', score: 75 },
    { id: 2, username: 'BigJoe', status: 'Studying', score: 42 },
    { id: 3, username: 'EmilyRabbit', status: 'Playing Piano', score: 25 },
    { id: 4, username: 'Jim_The_Man', status: 'Offline', score: 32 }
  ]);
  
  // Mock search results
  const mockSearchResults = [
    { id: 5, username: 'Anna2003', status: 'Writing Essay', score: 39 },
    { id: 6, username: 'Alex_J', status: 'Reading', score: 67 },
    { id: 7, username: 'Samantha', status: 'Offline', score: 51 }
  ];
  
  const [searchResults, setSearchResults] = useState([]);
  
  const handleSearch = () => {
    if (friendSearch.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    // Filter mock search results based on search term
    const results = mockSearchResults.filter(user => 
      user.username.toLowerCase().includes(friendSearch.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  const handleAddFriend = (friend) => {
    // Check if already in friends list
    if (!friends.some(f => f.id === friend.id)) {
      setFriends([...friends, friend]);
    }
    
    // Clear search
    setFriendSearch('');
    setSearchResults([]);
    setShowSearch(false);
  };
  
  // Sort friends by score (highest first)
  const sortedFriends = [...friends].sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-tab">
      <div className="leaderboard-header">
        <h2>Friend Activity</h2>
        <button 
          className="add-friend-button"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? 'Cancel' : '+ Add Friend'}
        </button>
      </div>
      
      {showSearch && (
        <div className="friend-search">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search username..."
              value={friendSearch}
              onChange={(e) => setFriendSearch(e.target.value)}
              onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map(user => (
                <div key={user.id} className="search-result-item">
                  <div className="user-info">
                    <p className="username">{user.username}</p>
                    <p className="status">{user.status}</p>
                  </div>
                  <button 
                    className="add-button"
                    onClick={() => handleAddFriend(user)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
          
          {friendSearch && searchResults.length === 0 && (
            <p className="no-results">No users found</p>
          )}
        </div>
      )}
      
      <div className="leaderboard-container">
        <div className="leaderboard-header-row">
          <div className="rank-column">Rank</div>
          <div className="name-column">Friend</div>
          <div className="status-column">Status</div>
          <div className="score-column">Score</div>
        </div>
        
        {sortedFriends.map((friend, index) => (
          <div 
            key={friend.id} 
            className={`leaderboard-row ${index === 0 ? 'top-rank' : ''}`}
          >
            <div className="rank-column">#{index + 1}</div>
            <div className="name-column">{friend.username}</div>
            <div className="status-column">
              <span className={`status-indicator ${friend.status === 'Offline' ? 'offline' : 'online'}`}></span>
              {friend.status}
            </div>
            <div className="score-column">{friend.score}</div>
          </div>
        ))}
      </div>
      
      <div className="productivity-insights">
        <h3>Productivity Insights</h3>
        <p className="insight-text">
          <span className="highlight">{sortedFriends[0]?.username}</span> is the most productive with {sortedFriends[0]?.score} points!
        </p>
        <p className="insight-text">
          Most of your friends are currently studying. Maybe you should join them!
        </p>
      </div>
    </div>
  );
};

export default LeaderboardTab;