import { type UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { useState } from "react";
import { createPortal } from "react-dom";
import { FiPlus } from "react-icons/fi";

const PicturePost = ({ ID, size, edit }: { ID: UniqueIdentifier, size: number, edit: boolean }) => {
    //post will have a cover which can be image, or the document title - a few words? - control size option 

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: ID });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    // can try implementing size but its gonna have to be based on fetching the data more than anything else 

    // try to get just regular size working 
    let cssSize = "w-40 h-40 col-span-1 bg-red-100";
    // if (size%3 == 0) {
    //     cssSize="w-80 h-40 col-span-2 bg-purple-300"
    // }

    const [open, setOpen] = useState(false)

    return (
        <>
            {!edit && open ? <Post close={() => setOpen(false)}></Post> : null}
            <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={"w-40 h-40 col-span-1 bg-red-100 " + (edit ? " hover:cursor-grab" : " hover:cursor-pointer")} onClick={!edit ? () => setOpen(true) : undefined}>
                {ID}
            </div>
        </>
    )
}


const Post = ({close} : {close:() => void}) => {
    return createPortal(
        <>
            <div className="fixed inset-0 w-full h-full bg-black opacity-60 z-30"></div>
            <div className="top-[5%] left-[20%] absolute bg-cyan-200 h-[90%] w-[60%] z-30">
                <button onClick={close}><FiPlus className="rotate-45 hover:cursor-pointer hover:text-red-500" size={30}/></button>
            </div>
        </>, document.body
    )



}

export default PicturePost; 