import React, { useState } from "react";
import PicturePost from "../Post/picturepost";
import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
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
            }} className={"z-20 absolute p-3 rounded-4xl hover:cursor-pointer " + (mode === "edit" ? "bg-red-700" : "bg-green-200")}><FaPencil size={40} /></button>

            <div className="bg-orange-300 h-full w-full">
                {mode === "edit" ? <EditMode items={items} setItems={setItems}></EditMode> : <DisplayMode items={items}></DisplayMode>}
            </div>
        </>
    )
}

const DisplayMode = ({ items }: { items: Array<number> }) => {
    return (
        <>
        <div className="pt-16"></div>
        <div className="w-[640px] grid grid-cols-4 grid-flow-dense place-self-center">
            {
                items.map((id) =>
                    <PicturePost key={id} ID={id} size={id} edit={false}></PicturePost>)
            }
        </div>
        </>
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
        <>
            <div className={"w-full h-full absolute bg-black opacity-60 z-10"}></div>
            <div className="pt-16"></div>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div className="w-[640px] grid grid-cols-4 grid-flow-dense relative place-self-center z-20">
                        {
                            items.map((id) =>
                                <PicturePost key={id} ID={id} size={id} edit={true}></PicturePost>)
                        }
                    </div>

                </SortableContext>
            </DndContext>
        </>
    )
}

export default Grid; 