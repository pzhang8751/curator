
export async function submitPhoto(blob: Blob, caption: string) {

    // console.log(blob.type); 
    const photoRes = await fetch("/api/upload-photo", {
        method: "POST",
        headers: {
            "Content-Type": "image/png"
        },
        body: blob
    }); 

    if (photoRes) {
        const id = await photoRes.json().then((json) => {
            return json.id
        })

        const captionRes = await fetch("/api/upload-caption", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user: "Patrick",
                caption: caption,
                id: id
            })
        });

        if (!captionRes) {
            throw new Error("Could not upload post to server.")
        }
    } else {
        throw new Error("Could not upload photo to server.")
    }

    return "Successfully uploaded."
}