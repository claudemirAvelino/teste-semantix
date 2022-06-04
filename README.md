
# RUN APP
1. npm install
2. create .env file and configure variables (use .env.example)
3. docker run --name redis -p 6379:6379 -d -t redis:alpine
4. npm run dev to start all services
5. npm start to start get users service
6. npm dev:server to start server
7. npm dev:queue to start queue 

# View Queues

  http://localhost:3333/admin/queues
  
# View Api Doc

  http://localhost:3333/api-docs/
