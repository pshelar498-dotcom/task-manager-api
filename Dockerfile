# 1. Start from a small Linux image that already has Node.js 24 installed
FROM node:24-alpine

# 2. Production mode (Express is faster, and dev-only packages aren't needed)
ENV NODE_ENV=production

# 3. Work inside /app in the container
WORKDIR /app

# 4. Copy only the package files first and install dependencies.
#    Docker caches this step, so it re-runs only when package*.json change
COPY package*.json ./
RUN npm ci --omit=dev

# 5. Copy the application code
COPY src ./src

# 6. Don't run as root (security best practice); the node image includes a "node" user
USER node

# 7. The port the app listens on (documentation for people and tools)
EXPOSE 5000

# 8. The command that starts the container
CMD ["node", "src/server.js"]