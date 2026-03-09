// get id in variable
const allBtn = document.getElementById('all-btn');
const openBtn = document.getElementById('open-btn');
const closedBtn = document.getElementById('closed-btn');

const countAllIssue = document.getElementById('countAllIssue');
const allIssue = document.getElementById('allIssue');
const loadingSpinner = document.getElementById('loadingSpinner');

let allIssuesData = []; 

// toggle for three button
function toggleStyle(id) {
    const buttons = [allBtn, openBtn, closedBtn];

   
    buttons.forEach(btn => {
        btn.classList.remove('bg-[#4A00FF]', 'text-white');
        btn.classList.add('bg-white', 'text-black');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-black');
    selected.classList.add('bg-[#4A00FF]', 'text-white');

    
    if (id === 'all-btn') {
        displayIssue(allIssuesData); 
    } else if (id === 'open-btn') {
        const filtered = allIssuesData.filter(i => i.status === 'open');
        displayIssue(filtered); 
    } else if (id === 'closed-btn') {
        const filtered = allIssuesData.filter(i => i.status === 'closed');
        displayIssue(filtered);
    }
}


async function loadIssue() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    try {
        const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
        const data = await res.json();
        allIssuesData = data.data;
        displayIssue(allIssuesData); 
    } catch (error) {
        console.error("Data fetch error:", error);
    } finally {
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("flex");
    }
}


function displayIssue(issues) {
    allIssue.innerHTML = "";

    countAllIssue.innerText = `${issues.length} Issues`;

    issues.forEach((issue) => {
        const isClosed = issue.status === 'closed';
        const borderColor = isClosed ? "border-[#a855f7]" : "border-[#00a86b]";
        const statusImg = isClosed ? "./assets/Closed- Status .png" : "./assets/Open-Status.png";

        const issueCard = document.createElement("div");
        issueCard.className = `every-issue bg-white p-5 rounded-xl border-t-4 ${borderColor} shadow-[0_-8px_15px_-5px_rgba(0,0,0,0.1),8px_0_15px_-5px_rgba(0,0,0,0.1),-8px_0_15px_-5px_rgba(0,0,0,0.1)]`;

        issueCard.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <div class="flex items-center gap-2">
                    <span><img src="${statusImg}" alt=""></span>
                </div>
                <h3 class="text-red-500 bg-red-50 py-1 px-4 rounded-full text-sm font-bold tracking-wide uppercase">
                    ${issue.priority}
                </h3>
            </div>

            <div class="space-y-2">
                <h2 class="text-xl font-semibold text-slate-800 leading-tight">
                    ${issue.title}
                </h2>
                <p class="line-clamp-2 text-slate-500 text-sm leading-relaxed">
                    ${issue.description}
                </p>
            </div>

            <div class="flex gap-2 mt-4">
                <span class="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-xs font-semibold uppercase">
                    ${issue.labels}
                </span>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 text-slate-400 text-sm">
                <p>#${issue.id || '1'} by ${issue.user || 'admin'}</p>
                <p>${issue.date || '1/15/2024'}</p>
            </div>`;

        issueCard.onclick = () => showDetails(issue.id);
        issueCard.style.cursor = "pointer";

        allIssue.appendChild(issueCard);
    });
}
loadIssue();


async function showDetails(id) {
    const modal = document.getElementById('issue_details_modal');
    const modalContent = document.getElementById('modal-content');

    
    modalContent.innerHTML = `<div class="flex justify-center"><span class="loading loading-spinner loading-lg"></span></div>`;
    modal.showModal();

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const result = await res.json();
        const data = result.data;

       
        const statusBadge = data.status === 'open' ? 'badge-success' : 'badge-secondary';


        modalContent.innerHTML = `
            <h1 class="text-3xl font-bold mb-2">${data.title}</h1>
            <div class="flex items-center gap-2 mb-4">
                <span class="badge ${statusBadge} text-white rounded-full">${data.status.toUpperCase()}</span>
                <span class="text-gray-500">Opened by ${data.user || 'Fahim Ahmed'} • ${data.date || '22/02/2026'}</span>
            </div>
            
            <div class="flex gap-2 mb-6">
                <span class="px-3 py-1 bg-red-50 text-red-500 border border-red-100 rounded-full text-xs font-bold uppercase">BUG</span>
                <span class="px-3 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-full text-xs font-bold uppercase">HELP WANTED</span>
            </div>

            <p class="text-gray-700 leading-relaxed mb-8">${data.description}</p>

            <div class="bg-gray-50 p-6 rounded-xl flex justify-between items-center">
                <div>
                    <p class="text-gray-500 text-sm">Assignee:</p>
                    <p class="font-bold text-lg">${data.user || 'Fahim Ahmed'}</p>
                </div>
                <div class="text-right">
                    <p class="text-gray-500 text-sm">Priority:</p>
                    <span class="bg-red-500 text-white px-4 py-1 rounded-full font-bold">${data.priority.toUpperCase()}</span>
                </div>
            </div>
        `;
    } catch (error) {
        modalContent.innerHTML = `<p class="text-red-500 text-center">Failed to load issue details.</p>`;
    }
}


const searchInput = document.getElementById('search-input');

// for search code
searchInput.addEventListener('input', async (e) => {
    const searchText = e.target.value;
    
    
    allIssue.innerHTML = ""; 
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
        const data = await res.json();
        displayIssue(data.data);
        
    } catch (error) {
        console.error("Search error:", error);
    } finally {
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("flex");
    }
});