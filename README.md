
# RUN APP
1. npm install
2. create .env file and configure variables (use .env.example)
3. docker run --name redis -p 6379:6379 -d -t redis:alpine
4. npm run dev to start all services
5. npm start to start get users service
6. npm dev:server to start server
7. npm dev:queue to start queue 

# Test

![image](https://user-images.githubusercontent.com/55363641/116956569-f2357580-ac6b-11eb-943c-0374ca508ed3.png)

# View Queues

  http://localhost:3333/admin/queues
