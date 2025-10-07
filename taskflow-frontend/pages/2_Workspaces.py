import streamlit as st
import requests


st.set_page_config(page_title="Workspaces", page_icon="🗂️", layout="wide")


API_URL = "http://localhost:3000/api"


if not st.session_state.get("token"):
    st.warning("Please log in to view your workspaces.")
    st.stop()

headers = {"x-auth-token": st.session_state["token"]}

st.title("🗂️ My Workspaces")

try:
    response = requests.get(f"{API_URL}/workspaces", headers=headers, timeout=20)
    if response.status_code == 200:
        workspaces = response.json() or []
        if not workspaces:
            st.info("No workspaces found.")
        else:
            for ws in workspaces:
                workspace_id = ws.get("_id") or ws.get("id")
                workspace_name = ws.get("name", "Untitled Workspace")
                workspace_description = ws.get("description", "No description provided.")

                st.subheader(workspace_name)
                st.write(workspace_description)

                if st.button("View Tasks in this Workspace", key=f"view_{workspace_id}"):
                    st.session_state["selected_workspace_id"] = workspace_id
                    st.session_state["selected_workspace_name"] = workspace_name
                    st.switch_page("pages/3_Tasks.py")
    else:
        try:
            message = response.json().get("message")
        except Exception:
            message = response.text or "Failed to fetch workspaces."
        st.error(message)
except requests.RequestException as exc:
    st.error(f"Network error: {exc}")


