import React, { useState } from "react";
import PicturePost from "../Post/picturePost";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import GridBox from "./gridbox";
import { arrayMove, arraySwap, SortableContext, rectSortingStrategy, rectSwappingStrategy } from "@dnd-kit/sortable";
import { FaPencil } from "react-icons/fa6";

const Grid = () => {
    // need to add a list of all the components inside
    const [mode, setMode] = useState<"display" | "edit">("edit")


    const [items, setItems] = useState([1, 2, 3, 4]);




    return (
        <>
            <button onClick={() => {
                if (mode === "display") {
                    setMode("edit")
                } else {
                    setMode("display")
                }
            }}className={"absolute p-3 rounded-4xl hover:cursor-pointer " + (mode==="edit"?"bg-red-700" : "bg-green-200")}><FaPencil size={40}/></button>
            <div className="pt-16 bg-orange-300 h-full place-self-center">
                {mode === "edit" ? <EditMode items={items} setItems={setItems}></EditMode> : <DisplayMode items={items}></DisplayMode>}
            </div>
        </>
    )
}

const DisplayMode = ({ items }: { items: Array<number> }) => {
    return (
        <div className="grid grid-cols-2 grid-flow-dense">
            {
                items.map((id) =>
                    <PicturePost key={id} ID={id} size={id}></PicturePost>)
            }
        </div>
    )
}

const EditMode = ({ items, setItems }: { items: Array<number>, setItems: React.Dispatch<React.SetStateAction<number[]>> }) => {
    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as number);
                const newIndex = items.indexOf(over.id as number);

                return arrayMove(items, oldIndex, newIndex);
            })
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-2 grid-flow-dense">
                    {
                        items.map((id) =>
                            <PicturePost key={id} ID={id} size={id}></PicturePost>)
                    }
                </div>

            </SortableContext>
        </DndContext>
    )
}

export default Grid; 