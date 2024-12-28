# Start project  

```
git clone https://github.com/petarnenov/stream-app.git && \
cd stream-app && \
cd apps/server && \
echo 'POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=big_data' > .development.env && \
cd .. && \
cd ..
```

```bash
make up
```
