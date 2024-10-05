
import { mainDiv, addBtn, input } from "./src/constants";
import { addNote } from "./src/apis"
import { renderNotes } from "./src/utils";





addBtn.addEventListener('click', (e) => addNote(e, input.value))



renderNotes()