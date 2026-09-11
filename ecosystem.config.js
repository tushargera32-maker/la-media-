// PM2 process file for the Hostinger VPS deploy.
// Start: pm2 start ecosystem.config.js --env production
// Inspect: pm2 logs la-media / pm2 monit
module.exports = {
  apps: [
    {
      name: "la-media",
      // Standalone server built by `npm run build` (needs next.config.ts output: "standalone")
      script: "./.next/standalone/server.js",
      cwd: "/var/www/la-media",
      instances: 1,
      exec_mode: "fork",
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "1500M",
      error_file: "/var/log/pm2/la-media-error.log",
      out_file: "/var/log/pm2/la-media-out.log",
      time: true,
    },
  ],
};
