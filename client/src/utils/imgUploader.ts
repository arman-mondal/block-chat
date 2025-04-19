const apiKey="76793eb619d7fd026458cacc860b3bcb"
export const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    return data.data.url;
};
