import React from 'react';
import { Segment, Label } from 'semantic-ui-react';
import "../components.css";

const TagGroup = ({ tags, chooseTag }) => {
  return (
    <div className="tag-group">
    { tags.length? (
      <div>
        <Segment attached="top">
          <h5>标签</h5>
        </Segment>
        <Segment attached="bottom">
          <Label className="tag-label" onClick={() => chooseTag('')}>
            全部题目
          </Label>
          { tags.map(tag => (
            <Label onClick={() => chooseTag(tag.id)}
              key={tag.id} className="tag-label">
              { tag.name }
              <Label.Detail>{ tag.problemCount }</Label.Detail>
            </Label>
          )) }
        </Segment>
      </div>
      ) : null }
    </div>
  );
}

export default TagGroup;
