"use client"

import { FiMoreHorizontal } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { useState } from 'react'


type ColumnHeaderProps = {
    title: string;
    headingColor: string;
    updateFraction: Function;
}

const ColumnHeader = ({headingColor, title, updateFraction} : ColumnHeaderProps) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleDropDown = () => {
        setIsOpen(prev => !prev)
    }
    return (
        <div className="mb-3 flex items-center justify-between p-2">
          <div className='flex items-center gap-3 '>
            <span className={`w-6 h-6 border-2 rounded-full ${headingColor}`}/>
            <h3 className='font-medium text-neutral-100'>{title}</h3>
            <span className="rounded-full text-xs text-neutral-50 h-6 flex items-center justify-center bg-neutral-700 p-1.5">
              {updateFraction()}
            </span>
          </div>
          <div>
            <button 
            onClick={handleDropDown}
            className='relative'>
                <FiMoreHorizontal />
            </button>
            {
                isOpen ? ( 
                    <div className="absolute right-3 mt-2">
                        <HeaderDropDown />
                    </div>
                         ): 
                         ( <></>)
            }
          </div>
        </div>
    )
}

export default ColumnHeader

type HeaderDropDownProps = {

}



const HeaderDropDown = () => {
    const deleteAllCardInColumn = () => {
        
    }
    return (
        <div className="p-2 pt-4 w-56 border border-neutral-600 rounded bg-neutral-900">
            <h4 className="text-sm">Items</h4>
            <div className="flex items-center p-1 hover:border hover:border-red-400/30 rounded hover:bg-red-400/10 gap-2 mt-2 text-red-400">
                <span><GoTrash /></span>
                <button>
                    Delete all
                </button>
            </div>

            <hr className="border-b-0.5 my-2 border-neutral-500" />

            <h4 className="text-sm">Column</h4>
            <div className="flex items-center p-1 hover:border hover:border-red-400/30 rounded hover:bg-red-400/10 gap-2 mt-2 text-red-400">
                <span><GoTrash /></span>
                <button>
                    Delete
                </button>
            </div>
        </div>
    )
}