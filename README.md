# VigiLeish

Plataforma colaborativa de vigilância epidemiológica focada em leishmaniose.

---

## Índice

- [Sobre](#sobre)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Contato](#contato)

---

## Sobre

O VigiLeish é uma plataforma web que permite o registro anônimo de casos suspeitos de leishmaniose, visualização dos casos em um mapa interativo, consulta em tabelas dinâmicas e acesso a informações educativas sobre a doença. A plataforma visa apoiar a vigilância epidemiológica e a prevenção da leishmaniose, fornecendo dados acessíveis e em tempo real para profissionais de saúde e população.

---

## Funcionalidades

- Registro anônimo de casos suspeitos.
- Visualização de casos em mapa interativo com clusters.
- Consulta e filtragem de registros em tabelas dinâmicas.
- Seção educativa com informações sobre sintomas, prevenção e artigos.
- Integração com Firebase para armazenamento e consulta dos dados.

---

## Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript
- **Mapa:** Leaflet.js + Leaflet MarkerCluster
- **Backend/Database:** Firebase Firestore (compatibilidade com Firebase v10)
- **Fontes:** Google Fonts (Roboto)

---

## Estrutura do Projeto

```
vigileish/
├── assets/              # Imagens, logos
├── css/
│   ├── index.css        # Estilos gerais
│   ├── info.css         # Estilos específicos para info.html
│   ├── map.css          # Estilos específicos para map.html
│   └── tabela.css       # Estilos específicos para pesquisa.html
├── js/
│   ├── firebase-config.js   # Configuração do Firebase
│   ├── map.js               # Script para mapa interativo
│   └── tabela.js            # Script para tabela dinâmica
├── index.html           # Página inicial
├── info.html            # Página de informações educativas
├── map.html             # Página com mapa dos casos
├── pesquisa.html        # Página para consulta dos casos em tabela
└── form.html            # Página para registro de novos casos
```


## Contato

Desenvolvedor: Yriane de Morais\
Email: [yrianeh@gmail.com](mailto:yrianeh@gmail.com)\
GitHub: [https://github.com/seu-usuario](https://github.com/Yriane)

---

Obrigado por usar o VigiLeish! 🮟️🩺
