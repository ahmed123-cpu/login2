// -----------------------------
// ✅ Import Firebase SDK
// -----------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// -----------------------------
// ✅ Firebase Config 
// -----------------------------
const firebaseConfig = {
  apiKey: "AIzaSyAL-Kb-Hbnp473HEqLJgrZhBzliLOWh_h4",
  authDomain: "login-page-d52ee.firebaseapp.com",
  projectId: "login-page-d52ee",
  storageBucket: "login-page-d52ee.firebasestorage.app",
  messagingSenderId: "412666756045",
  appId: "1:412666756045:web:388d2956d0e968c72aa284",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// -----------------------------
// ✅ DOM Elements
// -----------------------------
const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const langBtn = document.getElementById("langBtn");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

// -----------------------------
// ✅ Switch forms
// -----------------------------
function switchToSignup() {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
}
function switchToLogin() {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
}

// Attach listeners
showSignup.addEventListener("click", switchToSignup);
showLogin.addEventListener("click", switchToLogin);

// -----------------------------
// ✅ Signup Handler
// -----------------------------
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Account created successfully!");
    signupForm.reset();
    switchToLogin();
  } catch (err) {
    console.error(err);
    let msg = "Registration failed. Please try again.";

    switch (err.code) {
      case "auth/weak-password":
        msg = "❌ Password should be at least 6 characters long.";
        break;
      case "auth/email-already-in-use":
        msg = "❌ This email is already registered.";
        break;
      case "auth/invalid-email":
        msg = "❌ Please enter a valid email address.";
        break;
    }
    alert(msg);
  }
});

// -----------------------------
// ✅ Login Handler
// -----------------------------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Login successful!");
    loginForm.reset();
  } catch (err) {
    console.error(err);
    let msg = "Login failed. Please check your data.";

    switch (err.code) {
      case "auth/invalid-email":
        msg = "❌ Invalid email format.";
        break;
      case "auth/user-disabled":
        msg = "❌ This account has been disabled.";
        break;
      case "auth/user-not-found":
        if (confirm("User not found. Do you want to create an account?")) {
          switchToSignup();
          document.getElementById("signupEmail").value = email;
          return;
        }
        break;
      case "auth/wrong-password":
        msg = "❌ Incorrect password. Try again.";
        break;
    }

    alert(msg);
  }
});

// -----------------------------
// ✅ Language Switch
// -----------------------------
let currentLang = "en";

langBtn.addEventListener("click", () => {
  const html = document.documentElement;
  const isArabic = currentLang === "en";
  currentLang = isArabic ? "ar" : "en";

  html.lang = currentLang;
  html.dir = isArabic ? "rtl" : "ltr";
  langBtn.textContent = isArabic ? "English" : "العربية";

  // 🔹 Login Form
  document.getElementById("loginTitle").textContent = isArabic
    ? "تسجيل الدخول"
    : "Sign In";
  document.getElementById("loginEmail").placeholder = isArabic
    ? "البريد الإلكتروني"
    : "Email";
  document.getElementById("loginPassword").placeholder = isArabic
    ? "كلمة المرور"
    : "Password";
  loginBtn.textContent = isArabic ? "تسجيل الدخول" : "Login";
  document.getElementById("noAccountSpan").textContent = isArabic
    ? "ليس لديك حساب؟"
    : "Don’t have an account?";
  showSignup.textContent = isArabic ? "إنشاء حساب" : "Sign Up";

  // 🔹 Signup Form
  document.getElementById("signupTitle").textContent = isArabic
    ? "إنشاء حساب"
    : "Create Account";
  document.getElementById("signupName").placeholder = isArabic
    ? "الاسم الكامل"
    : "Full Name";
  document.getElementById("signupEmail").placeholder = isArabic
    ? "البريد الإلكتروني"
    : "Email";
  document.getElementById("signupPassword").placeholder = isArabic
    ? "كلمة المرور"
    : "Password";
  signupBtn.textContent = isArabic ? "إنشاء حساب" : "Sign Up";
  document.getElementById("hasAccountSpan").textContent = isArabic
    ? "لديك حساب بالفعل؟"
    : "Already have an account?";
  showLogin.textContent = isArabic ? "تسجيل الدخول" : "Login";
});
