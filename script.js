const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginMessage = document.getElementById("loginMessage");

  function showMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = `alert alert-${type}`;
  }

  function validateUsername() {
    const username = usernameInput.value.trim();

    if (username === "") {
      usernameInput.classList.add("is-invalid");
      usernameInput.classList.remove("is-valid");
      usernameInput.setCustomValidity("Username atau email wajib diisi.");
      return false;
    }

    // Jika menggunakan email, periksa formatnya.
    if (username.includes("@")) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(username)) {
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameInput.setCustomValidity("Format email tidak valid.");
        return false;
      }
    }

    usernameInput.classList.remove("is-invalid");
    usernameInput.classList.add("is-valid");
    usernameInput.setCustomValidity("");
    return true;
  }

  function validatePassword() {
    const password = passwordInput.value;

    if (password.trim() === "" || password.length < 8) {
      passwordInput.classList.add("is-invalid");
      passwordInput.classList.remove("is-valid");
      passwordInput.setCustomValidity(
        "Password wajib diisi dan minimal 8 karakter."
      );
      return false;
    }

    passwordInput.classList.remove("is-invalid");
    passwordInput.classList.add("is-valid");
    passwordInput.setCustomValidity("");
    return true;
  }

  usernameInput.addEventListener("input", () => {
    validateUsername();
    loginMessage.classList.add("d-none");
  });

  passwordInput.addEventListener("input", () => {
    validatePassword();
    loginMessage.classList.add("d-none");
  });

  loginForm.addEventListener("submit", function (event) {
    // Mencegah form dikirim atau halaman dimuat ulang.
    event.preventDefault();

    const usernameValid = validateUsername();
    const passwordValid = validatePassword();

    if (!usernameValid || !passwordValid) {
      loginMessage.classList.add("d-none");
      showMessage(
        "Periksa kembali username/email dan password Anda.",
        "danger"
      );

      const firstInvalid = loginForm.querySelector(".is-invalid");
      if (firstInvalid) {
        firstInvalid.focus();
      }

      return;
    }

    showMessage(
      "Validasi berhasil! Form memenuhi ketentuan. Ini bukan login akun sebenarnya.",
      "success"
    );
  });
}