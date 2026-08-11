# Docker `inspect` — Container Information

Docker stores detailed information about a container that can be viewed in **JSON format** using:

```bash
docker inspect my-container
```

This returns a large JSON object containing information about the container.

---

## Save the Inspect Output to a File

Instead of displaying the JSON in the terminal, redirect the output to a file:

```bash
docker inspect my-container > inspect.json
```

This creates an `inspect.json` file in the **current directory**.


---

# Important Information in `docker inspect`

The JSON contains many details. Some of the most useful sections are:

## 1. `Id`

```json
"Id": "0665c5a97e7864edb7a32..."
```

The unique ID of the container.

---

## 2. `Created`

```json
"Created": "2026-08-10T08:06:25.640852339Z"
```

Shows when the container was created.

---

## 3. `Path` and `Args`

```json
"Path": "docker-entrypoint.sh",
"Args": [
    "redis-server"
]
```

Shows the entrypoint and arguments used to start the container.

In this case, the container starts Redis.

---

## 4. `State`

```json
"State": {
    "Status": "running",
    "Running": true,
    "Paused": false,
    "Restarting": false,
    "OOMKilled": false,
    "Dead": false,
    "ExitCode": 0
}
```

Contains the current state of the container.

Important fields:

| Field        | Meaning                                              |
| ------------ | ---------------------------------------------------- |
| `Status`     | Current status such as `running` or `exited`         |
| `Running`    | Whether the container is currently running           |
| `Paused`     | Whether the container is paused                      |
| `Restarting` | Whether Docker is restarting it                      |
| `OOMKilled`  | Whether it was killed because of insufficient memory |
| `ExitCode`   | Exit code of the container                           |
| `StartedAt`  | When it was started                                  |
| `FinishedAt` | When it last stopped                                 |

---

## 5. `Image`

```json
"Image": "sha256:344e3945..."
```

The image ID from which the container was created.

---

## 6. `Name`

```json
"Name": "/my-container"
```

The container's name.

---

## 7. `HostConfig`

This contains configuration related to how Docker runs the container.

For example:

```json
"NetworkMode": "bridge"
```

The container is using Docker's default bridge network.

It can also contain information about:

* CPU limits
* Memory limits
* Restart policy
* Privileged mode
* Port bindings
* Volumes
* Security settings
* Resource limits

Example:

```json
"RestartPolicy": {
    "Name": "no"
}
```

This means Docker won't automatically restart the container.

---

## 8. `Config`

Contains configuration that came from the image and container creation.

Example:

```json
"Image": "redis",
"WorkingDir": "/data",
"Entrypoint": [
    "docker-entrypoint.sh"
],
"Cmd": [
    "redis-server"
]
```

It can also contain:

* Environment variables
* Exposed ports
* Entrypoint
* CMD
* Working directory
* Volumes

Example:

```json
"Env": [
    "PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "REDIS_VERSION=8.10.0"
]
```

---

## 9. `NetworkSettings`

Contains networking information about the container.

Example:

```json
"NetworkMode": "bridge"
```

And:

```json
"Gateway": "172.17.0.1",
"IPAddress": "172.17.0.2",
"IPPrefixLen": 16
```

So in this example:

```text
Container IP: 172.17.0.2
Gateway:      172.17.0.1
Network:      bridge
```

It also contains information about:

* Network ID
* Endpoint ID
* MAC address
* Ports
* Connected networks

---

## 10. `Mounts`

```json
"Mounts": []
```

Shows volumes and bind mounts attached to the container.

An empty array means there are currently no mounts.

