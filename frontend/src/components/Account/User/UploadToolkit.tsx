import { useState, useRef, useEffect } from "react"
import { IoMdClose } from "react-icons/io";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { LuRectangleVertical, LuSquare } from "react-icons/lu";
import { TbRectangleVertical } from "react-icons/tb";

const UploadToolkit = () => {
    const [open, setOpen] = useState("idle");
    const [animate, setAnimate] = useState("idle");

    return (
        <>
            <button
                type="button"
                className={"absolute bottom-10 p-6 rounded-4xl bg-blue-950 text-white hover:cursor-pointer border-2 border-blue-950"
                    + (animate === "forward" ? " animate-rotate" : animate === "backward" ? " animate-rotate-backwards" : "")}
                onMouseEnter={() => { setAnimate("forward") }}
                onMouseLeave={() => {
                    setAnimate(
                        open === "close" ? "backward" : "forward"
                    )
                }}
                onClick={() => {
                    setOpen(
                        open === "idle" ? "open" : open === "open" ? "close" : "open"
                    )
                }}
            >
                <FaPlus />
            </button>
            <UploadPhotoButton isOpen={open}></UploadPhotoButton>
            {/* {open && (
                <>
                    <UploadPhotoButton isOpen={open}></UploadPhotoButton>
                </>
            )} */}

        </>
    )
}

const UploadPhotoButton = ({ isOpen }: { isOpen: string }) => {
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
            <button type="button"
                onClick={handleUpload}
                className={"absolute bottom-30 p-4 rounded-3xl bg-amber-500 hover:cursor-pointer "
                    + (isOpen === "open" ? " animate-popout" : isOpen === "close" ? " animate-popout-backwards" : "")
                }
            >
                <FaRegImage />
            </button>
            <input type="file" className="hidden" ref={fileSelector} onChange={handlePost} accept=".jpg,.png,.mp4"></input>
            <UploadPhotoScreen open={open} close={() => setOpen(false)} imagePreview={uploadSrc}></UploadPhotoScreen>
        </>
    )
}

const UploadPhotoScreen = ({ open, close, imagePreview }: { open: boolean, close: () => void, imagePreview: string | null }) => {
    const [aspectRatio, setAspectRatio] = useState("3x4")

    const captionRef = useRef<HTMLTextAreaElement | null>(null);
    const [characters, setCharacters] = useState(0)

    const [longSize, setLongSize] = useState("9:16");
    //const [shortSize, setShortSize] = useState("3:4");

    useEffect(() => {
        if (aspectRatio === "9x16") {
            setLongSize("16:9")
        } else if (aspectRatio === "16x9") {
            setLongSize("9:16")
        }


    }, [aspectRatio])

    return (
        <div className={(open ? "" : "hidden")}>
            <div className="fixed w-screen h-screen bg-black opacity-65"></div>
            <div className="absolute top-20 left-20 max-w-[70%] p-4 bg-lime-200">
                <button type="button" onClick={close} className="hover:cursor-pointer"><IoMdClose size={25} /></button>
                {typeof imagePreview === "string" &&
                    (
                        <div className="flex flex-row">
                            <div className="mr-5 flex flex-col text-blue-950">
                                <button className="hover:cursor-pointer"
                                    onClick={() => {
                                        setAspectRatio(
                                            aspectRatio === "9x16" ? "16x9" : "9x16"
                                        )
                                    }}
                                >
                                    {longSize}<LuRectangleVertical className={"inline " + (aspectRatio === "9x16" ? "rotate-90": "")} size={40} />
                                </button>
                                <button className="hover:cursor-pointer"
                                    onClick={() => {
                                        setAspectRatio(
                                            aspectRatio === "3x4" ? "4x3" : "3x4"
                                        )
                                    }}
                                >
                                    3:4<TbRectangleVertical className="inline" size={40} />
                                </button>
                                <button className="hover:cursor-pointer"
                                    onClick={() => setAspectRatio("1x1")}
                                >1:1<LuSquare className="inline" size={40} /></button>
                            </div>
                            <div className="w-96 h-96 bg-pink-200 flex justify-center items-center">
                                <img
                                    src={imagePreview}
                                    // object-cover : crops image to fit aspect ratio 
                                    // need to recalculate, the height and width should stay at the boundary not the same 
                                    className={"object-cover"
                                        + (aspectRatio === "9x16" ? " w-54 h-96" :
                                            aspectRatio === "16x9" ? " w-96 h-54" :
                                                aspectRatio === "4x3" ? " w-96 h-72" :
                                                    aspectRatio === "3x4" ? " w-72 h-96" :
                                                        " w-96 h-96"
                                        )
                                    }
                                >
                                </img>
                            </div>

                        </div>
                    )

                }
                {/** caption, time / date */}
                <form className="">
                    <textarea ref={captionRef} className="w-full bg-white outline-0 resize-none" rows={5} maxLength={250} onChange={() => setCharacters(captionRef.current?.value.length ?? 0)}></textarea>
                    <p>{characters}/250</p>
                    <button type="submit" className="px-3 py-1 rounded-2xl bg-blue-950 text-white hover:cursor-pointer">Post</button>
                </form>
            </div>
        </div>
    )
}

export default UploadToolkit