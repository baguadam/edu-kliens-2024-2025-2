import BonJovi from "../assets/bonjovi.jpg";
import TrackDetailsButton from "./TrackDetailsButton";

const TrackDetails = () => {
  return (
    <div className="ui segment">
      <div className="ui items">
        <div className="item">
          <div className="image">
            <img src={BonJovi} />
          </div>
          <div className="content">
            <a className="header">It&apos;s my life</a>
            <div className="meta">
              <span>Bon Jovi</span>
              <span>4:35</span>
            </div>
            <div className="extra">
              <TrackDetailsButton
                url="https://open.spotify.com/track/0v1XpBHnsbkCn7iJ9Ucr1l"
                bgColor="green"
                icon="spotify"
                label="SPOTIFY"
              />
              <TrackDetailsButton
                url="https://open.spotify.com/track/0v1XpBHnsbkCn7iJ9Ucr1l"
                bgColor="blue"
                icon="spotify"
                label="SPOTIFY"
              />
              <TrackDetailsButton
                url="https://open.spotify.com/track/0v1XpBHnsbkCn7iJ9Ucr1l"
                bgColor="orange"
                icon="spotify"
                label="SPOTIFY"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackDetails;
