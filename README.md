
# 🛍️ Digital Store | E-Commerce

Projeto de e-commerce desenvolvido como trabalho final do curso de Desenvolvedor Full Stack. A proposta é construir uma loja virtual funcional, com foco em experiência do usuário, estruturação clara e boas práticas de desenvolvimento web.

## 🎯 Objetivo do Projeto

Criar uma aplicação web de e-commerce onde o usuário pode:

- Visualizar produtos por coleção
- Pesquisar produtos com filtros simples
- Adicionar produtos ao carrinho
- Visualizar pedidos no carrinho através de um modal
- Acessar uma lista de pedidos realizados

---

## 🚀 Tecnologias e Ferramentas Utilizadas

### 🧱 Front-End
- **HTML5**  
- **CSS3**  
- **JavaScript (ES6+)**
- **React**  
  - Uso de componentes reutilizáveis
  - Estrutura modularizada por páginas
- **Tailwind CSS** *(estilização rápida e responsiva)*
- **Lucide React** *(ícones)*
- **ShadCN UI** *(componentes prontos com estilização Tailwind)*

### 🧰 Outros Recursos
- **Vite** *(build tool leve para projetos em React)*
- **Modal com carrinho de compras** (navegação para nova página sendo finalizada)
- **Layout responsivo** planejado para desktop inicialmente, sendo adaptado para outras telas

---

## 🧩 Estrutura da Aplicação

- `index.html` – Ponto inicial do projeto.
- `main.js` – Entrada da aplicação React.
- `app.js` – (Inicialmente usado para lógicas gerais, substituído pela estrutura React).
- `README.md` – Documentação do projeto.
- Páginas:
  - `Home`: com slide, ícones de coleções, produtos organizados por coleção, e oferta especial.
  - `Carrinho`: exibe os pedidos em modal.
  - `Lista de Pedidos`: com os itens já comprados.
  - `Busca de Produtos`: com filtros simples aplicados a uma grade de produtos fixos (15 itens do mesmo produto, exibidos em grid de 3x5).

---

## 📁 Organização do Projeto

```
/public
  index.html

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
  main.js
  App.jsx
  ...
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

---

## 📌 Considerações

- O projeto é focado inicialmente para **uso em desktop**.
- A lógica dos produtos está estática por enquanto (dados "mockados").
- A navegação está sendo feita com React Router.
- O escopo será expandido futuramente para incluir consumo de API, autenticação e mais interações dinâmicas.

---

## 👥 Equipe de Desenvolvimento

| Nome               | GitHub                              
|--------------------|-------------------------------------
| Adriana Cruz       | [@drihcs](https://github.com/drihcs)        
| Letícia Farias     | [@leticiafariasn](https://github.com/leticiafariasn)              
| Sara Soares        | [@sarasmorais](https://github.com/sarasmorais)           

---

## ✨ Próximos Passos

- Integração com backend (cadastro real de produtos e pedidos) no Supabase.
- Autenticação de usuários
- Responsividade plena para dispositivos móveis
- Deploy em ambiente online
