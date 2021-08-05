const formatedToday = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const MM = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const hh = String(today.getHours() % 12).padStart(2, "0")
    const mm = String(today.getMinutes()).padStart(2, "0");
    const ampm = today.getHours() >= 12 ? "pm" : "am";
    return dd + '/' + MM + '/' + yyyy + " (" + hh + ":" + mm + " " + ampm + ")";
}

export default formatedToday;