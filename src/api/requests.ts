export const getMeters = async () => {
    const response = await fetch(' http://showroom.eis24.me/api/v4/test/meters/?limit=10')
    const data = await response.json();
    return data
}

export const getAddress = async () => {
    const response = await fetch('http://showroom.eis24.me/api/v4/test/areas/')
    const data = await response.json();
    return data
}