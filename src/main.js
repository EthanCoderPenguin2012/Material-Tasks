// ...existing code...
import '../assets/styles/themes.css';

// Periodically fetch API usage stats
setInterval(async () => {
    try {
        const res = await fetch('/usage');
        const data = await res.json();
        document.getElementById('request-count').textContent = data.api_usage.requests;
    } catch (error) {
        console.error('Error fetching usage stats:', error);
    }
}, 5000);

// Handle new themes
const newThemeSelect = document.getElementById('new-theme');
if (newThemeSelect) {
    newThemeSelect.addEventListener('change', () => {
        document.body.className = newThemeSelect.value;
    });
}

// Handle advanced settings
const autoSaveCheckbox = document.getElementById('auto-save');
const notificationsToggle = document.getElementById('notifications-toggle');
const saveSettingsButton = document.getElementById('save-settings');
if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', () => {
        const settings = {
            autoSave: autoSaveCheckbox.checked,
            notifications: notificationsToggle.checked,
        };
        console.log('Settings saved:', settings);
    });
}

// Handle task categories
const addCategoryButton = document.getElementById('add-category');
const categoryInput = document.getElementById('category');
const categoryList = document.getElementById('category-list');
if (addCategoryButton) {
    addCategoryButton.addEventListener('click', () => {
        if (categoryInput.value) {
            const newCategory = document.createElement('li');
            newCategory.textContent = categoryInput.value;
            categoryList.appendChild(newCategory);
            categoryInput.value = '';
        }
    });
}

// ...existing code...