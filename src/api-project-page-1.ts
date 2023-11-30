import axios from "axios";
import { Info } from "./types";

/* DOM VARIABLES */

const tableBody: HTMLTableElement = document.querySelector(".tbody")!;
const information: HTMLDivElement = document.querySelector(".information");
const table: HTMLTableElement = document.querySelector("table");
const info: HTMLDivElement = document.querySelector(".info");
const loader: HTMLDivElement = document.querySelector(".loader");
const btnBack: HTMLButtonElement = document.querySelector(".btnBack");

const API_URL = "https://jsonplaceholder.typicode.com/users";

//GET INFORMATION FROM API
async function getInfoApi() {
	try {
		const response = await axios.get(API_URL);
		const users = response.data;

		renderTable(users);
	} catch (error) {
		console.error("NO INTERNET");
	}
}

//UI FUNCTIONS

function renderTable(users: any[]) {
	try {
		for (let i = 0; i < users.length; i++) {
			tableBody.innerHTML += `	<tr>
																<th scope="row">${i + 1}</th>
																<td>${users[i].name}</td>
																<td>${users[i].username}</td>
																<td>${users[i].email}</td>
																<td>${users[i].phone}</td>
																<td>${users[i].website}</td>
																<td class="eye">👁️‍🗨️</td>
																<td class="del">❌</td>
												</tr>`;
		}
		handleShowClick();
		handleDeleteClick();
	} catch (error) {
		console.error("hello");
	}
}

function renderUserInfo(user: Info) {
	const tr = document.querySelector(".eye").closest("tr");

	info.innerHTML += `<div class="result">
								<p><span>NAME:</span>    ${user.name}:</p>
								<p><span>USERNAME:</span> ${user.username}</p>
								<p><span>EMAIL:</span>   ${user.email}</p>
								<p><span>PHONE:</span>   ${user.phone}</p>
								<p><span>WEBSITE:</span>  ${user.website}</p>
				</div>`;
}

//HANDLER FUNCTION

async function handleShowClick() {
	const iconShow: NodeListOf<HTMLTableCellElement> = document.querySelectorAll(".eye");

	iconShow.forEach((icon, index) => {
		icon.addEventListener("click", async () => {
			table.className = "d-none";
			information.style.display = "flex";
			const user = API_URL + `/${index + 1}`;
			try {
				const response = await axios.get(user);
				const userData = response.data;
				renderUserInfo(userData);
			} catch (error) {
				console.error(error.message);
			}
		});
	});
}

function handleDeleteClick() {
	const iconDel: NodeListOf<HTMLTableCellElement> = document.querySelectorAll(".del");

	iconDel.forEach((del) => {
		const tr = del.closest("tr");
		del.addEventListener("click", () => {
			tr.remove();
		});
	});
}

function handlerBackClick() {
	btnBack.addEventListener("click", () => {
		table.className = "d-block";
		information.style.display = "none";
		info.innerHTML = "";
	});
}

//TIMER
function timer() {
	setTimeout(() => {
		table.className = "d-block";
		loader.style.display = "none";
	}, 3000);
}

//LOGICAL FUNCTIONS

function init() {
	getInfoApi();
	timer();
	handlerBackClick();
}

init();
