import streamlit as st
import requests


st.set_page_config(page_title="Tasks", page_icon="✅", layout="wide")


API_URL = "http://localhost:3000/api"


if not st.session_state.get("token") or not st.session_state.get("selected_workspace_id"):
    st.warning("Please select a workspace first.")
    st.stop()

workspace_name = st.session_state.get("selected_workspace_name")
st.title(f"Tasks for: {workspace_name}")

headers = {"x-auth-token": st.session_state["token"]}

try:
    ws_id = st.session_state["selected_workspace_id"]
    response = requests.get(
        f"{API_URL}/tasks/workspace/{ws_id}",
        headers=headers,
        timeout=20,
    )
    if response.status_code == 200:
        tasks = response.json() or []
        if not tasks:
            st.info("No tasks found for this workspace.")
        else:
            for task in tasks:
                title = task.get("title", "Untitled Task")
                description = task.get("description", "No description provided.")
                status = task.get("status", "unknown")

                with st.expander(title):
                    st.write(f"**Description:** {description}")
                    st.write(f"**Status:** {status}")
    else:
        try:
            message = response.json().get("message")
        except Exception:
            message = response.text or "Failed to fetch tasks."
        st.error(message)
except requests.RequestException as exc:
    st.error(f"Network error: {exc}")


