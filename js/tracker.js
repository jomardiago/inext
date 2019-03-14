(function() {
    const entries = localStorage.getItem('entries') ? JSON.parse(localStorage.getItem('entries')) : [];
    const categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];

    const clearTBodyElement = () => {
        const tbodyEl = document.querySelector('tbody');
        tbodyEl.innerHTML = null;
    };

    const deleteEntry = entryId => {
        const index = entries.findIndex(({ id }) => id === entryId);
        entries.splice(index, 1);
        localStorage.setItem('entries', JSON.stringify(entries));
        clearTBodyElement();
        renderEntries(entries);
        M.toast({html: 'Entries saved successfully.', classes: 'light-green'});
    };

    const renderEntries = (entries) => {
        const tbodyEl = document.querySelector('tbody');
        entries.forEach(entry => {
            const trEl = document.createElement('tr');

            for (const key in entry) {
                if (key !== 'id') {
                    const tdEl = document.createElement('td');

                    if (key === 'category') {
                        const { name } = categories.find(({ id }) => id == entry[key]);
                        tdEl.textContent = name;
                    } else {
                        tdEl.textContent = entry[key];
                    }

                    trEl.appendChild(tdEl);
                }
            }

            const editTdEl = document.createElement('td');
            const editLink = document.createElement('a');
            const editTdElIcon = document.createElement('i');
            editLink.setAttribute('href', `tracker-form.html#${entry.id}`);
            editTdElIcon.setAttribute('class', 'material-icons');
            editTdElIcon.textContent = 'edit';
            editTdElIcon.style.cursor = 'pointer';
            editLink.appendChild(editTdElIcon);
            editTdEl.appendChild(editLink);

            const deleteTdEl = document.createElement('td');
            const deleteTdElIcon = document.createElement('i');
            deleteTdElIcon.setAttribute('class', 'material-icons');
            deleteTdElIcon.style.color = '#039be5';
            deleteTdElIcon.style.cursor = 'pointer';
            deleteTdElIcon.textContent = 'delete';
            deleteTdElIcon.addEventListener('click', () => deleteEntry(entry.id));
            deleteTdEl.appendChild(deleteTdElIcon);

            trEl.appendChild(editTdEl);
            trEl.appendChild(deleteTdEl);
            tbodyEl.appendChild(trEl);
        });
    };

    document.addEventListener('DOMContentLoaded', function() {
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems);
    });

    if (entries) { renderEntries(entries); }
})();