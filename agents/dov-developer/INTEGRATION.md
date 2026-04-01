# Dov Integration Guide — openclaw-dvorah

## Steps to integrate Dov into the existing Dvorah system

### 1. Copy agent directory
Copy `agents/dov-developer/` into the openclaw-dvorah repo:
```
cp -r agents/dov-developer/ /path/to/openclaw-dvorah/agents/dov-developer/
```

### 2. Update agent_registry.py
Add the following to `agents/_shared/agent_registry.py`:

#### Add path import (after existing sys.path.insert lines):
```python
sys.path.insert(0, str(AGENTS_DIR / "dov-developer"))
```

#### Add lazy load (inside `_lazy_load_agents()`):
```python
try:
    from dov_agent import DovAgent
    agents.append(DovAgent())
except ImportError as e:
    print(f"Warning: Could not load DovAgent: {e}", file=sys.stderr)
```

#### Add prompt file mapping (inside `route_message()` → `prompt_files` dict):
```python
"development": "agents/dov-developer/dov_prompt.md",
```

#### Add to AGENT_INVENTORY:
```python
"דב": {
    "emoji": "💻",
    "domain": "development",
    "class": "DovAgent",
    "dir": "agents/dov-developer/",
    "prompt": "agents/dov-developer/dov_prompt.md",
    "tier_split": "T1:70% T2:20% T3:10%",
    "integrations": ["GitHub repos", "CI/CD", "workspace-dov/"],
},
```

### 3. Update DOMAIN_AGENTS_ARCHITECTURE.md
Add Dov to the agent lineup table:

```markdown
| 8 | 💻 | דב (Dov) | development | `agents/dov-developer/` | T1:70% T2:20% T3:10% |
```

Update agent count from 7 to 8.

Add integration point:
```markdown
Dov manages GitHub repos, CI/CD pipelines, project workspaces, builds and tests.
```

### 4. Create workspace directory
```bash
mkdir -p ~/.openclaw/workspace/workspace-dov
```

### 5. Test routing
```python
python -c "
from agents._shared.agent_registry import route_message
tests = [
    ('תפתח לי פיצ׳ר חדש', 'dm'),
    ('יש באג בקוד', 'dm'),
    ('תבנה אפליקציה חדשה', 'dm'),
    ('תעשה code review', 'dm'),
]
for msg, src in tests:
    r = route_message(msg, src)
    print(f'{msg} → {r[\"agent\"]} ({r[\"domain\"]})')
"
```
