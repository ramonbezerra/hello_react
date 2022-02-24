# Lesson 5: Autenticação com o React Router

Nesta aula, vamos praticar a passagem de informações de um componente para outro com o uso de rotas, utilizando da funcionalidade mais comum de aplicações Web, que é a autenticação de usuários. Continuaremos a trabalhar com diferentes componentes em uma Single Page Application por meio da biblioteca React Router (atualizada para a versão 6), através de exemplos simples descritos nos tópicos a seguir.

## Estrutura da aplicação

Nossa aplicação estará estruturada na pasta `/src`, com a evolução do nosso aprendizado dividido em pastas como a resultante desta aula, `/lesson5`. Nessa pasta também estarão os arquivos de estilo e de script principais.

Ao lado da pasta `/src`, nós temos a pasta `/public`, com o arquivo `index.html` e o local onde os scripts farão a renderização do conteúdo.

Logo, a estrutura da nossa aplicação será da seguinte forma:

```text
/documentation
    ...
    - lesson5.md
/public
    - index.html
/src
    /lesson1
    /lesson2
    /lesson3
    /lesson4
    /lesson5
        /hooks
            - useAuth.js
        - About.jsx
        - App.jsx
        - AuthProvider.jsx
        - HomePage.jsx
        - LoginPage.jsx
        - Navbar.jsx
        - PrivateOutlet.jsx
        - PrivateRoute.jsx
        - Search.jsx
    - index.css
    - index.js
- package.json
```

Iremos adotar o formato .jsx a partir desta aula, para diferenciar de futuros arquivos javascript (.js) que não necessariamente são arquivos de componentes React.

Lembre-se de mudar o arquivo `/src/index.js` com o componente `App.js` desta aula.

`/src/index.js`

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './lesson5/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

## Gerenciamento de pacotes e dependências

Nas demonstrações utilizaremos o gerenciador de pacotes [yarn](https://yarnpkg.com/), que opera sobre o [npm](https://www.npmjs.com/) mas você pode utilizar também o próprio npm para instalar as dependências executar ou buildar a aplicação.

O arquivo package.json não sofreu alterações em relação a última aula.

## Ponto de Partida

Este tutorial terá como base a aplicação criada na aula anterior, a qual tem as seguintes páginas: `About`, `HomePage`, `Search`, `NotFound`, além da barra de navegação `Navbar`.

`App.jsx`

```javascript
import About from "./About";
import HomePage from "./HomePage";
import Search from "./Search";
import NotFound from "./NotFound";
import Navbar from "./Navbar";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                
                <Route path="/about" element={<About />}/>  
                
                <Route path="/search" element={<Search />} />  

                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    </div>
);

export default App;
```

Copie os outros arquivos dos componentes citados e salve no novo formato `.jsx`. Eles devem estar presentes de início. Teste todas as possíveis rotas e verifique que estão funcionais para prosseguir.

## Trabalhando com Autenticação

Iremos implementar junto ao React Router a funcionalidade de restringir o acesso a algumas páginas da nossa aplicação, sendo possível através de um formulário de login fictício. Para tanto, iremos simular o acesso a uma API falsa em um componente já utilizado em aulas anteriores, o `LoginPage`, resgatando a implementação que fizemos com validação com Yup.

`LoginPage.jsx`

```javascript
import React from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid'),
  password: Yup.string().required('Required').min(4, 'Too short!').max(10, 'Too long!')
});

const LoginPage = () => {
  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false); // iremos fazer modificações aqui
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

export default LoginPage;
```

Primeiramente nós vamos criar um gerenciador de estado do login/logout do usuário na aplicação, mais precisamente um Pure Component que utiliza de Hooks (veremos esse último conceito mais a frente). Veja no exemplo a seguir:

`/hooks/useAuth.js`

```javascript
import * as React from 'react';

const useAuth = () => {
  const [authed, setAuthed] = React.useState(false);

  const login = () => new Promise(() => {
    setAuthed(true);
    console.log('login', authed);
    setTimeout(() => {
    }, 2000);
  });

  const logout = () => new Promise(() => {
    setAuthed(false);
    console.log('login', authed);
    setTimeout(() => {
    }, 2000);
  });

  return { authed, login, logout };
}

export default useAuth;
```

Note que temos um objeto que é exportado, o qual tem os atributos `authed` (flag que sinaliza que o usuário está autenticado ou não), e duas funções, `login` e `logout`.

Em seguida, para que toda a aplicação utilize esse mecanismo de Hooks do módulo `useAuth`, é preciso criar um Provider [leia mais sobre o assunto aqui](https://oieduardorabelo.medium.com/padr%C3%B5es-em-react-provider-pattern-b520c37ed733), conforme exemplo abaixo.

`AuthProvider.jsx`

```javascript
import React from "react";
import useAuth from "./hooks/useAuth";

const authContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const auth = useAuth();
  
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export { authContext };

export default AuthProvider;
```

Neste componente, além de exportar o componente default, que irá abranger os componentes filhos e autorizar de acordo com a autenticação já feita no hook `useAuth`, estaremos exportando um módulo criado com a ajuda do Context API [leia mais sobre o assunto aqui](https://www.devmedia.com.br/react-js-passando-dados-com-context-api/42904), o `authContext`, que armazena os dados de autenticação, nesse caso, e evita de ficarmos passando-os via `props` toda vez que for necessário.

Dado que temos esse novo componente e módulo à disposição, vamos alterar nossa `Navbar` para conter a função de realizar logout:

`Navbar.jsx`

```javascript
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './AuthProvider';

const Navbar = () => {
  const { authed, logout } = React.useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
        </ul>
        {authed && <button onClick={handleLogout}>Logout</button>}
      </nav>
    </div>
  );
}

export default Navbar;
```

Note que estamos renderizando de maneira condicional o botão de logout, somente se o usuário estiver logado, graças aos dados que serão disponibilizados pela Context API.

Também faremos uso da função `useNavigate` para retornar a página de login quando o usuário sair da aplicação.

## Restringindo rotas

Para restringir as rotas, vamos antes aplicar o `AuthProvider` na estrutura de roteamento de páginas, conforme o exemplo a seguir:

`App.jsx`

```javascript
import About from "./About";
import HomePage from "./HomePage";
import Search from "./Search";
import NotFound from "./NotFound";
import LoginPage from "./LoginPage";
import Navbar from "./Navbar";
import AuthProvider from "./AuthProvider";

import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<About />}/>  
                    
                    <Route path="/search" element={<Search />} />  

                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </div>
);

export default App;
```

Para privar o uso de uma rota iremos criar um componente que decida quando é possível acessar quaisquer das rotas listadas no nosso arquivo principal, dentro do provider, conforme a seguir:

`PrivateRoute.jsx`

```javascript
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authContext } from "./AuthProvider";

const PrivateRoute = ({ children }) => {
    const { authed } = React.useContext(authContext);
    const location = useLocation();

    return authed ? children : <Navigate to="/login" replace state={{ from: location }}/>;
}

export default PrivateRoute;
```

Criado o componente acima, basta englobar qualquer elemento de uma rota, conforme o exemplo:

`App.jsx`

```javascript
import About from "./About";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import Search from "./Search";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    <Route path="/about" element={<About />}/>  
                    
                    <Route path="/search" element={<PrivateRoute><Search /></PrivateRoute>} />  

                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </div>
);

export default App;
```

Porém, para acessar, é necessário que a função da API fictícia esteja implementada, no nosso formulário de login. Para tanto, vamos alterar a função `handleSubmitting` conforme está disposto a seguir:

`LoginPage.jsx`

```javascript
import React  from 'react';
import { Formik, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { authContext } from './AuthProvider';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email('Invalid'),
  password: Yup.string().required('Required').min(4, 'Too short!').max(10, 'Too long!')
});

const LoginPage = () => {
  const { login } = React.useContext(authContext); // that's all!
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from || "/";

  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    login().then(navigate(from, { replace: true }));      
    setTimeout(() => {
      setSubmitting(false);
      console.info(JSON.stringify(values, null, 2));
      setStatus({ isValidating: false });
    }, 3000);
  };

  return (
    // ... Formik Form
  )
};

export default LoginPage;
```

Veja o uso da função login diretamente do hook que implementamos, na forma de destructuring assignment. Como se trata de uma Promise, fazemos uso da função `then` para executar algo assim que a Promise retornar ok e evitar o callback hell.

## Restringindo rotas com nested components

É possível implementar a mesma funcionalidade de restrição de acesso ao componente de forma parcial em relação a recarregamento na tela (o que realmente queremos) com `Outlet`, um componente do React Router. Para tanto, implementaremos algo parecido com o `PrivateRoute`, conforme exemplo a seguir. Veja que, o que muda é somente a ausência do `children` para a inserção do componente `Outlet`.

`PrivateOutlet.jsx`

```javascript
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authContext } from "./AuthProvider";

export default function PrivateOutlet() {
    const { authed } = React.useContext(authContext);
    const location = useLocation();
  
    return authed ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }}/>;
  }
```

Criado o componente acima, basta englobar qualquer rota (e não mais um elemento), conforme o exemplo:

`App.jsx`

```javascript
import About from "./About";
import HomePage from "./HomePage";
import Search from "./Search";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import AuthProvider from "./AuthProvider";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
    <div>
        <BrowserRouter>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/login" element={<LoginPage />}/>

                    <Route element={<PrivateOutlet />}>
                        <Route path="/search" element={<Search />} /> 
                    </Route>

                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    </div>
);

export default App;
```

Chegamos ao fim. A demonstração completa em vídeo está disponível clicando neste link. Bons estudos!
