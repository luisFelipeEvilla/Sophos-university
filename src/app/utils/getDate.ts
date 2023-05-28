export const getDate = (stringDate: string) => {
    const date = new Date(stringDate);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    console.log(`${year}-${month}-${day}`)
    return `${year}-${month}-${day}`;
}
