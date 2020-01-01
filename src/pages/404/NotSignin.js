import React, { useEffect, useContext } from 'react';
import { UIContext } from '../../contexts/UIContext';

const NotSignin = () => {
  const { toggleDimmer } = useContext(UIContext);

  useEffect(() => {
    toggleDimmer(false);
  }, [toggleDimmer]);

  return (
    <div className="not-signin">
      <h1>访问受限</h1>
      <h3>请登录账号以访问相关内容，并且使用上海大学校园网访问本网站</h3>
    </div>
  );
}

export default NotSignin;
