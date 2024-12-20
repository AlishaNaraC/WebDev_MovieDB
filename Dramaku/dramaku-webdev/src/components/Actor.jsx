import React from 'react';

function Actor({ actors }){
    return(
        <div className="actor-card-container">
                {actors.map((actor, index) => (
                    <div key={index} >
                        <div className="actor-card">
                            <img src={actor.poster} alt={actor.name} className="img-fluid" />
                            <div className="actor-card-content">
                                <h4>{actor.name}</h4>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Actor;