import { useState, useRef, useEffect } from "react"
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaRegImage } from "react-icons/fa6";


const UploadToolkit = () => {
    const [open, setOpen] = useState(false);
    const [animate, setAnimate] = useState(false); 
    const [animateBackwards, setAnimateBackwards] = useState(false); 

    return (
        <>
            <button
                type="button"
                className={"absolute bottom-10 p-6 rounded-4xl bg-blue-950 text-white hover:cursor-pointer border-2 border-blue-950"
                    + (animate ? " animate-rotate": "") + (animateBackwards ? " animate-rotate-backwards": "")}
                onMouseEnter={() => {setAnimate(true); setAnimateBackwards(false)}}
                onMouseLeave={() => {setAnimateBackwards(true); setAnimate(false)}}
            >
                <FaPlus />
            </button>
            <UploadPhotoButton></UploadPhotoButton>
        </>
    )
}

const UploadPhotoButton = () => {
    const [open, setOpen] = useState(false);

    const fileSelector = useRef<HTMLInputElement | null>(null);
    const [uploadSrc, setUploadSrc] = useState<string | null>(null)

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

            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setUploadSrc(reader.result)
                }
            }

            setOpen(true);
        }
    }

    useEffect(() => {
        if (!open) {
            setUploadSrc(null);
        }
    }, [open])

    return (
        <>
            <button type="button" onClick={handleUpload} className="absolute bottom-30 p-4 rounded-3xl bg-amber-500 hover:cursor-pointer"><FaRegImage /></button>
            <input type="file" className="hidden" ref={fileSelector} onChange={handlePost} accept=".jpg,.png,.mp4"></input>
            <UploadPhotoScreen open={open} close={() => setOpen(false)} imagePreview={uploadSrc}></UploadPhotoScreen>
        </>
    )
}

const UploadPhotoScreen = ({ open, close, imagePreview }: { open: boolean, close: () => void, imagePreview: string | null }) => {
    return (
        <div className={(open ? "" : "hidden")}>
            <div className="fixed w-screen h-screen bg-black opacity-65"></div>
            <div className="absolute top-20 left-20 h-[50%] w-[50%] bg-lime-200">
                <button type="button" onClick={close} className="hover:cursor-pointer"><IoMdClose /></button>
                {typeof imagePreview === "string" && <img src={imagePreview} className="w-[50%]"></img>}
            </div>
        </div>
    )
}

export default UploadToolkit