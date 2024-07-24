export const setNumberPagesArray = (currenPage: number, totalPages: number) => {
    const numbers: string[] = [];
    if (currenPage < totalPages - 3) {
        for (let i = currenPage; i <= currenPage + 2; i++) {
            numbers.push(String(i));
        }
        numbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
            numbers.push(String(i));
        }
    } else {
        for (let i = currenPage - 5; i <= currenPage - 2; i++) {
            numbers.push(String(i));
        }
        numbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
            numbers.push(String(i));
        }
    }
    return numbers;
}