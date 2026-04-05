// ── Date Display ──
const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

(function setDate() {
  const d = new Date();
  document.getElementById('date-label').textContent =
    `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
})();

// ── State ──
let tasks  = loadTasks();
let filter = 'all';

// ── Storage ──
function loadTasks() {
  try { return JSON.parse(localStorage.getItem('todo-tasks') || '[]'); }
  catch { return []; }
}

function saveTasks() {
  try { localStorage.setItem('todo-tasks', JSON.stringify(tasks)); }
  catch (e) { console.warn('Storage unavailable', e); }
}

// ── Render ──
function render() {
  const list = document.getElementById('task-list');
  const visible = tasks.filter(t =>
    filter === 'all'    ? true  :
    filter === 'done'   ? t.done :
    /* active */          !t.done
  );

  // Footer count
  const activeCount = tasks.filter(t => !t.done).length;
  document.getElementById('count-label').textContent =
    `${activeCount} task${activeCount !== 1 ? 's' : ''} remaining`;

  // Empty state
  if (visible.length === 0) {
    list.innerHTML = `<li class="empty">${
      filter === 'done'   ? 'No completed tasks yet.' :
      filter === 'active' ? 'All done! Great work.' :
      'No tasks yet. Add one above.'
    }</li>`;
    return;
  }

  list.innerHTML = '';

  visible.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    // Priority dot
    const dot = document.createElement('span');
    dot.className = `p-dot ${task.priority}`;

    // Checkbox
    const check = document.createElement('button');
    check.className  = 'check-btn' + (task.done ? ' checked' : '');
    check.title      = task.done ? 'Mark as active' : 'Mark as done';
    check.setAttribute('aria-label', check.title);
    check.addEventListener('click', () => toggleDone(task.id));

    // Text (double-click to edit)
    const textEl = document.createElement('div');
    textEl.className       = 'task-text';
    textEl.textContent     = task.text;
    textEl.setAttribute('contenteditable', 'false');
    textEl.setAttribute('role', 'textbox');
    textEl.setAttribute('aria-label', 'Task: ' + task.text);

    textEl.addEventListener('dblclick', () => startEdit(textEl, task));
    textEl.addEventListener('blur',     () => finishEdit(textEl, task));
    textEl.addEventListener('keydown',  (e) => {
      if (e.key === 'Enter') { e.preventDefault(); textEl.blur(); }
      if (e.key === 'Escape') {
        textEl.textContent = task.text;
        textEl.setAttribute('contenteditable', 'false');
      }
    });

    // Delete button
    const del = document.createElement('button');
    del.className = 'del-btn';
    del.innerHTML = '&times;';
    del.title     = 'Delete task';
    del.setAttribute('aria-label', 'Delete task');
    del.addEventListener('click', () => deleteTask(task.id));

    li.appendChild(dot);
    li.appendChild(check);
    li.appendChild(textEl);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// ── Actions ──
function addTask() {
  const input    = document.getElementById('task-input');
  const priority = document.getElementById('priority-sel').value;
  const text     = input.value.trim();

  if (!text) {
    input.focus();
    input.style.borderColor = '#e24b4a';
    setTimeout(() => { input.style.borderColor = ''; }, 800);
    return;
  }

  tasks.unshift({
    id:       Date.now(),
    text,
    done:     false,
    priority,
    created:  new Date().toISOString()
  });

  input.value = '';
  input.focus();
  saveTasks();
  render();
}

function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) { task.done = !task.done; saveTasks(); render(); }
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
}

function startEdit(el, task) {
  el.setAttribute('contenteditable', 'true');
  el.focus();
  // Move cursor to end
  const range = document.createRange();
  const sel   = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel.removeAllRanges();
  sel.addRange(range);
}

function finishEdit(el, task) {
  el.setAttribute('contenteditable', 'false');
  const newText = el.textContent.trim();
  if (newText && newText !== task.text) {
    task.text = newText;
    saveTasks();
  } else {
    el.textContent = task.text; // revert if empty
  }
}

// ── Event Listeners ──
document.getElementById('add-btn').addEventListener('click', addTask);

document.getElementById('task-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

document.getElementById('clear-btn').addEventListener('click', clearCompleted);

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    filter = btn.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    render();
  });
});

// ── Init ──
render();