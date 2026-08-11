# Creating a Docker Image Using a Dockerfile

The most common way to create a custom Docker image is by using a **Dockerfile**.

A Dockerfile is a text file containing instructions that tell Docker how to build an image.

https://youtu.be/OOaKTnoPr0Y?si=gouVVWb-s9MbwBAs&t=6555
## Basic Process

```text
Dockerfile
    ↓
docker build
    ↓
Docker Image
    ↓
docker run
    ↓
Container
```

---

# 1. Create a Dockerfile

Create a file named exactly:

```text
Dockerfile
```

**No file extension** is required.

Example project:

```text
my-app/
│
├── Dockerfile
└── app.py
```

---

# 2. Write Instructions in Dockerfile

Example:

```dockerfile
FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install flask

EXPOSE 5000

CMD ["python", "app.py"]
```

### What each instruction does

| Instruction | Purpose                                               |
| ----------- | ----------------------------------------------------- |
| `FROM`      | Selects the base image                                |
| `WORKDIR`   | Sets the working directory                            |
| `COPY`      | Copies files into the image                           |
| `RUN`       | Executes commands while building the image            |
| `EXPOSE`    | Documents the port the application listens on         |
| `CMD`       | Defines the default command when the container starts |

Docker's official documentation describes these as common Dockerfile instructions.

---

# 3. Build the Docker Image

Open the terminal in the directory containing the Dockerfile:

```bash
docker build -t my-app .
```

Here:

```text
docker build
     │
     ├── -t my-app
     │       └── Name/tag the image as "my-app"
     │
     └── .
         └── Build context = current directory
```

The `.` is important. It tells Docker to use the **current directory as the build context**, where Docker can find the Dockerfile and files referenced by it.

---

# 4. Check the Image

After building:

```bash
docker images
```

or:

```bash
docker image ls
```

You should see something like:

```text
REPOSITORY    TAG       IMAGE ID       CREATED       SIZE
my-app        latest    abc123...      ...           ...
```

---

# 5. Create a Container From the Image

Now use the image to create a container:

```bash
docker run --name my-container my-app
```

If your application uses port `5000`, you can map it to your machine:

```bash
docker run -p 5000:5000 --name my-container my-app
```

The relationship is:

```text
Dockerfile
    │
    │ docker build
    ↓
Docker Image
    │
    │ docker run
    ↓
Docker Container
```

---

# Important Difference

### Dockerfile

Instructions for **how to build** an image.

### Docker Image

The packaged, immutable artifact created from those instructions.

### Container

A running instance created from an image.

```text
Dockerfile
   ↓
docker build
   ↓
Image
   ↓
docker run
   ↓
Container
```

---

# Useful Commands

### Build an image

```bash
docker build -t my-app .
```

### List images

```bash
docker images
```

### Run an image

```bash
docker run my-app
```

### Run with a container name

```bash
docker run --name my-container my-app
```

### Run with port mapping

```bash
docker run -p 5000:5000 my-app
```

### Inspect an image

```bash
docker inspect my-app
```

### View image layers

```bash
docker history my-app
```

---

# Key Point

**Dockerfile → `docker build` → Image → `docker run` → Container**

The Dockerfile defines the instructions, while `docker build` actually builds the image from those instructions.
