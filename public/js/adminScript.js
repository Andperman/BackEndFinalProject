if (document.getElementById('refreshOffers')) {
    let refreshOffers = document.getElementById('refreshOffers');
    refreshOffers.addEventListener('click', async () => {
        await fetch('api/joboffers/scrapSave', {
            method: 'POST'
        })
    })
}
if (document.getElementById('formNewOffer')) {
    let addOffers = document.getElementById('formNewOffer');
    addOffers.addEventListener('submit', async (event) => {
        event.preventDefault();
        let dateToday = Date.now();
        var date = new Date(dateToday).toLocaleDateString();
        let title = event.target.elements.title.value;
        let description = event.target.elements.description.value;
        let website = event.target.elements.website.value;
        await fetch('/api/joboffers/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: `${title}`,
                description: `${description}`,
                date: `${date}`,
                website: `${website}`,
                createdBy: "admin" //siempre son admin si vienen de este form. Esta solución nos ayuda internamente para filtrar offers
            }
        )}

    )}
)}