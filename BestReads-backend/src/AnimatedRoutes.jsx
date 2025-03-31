import React, { useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AnimatedRoutes = ({ children }) => {
  return (
    <TransitionGroup>
      {React.Children.map(children, (child) => {
        const nodeRef = useRef(null); // Create a unique ref for each child
        return (
          <CSSTransition
            key={child.key}
            timeout={300}
            classNames="fade"
            nodeRef={nodeRef} // Pass the unique ref here
          >
            <div ref={nodeRef}>{child}</div>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );
};

export default AnimatedRoutes;
