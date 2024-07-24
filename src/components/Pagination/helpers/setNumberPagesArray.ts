export const setNumberPagesArray = (currenPage: number, totalPages: number): string[] => {
  const numbers: string[] = []
  // страницы пагинации если пользователь на первых двух страницах
  if (currenPage < 3) {
    return ['1', '2', '3', '...', String(totalPages - 1), String(totalPages - 2), String(totalPages)]
  }
  // страницы пагинации если пользователь на любой странице кроме последних трех
  if (currenPage < totalPages - 3) {
    for (let i = currenPage - 1; i <= currenPage + 2; i++) {
      numbers.push(String(i))
    }
    numbers.push('...')
    for (let i = totalPages - 2; i <= totalPages; i++) {
      numbers.push(String(i))
    }
    // страницы пагинации если пользователь на последних трех страницах
  } else {
    for (let i = currenPage - 4; i <= currenPage - 2; i++) {
      numbers.push(String(i))
    }
    numbers.push('...')
    for (let i = totalPages - 2; i <= totalPages; i++) {
      numbers.push(String(i))
    }
  }
  return numbers
}
