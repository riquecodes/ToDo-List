function addTask(event) {
  event.preventDefault();

  const taskInput = document.getElementById('newTask').value;
  if (taskInput.trim() === '') {
    alert('Por favor, preencha uma tarefa válida.');
    return;
  }

  const newRow = document.createElement('tr');

  newRow.innerHTML = `
    <td class="text-center">
      <input type="checkbox" class="form-check-input me-2" onchange="toggleTaskStatus(this)">
    </td>
    <td class="text-center task-name">${taskInput}</td>
    <td class="text-center due-date">—</td>
    <td class="text-center description">—</td>
    <td class="text-center priority">—</td>
    <td class="text-center">
      <section class="d-flex justify-content-center gap-2">
        <button class="btn btn-success btn-sm" onclick="openEditModal(this)">
          <i class="bi bi-pencil-fill"></i>
        </button>
        <button class="btn btn-danger btn-sm" onclick="openDeleteModal(this)">
          <i class="bi bi-trash-fill"></i>
        </button>
      </section>
    </td>
  `;

  document.getElementById('taskList').appendChild(newRow);
  document.getElementById('newTask').value = ''; // limpa input após adicionar
}

function filterTasks(filter) {
  const taskList = document.getElementById('taskList').querySelectorAll('tr');
  
  taskList.forEach(task => {
    const checkbox = task.querySelector('input[type="checkbox"]');
    if (!checkbox) return;

    if (filter === 'all') {
      task.style.display = '';
      return;
    }
    
    if (filter === 'pending' && checkbox.checked) {
      task.style.display = 'none';
      return;
    } 
    
    if (filter === 'completed' && !checkbox.checked) {
      task.style.display = 'none';
      return;
    }

    task.style.display = '';
  });
}

document.getElementById('all').onclick = () => filterTasks('all');
document.getElementById('pending').onclick = () => filterTasks('pending');
document.getElementById('completed').onclick = () => filterTasks('completed');

let currentRow = null;
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

function openEditModal(button) {
  currentRow = button.closest('tr');
  editModal.show();
  document.getElementById('editTaskInput').value = currentRow.querySelector('.task-name').textContent;
  document.getElementById('editDueDate').value = currentRow.querySelector('.due-date').textContent !== '—' ? currentRow.querySelector('.due-date').textContent : '';
  document.getElementById('editDescription').value = currentRow.querySelector('.description').textContent !== '—' ? currentRow.querySelector('.description').textContent : '';
  document.getElementById('editPriority').value = currentRow.querySelector('.priority').textContent !== '—' ? currentRow.querySelector('.priority').textContent : '';
}

document.getElementById('editForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const newName = document.getElementById('editTaskInput').value.trim();
  const newDueDate = document.getElementById('editDueDate').value || '—';
  const newDescription = document.getElementById('editDescription').value.trim() || '—';
  const newPriority = document.getElementById('editPriority').value || '—';

  if (newName && currentRow) {
    currentRow.querySelector('.task-name').textContent = newName;
    currentRow.querySelector('.due-date').textContent = newDueDate;
    currentRow.querySelector('.description').textContent = newDescription;
    currentRow.querySelector('.priority').textContent = newPriority;
    editModal.hide();
  } else {
    alert('Nome da tarefa é obrigatório!');
  }
});

function openDeleteModal(button) {
  currentRow = button.closest('tr');
  deleteModal.show();
  document.getElementById('confirmDeleteBtn').onclick = function() {
    deleteTask();
    deleteModal.hide();
  };
  
  function deleteTask() {
    if (currentRow) {
      currentRow.remove();
      currentRow = null;
    }
  }
}

function toggleTaskStatus(checkbox) {
  const row = checkbox.closest('tr');
  if (checkbox.checked) {
    row.querySelector('.task-name').classList.add('task-completed');
  } else {
    row.querySelector('.task-name').classList.remove('task-completed');
  }
}