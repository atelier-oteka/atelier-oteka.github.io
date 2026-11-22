
const cards = Array.from(document.querySelectorAll("article"));
const tabs = Array.from(document.querySelectorAll("[data-category]"));
const devices = Array.from(document.querySelectorAll("[data-platform]"));
const query = document.getElementById("q");
let group = "-1", device = "";
function normalize(value) { return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }
function render() {
 const needle = normalize(query.value.trim());
 let count = 0;
 for (const card of cards) {
   card.hidden = !(group === "-1" || card.dataset.group === group) || !!(device && device !== card.dataset.device) || !normalize(card.textContent).includes(needle);
   if (!card.hidden) count++;
 }
 for (const button of tabs) button.setAttribute("aria-pressed", String(button.dataset.category === group));
 for (const button of devices) button.setAttribute("aria-pressed", String(button.dataset.platform === device));
 document.getElementById("result").textContent = count + (count > 1 ? " créations" : " création");
 document.getElementById("empty").hidden = count !== 0;
}
for (const button of tabs) button.onclick = () => {group = button.dataset.category; device = ""; render();};
for (const button of devices) button.onclick = () => {group = "0"; device = button.dataset.platform; render();};
query.addEventListener("input", render); render();
