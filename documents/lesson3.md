# Lesson 3: Formulários com o React

Nesta aula, vamos conhecer uma forma simples de construir formulários com React e como usar esquemas de validação de forma dinâmica, visualizando a diferença entre o uso de frameworks adicionais como o Yup com funções manuais de validação, através de exemplos simples descritos nos tópicos a seguir.

## Estrutura da aplicação

Nossa aplicação estará estruturada na pasta `/src`, com a evolução do nosso aprendizado dividido em pastas como a resultante desta aula, `/lesson3`. Nessa pasta também estarão os arquivos de estilo e de script principais. 

Ao lado da pasta `/src`, nós temos a pasta `/public`, com o arquivo `index.html` e o local onde os scripts farão a renderização do conteúdo. 

Logo, a estrutura da nossa aplicação será da seguinte forma:

```
/documentation
    - lesson1.md
    - lesson2.md
    - lesson3.md
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
    /lesson3
        - App.js
        - ControlledForm.js
        - FormikForm.js
        - FormLevelValidation.js
        - FormYupValidation.js
        - PlainForm.js
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
import App from './lesson3/App';

ReactDOM.render(<App />, document.getElementById('root'));
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
      "axios": "^0.21.0",
      "formik": "^2.2.5",
      "react": "^17.0.1",
      "react-dom": "^17.0.1",
      "react-scripts": "^4.0.0",
      "react-router-dom": "^5.2.0",
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

## Formulários Simples

Os formulários são mecanismos de interação do usuário com a página, pelos quais o mesmo pode enviar dados, que precisam ser consultados. A maneira mais conveniente de conseguir isso é usando componentes não controlados, sem usar o React para alterar o valor do campo de entrada, deixando essa tarefa para o navegador. Assim, manteremos referências separadas aos elementos DOM que podemos utilizar para manipular e ler os elementos. Veja essa tarefa sendo executada no exemplo a seguir:  

`PlainForm.js`
```
import React, { Component } from 'react';

export default class PlainForm extends Component {
    constructor(props) {
        super(props);

        this.email = null;
        this.password = null;

        this.setEmailRef = element => { this.email = element; };
        this.setPasswordRef = element => { this.password = element; };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.info('email: ', this.email.value);
        console.info('password: ', this.password.value);
    }
    
    render() {
        return (
            <form noValidate={true} onSubmit={(e) => this.handleSubmit(e)}>
                <label>
                    Email:
                    <input type="text" name="email" ref={this.setEmailRef}/>
                </label>
                <label>
                    Senha:
                    <input type="password" ref={this.setPasswordRef}/>
                </label>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}
```

O formulário acima recebe dois valores, `email` e `password`, e, ao clicar no botão para submeter esses valores, eles serão capturados pelo evento de submissão e estarão armazenados nos atributos da classe `email` e `password` e serão exibidos no console. Dessa forma, o desenvolvedor está preocupado apenas com o resultado final do formulário, o que nem sempre é praticável, dado a necessidade de implementar validações nos valores dos campos.

Para que esse formulário esteja disponível na tela, basta adicioná-lo no arquivo principal:

`App.js`
```
import PlainForm from './PlainForm';

const App = () => <PlainForm />;

export default App;
```

## Formulário Controlado

Se antes trabalhamos com o formulário sem a intervenção do React, dessa vez usaremos o `state` para guardar os valores dos campos `email` e `password`, conforme exemplo a seguir:

`ControlledForm.js`
```
import React, { Component } from 'react';

export default class ControlledForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '', password: ''
        };
    }

    handleOnEmailChange = (e) => {
        this.setState({ email: e.target.value });
    }

    handleOnPasswordChange = (e) => {
        this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert('Email: ' + this.state.email);
    }
    
    render() {
        const { email, password } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input type="text" name="email" value={email} onChange={this.handleOnEmailChange}/>
                </label>
                <label>
                    Senha:
                    <input type="password" value={password} onChange={this.handleOnPasswordChange}/>
                </label>
                <input type="submit" value="Login"/>
            </form>
        );
    }
}
```

Note, porém, que é necessário atribuir uma função relacionada ao evento, antes capturado pelo navegador, de mudança de valores, `onChange`, para cada campo, como nas funções `handleOnEmailChange` e `handleOnPasswordChange`.

Para que esse formulário esteja disponível na tela, basta adicioná-lo no arquivo principal:

`App.js`
```
import PlainForm from './PlainForm';
import ControlledForm from './ControlledForm';

const App = () => <ControlledForm />;

export default App;
```

## Conhecendo o Formik

Pode não parecer necessário trabalhar com uma dependência externa para um formulário como esse de login, por exemplo. Pense, porém, em um formulário complexo, com mais de uma dezena de campos, com validações dinâmicas para implementar. Já pensou na quantidade de funções só para capturar os valores que seriam necessárias?

Para resolver esse problema temos o Formik. É o framework mais utilizado pelos desenvolvedores React por ser fácil de integrar, de entender e de configurar, abstraindo de forma declarativa os conceitos já conhecidos dos formulários e trabalhando lado a lado com os controles do React.

Vejamos um primeiro exemplo no arquivo a seguir:

`FormikForm.js`
```
import { Formik } from 'formik';
import React from 'react';

const FormikForm = () => {
    const handleSubmitting = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.info(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmitting}>
            {({values, handleChange, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                            <input type="text" name="email" value={values.email}
                            onChange={handleChange} />
                    </label>
                    <label>
                        Password:
                            <input type="password" name="password" value={values.password}
                            onChange={handleChange} />
                    </label>
                    <input type="submit" value="Login" disabled={isSubmitting} />
                </form>
            )}
        </Formik>
    );
}

export default FormikForm;
```

De cara percebemos que há muitos conceitos abstraídos, porém é mais simples de entender quando visualizamos que o formulário HTML está contido no componente `Formik`, que configura os valores iniciais dos campos, uma função de manipulação de submissão do formulário, e, na forma de destructuring assingments, esses valores, juntamente com as funções que seriam escritas na mão, como `handleChange` e `handleSubmit`.

Note que também ficou mais simples configurar uma espécie de delay para simular que os valores estão indo para um servidor, desabilitando o botão de Login enquanto isso acontece.

Para que esse formulário esteja disponível na tela, basta adicioná-lo no arquivo principal:

`App.js`
```
import PlainForm from './PlainForm';
import ControlledForm from './ControlledForm';
import FormikForm from './FormikForm';

const App = () => <FormikForm />;

export default App;
```

## Inserindo Validações Manualmente

Continuando com o Formik, vamos elevar um pouco o nível e inserir validações nos campos, tornando-os obrigatórios. Porém, com o que conhecemos até agora, independentemente de usarmos o Formik, cada validação exige uma função escrita manualmente e declarada em cada campo, que, para facilitar, estamos usando os componentes `Field` e `ErrorMessage` do próprio Formik.

Vejamos isso no exemplo a seguir:

`FormLevelValidation.js`
```
import { Formik, Field, ErrorMessage } from 'formik';

const FormLevelValidation = () => {
    const validateEmail = (value) => {
        let error;
        if (!value) {
            error = 'Email is Required';
        }
        return error;
    }

    const validatePassword = (value) => {
        let error;
        if (!value) {
            error = 'Password is Required';
        }
        return error;
    }

    const handleSubmitting = (values, { setSubmitting }) => {
        setTimeout(() => {
            console.info(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleSubmitting}
            >
            {({handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <Field type="text" name="email"
                                validate={validateEmail}
                                onBlur={handleBlur}
                                onChange={handleChange}
                        />
                        <ErrorMessage name="email"/>
                    </label>
                    <br />
                    <br />
                    <label>
                        Password:
                        <Field type="password" name="password"
                                validate={validatePassword}
                                onBlur={handleBlur}
                                onChange={handleChange}
                        />
                        <ErrorMessage name="password"/>
                    </label>
                    <br />
                    <br />
                    <input type="submit" value="Login" disabled={isSubmitting} />
                </form>
            )}
        </Formik>
    );
}

export default FormLevelValidation;
```

Note que precisamos avaliar mais um evento, `onBlur`, que, basicamente, verifica se o usuário clicou no campo e saiu. Se estivéssemos trabalhando com o formulário HTML nativo somente, seria necessário, assim como o evento `onChange`, escrever funções para cada campo onde fosse necessário avaliar esse evento também.

Para que esse formulário esteja disponível na tela, basta adicioná-lo no arquivo principal:

`App.js`
```
import PlainForm from './PlainForm';
import ControlledForm from './ControlledForm';
import FormikForm from './FormikForm';
import FormLevelValidation from './FormLevelValidation';

const App = () => <FormLevelValidation />;

export default App;
```

## Esquemas de Validação com Yup

Por fim, vejamos que trabalhar com mais de uma validação nos campos pode se tornar um problema: nem sempre o evento te dará a informação necessária, sendo necessário configurar mais funções ou eventos adicionais. Veja o exemplo a seguir:

`FormYupValidation.js`
```
import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';

function validateName(value) {
  let error;
  if (!value) {
    error = 'Email is Required';
  }
  return error;
}

function validatePassword(value) {
  let error;
  if (!value) {
    error = 'Password is Required';
  }
  if (value.length < 8) {
    error = 'Min length of Password is 8 chars';
  }
  return error;
}

const FormYupValidation = () => {
  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
  };

  return (
    <Formik
      initialValues={{ email: '', password: ''}}
      onSubmit={handleSubmitting}
    >
      {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit}>
          <label>
            E-mail*:
            <Field type="text" name="email"
                   onBlur={handleBlur}
                   validate={validateName}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="email" className="error" component="span"/>
          <br/><br/>
          <label>
            Password*:
            <Field type="password" name="password"
                   onBlur={handleBlur}
                   validate={validatePassword}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="password" className="error" component="span" />
          <br/><br/>
          <input type="submit" value="Login" disabled={isSubmitting}/>
        </form>
      )}
    </Formik>
  )
};

export default FormYupValidation;
```

Além do fato de escrever funções para validações dos campos, a quantidade de condições pode deixar o código mais verboso e difícil de manter. 

Para que esse formulário esteja disponível na tela, basta adicioná-lo no arquivo principal:

`App.js`
```
import PlainForm from './PlainForm';
import ControlledForm from './ControlledForm';
import FormikForm from './FormikForm';
import FormLevelValidation from './FormLevelValidation';
import FormYupValidation from './FormYupValidation';

const App = () => <FormYupValidation />;

export default App;
```

Para facilitar essa tarefa, você pode usar o `Yup`, um framework de validação de dados em formulários HTML, que basicamente oferece a possibilidade de montar esquemas de validação, que podem ser fornecidos ao componente `Formik` por meio do atributo `validationSchema`, como no exemplo abaixo:

`FormYupValidation.js`
```
import React  from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid'),
  password: Yup.string().required('Required').min(4, 'Too short!').max(10, 'Too long!')
});

const FormYupValidation = () => {
  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
  };

  return (
    <Formik
      validationSchema={LoginSchema}
      initialValues={{ email: '', password: ''}}
      onSubmit={handleSubmitting}
    >
      {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
        <form onSubmit={handleSubmit}>
          <label>
            E-mail*:
            <Field type="text" name="email"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="email" className="error" component="span"/>
          <br/><br/>
          <label>
            Password*:
            <Field type="password" name="password"
                   onBlur={handleBlur}
                   onChange={handleChange}/>
          </label>
          <ErrorMessage name="password" className="error" component="span" />
          <br/><br/>
          <input type="submit" value="Login" disabled={isSubmitting}/>
        </form>
      )}
    </Formik>
  )
};

export default FormYupValidation;
```

Chegamos ao fim. A demonstração completa em vídeo está disponível clicando [neste link](https://drive.google.com/file/d/1nxXXmAsiG462i-yo1nclrWHPh8Kr3CpW/view?usp=sharing). Bons estudos!