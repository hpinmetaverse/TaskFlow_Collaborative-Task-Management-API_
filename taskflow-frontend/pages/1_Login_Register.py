import streamlit as st
import requests


API_URL = "http://localhost:3000/api/auth"


st.set_page_config(page_title="Login / Register", page_icon="🔐", layout="centered")


# Sidebar status
with st.sidebar:
    token = st.session_state.get("token")
    user_email = st.session_state.get("email")
    if token:
        st.markdown(f"**Logged in as:** {user_email}")
        if st.button("Logout"):
            st.session_state.pop("token", None)
            st.session_state.pop("email", None)
            st.success("Logged out.")
            st.experimental_rerun()
    else:
        st.markdown("**Status:** Logged Out")


st.title("User Authentication")

login_tab, register_tab = st.tabs(["Login", "Register"])


with register_tab:
    st.subheader("Create an account")
    with st.form("register_form"):
        reg_username = st.text_input("Username")
        reg_email = st.text_input("Email")
        reg_password = st.text_input("Password", type="password")
        register_submitted = st.form_submit_button("Register")

    if register_submitted:
        payload = {
            "username": reg_username.strip(),
            "email": reg_email.strip(),
            "password": reg_password,
        }

        if not payload["username"] or not payload["email"] or not payload["password"]:
            st.error("Please fill in all fields.")
        else:
            try:
                response = requests.post(
                    f"{API_URL}/register",
                    json=payload,
                    timeout=15,
                )
                if 200 <= response.status_code < 300:
                    st.success("Registration successful. You can now log in.")
                else:
                    try:
                        message = response.json().get("message")
                    except Exception:
                        message = response.text or "Registration failed."
                    st.error(message)
            except requests.RequestException as exc:
                st.error(f"Network error: {exc}")


with login_tab:
    st.subheader("Sign in")
    with st.form("login_form"):
        login_email = st.text_input("Email")
        login_password = st.text_input("Password", type="password")
        login_submitted = st.form_submit_button("Login")

    if login_submitted:
        payload = {
            "email": login_email.strip(),
            "password": login_password,
        }

        if not payload["email"] or not payload["password"]:
            st.error("Please enter your email and password.")
        else:
            try:
                response = requests.post(
                    f"{API_URL}/login",
                    json=payload,
                    timeout=15,
                )

                if response.status_code == 200:
                    try:
                        data = response.json()
                        token_value = data.get("token")
                    except Exception:
                        token_value = None

                    if token_value:
                        st.session_state["token"] = token_value
                        st.session_state["email"] = payload["email"]
                        st.success("Logged in successfully.")
                        st.experimental_rerun()
                    else:
                        st.error("Login response missing token.")
                else:
                    try:
                        message = response.json().get("message")
                    except Exception:
                        message = response.text or "Login failed."
                    st.error(message)
            except requests.RequestException as exc:
                st.error(f"Network error: {exc}")


