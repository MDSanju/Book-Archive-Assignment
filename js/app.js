// search book
const searchBook = () => {
    // get input value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    // api call
    if (searchText === '') {
        // empty search
        const emptySearch = document.getElementById('empty-search');
        const h3 = document.createElement('h3');
        h3.innerText = `Please write something to get result!`;
        emptySearch.appendChild(h3);
    } else {
        const emptySearch = document.getElementById('empty-search');
        const h3 = document.createElement('h3');
        h3.innerText = `Please write something to get result!`;
        emptySearch.textContent = '';
        // load api
        fetch(`https://openlibrary.org/search.json?q=${searchText}`)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
    }
}



// search result card showing up
const displaySearchResult = books => {
    // search result numbers found id
    const searchResultsFound = document.getElementById('search-results-found');
    // search result card id
    const searchResult = document.getElementById('search-result');
    // remove search contents
    searchResult.textContent = '';
    // display search results
    if (books.docs.length === 0) {
        // no result found
        const noResultMessage = document.getElementById('no-result');
        const h3 = document.createElement('h3');
        h3.innerText = `No result found!`;
        searchResultsFound.textContent = '';
        noResultMessage.appendChild(h3);
    } else {
        // display search result numbers
        const h5NumFound = document.createElement('h5');
        h5NumFound.innerText = `About ${books.numFound} results found!`;
        searchResultsFound.textContent = '';
        searchResultsFound.appendChild(h5NumFound);
        // if find results
        const noResultMessage = document.getElementById('no-result');
        const h3 = document.createElement('h3');
        h3.innerText = `No result found!`;
        noResultMessage.textContent = '';
        // display search results dynamically
        books.docs.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img height="450px" src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Book name: ${book.title}</h5>
                    <p class="card-text">Author: ${book.author_name?.[0]}</p>
                    <p class="card-text">First publish year: ${book.first_publish_year}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        });
    }
}