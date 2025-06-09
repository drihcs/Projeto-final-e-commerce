
# 🛍️ Digital Store | E-Commerce

Projeto de e-commerce desenvolvido como trabalho final do curso de Desenvolvedor Full Stack. A proposta é construir uma loja virtual funcional, com foco em experiência do usuário, estruturação clara e boas práticas de desenvolvimento web.

## 🎯 Objetivo do Projeto

Este projeto tem como objetivo oferecer uma loja virtual funcional que permita aos usuários realizar as seguintes ações:

- Visualizar produtos por coleção
- Pesquisar produtos com filtros simples
- Adicionar produtos ao carrinho
- Visualizar pedidos no carrinho através de um modal
- Acessar uma lista de pedidos realizados

---

## 🚀 Tecnologias e Ferramentas Utilizadas

### 🧱 Front-End
- **HTML5**  
- **CSS3** *(com CSS Modules para estilização isolada)*
- **JavaScript (ES6+)**
- **React**  
  - Uso de componentes reutilizáveis  
  - Estrutura modularizada por páginas
- **Lucide React** *(ícones)*
- **Modal com carrinho de compras*  
- **React Router** *(navegação entre páginas)*

### 🧰 Back-End e Deploy
- **Supabase** *(banco de dados e autenticação)*
- **Vercel** *(deploy e preview online)*
- **Vite** *(build tool leve para projetos em React)*

---

## 🧩 Estrutura da Aplicação

```plaintext
/public
  index.html
  /assets
    home.png
    search.png
    cart-modal.png
    login.png

/src
  /components
    Header.jsx
    Footer.jsx
    ProductCard.jsx
    ModalCart.jsx
    ...
  /pages
    Home.jsx
    Search.jsx
    Cart.jsx
    Orders.jsx
    Login.jsx
  main.js
  App.jsx
README.md
```

---

## 🧪 Funcionalidades Implementadas

- [x] Slide rotativo com imagem destaque  
- [x] Ícones de navegação por coleções  
- [x] Grade de produtos  
- [x] Modal com visualização do carrinho  
- [x] Página de busca com filtros simples  
- [x] Página com lista de pedidos  
- [x] Tela de login integrada ao Supabase  

---

## 📸 Preview da Aplicação

| Página Inicial          | Página de Busca            |
|------------------------|---------------------------|
| ![Página Home](public/assets/home.png) | ![Busca de produtos](public/assets/search.png) |

| Modal do Carrinho       | Tela de Login              |
|------------------------|---------------------------|
| ![Carrinho](public/assets/cart-modal.png) | ![Login](public/assets/login.png) |

> As imagens acima mostram as telas principais da aplicação, ilustrando a interface e funcionalidades em ação.

---

## 🎨 Protótipo de Design (Figma)

O layout da aplicação foi planejado com base em um protótipo visual, para guiar a estrutura e identidade do projeto.

🔗 [Visualizar protótipo no Figma](https://www.figma.com/file/SEU-LINK-AQUI/DigitalStore)

> *Nota: O design final pode conter adaptações feitas durante o desenvolvimento para melhor responsividade e usabilidade.*

---

## 👥 Equipe de Desenvolvimento

| Nome           | GitHub                                         |
|----------------|------------------------------------------------|
| Adriana Cruz   | [@drihcs](https://github.com/drihcs)          |
| Letícia Farias | [@leticiafariasn](https://github.com/leticiafariasn) |
| Sara Morais    | [@sarasmorais](https://github.com/sarasmorais) |

---

## ✨ Próximos Passos

1. Integração completa com Supabase para cadastrar produtos e pedidos  
2. Finalizar autenticação de usuários com redirecionamentos  
3. Tornar o layout responsivo para dispositivos móveis  
4. Criar página de detalhes dos produtos  
5. Otimização e testes

---

## 🌐 Deploy Online

🔗 [Acesse o projeto no Vercel](https://digitalstore.vercel.app) *(substitua com o link real)*

---

## 🏃‍♂️ Como rodar localmente

Se desejar rodar o projeto localmente, siga os passos abaixo:

```bash
git clone https://github.com/drihcs/digital-store.git
cd digital-store
npm install
npm run dev
```

---
