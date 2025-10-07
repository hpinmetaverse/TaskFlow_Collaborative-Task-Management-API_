import streamlit as st


st.set_page_config(page_title="TaskFlow", page_icon="✅", layout="wide")


st.title("TaskFlow")
st.write("Use the sidebar to navigate pages: Login/Register, Workspaces, and Tasks.")

with st.sidebar:
    st.markdown("**Navigation**")
    if st.session_state.get("token"):
        st.success(f"Logged in as: {st.session_state.get('email')}")
    else:
        st.info("Status: Logged Out")


