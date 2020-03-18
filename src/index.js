import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './index.css';
import { columnsFromBackend } from './mockedData';

const onDragEnd = (result, columns, setColumns) => {
  if(!result.destination) return;
  const { source, destination } = result;
  const column = columns[source.droppableId];

  const copiedItems = [...column.items];
  const [removed] = copiedItems.splice(source.index, 1);
  copiedItems.splice(destination.index, 0, removed);

  setColumns({
    ...columns,
    [source.droppableId]: {
      ...column,
      items: copiedItems
    }
  })
}

const App = () => {

  const [columns, setColumns] = useState(columnsFromBackend)
  return (
    <div className="content">
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
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
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => {
                            return (
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                style={{
                                  userSelect: 'none',
                                  padding: 16,
                                  margin: '0 0 8px 0',
                                  minHeight: 50,
                                  backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                  color: 'white',
                                  ...provided.draggableProps.style
                                }}
                              >
                                {item.content}
                              </div>
                            )
                          }}
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )
              }}
            </Droppable>
          )
        })}
      </DragDropContext>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));