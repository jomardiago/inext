(function() {
    const categories = localStorage.getItem('categories') ? JSON.parse(localStorage.getItem('categories')) : [];

    const clearTBodyElement = () => {
        const tbodyEl = document.querySelector('tbody');
        tbodyEl.innerHTML = null;
    };
    
    const deleteCategory = id => {
        const newCategories = categories.filter(category => category.id !== id);
        localStorage.setItem('categories', JSON.stringify(newCategories));
        
        clearTBodyElement();
        renderCategories(newCategories);
        M.toast({html: 'Category saved successfully.', classes: 'light-green'});
    };
    
    const renderCategories = (categories) => {
        categories.forEach(category => {
            const trEl = document.createElement('tr');
    
            for (const key in category) {
                let textContentValue = category[key];
                if (key !== 'id') {
                    const tdEl = document.createElement('td');
                    tdEl.textContent = textContentValue;
                    trEl.appendChild(tdEl);
                }
            }
    
            const editTdEl = document.createElement('td');
            const editLink = document.createElement('a');
            const editTdElIcon = document.createElement('i');
            editLink.setAttribute('href', `category-form.html#${category.id}`);
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
            deleteTdElIcon.addEventListener('click', () => deleteCategory(category.id));
            deleteTdEl.appendChild(deleteTdElIcon);
    
            trEl.appendChild(editTdEl);
            trEl.appendChild(deleteTdEl);
    
            const tBodyEl = document.querySelector('tbody');
            tBodyEl.appendChild(trEl);
        });
    };
    
    const filterCategoriesByType = value => {
        const newCategories = categories.filter(category => category.type.toLowerCase() === value.toLowerCase());
        clearTBodyElement();
        renderCategories(newCategories);
    };

    const filterCategoriesBySearch = value => {
        const newCategories = categories.filter(category => {
            return (
                category.type.toLowerCase().includes(value.toLowerCase()) || 
                category.name.toLowerCase().includes(value.toLowerCase()) ||
                category.description.toLowerCase().includes(value.toLowerCase())
            );
        });
        
        clearTBodyElement();
        renderCategories(newCategories);
    };

    document.addEventListener('DOMContentLoaded', function() {
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems);

        document.querySelector('#filterOption').addEventListener('change', (e) => filterCategoriesByType(e.target.value));
        document.querySelector('#search').addEventListener('input', (e) => filterCategoriesBySearch(e.target.value));
    });
    
    renderCategories(categories);
})();