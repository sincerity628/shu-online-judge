import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, List } from 'semantic-ui-react';
import '../components.css';

const Announcement = ({ announcements }) => {
  console.log(announcements);
  return (
    <div className="announcement">
      { announcements.length? (
        <div className="announce-card">
          <Segment attached="top">
            <h5>公告栏</h5>
          </Segment>
          <Segment attached="bottom">
            <List ordered>
              { announcements.map(announcement => {
                return (
                  <List.Item key={announcement.id}>
                    <Link to={`/announcement/${announcement.id}`}>
                      { announcement.title }
                    </Link>
                  </List.Item>
                );
              }) }
            </List>
          </Segment>
        </div>
      ) : (null) }
    </div>
  );

}

export default Announcement;
