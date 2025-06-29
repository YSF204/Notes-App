let notes = [];

function saveNote(e) {
    e.preventDefault();
    const titleInput = document.querySelector('#noteTitle');
    const contentInput = document.querySelector('#noteContent');

    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    notes.unshift({
        id: generateId(),
        title: title,
        content: content,

    });

    saveNotes();
    renderNotes();

}
function generateId() {
    return Date.now().toString();

}

function renderNotes() {

    const notesContainer = document.querySelector('#notesContainer');
    if (notes.length === 0) {
        notesContainer.innerHTML = `
        <div class="empty-state">
            <h2>No Notes Here</h2>
            <p>Create your first note to get started!</p>
            <button class="add-note-btn" onclick="openNoteDialog()">Add Your First Note</button>
        </div>`

        return;
    }

    notesContainer.innerHTML = notes.map(note => `
        <div class=" note-card">
            <h3 class="note-title">${note.title}</h3>
            <p class="note-content">${note.content}</p>


        </div>
        `).join('');
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));

}

function openNoteDialog() {
    const dialog = document.querySelector('#noteDialog');
    const titleInput = document.querySelector('#noteTitle');
    const contentInput = document.querySelector('#noteContent');

    dialog.showModal();
    titleInput.focus();
}

function closeNoteDialog() {
    const dialog = document.querySelector('#noteDialog');
    dialog.close();
}

function loadNotes() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        return JSON.parse(savedNotes);
    } else {
        return [];
    }
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        updateThemeIcon('dark');
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcon('light');
    }
    localStorage.setItem('theme', theme);
}

function updateThemeIcon(theme) {
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (!themeToggleBtn) return;
    if (theme === 'dark') {
        themeToggleBtn.textContent = '☀️'; 
    } else {
        themeToggleBtn.textContent = '🌙'; 
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    setTheme(isDark ? 'light' : 'dark');
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    notes = loadNotes();
    renderNotes();
    loadTheme();

    document.querySelector('#noteForm').addEventListener('submit', saveNote);
    document.querySelector('#noteDialog').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            closeNoteDialog();
        }
    });

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
})

