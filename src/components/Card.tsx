import React from 'react'
import { motion } from 'framer-motion'
import DropIndicators from './DropIndicators';

type ColumnType = "backlog" | "todo" | "In progress" | "review" | "Done";

type CardType = {
title: string;
id: string;
column: ColumnType
}

type CardProps = CardType & {
    handleDragStart: Function;
}

const Card = ({title, id, column, handleDragStart}: CardProps) => {
  return (
    <>
      <DropIndicators  beforeId={id} column={column}/>
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, {title, id, column})}
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
        >
          <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  )
}

export default Card
