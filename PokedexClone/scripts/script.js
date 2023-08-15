var todosDados = [];
var queryParams = new URLSearchParams(window.location.search);
var pokemonSelecionado = queryParams.get("pokemon");
const url = `https://pokeapi.co/api/v2/pokemon/${pokemonSelecionado}`;

fetch(url)
  .then((response) => response.json())
  .then((pokemonDetails) => {
    todosDados.push(pokemonDetails);

    // Renderizar o pokemon
    const cargaInicial = todosDados;
    inserePokemon(criaHTML(cargaInicial));
  });

//cria o HTML
const criaHTML = (pokemons) =>
  pokemons.reduce(
    (todosPokemon, { name, id, types, height, weight, abilities }) => {
      const caracteristica = types.map((typeInfo) => typeInfo.type.name);
      const habilidades = abilities.map(
        (habilidade) => habilidade.ability.name
      );

      todosPokemon += `
        <div class='info-topo'>
            <span class="nome">${
              name.charAt(0).toUpperCase() + name.slice(1)
            }</span>
            <span class="id">Nº 000${id}</span>
        </div>

        <div class='caixaPersonagem'">
            <li class="card">
                <div class='perfil'>
                    <img class='personagem'
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
                    />
                </div>

                <div class="caracteristicas">
                    <span>Height</span>
                    <span id='infoPokemon'>${height / 10} m</span>
                    <span>Weight</span>
                    <span id='infoPokemon'>${weight / 10} kg</span>
                    <span>Abilities</span>`;

      habilidades.forEach(
        (dados) =>
          (todosPokemon += `
                          <span id='infoPokemon'>${
                            dados.charAt(0).toUpperCase() + dados.slice(1)
                          }</span>
                          `)
      );

      todosPokemon += `</div>
                <p class="type">Type</p>
                `;

      caracteristica.forEach(
        (dados) =>
          (todosPokemon += `
            <p class=${dados}>${
            dados.charAt(0).toUpperCase() + dados.slice(1)
          }</p>
          `)
      );

      todosPokemon += `<div class='tipo'>
      <span class="botao" onClick="window.location.href='index.html'">Explorar mais pokemons</span></div>
            </li>
        </div>`;

      return todosPokemon;
    },
    ""
  );

const inserePokemon = (pokemons) => {
  const div = document.querySelector('[lista="pokedex"]');
  div.innerHTML = pokemons;
};
