# Docker Daemon & Docker CLI

```bash 
The CLI is how you talk to Docker. 

The Daemon is the background process that listens and does the actual work.
```

---

## Docker CLI - the messenger 

The CLI (`docker`) is just a command-line client. It does not run containers itself.

Its entire job:
1. Take what you typed (`docker run python:3.12`)
2. Convert it into a REST API request
3. Send that request to the Daemon
4. Print the Daemon's response back to your terminal

```bash
docker run -d -p 8080:80 nginx
```

What actually happens:

```text
docker CLI
   │
   │  Parses flags: -d, -p 8080:80, image=nginx
   │
   ▼
Builds an HTTP request like:
   POST /containers/create
   POST /containers/{id}/start
   │
   ▼
Sends it to dockerd over a socket
```


---

## Docker Daemon - the actual worker

The Daemon (`dockerd`) is a long-running background service** (a "server") that does all the real work.

It:

| Responsibility | Details |
|---|---|
|  **Listens for API requests** | From CLI, Docker Desktop, or any REST client |
|  **Manages images** | Pulling, building, storing layers |
|  **Manages containers** | Create, start, stop, remove |
|  **Manages networks** | Bridge, host, overlay networks |
|  **Manages volumes** | Persistent storage for containers |
|  **Talks to `containerd`/`runc`** | To actually spin up the Linux processes/namespaces for a container |




