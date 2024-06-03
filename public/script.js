document.addEventListener('DOMContentLoaded', () => {
    const fetchTeams = () => {
        fetch('/api/teams')
            .then(response => response.json())
            .then(teams => {
                const container = document.getElementById('teams-container');
                container.innerHTML = ''; // Limpiar contenido previo
                teams.forEach(team => {
                    const card = document.createElement('div');
                    card.classList.add('team-card');
                    
                    card.innerHTML = `
                        <h2>${team.nombre}</h2>
                        <p><strong>Fundación:</strong> ${team.fundacion}</p>
                        <p><strong>Estadio:</strong> ${team.estadio}</p>
                        <p><strong>Ciudad:</strong> ${team.ciudad}</p>
                        <p><strong>ID:</strong> ${team.id}</p>
                    `;
                    
                    container.appendChild(card);
                });
            })
            .catch(error => console.error('Error fetching teams:', error));
    };
    
    fetchTeams();
    
    document.getElementById('add-team-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const foundation = document.getElementById('foundation').value;
        const stadium = document.getElementById('stadium').value;
        const city = document.getElementById('city').value;
        
        const newTeam = {
            nombre: name,
            fundacion: foundation,
            estadio: stadium,
            ciudad: city
        };
        
        fetch('/api/teams', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTeam)
        })
        .then(response => response.json())
        .then(data => {
            alert('Team added successfully!');
            fetchTeams();
        })
        .catch(error => console.error('Error adding team:', error));
    });
    
    document.getElementById('delete-team-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const teamId = document.getElementById('team-id').value;
        
        fetch(`/api/teams/${teamId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Team deleted successfully!');
                fetchTeams();
            } else {
                alert('Error deleting team');
            }
        })
        .catch(error => console.error('Error deleting team:', error));
    });
});
