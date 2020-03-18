import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import './index.css';
import { columnsFromBackend, onDragEnd } from './mockedData';
import Column from './Column';


const App = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  
  return (
    <div className="content">
      <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <div className="column" key={id}>
              <h2>{column.name}</h2>
              <Column id={id} column={column}/>
            </div>
          )
        })}
      </DragDropContext>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));