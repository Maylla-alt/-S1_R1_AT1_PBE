import jwt from "jsonwebtoken" //Biblioteca para trabalhar com JWt (Json web token)
//JWT -> string codificada que guarda alguns dados do usuário

const ACCESS_SECRET = "access_secret"
const REFRESH_SECRET = "refresh_secret"

// EFETUEI LOGIN, VAI SER GERADO PRA MIM UM TOKEN DE 15 MINUTOS
// PASSOU 15 MINUTOS, O FRONT VAI CHAMAR UMA ROTA DO BACK-END E VAI ENVIAR O REFRESH TOKEN
// ATRAVES DESSE REFRESH É CRIADO UM NOVO TOKEN, QUE VAI DURAR 15 MINUTOS

export function generateAcessToken(payload){
    //sign -> gerar otoken
    //payload -> dados do usuário
    //ACCESS_SECRET -> chave secreta de assinatura
    //expiresIn -> token expira em 15 minutos
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15m" })
}

export function generateAcessToken(payload){
    return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "7d" })
}

export function verifyAcessToken(token){
    return jwt.verify(token, ACCESS_SECRET)
}

export function verifyAcessToken(token){
    return jwt.verify(token, REFRESH_SECRET)
}
