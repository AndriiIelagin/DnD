import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

const Item = (props) => {
  const { item, index } = props;
  // Using onClick as it will be correctly
  // preventing if there was a drag
  const onClick = (event) => {
    if (event.defaultPrevented) {
      return;
    }

    if (event.button !== 0) {
      return;
    }

    // marking the event as used
    event.preventDefault();
    console.log('Clicked')
    // performAction(event);
  };

  // Determines if the platform specific toggle selection in group key was used
  const wasToggleInSelectionGroupKeyUsed = (event) => {
    const isUsingWindows = navigator.platform.indexOf('Win') >= 0;
    return isUsingWindows ? event.ctrlKey : event.metaKey;
  };

  // Determines if the multiSelect key was used
  const wasMultiSelectKeyUsed = (event) => event.shiftKey;

  const performAction = (event) => {
    const {
      task,
      toggleSelection,
      toggleSelectionInGroup,
      multiSelectTo,
    } = props;

    if (wasToggleInSelectionGroupKeyUsed(event)) {
      toggleSelectionInGroup(task.id);
      return;
    }

    if (wasMultiSelectKeyUsed(event)) {
      multiSelectTo(task.id);
      return;
    }

    toggleSelection(task.id);
  };

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
              ...provided.draggableProps.style,
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
            onClick={onClick}
          >
            {item.content}
          </div>
        )
      }}
    </Draggable>
  )
}

export default Item
