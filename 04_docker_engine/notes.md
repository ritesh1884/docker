# 🐳 Docker Notes — 02: Docker Engine vs Docker Desktop

> **One-liner:** Docker Desktop is the *app you open*. Docker Engine is the *thing that actually runs your containers*.

---

## 🧠 The Big Picture

```text
                     ┌────────────────────────┐
                     │      Docker Desktop     │   ← GUI + dev convenience
                     │   (Mac / Windows / Linux)│
                     └────────────┬────────────┘
                                  │ runs & manages
                                  ▼
                     ┌────────────────────────┐
                     │      Docker Engine       │   ← the real runtime
                     └────────────┬────────────┘
                                  │
        ┌───────────────┬────────┴────────┬───────────────┐
        ▼               ▼                 ▼               ▼
   ┌─────────┐     ┌─────────┐      ┌───────────┐   ┌───────────┐
   │Containers│     │ Images  │      │ Networks  │   │ Volumes   │
   └─────────┘     └─────────┘      └───────────┘   └───────────┘
```

**Key idea:** Engine = brain 🧠 | Desktop = body + face 🖥️

---

## 1️⃣ Docker Engine — the core runtime

Docker Engine is the **client-server application** that does the actual work.

When you run:

```bash
docker run python:3.12
```

Docker Engine is what:

| Step | What Engine does |
|------|-------------------|
| 🔍 | Finds/pulls the `python:3.12` image (from registry if not local) |
| 📦 | Creates a new container from that image |
| ▶️ | Starts the container process |
| ⚙️ | Manages the container's processes (start/stop/kill) |
| 🌐 | Sets up networking (so container can talk to internet/other containers) |
| 💾 | Manages storage (image layers, volumes) |

### Engine's internal architecture

```text
┌───────────────────────────────────────────┐
│               Docker Engine                │
│                                             │
│   ┌─────────────┐     REST API      ┌────┐ │
│   │ Docker CLI  │ ───────────────▶  │dockerd│
│   │ (docker ...)│                   │daemon │
│   └─────────────┘                   └───┬──┘ │
│                                          │    │
│                                    ┌─────▼───┐│
│                                    │containerd││
│                                    └─────┬───┘│
│                                          │    │
│                                    ┌─────▼───┐│
│                                    │  runc   ││ ← spins up actual
│                                    └─────────┘│   Linux containers
└───────────────────────────────────────────┘
```

- **CLI** — what you type (`docker run`, `docker build`, etc.)
- **`dockerd`** — the daemon (background service) that listens for API requests
- **`containerd`** — manages container lifecycle
- **`runc`** — low-level tool that actually creates the container using Linux kernel features (namespaces, cgroups)

> 💡 **Important:** The `docker` command you type doesn't run containers itself — it just **talks to the Engine** (`dockerd`) over an API (usually a Unix socket `/var/run/docker.sock` on Linux).

---

## 2️⃣ Docker Desktop — the GUI + dev environment

Docker Desktop is **not** the runtime itself — it's a **wrapper application** that:

- 🖱️ Gives you a GUI to view containers, images, volumes
- ⚙️ Bundles Docker Engine + CLI + Compose + Kubernetes (optional) in one installer
- 🪟 On **Windows/Mac**, provides the **Linux environment** needed to run Linux containers (since containers need a Linux kernel)
- 🔄 Auto-updates Engine version for you
- 🧩 Adds extensions, dashboards, resource limit sliders, etc.

### Why Windows needs extra help

Docker containers share the **host OS kernel** — and almost all Docker images are **Linux-based**. Windows doesn't have a Linux kernel, so Docker Desktop solves this using:

```text
┌─────────────────────────────────────────────┐
│                 Windows Host                  │
│                                                │
│   Docker Desktop (GUI)                        │
│         │                                     │
│         ▼                                     │
│   ┌─────────────────────────────┐             │
│   │   WSL 2 (Linux VM/kernel)    │  ← real Linux kernel here │
│   │   ┌───────────────────────┐  │             │
│   │   │   Docker Engine        │  │             │
│   │   │   (dockerd, containerd)│  │             │
│   │   └───────────────────────┘  │             │
│   └─────────────────────────────┘             │
└─────────────────────────────────────────────┘
```

- **Old way (pre-2020):** Hyper-V based lightweight VM
- **Modern way:** **WSL 2** (Windows Subsystem for Linux) — faster, lighter, better file-system performance

> 🪟 **You're on Windows** → your `docker` commands are actually going: `CLI → Docker Desktop → WSL2 → Docker Engine → containerd → runc`

---

## 3️⃣ Side-by-Side Comparison

| Aspect | 🔧 Docker Engine | 🖥️ Docker Desktop |
|---|---|---|
| **What it is** | Core runtime (daemon + CLI + containerd + runc) | GUI application bundling Engine + extras |
| **Runs containers?** | ✅ Yes — this is the actual executor | ❌ No — it delegates to Engine |
| **Needs a license?** | Free & open source | Free for personal use / small biz; paid for large enterprises |
| **Available on** | Linux natively | Windows, Mac, Linux |
| **On Linux** | Runs directly on host kernel | Optional — you can skip Desktop entirely and just install Engine |
| **On Windows/Mac** | Can't run natively (needs Linux kernel) | **Required** — provides the Linux VM (via WSL2/Hyper-V) |
| **Includes** | `dockerd`, `containerd`, `runc`, CLI | Engine + CLI + Compose + Dashboard + optional K8s |

---

## 4️⃣ Quick Commands to See This Yourself

```bash
# Check Engine version (the real runtime)
docker version

# See Engine info — driver, storage, cgroup version etc.
docker info

# See if you're using WSL2 backend (Windows)
docker info | findstr "Operating System"
```

Sample relevant output on Windows with Docker Desktop:

```text
Server:
 Operating System: Docker Desktop
 Kernel Version: 5.15.153.1-microsoft-standard-WSL2   ← proof it's using WSL2's Linux kernel
```

---

## 5️⃣ TL;DR 🎯

- 🧠 **Engine = the real thing.** It's what actually creates, runs, and manages containers.
- 🖥️ **Desktop = a convenience layer.** GUI + auto-setup, especially crucial on Windows/Mac since they lack a native Linux kernel.
- 🪟 On **Windows**, Docker Desktop quietly spins up a **WSL2 Linux VM** and runs the real Engine inside it — that's the "magic" that lets Linux containers work.
- 🐧 On **Linux**, you can install just Engine (`docker-ce`) with **no Desktop app needed at all**.

---

### 📌 Mental Model to Remember

> "Docker Desktop is the **remote control** 🎮.
> Docker Engine is the **TV** 📺 that actually plays the show."