async function getApiGitHub(username) {
    
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
            throw new Error(userResponse.status);
        }

        const userData = await userResponse.json();

        const mainCard = `
            <main id="${username}" class="w-1/4 h-3/5 py-10 px-10 border-b-2 border-slate-400 rounded">
                <header>
                    <div class="head">
                        <img class="rounded h-64 w-full" src="../fundo.webp" alt="background">
                    </div>
                </header>
                <article class="flex flex-wrap justify-center text-center">
                    <img class="rounded-full absolute -mt-24 border-8 border-white" width="150" src="${userData.avatar_url}" alt="profile picture">
                    <div class="py-14 h-16">
                        <p class="text-2xl">${userData.name}</p>
                        <span class="text-slate-600">@${userData.login}</span>
                    </div>
                </article>
                <nav class="py-10">
                    <p><strong>REPOSITÓRIOS</strong></p>
                </nav>
                <div class="repos"></div>
            </main>`;

        cartoes.innerHTML += mainCard;

        const card = document.getElementById(username);
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        if (!reposResponse.ok) {
            throw new Error(reposResponse.status);
        }

        const reposData = await reposResponse.json();
        const reposContainer = card.querySelector('.repos');

        reposData.forEach(repo => {
            const project = `
                <section class="px-5 my-4 h-24 rounded">
                    <strong>${repo.name}</strong>
                    <p>${repo.description || ''}</p>
                    <span class="bg-zinc-400 rounded px-4"><strong>#${repo.language || 'N/A'}</strong></span>
                </section>`;
            reposContainer.innerHTML += project;
        });

        console.log(reposData);
    } catch (error) {
        console.error('Error:', error);
    }
}

const input = document.querySelector("[input]");
const btn = document.querySelector("[btn]");
const cartoes = document.querySelector("[cartoes]");

btn.addEventListener("click", function () {
    if (!document.getElementById(input.value)) {
        getApiGitHub(input.value);
    } else {
        alert("Este usuário já foi inserido.");
    }
});
