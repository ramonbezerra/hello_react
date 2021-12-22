# Lesson 1: Primeiros passos

Esta aula trará as configurações iniciais da nossa aplicação Web com o ReactJS como gerenciamento de pacotes, componentização, componentes puros e gerenciamento de estado.

## Estrutura da aplicação

Nossa aplicação estará estruturada na pasta `/src`, com a evolução do nosso aprendizado dividido em pastas como a resultante desta aula, `/lesson1`. Nessa pasta também estarão os arquivos de estilo e de script principais. 

Ao lado da pasta `/src`, nós temos a pasta `/public`, com o arquivo `index.html` e o local onde os scripts farão a renderização do conteúdo. 

Logo, a estrutura da nossa aplicação será da seguinte forma:

```
/documentation
    - lesson1.md
/public
    - index.html
/src
    /lesson1
        - Component.js
    - index.css
    - index.js
- package.json
```

## Gerenciamento de pacotes e dependências

Nas demonstrações utilizaremos o gerenciador de pacotes [yarn](https://yarnpkg.com/), que opera sobre o [npm](https://www.npmjs.com/) mas você pode utilizar também o próprio npm para instalar as dependências executar ou buildar a aplicação.

O arquivo package.json estará configurado inicialmente da seguinte forma (algumas das configurações foram copiadas do [boilerplate create-react-app](https://pt-br.reactjs.org/docs/create-a-new-react-app.html)):

`package.json`
```
{
    "name": "hello_react",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
      "react": "^17.0.1",
      "react-dom": "^17.0.1",
      "react-scripts": "^4.0.0"
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

## Renderizando os primeiros componentes

Nós faremos uso do arquivo `index.js`, colocando com a função render do ReactDOM (uma espécie de DOM virtual que o React gerencia, possibilitando o recarregamento de apenas partes de uma página HTML), interpolando o código JavaScript com o uso de elementos HTML. Vejamos um primeiro exemplo:

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(<h1>Hello, World!</h1>, document.getElementById('root'));
```

Isso renderiza, no elemento com id igual a "root" na página HTML principal, a mensagem 'Hello, World' na forma de um elemento h1. Porém, na prática, o que podemos encontrar é algo do tipo:

`/src/index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Hello from './lesson1/Hello';

ReactDOM.render(<Hello />, document.getElementById('root'));
```

O nosso componente `<Hello />` pode ser construído de uma forma bem simples, como um Function Component (componente puro, sem estado):

`/src/lesson1/Hello.js`
```
const Hello = () => <p>Hello, World!</p>;

export default Hello;
```

Esse é o nosso primeiro componente! Ele também pode ser construído na forma de Class Component (componente dinâmico, com a possibilidade de ter estado):

`/src/lesson1/Hello.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    render() {
      return <p>Hello World!</p>;
    }
}
```

## Componentizando a aplicação

Não para por aí. O propósito do React está em 'componentizar' a aplicação, proporcionando o reuso de código e o gerenciamento dinâmico de conteúdo, seja ele por passagem de propriedades ou guardando estado. 

Primeiro, vamos estruturar um componente pai para todos os outros da nossa aplicação lesson1:

`/src/lesson1/App.js`
```
import Hello from './Hello';

const App = () => (
    <div>
        <Hello />
    </div>;
);

export default App;
```

Então, nosso `index.js` será sempre assim (mudaremos nas próximas aulas apenas a pasta fonte do `App.js`): 

`/src/index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './lesson1/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

Para construir aplicações com conteúdos dinâmicos, vamos construir um novo componente, o `HelloPersonal.js`, um Class Component. Nele, nós vamos guardar uma flag no estado, presente no objeto `state` do construtor, que permitirá a exibição de uma mensagem de boas-vindas mais calorosa à nossa aplicação: 

`/src/lesson1/HelloPersonal.js`
```
import { Component } from 'react';

export default class HelloPersonal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false
        }
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
            </div>
        );
    }

}
```

**Abrindo um parêntese aqui**, esse componente poderia ser escrito como um Functional Component, sem estado (por enquanto!), aproveitando as props, da seguinte forma:

```
const HelloPersonal = props => <p>Hello, {this.props.name}!</p>;

export default HelloPersonal;
```

Se nós quiséssemos passar algumas `props` utilizando do recurso de destructuring assignments, poderíamos fazer da seguinte forma (considere o exemplo de ter duas props: name e lastName):

```
const HelloPersonal = ({name, lastName}) => <p>Hello, {name} {lastName}!</p>;

export default HelloPersonal;
```

Assim, nosso código fica menos verboso, mais elegante e mais fácil de manter.

**Continuando**, não se esqueça de adicionar seu novo componente ao componente principal, passando a propriedade `name` para completar a frase de boas-vindas:

`/src/lesson1/App.js`
```
import Hello from './Hello';
import HelloPersonal from './HelloPersonal';

const App = () => (
    <div>
        <Hello />
        <HelloPersonal name="Joe" />
    </div>;
);

export default Hello;
```

Agora, vamos adicionar à nossa classe uma função que contém a mensagem e adicionar à função de renderização:

`/src/lesson1/HelloPersonal.js`
```
    // class name ...

    // constructor with status ...

    welcomeMessage() {
        return <p>Welcome to Hello React Application!</p>;
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                {this.welcomeMessage()}
            </div>
        );
    }
```

Daí, podemos fazer uso, de fato, da flag `showMessage` que irá ser modificada dinamicamente. Vamos adicionar uma função que irá fazer essa troca, chamando a função `setState` do módulo `Component`:

`/src/lesson1/HelloPersonal.js`
```
    // class name ...

    // constructor with status ...

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    // welcomeMessage function ... 
    
    // render function ... 
```

Com essa função, o valor da flag `showMessage` será modificado para o inverso cada vez que a função `toogleWelcomeMessage` for chamada. Vamos adicionar isso ao evento `onClick` de um botão:

`/src/lesson1/HelloPersonal.js`
```
    // class name ...

    // constructor with status ...

    // toogleWelcomeMessage ...

    // welcomeMessage function ... 
    
    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to show a message!
                </button>
                {this.welcomeMessage()}
            </div>
        );
    }
```

Maravilha! Já teremos algo mais dinâmico na nossa página. Para complementar, vamos aproveitar e colocar uma renderização condicional, fazendo com que a mensagem do botão e a própria mensagem de boas-vindas sejam exibidas a partir do valor da flag `showMessage` (note também o uso de destructuring assignments, reduzindo a verbosidade do código, nas primeiras linhas da função `render()`):

`/src/lesson1/HelloPersonal.js`
```
    // class name ...

    // constructor with status ...

    // toogleWelcomeMessage ...

    welcomeMessage() {
        return (this.state.showMessage && <p>Welcome to Hello React Application!</p>);
    }

    render() {
        const {showMessage} = this.state;
        const {name} = this.props;
        return (
            <div>
                {<p>Hello, {name}!</p>}
                <button onClick={() => this.toogleWelcomeMessage()}>
                   Click to {showMessage ? 'hide' : 'show'} a message! 
                </button>
                {showMessage ? this.welcomeMessage() : null}
            </div>
        );
    }
```

Chegamos ao fim. A demonstração completa em vídeo está disponível clicando [neste link](https://drive.google.com/file/d/1k-uMIr7A10NHycUcpzBiBkhJQBPQxxsT/view?usp=sharing). Bons estudos!
