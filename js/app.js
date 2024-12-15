const wrapperEl = document.querySelector('.wrapper')
const loadingEl = document.querySelector('.user-card-skeleton')
const btnSeeMoreEl = document.querySelector('.btn')

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
	fetchData('/users?limit=8')
})

function createLoading(n) {
	for (let i = 0; i < n; i++) {
		loadingEl.style.display = 'block'
	}
}

function createCard(data) {
	data.users.forEach(user => {
		const divEl = document.createElement('div')
		divEl.className = 'card'
		divEl.innerHTML = `
            <img src="${user.image}" alt="User Photo" class="card__image">
            <h3 class="card__name">${user.firstName} ${user.lastName}</h3>
            <strong class="card__education">${
							user.university || 'No University Data'
						}</strong>
            <span class="card__email">${user.email}</span>
            <p class="card__role">${user.role || 'No Role Specified'}</p>
            <button class="card__button">Contact</button>
        `
		wrapperEl.appendChild(divEl)
	})
}

let offset = 0
btnSeeMoreEl.addEventListener('click', () => {
	offset++
	fetchData(`/users?limit=8&skip=${offset * 8}`)
})
