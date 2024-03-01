import jwt from 'jsonwebtoken'


export const verifyToken = ({ authorization, secretKay }: { authorization: any, secretKay: string | undefined }) => {
    try {
        if (!authorization || !secretKay)
            return null
        const token = authorization.split(" ")[1]
        const payload = jwt.verify(token, secretKay);
        return payload
    } catch (error) {
        return null
    }
}
