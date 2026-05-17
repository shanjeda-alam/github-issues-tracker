const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const loginPage = document.getElementById('login-page');
const mainApp = document.getElementById('main-app');


const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin123';
let issues = []; 

loginBtn.addEventListener('click', function () {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {

        loginPage.classList.add('hidden');
        mainApp.classList.remove('hidden');
    } else {

        alert('Invalid credentials! Use admin / admin123');

    }
});
const loadAllIssues= () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")//promise ti response
        .then(res => res.json())//promise of json Data
        .then(json => {
            console.log(json.data);
              issues = json.data;
            displayAllIssues(json.data);
            updateCounts(issues);
        });
};

const setActive = (btnId) => {
    document.querySelectorAll("button").forEach(btn => {
        btn.classList.remove("btn-primary");
    });

    document.getElementById(btnId).classList.add("btn-primary");
};
document.getElementById("all-issues").addEventListener("click", () => {

        loadAllIssues();

    });
   document.getElementById("open-issues").addEventListener("click", () => {
    const openData = issues.filter(issue => issue.status === "open");
    displayAllIssues(openData);
}); 
document.getElementById("closed-issues").addEventListener("click", () => {
    const closedData = issues.filter(issue => issue.status === "closed");
    displayAllIssues(closedData);
});
const displayAllIssues = (issues) => {

    const issuesContainer =
        document.getElementById("issues-container");

    issuesContainer.innerHTML = "";

    issues.forEach(issue => {

        const div = document.createElement("div");

 div.innerHTML = `
    
<div class="border rounded-xl p-4 bg-base-100 shadow-sm">
    <div class="flex justify-between items-center mb-3">
    <img
class="w-5 h-5"
src="${
    issue.status === "open"
    ? "assets/Open-Status.png"
    : "assets/Closed- Status .png"
}"
alt="">

  <span class="badge uppercase ${
        issue.status === "open"
        ? "badge-success"
        : "badge-secondary"
    }">
            ${issue.priority}
        </span>

    </div>
    <h2 class="font-bold text-sm mb-2 leading-5">

        ${issue.title}

    </h2>
    <p class="text-xs text-gray-400 mb-4">

        ${issue.description.slice(0, 80)}...

    </p>
    <div class="flex gap-2 flex-wrap mb-5">

        ${issue.labels.map(label => `
        
            <span class="badge badge-outline badge-warning text-[10px]">

                ${label}

            </span>

        `).join("")}

    </div>
    <div class="text-xs text-gray-400 border-t pt-3">

        <p>#1 by ${issue.author}</p>

        <p>
            ${new Date(issue.createdAt).toLocaleDateString()}
        </p>

    </div>

</div>

`;

        issuesContainer.append(div);

    });

};
const openIssues =issues.filter(issue => issue.status === "open");
console.log(openIssues.length);
const closedIssues =issues.filter(issue => issue.status === "closed");
console.log(closedIssues.length);
const updateCounts = (issues) => {

    const openCount =issues.filter(issue =>
        issue.status === "open"
    ).length;

    const closedCount =issues.filter(issue =>
        issue.status === "closed"
    ).length;

    document.getElementById("open-count")
    .innerText = openCount;

    document.getElementById("closed-count")
    .innerText = closedCount;

};
