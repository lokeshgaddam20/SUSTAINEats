async function handleSubmit() {
    const value = document.getElementById('textField').value;
    try {
        const res = await axios.get(`http://localhost:8000/api/foods/search/${value}`)
        console.log(res.data);
        res.data.forEach(food => {
            document.getElementById('output').innerHTML = food.name;
        });
        
    } catch (error) {
        console.error('Error:', error);
    }
}