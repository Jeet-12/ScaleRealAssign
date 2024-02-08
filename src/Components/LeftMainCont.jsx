import React from 'react'


const LeftMainCont = ({ data,onClick }) => {
  return (
    <div className="left-container" onClick={onClick}>
      <div className="left-content">
        <p className="episode">Episode: {data.episode_id}</p>
        <h2 className="title">{data.title}</h2>
        <p className="release-date">Release Date: {data.release_date}</p>
      </div>
    </div>
  );
};

export default LeftMainCont