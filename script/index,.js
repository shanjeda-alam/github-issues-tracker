const loginBtn = document.getElementById('login-btn');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const loginPage = document.getElementById('login-page');
const mainApp = document.getElementById('main-app');


const VALID_USERNAME = 'admin';
const VALID_PASSWORD = 'admin123';

let issues = [];


// ===== LOGIN =====

loginBtn.addEventListener('click', function () {

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (
        username === VALID_USERNAME &&
        password === VALID_PASSWORD
    ) {

        loginPage.classList.add('hidden');
        mainApp.classList.remove('hidden');

        loadAllIssues();

    } else {

        alert('Invalid credentials! Use admin / admin123');

    }

});


// ===== LOAD ALL ISSUES =====

const loadAllIssues = () => {

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")

        .then(res => res.json())

        .then(json => {

            console.log(json.data);

            issues = json.data;

            displayAllIssues(json.data);

            updateCounts(issues);

        });

};


// ===== ACTIVE BUTTON =====

const setActive = (btnId) => {

    document.querySelectorAll("button")
    .forEach(btn => {

        btn.classList.remove("btn-primary");

    });

    document.getElementById(btnId)
    .classList.add("btn-primary");

};


// ===== FILTER BUTTONS =====

document.getElementById("all-issues")
.addEventListener("click", () => {

    setActive("all-issues");

    loadAllIssues();

});


document.getElementById("open-issues")
.addEventListener("click", () => {

    setActive("open-issues");

    const openData = issues.filter(issue =>
        issue.status === "open"
    );

    displayAllIssues(openData);

});


document.getElementById("closed-issues")
.addEventListener("click", () => {

    setActive("closed-issues");

    const closedData = issues.filter(issue =>
        issue.status === "closed"
    );

    displayAllIssues(closedData);

});


// ===== DISPLAY ALL ISSUES =====

const displayAllIssues = (issues) => {

    const issuesContainer =
    document.getElementById("issues-container");

    issuesContainer.innerHTML = "";

    issues.forEach(issue => {

        const div = document.createElement("div");

        div.innerHTML = `

<div class="
border rounded-xl p-4
bg-base-100 shadow-sm
cursor-pointer
hover:shadow-lg transition
${
    issue.status === "open"
    ? "border-t-4 border-t-green-500"
    : "border-t-4 border-t-purple-500"
}">

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

            <span class="
            badge badge-outline
            badge-warning text-[10px]">

                ${label}

            </span>

        `).join("")}

    </div>

    <div class="text-xs text-gray-400 border-t pt-3">

        <p>
            #${issue.id} by ${issue.author}
        </p>

        <p>

            ${new Date(issue.createdAt)
                .toLocaleDateString()}

        </p>

    </div>

</div>

`;


// ===== CARD CLICK EVENT =====

div.addEventListener("click", () => {

    loadIssueDetails(issue.id);

});


issuesContainer.append(div);

    });

};


// ===== UPDATE COUNTS =====

const updateCounts = (issues) => {

    const openCount = issues.filter(issue =>
        issue.status === "open"
    ).length;

    const closedCount = issues.filter(issue =>
        issue.status === "closed"
    ).length;

    document.getElementById("open-count")
    .innerText = openCount;

    document.getElementById("closed-count")
    .innerText = closedCount;

};


// ===== LOAD SINGLE ISSUE DETAILS =====

const loadIssueDetails = async (id) => {

    const url =
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);

    const data = await res.json();

    displayIssueDetails(data.data);

};


// ===== DISPLAY ISSUE DETAILS =====

const displayIssueDetails = (issue) => {

    const detailsContainer =
    document.getElementById("modal-details");

    detailsContainer.innerHTML = `

        <div class="space-y-4">

            <div class="flex justify-between">

                <span class="
                badge
                ${
                    issue.status === "open"
                    ? "badge-success"
                    : "badge-secondary"
                }">

                    ${issue.status}

                </span>

                <span class="badge badge-warning">

                    ${issue.priority}

                </span>

            </div>

            <h2 class="text-2xl font-bold">

                ${issue.title}

            </h2>

            <p class="text-gray-500">

                ${issue.description}

            </p>

            <div class="flex flex-wrap gap-2">

                ${issue.labels.map(label => `

                    <span class="
                    badge
                    badge-outline">

                        ${label}

                    </span>

                `).join("")}

            </div>

            <div class="
            border rounded-xl p-4
            bg-base-200 space-y-2">

                <p>
                    <span class="font-semibold">
                    Author:
                    </span>

                    ${issue.author}
                </p>

                <p>
                    <span class="font-semibold">
                    Issue ID:
                    </span>

                    #${issue.id}
                </p>

                <p>
                    <span class="font-semibold">
                    Created:
                    </span>

                    ${new Date(issue.createdAt)
                        .toLocaleDateString()}
                </p>

            </div>

        </div>
    `;

    document.getElementById("issue-modal").showModal();
    

};
document.getElementById("btn-search").addEventListener("click", () => {

    const searchValue = document.getElementById("input-search").value.trim();

    if (!searchValue) {
        loadAllIssues();
        return;
    }

    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then(res => res.json())
        .then(json => {
            issues = json.data;
            updateCounts(issues);
            displayAllIssues(issues);
        });

});