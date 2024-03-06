"use client"

import { useState } from "react"
import Column from "./Column"

type ColumnType = "backlog" | "todo" | "In progress" | "review" | "Done";

type CardType = {
title: string;
id: string;
column: ColumnType
}
const Board = () => {


    const [cards, setCards] = useState<CardType[]>([])
    return (
        <div className="flex h-full w-full gap-3 overflow-scroll p-12 justify-center">
            <Column 
            title="Backlog"
            column="backlog"
            headingColor="border-green-500"
            cards={cards}
            setCards={setCards}
            />
            <Column 
            title="Todo"
            column="todo"
            headingColor="border-blue-500"
            cards={cards}
            setCards={setCards}
            />
            <Column 
            title="In Progress"
            column="In progress"
            headingColor="border-yellow-300"
            cards={cards}
            setCards={setCards}
            />
            <Column 
            title="Review"
            column="review"
            headingColor="border-purple-500"
            cards={cards}
            setCards={setCards}
            />
            <Column 
            title="Complete"
            column="Done"
            headingColor="border-yellow-800"
            cards={cards}
            setCards={setCards}
            />
        </div>
    )
}

export default Board