"use client"

import React, { Dispatch, SetStateAction, useState } from 'react'
import AddCard from './AddCard';
import DropIndicators from './DropIndicators';
import Card from './Card';
import ColumnHeader from './ColumnHeader';

type ColumnType = "backlog" | "todo" | "In progress" | "review" | "Done";

type CardType = {
title: string;
id: string;
column: ColumnType
}

type ColumnProps = {
    title: string;
    headingColor: string;
    cards: CardType[];
    column: ColumnType;
    setCards: Dispatch<SetStateAction<CardType[]>>;
};


const Column = ({
    title,
    headingColor,
    cards,
    column,
    setCards
}: ColumnProps) => {

  const [active, setActive] = useState(false)

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer?.setData("cardId", card.id)
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    )
  }

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0"
    });
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce((closest, child) => {
      const box = child.getBoundingClientRect();

      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child};
      } else {
        return closest
      }
    }, {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    });

    return el;
  }

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators)

    el.element.style.opacity = "1"
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer?.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = {...cardToTransfer, column};

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer)
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy)
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()

    highlightIndicator(e)

    setActive(true)
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false)
  };

    const filteredCards = cards.filter((card) => card.column === column);

  const updateFraction = () => {

    let currentCount = filteredCards.length
    // Calculate the new denominator based on the length of the filtercards
    let denominator = Math.ceil(currentCount / 5) * 5;

    // If the length of filtercards is less than 5, set denominator to 5
    denominator = denominator < 5 ? 5 : denominator;

    return `${currentCount} / ${denominator}`
  };


    return (
      <div className='relative w-80 shrink-0 border p-1 border-neutral-500 rounded-md'>
      <ColumnHeader updateFraction={updateFraction} title={title} headingColor={headingColor} />

        <div 
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${ active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>

        {
          filteredCards.map((card) => {
            return <Card key={card.id} {...card} handleDragStart={handleDragStart} />
          })
        }
        <DropIndicators beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards}/>
        </div>
      </div>
    )
}

export default Column

