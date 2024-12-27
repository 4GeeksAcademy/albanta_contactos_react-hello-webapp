const response = await fetch('https://playground.4geeks.com/apis/fake/contact/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        full_name: "Nombre",
        email: "email@example.com",
        agenda_slug: "my_agenda",
        address: "Dirección",
        phone: "123-456-7890"
    })
});