module.exports = {
    apps: [
        {
            name: "campaign-manager-backend",
            script: "backend/src/server.js",
        },
        {
            name: "campaign-manager-frontend",
            script: "npm",
            args: "run dev",
            cwd: "frontend", 
            env: {
                HOST: "0.0.0.0",
                PORT: 5173,
            
            },
        },
    ],
};
