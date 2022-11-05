export const login = async (req, res) => {
    console.log("Login Called");
    res.status(201).json({ message: "Login called with JSON data!"});
};

export const register = async (req, res) => {
    console.log("Register Called");
    res.status(201).json({ message: "Register called with JSON data!"});
};