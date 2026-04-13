export function validarCamposObrigadorios(produto){
    const camposObrigadorios = ["nome", "preco", "descricao"]
    const camposFaltando = []

    camposObrigadorios.forEach((campo)=>{
        if(produto[campo] === undefined ||
            produto[campo] === null || 
            produto[campo].toString().trim()===""){

            camposFaltando.push(campo)

        }
    })

    if(camposFaltando.length > 0){
        //.join() -> É utilizado pra junta, transformar todos os elementos do array
        //em uma única string!
        //const frutas = ["Maça", "Banana", "Uva"]
        //console.log(frutas.join()) -> Maça, Banana, Uva
        //.join(" - ")
        throw new Error(`Campos obrigatorios não preenchidos: ${camposFaltando.join(", ")}`)
    }
}

export function validarPreco(produto){
    //!==  -> Diferente
    //typeof -> Determina o tipo do dado
    if(typeof produto.preco !== "number" || produto.preco <= 0){
        throw new Error("Preço deve ser um número maior que zero")
    }
}

export function validarEstoque(produto){
    if(produto.estoque === null || produto.estoque < 0){
        throw new Error("Estoque não pode ser negativo")
    }
}