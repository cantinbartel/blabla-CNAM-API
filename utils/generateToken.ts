import jwt from 'jsonwebtoken'

type TokenPayload = {
    araCode: string
    userId: string
}

const generateToken = (payload: TokenPayload) => {
    if (!process.env.JWT_SECRET) {
        return
    }
    // return jwt.sign({ payload }, process.env.JWT_SECRET, {
    //     expiresIn: '30d'
    // })
    console.log('PAYLOAD GENERATE', payload)
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken
