/* =========================================================
   CarDesk US — Core Frontend Engine (All 50 US States + D.C.)
   Handles: State & Municipal Portal Intel, Step-by-Step Self-Help
   Playbook, 4 Add-ons, Photo Compression, Pricing, Dodo Checkout,
   Apps Script + Gemini API, GA4 Events, PWA & Modals
   ========================================================= */

const CARDESK_CONFIG = {
  BRAND_NAME: "CarDesk US",
  DOMAIN: "ticket.cardeskus.com",
  SUPPORT_EMAIL: "support@cardeskus.com",

  // Live Google Apps Script + Gemini AI Backend URL
  APPS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxBQfW830O0l0QS1aJML7vJDXO7oRPJr17GEIRNvabvWcCFwgnggbpJeZU87JWduMwZ/exec",

  // Dodo Payments अप्रूवल के बाद दोनों Checkout Links यहाँ जुड़ेंगे
  DODO_LINKS: {
    single: "", // $9.99 — 1-Ticket Appeal Pack
    bundle: ""  // $14.99 — 3-Ticket Bundle Pass
  },

  PRICES: {
    single: { label: "1-Ticket Appeal Pack", price: "$9.99", credits: 1 },
    bundle: { label: "3-Ticket Bundle Pass", price: "$14.99", credits: 3 }
  }
};

const APP_STATE = {
  selectedPack: "single",
  ticketType: "Parking Meter / Expired",
  photoBase64: "",
  photoMime: "",
  photoName: "",
  generatedPacket: null,
  activeTab: "stepByStepGuide",
  deferredInstallPrompt: null
};

const STORAGE_KEYS = {
  PENDING_ORDER: "cardeskus_pending_order_v1",
  CREDITS: "cardeskus_bundle_credits_v1"
};

/* =========================================================
   GA4 Analytics Helper
   ========================================================= */
function trackGAEvent(eventName, params = {}) {
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

/* =========================================================
   Initialization
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  registerServiceWorker();
  setupInstallPrompt();
  populateStatesDropdown();
  bindEvents();
  updateCreditsUI();
  updatePackUI("single");
  updateReadinessMeter();
  checkPaymentReturnCallback();
});

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

function setupInstallPrompt() {
  const installBtn = document.getElementById("installAppBtn");
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    APP_STATE.deferredInstallPrompt = e;
    if (installBtn) installBtn.classList.remove("hidden");
  });

  if (installBtn) {
    installBtn.addEventListener("click", async () => {
      if (!APP_STATE.deferredInstallPrompt) return;
      APP_STATE.deferredInstallPrompt.prompt();
      await APP_STATE.deferredInstallPrompt.userChoice;
      APP_STATE.deferredInstallPrompt = null;
      installBtn.classList.add("hidden");
    });
  }
}

/* =========================================================
   Populate 50 US States + D.C. & Live State Intelligence
   ========================================================= */
function populateStatesDropdown() {
  const select = document.getElementById("stateSelect");
  if (!select || !Array.isArray(window.US_STATES_DATA)) return;

  select.innerHTML = '<option value="">-- Select Your US State / D.C. --</option>';
  window.US_STATES_DATA.forEach((st) => {
    const opt = document.createElement("option");
    opt.value = st.code;
    opt.textContent = `${st.name} (${st.code})`;
    select.appendChild(opt);
  });
}

function getSelectedStateObj() {
  const code = document.getElementById("stateSelect")?.value || "";
  return (window.US_STATES_DATA || []).find((s) => s.code === code) || null;
}

function renderStateInsight() {
  const box = document.getElementById("stateInsightBox");
  const st = getSelectedStateObj();
  if (!box) return;

  if (!st) {
    box.classList.add("hidden");
    return;
  }

  document.getElementById("stateInsightTitle").textContent = `${st.name} (${st.code}) Local Appeal Intelligence`;
  document.getElementById("stateDeadlinePill").textContent = `Deadline: ${st.deadline}`;
  document.getElementById("stateRatePill").textContent = `Est. Win Rate: ${st.dismissalRate}`;
  document.getElementById("statePointsPill").textContent = st.pointsRisk;
  document.getElementById("stateInsightTip").textContent = st.tip;
  box.classList.remove("hidden");
}

/* =========================================================
   Event Bindings
   ========================================================= */
function bindEvents() {
  const stateSelect = document.getElementById("stateSelect");
  if (stateSelect) {
    stateSelect.addEventListener("change", () => {
      renderStateInsight();
      updateReadinessMeter();
      trackGAEvent("select_state", { state: stateSelect.value });
    });
  }

  // Ticket Type Pills
  document.querySelectorAll(".type-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".type-pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      APP_STATE.ticketType = pill.dataset.type || "Parking Meter / Expired";
      updateReadinessMeter();
    });
  });

  // Pack Switcher (Summary Panel)
  document.querySelectorAll(".pack-option").forEach((btn) => {
    btn.addEventListener("click", () => updatePackUI(btn.dataset.pack));
  });

  // Pricing Section CTAs
  document.querySelectorAll(".select-pack-cta").forEach((btn) => {
    btn.addEventListener("click", () => {
      updatePackUI(btn.dataset.pack);
      const workspace = document.getElementById("builder");
      if (workspace) workspace.scrollIntoView({ behavior: "smooth" });
      showToast(`${CARDESK_CONFIG.PRICES[btn.dataset.pack].label} selected!`);
    });
  });

  // Add-on Card Styling
  document.querySelectorAll(".addon-card input[type='checkbox']").forEach((cb) => {
    const syncCard = () => cb.closest(".addon-card")?.classList.toggle("selected", cb.checked);
    syncCard();
    cb.addEventListener("change", () => {
      syncCard();
      updateReadinessMeter();
    });
  });

  // Live Readiness Meter on Inputs
  const watchedIds = [
    "cityInput", "citationNumberInput", "ticketDateInput",
    "fineAmountInput", "plateNumberInput", "locationInput",
    "reasonSelect", "driverNameInput", "driverEmailInput", "storyInput"
  ];
  watchedIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateReadinessMeter);
  });

  // Photo Upload & Drag-Drop
  setupPhotoUpload();

  // Instant Free Pre-Check
  const preCheckBtn = document.getElementById("preCheckBtn");
  if (preCheckBtn) preCheckBtn.addEventListener("click", runInstantPreCheck);

  // Main Checkout / Generate Button
  const unlockBtn = document.getElementById("unlockBtn");
  if (unlockBtn) unlockBtn.addEventListener("click", handleUnlockClick);

  // Result Actions
  document.getElementById("copyTabBtn")?.addEventListener("click", copyActiveTab);
  document.getElementById("copyAllBtn")?.addEventListener("click", copyFullPacket);
  document.getElementById("printPdfBtn")?.addEventListener("click", () => window.print());
  document.getElementById("downloadTxtBtn")?.addEventListener("click", downloadPacketTxt);

  // Compliance Policy Modals (Dodo Payments Ready)
  document.querySelectorAll(".policy-trigger").forEach((btn) => {
    btn.addEventListener("click", () => openPolicyModal(btn.dataset.policy));
  });
  document.getElementById("modalCloseBtn")?.addEventListener("click", closePolicyModal);
  document.getElementById("policyModal")?.addEventListener("click", (e) => {
    if (e.target.id === "policyModal") closePolicyModal();
  });
}

/* =========================================================
   Ticket Photo Upload + Smart Client Compression
   ========================================================= */
function setupPhotoUpload() {
  const dropZone = document.getElementById("uploadZone");
  const fileInput = document.getElementById("ticketPhotoInput");
  const removeBtn = document.getElementById("removePhotoBtn");
  if (!dropZone || !fileInput) return;

  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processTicketPhoto(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files && fileInput.files[0]) {
      processTicketPhoto(fileInput.files[0]);
    }
  });

  if (removeBtn) {
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      APP_STATE.photoBase64 = "";
      APP_STATE.photoMime = "";
      APP_STATE.photoName = "";
      fileInput.value = "";
      document.getElementById("photoPreviewWrap")?.classList.add("hidden");
      updateReadinessMeter();
      showToast("Ticket photo removed.");
    });
  }
}

function processTicketPhoto(file) {
  if (!file.type.startsWith("image/")) {
    showToast("Please upload a JPG, PNG, or HEIC photo of your ticket.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const maxDim = 1024;
      let { width, height } = img;
      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.76);
      APP_STATE.photoBase64 = compressedDataUrl.split(",")[1];
      APP_STATE.photoMime = "image/jpeg";
      APP_STATE.photoName = file.name;

      const thumb = document.getElementById("photoThumb");
      const nameEl = document.getElementById("photoFilename");
      const wrap = document.getElementById("photoPreviewWrap");
      if (thumb) thumb.src = compressedDataUrl;
      if (nameEl) nameEl.textContent = file.name;
      if (wrap) wrap.classList.remove("hidden");

      const photoCb = document.getElementById("addonPhotoAudit");
      if (photoCb && !photoCb.checked) {
        photoCb.checked = true;
        photoCb.closest(".addon-card")?.classList.add("selected");
      }

      updateReadinessMeter();
      showToast("Ticket photo attached for AI Error Audit!");
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

/* =========================================================
   Pack Selection, Credits & Readiness Meter
   ========================================================= */
function getStoredCredits() {
  const n = parseInt(localStorage.getItem(STORAGE_KEYS.CREDITS) || "0", 10);
  return Number.isNaN(n) || n < 0 ? 0 : n;
}

function setStoredCredits(count) {
  localStorage.setItem(STORAGE_KEYS.CREDITS, String(Math.max(0, count)));
  updateCreditsUI();
}

function updateCreditsUI() {
  const credits = getStoredCredits();
  const badge = document.getElementById("creditBadge");
  if (badge) {
    if (credits > 0) {
      badge.textContent = `Bundle Credits Active: ${credits} left`;
      badge.classList.remove("hidden");
    } else {
      badge.classList.add("hidden");
    }
  }
  updateUnlockButtonLabel();
}

function updatePackUI(packKey) {
  APP_STATE.selectedPack = packKey === "bundle" ? "bundle" : "single";
  document.querySelectorAll(".pack-option").forEach((el) => {
    el.classList.toggle("active", el.dataset.pack === APP_STATE.selectedPack);
  });

  const info = CARDESK_CONFIG.PRICES[APP_STATE.selectedPack];
  const summaryEl = document.getElementById("selectedPackSummary");
  const priceEl = document.getElementById("selectedPriceDisplay");
  if (summaryEl) summaryEl.textContent = info.label;
  if (priceEl) priceEl.textContent = info.price;
  updateUnlockButtonLabel();
}

function updateUnlockButtonLabel() {
  const btn = document.getElementById("unlockBtn");
  if (!btn) return;
  const credits = getStoredCredits();
  const info = CARDESK_CONFIG.PRICES[APP_STATE.selectedPack];

  if (credits > 0) {
    btn.textContent = `Use 1 Credit (${credits} Left) & Generate Packet`;
  } else if (CARDESK_CONFIG.DODO_LINKS[APP_STATE.selectedPack]) {
    btn.textContent = `Unlock Full Appeal Packet — ${info.price}`;
  } else {
    btn.textContent = `Generate Full Appeal Packet — ${info.price}`;
  }
}

function updateReadinessMeter() {
  let score = 20;
  if (document.getElementById("stateSelect")?.value) score += 15;
  if (document.getElementById("cityInput")?.value.trim()) score += 10;
  if (document.getElementById("citationNumberInput")?.value.trim()) score += 10;
  if (document.getElementById("reasonSelect")?.value) score += 12;
  if (document.getElementById("locationInput")?.value.trim()) score += 8;
  if (document.getElementById("storyInput")?.value.trim().length >= 20) score += 10;
  if (APP_STATE.photoBase64) score += 15;

  score = Math.min(100, score);
  const label = document.getElementById("readinessScore");
  const bar = document.getElementById("readinessBar");
  if (label) label.textContent = `${score}% Ready`;
  if (bar) bar.style.width = `${score}%`;
}

/* =========================================================
   Form Data Collection & Validation
   ========================================================= */
function collectFormData() {
  const st = getSelectedStateObj();
  return {
    stateCode: st ? st.code : "",
    stateName: st ? st.name : "",
    stateDeadline: st ? st.deadline : "15–30 days",
    statePointsRisk: st ? st.pointsRisk : "Parking tickets typically carry 0 DMV points",
    stateTip: st ? st.tip : "",
    statePortalGuide: st && st.portalGuide
      ? st.portalGuide
      : "Check the issuing municipal court, county clerk, or city parking authority printed on your citation.",
    city: document.getElementById("cityInput")?.value.trim() || "",
    ticketType: APP_STATE.ticketType,
    citationNumber: document.getElementById("citationNumberInput")?.value.trim() || "",
    ticketDate: document.getElementById("ticketDateInput")?.value || "",
    fineAmount: document.getElementById("fineAmountInput")?.value.trim() || "",
    plateNumber: document.getElementById("plateNumberInput")?.value.trim().toUpperCase() || "",
    vehicleInfo: document.getElementById("vehicleInfoInput")?.value.trim() || "",
    location: document.getElementById("locationInput")?.value.trim() || "",
    reason: document.getElementById("reasonSelect")?.value || "",
    driverName: document.getElementById("driverNameInput")?.value.trim() || "",
    driverEmail: document.getElementById("driverEmailInput")?.value.trim() || "",
    story: document.getElementById("storyInput")?.value.trim() || "",
    addons: {
      photoAudit: Boolean(document.getElementById("addonPhotoAudit")?.checked),
      insuranceCheck: Boolean(document.getElementById("addonInsuranceCheck")?.checked),
      photoGuide: Boolean(document.getElementById("addonPhotoGuide")?.checked),
      planBScript: Boolean(document.getElementById("addonPlanBScript")?.checked)
    },
    pack: APP_STATE.selectedPack,
    photoBase64: APP_STATE.photoBase64,
    photoMime: APP_STATE.photoMime
  };
}

function validateFormData(data, requireContact = true) {
  if (!data.stateCode) {
    showToast("Please select your US State or Washington D.C.");
    document.getElementById("stateSelect")?.focus();
    return false;
  }
  if (!data.city) {
    showToast("Please enter the city or municipality on the ticket.");
    document.getElementById("cityInput")?.focus();
    return false;
  }
  if (!data.reason) {
    showToast("Please select your primary dispute reason.");
    document.getElementById("reasonSelect")?.focus();
    return false;
  }
  if (requireContact) {
    if (!data.driverName) {
      showToast("Please enter your full name for the official appeal letter.");
      document.getElementById("driverNameInput")?.focus();
      return false;
    }
    if (!data.driverEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.driverEmail)) {
      showToast("Please enter a valid email address for packet delivery.");
      document.getElementById("driverEmailInput")?.focus();
      return false;
    }
  }
  return true;
}

/* =========================================================
   Instant Free Pre-Check (Builds Trust Before Checkout)
   ========================================================= */
function runInstantPreCheck() {
  const data = collectFormData();
  if (!validateFormData(data, false)) return;

  const box = document.getElementById("preCheckBox");
  const content = document.getElementById("preCheckContent");
  if (!box || !content) return;

  const st = getSelectedStateObj();
  const fineVal = parseFloat(data.fineAmount) || 65;
  const strongReasons = [
    "Missing, Obstructed, or Conflicting Signage",
    "Valid Parking Receipt / App Payment Proof",
    "Clerical Error on Ticket (Plate, Location, Make, Time)",
    "Broken Meter or Malfunctioning Kiosk"
  ];
  const strength = strongReasons.includes(data.reason) ? "HIGH" : "MODERATE-HIGH";

  trackGAEvent("run_free_precheck", { state: data.stateCode, city: data.city });

  content.innerHTML = `
    <p><strong>Case Strength (${data.city}, ${data.stateCode}):</strong> ${strength} (${st ? st.dismissalRate : "~40%"} est. contested dismissal range)</p>
    <p style="margin-top:6px;"><strong>Potential Savings:</strong> Up to <strong>$${fineVal.toFixed(0)}</strong> vs. ${CARDESK_CONFIG.PRICES[APP_STATE.selectedPack].price} self-help action packet.</p>
    <p style="margin-top:6px;"><strong>Where You Will File:</strong> ${data.statePortalGuide}</p>
    <p style="margin-top:6px;"><strong>Immediate Tip:</strong> File within <strong>${data.stateDeadline}</strong>. ${APP_STATE.photoBase64 ? "Your uploaded ticket photo is queued for AI clerical error auditing." : "Upload a clear photo of your ticket to unlock the AI Clerical Error Audit."}</p>
  `;
  box.classList.remove("hidden");
  showToast("Free Pre-Check Complete!");
}

/* =========================================================
   Checkout Flow (Dodo Payments + Credits + Return Unlock)
   ========================================================= */
function handleUnlockClick() {
  const data = collectFormData();
  if (!validateFormData(data, true)) return;

  const credits = getStoredCredits();
  if (credits > 0) {
    setStoredCredits(credits - 1);
    showToast("1 Bundle Credit applied! Generating your complete AI packet...");
    trackGAEvent("use_bundle_credit", { state: data.stateCode, city: data.city });
    generateFullPacket(data, "BUNDLE_CREDIT");
    return;
  }

  const checkoutBaseUrl = CARDESK_CONFIG.DODO_LINKS[APP_STATE.selectedPack];
  if (checkoutBaseUrl) {
    trackGAEvent("begin_checkout", {
      pack: APP_STATE.selectedPack,
      state: data.stateCode,
      city: data.city
    });

    try {
      localStorage.setItem(STORAGE_KEYS.PENDING_ORDER, JSON.stringify(data));
    } catch (e) {
      const slim = { ...data, photoBase64: "", photoMime: "" };
      localStorage.setItem(STORAGE_KEYS.PENDING_ORDER, JSON.stringify(slim));
    }

    const sep = checkoutBaseUrl.includes("?") ? "&" : "?";
    const returnUrl = encodeURIComponent(`https://${CARDESK_CONFIG.DOMAIN}/?payment=success&pack=${APP_STATE.selectedPack}`);
    const fullCheckoutUrl = `${checkoutBaseUrl}${sep}email=${encodeURIComponent(data.driverEmail)}&redirect_url=${returnUrl}`;
    showToast("Redirecting to secure Dodo Payments checkout...");
    window.location.href = fullCheckoutUrl;
    return;
  }

  // Direct generation mode while Dodo Payment links are being connected
  generateFullPacket(data, "DIRECT_PREVIEW");
}

function checkPaymentReturnCallback() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("payment") !== "success") return;

  const paidPack = params.get("pack") === "bundle" ? "bundle" : "single";
  const paymentId = params.get("payment_id") || params.get("session_id") || "DODO_VERIFIED";

  window.history.replaceState({}, document.title, window.location.pathname);

  trackGAEvent("purchase_completed", {
    pack: paidPack,
    value: paidPack === "bundle" ? 14.99 : 9.99,
    currency: "USD"
  });

  if (paidPack === "bundle") {
    setStoredCredits(getStoredCredits() + 2);
  }

  const savedRaw = localStorage.getItem(STORAGE_KEYS.PENDING_ORDER);
  if (savedRaw) {
    try {
      const savedData = JSON.parse(savedRaw);
      localStorage.removeItem(STORAGE_KEYS.PENDING_ORDER);
      showToast("Payment Confirmed! Generating & emailing your Action Guide...");
      generateFullPacket(savedData, paymentId);
    } catch (err) {
      showToast("Payment confirmed! Please click Generate to build your packet.");
    }
  }
}

/* =========================================================
   Build World-Class Step-by-Step Self-Help Filing Playbook
   (Displayed on screen AND sent to Google Apps Script Email)
   ========================================================= */
function buildStepByStepFilingGuide(data) {
  const citation = data.citationNumber || "[CITATION NUMBER]";
  const plate = data.plateNumber || "[LICENSE PLATE]";
  const tDate = data.ticketDate || "[ISSUE DATE]";
  const fine = data.fineAmount ? `$${data.fineAmount}` : "the listed fine";

  return `CARDESK US — STEP-BY-STEP SELF-HELP TICKET CONTEST PLAYBOOK
Jurisdiction: ${data.city}, ${data.stateName} (${data.stateCode})
Citation #: ${citation} | Plate: ${plate} | Issue Date: ${tDate}
====================================================================
IMPORTANT: You stay in 100% control and submit directly through your
local government portal or clerk—no middlemen, no commission cuts.

STEP 1: VERIFY YOUR FILING DEADLINE FIRST (${data.stateDeadline})
--------------------------------------------------------------------
• Check the front or back of Citation #${citation} for the exact
  "Contest By / Response Due / Hearing Request" date.
• Typical ${data.stateName} contest window: ${data.stateDeadline}.
• Submit at least 48 hours before the deadline so online portal
  cutoffs or mail postmarks do not trigger late penalties.

STEP 2: LOCATE YOUR OFFICIAL ${data.city.toUpperCase()}, ${data.stateCode} PORTAL
--------------------------------------------------------------------
• ${data.statePortalGuide}
• Official .gov Search Formula (copy into Google if URL isn't on ticket):
  "${data.city} ${data.stateCode} contest ${data.ticketType} ticket"
  OR "${data.city} ${data.stateCode} parking violations bureau dispute citation"
• What to click once on the official municipal/court page:
  1. Select "Contest a Ticket", "Dispute Citation", "Administrative Review",
     or "Request a Hearing".
  2. Enter Citation # (${citation}) and License Plate (${plate}).
  3. Check whether your city allows free online review (most cities) or
     requires a refundable fine deposit for a hearing.

STEP 3: PREPARE & UPLOAD YOUR EVIDENCE EXHIBITS
--------------------------------------------------------------------
Before submitting, gather clear, objective files (PDF or JPG):
[ ] Copy/photo of Citation #${citation}
[ ] Shot 1: Wide street view showing vehicle location & approach visibility
[ ] Shot 2: Close-up of missing, obstructed, faded, or conflicting sign/curb
[ ] Shot 3: Meter display or ParkMobile / PayByPhone / kiosk receipt with timestamp
[ ] Supporting proof (if applicable): Resident permit, loading proof, or repair/medical note

STEP 4: PASTE YOUR CUSTOM APPEAL LETTER & SAVE CONFIRMATION
--------------------------------------------------------------------
• Open the "Official Appeal Letter" tab in this packet (or your email copy).
• Verify all bracketed fields match your citation word-for-word.
• Paste into the city's online dispute text box (or print & mail via
  USPS Certified Mail if your municipality requires paper mail).
• Save a screenshot/PDF of your portal Confirmation Number!

STEP 5: PLAN B ESCALATION IF STAGE 1 IS AUTO-DENIED
--------------------------------------------------------------------
• High-volume cities often issue an automated Stage 1 denial.
• Do NOT pay ${fine} right away if you have valid proof—check the denial
  letter for the Stage 2 Hearing / Appeal window (usually 10–30 days)
  and submit the "Plan B Rejection Script" included in this packet.

Need support? Email support@cardeskus.com (Self-help drafting software; not a law firm).`;
}

/* =========================================================
   AI Generation — Google Apps Script (Gemini API) + Smart Fallback
   ========================================================= */
async function generateFullPacket(data, paymentRef) {
  showLoader("Building your Step-by-Step Filing Playbook, auditing ticket & drafting official packet...");

  const emailNote = document.getElementById("emailStatusNote");
  if (emailNote) emailNote.classList.add("hidden");

  // Always build the tailored Step-by-Step Self-Help Guide first
  const stepByStepGuide = buildStepByStepFilingGuide(data);

  try {
    let resultPayload = null;
    let backendError = "";

    if (CARDESK_CONFIG.APPS_SCRIPT_URL) {
      const response = await fetch(CARDESK_CONFIG.APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          action: "generateTicketPacket",
          paymentRef,
          stepByStepGuide,
          ticket: data
        })
      });

      const json = await response.json();
      if (json && json.ok && json.packet) {
        resultPayload = {
          stepByStepGuide: json.packet.stepByStepGuide || stepByStepGuide,
          ...json.packet
        };
        if (json.emailSent && emailNote) {
          emailNote.textContent = `✓ Step-by-Step Action Playbook & Appeal Packet emailed to ${data.driverEmail}.`;
          emailNote.classList.remove("hidden");
        }
        showToast("Live AI Action Playbook & Packet Generated!");
      } else {
        backendError = (json && json.error) ? json.error : "Unknown backend error";
        console.warn("CarDesk US Backend Notice:", backendError);
      }
    }

    if (!resultPayload) {
      await new Promise((r) => setTimeout(r, 700));
      resultPayload = buildStructuredFallbackPacket(data, stepByStepGuide);
      if (backendError) {
        showToast("Backup template used (" + backendError.slice(0, 60) + ")");
      }
    }

    APP_STATE.generatedPacket = resultPayload;
    trackGAEvent("packet_generated", { state: data.stateCode, city: data.city });
    renderResultDashboard(data, resultPayload);
  } catch (err) {
    console.warn("CarDesk US Fetch Notice:", err);
    const fallback = buildStructuredFallbackPacket(data, stepByStepGuide);
    APP_STATE.generatedPacket = fallback;
    renderResultDashboard(data, fallback);
    showToast("Generated with offline US playbook engine.");
  } finally {
    hideLoader();
  }
}

function buildStructuredFallbackPacket(data, stepByStepGuide) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  });
  const citation = data.citationNumber || "[INSERT CITATION NUMBER]";
  const tDate = data.ticketDate || "[INSERT DATE OF CITATION]";
  const fine = data.fineAmount ? `$${data.fineAmount}` : "[FINE AMOUNT]";
  const plate = data.plateNumber || "[LICENSE PLATE]";
  const loc = data.location || `${data.city}, ${data.stateCode}`;

  const appealLetter = `${today}

TO: Parking & Traffic Violations Adjudication Bureau
City of ${data.city}, ${data.stateName} (${data.stateCode})

RE: FORMAL REQUEST FOR ADMINISTRATIVE REVIEW & DISMISSAL
Citation / Notice Number: ${citation}
Date of Violation: ${tDate}
Citation Type: ${data.ticketType}
License Plate: ${plate} (${data.vehicleInfo || "Registered Passenger Vehicle"})
Location Cited: ${loc}
Assessed Fine: ${fine}

Dear Hearing Officer / Adjudication Clerk,

I am writing to formally contest and respectfully request the dismissal of Citation #${citation}, issued on ${tDate} in ${data.city}, ${data.stateName}. I am submitting this written appeal within the statutory review window (${data.stateDeadline}) along with supporting factual grounds.

PRIMARY GROUND FOR DISMISSAL:
${data.reason}

STATEMENT OF FACTS:
${data.story || `On ${tDate}, my vehicle (${plate}) was located near ${loc}. Based on the actual on-site conditions and applicable ${data.stateName} municipal standards, this citation was issued in error due to ${data.reason.toLowerCase()}.`}

APPLICABLE ${data.stateName.toUpperCase()} ADJUDICATION BASIS:
${data.stateTip || `Under ${data.stateName} municipal administrative procedure, a citation must be supported by clear, unobstructed statutory notice and accurate factual entries on the face of the citation.`}

RELIEF REQUESTED:
Because the factual record and attached photographic/documentary evidence establish a clear basis for dismissal, I respectfully request that Citation #${citation} be dismissed in full, or alternatively reduced to a non-monetary warning without late penalties. Please notify me in writing of your determination at the email/mailing address below.

Respectfully submitted,

${data.driverName}
Email: ${data.driverEmail}
Plate: ${plate} | Jurisdiction: ${data.city}, ${data.stateCode}

[Attach: Printed Exhibit Photos / Payment Receipt / Copy of Citation]`;

  const errorAudit = `AI TICKET ERROR & TECHNICAL AUDIT — ${data.city.toUpperCase()}, ${data.stateCode}
============================================================
Photo Uploaded: ${data.photoBase64 ? "YES — Ready for Gemini Vision Scan" : "NO — Upload a ticket photo above for automated Vision OCR"}

MANDATORY FIELD CHECKLIST (Check your physical citation line-by-line):
1. License Plate & State: Confirm "${plate}" and issuing state match your registration exactly. Even a 1-character typo is a strong technical dismissal ground.
2. Vehicle Make, Model & Color: Verify "${data.vehicleInfo || "your vehicle details"}" are accurately recorded on the citation.
3. Exact Street Address / Block / Meter ID: Verify "${loc}" matches an actual legal address and correct side of the street.
4. Statute / Municipal Code Match: Confirm the violation code printed matches "${data.ticketType}" and the posted sign hours.
5. Date, Time & Officer Signature/Badge: Missing AM/PM, wrong year, or blank issuing officer ID frequently voids citations on technical review.

ACTION NOTE: Circle any mismatch in red ink on a copy of the ticket and mention it in paragraph 2 of your appeal letter.`;

  const insuranceImpact = `INSURANCE & DRIVING POINTS IMPACT CHECK (${data.stateName})
============================================================
Jurisdiction: ${data.stateName} (${data.stateCode})
Ticket Type: ${data.ticketType}

1. DMV License Points Impact:
  - ${data.statePointsRisk}
  - Standard municipal parking tickets do NOT add points to your driver's license in ${data.stateName}.

2. Auto Insurance Premium Impact:
  - Parking violations are civil/non-moving infractions and are NOT reported to your auto insurance carrier.
  - ${data.ticketType.includes("Camera") ? "For camera tickets: Most states treat automated cameras as civil owner-liability fines (0 insurance impact), EXCEPT select jurisdictions like California/Arizona/Oregon if personally served as a moving violation. Contesting prevents moving-violation records." : "Zero expected insurance rate increase—however, unpaid parking tickets can trigger late penalties, registration holds, or collections."}

3. Deadline Protection:
  - File your written contest within ${data.stateDeadline} to freeze late fees and protect your vehicle registration renewal.`;

  const photoGuide = `EVIDENCE PHOTO ANGLE GUIDE (WINNING 4-SHOT CHECKLIST)
============================================================
Take these 4 clear daylight photos on your phone (keep GPS & timestamp enabled):

SHOT 1 — WIDE APPROACH VIEW (30–40 ft back):
Stand where a driver pulls into the block at ${loc}. Show the full street view proving whether any restriction sign was visible from the driver's line of sight.

SHOT 2 — OBSTRUCTED / MISSING / CONFLICTING SIGN CLOSE-UP:
Zoom in on tree branches, graffiti, faded paint, twisted sign poles, or two conflicting signs on the same block.

SHOT 3 — CURB & PARKING SPOT BOUNDARY:
Stand perpendicular to the curb showing faded paint, missing stall lines, or your vehicle's safe distance from hydrants/driveways.

SHOT 4 — METER SCREEN / RECEIPT / CITATION PROOF:
Photograph any blank/broken meter display ("OUT OF ORDER" / dead screen) OR take a screenshot of your ParkMobile / PayByPhone / kiosk receipt showing timestamp + zone ID.

PRO TIP: Label each photo "Exhibit A", "Exhibit B", "Exhibit C" before uploading to the ${data.city} online dispute portal.`;

  const planBScript = `PLAN B — SECOND-STAGE REJECTION ESCALATION SCRIPT
============================================================
Use this if ${data.city}, ${data.stateCode} sends an automated initial denial (common in high-volume cities):

SUBJECT: Request for Formal Administrative Hearing / De Novo Review — Citation #${citation}

Dear Hearing Examiner,

I received the initial review denial for Citation #${citation} dated ${tDate}. That form notice did not address the specific factual evidence submitted under ${data.stateName} municipal standards. I hereby request a Formal Second-Stage Hearing (written or virtual).

THREE-POINT ESCALATION SUMMARY:
1. Unaddressed Evidence: My attached exhibits demonstrate ${data.reason}, which directly rebuts the prima facie validity of the citation.
2. Burden of Proof: The issuing agency bears the burden of establishing substantial evidence that clear, legally compliant signage and accurate citation data existed at ${loc} on ${tDate}.
3. Requested Outcome: I respectfully request a de novo review of all exhibits and full dismissal of the ${fine} assessment.

Sincerely,
${data.driverName} | Citation #${citation} | ${data.driverEmail}`;

  return {
    stepByStepGuide: stepByStepGuide || buildStepByStepFilingGuide(data),
    appealLetter,
    errorAudit,
    insuranceImpact,
    photoGuide,
    planBScript
  };
}

/* =========================================================
   Result Dashboard Rendering & Export Tools
   ========================================================= */
function renderResultDashboard(data, packet) {
  const section = document.getElementById("resultSection");
  const tabsWrap = document.getElementById("resultTabs");
  const metaEl = document.getElementById("resultMeta");
  if (!section || !tabsWrap) return;

  metaEl.textContent = `${data.city}, ${data.stateCode} • ${data.ticketType} • Deadline: ${data.stateDeadline}`;

  const tabs = [
    { key: "stepByStepGuide", label: "Step-by-Step Filing Guide", enabled: true },
    { key: "appealLetter", label: "Official Appeal Letter", enabled: true },
    { key: "errorAudit", label: "AI Ticket Error Audit", enabled: data.addons.photoAudit },
    { key: "insuranceImpact", label: "Insurance & Points", enabled: data.addons.insuranceCheck },
    { key: "photoGuide", label: "Photo Angle Guide", enabled: data.addons.photoGuide },
    { key: "planBScript", label: "Plan B Rejection Script", enabled: data.addons.planBScript }
  ].filter((t) => t.enabled);

  tabsWrap.innerHTML = "";
  tabs.forEach((tab, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `tab-btn ${idx === 0 ? "active" : ""}`;
    btn.textContent = tab.label;
    btn.addEventListener("click", () => {
      tabsWrap.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      APP_STATE.activeTab = tab.key;
      renderActiveTabContent();
    });
    tabsWrap.appendChild(btn);
  });

  APP_STATE.activeTab = "stepByStepGuide";
  renderActiveTabContent();

  section.classList.remove("hidden");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderActiveTabContent() {
  const out = document.getElementById("resultOutput");
  if (!out || !APP_STATE.generatedPacket) return;
  out.textContent = APP_STATE.generatedPacket[APP_STATE.activeTab] || "";
}

function copyActiveTab() {
  if (!APP_STATE.generatedPacket) return;
  const text = APP_STATE.generatedPacket[APP_STATE.activeTab] || "";
  navigator.clipboard.writeText(text).then(() => showToast("Current section copied to clipboard!"));
}

function copyFullPacket() {
  if (!APP_STATE.generatedPacket) return;
  const p = APP_STATE.generatedPacket;
  const combined = [
    p.stepByStepGuide,
    p.appealLetter,
    p.errorAudit,
    p.insuranceImpact,
    p.photoGuide,
    p.planBScript
  ].filter(Boolean).join("\n\n------------------------------------------------------------\n\n");
  navigator.clipboard.writeText(combined).then(() => showToast("Complete Step-by-Step Playbook & Appeal Packet copied!"));
}

function downloadPacketTxt() {
  if (!APP_STATE.generatedPacket) return;
  const p = APP_STATE.generatedPacket;
  const combined = [
    "CARDESK US — STEP-BY-STEP TICKET CONTEST PLAYBOOK (https://ticket.cardeskus.com)",
    "====================================================================",
    p.stepByStepGuide,
    p.appealLetter,
    p.errorAudit,
    p.insuranceImpact,
    p.photoGuide,
    p.planBScript
  ].filter(Boolean).join("\n\n------------------------------------------------------------\n\n");

  const blob = new Blob([combined], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "CarDeskUS-Ticket-Contest-Playbook.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  showToast("Playbook downloaded as .txt file!");
}

/* =========================================================
   Compliance Modals (Dodo Payments Approval Essentials)
   ========================================================= */
const POLICY_CONTENT = {
  refund: {
    title: "7-Day No-Questions-Asked Refund Policy",
    html: `
      <p>At <strong>CarDesk US</strong>, we stand behind the clarity and quality of our AI-assisted self-help document packets.</p>
      <h4>100% Refund Window (7 Days)</h4>
      <p>If you are not satisfied with your generated appeal packet for any reason, email us within <strong>7 calendar days</strong> of purchase at <strong>${CARDESK_CONFIG.SUPPORT_EMAIL}</strong> with your order email or payment receipt.</p>
      <h4>Fast Processing</h4>
      <p>Refund requests are approved promptly and processed back to your original payment method within 3–5 business days via our merchant of record, Dodo Payments. Please contact us directly before initiating a bank dispute so we can resolve your request immediately.</p>
    `
  },
  terms: {
    title: "Terms of Service & Legal Disclaimer",
    html: `
      <p><strong>Important Notice:</strong> CarDesk US (<code>ticket.cardeskus.com</code>) is an automated <strong>AI self-help document drafting and productivity software tool</strong>. We are <strong>NOT a law firm</strong>, we do not employ attorneys on your behalf, and no attorney-client relationship is created by using this platform.</p>
      <h4>User Responsibility</h4>
      <p>All generated step-by-step filing guides, appeal letters, checklists, and escalation scripts are provided for informational and self-help drafting purposes only. You are solely responsible for reviewing accuracy, attaching truthful evidence, and submitting your dispute directly to the relevant US city or municipal agency before the statutory deadline.</p>
      <h4>No Guaranteed Dismissal</h4>
      <p>Final citation dismissal decisions rest exclusively with the local municipal hearing officer or court.</p>
    `
  },
  privacy: {
    title: "Privacy Policy",
    html: `
      <p>Your privacy matters. CarDesk US collects only the ticket details, optional ticket photo, and email address you submit in order to generate and deliver your requested appeal packet.</p>
      <h4>Payments & Security</h4>
      <p>All card, Apple Pay, and Google Pay transactions are processed securely through <strong>Dodo Payments</strong>. CarDesk US never stores your credit card number.</p>
      <h4>Data Usage & Deletion</h4>
      <p>We never sell or rent your personal data or citation photos to third parties. To request immediate deletion of your order record, email <strong>${CARDESK_CONFIG.SUPPORT_EMAIL}</strong>.</p>
    `
  },
  contact: {
    title: "Customer Support — CarDesk US",
    html: `
      <p>Need help with your 1-Ticket Appeal Pack, 3-Ticket Bundle Pass, or a refund request?</p>
      <h4>Support Email</h4>
      <p><strong>${CARDESK_CONFIG.SUPPORT_EMAIL}</strong> (Response time: within 24 hours, 7 days a week)</p>
      <h4>Service Coverage</h4>
      <p>All 50 US States + Washington, D.C. municipal parking and automated camera citation self-help guides and document drafting.</p>
    `
  }
};

function openPolicyModal(key) {
  const modal = document.getElementById("policyModal");
  const title = document.getElementById("modalTitle");
  const body = document.getElementById("modalBody");
  const item = POLICY_CONTENT[key];
  if (!modal || !item) return;

  title.textContent = item.title;
  body.innerHTML = item.html;
  modal.classList.remove("hidden");
}

function closePolicyModal() {
  document.getElementById("policyModal")?.classList.add("hidden");
}

/* =========================================================
   UI Utilities (Loader & Toast)
   ========================================================= */
function showLoader(msg) {
  const overlay = document.getElementById("loaderOverlay");
  const text = document.getElementById("loaderText");
  if (text && msg) text.textContent = msg;
  overlay?.classList.remove("hidden");
}

function hideLoader() {
  document.getElementById("loaderOverlay")?.classList.add("hidden");
}

let toastTimer = null;
function showToast(message) {
  const wrap = document.getElementById("toastContainer");
  if (!wrap) return;
  wrap.innerHTML = `<div class="toast">${message}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    wrap.innerHTML = "";
  }, 3400);
}
