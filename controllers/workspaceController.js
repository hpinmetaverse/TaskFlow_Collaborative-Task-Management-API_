const Workspace = require('../models/Workspace');
const User = require('../models/User'); // Need User model for invitations

// --- Create a New Workspace ---
const createWorkspace = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ msg: 'Workspace name is required' });
        }

        // The owner is the currently logged-in user
        const newWorkspace = new Workspace({
            name,
            description,
            owner: req.user.id, // Set the owner
            members: [{ user: req.user.id, role: 'owner' }] // Owner is automatically a member
        });

        const workspace = await newWorkspace.save();
        res.status(201).json(workspace);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during workspace creation');
    }
};

// --- Get All Workspaces for the Logged-in User ---
const getMyWorkspaces = async (req, res) => {
    try {
        // Find workspaces where the logged-in user is either the owner or a member
        const workspaces = await Workspace.find({
            $or: [{ owner: req.user.id }, { 'members.user': req.user.id }]
        }).populate('owner', 'username email'); // Populate owner details

        res.json(workspaces);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error retrieving workspaces');
    }
};

// --- Invite User to Workspace ---
const inviteMember = async (req, res) => {
    try {
        const { workspaceId } = req.params; // ID of the workspace
        const { email } = req.body;        // Email of the user to invite

        // 1. Check if workspace exists
        const workspace = await Workspace.findById(workspaceId);
        if (!workspace) {
            return res.status(404).json({ msg: 'Workspace not found' });
        }

        // 2. Check if logged-in user is the owner (or admin) of the workspace
        const isOwner = workspace.owner.toString() === req.user.id;
        // You might add logic here to check for 'admin' role too
        if (!isOwner) {
            return res.status(403).json({ msg: 'Not authorized to invite members to this workspace' });
        }

        // 3. Find the user to invite by email
        const userToInvite = await User.findOne({ email });
        if (!userToInvite) {
            return res.status(404).json({ msg: 'User with this email not found' });
        }

        // 4. Check if user is already a member
        const isAlreadyMember = workspace.members.some(
            (member) => member.user.toString() === userToInvite.id.toString()
        );
        if (isAlreadyMember) {
            return res.status(400).json({ msg: 'User is already a member of this workspace' });
        }

        // 5. Add user to members array
        workspace.members.push({ user: userToInvite.id, role: 'member' });
        await workspace.save();

        res.json({ msg: `${userToInvite.username} invited to workspace!` });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error during member invitation');
    }
};

module.exports = {
    createWorkspace,
    getMyWorkspaces,
    inviteMember
};
module.exports = {
    createWorkspace, // <-- MUST BE HERE
    getMyWorkspaces,
    inviteMember
};