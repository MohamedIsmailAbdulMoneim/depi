import { renderNotes } from "./utils";

export const getNotes = async () => {
    const res = await fetch('http://localhost:3004/Notes')
    const notes = await res.json();
    return notes
}



export const addNote = async (e, value) => {
    if (!value) return

    await fetch('http://localhost:3004/Notes', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ index: 2, note_name: value })

    })
    renderNotes()
}


export const deleteNote = async (id) => {
    console.log(id);
    try {
        await fetch(`http://localhost:3004/Notes/${id}`, {
            method: "DELETE"
        })
        renderNotes()

    } catch (err) {
        console.log(err);

    }


}
