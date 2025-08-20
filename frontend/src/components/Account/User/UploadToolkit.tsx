import { useState, useRef } from "react"

const UploadToolkit = () => {
    return (
        <div className="absolute bottom-10 right-10">
            <button type="button" className="p-7 rounded-4xl bg-blue-950 hover:cursor-pointer">
            </button>
            <UploadPhoto></UploadPhoto>
        </div>
    )
}

const UploadPhoto = () => {
    const [open, setOpen] = useState(false); 
    
    const fileSelector = useRef<HTMLInputElement | null>(null); 

    const handleUpload = () => {
        if (fileSelector.current) {
            fileSelector.current.click(); 
        }
    }

    const handlePost = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; 
        console.log(file); 

        if (file) {
            const reader = new FileReader(); 
            reader.readAsDataURL(file); 
        }
        setOpen(true); 
    }
    
    return (
        <>
            <button type="button" onClick={handleUpload} className="p-4 rounded-3xl bg-amber-600">

            </button>
            <input type="file" className="hidden" ref={fileSelector} onChange={handlePost} accept=".jpg,.png,.mp4"></input>
            <div className={"absolute top-1 left-1 h-10 w-10 bg-green-300" + (open? "": " hidden")}>

            </div>
        </>
    )
}

export default UploadToolkit