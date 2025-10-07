import streamlit as st

# Set page configuration
st.set_page_config(page_title="TaskFlow Home", layout="wide")

# Initialize session state for authentication
if 'token' not in st.session_state:
    st.session_state.token = None
if 'user_email' not in st.session_state:
    st.session_state.user_email = None

# Sidebar: Display login status and logout button
with st.sidebar:
    if st.session_state.token is not None:
        st.success(f"Logged in as: {st.session_state.user_email}")
        if st.button("Logout"):
            st.session_state.token = None
            st.session_state.user_email = None
            st.rerun()
    else:
        st.info("Status: Logged Out")

# Main page content
st.title("🚀 Welcome to TaskFlow")
st.subheader("Your Collaborative Task Management Hub")

st.write(
    """
    Welcome to TaskFlow!  
    Use the sidebar to navigate between pages.  
    **Note:** You must log in to access your workspaces and manage tasks.
    """
)

# Initialize session state keys
if 'token' not in st.session_state:
    st.session_state.token = None
if 'user_email' not in st.session_state:
    st.session_state.user_email = None
if 'selected_workspace_id' not in st.session_state:
    st.session_state.selected_workspace_id = None
if 'selected_workspace_name' not in st.session_state:
    st.session_state.selected_workspace_name = None


def display_login_status() -> None:
    """Render sidebar login status and handle logout."""
    if st.session_state.get('token'):
        st.sidebar.success(f"Logged in as: {st.session_state.get('user_email')}")
        if st.sidebar.button("Logout", key="sidebar_logout"):
            # Clear all session state keys and rerun
            st.session_state.clear()
            st.rerun()
    else:
        st.sidebar.info("Status: Logged Out")


display_login_status()
