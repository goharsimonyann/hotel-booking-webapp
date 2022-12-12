import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const HomeBanner = () => {
  return (
    <div className="home-banner mb-5">
      <div className="text-center home-banner__heading">
        <div className="home-banner__heading--background">
        <h1 className="home-banner__heading--primary">
          The joy of home anywhere in the world
        </h1>
        <p className="home-banner__heading--secondary">
          Easy booking, easy living
        </p>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
