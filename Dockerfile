FROM node:lts-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

CMD ["node", "build/index.js"]
