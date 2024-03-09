import React from 'react'
import { motion } from 'framer-motion'
import DropIndicators from './DropIndicators';
import { FiMoreHorizontal } from 'react-icons/fi';
import Image from 'next/image';

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

  const deleteCard = () => {
    
  }
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
          <div className='flex items-center justify-between mb-2'>
            <div className='relative h-6 w-6 rounded-full border border-neutral-500'>
              <Image src={'/assets/profile-1.jpg'} className='object-cover object-center rounded-full' 
              alt='assignee image' 
              layout='fill'
              objectFit='cover'
              />
            </div>
                <FiMoreHorizontal />
          </div>
          <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  )
}

export default Card
