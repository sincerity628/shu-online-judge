import React from 'react';

const ContestDetail = (props) => {
  console.log(props.match.params.id);
  
  return (
    <div className="contest-detail">
      <h1>Contest Detail</h1>
    </div>
  );
}

export default ContestDetail;
