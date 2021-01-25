console.log('javascript no frontend')

const cotacoesForm = document.querySelector('form')
const mainMensage = document.querySelector('h3')
const price = document.querySelector('#price')
const price_open = document.querySelector('#price_open')
const day_high = document.querySelector('#day_high')
const day_low = document.querySelector('#day_low')

cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...'
    price.innerHTML =  ''
    price_open.innerHTML =  ''
    day_high.innerHTML =  ''
    day_low.innerHTML =  ''
    
    event.preventDefault()
    const ativo = document.querySelector('input').value

    if(!ativo){
        mainMensage.innerText = 'O ativo deve ser informado'
        return;
    }
    
    fetch(`/cotacoes?ativo=${ativo}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                mainMensage.innerText = `Alguma coisa deu errado` 
                price.innerHTML =  `${data.error.mensage} | código ${data.error.code}`
            }else{
                mainMensage.innerText = data.symbol
                price.innerHTML =  `DATE: ${data.date}`
                price_open.innerHTML =  `OPEN: ${data.open}`
                day_high.innerHTML =  `HIGH: ${data.high}`
                day_low.innerHTML =  `LOW: ${data.low}`
            }
        })
    })
})