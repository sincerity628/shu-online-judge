import React, { useState, useEffect } from 'react';
import api from '../../tools/api';
import './annonucement-detail.css';

const AnnouncementDetail = (props) => {
  const [announcement, setAnnouncement] = useState({});
  const getOnce = 0;

  useEffect(() => {
    let unmounted = false;
    const id = props.match.params.id;
    api
      .getAnnouncement(id)
      .then(res => {
        if(!unmounted && res.status === 200) {
          setAnnouncement(res.data);
        }
      })

    return () => { unmounted = true; };
  }, [getOnce]);

  return (
    <div className="announcement-detail">
      <div className="announce-title">
        <h2>{ announcement.title }</h2>
        <span className="announce-author">作者：{ announcement.authorName }</span>
        <span>创建时间：{ announcement.modifiedDate }</span>
      </div>
      <div className="announce-content"
        dangerouslySetInnerHTML={{ __html: announcement.content }}>
      </div>
    </div>
  );
}

export default AnnouncementDetail;
