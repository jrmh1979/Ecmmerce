
//genera un objeto verifica y autoriza el token
const getConfig = () => {
    return {
                headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                } 
            }
}

export default getConfig