

"use strict";

/* ============ GLOBAL HELPERS ============ */

// Create ID for tips and saved entries
function generateId() {
    return `id_${Math.floor(Math.random() * 1_000_000_000)}`;
}

// Safe selector
const $ = (selector) => document.querySelector(selector);

/* ============ NAVIGATION MENU TOGGLE ============ */
function setupMenuToggle() {
    const buttons = document.querySelectorAll("button[id^='menuToggle']");

    buttons.forEach((btn) => {
        const targetId = btn.getAttribute("aria-controls");
        const target = document.getElementById(targetId);

        if (!target) return;

        btn.addEventListener("click", () => {
            const expanded = btn.getAttribute("aria-expanded") === "true";
            btn.setAttribute("aria-expanded", String(!expanded));
            target.classList.toggle("open");
        });
    });
}


/* ============ 1. TIPS SYSTEM (Home Page Only) ============ */

const STORAGE_TIPS = "pastry_tips_v1";

function loadTips() {
    const data = localStorage.getItem(STORAGE_TIPS);
    return data ? JSON.parse(data) : [];
}

function saveTips(tips) {
    localStorage.setItem(STORAGE_TIPS, JSON.stringify(tips));
}

function renderTips() {
    const container = $("#tipsContainer");
    if (!container) return; // not on home page

    const tips = loadTips();
    container.innerHTML = "";

    if (tips.length === 0) {
        container.innerHTML = `<p class="muted">No tips yet. Add one!</p>`;
        return;
    }

    const sorted = tips.sort((a, b) => b.votes - a.votes);

    sorted.forEach((tip) => {
        container.insertAdjacentHTML(
            "beforeend",
            `
            <div class="tip-card">
                <p>${tip.text}</p>
                <div class="tip-controls">
                    <button class="upvote" data-id="${tip.id}">${tip.votes} ▲</button>
                    <button class="remove" data-id="${tip.id}">Remove</button>
                </div>
            </div>
            `
        );
    });

    // Attach upvote listeners
    document.querySelectorAll(".upvote").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const tips = loadTips();
            const item = tips.find((t) => t.id === id);
            if (item) {
                item.votes++;
                saveTips(tips);
                renderTips();
            }
        });
    });

    // Attach delete listeners
    document.querySelectorAll(".remove").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            let tips = loadTips();
            tips = tips.filter((t) => t.id !== id);
            saveTips(tips);
            renderTips();
        });
    });
}

function setupTipForm() {
    const form = $("#tipForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const input = $("#tipText");
        const txt = input.value.trim();

        if (txt === "") return;

        const tips = loadTips();
        tips.push({ id: generateId(), text: txt, votes: 0 });

        saveTips(tips);
        input.value = "";
        renderTips();
    });
}


/* ============ 2. PASTRY CHECKLIST (Home Page) ============ */

const STORAGE_CHECKLIST = "pastry_checklist_v1";

const pastryData = {
    basil: [ // Cake
        { task: "Preheat oven", ok: "350°F / 175°C" },
        { task: "Prepare pan", ok: "Grease & flour" },
        { task: "Mix ingredients", ok: "Wet → Dry → Combine" },
    ],
    snake: [ // Doughnut
        { task: "Mix dry ingredients", ok: "Flour, sugar, spices" },
        { task: "Add wet ingredients", ok: "Milk, egg, oil" },
        { task: "Bake", ok: "15 min at 350°F" },
    ],
    tomato: [ // Bread
        { task: "Mix dough", ok: "Knead well" },
        { task: "Let rise", ok: "1 hour in warm place" },
        { task: "Bake", ok: "White bread setting" },
    ],
};

function renderChecklist(data) {
    const container = $("#checklist");
    if (!container) return;

    if (!data || !data.checklist) {
        container.innerHTML = `<p class="muted">No pastry selected.</p>`;
        return;
    }

    const { plant, checklist } = data;

    container.innerHTML = `
        <h4>${plant.charAt(0).toUpperCase() + plant.slice(1)} Checklist</h4>
        <ul>
            ${checklist
                .map(
                    (c) => `<li><strong>${c.task}:</strong> ${c.ok}</li>`
                )
                .join("")}
        </ul>
    `;
}

function setupPastrySelector() {
    const select = $("#plantSelect");
    if (!select) return;

    select.addEventListener("change", () => {
        const val = select.value;

        if (val === "") {
            localStorage.removeItem(STORAGE_CHECKLIST);
            renderChecklist(null);
            return;
        }

        const checklist = pastryData[val] || [];
        const obj = { plant: val, checklist };

        localStorage.setItem(STORAGE_CHECKLIST, JSON.stringify(obj));
        renderChecklist(obj);
    });

    // Load previous selection
    const stored = localStorage.getItem(STORAGE_CHECKLIST);
    if (stored) {
        const data = JSON.parse(stored);
        renderChecklist(data);
        select.value = data.plant;
    }
}


/* ============ 3. CONTACT FORM (About Page) ============ */

function setupContactForm() {
    const form = $("#contactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = $("#name").value.trim();
        const email = $("#email").value.trim();
        const message = $("#message").value.trim();
        const result = $("#contactResult");

        if (!name || !email || !message) {
            result.textContent = "Please complete all fields.";
            return;
        }

        const entry = {
            id: generateId(),
            name,
            email,
            message,
            date: new Date().toISOString(),
        };

        const STORAGE_CONTACT = "pastry_contact_msgs_v1";
        const old = JSON.parse(localStorage.getItem(STORAGE_CONTACT) || "[]");
        old.push(entry);
        localStorage.setItem(STORAGE_CONTACT, JSON.stringify(old));

        result.textContent = "Thank you! Your message has been saved.";
        form.reset();
    });
}


/* ============ INITIALIZE ON PAGE LOAD ============ */

document.addEventListener("DOMContentLoaded", () => {
    setupMenuToggle();
    setupTipForm();
    renderTips();
    setupPastrySelector();
    setupContactForm();
});
