import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Item from './Item';

const Column = (props) => {
  const { id, column } = props;
  return (
    <Droppable key={id} droppableId={id}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: snapshot.isDraggingOver ? 'lightblue' : 'lightgray',
              padding: '4px',
              width: 250,
              minHeight: 500
            }}
          >
            {column.items.map((item, index) => {
              return (
                <Item item={item} index={index}/>
              )
            })}
            {provided.placeholder}
          </div>
        )
      }}
    </Droppable>
  )
}

export default Column
