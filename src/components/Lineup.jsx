import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Progress,
} from 'reactstrap'

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const grid = 8

const getBase = index => (
  (index < 2) ? 'white' : 'grey'
)

const getItemStyle = (isDragging, draggableStyle, idx) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : getBase(idx),

  // styles we need to apply on draggables
  ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
})

const Lineup = () => {
  const [items, setItems] = useState([])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const i = reorder(
      items,
      result.source.index,
      result.destination.index,
    )

    setItems(i)
  }

  useEffect(
    () => {
      if (items.length === 0) {
        const uri = '/api'
        fetch(uri)
          .then(response => response.json())
          .then((payload) => {
            const { sports } = payload
            const arr = sports.map(s => ({ id: s, content: s }))
            const i = reorder(arr, 0, 0)
            setItems(i)
          })
      }
    },
    [items],
  )

  if (items.length === 0) {
    return (
      <Progress animated color="success" value="25" />
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {items.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provide, snap) => (
                  <div
                    ref={provide.innerRef}
                    {...provide.draggableProps}
                    {...provide.dragHandleProps}
                    style={getItemStyle(
                      snap.isDragging,
                      provide.draggableProps.style,
                      index,
                    )}
                  >
                    {item.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Lineup
