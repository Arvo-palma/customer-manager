const normalizeString = (text: string) => {
  return text
    .normalize('NFD')
    .replace(/[^a-zA-z0-9 ]/g, '') // Tirar qualquer coisa diferente de letras, numeros e espaço
    .toLowerCase()
}

export default normalizeString
