# CONFIGURE
FROM node:19-alpine
WORKDIR /app
COPY . .

# BUILD
RUN npm ci
RUN npm run build

# RUN
ENV NODE_ENV production
EXPOSE 3000
CMD ["npx","serve","build"]

# Docker commands
# docker build . -t todo-frontend
# docker run -p 3000:3000 -d todo-frontend