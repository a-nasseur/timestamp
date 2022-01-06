const input = document.getElementById('input')
const btn = document.getElementById('btn')


btn.addEventListener('click', (e) => {
    const date = input.value
    window.location.href = `/api/${date}`
})

