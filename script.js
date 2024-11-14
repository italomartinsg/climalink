const inputCidade = document.querySelector('.pesquisarCidade');
const suggestions = document.getElementById('suggestions');





inputCidade.addEventListener('keydown', async () => {
    const query = inputCidade.value;
    if (query.length < 3) {
        suggestions.innerHTML = ''; // Limpa as sugestões se o termo for muito curto
        return;
    }
    try {
        const response = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '1e4c517139mshf389ff6095374d5p120f73jsn9102191c467d',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displaySuggestions(data.data);
        } else {
            console.error('Erro na requisição:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Erro de rede:', error);
    }
});

function displaySuggestions(cities) {
    suggestions.innerHTML = ''; // Limpa as sugestões anteriores

    if (cities.length === 0) {
        const noResults = document.createElement('div');
        noResults.textContent = 'Nenhuma cidade encontrada.';
        suggestions.appendChild(noResults);
        return;
    }

    cities.forEach(city => {
        const item = document.createElement('div');
        item.classList.add('suggestion-item');
        item.textContent = `${city.name}, ${city.region}, ${city.country}`;
        suggestions.appendChild(item);

        // Evento para selecionar uma cidade
        item.addEventListener('click', () => {
            inputCidade.value = city.name;
            suggestions.innerHTML = ''; // Limpa as sugestões
            console.log(city.name);
            fetchData(city.name)
            
        });
    });
}

async function fetchData(cityname) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=15a7b11c178df1b8907b9fa52c536a28&units=metric&lang=pt_br`)
    
        if(!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }
        
        const data = await response.json();        
        showStatus(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}


function showStatus(dados){
    
    const divCidadePrincipal = document.querySelector('.cidade-principal');
    const tituloCidadePrincipal = document.querySelector('.titulo-cidade').innerText = `${dados.name}`;
    const temperaturaPrincipal = document.querySelector('.p-temperatura').innerHTML = `${dados.main.temp.toFixed(1)}ºC`;
    const imgPrincipal = document.querySelector('.imgPrincipal').setAttribute('src', `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`);
    const previsaoPrincipal = document.querySelector('.previsao-primaria').innerHTML = ` ${dados.weather[0].description.toUpperCase()}`;
    const ventoPrincipal = document.querySelector('.vento-primaria').innerText = `Vento: ${dados.wind.speed} KM/H`;

    divCidadePrincipal.classList.remove('off')
    

}

const cidades = ["Sao Paulo", "Rio de Janeiro", "Brasilia", "Porto Alegre"];


async function fetchItemData(cidade) {
    console.log(`$https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=15a7b11c178df1b8907b9fa52c536a28&units=metric&lang=pt_br`)
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=15a7b11c178df1b8907b9fa52c536a28&units=metric&lang=pt_br`);
  if (!response.ok) {
    throw new Error(`Erro ao buscar o item ${item}: ${response.statusText}`);
  }
  return response.json();
}

async function fetchAllItems() {
  try {
    // Mapeia cada item para uma promessa de fetch e espera todas as promessas terminarem com Promise.all
    const data = await Promise.all(cidades.map(fetchItemData));
    console.log("Dados dos itens:", data);

    showStatusSecundaria(data);
  } catch (error) {
    console.error("Erro ao buscar os itens:", error);
  }
}

function showStatusSecundaria(data) {
    const titulo = document.querySelectorAll('.titulo-secundaria');
    const temps = document.querySelectorAll('.temperatura-secundaria');
    const imgs = document.querySelectorAll('.imgSecundaria');
    const previsoes = document.querySelectorAll('.previsao-secundaria');
    const itensHtml = [titulo, temps, imgs, previsoes];
   
    console.log(itensHtml);
    console.log(data);
    console.log(itensHtml[0][0])
    data.forEach((item, index) => {
        
     console.log(item, index)
     if(index == 0) {
     
        titulo[index].innerText = `${item.name}`;
        temps[index].innerText = `${item.main.temp.toFixed(1)}ºC`;
        imgs[index].setAttribute('src', `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`)
        previsoes[index].innerText = ` ${item.weather[0].description.toUpperCase()}`
        
        
     } else if (index == 1) {
        titulo[index].innerText = `${item.name}`;
        temps[index].innerText = `${item.main.temp.toFixed(1)}ºC`;
        imgs[index].setAttribute('src', `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`)
        previsoes[index].innerText = ` ${item.weather[0].description.toUpperCase()}`
     } else if (index == 3) {
        titulo[index].innerText = `${item.name}`;
        temps[index].innerText = `${item.main.temp.toFixed(1)}ºC`;
        imgs[index].setAttribute('src', `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`)
        previsoes[index].innerText = ` ${item.weather[0].description.toUpperCase()}`
     } else {
        titulo[index].innerText = `${item.name}`;
        temps[index].innerText = `${item.main.temp.toFixed(1)}ºC`;
        imgs[index].setAttribute('src', `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`)
        previsoes[index].innerText = `${item.weather[0].description.toUpperCase()}`
     }

    })   

}
// Chama a função para buscar os itens
fetchAllItems();
  




// 15a7b11c178df1b8907b9fa52c536a28

// https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=15a7b11c178df1b8907b9fa52c536a28





// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=15a7b11c178df1b8907b9fa52c536a28