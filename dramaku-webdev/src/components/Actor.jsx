import actorOneImg from '../image/actorOneImg.jpeg';
import actorTwoImg from '../image/actorTwoImg.jpg';
import actorThreeImg from '../image/actorThreeImg.jpg';
import actorFourImg from '../image/actorFourImg.jpg';
import actorFiveImg from '../image/actorFiveImg.jpg';
import actorSixImg from '../image/actorSixImg.jpg';

function Actor(){
    return(
        <div className="actor-card-container">
                {[
                    { src: actorOneImg, name: 'Actor 1', role: 'Role 1' },
                    { src: actorTwoImg, name: 'Actor 2', role: 'Role 2' },
                    { src: actorThreeImg, name: 'Actor 3', role: 'Role 3' },
                    { src: actorFourImg, name: 'Actor 4', role: 'Role 4' },
                    { src: actorFiveImg, name: 'Actor 5', role: 'Role 5' },
                    { src: actorSixImg, name: 'Actor 6', role: 'Role 6' }
                ].map((actor, index) => (
                    <div key={index} >
                        <div className="actor-card">
                            <img src={actor.src} alt={actor.name} className="img-fluid" />
                            <div className="actor-card-content">
                                <h3>{actor.name}</h3>
                                <p>{actor.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Actor;