/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// variables that store DOM elements you will need to reference and/or manipulate
const pageList = document.querySelector(".student-list");
const eachStudent = pageList.children;
const studentsPerPage = 10;

// Create a function to hide all of the items in the list excpet for the ten you want to show

const showTen = () => {

	let max = 10;
	let min = max - 10;

	for(let i = 0; i < eachStudent.length; i++) {
		if (i >= min && i < max) {
        eachStudent[i].style.display = '';
        }  else {
            eachStudent[i].style.display = 'none';
        }
	}


}
showTen();

// Create and append the pagination links - Creating a function that can do this is a good approach
const appendPageLinks = () => {

	const numberOfPages = () => {
		let pages = Math.ceil(eachStudent.length/studentsPerPage);
		return pages;
	}

	let pageDiv = document.querySelector(".page");
	let paginationDiv = document.createElement('div');
	let paginationUl = document.createElement('ul'); 
	paginationDiv.className = "pagination";

	for (let i =  1; i <= numberOfPages(); i++) {
		pageLi = document.createElement('li');
		pageLink = document.createElement('a');
		pageLink.href = '#';
		pageLink.textContent = i;
		pageLi.appendChild(pageLink);
		paginationUl.appendChild(pageLi);
	}

	paginationDiv.appendChild(paginationUl);
	pageDiv.appendChild(paginationDiv);

	// active class to the first link element
	let firstList = paginationUl.getElementsByTagName("li");
	let firstListLink = firstList[0].querySelector("a");
	firstListLink.className = "active";
}

appendPageLinks();

// show search div

const showSearchDiv = () => {
	let searchDiv = document.createElement("div");
	searchDiv.className = "student-search";
	let searchInput = document.createElement("input");
	searchInput.placeholder = "Search for students...";
	let searchButton = document.createElement("button");
	searchButton.textContent = "Search";
	searchDiv.appendChild(searchInput);
	searchDiv.appendChild(searchButton);

	let pageHeaderSearchDiv = document.querySelector(".page-header");
	pageHeaderSearchDiv.appendChild(searchDiv);


	// Event listener for search box functionality
	// Array to hold number of hidden students
	const searchResults = [];
	searchButton.addEventListener('click', () => {
	    let filter = searchInput.value.toLowerCase();
	    searchResults.length = 0;
	    for (let i = 0; i < eachStudent.length; i++) {
	        if (eachStudent[i].innerHTML.indexOf(filter) > -1) {
	            eachStudent[i].style.display = '';
	            
	        } else {
	            eachStudent[i].style.display = 'none';
	            searchResults.push(i);
	        }   
	    }
	    // If all students are hidden, a 'no results' message is displayed
	    if (searchResults.length === eachStudent.length) {
	        noResultDiv.innerHTML = '<h1>No Results</h1>';
	    } else {
	        noResultDiv.innerHTML = ''; 
	    }
	});
}

showSearchDiv();

// functionality to the pagination buttons so that they show and hide the correct items

const listItemLinks = document.querySelectorAll(".pagination a");
for(let i = 0; i < listItemLinks.length; i += 1) {
	listItemLinks[i].addEventListener("click", function(e) {

		//divide students between pages
		let pageNumber = parseInt(e.target.textContent);
		let max = pageNumber * 10;
		let min = max - 10;

		for(let i = 0; i < eachStudent.length; i++) {
			if (i >= min && i < max) {
            eachStudent[i].style.display = '';
	        }  else {
	            eachStudent[i].style.display = 'none';
	        }
		}

		var current = this;
		for (let i = 0; i < listItemLinks.length; i++) {
	        if (current != listItemLinks[i]) {
	          listItemLinks[i].classList.remove('active');
	        } else if (current.classList.contains('active') === true) {
	          current.classList.remove('active');
	        } else {
	          current.classList.add('active')
	        }
	    }

		e.preventDefault();
	});
}
