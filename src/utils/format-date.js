export default function formatDate(date) {
    const month = Number(date.$M) + 1;
    const year = date.$y;
    const day = date.$D;
    const dateFormat = `${month}/${day}/${year}`;

    return dateFormat;
}
