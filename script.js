// Using Firebase modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
  from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// --- Firebase config (your project) ---
const firebaseConfig = {
  apiKey: "AIzaSyAL-Kb-Hbnp473HEqLJgrZhBzliLOWh_h4",
  authDomain: "login-page-d52ee.firebaseapp.com",
  projectId: "login-page-d52ee",
  storageBucket: "login-page-d52ee.firebasestorage.app",
  messagingSenderId: "412666756045",
  appId: "1:412666756045:web:388d2956d0e968c72aa284"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- DOM elements ---
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const langBtn = document.getElementById("langBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// Helpers to switch forms
function switchToSignup() {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
}
function switchToLogin() {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
}

// Attach click listeners (stable)
showSignup.addEventListener("click", switchToSignup);
showLogin.addEventListener("click", switchToLogin);

// Signup handler
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    signupForm.reset();
    switchToLogin();
  } catch (err) {
    alert(err.message);
  }
});

// Login handler
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    loginForm.reset();
  } catch (err) {
    // if user not found, show message (do not auto-create here)
    if (err.code === "auth/user-not-found") {
      // offer to switch to signup
      if (confirm("User not found. Do you want to create an account with this email?")) {
        switchToSignup();
        document.getElementById("signupEmail").value = email;
      }
    } else {
      alert(err.message);
    }
  }
});

// Language switch (do NOT replace innerHTML, only update textContent so listeners stay)
let currentLang = "en";
langBtn.addEventListener("click", () => {
  const html = document.documentElement;
  if (currentLang === "en") {
    currentLang = "ar";
    html.lang = "ar";
    html.dir = "rtl";
    langBtn.textContent = "English";

    // Login texts
    document.getElementById("loginTitle").textContent = "تسجيل الدخول";
    document.getElementById("loginEmail").placeholder = "البريد الإلكتروني";
    document.getElementById("loginPassword").placeholder = "كلمة المرور";
    loginBtn.textContent = "تسجيل الدخول";
    document.getElementById("noAccountSpan").textContent = "ليس لديك حساب؟";
    showSignup.textContent = "إنشاء حساب";

    // Signup texts
    document.getElementById("signupTitle").textContent = "إنشاء حساب";
    document.getElementById("signupName").placeholder = "الاسم الكامل";
    document.getElementById("signupEmail").placeholder = "البريد الإلكتروني";
    document.getElementById("signupPassword").placeholder = "كلمة المرور";
    signupBtn.textContent = "إنشاء حساب";
    document.getElementById("hasAccountSpan").textContent = "لديك حساب بالفعل؟";
    showLogin.textContent = "تسجيل الدخول";
  } else {
    currentLang = "en";
    html.lang = "en";
    html.dir = "ltr";
    langBtn.textContent = "العربية";

    // Login texts
    document.getElementById("loginTitle").textContent = "Sign In";
    document.getElementById("loginEmail").placeholder = "Email";
    document.getElementById("loginPassword").placeholder = "Password";
    loginBtn.textContent = "Login";
    document.getElementById("noAccountSpan").textContent = "Don’t have an account?";
    showSignup.textContent = "Sign Up";

    // Signup texts
    document.getElementById("signupTitle").textContent = "Create Account";
    document.getElementById("signupName").placeholder = "Full Name";
    document.getElementById("signupEmail").placeholder = "Email";
    document.getElementById("signupPassword").placeholder = "Password";
    signupBtn.textContent = "Sign Up";
    document.getElementById("hasAccountSpan").textContent = "Already have an account?";
    showLogin.textContent = "Login";
  }
});
