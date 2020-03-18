import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './index.css';
import { columnsFromBackend, onDragEnd } from './mockedData';
import Item from './Item';

const App = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  
  return (
    <div className="content">
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="column" key={id}>
              <h2>{column.name}</h2>
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
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));