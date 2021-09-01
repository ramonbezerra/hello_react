# Lesson 2: Ciclo de vida no React

Nesta aula, vamos conhecer as etapas de ciclo de vida no React e como usar cada uma das suas funções, gerenciando o estado do componente quando o componente for inicializado pela primeira vez, quando ele precisar ser atualizado e quando precisar ser desmontado, através de exemplos simples descritos nos tópicos a seguir.

## Estrutura da aplicação

Nossa aplicação estará estruturada na pasta `/src`, com a evolução do nosso aprendizado dividido em pastas como a resultante desta aula, `/lesson2`. Nessa pasta também estarão os arquivos de estilo e de script principais. 

Ao lado da pasta `/src`, nós temos a pasta `/public`, com o arquivo `index.html` e o local onde os scripts farão a renderização do conteúdo. 

Logo, a estrutura da nossa aplicação será da seguinte forma:

```
/documentation
    - lesson1.md
    - lesson2.md
/public
    - index.html
/src
    /lesson1
        - App.js
        - Head.js
        - Hello.js
        - HelloPersonal.js
     /lesson2
        - App.js
        - Head.js
        - Hello.js
        - HelloPersonal.js
    - index.css
    - index.js
- package.json
```

Lembre-se de mudar o arquivo `/src/index.js` com o componente `App.js` desta aula.

`/src/index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './lesson2/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Montando um componente

O ciclo de vida de montagem de um novo componente passa pelo construtor e por outros métodos. O construtor de um Class Component irá receber as `props`, valores estáticos passados por um componente pai, além de ser o lugar natural para configurar o estado inicial do próprio componente e outros valores iniciais.

Vamos relembrar o exemplo da aula anterior:

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false
        }
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    welcomeMessage() {
        return (this.state.showMessage && <p>Welcome to Hello React Application!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.welcomeMessage()}
            </div>
        );
    }
}
```

Nós temos no construtor o recebimento das `props`, que nesse caso foi o `name` de quem a aplicação estaria saudando. Temos também o `state`, ou seja, o estado que o componente guarda, que foi a flag `showMessage`, responsável por permitir ou bloquear a exibição de uma mensagem de boas-vindas mais calorosa. Além disso, observe o método `render`, que é o responsável por renderizar o componente na tela.

O primeiro método além do construtor que podemos conhecer é o `getDerivedStateFromProps`, onde é possível definir algo para o objeto `state` antes de renderizar o elemento, sendo possível incluir algo que possa ter vindo das `props` como valor inicial.

Vejamos como funciona esse método colocando um valor padrão para a mensagem e passando um nome como propriedade no mesmo componente `HelloPersonal.js`. Se esse nome não for , a mensagem seria mais genérica.

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {welcomeMessage: "Welcome to Hello React Application, " + props.name};
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <p>{this.state.welcomeMessage}!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
            </div>
        );
    }
}
```

O segundo método que podemos conhecer é o `componentDidMount`, que é chamado após o componente ser renderizado. Vamos conferir um exemplo, no mesmo componente, modificando a mensagem de boas-vindas 5 segundos após ela aparecer.

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name
            });
        }, 5000);
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <p>{this.state.welcomeMessage}!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
            </div>
        );
    }
}
```

## Atualizando um componente

O ciclo de vida de atualização de um componente com o React acontece quando o `state` ou alguma das `props` é modificada. O próprio método `getDerivedStateFromProps` também pode ser considerado como parte dessa etapa do ciclo de vida, desde que tenha alguma prop recebida dinamicamente por um componente pai (mudança de estado neste último).

Vejamos o exemplo abaixo, onde o componente `HelloPersonal.js` terá a sua mensagem de boas-vindas sempre igual a `"Welcome to Hello React Application, " + props.name`, apesar da chamada do método `componentDidMount`:

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {welcomeMessage: "Welcome to Hello React Application, " + props.name};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name
            });
        }, 3000);
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <p>{this.state.welcomeMessage}!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
            </div>
        );
    }
}
```

Um outro método que faz parte é o `shouldComponentUpdate`, onde você pode retornar um valor booleano que especifica se o React deve continuar com a renderização ou não. Como valor default, o método sempre retorna `true`. No nosso componente exemplo, o efeito desse método retornar `false` seria não exibir a mensagem de boas-vindas ao clicar no botão: 

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    shouldComponentUpdate() {
        return false;
    }

    static getDerivedStateFromProps(props, state) {
        return {welcomeMessage: "Welcome to Hello React Application, " + props.name};
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name
            });
        }, 3000);
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <p>{this.state.welcomeMessage}!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
            </div>
        );
    }
}
```

Um outro método nessa etapa do ciclo de vida é o método `componentDidUpdate`, chamado após a atualização do componente no DOM. 

Veja no exemplo abaixo, assim que o componente é atualizado com o método, o método `componentDidUpdate` irá exibir na tela o nome do usuário atual:

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name,
                name: this.props.name
            });
        }, 3000);
    }

    componentDidUpdate() {
        document.getElementById("name").innerHTML = `The actual user is ${this.state.name ?? '...'}`;
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <p>{this.state.welcomeMessage}!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
                <p id="name"></p>
            </div>
        );
    }
}
```

Um outro método nessa etapa do ciclo de vida é o `getSnapshotBeforeUpdate`, que permite acessar os `props` e o `state` antes da atualização, o que significa que mesmo após a atualização, você pode verificar quais eram os valores antes da atualização.

Se o método `getSnapshotBeforeUpdate` estiver presente, você também deve incluir o método `componentDidUpdate`, caso contrário, você obterá um erro.

Vejamos mais um exemplo:

`HelloPersonal.js`
```
import { Component } from 'react';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            name: "empty user",
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        document.getElementById("oldName").innerHTML = 
        "Before the update, the user was " + prevState.name;
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name,
                name: this.props.name
            });
        }, 3000);
    }

    componentDidUpdate() {
        document.getElementById("name").innerHTML = `The actual user is ${this.state.name ?? '...'}`;
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <p>{this.state.welcomeMessage}!</p>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
                <p id="oldName"></p>
                <p id="name"></p>
            </div>
        );
    }
}
```

## Desmontando um componente

O ciclo de vida de desmontagem de um componente passa pelo método `componentWillUnount`, chamado antes do componente ser removido do DOM.

Vejamos no exemplo a seguir:

`WelcomeMessage.js`
```
import { Component } from "react";

export default class WelcomeMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            welcomeMessage: this.props.welcomeMessage
        }
    }

    componentWillUnmount() {
        alert("The welcome message was been removed!");
    }

    render() {
        return (
            <p>{this.props.welcomeMessage}</p>
        );
    }
}
```

`HelloPersonal.js`
```
import { Component } from 'react';
import WelcomeMessage from './WelcomeMessage';

export default class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessage: false,
            name: "empty",
            welcomeMessage: "Welcome to Hello React Application"
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                welcomeMessage: "Welcome, " + this.props.name,
                name: this.props.name
            });
        }, 3000);
    }

    componentDidUpdate() {
        document.getElementById("name").innerHTML = `The actual user is ${this.state.name ?? '...'}`;
    }

    toogleWelcomeMessage() {
        this.setState({
            showMessage: !this.state.showMessage
        });
    }

    showWelcomeMessage() {
        return (this.state.showMessage && <WelcomeMessage welcomeMessage={this.state.welcomeMessage}/>);
    }

    render() {
        return (
            <div>
                <p>Hello, {this.props.name}!</p>
                <button onClick={() => this.toogleWelcomeMessage()}>
                    Click to {this.state.showMessage ? "hide" : "show"} a message!
                </button>
                {this.showWelcomeMessage()}
                <p id="oldName"></p>
                <p id="name"></p>
            </div>
        );
    }
}
```

