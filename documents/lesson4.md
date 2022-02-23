# Lesson 4: Rotas de Aplicações com o React

Nesta aula, vamos conhecer uma forma simples e robusta de mapear os caminhos fornecidos no navegador para a exibição de diferentes componentes em uma Single Page Application por meio da biblioteca React Router (atualizada para a versão 6), através de exemplos simples descritos nos tópicos a seguir.

## Estrutura da aplicação

Nossa aplicação estará estruturada na pasta `/src`, com a evolução do nosso aprendizado dividido em pastas como a resultante desta aula, `/lesson4`. Nessa pasta também estarão os arquivos de estilo e de script principais.

Ao lado da pasta `/src`, nós temos a pasta `/public`, com o arquivo `index.html` e o local onde os scripts farão a renderização do conteúdo.

Logo, a estrutura da nossa aplicação será da seguinte forma:

```text
/documentation
    - lesson1.md
    - lesson2.md
    - lesson3.md
    - lesson4.md
/public
    - index.html
/src
    /lesson1
    /lesson2
    /lesson3
    /lesson4
        - About.js
        - App.js
        - Homepage.js
        - Navbar.js
        - Search.js
        - NotFound.js
    - index.css
    - index.js
- package.json
```

Lembre-se de mudar o arquivo `/src/index.js` com o componente `App.js` desta aula.

`/src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './lesson4/App'; // modifique aqui

ReactDOM.render(<App />, document.getElementById('root'));
```

## Gerenciamento de pacotes e dependências

Nas demonstrações utilizaremos o gerenciador de pacotes [yarn](https://yarnpkg.com/), que opera sobre o [npm](https://www.npmjs.com/) mas você pode utilizar também o próprio npm para instalar as dependências executar ou buildar a aplicação.

O arquivo package.json estará configurado inicialmente da seguinte forma (algumas das configurações foram copiadas do [boilerplate create-react-app](https://pt-br.reactjs.org/docs/create-a-new-react-app.html)):

`package.json`

```json
{
    "name": "hello_react",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "axios": "^0.21.0",
      "formik": "^2.2.5",
      "react": "^17.0.1",
      "react-dom": "^17.0.1",
      "react-scripts": "^4.0.0",
      "react-router-dom": "^6.2.1",
      "yup": "^0.30.0"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test",
      "eject": "react-scripts eject"
    },
    "eslintConfig": {
      "extends": [
        "react-app",
        "react-app/jest"
      ]
    },
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
  }
```

## Entendendo o roteamento no browser

Os navegadores possuem APIs de histórico de navegação e localização, que permitem que o código JavaScript inspecione o local e o caminho atuais e extraia diferentes tipos de informações, permitindo que os desenvolvedores descubram os caminhos de navegação em um site e os manipulem adequadamente.

Usando dessas APIs, a Location API, veja o exemplo abaixo de um componente que mostra como manipular, manualmente, três propriedades: a propriedade `window.location.href`, que exibirá o URL completo, incluindo o protocolo e o nome do domínio, a propriedade `window.location.pathname` conterá o caminho da página, e a propriedade `window.location.search`, contendo os parâmetros de pesquisa.

`App.js`

```javascript
const App = () => (
    <div>
        <h1>Example Router</h1>
        <hr/>
        <p>href: {window.location.href}</p>
        <p>path: {window.location.pathname}</p>
        <p>search: {window.location.search}</p>

        <hr/>
    </div>
);

export default App;
```

Tente digitar várias URLs em seu navegador, como `http://localhost:3000/about` ou `http://localhost:3000/foo`, ou ainda `http:localhost:3000/search?q=lorem` e veja o resultado no seu componente, com a exibição do caminho completo em `href`, do caminho específico da página em `pathname` e dos parâmetros de pesquisa em `search`.

Porém, nossa página não varia os componentes de acordo com o caminho que passamos. Para ilustrar um exemplo de troca de componentes em uma Single Page Application, vamos implementar uma função `RouteTo`, que basicamente recebe o path e mapeia a troca de página com base em duas possibilidades: se o usuário passar `/about`, será exibida uma página com o componente `About`, e qualquer outra coisa diferente disso, será exibida uma página com o componente `Homepage`.

Essa implementação está no exemplo a seguir:

`App.js`

```javascript
import About from "./About";
import Homepage from "./Homepage";

const RouteTo = path => {
    const paths = path.split('/').map(p => p.toLowerCase()).slice(1);

    switch (paths[0]) {
        case 'about':
            return <About />;
        default:
            return <Homepage />
    }
};

const App = () => (
    <div>
        <h1>Example Router</h1>
        <hr/>
        <p>href: {window.location.href}</p>
        <p>path: {window.location.pathname}</p>        
        <p>search: {window.location.search}</p>

        <hr/>
    
        {RouteTo(window.location.pathname)}
    </div>
);

export default App;
```

Implemente também os componentes abaixo:

`About.js`

```javascript
const About = () => (
    <div className="About">
        <h1>About Page</h1>
        <hr />
        <p>Information about your app or who you are would go here.</p>
    </div>
);

export default About;
```

`Homepage.js`

```javascript
const Homepage = () => (
    <div className="Homepage">
        <h1>Homepage</h1>
        <hr />
        <p>This is our homepage.</p>
    </div>
);

export default Homepage;
```

Faça novametne o teste em seu navegador, digitando as rotas `http://localhost:3000/about` e `http://localhost:3000/home`.

## Trabalhando com React Router

O React Router, conforme apresentado no início, é uma biblioteca com uma proposta simples e ao mesmo tempo robusta de trabalhar com roteamento de páginas de Single Page Applications, fornecendo vários mecanismos integrados diferentes para roteamento para componentes, tratamento de rotas padrão e de erro e ainda mais funcionalidades detalhadas, como lidar com autenticação.

Para trabalhar com a biblioteca, iremos importar no nosso arquivo principal o componente `BrowserRouter`. Este é o componente de nível superior dentro do qual precisamos envolver nosso código roteável. A seguir, importaremos o `Routes`, que irá funcionar da mesma maneira que a instrução switch usada no primeiro exercício. Isso inclui todas as decisões de rota que precisam ser feitas durante a construção de um aplicativo. Por fim, construiremos as rotas com o componente `Route`, semelhante a cada uma das declarações de caso no bloco switch do exemplo anterior. Cada rota indica um caminho para capturar e renderizar um determinado componente ou bit de código JSX.

Veja a aplicação dos componentes citados, modificando um pouco o arquivo principal desta aula, conforme exemplo a seguir:

`App.js`

```javascript
import About from "./About";
import Homepage from "./Homepage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                
                <Route path="/about" element={<About />}/>
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
```

Note que temos realmente algo semelhante a instrução switch da função `RouteTo`, decidindo qual componente é renderizado com base no caminho da rota. Porém, a ordem das rotas dentro do componente `Routes` é estritamente importante: o programa começará a combinar as rotas, de cima para baixo, e retornará a primeira rota aplicável. Isso significa que se você tiver a rota padrão `/` acima da rota `/about`, então você nunca será capaz de alcançar a rota `/about`. Portanto, devemos ter cuidado ao definir a ordem desses componentes.

## Tratando com parâmetros de pesquisa

É comum filtrar resultados de busca em páginas da Web, e, para trabalhar com esses dados, é preciso observar o que virá na rota após o símbolo `?`, como, por exemplo, `http:localhost:3000/search?q=lorem&q2=ipsum`. Nessa rota, poderíamos selecionar o dado `lorem` através do parâmetro `q` e o dado `ipsum` através do parâmetro `q2`.

Para resolver esse problema, trabalharemos com o módulo `useLocation` do `react-router-dom`, que nos permite capturar esses dados, os parâmetros de pesquisa, montando um novo componente, `Search`, com alguns itens mockados para simular uma pesquisa, efetivada na função `doSearch`, conforme o arquivo a seguir:

`Search.js`

```javascript
import { useLocation } from 'react-router-dom';

const Items = [
    'Lorem Ipsum',
    'Ipsum Dipsum',
    'Foo Bar',
    'A little black cat',
    'A lazy fox',
    'A jumping dog'
];

const doSearch = term => {
    if (!term) {
        return Items;
    }

    return Items.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) !== -1);
};

const Search = props => {
    const query = new URLSearchParams(useLocation().search);
    const term = query.get('q');
    const returned = doSearch(term);

    return (
        <div>
            <h1>Search Page</h1>
            <hr />
        Found results for {term}:
            <ul>
                {returned.map(t => (<li key={t}>{t}</li>))}
            </ul>
        </div>
    );
};

export default Search;
```

Note o uso da constante `query` com a informação dos parâmetros de pesquisa, e na constante `term` o valor que queremos para filtrar, que virá do parâmetro `q`.

Agora podemos utilizar o componente no nosso arquivo principal:

`App.js`

```javascript
import About from "./About";
import Homepage from "./Homepage";
import Search from "./Search";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                
                <Route path="/about" element={<About />}/>  
                
                <Route path="/search" element={<Search />} />  
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
```

Teste em seu navegador `http:localhost:3000/search?q=lorem` ou `http:localhost:3000/search?q=lazy` e veja o resultado.

## Inserindo o componente "Not Found"

Aproveitando a configuração das páginas com `Routes` e `Route`, podemos filtrar facilmente com a adição de algumas configurações nos componentes `Route`: primeiro, trazer a página inicial para o topo com o atributo `exact`, e, ao fim da lista de rotas possíveis, adicionar um componente default com o `path` configurado como qualquer coisa, com o símbolo `*`.

Vejamos isso no exemplo a seguir:

`NotFound.js`

```javascript
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div>
        <h1>404 - Component Not Found</h1>
        <Link to="/">Return to Home</Link>
    </div>
);

export default NotFound;
```

`App.js`

```javascript
import About from "./About";
import Homepage from "./Homepage";
import Search from "./Search";
import NotFound from "./NotFound";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage />}/>
                
                <Route path="/about" element={<About />}/>  
                
                <Route path="/search" element={<Search />} />  

                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
```

## Adicionando uma barra de navegação

Até aqui configuramos a nossa página apenas acessando as rotas ao digitar na barra de endereços. Vamos configurar um novo componente, `Navbar`, uma barra com os links da nossa aplicação, usando o componente `Link` da biblioteca `react-router-dom`. Veja um exemplo simples no arquivo abaixo:

`Navbar.js`

```javascript
import { Link } from 'react-router-dom';

const Navbar = () => (
    <div className="Navbar">
        <Link to="/">Home</Link>
      &nbsp;
        <Link to="/about">About</Link>
    </div>
);

export default Navbar;
```

Agora podemos adicionar este componente na nossa estrutura de roteamento do arquivo principal, no mesmo nível do componente `BrowserRouter`:

`App.js`

```javascript
import About from "./About";
import Homepage from "./Homepage";
import Search from "./Search";
import NotFound from "./NotFound";
import Navbar from "./Navbar";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />}/>
                
                <Route path="/about" element={<About />}/>  
                
                <Route path="/search" element={<Search />} />  

                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
```

Chegamos ao fim. A demonstração completa em vídeo está disponível clicando [neste link](https://drive.google.com/file/d/1dZcWaDRK9yLZJzG-Upc65zr9f0BuLAs7/view?usp=sharing). Bons estudos!
