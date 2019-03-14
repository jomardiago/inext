(function() {
    const hashId = window.location.hash.substr(1);
    const entries = localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : [];
    const categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];

    const initializeSelectElements = () => {
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems);
    };

    const populateCategorySelectList = categories => {
        if (categories.length <= 0) {
            M.toast({html: 'There are no available categories, please create one.', classes: 'light-green'});
            setTimeout(() => { location.assign('category.html'); }, 2000);
            return;
        }
        
        const typeOption = document.querySelector('#type').value;
        const categorySelectEl = document.querySelector('#category');
        categorySelectEl.innerHTML = null;

        const defaultOptionEl = document.createElement('option');
        defaultOptionEl.setAttribute('value', '');
        defaultOptionEl.disabled;
        defaultOptionEl.selected;
        defaultOptionEl.textContent = 'Choose Category';

        categorySelectEl.appendChild(defaultOptionEl);

        categories.forEach(category => {
            if (category.type === typeOption) {
                const selectOptionEl = document.createElement('option');
                selectOptionEl.setAttribute('value', category.id);
                selectOptionEl.textContent = category.name;

                categorySelectEl.appendChild(selectOptionEl);
            }
        });

        initializeSelectElements();
    };

    const saveNewIncomeExpense = () => {
        const newIncomeExpense = {};

        newIncomeExpense.id = new Date().getTime();
        newIncomeExpense.type = document.querySelector('#type').value;
        newIncomeExpense.category = document.querySelector('#category').value;
        newIncomeExpense.name = document.querySelector('#name').value;
        newIncomeExpense.description = document.querySelector('#description').value;
        newIncomeExpense.amount = document.querySelector('#amount').value;
        newIncomeExpense.entryDate = document.querySelector('#entryDate').value ? document.querySelector('#entryDate').value : moment().format('MMM DD, YYYY');

        entries.push(newIncomeExpense);

        localStorage.setItem('entries', JSON.stringify(entries));
        M.toast({html: 'New entry saved successfully.', classes: 'light-green'});

        document.querySelector('#name').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#amount').value = '';
        document.querySelector('#entryDate').value = '';
    };

    const updateIncomeExpense = () => {
        entries.forEach(entry => {
            if (entry.id == hashId) {
                entry.type = document.querySelector('#type').value;
                entry.category = document.querySelector('#category').value;
                entry.name = document.querySelector('#name').value;
                entry.description = document.querySelector('#description').value;
                entry.amount = document.querySelector('#amount').value;
                entry.entryDate = document.querySelector('#entryDate').value ? document.querySelector('#entryDate').value : moment().format('MMM DD, YYYY');
            }
        });

        localStorage.setItem('entries', JSON.stringify(entries));
        M.toast({html: 'Entry updated successfully.', classes: 'light-green'});

        document.querySelector('#name').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#amount').value = '';
        document.querySelector('#entryDate').value = '';
    };

    const populateTrackerForm = id => {
        const entries = JSON.parse(localStorage.getItem('entries'));
        const entry = entries.find(entry => entry.id == id);

        document.querySelector('#type').value = entry.type;

        populateCategorySelectList(categories);

        document.querySelector('#category').value = entry.category;
        document.querySelector('#name').value = entry.name;
        document.querySelector('#description').value = entry.description;
        document.querySelector('#amount').value = parseFloat(entry.amount.replace(',', ''));
        document.querySelector('#entryDate').value = entry.entryDate;
    };

    document.addEventListener('DOMContentLoaded', function() {
        const selectElems = document.querySelectorAll('select');
        const dateElems = document.querySelectorAll('.datepicker');
        M.FormSelect.init(selectElems);
        M.Datepicker.init(dateElems);
    });

    document.querySelector('#tracker-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (hashId !== '') {
            updateIncomeExpense();
        } else {
            saveNewIncomeExpense();
        }
    });

    document.querySelector('#type').addEventListener('change', () => populateCategorySelectList(categories));

    if (hashId !== '') { populateTrackerForm(hashId); }
})();