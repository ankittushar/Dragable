import React from 'react';

function Alphabet(props) {
    return (
        <div>
            <div className='box' draggable={!props.remove} onDragStart={props.drag}  id={props.symbol}  >
                {props.remove &&  <span className='remove' onClick={props.removeIt} id={props.name}>x</span>}
                
                    {props.symbol}
            </div>
        </div>
    );
}

export default Alphabet;