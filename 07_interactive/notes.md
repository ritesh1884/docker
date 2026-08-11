# Docker `exec` — Execute Commands Inside a Running Container

## 1. Enter the container using Bash

If the container has **Bash** available:

```bash
docker exec -it my-container bash
```

Then you can run commands inside the container:

```bash
ls
```

### Exit the container

```bash
exit
```

---

## 2. If Bash is not available

Some lightweight Docker images don't include Bash.

Use `sh` instead:

```bash
docker exec -it my-container sh
```

Then:

```bash
ls
```

You can run other Linux commands as well.

### Exit

```bash
exit
```

---

## 3. Execute a command without entering the container

You don't always need to open an interactive shell.

For example, to run `ls` directly:

```bash
docker exec my-container ls
```

The command executes inside the container and returns the output to your terminal.

### More examples

Check the current directory:

```bash
docker exec my-container pwd
```

Check environment variables:

```bash
docker exec my-container env
```

List files in a specific directory:

```bash
docker exec my-container ls /app
```




