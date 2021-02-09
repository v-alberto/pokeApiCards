
const poke_container = document.getElementById('poke_container')
const poke_container2 = document.getElementById('poke_container2')
const h1 = document.getElementById('h1')
const API = 'https://pokeapi.co/api/v2/pokemon/'
const numPokemons = 151
const colors =  {
  fire: '#ff9b9b',
	grass: '#9dffa3',
	electric: '#ffee9b',
	water: '#9bdfff',
	ground: '#fccc9c',
	rock: '#bdbdb8',
	fairy: '#f5b9ff',
	poison: '#6fda84',
	bug: '#f8c680',
	dragon: '#789fe7',
	psychic: '#e6eb6c',
	flying: '#c9c7c7',
	fighting: '#cac2b3',
	normal: '#b8b7b7'
}


async function pedirPokemons(){

  for(let i = 1; i <= numPokemons; i++) {
    await traerPokemons(i)
  }


}

const traerPokemons = async id => {
  const res = await fetch(`${API}${id}`)
  const data = await res.json()
  crearCard(data)

}


const crearCard = pokemon => {
  const pokemonCard = document.createElement('div')
  pokemonCard.classList.add('pokemonCard')
  const pokemonImg = document.createElement('img')
  pokemonImg.classList.add('pokemonImg')
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemonEl')






  const allcolor = Object.keys(colors)

  const types = pokemon.types.map( type => type.type.name )

  const type = allcolor.find( type => types.indexOf(type) == 0)

  const color = colors[type]

  pokemonCard.style.backgroundColor = color



  















  
  const pokeInnerHTML =`
  <div class = 'infoPokemon'> 
    <span class = 'infoPokemonName'>${pokemon.name} </span>
    <span class = 'infoPokemonLine'></span>
    <div class = 'infoPokemonStats'>
      <div>HP :  ${pokemon.stats[0].base_stat}</div>
      <div>XP :  ${pokemon.base_experience}</div>
    </div>
  </div>
  <button class = 'btnTransfer' id = 'btnTransfer' onclick = 'asd(${pokemon.id})'>Information</button>
  `
  pokemonEl.innerHTML = pokeInnerHTML
  pokemonImg.setAttribute('src', pokemon.sprites.other.dream_world.front_default)
  pokemonImg.src = pokemon.sprites.other.dream_world.front_default
  pokemonCard.appendChild(pokemonImg)
  pokemonCard.appendChild(pokemonEl)
  poke_container.appendChild(pokemonCard)

}


async function asd(id){
  poke_container.classList.add('visibility')
  h1.classList.add('visibility')
  poke_container2.style.display = 'flex'
  const res = await fetch(`${API}${id}`)
  const data = await res.json()
  infoComplete(data)
}

async function infoComplete(pokemon) {

  const card2 = document.createElement('div')
  card2.classList.add('card2')
  const header = document.createElement('header')
  header.classList.add('header')
  const body2 = document.createElement('section')
  body2.classList.add('body2')

  const btnBack = document.createElement('div')
  btnBack.classList.add('btnBack')
  
  const allcolor = Object.keys(colors)

  const types = pokemon.types.map( type => type.type.name )

  const type = allcolor.find( type => types.indexOf(type) == 0)

  const color = colors[type]

  
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)
    const data = await res.json()
    const poke_types = pokemon.types.map(el => el.type.name)
    header.innerHTML =`
      <div class = 'idTypes'> 
        <div>${pokemon.id}</div>
        <div>${poke_types}</div>
      </div> 
    `
  
  
    body2.innerHTML= `
      <div class = 'section1'> 
        <img class = 'img2' src="${pokemon.sprites.other.dream_world.front_default}" alt="">
        <div class = 'statics'> 
          <div class = 'title'>${pokemon.name}</div>
          <div class = 'bar'>
            Hp:  
            <div class="progress">
              <div class="progress-bar" style="width: ${pokemon.stats[0].base_stat}%; background-color: ${color};color: black "> ${pokemon.stats[0].base_stat} </div>
            </div>
            Attack: 
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${pokemon.stats[1].base_stat}%; background-color: ${color};color: black " aria-valuenow="${pokemon.stats[1].base_stat}" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[1].base_stat}</div>
            </div>
            Defense: 
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${pokemon.stats[2].base_stat}%; background-color: ${color};color: black " aria-valuenow="${pokemon.stats[2].base_stat}" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[2].base_stat}</div>
            </div>
            Speed:  
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${pokemon.stats[5].base_stat}%; background-color: ${color};color: black " aria-valuenow="${pokemon.stats[5].base_stat}" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[5].base_stat}</div>
            </div>
            Sp Atk: 
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${pokemon.stats[3].base_stat}%; background-color: ${color};color: black " aria-valuenow="${pokemon.stats[3].base_stat}" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[3].base_stat} </div>
            </div>
            Sp Def: 
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: ${pokemon.stats[4].base_stat}%; background-color: ${color};color: black " aria-valuenow="${pokemon.stats[4].base_stat}" aria-valuemin="0" aria-valuemax="100">${pokemon.stats[4].base_stat}</div>
            </div>
          </div>
        </div>
      </div>
      <p class = 'description'> ${data.flavor_text_entries[26].flavor_text}</p>
  
      <div class = 'section2'> 
      
      </div>
    `


    btnBack.innerHTML = `
      <button id = 'btnBack' class = 'btn btn-black getBack' style="background:${color} ">BACK</button>
    
    `
    card2.appendChild(header)
    card2.appendChild(body2)
    
    poke_container2.appendChild(card2)
    poke_container2.appendChild(btnBack)
  

    btnBack.addEventListener('click',() => {
      poke_container2.style.display = 'none'
      poke_container2.removeChild(card2)
      poke_container2.removeChild(btnBack)
      poke_container.classList.remove('visibility')
      h1.classList.remove('visibility')
    })
  }






pedirPokemons()
