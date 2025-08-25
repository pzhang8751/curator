
export async function submitPhoto(blob: Blob, caption: string) {

    const submitResponse = await fetch("/api/upload-photo", {}); 
    const result = await submitResponse.json(); 
    console.log(result); 
}