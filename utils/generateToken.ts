import jwt from 'jsonwebtoken'

const generateToken = (araCode: string) => {
    if (!process.env.JWT_SECRET) {
        return
    }
    return jwt.sign({ araCode }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken
