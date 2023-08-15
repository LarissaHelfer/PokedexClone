const url = "https://pokeapi.co/api/v2/pokemon/?limit=1010";
var limit = 12;
var todosDados = [];

const loadImage = document.getElementById("loading");
const loadText = document.getElementById("texto");
/*

// carregando pagina
*/
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const pokemons = data.results;

    // pega as informações de cada pokemon
    const fetchPokemonDetails = async (pokemon) => {
      const response = await fetch(pokemon.url);
      const pokemonDetails = await response.json();
      return pokemonDetails;
    };

    // da um fetch nas informações dos pokemon
    var pokemonDetailsPromises = pokemons.map((pokemon) =>
      fetchPokemonDetails(pokemon)
    );

    // aguarda requisição
    Promise.all(pokemonDetailsPromises).then((pokemonDetails) => {
      pokemonDetails.forEach((pokemon) => {
        todosDados.push(pokemon);
      });

      // Só renderizar os 12 primeiros
      const cargaInicial = todosDados.slice(0, limit);
      const htmlContent = criaHTML(cargaInicial);
      inserePokemon(htmlContent);

     // finaliza a requesição e some a img
     loadImage.style.display = "none";
     loadText.style.display = "none";
    });
  });

//botão para exibir mais 12 pokemons na página
const maisPokemon = () => {
  const maisBicho = document.querySelector(".mais");
  maisBicho.addEventListener("click", gerarMaisPokemons);

  function gerarMaisPokemons() {
    limit += 12;
    const first12 = todosDados.slice(0, limit);
    const novoHtml = criaHTML(first12);
    inserePokemon(novoHtml);
  }

  const first12 = todosDados.slice(0, 12);
  const telaInicial = criaHTML(first12);
  inserePokemon(telaInicial);
};

//cria o HTML
const criaHTML = (pokemons) =>
  pokemons.reduce((todosPokemon, { name, id, types }) => {
    const caracteristica = types.map((typeInfo) => typeInfo.type.name);

    todosPokemon += `
      <div class='caixaPersonagem' onClick="window.location.href='detalhesPoekemon.html?pokemon=${name}'">
        <li class="card">
          <img class='personagem'
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png"
          />
          <div class="informacoes">
          <h3 class="nomePokemon">Nº 000${id}</h3>
          <h2 class="pokemon-info">${
            name.charAt(0).toUpperCase() + name.slice(1)
          }</h2>
    `;
    caracteristica.forEach(
      (dados) =>
        (todosPokemon += `<p class=${dados}>${
          dados.charAt(0).toUpperCase() + dados.slice(1)
        }</p>`)
    );

    todosPokemon += `</div>
        </li>
      </div>`;

    return todosPokemon;
  }, "");

const inserePokemon = (pokemons) => {
  const ul = document.querySelector('[lista="pokedex"]');
  ul.innerHTML = pokemons;
};

maisPokemon();
const procuraPokemon = () => {
  const elPesquisado = document.querySelector(".menuPokemon");
  elPesquisado.addEventListener("input", pesquisarPokemons);
  function pesquisarPokemons() {
    const filter = elPesquisado.value.trim().toUpperCase();
    if (filter === "") {
      const telaLimit = todosDados.slice(0, limit);
      inserePokemon(criaHTML(telaLimit));
    } else {
      const pokemonFiltrado = todosDados.filter((pokemon) => {
        const nome = pokemon.name.toUpperCase();
        const id = pokemon.id.toString();
        return nome.includes(filter) || id === filter;
      });

      const filteredHTML = criaHTML(pokemonFiltrado);
      inserePokemon(filteredHTML);
    }
  }
  pesquisarPokemons();
};
procuraPokemon();

//organizar pokemons
const filtraPokemon = () => {
  const elSelecionado = document.querySelector(".form-select");
  elSelecionado.addEventListener("change", ordenarPokemons);

  function ordenarPokemons() {
    const sort = elSelecionado.value;

    var organizar;
    switch (sort) {
      case "Menor número primeiro":
        organizar = todosDados
          .slice(0, limit)
          .sort((x, y) => (x.id > y.id ? 1 : x.id < y.id ? -1 : 0));
        break;
      case "Maior número primeiro":
        organizar = todosDados
          .slice(0, limit)
          .sort((x, y) => (x.id > y.id ? -1 : x.id < y.id ? 1 : 0));
        break;
      case "A-Z":
        organizar = todosDados
          .slice(0, limit)
          .sort((x, y) => (x.name > y.name ? 1 : x.name < y.name ? -1 : 0));
        break;
      case "Z-A":
        organizar = todosDados
          .slice(0, limit)
          .sort((x, y) => (x.name > y.name ? -1 : x.name < y.name ? 1 : 0));
        break;
    }
    const organizadoHTML = criaHTML(organizar);
    inserePokemon(organizadoHTML);
  }
  ordenarPokemons();
};
filtraPokemon();

/*
const trocarDePagina = () => {
  var pokemonSelecionado = document.querySelector(".caixaPersonagem");
  pokemonSelecionado.addEventListener("click", detalharPokemon);
  function detalharPokemon() {
      if(pokemonSelecionado==todosDados){
      window.location.href ='detalhesPoekemon.html'
    }
    }
  detalharPokemon();
};
trocarDePagina();
*/
