import React from 'react';

function Operator(props) {
    return (
        <div>
            <div className='op' draggable={!props.remove} onDragStart={props.drag} id={props.symbol}>
                {props.remove &&  <span className='remove' onClick={props.removeIt} id={props.name}>x</span>}
              {props.symbol}
          </div>
        </div>
    );
}

export default Operator;