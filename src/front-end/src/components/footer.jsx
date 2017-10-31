import React, { Component } from 'react';
import { Alert, Modal, Glyphicon, Button } from 'react-bootstrap';

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <div>
        <Modal
          bsSize="large"
          aria-labelledby="about-modal"
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Header closeButton>
            <Modal.Title id="about-modal">
              About the Chiang Mai Movies Webapp
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Who Built It?</h4>
            <p>
              This web app was built towards the end of 2016 by {' '}
              <a href="http://www.andrewgolightly.com">Andrew Golightly</a>.
            </p>
            <h4>How It All Started</h4>
            <p>
              Trying to find showtimes for movies in Chiang Mai was a
              surprisingly difficult thing to do. So being a web developer, I
              decided to build an app that would provide everything I would
              normally look for when trying to decide what to watch.
            </p>
            <p>
              Thus the app needed to clearly show me the showtimes, as well as
              the metadata for each movie that I would normally look up
              afterwards. So it needed to include: the trailer, the Rotten
              Tomatoes score, reviews, a synopsis, who the actors are, and the
              runtime.
            </p>
            <h4>How Does It Work Exactly?</h4>
            <p>
              Showtime data is gathered from{' '}
              <a href="https://www.sfcinemacity.com/showtime/cinema/9936">
                the SF Cinema City website
              </a>. This data is then augmented with movie metadata from{' '}
              <a href="https://www.themoviedb.org/">The Movie DB</a> and{' '}
              <a href="http://www.rottentomatoes.com">Rotten Tomatoes</a>.
            </p>
            <p>
              The movie listings are sorted by their Rotten Tomoatoes score
              (highest to lowest/unknown).
            </p>
            <h4>Questions/Feedback/Contribute</h4>
            <p>
              I welcome all questions and feedback. The whole purpose of this
              app was to make it super easy for people to decide what to watch
              in Chiang Mai. So if you have any suggestions or feedback to
              support this mission, you can get in touch with me{' '}
              <a href="http://golightlyplus.com/contact/">here</a>.
            </p>
            <p>
              If you are a developer, you can{' '}
              <a href="https://github.com/magician11/chiangmai-movies">
                view the source code on GitHub
              </a>.
            </p>
            <br />
            <p>Thank you for using this web app!</p>
            <p>Andrew</p>
            <p>
              <Glyphicon glyph="heart" />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Alert bsStyle="info" className="author">
          <Button onClick={() => this.setState({ showModal: true })}>
            <Glyphicon glyph="info-sign" /> About CM Movies
          </Button>
          <p className="text-right">
            <Glyphicon glyph="copyright-mark" /> {new Date().getFullYear()}{' '}
            <a href="http://www.golightlyplus.com">Andrew Golightly</a>
          </p>
        </Alert>
      </div>
    );
  }
}

export default Footer;
