import streamlit as st


st.set_page_config(page_title="Workspaces", page_icon="🗂️", layout="wide")


st.title("Workspaces")

if not st.session_state.get("token"):
    st.info("Please login from the Login/Register page to access workspaces.")
else:
    st.write("Workspaces page placeholder. Integrate workspace list here.")


