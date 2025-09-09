import { useDraggable, type UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';

const PicturePost = ({ID, size} : {ID: UniqueIdentifier, size:number}) => {
    //post will have a cover which can be image, or the document title - a few words? - control size option 

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id: ID});

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
    
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={"hover:cursor-grab " + cssSize}>
            {ID}
        </div>
    )
}

export default PicturePost; 