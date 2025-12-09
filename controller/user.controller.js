const registerUser = async (req, res) => {
    try { 
        // Registration logic here
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
}

export { registerUser };