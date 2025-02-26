# Detalhes do Projeto

A ideia do projeto constitui-se em um marcador de pontos no mapa da Universidade de Fortaleza, consumindo a API do Google Maps.

Detalhes da Aplicação:
- A aplicação foi feita usando HTML, CSS, JavaScript e Node Js.
- Adicionar pontos no mapa adicionando a latitude e longitude dos mesmos ou clicando no mapa, capturando a latitude e longitude do local
- Todos os pontos salvos são mostrados em uma tabela abaixo do mapa, permitindo o usuário ir até o ponto clicando no botão "Ir para", ou excluí-lo, clicando em "Excluir"
- Todos os pontos são armazenados em um banco de dados NoSQL (MongoDB) na nuvem através do serviço de armazenamento de banco de dados MongoDB Atlas, permitindo criar, ler e deletar pontos no mapa.



# Como rodar o programa:

1. baixe o projeto localmente, baixando o arquivo zipado ou através do comando **git clone**
	```git
		git clone git@github.com:pleneo/GoogleMapsApiProject.git
	```

2. Certifique-se de possuir o Node Js instalado em sua máquina. Se não possuir, [clique aqui](https://nodejs.org/en/download) para ir à pagina de download

3. Abra uma [janela de terminal](https://medium.com/@adsonrocha/como-abrir-e-navegar-entre-pastas-com-o-prompt-de-comandos-do-windows-10-68750eae8f47) na pasta raiz do projeto e execute o projeto em node, digitando:
	```git
		node server.js
	```

4. Abra seu navegador e digite a url abaixo para acessar o projeto.
	```url
	localhost:3000
	```

obs: _futuramente_ será necessário utilizar sua própria chave API Google Maps e chave para se conectar ao MongoDB Atlas.

