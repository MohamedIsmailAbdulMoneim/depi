document.getElementById('noteForm').addEventListener('submit', handleFormSubmit);

let isUpdating = false; // To check if we are in update mode
let currentNoteId = null; // Store the ID of the note being updated
const apiUrl = 'http://localhost:5000/notes'; // JSON Server URL

// Fetch and display notes from the server on load
window.onload = fetchNotes;

function handleFormSubmit(event) {
    event.preventDefault();

    const noteTitle = document.getElementById('noteTitle').value;
    const noteDescription = document.getElementById('noteDescription').value;

    if (isUpdating) {
        // Update the note on the server
        updateNote(currentNoteId, noteTitle, noteDescription);
    } else {
        // Add a new note
        addNote(noteTitle, noteDescription);
    }

    // Clear the form after submit
    document.getElementById('noteForm').reset();
    isUpdating = false; // Reset update mode
    currentNoteId = null;
    document.getElementById('submitBtn').innerText = 'Add Note';
}

async function addNote(title, description) {
    const newNote = {
        title: title,
        description: description
    };

    // Send POST request to add the note to the JSON server
    await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
    });

    fetchNotes(); // Refresh the notes list
}

async function fetchNotes() {
    // Fetch the notes from the JSON server
    const response = await fetch(apiUrl);
    const notes = await response.json();

    displayNotes(notes);
}

function displayNotes(notes) {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';

    notes.forEach(note => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${note.id}</td>
            <td>${note.title}</td>
            <td>${note.description}</td>
            <td>
                <button class="btn btn-secondary" onclick="editNote('${note.id}')">Update</button>
                <button class="btn btn-danger" onclick="deleteNote('${note.id}')">Delete</button>
            </td>
        `;
        notesList.appendChild(row);
    });
}

async function deleteNote(id) {
    // Send DELETE request to remove the note from the JSON server
    await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    fetchNotes(); // Refresh the notes list
}

async function editNote(id) {
    // Fetch the note to be updated
    const response = await fetch(`${apiUrl}/${id}`);
    const noteToEdit = await response.json();

    // Populate the form with the note's details
    document.getElementById('noteTitle').value = noteToEdit.title;
    document.getElementById('noteDescription').value = noteToEdit.description;

    // Set current note ID for update
    currentNoteId = id;

    // Change the button to 'Update Note'
    document.getElementById('submitBtn').innerText = 'Update Note';
    isUpdating = true;
}

async function updateNote(id, newTitle, newDescription) {
    const updatedNote = {
        title: newTitle,
        description: newDescription
    };

    // Send PUT request to update the note on the JSON server
    await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedNote)
    });

    fetchNotes(); // Refresh the notes list
}
