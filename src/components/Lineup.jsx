import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Progress,
  Row,
  Col,
} from 'reactstrap'

import '../styles/Lineup.css'

const getInts = (count, offset = 0) => Array.from({ length: count }, (v, k) => k).map(k => ({
  id: `item-${k + offset}`,
  content: `item ${k + offset}`,
}))

const getGoats = () => ([
  'lebron',
  'mj',
  'wilt',
  'kobe',
]).map(g => ({ id: g, content: g }))

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)
  destClone.splice(droppableDestination.index, 0, removed)
  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone
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
  const [items, setItems] = useState({
    sports: [],
    ints: getInts(4),
    goats: getGoats(),
  })

  const onDragEnd = (result) => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    const srcKey = source.droppableId
    const destKey = destination.droppableId

    if (srcKey === destKey) { // move items in same list
      const reOrdered = reorder(items[srcKey], source.index, destination.index)
      const i = {
        ...items,
        [srcKey]: reOrdered,
      }
      setItems(i)
    } else { // move from one list to another
      const srcArr = items[srcKey]
      const destArr = items[destKey]
      const res = move(
        srcArr,
        destArr,
        source,
        destination,
      )
      const i = {
        ...items,
        ...res,
      }
      setItems(i)
    }
  }

  useEffect(
    () => {
      if (items.sports.length === 0) {
        const uri = '/api'
        fetch(uri)
          .then(response => response.json())
          .then((payload) => {
            const arr = payload.sports.map(s => ({ id: s, content: s }))
            const sports = reorder(arr, 0, 0)
            const i = {
              ...items,
              sports,
            }
            setItems(i)
          })
      }
    },
    [items],
  )

  if (items.sports.length === 0) {
    return (
      <div id="lineup-loader">
        <Progress animated color="success" value="25" />
      </div>
    )
  }

  return (
    <Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Col sm={{ size: 4 }}>
          <Droppable droppableId="sports">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.sports.map((item, index) => (
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
        </Col>
        <Col sm={{ size: 4 }}>
          <Droppable droppableId="ints">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.ints.map((item, index) => (
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
        </Col>
        <Col sm={{ size: 4 }}>
          <Droppable droppableId="goats">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.goats.map((item, index) => (
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
        </Col>
      </DragDropContext>
    </Row>
  )
}

export default Lineup
