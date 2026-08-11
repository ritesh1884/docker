# Docker Image Layers & Volumes

## Docker Images Are Stored in Layers

Docker images are built using **multiple layers**.

For example:

```text
        Docker Image
             │
      ┌───────────────┐
      │ Application   │  ← Top image layer
      ├───────────────┤
      │ Dependencies  │
      ├───────────────┤
      │ Libraries     │
      ├───────────────┤
      │ Base Image    │  ← Bottom layer
      └───────────────┘
```

Each instruction in a Dockerfile can create a new image layer.

Example:

```dockerfile
FROM python:3.12
COPY . /app
RUN pip install -r requirements.txt
```

These instructions can result in multiple layers in the final image.

---

## Docker Image Layers Are Read-Only

Docker image layers are **immutable (read-only)**.

This means that once an image layer has been created, a running container does not directly modify that layer.

Instead, when a container runs, Docker adds a **writable container layer** on top of the read-only image layers.

```text
             Running Container
                    │
          ┌───────────────────┐
          │ Writable Layer    │ ← Container layer
          ├───────────────────┤
          │ Image Layer       │ ← Read-only
          ├───────────────────┤
          │ Image Layer       │ ← Read-only
          ├───────────────────┤
          │ Base Image Layer  │ ← Read-only
          └───────────────────┘
```

This is called **Copy-on-Write (CoW)**.

---

# What Happens When a Container Is Deleted?

Suppose you create a Redis container:

```bash
docker run -d --name my-redis redis
```

If Redis writes data to the container's writable layer, that data belongs to the **container layer**.

If you delete the container:

```bash
docker rm my-redis
```

the container's writable layer is also deleted.

Therefore, data stored only in that writable layer can be **lost**.

### Important

The image itself is **not deleted** when you remove a container.

Only the container and its writable layer are removed.

---

# Why Do We Need Docker Volumes?

To persist important data, Docker provides **volumes**.

A volume stores data separately from the container's writable layer.

```text
             Container
        ┌─────────────────┐
        │ Writable Layer  │
        ├─────────────────┤
        │ Image Layers    │
        └────────┬────────┘
                 │
                 │ Mount
                 ↓
        ┌─────────────────┐
        │ Docker Volume   │
        │                 │
        │ Persistent Data │
        └─────────────────┘
```

If the container is deleted:

```bash
docker rm my-container
```

the volume can remain.

So when you create a new container and attach the same volume, the data is still available.



# Benefits of Docker Volumes

### 1. Data Persistence

Container can be deleted or recreated without automatically deleting the volume's data.

### 2. Container Independence

Data is separated from the container's lifecycle.

```text
Container lifecycle ≠ Data lifecycle
```

### 3. Easy Backup

Volumes can be backed up separately from containers.

### 4. Data Sharing

A volume can be mounted into containers when appropriate.

### 5. Useful for Databases

Volumes are commonly used for persistent data such as:

* PostgreSQL
* MySQL
* MongoDB
* Redis
* Elasticsearch

---

# Important Difference

### Without Volume

```text
Container
   │
   └── Writable Layer
          │
          └── Data ❌
              
Container deleted
       ↓
Writable layer deleted
       ↓
Data lost
```

### With Volume

```text
Container
   │
   └── Volume
          │
          └── Data ✅

Container deleted
       ↓
Volume remains
       ↓
Data remains
```

---

# Quick Summary

| Concept            | Meaning                                                  |
| ------------------ | -------------------------------------------------------- |
| Image              | Read-only template used to create containers             |
| Image layers       | Immutable layers that make up an image                   |
| Container layer    | Writable layer created for a running container           |
| Container deletion | Removes the container's writable layer                   |
| Volume             | Persistent storage managed separately from the container |
| Volume deletion    | Data is removed when the volume itself is deleted        |

### Key Rule

> **Containers are temporary; important data should be stored in volumes.**

Or simply:

```text
Image → Read-only
Container → Writable layer
Volume → Persistent data
```
