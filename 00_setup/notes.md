

##  `docker run` - create + start a container

```bash
docker run redis
```

What happens under the hood:

```text
docker run redis
      │
      ▼
Is "redis" image available locally? 
      │
   ┌──┴──┐
   NO     YES
   │       │
   ▼       ▼
Pull from   Skip straight
Docker Hub  to creating
(auto-      the container
download)
   │       │
   └───┬───┘
       ▼
Create container from image
       ▼
Start the container
       ▼
Logs stream live to your terminal 
```

>  If the image isn't on your machine, Docker auto-pulls it from Docker Hub (or whatever registry configured) - you don't need to `docker pull` manually first.

---

##  `docker stop` — gracefully stop a running container

```bash
docker stop container_name
```


---

##  `docker run -d` — detached mode 

```bash
docker run -d redis
```

---

##  `docker run -d` — detached mode with custom name

```bash
docker run -d --name my-container redis
```

The `-d` flag = **detached mode**. This changes *where the logs go*, not what the container does.

| Mode | Terminal behavior | Where logs go |
|---|---|---|
| **Without `-d`** (attached) | Terminal is "taken over" — you see logs live, `Ctrl+C` stops the container | Streamed directly to your terminal |
| **With `-d`** (detached) | Terminal returns immediately, gives you back control, prints only the container ID | Logs are **not shown** in terminal — captured by Docker in the background |

---

##  Quick Reference Table

| Command | What it does | Container state after |
|---|---|---|
| `docker run redis` | Pull (if needed) + create + start, logs in terminal | Running  (terminal attached) |
| `docker run -d redis` | Same, but logs hidden, terminal freed | Running  (detached) |
| `docker stop container_name` | Gracefully stop | Stopped  (still exists) |
| `docker rm container_name` | Delete the container | Gone  |
| `docker rm -f container_name` | Force stop + delete in one go | Gone  |
| `docker logs container_name` | View captured logs of a (detached) container | No change |
| `docker start container_name` | Restart a previously stopped container | Running  |
| `docker ps` | list all running containers only|   |
| `docker ps -a` | list all running as well as stopped containers |   |
| `docker restart contianer_name` | to restart without stopping  |   |
| `docker logs container_name` | to see logs of any container |   |
| `docker logs container_name > myLog.log` | to move logs to a file  |   |
| `docker logs -f container_name ` | to see live logs  |   |