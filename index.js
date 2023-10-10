Object.defineProperty(Array.prototype, 'first', {
    value() {
      return this.find(e => true)     // or this.find(Boolean)
    }
  })

  function Clonar(source) {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i=0; i<source.length; i++) {
            clone[i] = Clonar(source[i]);
        }
        return clone;
    } else if (typeof(source)=="object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = Clonar(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}

  const adjacencyList = {
    'MinhaBiblioteca': ['BibliotecaA', 'BibliotecaB'],
    'BibliotecaA': ['BibliotecaC'],
    'BibliotecaB': [],
    'BibliotecaC': [],
  };

function dfs(graph,startNode){
    let grafo = Clonar(graph)
    let pilha = []
    let predecessor = []
    let visitados = []
    let noAtual = null
    let listaDeDownload = []

    visitados.push(startNode)
    pilha.push(startNode)
    while(pilha.length != 0){
        noAtual = pilha[pilha.length - 1]
        if(grafo[noAtual].length == 0){ 
            visitados.push(noAtual)
            pilha.pop()
            predecessor.push(noAtual)
            predecessor.push("-->")
            predecessor.push(" ")
            predecessor.push(" | ")
            listaDeDownload.push(noAtual)
        }
        for(noVerificado of grafo[noAtual]){
            if(!visitados.includes(noVerificado)){
               pilha.push(noVerificado)
               visitados.push(noAtual)
               predecessor.push(noAtual)
               predecessor.push("-->")
               predecessor.push(noVerificado)
               predecessor.push(" | ")
               break
            }
            if(noVerificado == grafo[noAtual][grafo[noAtual].length - 1]){
                visitados.push(noAtual)
                pilha.pop()
                if(!listaDeDownload.includes(noAtual)){
                    listaDeDownload.push(noAtual)
                }
            }
        }
        
    }
    console.log(listaDeDownload)
}
dfs(adjacencyList,'MinhaBiblioteca')