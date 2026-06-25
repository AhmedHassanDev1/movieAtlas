FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
ENV DATABASE_URL="postgresql://postgres.gejabwdmdzmcgacqbnnb:Pq2wW-6v@_+4Q5&@aws-0-eu-west-1.pooler.supabase.com:5432/postgres"

RUN npx prisma generate

RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]