const productWrapperEl = document.querySelector('.wrapper')
const loadingEl = document.querySelector('.loading')
const btnSeeMoreEl = document.querySelector('.btn')
const categoryBarEl = document.querySelector('.category-bar')

const BASE_URL = 'https://dummyjson.com'

async function fetchData(endpoint) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`)
		const data = await response.json()
		createCard(data)
	} catch (error) {
		console.error('Error fetching data:', error)
	} finally {
		loadingEl.style.display = 'none'
	}
}

window.addEventListener('load', () => {
	createLoading(10)
	fetchData('/products?limit=8')
	fetchCategory('/products/categories')
})

function createLoading(n) {
	for (let i = 0; i < n; i++) {
		const div = document.createElement('div')
		div.className = 'loading__item'
		div.innerHTML = `
            <div class="loading__image"></div>
            <div class="loading__name"></div>
            <div class="loading__price"></div>
        `
		loadingEl.appendChild(div)
	}
}

function createCard(data) {
	data.products.forEach(product => {
		const divEl = document.createElement('div')
		divEl.className = 'card'
		divEl.innerHTML = `
            <img src="${product.thumbnail}" alt="Product Image" class="card__image">
            <h3 class="card__name">${product.view}</h3>
            <strong class="card__price">$${product.price}</strong>
            <button class="card__button">Buy Now</button>
        `
		productWrapperEl.appendChild(divEl)
	})
}

async function fetchCategory(endpoint) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`)
		const categories = await response.json()
		console.log(categories)
		createCategory(categories)
	} catch (error) {
		console.error('Error fetching categories:', error)
	}
}

function createCategory(categories) {
	categories.forEach(category => {
		const categoryName = typeof category === 'string' ? category : category.name

		const buttonEl = document.createElement('button')
		buttonEl.className = 'category-item'
		buttonEl.textContent = categoryName
		buttonEl.addEventListener('click', () => {
			productWrapperEl.innerHTML = ''
			createLoading(8)
			fetchData(`/products/category/${categoryName}`)
		})
		categoryBarEl.appendChild(buttonEl)
	})
}

let offset = 0
btnSeeMoreEl.addEventListener('click', () => {
	offset++
	fetchData(`/products?limit=8&skip=${offset * 8}`)
})
