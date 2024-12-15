const wrapperEl = document.querySelector('.wrapper')

const BASE_URL = 'https://dummyjson.com'

async function fetchData(endpoint) {
	try {
		const response = await fetch(`${BASE_URL}${endpoint}`)
		const data = await response.json()
		createPostCards(data)
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

document.addEventListener('DOMContentLoaded', () => {
	fetchData('/posts?limit=10')
})

function createPostCards(data) {
	data.posts.forEach(post => {
		const postDiv = document.createElement('div')
		postDiv.className = 'post'
		postDiv.innerHTML = `
            <h3 class="post__title">${post.title}</h3>
            <p class="post__body">${post.views}</p>
            <ul class="post__tags">
                ${post.tags.map(tag => `<li>#${tag}</li>`).join('')}
            </ul>
            <div class="post__likes">
                <i class="fas fa-heart"></i>
                <span>${post.reactions} likes</span>
            </div>
        `
		wrapperEl.appendChild(postDiv)
	})
}
