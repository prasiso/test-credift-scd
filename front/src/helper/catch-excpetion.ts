/* eslint-disable @typescript-eslint/no-explicit-any */

export const catchException = (error: any) => {
    let message = '⚠️ Ocorreu um erro inesperado. Estamos trabalhando para resolver o mais rápido possível.'
    const data = error?.response?.data?.message
    if (data && Array.isArray(data))
        message = data.join('\n')
    if (data)
        message = data

    return message
}