import React, { useEffect, useContext } from 'react';
import { UIContext } from '../../contexts/UIContext';

const InternetError = () => {
  const { toggleDimmer } = useContext(UIContext);

  useEffect(() => {
    toggleDimmer(false);
  }, [toggleDimmer]);


  return (
    <div className="internet-error">
      <h1>Internet Error</h1>
      <h3>请检查网络连接，并使用上海大学校园网访问本网站</h3>
    </div>
  );
}

export default InternetError;
