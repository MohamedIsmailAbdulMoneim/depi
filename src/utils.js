import { deleteNote, getNotes } from "./apis"
import { getCloseBtn, mainDiv } from "./constants"

export const renderNotes = () => {
    mainDiv.innerHTML = `<span class="loader"></span>`
    getNotes().then(data => {
        let tasks = ""

        data.forEach((note, index) => {
            tasks += `
            <div class="note-container">
                <div class="close" name='${note.id}'>
                    <svg fill="#000000" height="20px" width="20px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1792 1792" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1082.2,896.6l410.2-410c51.5-51.5,51.5-134.6,0-186.1s-134.6-51.5-186.1,0l-410.2,410L486,300.4 c-51.5-51.5-134.6-51.5-186.1,0s-51.5,134.6,0,186.1l410.2,410l-410.2,410c-51.5,51.5-51.5,134.6,0,186.1 c51.6,51.5,135,51.5,186.1,0l410.2-410l410.2,410c51.5,51.5,134.6,51.5,186.1,0c51.1-51.5,51.1-134.6-0.5-186.2L1082.2,896.6z"></path> 
                    </g></svg>
                </div>    
                <span class="note" name='${note.note_name}_${index}'>${note.note_name}</span>
            </div>
            `
        })

        mainDiv.innerHTML = tasks




        getCloseBtn().forEach(btn => {
            console.log(btn);

            btn.addEventListener('click', (e) => deleteNote(e.currentTarget.getAttribute('name')))
        })



    }).catch(err => {
        console.log(err);

        mainDiv.innerHTML = "An error happened"
    })
}