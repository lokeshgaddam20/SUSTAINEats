async function submitSearch() {
    const value = document.getElementById('input').value;
    try {
        const res = await axios.get(`http://localhost:8000/api/receipes/search/${value}`)
        console.log(res.data);
        // res.data.forEach(receipe => {
        //     document.createElement('label').textContent = receipe
        // });
        
    } catch (error) {
        console.error('Error:', error);
    }
}