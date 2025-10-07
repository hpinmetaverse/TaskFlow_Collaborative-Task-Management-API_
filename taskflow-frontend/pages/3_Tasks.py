import streamlit as st


st.set_page_config(page_title="Tasks", page_icon="✅", layout="wide")


st.title("Tasks")

if not st.session_state.get("token"):
    st.info("Please login from the Login/Register page to access tasks.")
else:
    st.write("Tasks page placeholder. Integrate task management UI here.")


