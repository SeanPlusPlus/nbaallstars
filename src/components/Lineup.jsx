import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import {
  Progress,
  Row,
  Col,
} from 'reactstrap'

import playerUtil from '../utils/playerUtil'
import '../styles/Lineup.css'
import Player from './Player'


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
  (index < 5) ? 'white' : 'grey'
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
  minHeight: 300,
})

const Lineup = () => {
  const [items, setItems] = useState({
    west: [],
    pending: [],
    east: [],
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
      if (items !== null && items.pending.length === 0 && items.east.length === 0 && items.west.length === 0) { // eslint-disable-line max-len
        const uri = '/api/players'
        fetch(uri)
          .then(response => response.json())
          .then((payload) => {
            if (payload.players) {
              const pending = payload.players
                .map(s => (playerUtil.getSanitizedPlayer(s)))
              const i = {
                ...items,
                pending,
              }
              setItems(i)
            } else {
              setItems(null)
            }
          })
      }
    },
    [items],
  )

  if (items === null) {
    return (
      <div id="lineup-loader">
        <legend>
          <i className="fa fa-warning" />
          {' '}
          Login Required
        </legend>
      </div>
    )
  }

  if (items.pending.length === 0 && items.east.length === 0 && items.west.length === 0) {
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
          <legend>LeBron James</legend>
          <Droppable droppableId="west">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.west.map((item, index) => (
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
                        <Player player={item} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Col>

        {items.pending.length > 0 && (
          <Col sm={{ size: 4 }}>
            <legend>Pending</legend>
            <Droppable droppableId="pending">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {items.pending.map((item, index) => (
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
                            null,
                          )}
                        >
                          <Player player={item} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Col>
        )}

        <Col sm={{ size: 4 }}>
          <legend>Kyrie Irving</legend>
          <Droppable droppableId="east">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.east.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={index === 0}
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
                        <Player player={item} />
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
